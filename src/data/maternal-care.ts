/**
 * Maternal Care Emergency Delivery Aid case study — content transcribed from
 * Figma "Website Wireframes" → "Maternal Care Emergency Delivery Aid — Case
 * study (1440)" (node 445:232).
 *
 * The Figma frame is a 1440px desktop layout with 202px gutters, so the
 * content column is 1036px wide. Every figure is a labelled drop-frame in the
 * design; `FigSlot` keeps the frame tone, the sensitive-content gate and the
 * caption exactly as specified so a real export can be dropped in at
 * /case/maternal-care/<file> and nothing else has to move.
 *
 * Palette sampled off the same frame: deep clinical green #0f2a26, facts bar
 * #0a1f1c, dark band #12302b, raised dark card #1b3f39, dark slot #1e4a43,
 * accent #3fb59a and eyebrow green #12785f on a cool paper.
 */

export const HERO = {
  contentNote: "Content note: includes childbirth documentation, hidden until you choose to view",
  eyebrow: "Bachelor of Design graduation project · Product Design · 2017",
  headline: "An emergency delivery aid for the smallest clinic in rural India",
  support:
    "Field research across Nashik district led me to design an emergency delivery aid for Sub Centres, supporting the squatting posture rural women already live in, so birth can work with gravity instead of against it.",
  role: "Product Designer · Independent graduation project",
  roleNote:
    "Secondary research, interviews, field observation of live deliveries, clinician validation and ergonomics",
  awardTitle: "Best Graduation Project award",
  awardNote: "Final jury, Bachelor of Design, 2017",
  cta: "Read the research",
  coverFigure: "hc-01-cover.jpg",
} as const;

export const FACTS = [
  {
    label: "Role",
    value: "Product Designer",
    sub: "Independent graduation project",
    icon: "mc-icon-role",
  },
  {
    label: "Context",
    value: "B.Des, Product Design",
    sub: "Graduation project, 2017 · Best Graduation Project award",
    icon: "mc-icon-context",
  },
  {
    label: "Field",
    value: "Nashik district, India",
    sub: "Sub Centres, PHCs and the Civil Hospital",
    icon: "mc-icon-field",
  },
  {
    label: "Research",
    value: "20 women · 5 clinicians",
    sub: "Interviews, plus live deliveries observed",
    icon: "mc-icon-research",
  },
] as const;

export const BRIEF = {
  eyebrow: "The brief",
  heading: "An aid for the smallest workplace in Indian healthcare",
  cardLabel: "AIM",
  cardLead:
    "Design an emergency delivery aid for the Sub Centre that supports the squatting posture for women in normal delivery.",
  cardBody:
    "The Sub Centre is the most peripheral contact point between a rural community and the primary healthcare system, a single room staffed by one male and one female multipurpose health worker. The aid had to serve that room, and a home delivery assisted by its staff.",
  figure: "hc-02-synopsis.jpg",
  figureCaption: "Synopsis: aim, objective, goal, scope and delimitation, from my project deck",
  chipsLabel: "OBJECTIVES",
  chips: ["Portable", "Safe delivery", "Low cost", "Less time-consuming", "Ergonomically designed"],
  cards: [
    { title: "Goal", body: "Address the real needs of the Sub Centre and the staff who work in it." },
    {
      title: "Scope",
      body: "Usable for delivering at home with the support of Sub Centre staff, and a guide to normal delivery that communicates with the support staff.",
    },
    { title: "Delimitation", body: "Rural areas of Nashik district, Maharashtra." },
  ],
} as const;

export const PROBLEM = {
  eyebrow: "The problem",
  heading: "Most maternal deaths are preventable, and they happen furthest from care",
  note: "Skilled care before, during and after childbirth can save the lives of women and newborns. Maternal mortality is highest among women in rural areas and poorer communities.",
  stats: [
    {
      value: "~830",
      title: "women die every day from preventable causes related to pregnancy and childbirth",
      note: "WHO maternal mortality factsheet, November 2016",
    },
    {
      value: "99%",
      title: "of all maternal deaths occur in developing countries",
      note: "UNICEF, Maternal Health",
    },
    {
      value: "27%",
      title: "of maternal deaths are caused by severe bleeding, second only to pre-existing conditions (28%)",
      note: "UNICEF, Maternal Health",
    },
    {
      value: "70.2%",
      title: "decline in India’s maternal mortality ratio, against a 44.7% global decline",
      note: "Pradhan Mantri Surakshit Matritva Abhiyan",
    },
  ],
  slides: [
    {
      file: "hc-03-starting-point.jpg",
      caption:
        "The starting point: daily life, environment, critical situations, habits and media for a pregnant woman in a rural village",
    },
    {
      file: "hc-05-problem.jpg",
      caption:
        "The problem: causes of maternal death, and my research area of pregnant women, newborns and new mothers",
    },
  ],
  scenario: [
    {
      file: "hc-06-present-scenario.jpg",
      caption: "Present scenario: the PMSMA scheme offers free antenatal check-ups on the 9th of every month",
    },
    {
      file: "hc-10-situation.jpg",
      caption:
        "Understanding the situation: poverty, distance, lack of information, inadequate services and cultural practices",
    },
  ],
} as const;

