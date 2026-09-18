#!/usr/bin/env python3
"""
Sync the shared Google Drive folder into this repo.

- assets/<project-slug>/            : images from each project subfolder (videos skipped)
- assets/<project-slug>/<child>/    : nested subfolders, mirrors the Drive tree
- assets/brand/                     : loose image files in the Drive root (e.g. logos)
- docs/<project-slug>/              : contents of non-project subfolders ("my-resume")
- docs/                             : Google Docs (as .txt) and Google Sheets (as .csv)

No auth needed as long as the Drive folder is shared with "anyone with the link".

Usage:
    python3 scripts/sync-drive.py
"""

import html
import json
import os
import re
import sys
import urllib.request
import time

ROOT_FOLDER_ID = "1JpTNS8HVm3Wms8IPdKdMvK03DIuJvjsa"
SHIPPED_VIDEO_EXTS = (".mp4", ".mov", ".webm", ".avi", ".mkv", ".m4v")
DOCS_PROJECT_FOLDERS = {"my-resume"}
SKIP_SUBFOLDERS = {".git", "venv", ".venv", "__pycache__", "node_modules",
                   "lib", "scripts", "include", "share", "bin", "pkg", "obj"}
FOLDER_MIME = "application/vnd.google-apps.folder"

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS = os.path.join(REPO, "assets")
DOCS = os.path.join(REPO, "docs")

IMG_RE = re.compile(r"image/[a-z0-9+.-]+")
VID_RE = re.compile(r"video/[a-z0-9+.-]+")
APP_RE = re.compile(r"application/vnd\.google-apps\.[a-z]+")
ID_RE = re.compile(r"\[\s*null,?\s*\"([A-Za-z0-9_-]{28,64})\"\s*\]")
NAME_RE = re.compile(r"\[\[\s*\[?\"([^\"\[\]]{2,140})\",\s*null")
SIZE_RE = re.compile(r"\[\[\"Size: ([0-9.]+) ?(KB|MB|GB)\\nStorage used")


def slugify(name: str) -> str:
    s = name.strip().lower()
    s = re.sub(r"[''\"()]", "", s)
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-")


def unesc(x: str) -> str:
    return html.unescape(x.replace("\\u0026", "&").replace('\\"', '"'))


def fetch(url: str, timeout: int = 90, retries: int = 4) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    for attempt in range(retries):
        try:
            with urllib.request.urlopen(req, timeout=timeout) as r:
                return r.read()
        except Exception as e:
            if attempt == retries - 1:
                raise
            print(f"    retrying ({e})...", file=sys.stderr)
            time.sleep(3 * (attempt + 1))
    raise RuntimeError("unreachable")


def get_chunks(page: bytes) -> list[str]:
    s = page.decode("utf-8", "replace")
    bodies = []
    for m in re.finditer(r"AF_initDataCallback\(", s):
        start = m.end()
        depth = 1
        i = start
        while depth > 0 and i < len(s):
            if s[i] == "(":
                depth += 1
            elif s[i] == ")":
                depth -= 1
            i += 1
        if i - start > 300:
            bodies.append(s[start:i - 1])
    return bodies


def parse_html_table(s: str) -> list[dict]:
    """Fallback: very small folders render items only in the server-side HTML table."""
    out = []
    for m in re.finditer(r'<tr[^>]*data-id="([A-Za-z0-9_-]{28,64})"', s):
        fid = m.group(1)
        seg = s[m.start(): m.start() + 4000]
        labels = re.findall(r'aria-label="([^"]*)"', seg)
        name = labels[0].split(" PDF")[0].strip() if labels else None
        if not name:
            continue
        mime = "application/pdf" if name.lower().endswith(".pdf") else ""
        out.append({"id": fid, "name": unesc(name), "mime": mime, "size": None})
    return out


def parse_listings(bodies: list[str]) -> list[dict]:
    """Extract {id, name, mime, size} for each item in a folder page."""
    best = []
    for b in bodies:
        st = b.find("data:")
        blob = b[st + 5:]
        items = {}
        segs = [(m.start(), m.group(1)) for m in ID_RE.finditer(blob)]
        for k, (pos, fid) in enumerate(segs):
            seg = blob[pos: segs[k + 1][0] if k + 1 < len(segs) else len(blob)]
            mime = IMG_RE.search(seg) or VID_RE.search(seg) or APP_RE.search(seg)
            if not mime:
                continue
            name = NAME_RE.search(seg)
            size = None
            size_m = SIZE_RE.search(seg)
            if size_m:
                size = int(float(size_m.group(1)) * {"KB": 1e3, "MB": 1e6, "GB": 1e9}[size_m.group(2)])
            if not name:
                continue
            if fid not in items:
                items[fid] = {"id": fid, "name": unesc(name.group(1)), "mime": mime.group(0), "size": size}
        if items:
            best += list(items.values())
    seen, out = set(), []
    for it in best:
        if it["id"] not in seen:
            seen.add(it["id"])
            out.append(it)
    return out


def download_file(file_id: str, dest: str) -> None:
    url = (
        "https://drive.usercontent.google.com/download"
        f"?id={file_id}&export=download&confirm=t"
    )
    try:
        data = fetch(url)
    except Exception:
        data = fetch(f"https://drive.google.com/uc?export=download&id={file_id}")
    if data[:5] in (b"<!DOC", b"<html", b"<!doc"):
        raise RuntimeError("got an HTML error page instead of the file")
    tmp = dest + ".part"
    with open(tmp, "wb") as f:
        f.write(data)
    os.replace(tmp, dest)


