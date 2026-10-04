export interface Founder {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  instagram: string;
  instagramHandle: string;
  tags: string[];
  credentials: string[];
}

export const FOUNDERS_DATA: Founder[] = [
  {
    id: "founder-vijay",
    name: "Vijay Mathiew",
    role: "Co-Founder & Principal Wildlife Photographer",
    bio: "With over 5 years traversing primeval forests across India and Africa, Vijay Mathiew has dedicated his life to documenting elusive apex predators and fragile ecosystems. Known for his moody, atmospheric low-light aesthetic and deep field ethics, Vijay leads expeditions with an emphasis on animal anticipation, light sculpting, and intimate 1-on-1 mentorship.",
    image: "/images/vijay.jpeg",
    instagram: "https://www.instagram.com/vijaymathiew_photography",
    instagramHandle: "@vijaymathiew_photography",
    tags: ["5+ Years Field Mentorship", "Principal Mentor", "Feline Specialist"],
    credentials: [
      "5+ Years Documenting Big Cats & Avifauna",
      "38+ National Parks & Wildlife Sanctuaries Explored",
      "Published in Renowned Natural History Features",
      "Specialist in Low-Light Western Ghats Canopies",
    ],
  },
  {
    id: "founder-jayavignesh",
    name: "Jayavignesh Hariharan",
    role: "Founder of Jungle Voyages & Co-Founder",
    bio: "Founder of Jungle Voyages, passionate wildlife photographer and tour mentor with over a decade of field experience. He shares expert insights into birdlife, wildlife behavior, photography techniques and non-invasive conservation codes.",
    image: "/images/jayavignesh.jpg",
    instagram: "https://www.instagram.com/jayavignesh_hariharan",
    instagramHandle: "@jayavignesh_hariharan",
    tags: ["10+ Years Experience", "Safari Mentor", "Avian Expert"],
    credentials: [
      "Founder of Jungle Voyages & Safari Mentor",
      "Over a Decade of Wilderness Field Experience",
      "Specialist in Indian Avifauna & Habitat Tracking",
      "Co-Architect of Non-Invasive Safari Codes",
    ],
  },
];