export const SYSTEM = {
  eyebrow: "Healthcare delivery in India",
  heading: "Following the system down to the Sub Centre",
  note: "Healthcare runs from central to state to local, and from tertiary hospitals down to primary care. At the very bottom sits the Sub Centre, where a rural woman first meets the health system.",
  levels: [
    { title: "Tertiary care", body: "Regional and specialist hospitals", lead: false },
    { title: "Secondary care", body: "District and peripheral hospitals", lead: false },
    { title: "Primary care", body: "Health posts, Sub Centres, block and community health centres", lead: true },
  ],
  figure: "hc-04-healthcare-system.jpg",
  figureCaption: "Healthcare delivery system in India, from central planning to the Sub Centre in Nashik district",
  focus: [
    {
      file: "hc-08-focus-area.jpg",
      caption: "Focus area: the Sub Centre, its staff structure and its six service functions",
    },
    {
      file: "hc-09-providers.jpg",
      caption: "Role of the healthcare providers: ASHA supervisor, ANM, ASHA and Aganwadi workers",
    },
  ],
  roles: [
    {
      title: "ANM",
      body: "Auxiliary Nurse Midwife. Multipurpose health worker who conducts home deliveries and is the first contact between community and health services.",
    },
    {
      title: "ASHA",
      body: "Accredited Social Health Activist. The bridge between the ANM and the village, bringing pregnant women in for check-ups. One per 1,000 people.",
    },
    {
      title: "ASHA Supervisor",
      body: "Visits monthly during vaccination and keeps the records of pregnant women and newborns, by hand.",
    },
    {
      title: "Aganwadi worker",
      body: "Works with children under 6, and visits homes to help mothers plan for their child’s growth.",
    },
  ],
} as const;

export const KEY_USERS = {
  eyebrow: "Key users",
  heading: "Designing for the woman, and the people around her",
  users: [
    { title: "Primary user", body: "Pregnant women in rural areas.", lead: true },
    {
      title: "Secondary user",
      body: "Health service providers in rural areas: ANM, ASHA and Sub Centre staff.",
      lead: false,
    },
    { title: "Tertiary user", body: "Gynaecologists and obstetricians.", lead: false },
  ],
  figure: "hc-07-key-users.jpg",
  figureCaption: "Key users: primary, secondary and tertiary",
} as const;

export const FIELD = {
  eyebrow: "Field research",
  heading: "Twenty women in Mohadi village, Dindori",
  note: "I interviewed pregnant women with a prepared questionnaire, covering age, income, education, family, media use, nutrition and where they delivered.",
  findings: [
    { value: "50%", title: "were pregnant between the ages of 16 and 20", note: "Age of pregnancy" },
    { value: "60%", title: "showed iron deficiency", note: "Nutritional status" },
    { value: "80%", title: "live in joint families", note: "Family support" },
    { value: "90%", title: "use a mobile phone, the strongest media channel", note: "Role of media" },
    {
      value: "40%",
      title: "delivered in a Sub Centre (45% in a PHC, 15% at home)",
      note: "Place of delivery",
    },
  ],
  slides: [
    { file: "hc-11a-analysis.jpg", caption: "Analysis: age, income, education and family support" },
    {
      file: "hc-11b-analysis.jpg",
      caption: "Analysis: media use, nutrition, number of children and place of delivery",
    },
  ],
} as const;

