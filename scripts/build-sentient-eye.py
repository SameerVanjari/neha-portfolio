import bpy, math, os
from mathutils import Vector

OUT_GLB = "/Users/apple/projects/client-work/neha-portfolio/public/models/sentient-eye.glb"
OUT_PREVIEW = "/tmp/eye_preview.png"
os.makedirs(os.path.dirname(OUT_GLB), exist_ok=True)

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene

# ---- bowl geometry constants (front face is +Z) ----
BOWL_C = 1.55   # bowl cutter centre z
BOWL_R = 1.25   # bowl cutter radius
BOWL_R2 = BOWL_R * BOWL_R


def bowl_z(x, y):
    """z of the concave bowl surface at (x, y)."""
    return BOWL_C - math.sqrt(max(0.0, BOWL_R2 - x * x - y * y))


def activate(obj):
    for o in bpy.context.selected_objects:
        o.select_set(False)
    obj.select_set(True)
    bpy.context.view_layer.objects.active = obj


def apply_boolean(target, cutter, op="DIFFERENCE"):
    m = target.modifiers.new("bool", "BOOLEAN")
    m.operation = op
    m.solver = "EXACT"
    m.object = cutter
    activate(target)
    bpy.ops.object.modifier_apply(modifier=m.name)
    bpy.data.objects.remove(cutter, do_unlink=True)


def add_sphere(r, loc=(0, 0, 0), seg=128, ring=64):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=seg, ring_count=ring, radius=r, location=loc)
    return bpy.context.active_object


def add_torus(major, minor, loc=(0, 0, 0), mseg=240, nseg=28):
    bpy.ops.mesh.primitive_torus_add(
        major_radius=major, minor_radius=minor, major_segments=mseg, minor_segments=nseg,
        location=loc,
    )
    return bpy.context.active_object


def add_tube(points, radius, name="tube"):
    cu = bpy.data.curves.new(name, "CURVE")
    cu.dimensions = "3D"
    cu.resolution_u = 16
    cu.bevel_depth = radius
    cu.bevel_resolution = 10
    cu.use_fill_caps = True
    sp = cu.splines.new("POLY")
    sp.points.add(len(points) - 1)
    for i, p in enumerate(points):
        sp.points[i].co = (p[0], p[1], p[2], 1.0)
    obj = bpy.data.objects.new(name, cu)
    scene.collection.objects.link(obj)
    activate(obj)
    bpy.ops.object.convert(target="MESH")
    return bpy.context.active_object


# ---------------- build ----------------
body = add_sphere(1.0, seg=220, ring=110)

# concave bowl + raised rim
apply_boolean(body, add_sphere(BOWL_R, loc=(0, 0, BOWL_C), seg=160, ring=80))

# a thin step that separates the rim ring from the bowl
apply_boolean(body, add_torus(0.885, 0.022, loc=(0, 0, math.sqrt(max(0.0, 1 - 0.885**2)))))

# bold M / wave ribbon sitting in the bowl (separate object — a union with the
# tight curve self-intersects and destroys the body)
pts = []
n = 200
edge = 0.14
for i in range(n + 1):
    t = i / n
    x = -0.63 + 1.26 * t
    y = -0.30 * math.cos(x * (2 * math.pi / 0.62))
    # sink the ends into the body so the flat caps stay hidden
    sink = 0.0
    if t < edge:
        sink = (edge - t) / edge * 0.32
    elif t > 1 - edge:
        sink = (t - (1 - edge)) / edge * 0.32
    pts.append((x, y, bowl_z(x, y) - 0.015 - sink))
ribbon = add_tube(pts, 0.11, "ribbon")

# ball nestled in the central valley
ball = add_sphere(0.15, loc=(0.0, -0.13, bowl_z(0.0, -0.13) + 0.02), seg=72, ring=36)

# lens flattening
for o in (body, ribbon, ball):
    o.scale = (1.0, 1.0, 0.92)

for o in (body, ribbon, ball):
    activate(o)
    bpy.ops.object.shade_smooth()

mat = bpy.data.materials.new("SentientMetal")
mat.use_nodes = True
bsdf = mat.node_tree.nodes.get("Principled BSDF")
bsdf.inputs["Base Color"].default_value = (0.72, 0.45, 0.26, 1.0)
bsdf.inputs["Metallic"].default_value = 1.0
bsdf.inputs["Roughness"].default_value = 0.28
body.data.materials.append(mat)
ribbon.data.materials.append(mat)
ball.data.materials.append(mat)

# ---------------- preview ----------------
scene.render.engine = "BLENDER_EEVEE_NEXT"
scene.render.resolution_x = 900
scene.render.resolution_y = 900
world = bpy.data.worlds.new("W")
scene.world = world
world.use_nodes = True
world.node_tree.nodes["Background"].inputs[0].default_value = (0.02, 0.02, 0.04, 1)
world.node_tree.nodes["Background"].inputs[1].default_value = 0.5


def add_area(loc, energy, size):
    bpy.ops.object.light_add(type="AREA", location=loc)
    l = bpy.context.active_object
    l.data.energy = energy
    l.data.size = size


add_area((2.6, 2.6, 3.2), 1300, 4)
add_area((-3.0, 1.6, 1.4), 500, 4)
add_area((0.4, -3.0, 2.4), 400, 4)

bpy.ops.object.camera_add(location=(0.9, 1.0, 3.0))
cam = bpy.context.active_object
scene.camera = cam
d = Vector((0, 0, -0.05)) - cam.location
cam.rotation_euler = d.to_track_quat("-Z", "Y").to_euler()
cam.data.lens = 55

scene.render.filepath = OUT_PREVIEW
bpy.ops.render.render(write_still=True)

bpy.ops.export_scene.gltf(filepath=OUT_GLB, export_format="GLB", use_selection=False, export_apply=True)
print("DONE glb:", os.path.getsize(OUT_GLB), "preview:", os.path.getsize(OUT_PREVIEW))
