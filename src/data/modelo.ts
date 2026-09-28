/**
 * Modelo × Seattle Kraken (Mobile web game) — transcribed from Website
 * Wireframes node 176:217. Copy and layout specs are from Figma as-is.
 */

const C = "/case/modelo";

export const HERO = {
  eyebrowLead: "Modelo × Seattle Kraken",
  eyebrowRest: " · Mobile web game",
  title: "The Skate Challenge",
  subtitle:
    "A modern-day retro hockey game, played in the phone’s browser, that turned a brand partnership into sweepstakes entries.",
  role: "XR Designer",
  roleAgency: " · CXR Agency (Kinemeric)",
  roleNote: "UX, pixel art, animation, VFX and sound · one month, concept to launch",
  cta: "Play Video",
  image: {
    src: `${C}/hero-phones.webp`,
    alt: "The Skate Challenge running on two phones",
    note: "mk-01-hero-phones.png",
  },
};

export const FACTS = [
  { icon: "icon-fact-role", label: "ROLE", value: "XR designer" },
  { icon: "icon-fact-client", label: "CLIENT", value: "Modelo × Seattle Kraken" },
  { icon: "icon-fact-phone", label: "PLATFORM", value: "App-less mobile web game, in the browser" },
  { icon: "icon-fact-clock", label: "TIMELINE", value: "One month, concept to launch" },
] as const;

export const BACKGROUND = {
  eyebrow: "Background & challenge",
  heading: "A city that waited years for its team",
  note: "Seattle joined the NHL in 2021 and named Modelo its official import beer. Both brands needed a fun way to get fans excited about the partnership.",
  stats: [
    { num: "10,000", body: "season ticket deposits in 12 minutes", tone: "teal" as const },
    { num: "32nd", body: "team to join the National Hockey League", tone: "dark" as const },
    { num: "1", body: "new partner: Modelo, official import beer", tone: "dark" as const },
  ] as const,
  cards: [
    {
      icon: "icon-target",
      title: "The challenge",
      body: "Build an immersive experience with no app to download that spreads the word about the Kraken, builds excitement for the partnership, and drives sweepstakes entries.",
    },
    {
      icon: "icon-trophy",
      title: "The answer",
      body: "The Modelo × Kraken Skate Challenge: a short retro game that opens from a link and puts both brands on the ice.",
    },
  ] as const,
  phone: {
    src: `${C}/launch-screen.webp`,
    alt: "Skate Challenge launch screen on a phone",
    note: "mk-03-launch-screen.png",
  },
};

export const ROLE = {
  eyebrow: "What I did",
  heading: "One designer, every asset, end to end",
  note: "I was the only XR designer: UX, wireframes, pixel art, animation, VFX, sound and testing.",
  steps: [
    { icon: "icon-step-pen", title: "Illustrate", body: "Characters and props drawn in Adobe Illustrator" },
    { icon: "icon-step-grid", title: "Sheet", body: "Frames built into sprite sheets in Photoshop" },
    { icon: "icon-step-sparkle", title: "Animate", body: "Loops for skating, winning and losing" },
    { icon: "icon-step-code", title: "Hand off", body: "Delivered to developers, ready to code" },
    { icon: "icon-step-check", title: "Test", body: "Tested builds on real phones with the developers" },
  ] as const,
  tiles: [
    { num: "1 month", body: "Design and development ran in tandem to ship on time", tone: "teal" as const },
    { num: "1 designer", body: "I was the only XR designer on the project", tone: "dark" as const },
    { num: "Every asset", body: "Illustrated, animated and delivered by me", tone: "dark" as const },
  ] as const,
};

export const PIXEL = {
  eyebrow: "Pixel art & sprites",
  heading: "Every pixel, drawn from scratch",
  note: "The Kraken skater, rival players, bottle caps, ice cracks, HUD icons and screens, inspired by the lo-fi games of the 80s and 90s.",
  sheet: {
    src: `${C}/losing-sprite-sheet.webp`,
    alt: "Six-frame losing sprite sheet",
    note: "mk-04-losing-sprite-sheet.png",
    caption: "The six-frame losing loop, as handed to developers",
  },
  callout: {
    label: "PERSONALITY IN A FEW PIXELS",
    title: "Even a loss gets a smile",
    body: "The losing loop shows the skater melting into a puddle, so failure feels playful instead of punishing.",
  },
};