export const OBSERVING = {
  eyebrow: "Observing birth",
  heading: "Watching how delivery actually happens",
  note: "I studied squatting and lithotomy deliveries through live delivery documentation by Arogya Vidya (Dr. Shyam Ashtekar), then observed live deliveries myself at the Civil Hospital, Nashik.",
  warning: {
    title: "Sensitive content in this section",
    body: "These images document childbirth. Each one stays blurred behind a screen until you choose to view it. The sketches and findings beside them describe what I learned without the photographs.",
  },
  squattingLabel: "SQUATTING POSTURE · DELIVERY IN A SUB CENTRE",
  squatting: [
    {
      file: "hc-12a-squatting-delivery-SENSITIVE.jpg",
      caption: "Squatting posture delivery in a Sub Centre, with my storyboard sketches",
      sensitive: true,
    },
    {
      file: "hc-12b-posture-transformation-SENSITIVE.jpg",
      caption: "Stages of delivery, and how the posture transforms with 1 trained nurse and 2 supports",
      sensitive: true,
    },
  ],
  squattingFindings: [
    {
      title: "Two poles take the push",
      body: "Strong support from two poles helps the woman put all the pressure ahead.",
    },
    {
      title: "Heels need somewhere to rest",
      body: "The body presses forward onto the toes, so the heels need support to rest down.",
    },
    {
      title: "Holding a pose is unbearable",
      body: "One birth helper has to support her legs, because keeping them in one position for long is unbearable.",
    },
    {
      title: "Three people around her",
      body: "A trained nurse and two supports, one of them ready with everything the baby needs.",
    },
  ],
  lithotomyLabel: "AFTER BIRTH, AND LITHOTOMY POSTURE · HOME DELIVERY WITH ASSISTANCE",
  lithotomy: [
    {
      file: "hc-12c-after-birth-SENSITIVE.jpg",
      caption: "After birth: the posture shifts to resting behind, the cord is cut and the baby is cleaned",
      sensitive: true,
    },
    {
      file: "hc-12d-lithotomy-delivery-SENSITIVE.jpg",
      caption: "Lithotomy (supine) posture: cervical dilation from 5 cm to full, then the placenta",
      sensitive: true,
    },
  ],
  fieldLabel: "ON FIELD · LIVE DELIVERY AT THE CIVIL HOSPITAL, NASHIK",
  fieldFigure: {
    file: "hc-13-live-delivery-SENSITIVE.jpg",
    caption: "My documentation at the Civil Hospital, and my storyboard analysis of a lithotomy delivery",
    sensitive: true,
  },
  hospitalFindings: [
    { title: "Lying flat by default", body: "Deliveries were conducted in the lithotomy position." },
    { title: "Two births at once", body: "Staff attended two deliveries at the same time." },
    { title: "Nurses lean on interns", body: "One trained nurse, supported by interns." },
    { title: "Hygiene breaks down", body: "Fluid spreads across the table; the environment was unhygienic." },
  ],
} as const;

export const INSIGHT = {
  eyebrow: "The insight",
  heading: "A posture rural women already live in",
  figure: "hc-14-squatting-observations.jpg",
  figureCaption: "Minor observations: activities and habits in the squatting posture",
  observations: [
    { title: "Familiar", body: "Women in rural areas are used to the squatting posture." },
    { title: "Everyday", body: "Almost every daily activity happens in a squat, and it works as exercise." },
    {
      title: "Helps the baby descend",
      body: "In pregnancy, practising squats helps the baby’s head move downward gradually.",
    },
    {
      title: "Builds strength",
      body: "The ability to squat increases strength, making a squatting delivery possible.",
    },
  ],
} as const;

export const VALIDATION = {
  eyebrow: "Validating the need",
  heading: "Comparing birth positions, then asking clinicians",
  note: "I compared six birth positions, then took the squatting position to five clinicians in Nashik. Most rated it favourably, and each pointed to further design opportunities.",
  table: {
    columns: ["", "Squatting", "Lithotomy / supine"],
    rows: [
      {
        label: "Benefits",
        left: "Gravity assists the baby’s descent, less pain, shorter labour, significantly more pelvic space and more efficient contractions.",
        right: "The easiest position for the birth helper.",
      },
      {
        label: "Drawbacks",
        left: "Sometimes hard to assist.",
        right: "More painful, forces the mother to push against gravity, lengthens the pushing stage and raises the risk of forceps or vacuum delivery.",
      },
    ],
  },
  slides: [
    { file: "hc-16-birth-positions.jpg", caption: "Practised birth positions: squatting against lithotomy", sensitive: false },
    {
      file: "hc-15-validation-SENSITIVE.jpg",
      caption: "Validating the identified need: position reviews and clinician responses",
      sensitive: true,
    },
  ],
  clinicians: {
    label: "CLINICIANS CONSULTED",
    list: "Dr. Vanashri Kulkarni (Janakalyan Rugnalay, Indiranagar) · Dr. Shyam Ashtekar (Arogya Vidya) · Dr. Chaudhari (Gokul Hospital, Pathardi Phata) · a retired gynaecologist with 60 years of experience · Dr. Sankhlecha (Saubhagya Hospital, Gangapur Road)",
    opportunities:
      "Opportunities they raised: an adjustable, comfortable delivery furniture, an aid for painless delivery, a digital partograph, a diet plate, an exercise kit and support for breastfeeding.",
  },
} as const;

