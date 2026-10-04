export interface GalleryItem {
  id: string;
  title: string;
  category: "Wildlife" | "Landscapes" | "Birds" | "Big Cats" | "Conservation" | "People & Culture";
  location: string;
  src: string;
  aspectRatio: "portrait" | "landscape" | "square";
  exif: {
    camera: string;
    lens: string;
    shutter: string;
    aperture: string;
    iso: string;
  };
}

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: "g1",
    title: "Shadows of the Mara Pride",
    category: "Big Cats",
    location: "Masai Mara, Kenya",
    src: "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=1600&q=85",
    aspectRatio: "portrait",
    exif: {
      camera: "Canon EOS R5",
      lens: "RF 400mm f/2.8L IS USM",
      shutter: "1/1600s",
      aperture: "f/2.8",
      iso: "400",
    },
  },
  {
    id: "g2",
    title: "The Golden March",
    category: "Wildlife",
    location: "Amboseli National Park, Kenya",
    src: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1600&q=85",
    aspectRatio: "landscape",
    exif: {
      camera: "Nikon Z9",
      lens: "NIKKOR Z 600mm f/4 TC VR S",
      shutter: "1/2000s",
      aperture: "f/4.0",
      iso: "250",
    },
  },
  {
    id: "g3",
    title: "Storm Over Serengeti Plains",
    category: "Landscapes",
    location: "Serengeti, Tanzania",
    src: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=85",
    aspectRatio: "landscape",
    exif: {
      camera: "Sony Alpha 1",
      lens: "FE 24-70mm f/2.8 GM II",
      shutter: "1/500s",
      aperture: "f/8.0",
      iso: "100",
    },
  },
  {
    id: "g4",
    title: "Crown of the Lilac Roller",
    category: "Birds",
    location: "Tarangire National Park, Tanzania",
    src: "https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?auto=format&fit=crop&w=1600&q=85",
    aspectRatio: "square",
    exif: {
      camera: "Sony Alpha 1",
      lens: "FE 600mm f/4 GM OSS",
      shutter: "1/3200s",
      aperture: "f/4.0",
      iso: "640",
    },
  },
  {
    id: "g5",
    title: "Guarding the Corridor",
    category: "Conservation",
    location: "Laikipia Conservancy, Kenya",
    src: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1600&q=85",
    aspectRatio: "portrait",
    exif: {
      camera: "Fujifilm GFX 100 II",
      lens: "GF 250mm f/4 R LM OIS WR",
      shutter: "1/800s",
      aperture: "f/4.0",
      iso: "320",
    },
  },
  {
    id: "g6",
    title: "Stories by the Campfire",
    category: "People & Culture",
    location: "Samburu, Kenya",
    src: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=85",
    aspectRatio: "landscape",
    exif: {
      camera: "Leica SL2",
      lens: "APO-Summicron-SL 50mm f/2 ASPH",
      shutter: "1/125s",
      aperture: "f/2.0",
      iso: "1600",
    },
  },
  {
    id: "g7",
    title: "Solitary Sentinel",
    category: "Big Cats",
    location: "Sabi Sabi Reserve, South Africa",
    src: "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=1600&q=85",
    aspectRatio: "portrait",
    exif: {
      camera: "Canon EOS R3",
      lens: "RF 600mm f/4L IS USM",
      shutter: "1/1000s",
      aperture: "f/4.0",
      iso: "800",
    },
  },
  {
    id: "g8",
    title: "Flamingo Reflection at Dawn",
    category: "Birds",
    location: "Lake Nakuru, Kenya",
    src: "https://images.unsplash.com/photo-1511216113906-8f57bb83e776?auto=format&fit=crop&w=1600&q=85",
    aspectRatio: "landscape",
    exif: {
      camera: "Nikon Z9",
      lens: "NIKKOR Z 400mm f/2.8 TC VR S",
      shutter: "1/4000s",
      aperture: "f/2.8",
      iso: "200",
    },
  },
  {
    id: "g9",
    title: "Okavango Morning Mist",
    category: "Landscapes",
    location: "Okavango Delta, Botswana",
    src: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1600&q=85",
    aspectRatio: "square",
    exif: {
      camera: "Hasselblad X2D 100C",
      lens: "XCD 38mm f/2.5 V",
      shutter: "1/250s",
      aperture: "f/5.6",
      iso: "64",
    },
  },
];