export const DEPTH = {
  eyebrow: "Depth, rewards and motion",
  heading: "A 2D game that feels like skating up the ice",
  note: "I built the rink and the rewards to add depth and give players a payoff they could see.",
  rink: {
    src: `${C}/rink.webp`,
    alt: "Rink laid out in perspective with Kraken and Modelo marks",
    note: "mk-05-rink-after-effects.png",
    caption:
      "Rink in perspective: laid out with the Kraken and Modelo marks, then tilted with a 3D camera in After Effects",
  },
  cap: {
    src: `${C}/bottle-cap.webp`,
    alt: "Kraken bottle cap in pixel art",
    note: "mk-06-bottle-cap.png",
    caption: "A reward worth chasing: the Kraken bottle cap, in pixel art",
  },
  coinEyebrow: "Coin drop · falls, flips and lands on the pile",
  coins: [
    { src: `${C}/coin-1.webp`, alt: "Coin drop frame 1", note: "mk-07-coin-drop-1.png" },
    { src: `${C}/coin-2.webp`, alt: "Coin drop frame 2", note: "mk-08-coin-drop-2.png" },
    { src: `${C}/coin-3.webp`, alt: "Coin drop frame 3", note: "mk-09-coin-drop-3.png" },
    { src: `${C}/coin-4.webp`, alt: "Coin drop frame 4", note: "mk-10-coin-drop-4.png" },
    { src: `${C}/coin-5.webp`, alt: "Coin drop frame 5", note: "mk-11-coin-drop-5.png" },
    { src: `${C}/coin-6.webp`, alt: "Coin drop frame 6", note: "mk-12-coin-drop-6.png" },
  ] as const,
};

export const GAMEPLAY = {
  eyebrow: "Gameplay UX",
  heading: "Simple enough to play with one thumb",
  note: "Authentically retro, without giving up immersion. Enemies, rewards and smooth transitions keep people playing.",
  phones: [
    {
      src: `${C}/countdown.webp`,
      alt: "Countdown into the run",
      note: "mk-13-countdown-and-run.png",
      caption: "1 · Countdown into the run",
    },
    {
      src: `${C}/gameplay.webp`,
      alt: "Gameplay: dodge rivals, collect caps",
      note: "mk-14-gameplay.png",
      caption: "2 · Dodge rivals, collect caps",
    },
  ] as const,
  notes: [
    {
      num: "1",
      title: "Two big controls",
      body: "Left and right arrows move the Kraken skater across the rink.",
    },
    {
      num: "2",
      title: "Clear stakes",
      body: "Hearts track lives and a counter tracks bottle caps, always in view.",
    },
    {
      num: "3",
      title: "Things to dodge",
      body: "Rival skaters and cracks in the ice cost a life.",
    },
    {
      num: "4",
      title: "A fair start",
      body: "A “Ready?” countdown gives players a beat before every run.",
    },
  ] as const,
};

export const SWEEPSTAKES = {
  eyebrow: "Game over",
  heading: "Every run ends at the sweepstakes",
  note: "Win or lose, the end screen shows the score and puts the sweepstakes one tap away, right when players are most engaged.",
  image: {
    src: `${C}/game-over.webp`,
    alt: "Game-over sweepstakes screen",
    note: "mk-15-game-over-sweepstakes.png",
  },
  notes: [
    {
      num: "1",
      title: "Score recap",
      body: "Lives remaining and bottle caps collected, shown in the game’s pixel style.",
    },
    {
      num: "2",
      title: "Two clear choices",
      body: "Play again, or enter the sweepstakes.",
    },
    {
      num: "3",
      title: "Feedback you can hear",
      body: "Sound effects give caps, hits, wins and losses their retro feel.",
    },
    {
      num: "4",
      title: "Tested on real phones",
      body: "I tested builds with the developers and refined the visual effects and transitions.",
    },
  ] as const,
};

export const RESULTS = {
  eyebrow: "Results",
  heading: "Hundreds of signups in the first days",
  note: "Whether they won or lost, players spent time with both brands, and a taste of old-fashioned fun.",
  wins: [
    {
      src: `${C}/win-pose-1.webp`,
      alt: "Win screen key pose 1",
      note: "mk-16-win-pose-1.png",
    },
    {
      src: `${C}/win-pose-2.webp`,
      alt: "Win screen key pose 2",
      note: "mk-17-win-pose-2.png",
    },
  ] as const,
  caption: "Winning loop: two key poses from the animated win screen",
  impact: [
    {
      num: "Hundreds",
      body: "of sweepstakes signups in the first couple of days",
      tone: "teal" as const,
    },
    {
      num: "End to end",
      body: "UX, wireframes, visual effects, sound and testing",
      tone: "dark" as const,
    },
    {
      num: "0 apps",
      body: "Opens from a link, straight into the game",
      tone: "dark" as const,
    },
  ] as const,
  credit:
    "Client work for Modelo × Seattle Kraken, delivered at CXR Agency (Kinemeric). I was the only XR designer, working with the development team. This page shows my role and contributions.",
};

export const NEIGHBORS = [
  {
    direction: "Previous · WebAR · Brand activation",
    title: "TD Bank One Vanderbilt",
    highlight: "A cardboard skyscraper that comes alive in AR",
    href: "/projects/td-bank-one-vanderbilt",
    thumbBg: "#18201B",
    thumbFg: "#7FDB8F",
  },
  {
    direction: "Next · VR · Healthcare",
    title: "Harvard MedTech",
    highlight: "Immersive Meditation Universe",
    href: "/projects/harvard-medtech",
    thumbBg: "#0D1B2A",
    thumbFg: "#99D9D9",
  },
] as const;