export const LABOUR = {
  eyebrow: "Medical groundwork",
  heading: "Learning the body before designing for it",
  note: "To design for birth I first had to understand it: the terms, how pregnancy changes the body, the stages of labour and the ways a baby can be delivered.",
  stages: [
    {
      value: "~20 h",
      title: "First stage: dilation",
      body: "Latent phase around 12 hours, active phase around 6, transition around 2.",
      lead: false,
    },
    {
      value: "~2 h",
      title: "Second stage: pushing",
      body: "From full dilation to birth, around 2 hours. This is where posture matters most.",
      lead: true,
    },
    {
      value: "1–2 h",
      title: "Third stage: placenta",
      body: "Delivery of the placenta, 1 to 2 hours.",
      lead: false,
    },
  ],
  figure: {
    file: "hc-20-stages-of-delivery-SENSITIVE.jpg",
    caption: "Stages of delivery: dilation, pushing and the delivery of the placenta",
    sensitive: true,
  },
  bodySlides: [
    {
      file: "hc-21-stages-of-pregnancy.jpg",
      caption: "Stages of pregnancy across three trimesters, 40 weeks from the last menstrual period",
    },
    {
      file: "hc-23-changes-in-pregnancy.jpg",
      caption: "Changes in pregnancy: loosening pelvic ligaments, swelling feet and ankles, leg cramps and more",
    },
  ],
  deliverySlides: [
    {
      file: "hc-25-types-of-delivery-SENSITIVE.jpg",
      caption: "Types of delivery: vaginal, caesarean, vacuum extraction and forceps",
      sensitive: true,
    },
    {
      file: "hc-26-terminologies.jpg",
      caption: "Understanding the terms: healthcare, pregnancy and child delivery",
      sensitive: false,
    },
  ],
} as const;

export const WHY = {
  eyebrow: "Why squatting works",
  heading: "A new understanding of an old position",
  note: "Squatting during the pushing stage opens the pelvis and gives the baby more room to be born, with gravity helping rather than resisting.",
  facts: [
    {
      value: "Up to 15%",
      title: "larger pelvic outlet when squatting, compared with lying down",
      note: "About 1 to 2 cm wider, from the positions research board",
      big: true,
    },
    {
      value: "Angles",
      title: "feet and knee placement changes the pelvis",
      note: "Feet and knees forward widens the space between the sitting bones; turned out narrows it.",
      big: false,
    },
    {
      value: "Heels",
      title: "most people need something under their heels",
      note: "Without ankle flexibility, a rolled towel or a book under the heels makes the squat possible.",
      big: false,
    },
  ],
  slides: [
    {
      file: "hc-17a-squatting-science.jpg",
      caption: "Importance of the squatting posture, and the range of squat and semi-squat positions",
    },
    {
      file: "hc-17b-squatting-pelvis.jpg",
      caption: "A new understanding of an old position: foot placement and the baby’s travel through the pelvis",
    },
  ],
} as const;

export const EXISTING = {
  eyebrow: "Existing products",
  heading: "Every table I found was built for lying down",
  note: "I documented delivery furniture at Sub Centres in Mohadi and Dugaon, the PHC in Mohadi, the Civil Hospital, and Saubhagya and Gokul hospitals. None supported an upright birth.",
  figure: "hc-22-existing-products.jpg",
  figureCaption: "Existing delivery furniture across seven facilities in Nashik",
  analysisFigure: "hc-18-existing-product-analysis.jpg",
  analysisFigureCaption: "Analysis of the existing delivery table: a cut for examination and fixed hand grips",
  findings: [
    { title: "Lithotomy only", body: "Built for a supine delivery, with 2 birth helpers and 1 doctor around it.", lead: false },
    { title: "Steel, resin and raincoat cloth", body: "A stainless steel bed, resin cushion and a mackintosh cover.", lead: false },
    { title: "Fixed and heavy", body: "One section, 1290 × 760 × 840 mm, with no adjustability and no portability.", lead: true },
  ],
} as const;

