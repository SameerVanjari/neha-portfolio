/**
 * Interactive Learning Aid case study — content transcribed from Figma
 * "Website Wireframes" → "Interactive Learning Aid — Case study (1440)"
 * (node 458:305).
 *
 * The Figma frame is a 1440px desktop layout with 202px gutters, so the
 * content column is 1036px wide. Every figure is a labelled drop-frame in the
 * design; the `ila-*` exports now ship from the client's Drive
 * "Interactive Learning Aid" folder and land in /case/interactive-learning-aid/
 * under the exact filenames the design specifies, so the component resolves
 * each slot by name and a replacement export only has to keep the name.
 *
 * Palette sampled off the same frame: cool paper #f4f5f4, ink #1b1a33, night
 * indigo #0e0940, deep #07052b, panel #26215f, note card #332d78, dark slot
 * #3a3484, light slot #e3e3ea, and the signal green #39b54a / #1e8f3a.
 */

export const HERO = {
  eyebrow: "Physical computing · Learning aid for children aged 3 to 5",
  headline: "Touch a tag, and the face lights up",
  support:
    "An interactive learning aid that teaches young children the parts of the face. Each name tag hides an IR sensor; touch it, and an Arduino lights the matching eye, nose, lip or ear.",
  role: "Concept, interaction design and prototyping",
  roleNote: "Arduino UNO, IR sensors and LEDs, built as a working cardboard prototype",
  cta: "See how it works",
  cover: { file: "ila-01-cover.jpg", width: 600, height: 450 },
} as const;

export const FACTS = [
  {
    label: "AUDIENCE",
    value: "Children aged 3 to 5",
    sub: "Learning the parts of the face",
    icon: "ila-icon-audience",
  },
  {
    label: "HARDWARE",
    value: "Arduino UNO",
    sub: "5 IR sensors and LEDs",
    icon: "ila-icon-hardware",
  },
  {
    label: "BUILD",
    value: "Cardboard prototype",
    sub: "Working circuit on a breadboard",
    icon: "ila-icon-build",
  },
  {
    label: "SOFTWARE",
    value: "Arduino IDE",
    sub: "Sensor input to LED output",
    icon: "ila-icon-software",
  },
] as const;

export const BRIEF = {
  eyebrow: "The brief",
  heading: "Making anatomy something a small child can play with",
  cardEyebrow: "DESIGN BRIEF",
  cardLead:
    "Design an interactive learning aid for children aged 3 to 5 to learn human anatomy in an engaging way.",
  cardBody:
    "Built on Arduino UNO, with physical sensors interfaced to the system, so learning happens through touch, light and play.",
  figure: { file: "ila-02-brief-behind-the-scenes.jpg", width: 460, height: 345 },
  figureCaption: "Design brief, over a behind-the-scenes shot of the working circuit",
  essentialLabel: "ESSENTIAL",
  essentials: ["Portable", "Lightweight", "Easy to use", "Playable"],
  desiredLabel: "DESIRED",
  desired: ["Visual and audible guidance"],
} as const;

export const HOW = {
  eyebrow: "How it works",
  heading: "A sensor under every name tag",
  note: "Each IR sensor senses a touch or surface from a set distance. The Arduino UNO reads it and blinks the LED on the matching part of the face.",
  steps: [
    {
      n: "01",
      title: "Touch a tag",
      body: "The child places a fingertip on a tag such as Eye, Nose, Lip or Ear.",
    },
    {
      n: "02",
      title: "The sensor detects it",
      body: "An IR sensor under the tag senses the finger from a set distance.",
    },
    {
      n: "03",
      title: "Arduino reads the signal",
      body: "The sensor’s digital pin reports the touch to the Arduino UNO.",
    },
    {
      n: "04",
      title: "The part lights up",
      body: "The LED on that part of the face blinks, linking the word to the place.",
    },
  ],
  figure: { file: "ila-03-how-it-works.jpg", width: 1036, height: 777 },
  figureCaption:
    "How it works: the IR sensor, Arduino UNO and LED circuit, with the hardware and software notes",
  hardware: [
    {
      title: "IR sensor",
      body: "Four pins: VCC +5V, GND, D to a digital pin when used as a digital sensor, and A to an analog input when used as an analog sensor.",
    },
    {
      title: "LED",
      body: "The output on each part of the face. A transparent LED can also work as a light sensor, like a photodiode.",
    },
    {
      title: "Arduino IDE",
      body: "The software used to program how each sensor input maps to its LED.",
    },
  ],
} as const;

export const PROTOTYPE = {
  eyebrow: "Working prototype",
  heading: "Cardboard, five sensors and a face that answers back",
  note: "I built the prototype from cardboard and the assembled circuit, with tags for each part of the face hanging below it.",
  figure: { file: "ila-04-working-prototype.jpg", width: 1036, height: 777 },
  figureCaption: "The working prototype: the tags, the face, and the eyes lighting up on touch",
  notes: [
    {
      label: "BUILD",
      title: "Cardboard and wiring",
      body: "The face is cut from cardboard, with the circuit assembled behind it.",
    },
    {
      label: "INPUT",
      title: "Five IR sensors",
      body: "Each sits with a tag naming a part of the face.",
    },
    {
      label: "OUTPUT",
      title: "A light on the right part",
      body: "Touch a tag and the LED on that part blinks, conveying the information.",
    },
  ],
} as const;

export const CLOSING_NOTE =
  "Interactive learning aid built with Arduino UNO and IR sensors. This page shows my role and contributions." as const;

export const MORE_PROJECTS = {
  label: "MORE PROJECTS",
  allWork: "All work",
  cards: [
    {
      href: "/projects/maternal-care",
      kicker: "Previous · Product Design · Healthcare",
      title: "Emergency Delivery Aid",
      body: "Best Graduation Project award, 2017",
      thumbBg: "#0f2a26",
      thumbLabel: "#8fcdbb",
    },
    {
      href: "/projects/broken-mile",
      kicker: "Next · XR · VR training",
      title: "The Broken Mile",
      body: "VR Awards finalist, live on Meta Quest",
      thumbBg: "#2a2024",
      thumbLabel: "#d8d2c8",
    },
  ],
} as const;
