/**
 * IFSG (Immersive virtual retail) — transcribed from Website Wireframes
 * node 212:217. Copy and layout specs are from Figma as-is. All media
 * slots are drop-zones: the Figma file holds placeholder frames only.
 */

export const HERO = {
  eyebrowLead: "IFSG",
  eyebrowRest: " · Immersive virtual retail",
  title: "A luxury shopping metaverse you can reach into",
  subtitle:
    "A futuristic virtual store where shoppers explore curated brands in an interactive 3D world, in VR, with an AR prototype for phones.",
  role: "Experience & Interaction Designer",
  roleNote: "Led the experience design: interaction logic, storytelling and user flow",
  cta: "Enter the store",
  coverNote: "ifsg-01-hero.png (full-bleed)",
  video: {
    src: "/videos/ifsg/hero.mp4",
    poster: "/case/ifsg/hero-poster.webp",
  },
};

export const FACTS = [
  { icon: "icon-fact-role", label: "ROLE", value: "Experience & Interaction Designer" },
  { icon: "icon-fact-layers", label: "SCOPE", value: "VR shopping world + AR phone prototype" },
  { icon: "icon-fact-tools", label: "TOOLS", value: "Unity 3D · Reality Composer · Tilt Brush · Figma" },
  { icon: "icon-fact-target", label: "FOCUS", value: "Interaction logic, storytelling, user flow" },
] as const;

export const CONTRIBUTIONS = {
  eyebrow: "My contribution",
  heading: "From brand ideas to every interaction in the store",
  note: "I worked closely with 3D artists and developers, sharing functional guidelines, giving iterative feedback and running user tests.",
  lead: {
    icon: "icon-flow",
    title: "Experience flow design",
    body: "The full journey: entry, product exploration, interaction and cart.",
  },
  cards: [
    {
      icon: "icon-grid",
      title: "Storyboard & interaction blueprint",
      body: "Entry and guidance, spatial sound and voice feedback, micro-interactions, UI behavior.",
    },
    {
      icon: "icon-sparkle",
      title: "Creative ideation",
      body: "Made-up brand identities with product styles, 3D asset ideas and promo videos.",
    },
    {
      icon: "icon-phone",
      title: "AI & AR extensions",
      body: "Reality Composer prototypes exploring AI-enhanced and AR versions.",
    },
    {
      icon: "icon-team",
      title: "Team collaboration",
      body: "Guidelines and feedback for 3D and dev, plus user testing for smooth functionality.",
    },
  ] as const,
};

export const DASHBOARD = {
  eyebrow: "The 3D dashboard",
  heading: "Six objects replace a menu",
  note: "Each icon on the physical dashboard rises in sequence, and the interface explains what it does.",
  items: [
    { note: "ifsg-icon-search.png", title: "Search", body: "Find products or brands", img: "/case/ifsg/dash-mag.webp" },
    { note: "ifsg-icon-bag.png", title: "Shopping bag", body: "Holds items, leads to checkout", img: "/case/ifsg/dash-bag.webp" },
    { note: "ifsg-icon-wishlist.png", title: "Wishlist star", body: "Save favorites for later", img: "/case/ifsg/dash-star.webp" },
    { note: "ifsg-icon-globe.png", title: "Global prices", body: "Worldwide pricing and brand comparisons", img: "/case/ifsg/dash-globe.webp" },
    { note: "ifsg-icon-home.png", title: "Home store", body: "Back to the heart of the metaverse", img: "/case/ifsg/dash-house.webp" },
    { note: "ifsg-icon-coin.png", title: "G-coin", body: "In-world currency and rewards", img: "/case/ifsg/dash-coin.webp" },
  ] as const,
};

export const STORYBOARD = {
  eyebrow: "Storyboard · VR",
  heading: "Four scenes, from arrival to holding the product",
  note: "Storyboarded end to end, including spatial sound, voice feedback and UI behavior.",
  scenes: [
    {
      num: "01",
      title: "Welcome to the metaverse",
      body: "You spawn into an architecturally rich luxury store, with soft light and a welcome panel.",
      frames: [
        { note: "ifsg-03-vr-welcome.png", src: "/case/ifsg/sb-welcome-1.webp", alt: "Store interior with the dashboard icons" },
        { note: "ifsg-04-vr-welcome-ui.png", src: "/case/ifsg/sb-welcome-2.webp", alt: "Welcome panel with Continue and Skip intro" },
      ] as const,
    },
    {
      num: "02",
      title: "Tutorial",
      body: "“How to shop” and “Ready to shop?” panels teach the basics, or you skip straight in.",
      frames: [
        { note: "ifsg-05-vr-dashboard.png", src: "/case/ifsg/shot-dashboard.webp", alt: "Dashboard icons strip" },
        { note: "ifsg-06-vr-tutorial.png" },
      ] as const,
    },
    {
      num: "03",
      title: "Product groups",
      body: "Eight featured items rise from the obelisk, in two curated groups at the center of view.",
      frames: [
        { note: "ifsg-07-vr-entering.png", src: "/case/ifsg/vista.webp", alt: "Entering the store space" },
        { note: "ifsg-08-vr-product-groups.png", src: "/case/ifsg/shot-wall.webp", alt: "Product wall with featured items" },
      ] as const,
    },
    {
      num: "04",
      title: "Product interaction",
      body: "Point, pull, grab and turn a product like in real life; its details unfold beside it.",
      frames: [
        { note: "ifsg-09-vr-product-interaction.png", video: "/videos/ifsg/drag.mp4", poster: "/case/ifsg/drag-poster.webp" },
        { note: "ifsg-10-vr-inspect.png", src: "/case/ifsg/grab.webp", alt: "Grabbing a shoe to inspect it" },
      ] as const,
    },
  ] as const,
};

