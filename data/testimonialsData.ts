export interface Testimonial {
  id: string;
  name: string;
  handle: string;
  location: string;
  gear: string;
  tour: string;
  quote: string;
}

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "t1",
    name: "Rohan Deshmukh",
    handle: "@rohan_wildlife",
    location: "Mumbai, India",
    gear: "Nikon Z9 • 400mm f/2.8",
    tour: "Tadoba Feline Sanctuary",
    quote:
      "Traveling with VM Wild Expeditions was a revelation. Having just 3 of us in the Gypsy meant I could track a tigress crossing without anyone blocking my lens. Vijay’s advice on handling backlit dust resulted in the best shots of my life!",
  },
  {
    id: "t2",
    name: "Dr. Katherine Wood",
    handle: "@katherinewood_birds",
    location: "London, UK",
    gear: "Sony A1 • 200-600mm G",
    tour: "Western Ghats Rainforest Expedition",
    quote:
      "The attention to birding detail was extraordinary! Spotting the roosting Sri Lanka Frogmouth within hours was dream material. Uncompromising field ethics and respect for the rainforest canopy. Highly recommend!",
  },
  {
    id: "t3",
    name: "Arjun Swaminathan",
    handle: "@arjun_lenscraft",
    location: "Bangalore, India",
    gear: "Canon R5 • 500mm f/4",
    tour: "Kabini Viceroy's Vista",
    quote:
      "Fourth time in Kabini, but first time with Vijay Mathiew. We waited silently at an intersecting teak corridor and Saya walked right into golden hour side-light. An unforgettable moment captured with flawless vehicle positioning!",
  },
  {
    id: "t4",
    name: "Pooja Iyer",
    handle: "@pooja_visuals",
    location: "Chennai, India",
    gear: "Sony A7R V • 100-400mm GM",
    tour: "Pench Woodland Realm",
    quote:
      "The difference between tourist safaris and VM Wild Expeditions is night and day. 1-on-1 histogram calibration in the field helped me stop blowing out tiger white patches in harsh midday sun. Worth every single penny!",
  },
];