export const REQUIREMENTS = {
  eyebrow: "From research to requirements",
  heading: "What the aid has to do",
  note: "Each requirement traces back to something I observed in the field or heard from clinicians.",
  items: [
    {
      n: "01",
      title: "Something to push against",
      body: "Handles or poles placed so she can drive all the pressure forward, as the two poles did in the Sub Centre.",
    },
    {
      n: "02",
      title: "Support for the heels",
      body: "A surface for the heels to rest down while her weight shifts onto her toes.",
    },
    {
      n: "03",
      title: "Let the posture shift",
      body: "From squatting during labour to resting back after birth, without moving her off the aid.",
    },
    {
      n: "04",
      title: "Room for three people",
      body: "Access for a trained nurse and two supports, including space for the baby’s things.",
    },
    {
      n: "05",
      title: "Hygiene by design",
      body: "Catch fluid directly below, so it does not spread across the surface.",
    },
    {
      n: "06",
      title: "Fit the Sub Centre",
      body: "Portable, low cost and quick to set up, so it also works for an assisted home delivery.",
    },
  ],
} as const;

export const DESIGN_BRIEF = {
  eyebrow: "Design brief",
  heading: "An aid for normal delivery in the squatting position",
  note: "The aim: fewer complications, less pain and a shorter labour.",
  essentialLabel: "ESSENTIAL FEATURES",
  essential: [
    { n: "01", title: "Easy to assist", body: "Easy for a rural birth helper to operate and assist with.", wide: false },
    {
      n: "02",
      title: "Safe and quick to set up",
      body: "Ready for delivery by one birth helper in the quickest possible time.",
      wide: false,
    },
    { n: "03", title: "Reliable", body: "Something a woman can depend on to deliver her baby.", wide: false },
    { n: "04", title: "Economical", body: "Affordable for people in rural areas.", wide: true },
    { n: "05", title: "Ergonomic", body: "Designed around her need for support and grips.", wide: true },
  ],
  desiredLabel: "DESIRED FEATURES",
  desired: [
    { title: "Portable and lightweight", body: "So an ANM worker can carry it to emergency home deliveries." },
    { title: "Simple to repair", body: "Simple enough to be fixed in a rural area." },
  ],
  figure: {
    file: "hc-19-design-brief-SENSITIVE.jpg",
    caption: "Design brief, from my project deck",
    sensitive: true,
    dark: true,
  },
} as const;

export const VISUAL = {
  eyebrow: "Visual research",
  heading: "Image boards for posture and for place",
  note: "One board gathered how squatting birth has been supported across cultures and products; the other captured the rural life the aid would live in.",
  boards: [
    {
      file: "hc-24a-positions-board-SENSITIVE.jpg",
      caption: "Visual board: squatting for labour and birth, past and present",
      sensitive: true,
    },
    {
      file: "hc-24b-rural-life-board.jpg",
      caption: "Visual board: women’s daily life in rural Nashik",
      sensitive: false,
    },
  ],
} as const;

