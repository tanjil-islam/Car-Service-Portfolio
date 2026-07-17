export interface HUDPhaseContent {
  title: string;
  subtitle: string;
  description: string;
  details: { label: string; value: string }[];
}

export const hudPhases: HUDPhaseContent[] = [
  {
    title: "PAGANI ZONDA R",
    subtitle: "THE EVOLUTION OF SPEED",
    description: "A track-only carbon-fiber masterpiece designed without limitations. Created for the absolute purist.",
    details: [
      { label: "PRODUCTION RUN", value: "15 UNITS" },
      { label: "BASE VALUE", value: "€1.5M" },
      { label: "STATUS", value: "ULTRA RARE" }
    ]
  },
  {
    title: "CARBON MONOCOQUE",
    subtitle: "AERO-ACTIVE DESIGN",
    description: "Built using state-of-the-art Carbon-Titanium (Carbo-Titanium) weave, increasing stiffness while dramatically reducing weight to a mere 1,070kg.",
    details: [
      { label: "DRY WEIGHT", value: "1070 KG" },
      { label: "MONOCOQUE", value: "CARBO-TITANIUM" },
      { label: "DOWNFORCE", value: "1250 KG @ 300KM/H" }
    ]
  },
  {
    title: "AMG RACING V12",
    subtitle: "750 HORSEPOWER",
    description: "A naturally aspirated Mercedes-AMG 6.0L V12 engine. Direct throttle response, producing an iconic, high-pitched Formula 1 exhaust note.",
    details: [
      { label: "POWER OUTPUT", value: "750 HP @ 7500 RPM" },
      { label: "TORQUE", value: "710 NM" },
      { label: "0 - 100 KM/H", value: "2.7 SECONDS" }
    ]
  }
];

export const technicalSpecs = [
  { category: "Engine & Performance", specs: [
    { name: "Engine Type", value: "Mercedes-AMG M120 V12" },
    { name: "Displacement", value: "5987 cc" },
    { name: "Power-to-weight", value: "701 HP per ton" },
    { name: "Top Speed", value: "375 km/h (233 mph)" }
  ]},
  { category: "Chassis & Aerodynamics", specs: [
    { name: "Chassis", value: "Carbon-Titanium Monocoque" },
    { name: "Suspension", value: "Double A-arm, pushrod actuated" },
    { name: "Brakes", value: "Brembo Carbon-Ceramic ventilated" },
    { name: "Gearbox", value: "6-speed sequential transverse" }
  ]},
  { category: "Dimensions & Capacities", specs: [
    { name: "Length", value: "4886 mm" },
    { name: "Width", value: "2014 mm" },
    { name: "Wheelbase", value: "2785 mm" },
    { name: "Fuel Capacity", value: "85 Liters (Racing Cell)" }
  ]}
];

export const keyFeatures = [
  {
    title: "AERODYNAMICS",
    value: "1.25t",
    description: "An adjustable carbon-fiber rear wing, flat underbody, and rear diffuser generate enormous aerodynamic grip at speed.",
    image: "/images/zonda-sequence/1.jpg"
  },
  {
    title: "SEQUENTIAL GEARBOX",
    value: "20ms",
    description: "The 6-speed magnesium-cased sequential gearbox performs lightning-fast shifts, transferring raw V12 power directly to the rear wheels.",
    image: "/images/zonda-sequence/100.jpg"
  },
  {
    title: "CARBO-TITANIUM WEAVE",
    value: "-30%",
    description: "Pagani's proprietary composite materials and manufacturing processes combine carbon fiber weave with titanium threads to prevent shattering upon impact.",
    image: "/images/zonda-sequence/200.jpg"
  }
];