export const INTERACTIONS = {
  eyebrow: "Interaction design",
  heading: "Shop with your hands, not a menu",
  cards: [
    {
      icon: "icon-ray",
      title: "Point and pull",
      body: "A ray from the controller plus a trigger press brings the product forward.",
    },
    {
      icon: "icon-hand",
      title: "Grab and inspect",
      body: "Squeeze the grip to hold it, then turn it and look up close.",
    },
    {
      icon: "icon-bag",
      title: "Drag to save",
      body: "Move it toward the wishlist or bag icon; the panel unfolds with the update.",
    },
    {
      icon: "icon-info",
      title: "Details that unfold",
      body: "Name, price, material and sizes, plus “Visit store” and “Play” brand video.",
    },
  ] as const,
  wide: [
    { note: "ifsg-11-vr-add-to-bag.png", src: "/case/ifsg/shot-addtobag.webp", alt: "Boot pulled forward with the shopping bag glowing" },
    { note: "ifsg-02-main-visual.png", src: "/case/ifsg/vista.webp", alt: "Main visual of the store space" },
  ] as const,
};

export const AR = {
  eyebrow: "AR prototype · Reality Composer",
  heading: "The same store, on a phone",
  note: "Mockups built in Reality Composer, with visual enhancements in Photoshop.",
  screens: [
    { note: "ifsg-ar-01-welcome.png", caption: "Welcome, then Continue", src: "/case/ifsg/ar-1.webp" },
    { note: "ifsg-ar-02-products.png", caption: "Products come forward", src: "/case/ifsg/ar-2.webp" },
    { note: "ifsg-ar-03-double-tap.png", caption: "Double-tap to scale up", src: "/case/ifsg/ar-3.webp" },
    { note: "ifsg-ar-04-wishlist-button.png", caption: "Add to wishlist", src: "/case/ifsg/ar-4.webp" },
    { note: "ifsg-ar-05-checkout.png", caption: "Checkout, then keep shopping", src: "/case/ifsg/ar-5.webp" },
    { note: "ifsg-ar-06-wishlist-ui.png", caption: "Wishlist details", src: "/case/ifsg/ar-6.webp" },
    { note: "ifsg-ar-07-gen-e-spin.png", caption: "Gen.e spins, particles spread", src: "/case/ifsg/ar-7.webp" },
    { note: "ifsg-ar-08-particles.png", caption: "Particles glow at the center", src: "/case/ifsg/ar-8.webp" },
  ] as const,
  phones: [
    { note: "ifsg-ar-09-phone-boots.png", src: "/case/ifsg/ar-phone-3.webp", alt: "AR flow on a phone in hand" },
    { note: "ifsg-ar-10-phone.png", src: "/case/ifsg/ar-phone-6.webp", alt: "AR flow on a phone in hand" },
  ] as const,
};

export const TOOLS = {
  eyebrow: "Tools",
  heading: "Built across four tools",
  items: [
    { title: "Unity 3D", body: "The VR build" },
    { title: "Reality Composer", body: "AR prototypes and mockups" },
    { title: "Google Tilt Brush", body: "Spatial sketching" },
    { title: "Figma", body: "Flows, storyboard, UI" },
  ] as const,
  credit:
    "Immersive virtual retail experience for IFSG. I led the experience design strategy and worked closely with 3D artists and developers. This page shows my role and contributions.",
};

export const NEIGHBORS = [
  {
    direction: "Previous · WebAR · Hospitality",
    title: "Turtle Bay Resort",
    highlight: "A door onto the beach at Turtle Bay",
    href: "/projects/turtle-bay-resort",
    thumbBg: "#10272B",
    thumbFg: "#FFB997",
  },
  {
    direction: "Next · AI · Research tool",
    title: "Research Recommender",
    highlight: "Find papers, take notes, cite them, in one place",
    href: "/projects/research-recommender",
    thumbBg: "#141210",
    thumbFg: "#E3C27A",
  },
] as const;
