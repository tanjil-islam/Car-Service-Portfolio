import { 
  Wrench, Car, Settings, Box, PenTool, Search, Shield, Zap,
  Snowflake, BatteryCharging, Crosshair, Sparkles, Gauge, Truck, CheckCircle
} from "lucide-react";

export interface ServiceItem {
  id: string;
  icon: any; // Lucide icon component
  title: string;
  description: string;
  category: "engine" | "performance" | "diagnostics" | "bodywork";
  price: string;
  specs: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  avatar: any;
  image: string;
  specialty: string;
  certifications: string[];
  bio: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface CaseFile {
  title: string;
  model: string;
  service: string;
  duration: string;
  cost: string;
  image: string;
  adjustmentData?: Record<string, string>;
}

export const servicesData: ServiceItem[] = [
  {
    id: "svc-1",
    icon: Wrench,
    title: "Expert Repairs & Diagnostics",
    description: "Comprehensive diagnostic sweeps and expert mechanical repairs for all major vehicle platforms.",
    category: "engine",
    price: "Custom Quote",
    specs: ["Advanced Diagnostics", "Mechanical Overhaul", "Precision Engineering"]
  },
  {
    id: "svc-2",
    icon: Car,
    title: "Premium Home Service",
    description: "Top-notch automotive service brought directly to your doorstep. Convenience without compromising quality.",
    category: "performance",
    price: "Call for Pricing",
    specs: ["Mobile Mechanics", "On-site Oil Change", "Battery Service"]
  },
  {
    id: "svc-3",
    icon: Settings,
    title: "Routine Maintenance",
    description: "Scheduled servicing to keep your vehicle running at peak performance year-round.",
    category: "diagnostics",
    price: "Scheduled Plans",
    specs: ["Fluid Flushes", "Brake Inspections", "Filter Replacements"]
  },
  {
    id: "svc-4",
    icon: Box,
    title: "Genuine OEM Parts",
    description: "We source and install only authentic, manufacturer-approved parts for guaranteed reliability.",
    category: "bodywork",
    price: "Market Rate",
    specs: ["OEM Certified", "Imported Components", "Warranty Included"]
  }
];

export interface GridServiceItem {
  id: string;
  title: string;
  icon: any;
  image: string;
  link: string;
}

export const gridServicesData: GridServiceItem[] = [
  {
    id: "grid-1",
    title: "General Service",
    icon: Wrench,
    image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&q=80",
    link: "/booking"
  },
  {
    id: "grid-2",
    title: "Engine Repair",
    icon: Settings,
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
    link: "/booking"
  },
  {
    id: "grid-3",
    title: "Transmission Repair",
    icon: Settings,
    image: "https://images.unsplash.com/photo-1600705578768-4663a84f3e6f?w=800&q=80",
    link: "/booking"
  },
  {
    id: "grid-4",
    title: "Dent & Paint",
    icon: PenTool,
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&q=80",
    link: "/booking"
  },
  {
    id: "grid-5",
    title: "AC Service",
    icon: Snowflake,
    image: "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800&q=80",
    link: "/booking"
  },
  {
    id: "grid-6",
    title: "Electrical Diagnostics",
    icon: Zap,
    image: "https://images.unsplash.com/photo-1562426509-5044a121aa49?w=800&q=80",
    link: "/booking"
  },
  {
    id: "grid-7",
    title: "Hybrid Vehicle Service",
    icon: BatteryCharging,
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80",
    link: "/booking"
  },
  {
    id: "grid-8",
    title: "Wheel Alignment",
    icon: Crosshair,
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80",
    link: "/booking"
  },
  {
    id: "grid-9",
    title: "Car Detailing",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800&q=80",
    link: "/booking"
  },
  {
    id: "grid-10",
    title: "Performance Tuning",
    icon: Gauge,
    image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=800&q=80",
    link: "/booking"
  },
  {
    id: "grid-11",
    title: "Roadside Assistance",
    icon: Truck,
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&q=80",
    link: "/booking"
  },
  {
    id: "grid-12",
    title: "Pre-Purchase Car Inspection (PPI)",
    icon: Search,
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80",
    link: "/booking"
  }
];

export const teamData: TeamMember[] = [
  {
    name: "Alex Kovac",
    role: "Lead Engine Builder",
    avatar: PenTool,
    image: "/images/team_1.png",
    specialty: "High-Revving V8 & V12",
    certifications: ["ASE Master Engine Specialist", "OEM Trained"],
    bio: "Ex-Formula 1 pit crew technician with over 15 years tuning AMG and Ferrari performance powertrains."
  },
  {
    name: "Yuki Tanaka",
    role: "Diagnostics Expert",
    avatar: Search,
    image: "/images/team_2.png",
    specialty: "CAN-bus & ECU Reflashing",
    certifications: ["Bosch Senior Diagnostic Tech"],
    bio: "Specializes in troubleshooting complex electrical faults, sensor calibration, and wiring architecture."
  },
  {
    name: "Marco Rossi",
    role: "Bodywork Artisan",
    avatar: Shield,
    image: "/images/team_3.png",
    specialty: "Carbon Fiber & PPF Laying",
    certifications: ["Xpel Certified Installer"],
    bio: "Focuses on detailing, precise film placement, panel matching, and composite weave repairs."
  },
  {
    name: "Sam Davis",
    role: "JDM Master Tuner",
    avatar: Zap,
    image: "/images/team_4.png",
    specialty: "Twin-turbo & RB/2JZ platforms",
    certifications: ["Haltech Elite Certified Tuner"],
    bio: "A legend in the local drifting scene, mapping high-boost engines to run safely and reliably."
  }
];

export const timelineData: TimelineEvent[] = [
  {
    year: "2015",
    title: "The Genesis",
    description: "Roadmen founded in Dhaka, dedicated to providing top-notch automotive care."
  },
  {
    year: "2018",
    title: "Mobile Revolution",
    description: "Introduced our flagship Premium Home Service to clients across the city."
  },
  {
    year: "2020",
    title: "Holographic Telemetry",
    description: "Launched real-time ECU scanning and client diagnostics monitoring dashboards."
  },
  {
    year: "2026",
    title: "Industry Gold Standard",
    description: "Recognized as the leading luxury and performance service center in the region."
  }
];

export const caseFiles: CaseFile[] = [
  {
    title: "Godzilla Revamp",
    model: "Nissan GT-R R35",
    service: "Stage 3 Engine Build & Carbon Aero",
    duration: "4 Weeks",
    cost: "€18,500",
    image: "https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?q=80&w=2000&auto=format&fit=crop",
    adjustmentData: { camber: "-2.5°", boost: "2.1 BAR", lambda: "0.82" }
  },
  {
    title: "Legendary Supra Build",
    model: "Toyota Supra MK4",
    service: "1200HP Single Turbo Remap",
    duration: "3 Weeks",
    cost: "€12,000",
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2000&auto=format&fit=crop",
    adjustmentData: { camber: "-1.5°", boost: "2.8 BAR", lambda: "0.79" }
  },
  {
    title: "Naturally Aspirated V12 Precision",
    model: "Zonda R Track Check",
    service: "Chassis Align & Exhaust Calibration",
    duration: "1 Week",
    cost: "€8,000",
    image: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=2000&auto=format&fit=crop",
    adjustmentData: { camber: "-3.2°", downforce: "1,500 KG", lambda: "0.85" }
  }
];


export interface Testimonial {
  id?: string;
  rating: number;
  quote: string;
  name: string;
  vehicle: string;
}

export const testimonialsData: Testimonial[] = [
  {
    rating: 5,
    quote: "Roadmen completely transformed how I service my car. The home service is incredibly convenient and professional.",
    name: "Ahmed K.",
    vehicle: "Toyota Land Cruiser Owner"
  },
  {
    rating: 5,
    quote: "Kaito and his team are the only technicians I trust with my carbon-composite bodywork. Pure masters.",
    name: "Elena G.",
    vehicle: "Supra MK4 Owner"
  },
  {
    rating: 5,
    quote: "The only technicians I trust in Dhaka. They use genuine parts and never cut corners on routine maintenance.",
    name: "Muntasir S.",
    vehicle: "Honda Civic Owner"
  }
];
