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
    bio: "With 5+ years tracking apex predators across India, Vijay leads small-group expeditions focused on natural light, animal behavior, and hands-on 1-on-1 field mentoring.",
    image: "/images/vijay.jpeg",
    instagram: "https://www.instagram.com/vijaymathiew_photography",
    instagramHandle: "@vijaymathiew_photography",
    tags: ["5+ Years Field Exp", "Big Cat Specialist", "1-on-1 Mentorship"],
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
    bio: "Founder of Jungle Voyages with 10+ years in the field, Jayavignesh specializes in avian photography, habitat tracking, and ethical field coaching.",
    image: "/images/jayavignesh.jpg",
    instagram: "https://www.instagram.com/jayavignesh_hariharan",
    instagramHandle: "@jayavignesh_hariharan",
    tags: ["10+ Years Experience", "Avian Specialist", "Safari Mentor"],
    credentials: [
      "Founder of Jungle Voyages & Safari Mentor",
      "Over a Decade of Wilderness Field Experience",
      "Specialist in Indian Avifauna & Habitat Tracking",
      "Co-Architect of Non-Invasive Safari Codes",
    ],
  },
];
