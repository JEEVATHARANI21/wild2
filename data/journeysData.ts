export interface Journey {
  id: string;
  title: string;
  country: string;
  duration: string;
  focus: string[];
  price: string;
  season: string;
  groupSize: string;
  image: string;
  description: string;
  highlights: string[];
  itinerary: { day: string; title: string; detail: string }[];
}

export const JOURNEYS_DATA: Journey[] = [
  {
    id: "tadoba",
    title: "Tadoba Feline Sanctuary",
    country: "India",
    duration: "4 Days / 3 Nights",
    focus: ["Royal Bengal Tiger", "Indian Leopard", "Sloth Bear", "Dhole"],
    price: "₹79,900 INR",
    season: "October – June (Peak: Mar – May)",
    groupSize: "Max 4 Photographers / Gypsy",
    image: "/images/animals/animal1.jpg",
    description:
      "Immerse in the heart of India's most prolific tiger haven. Tadoba offers peerless opportunities to photograph dominant tiger dynasties and agile leopards around waterholes with dust and golden light.",
    highlights: [
      "6 Exclusive Core Zone 4x4 Gypsy Drives (1 photographer per row)",
      "Daily 1-on-1 field masterclasses by Vijay Mathiew",
      "Guaranteed unobstructed 360° vehicle panning setup",
      "Luxury eco-lodge stay with gourmet meals included",
    ],
    itinerary: [
      { day: "Day 1", title: "Arrival & Maiden Evening Safari", detail: "Pickup and transfer to forest lodge near Moharli/Kolara gate. Equipment check and afternoon drive." },
      { day: "Day 2", title: "Deep Core Safaris — Dawn & Dusk Tracking", detail: "Two game drives focusing on prime lake territory and bamboo thickets." },
      { day: "Day 3", title: "Predator Corridors & Waterhole Vigils", detail: "Morning and evening drives through crossover corridors. Waterhole reflection portraits." },
      { day: "Day 4", title: "Final Morning Safari & Departure", detail: "Dawn drive capturing morning light rays followed by debrief and transfer." },
    ],
  },
  {
    id: "pench",
    title: "Pench Woodland Realm",
    country: "India",
    duration: "4 Days / 3 Nights",
    focus: ["Royal Bengal Tiger", "Indian Leopard", "Wild Dog", "Gaur"],
    price: "₹69,900 INR",
    season: "October – June (Peak: Feb – May)",
    groupSize: "Max 4 Photographers / Gypsy",
    image: "/images/animals/animal2.jpg",
    description:
      "Walk the real-life Mowgli's jungle. Pench's open teak canopy and serene Pench river offer dramatic sightings of Royal Bengal Tigers and packs of wild dogs under dappled woodland sunlight.",
    highlights: [
      "5 Core Zone 4x4 Gypsy game drives with priority gate entry",
      "Focus on dappled canopy light and riverbed predator tracking",
      "Evening RAW file critiques and histogram mastering",
      "3 Nights luxury wildlife resort stay with all meals",
    ],
    itinerary: [
      { day: "Day 1", title: "Arrival & Turia Gate Game Drive", detail: "Check-in at forest resort. First afternoon drive in Turia core zone." },
      { day: "Day 2", title: "Teak Canopy & Riverbed Tracking", detail: "Full day tracking predator movements along dry river channels." },
      { day: "Day 3", title: "Pench River Corridors", detail: "Dawn and dusk drives where wild dog packs hunt and leopards lounge." },
      { day: "Day 4", title: "Dawn Farewell Safari", detail: "Final morning session capturing light rays through teak canopy." },
    ],
  },
  {
    id: "kanha",
    title: "Kanha Sal Meadow Expedition",
    country: "India",
    duration: "5 Days / 4 Nights",
    focus: ["Royal Bengal Tiger", "Hard-Ground Barasingha", "Sloth Bear"],
    price: "₹84,900 INR",
    season: "October – June (Peak: Nov – Apr)",
    groupSize: "Max 4 Photographers / Gypsy",
    image: "/images/animals/animal3.jpg",
    description:
      "Enter India's premier sal forest wilderness. Kanha is world-renowned for majestic tigers traversing frost-covered meadows, vast herds of rare Barasingha, and enchanting morning mist.",
    highlights: [
      "6 Core Zone Gypsys across Mukki & Kanha sectors",
      "Morning mist landscape and tiger silhouette opportunities",
      "Exclusive focus on rare Hard-ground Barasingha behavior",
      "Guided by VM Wild Expeditions skipper",
    ],
    itinerary: [
      { day: "Day 1", title: "Arrival & Mukki Gate Drive", detail: "Transfer to eco-lodge. Introduction to Kanha ecology and afternoon drive." },
      { day: "Day 2-3", title: "Frosty Meadows & Sal Glades", detail: "Morning drives across misty glades searching for barasingha and tigers." },
      { day: "Day 4", title: "Predator Track Corridors", detail: "Tracking resident tiger pairs near natural water streams." },
      { day: "Day 5", title: "Dawn Sunrise Drive & Departure", detail: "Final morning drive followed by brunch and departure transfer." },
    ],
  },
  {
    id: "masai-mara",
    title: "Masai Mara Migration",
    country: "Kenya",
    duration: "7 Days / 6 Nights",
    focus: ["Big Cats", "Migration Crossings", "Savannah Light"],
    price: "$3,950 USD",
    season: "July – October",
    groupSize: "Max 4 Photographers / Landcruiser",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=85",
    description:
      "An unhurried journey through the golden grasslands of Mara, positioned for dramatic big cat encounters, golden-hour light, and river crossings during the Great Migration.",
    highlights: [
      "Custom open-sided 4x4 Landcruisers with specialized camera mounts",
      "Prime positioning near Mara & Talek river crossing points",
      "Nightly image review and field post-processing masterclasses",
      "Private access to quiet conservancy zones away from crowds",
    ],
    itinerary: [
      { day: "Day 1-2", title: "Arrival & The Mara Triangle", detail: "Check into eco-luxury tented camp. Golden hour drive focusing on lion prides." },
      { day: "Day 3-4", title: "River Crossings & Cheetah Hunts", detail: "Full days tracking cheetah coalition hunts and wildebeest herds." },
      { day: "Day 5-6", title: "Conservancy Light Sessions", detail: "Off-road tracking under specialized permits for leopards." },
      { day: "Day 7", title: "Dawn Sunrise Flight & Departure", detail: "Final morning session capturing silhouetted acacia trees." },
    ],
  },
  {
    id: "serengeti",
    title: "Serengeti Endless Plains",
    country: "Tanzania",
    duration: "9 Days / 8 Nights",
    focus: ["Great Migration", "Predator Action", "Endless Plains"],
    price: "$5,200 USD",
    season: "December – April & July – Oct",
    groupSize: "Max 4 Photographers / Vehicle",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1600&q=85",
    description:
      "Follow the endless horizon across Central and Northern Serengeti. Designed around extended patience at sightings to capture intimate animal behavior.",
    highlights: [
      "Mobile camp tracking calving season in Ndutu",
      "Exclusive focus on predator-prey interaction and dramatic skies",
      "Unrestricted field hours from dawn to twilight",
      "One-on-one composition mentoring in the vehicle",
    ],
    itinerary: [
      { day: "Day 1-3", title: "Central Serengeti & Kopjes", detail: "Photographing leopards lounging on ancient granite kopjes in morning mist." },
      { day: "Day 4-6", title: "The Mara River Frontier", detail: "Dramatic cliffside waiting for mega-herd river crossings." },
      { day: "Day 7-9", title: "Seronera Dawn Drives & Return", detail: "Tracking hyenas and lions in golden morning dust storms." },
    ],
  },
  {
    id: "amboseli",
    title: "Amboseli Big Tuskers",
    country: "Kenya",
    duration: "6 Days / 5 Nights",
    focus: ["Tuskers", "Kilimanjaro Views", "Dust & Light"],
    price: "$3,400 USD",
    season: "June – October & Jan – Feb",
    groupSize: "Max 6 Photographers",
    image: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1600&q=85",
    description:
      "Immerse in the realm of Africa's giant tuskers against the snow-capped peak of Mount Kilimanjaro, capturing atmospheric dust clouds and wide-angle habitats.",
    highlights: [
      "Low-angle beanbag shooting setups for giant elephant herds",
      "Epic backlight and dust rim-lighting sessions at sunset",
      "Visit to community conservancies supporting elephant corridors",
      "High-contrast black & white photographic workshops",
    ],
    itinerary: [
      { day: "Day 1-2", title: "Amboseli Marshland Arrival", detail: "Encounters with big tuskers wading through emerald swamps." },
      { day: "Day 3-4", title: "Dust Corridors & Kilimanjaro Dawn", detail: "Positioning vehicles for clear horizon views of Kilimanjaro." },
      { day: "Day 5-6", title: "Salt Flats & Departure", detail: "Abstract landscape and wildlife silhouettes across dry salt pans." },
    ],
  },
];
