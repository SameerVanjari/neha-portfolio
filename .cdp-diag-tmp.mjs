import { spawn } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const profile = mkdtempSync(join(tmpdir(), "chrome-cdp-"));
const proc = spawn(CHROME, [
  "--headless=new", "--remote-debugging-port=9223", `--user-data-dir=${profile}`,
  "--no-first-run", "--window-size=1440,900", "about:blank",
], { stdio: "ignore" });

const sleep = (ms) => new Promise(r => setTimeout(r, ms));
let list = null;
for (let i = 0; i < 40; i++) {
  await sleep(250);
  try { list = await fetch("http://127.0.0.1:9223/json/list").then(r => r.json()); break; } catch {}
}
const page = list.find(t => t.type === "page");
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise(r => ws.onopen = r);

let id = 0;
const pending = new Map();
const events = [];
ws.onmessage = (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); return; }
  events.push(msg);
};
const send = (method, params = {}) => new Promise((resolve) => {
  const mid = ++id;
  pending.set(mid, resolve);
  ws.send(JSON.stringify({ id: mid, method, params }));
});
const evaluate = async (expression) => {
  const r = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  return r.result?.result?.value;
};

const logs = [];
const interesting = (m) => {
  const p = m.params ?? {};
  if (m.method === "Runtime.consoleAPICalled") {
    const text = (p.args ?? []).map(a => a.value ?? a.description ?? "").join(" ");
    if (text) logs.push(`[console.${p.type}] ${text.slice(0, 600)}`);
    else logs.push(`[console.${p.type}] ${(JSON.stringify(p.args) || "").slice(0, 600)}`);
  } else if (m.method === "Runtime.exceptionThrown") {
    const d = p.exceptionDetails ?? {};
    logs.push(`[exception] ${d.text} ${d.exception?.description ?? ""}`.slice(0, 800));
  } else if (m.method === "Log.entryAdded") {
    const e = p.entry ?? {};
    logs.push(`[${e.level}] ${e.text?.slice(0, 800)}`);
  }
};
const pump = setInterval(() => { for (const m of [...events]) { interesting(m); events.length = 0; } }, 300);

await send("Page.enable");
await send("Runtime.enable");
await send("Log.enable");

await send("Page.navigate", { url: "http://localhost:3000/" });
await sleep(9000); // let preloader + model load settle

console.log("=== initial console (first 9s) ===");
console.log(logs.join("\n") || "(none)");

// what's the state of the canvas?
const state1 = await evaluate(`(() => {
  const c = document.querySelector("canvas");
  return { canvas: !!c, w: c?.width, h: c?.height, title: document.title };
})()`);
console.log("canvas state:", JSON.stringify(state1));

await send("Page.captureScreenshot", { format: "png" }).then(r => {
  const { writeFileSync } = await import("node:fs");
});