export const CONCEPT = {
  eyebrow: "From posture to form",
  heading: "Drawing the body first, then the aid around it",
  note: "Before sketching furniture, I drew the squatting body: its hip, knee, back and heel angles, and every point where it needed something to lean on or hold.",
  postureLabel: "POSTURE STUDY",
  postureFigure: "hc-27-posture-study.jpg",
  postureFigureCaption:
    "Study of the squatting posture: body angles, back and heel details, and how the position transforms",
  postureFindings: [
    { title: "Back support", body: "Helps her hold the right posture and prevents back pain." },
    { title: "Heel support", body: "A raised block under the heels helps prevent tearing." },
    {
      title: "Five positions, one seat",
      body: "Pushing and crowning, shifts for rest and stitches, then squat and rest after the placenta.",
    },
    { title: "Angles to design to", body: "I measured back angles between roughly 65° and 75° across supported squats." },
  ],
  supportLabel: "SUPPORT STUDY",
  supportFigure: "hc-28-support-study.jpg",
  supportFigureCaption: "Support study: where the body rests and grips in each supported posture",
  supportCard: {
    label: "ESSENTIAL PICK POINTS",
    items: ["Backrest", "Hand grips", "Support", "Elevation for the seat"],
  },
  brainstormLabel: "BRAINSTORMING",
  brainstormCards: [
    { label: "IDENTIFICATION · NEED", items: ["Portability", "Grips", "Support", "Communication"] },
    {
      label: "MODIFICATION · DESIGN CHARACTER",
      items: [
        "Easy to clean",
        "Frictional where needed",
        "Light enough to carry",
        "Sturdy",
        "Material, form and structure",
        "Stitching pattern",
      ],
    },
    {
      label: "REPRESENTATION · APPROACH",
      items: [
        "Image board of existing product language",
        "Postural study for supportive forms",
        "Material palette",
        "Study models",
      ],
    },
  ],
  brainstormSlides: [
    { file: "hc-29-brainstorming.jpg", caption: "Brainstorming: identification, modification and representation" },
    {
      file: "hc-30-ideation-scenarios.jpg",
      caption: "Ideation across three settings: institutional delivery, and home delivery with and without assistance",
    },
  ],
  directions: [
    {
      label: "DIRECTION ONE",
      title: "Framed chairs",
      body: "Rigid frames built around a horseshoe seat, with side grips, upright poles to push against and trays to catch fluid.",
      sketches: [
        { file: "hc-31a-sketches.jpg", caption: "Early forms: enclosing frames, grips and a horseshoe seat" },
        { file: "hc-31b-sketches.jpg", caption: "Chairs with side grips, a front cut-out and a slide-out tray" },
        { file: "hc-31c-sketches.jpg", caption: "Bent-frame and folding structures, and backrests shaped to the body" },
        { file: "hc-31d-sketches.jpg", caption: "Folding planar concepts with upright grip poles" },
        { file: "hc-31e-sketches.jpg", caption: "Bent-tube chair frames with sling seats and X-legs" },
        { file: "hc-31f-sketches.jpg", caption: "Sling seats between grip poles, and cocoon forms that hold the body" },
      ],
    },
    {
      label: "DIRECTION TWO",
      title: "Sculpted shells and folding forms",
      body: "Moving away from furniture: pods and shells that cradle the body, then faceted forms that fold flat and open into a supported seat.",
      sketches: [
        { file: "hc-32a-direction-two.jpg", caption: "Pods, loungers and reclining shells" },
        { file: "hc-32b-direction-two.jpg", caption: "Organic, body-hugging seat forms" },
        { file: "hc-32c-direction-two.jpg", caption: "Tilted shells with a single grip pole" },
        { file: "hc-32d-direction-two.jpg", caption: "Idea 2, exploration 1: a wraparound seat with built-in grips" },
        { file: "hc-32e-direction-two.jpg", caption: "Faceted, origami-like structures" },
        { file: "hc-32f-direction-two.jpg", caption: "Idea 2: a flat square that folds up into a backrest and seat" },
      ],
    },
    {
      label: "DIRECTION THREE",
      title: "Portable mats that fold, roll and carry",
      body: "Designing for the ANM worker’s walk to a home delivery: panels and mats that lie flat, roll or fold into a bag, then rise into a backrest and supports.",
      sketches: [
        { file: "hc-33a-direction-three.jpg", caption: "Hinged and finger-jointed panels that fold into a seat" },
        { file: "hc-33b-direction-three.jpg", caption: "A flat mat with pop-up backrest and supports" },
        { file: "hc-33c-direction-three.jpg", caption: "Rolling mats with a frame, carried by the health worker" },
        { file: "hc-33d-direction-three.jpg", caption: "Rolls with a strap and a curved backrest" },
        { file: "hc-33e-direction-three.jpg", caption: "Curved wraps with grips that stand on their own" },
        { file: "hc-33f-direction-three.jpg", caption: "Wraps that open out, with grips and a pocket for supplies" },
        { file: "hc-33g-direction-three.jpg", caption: "Carryable folding shells with cut-out handles", wide: true },
      ],
    },
  ],
  studyModelsLabel: "STUDY MODELS",
  studyModelsTitle: "Testing the forms in paper, card, wire and cloth",
  studyModelsNote: "Quick physical models to check how each direction folds, stands and supports.",
  studyModels: [
    { file: "hc-34a-study-models.jpg", caption: "Folded paper studies of faceted forms" },
    { file: "hc-34b-study-models.jpg", caption: "Folding studies, and a flat mat with pop-up backrest and supports" },
    { file: "hc-34c-study-models.jpg", caption: "Folded strips with cut-out hand grips" },
    { file: "hc-34d-study-models.jpg", caption: "Kraft paper slings and cloth wraps over a wire frame" },
  ],
  studyModelsBig: {
    file: "hc-34e-study-models.jpg",
    caption: "A rolled backrest over a flat mat with hand straps: the direction that led to the final concept",
  },
} as const;