def export_doc(doc_id: str, dest: str, kind: str, fmt: str) -> None:
    base = {"document": "document", "spreadsheet": "spreadsheets"}[kind]
    url = f"https://docs.google.com/{base}/d/{doc_id}/export?format={fmt}"
    data = fetch(url)
    if not data or data[:5] == b"<!DOC":
        raise RuntimeError(f"could not export {kind} {doc_id}")
    tmp = dest + ".part"
    with open(tmp, "wb") as f:
        f.write(data)
    os.replace(tmp, dest)


def is_video(item: dict) -> bool:
    return VID_RE.search(item["mime"]) or item["name"].lower().endswith(SHIPPED_VIDEO_EXTS)


def should_take(item: dict, docs_mode: bool) -> bool:
    if item["mime"] == FOLDER_MIME:
        return True
    if docs_mode:
        return True  # take everything (incl. pdfs), minus videos
    return IMG_RE.search(item["mime"]) is not None


def sync_folder(folder_id: str, drive_name: str, out_dir: str, docs_mode: bool,
                manifest_entry: dict, depth: int = 0) -> None:
    os.makedirs(out_dir, exist_ok=True)
    page = fetch(f"https://drive.google.com/drive/folders/{folder_id}")
    items = parse_listings(get_chunks(page)) or parse_html_table(page.decode("utf-8", "replace"))
    for f in items:
        name = f["name"]
        if not should_take(f, docs_mode):
            print(f"    skip ({f['mime']}) {name}")
            manifest_entry["files"].append({"name": name, "mime": f["mime"], "skipped": True})
            continue
        if f["mime"] == FOLDER_MIME:
            if name.lower() in SKIP_SUBFOLDERS or name.startswith("."):
                print(f"    skip (internal) {name}")
                continue
            child = os.path.join(out_dir, slugify(name))
            child_entry = {"name": name, "folder": os.path.relpath(child, REPO),
                           "files": [], "subfolders": []}
            manifest_entry.setdefault("subfolders", []).append(child_entry)
            print(f"    [subfolder] {name} -> {os.path.relpath(child, REPO)}")
            if depth < 3:
                sync_folder(f["id"], name, child, docs_mode, child_entry, depth + 1)
            else:
                print(f"    skipping deeper recursion at {name}")
            continue
        if is_video(f):
            print(f"    skip (video) {name}")
            manifest_entry["files"].append({"name": name, "mime": f["mime"], "skipped": "video"})
            continue
        safe_name = re.sub(r"\x00", "", name).replace("/", "-")
        dest = os.path.join(out_dir, safe_name)
        print(f"    {name}")
        try:
            download_file(f["id"], dest)
            manifest_entry["files"].append({"name": name, "mime": f["mime"], "saved": True})
        except Exception as e:
            print(f"    FAILED: {e}", file=sys.stderr)
            manifest_entry["files"].append({"name": name, "mime": f["mime"], "error": str(e)})
        time.sleep(0.4)


def main() -> None:
    os.makedirs(ASSETS, exist_ok=True)
    os.makedirs(DOCS, exist_ok=True)
    manifest = {
        "source": f"https://drive.google.com/drive/folders/{ROOT_FOLDER_ID}",
        "synced": [],
    }

    root_page = fetch(f"https://drive.google.com/drive/folders/{ROOT_FOLDER_ID}")
    items = parse_listings(get_chunks(root_page))
    subfolders = [i for i in items if i["mime"] == FOLDER_MIME]
    root_files = [i for i in items if i["mime"] != FOLDER_MIME]

    if not subfolders:
        sys.exit("Could not read the Drive folder — is it shared with 'anyone with the link'?")

    print(f"Found {len(subfolders)} subfolders, {len(root_files)} loose files")

    for sub in subfolders:
        slug = slugify(sub["name"])
        docs_mode = slug in DOCS_PROJECT_FOLDERS
        out_dir = os.path.join(DOCS, slug) if docs_mode else os.path.join(ASSETS, slug)
        print(f"[{slug}] {sub['name']}  ->  {os.path.relpath(out_dir, REPO)}")
        entry = {"drive_name": sub["name"], "folder": os.path.relpath(out_dir, REPO),
                 "files": [], "subfolders": []}
        sync_folder(sub["id"], sub["name"], out_dir, docs_mode, entry)
        manifest["synced"].append(entry)

    # brand folder for loose root images (e.g. logos)
    brand_dir = os.path.join(ASSETS, "brand")
    for f in root_files:
        if IMG_RE.search(f["mime"]):
            os.makedirs(brand_dir, exist_ok=True)
            dest = os.path.join(brand_dir, f["name"])
            print(f"[brand] {f['name']}")
            download_file(f["id"], dest)
        elif "spreadsheet" in f["mime"]:
            dest = os.path.join(DOCS, slugify(f["name"]) + ".csv")
            print(f"[docs] {f['name']} -> csv")
            export_doc(f["id"], dest, "spreadsheet", "csv")
        elif "document" in f["mime"]:
            dest = os.path.join(DOCS, slugify(f["name"]) + ".txt")
            print(f"[docs] {f['name']} -> txt")
            export_doc(f["id"], dest, "document", "txt")

    with open(os.path.join(DOCS, "drive-manifest.json"), "w") as fh:
        json.dump(manifest, fh, indent=2)
    print("Done. Manifest: docs/drive-manifest.json")


if __name__ == "__main__":
    main()