export const FINAL = {
  eyebrow: "Final concept",
  heading: "A shell that holds her in the squat",
  note: "A curved, cushioned shell with a headrest, a supported seat and two upright grip poles to push against, built on a bent-tube frame.",
  figure: "hc-35a-final-concept.jpg",
  figureCaption: "Final concept renders, from top and front views",
  renders: [
    {
      file: "hc-35b-final-concept.jpg",
      caption: "Final concept renders: the shell with its rolled side panels and grip poles",
      sensitive: false,
    },
    {
      file: "hc-35c-final-concept-in-use-SENSITIVE.jpg",
      caption: "The final concept, empty and in use in the squatting position",
      sensitive: true,
    },
  ],
  features: [
    { title: "Backrest and headrest", body: "For rest between contractions, answering the back support from my posture study." },
    { title: "Two grip poles", body: "Upright poles to push against, like the ones I saw used in the Sub Centre." },
    { title: "A supported squat", body: "A low, cushioned seat that keeps her in the squatting position." },
    { title: "Curved, cushioned shell", body: "The enclosing form wraps her body for support and privacy." },
  ],
  materialLabel: "MATERIAL STUDY",
  materials: [
    { file: "hc-37a-material-study.jpg", caption: "Foams: polypropylene (PP), polyethylene (PE) and EVA" },
    { file: "hc-37b-material-study.jpg", caption: "Sheets and fabrics: PP fabric, nylon fabric and PP corrugated sheet" },
  ],
  materialCards: [
    {
      kicker: "CUSHIONING",
      title: "PE foam",
      body: "Cushioning, flexible and durable; resistant to bacteria, chemicals, grease, mould and oil.",
    },
    { kicker: "STRUCTURE", title: "PP corrugated sheet", body: "Can be sterilised at high temperatures." },
    {
      kicker: "PADDING",
      title: "PP foam and EVA",
      body: "Lightweight, easy to cut and form, and resistant to water.",
    },
  ],
} as const;

export const PROTOTYPING = {
  eyebrow: "Prototyping",
  heading: "Built full scale, with local fabricators",
  note: "I built the working prototype in a fabrication workshop: a bent steel frame first, then layered cushioning and upholstery.",
  figure: "hc-36-prototyping.jpg",
  figureCaption: "Prototyping: the frame, the cushioning and the finished aid",
  build: [
    {
      label: "01 · STRUCTURE",
      title: "MS pipe and spring wire",
      body: "Mild steel pipe bent into the frame, with spring wire joints and the two grip poles.",
    },
    {
      label: "02 · CUSHIONING",
      title: "Hitlon, foam and resin fabric",
      body: "Hitlon and foam layers over the frame, covered in wipe-clean resin fabric.",
    },
    {
      label: "03 · RESULT",
      title: "A full-scale working aid",
      body: "A wraparound seat with grip poles, ready to test the squatting posture at real scale.",
    },
  ],
} as const;

export const CLOSING = {
  note: "Bachelor of Design graduation project, Product Design, 2017. Presented at my final jury, where it received the Best Graduation Project award. All research, field documentation, sketches and design are my own; sources for secondary data are credited on each slide.",
} as const;

export const MORE_PROJECTS = {
  label: "MORE PROJECTS",
  allWork: "All work",
  cards: [
    {
      href: "/projects/inspirit-dna",
      kicker: "Previous · VR · Education",
      title: "Inspirit VR DNA",
      body: "Explore DNA, then build it by hand",
      thumbBg: "#1e1b33",
      thumbLabel: "#a99bf0",
    },
    {
      href: "/projects/interactive-learning-aid",
      kicker: "Next · Physical computing · Education",
      title: "Interactive Learning Aid",
      body: "Touch a tag, and the face lights up",
      thumbBg: "#0e0940",
      thumbLabel: "#b3aedb",
    },
  ],
} as const;
