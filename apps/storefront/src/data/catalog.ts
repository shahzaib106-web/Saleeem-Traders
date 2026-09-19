import type { Brand } from "@/types/brand";
import type { Category } from "@/types/category";
import type { Product } from "@/types/product";

export const categories: Category[] = [
  {
    name: "Tiles",
    slug: "tiles",
    description: "Floor, wall and outdoor porcelain tiles.",
    icon: "▦",
    eyebrow: "Porcelain & ceramic tiles",
    heroTitle: "Tiles for every space.",
    heroImage: "/images/demo/tiles.jpg",
    heroAlt: "Large-format stone-effect porcelain tiles displayed in a bright showroom",
    subcategories: [
      { label: "Floor tiles", tag: "floor" },
      { label: "Wall tiles", tag: "wall" },
      { label: "Outdoor tiles", tag: "outdoor" }
    ]
  },
  {
    name: "Sanitaryware",
    slug: "sanitaryware",
    description: "Commodes, basins, tubs and bathroom fixtures.",
    icon: "◠",
    eyebrow: "Sanitaryware",
    heroTitle: "Bathrooms, beautifully fitted.",
    heroImage: "/images/demo/commode.jpg",
    heroAlt: "Wall-hung commode against grey stone tiles in a modern bathroom",
    subcategories: [
      { label: "Commodes", tag: "commodes" },
      { label: "Basins", tag: "basins" },
      { label: "Bathtubs", tag: "bathtubs" }
    ]
  },
  {
    name: "Kitchen",
    slug: "kitchen",
    description: "Sinks, mixer taps and kitchen fittings.",
    icon: "⌂",
    eyebrow: "Kitchen fittings",
    heroTitle: "The heart of the home.",
    heroImage: "/images/demo/kitchen.jpg",
    heroAlt: "Oak kitchen with a marble island, pendant lights and a brushed mixer tap",
    subcategories: [
      { label: "Sinks", tag: "sinks" },
      { label: "Mixer taps", tag: "taps" }
    ]
  },
  {
    name: "Accessories",
    slug: "accessories",
    description: "Showers, drains, angle valves and finishing details.",
    icon: "✦",
    eyebrow: "Bathroom accessories",
    heroTitle: "The finishing touches.",
    heroImage: "/images/demo/accessories-towels.jpg",
    heroAlt: "Brass towel rail with white towels on a warm stone wall",
    subcategories: [
      { label: "Showers", tag: "showers" },
      { label: "Bathroom accessories", tag: "bathroom" }
    ]
  }
];

export const products: Product[] = [
  {
    id: "p1",
    name: "Marble Grey Porcelain Tile",
    slug: "marble-grey-porcelain-tile",
    category: "tiles",
    brand: "rak-ceramics",
    price: 450,
    unit: "sq ft",
    packPrice: 6975,
    coverage: 15.5,
    rating: 4.9,
    image: "/images/demo/marble-grey.jpg",
    gallery: ["/images/demo/marble-grey.jpg", "/images/demo/tiles.jpg", "/images/demo/swatches.jpg", "/images/demo/living-warm.jpg"],
    description: "Elegant grey porcelain floor and wall tile with refined stone movement.",
    tags: ["floor", "wall"],
    sizes: ["60 × 60 cm", "60 × 120 cm"],
    finishes: ["Matt", "Glossy"],
    specifications: { Size: "60 × 60 cm", Finish: "Matt", Material: "Porcelain", Coverage: "15.5 sq ft / box", Application: "Indoor & outdoor", "Tile type": "Rectified" }
  },
  {
    id: "p2",
    name: "Carrara White Tile",
    slug: "carrara-white-tile",
    category: "tiles",
    brand: "rak-ceramics",
    price: 420,
    unit: "sq ft",
    packPrice: 6510,
    coverage: 15.5,
    rating: 4.8,
    image: "/images/demo/carrara.jpg",
    gallery: ["/images/demo/carrara.jpg", "/images/demo/product-carrara.jpg", "/images/demo/hero-bath.jpg", "/images/demo/swatches.jpg"],
    description: "Bright marble-effect porcelain for bathrooms and living areas.",
    tags: ["floor", "wall"],
    sizes: ["30 × 60 cm", "60 × 60 cm"],
    finishes: ["Matt", "Glossy"],
    specifications: { Size: "60 × 60 cm", Finish: "Matt", Material: "Porcelain", Coverage: "15.5 sq ft / box", Application: "Indoor" }
  },
  {
    id: "p3",
    name: "Oak Look Tile",
    slug: "oak-look-tile",
    category: "tiles",
    brand: "nobel",
    price: 380,
    unit: "sq ft",
    packPrice: 4900,
    coverage: 12.9,
    rating: 4.7,
    image: "/images/demo/oak.jpg",
    gallery: ["/images/demo/oak.jpg", "/images/demo/living-warm.jpg", "/images/demo/kitchen.jpg"],
    description: "Warm wood-effect porcelain with easy maintenance.",
    tags: ["floor"],
    sizes: ["20 × 120 cm"],
    finishes: ["Textured"],
    specifications: { Size: "20 × 120 cm", Finish: "Textured", Material: "Porcelain", Coverage: "12.9 sq ft / box", Application: "Indoor" }
  },
  {
    id: "p9",
    name: "Urban Grey Tile",
    slug: "urban-grey-tile",
    category: "tiles",
    brand: "nobel",
    price: 420,
    unit: "sq ft",
    packPrice: 6510,
    coverage: 15.5,
    rating: 4.5,
    image: "/images/demo/marble-grey.jpg",
    gallery: ["/images/demo/marble-grey.jpg", "/images/demo/showroom.jpg"],
    description: "Contemporary grey tile for minimalist interiors.",
    tags: ["floor", "wall"],
    sizes: ["60 × 60 cm"],
    finishes: ["Matt"],
    specifications: { Size: "60 × 60 cm", Finish: "Matt", Material: "Porcelain", Coverage: "15.5 sq ft / box", Application: "Indoor" }
  },
  {
    id: "p10",
    name: "Slate Outdoor Paver",
    slug: "slate-outdoor-paver",
    category: "tiles",
    brand: "rak-ceramics",
    price: 520,
    unit: "sq ft",
    packPrice: 8060,
    coverage: 15.5,
    rating: 4.6,
    badge: "New",
    image: "/images/demo/tiles.jpg",
    gallery: ["/images/demo/tiles.jpg", "/images/demo/swatches.jpg"],
    description: "Anti-slip 20 mm porcelain paver for terraces, patios and pool surrounds.",
    tags: ["outdoor", "floor"],
    sizes: ["60 × 60 cm"],
    finishes: ["Textured"],
    specifications: { Size: "60 × 60 cm", Finish: "Textured", Material: "Porcelain (20 mm)", Coverage: "15.5 sq ft / box", Application: "Outdoor", "Slip rating": "R11" }
  },
  {
    id: "p11",
    name: "Greige Stone Wall Tile",
    slug: "greige-stone-wall-tile",
    category: "tiles",
    brand: "nobel",
    price: 395,
    unit: "sq ft",
    packPrice: 4230,
    coverage: 10.7,
    rating: 4.4,
    image: "/images/demo/swatches.jpg",
    gallery: ["/images/demo/swatches.jpg", "/images/demo/living-warm.jpg"],
    description: "Soft greige ceramic wall tile that pairs with warm woods and brass.",
    tags: ["wall"],
    sizes: ["30 × 60 cm"],
    finishes: ["Matt", "Glossy"],
    specifications: { Size: "30 × 60 cm", Finish: "Matt", Material: "Ceramic", Coverage: "10.7 sq ft / box", Application: "Indoor walls" }
  },
  {
    id: "p4",
    name: "Wall-hung Commode",
    slug: "wall-hung-commode",
    category: "sanitaryware",
    brand: "kohler",
    price: 28500,
    unit: "piece",
    rating: 4.8,
    image: "/images/demo/commode.jpg",
    gallery: ["/images/demo/commode.jpg", "/images/demo/product-commode.jpg", "/images/demo/hero-bath.jpg"],
    description: "Clean, space-saving ceramic commode for modern bathrooms.",
    tags: ["commodes"],
    finishes: ["White", "Matt white"],
    specifications: { Color: "White", Material: "Ceramic", Installation: "Wall-hung", Warranty: "5 years" }
  },
  {
    id: "p5",
    name: "Countertop Basin",
    slug: "countertop-basin",
    category: "sanitaryware",
    brand: "cera",
    price: 16800,
    unit: "piece",
    rating: 4.6,
    image: "/images/demo/product-commode.jpg",
    gallery: ["/images/demo/product-commode.jpg", "/images/demo/hero-bath.jpg"],
    description: "Soft rectangular basin with premium glaze.",
    tags: ["basins"],
    sizes: ["560 mm", "600 mm"],
    specifications: { Color: "White", Material: "Ceramic", Size: "560 mm" }
  },
  {
    id: "p12",
    name: "Freestanding Bathtub",
    slug: "freestanding-bathtub",
    category: "sanitaryware",
    brand: "kohler",
    price: 145000,
    unit: "piece",
    rating: 4.9,
    image: "/images/demo/hero-bath.jpg",
    gallery: ["/images/demo/hero-bath.jpg", "/images/demo/showroom.jpg"],
    description: "Sculpted acrylic freestanding tub with a smooth gloss finish.",
    tags: ["bathtubs"],
    inStock: false,
    specifications: { Color: "White", Material: "Acrylic", Length: "1700 mm", Warranty: "10 years" }
  },
  {
    id: "p6",
    name: "Kitchen Mixer Tap",
    slug: "kitchen-mixer-tap",
    category: "kitchen",
    brand: "grohe",
    price: 8750,
    unit: "piece",
    rating: 4.7,
    image: "/images/demo/tap.jpg",
    gallery: ["/images/demo/tap.jpg", "/images/demo/product-tap.jpg", "/images/demo/kitchen.jpg"],
    description: "Chrome kitchen mixer with smooth single-lever control.",
    tags: ["taps"],
    finishes: ["Chrome", "Brushed steel"],
    specifications: { Finish: "Chrome", Material: "Brass", Warranty: "3 years" }
  },
  {
    id: "p7",
    name: "Kitchen Sink",
    slug: "kitchen-sink",
    category: "kitchen",
    brand: "jaquar",
    price: 28000,
    unit: "piece",
    rating: 4.5,
    image: "/images/demo/kitchen.jpg",
    gallery: ["/images/demo/kitchen.jpg", "/images/demo/product-tap.jpg"],
    description: "Durable stainless steel sink for everyday use.",
    tags: ["sinks"],
    sizes: ["Single bowl", "Double bowl"],
    specifications: { Material: "Stainless steel", Bowl: "Single", Finish: "Satin" }
  },
  {
    id: "p8",
    name: "Rain Shower Set",
    slug: "rain-shower-set",
    category: "accessories",
    brand: "grohe",
    price: 24900,
    unit: "set",
    rating: 4.8,
    image: "/images/demo/shower.jpg",
    gallery: ["/images/demo/shower.jpg", "/images/demo/product-shower.jpg", "/images/demo/hero-bath.jpg"],
    description: "Overhead shower and hand shower set with premium chrome finish.",
    tags: ["showers"],
    finishes: ["Chrome", "Matt black"],
    specifications: { Finish: "Chrome", Includes: "Rain shower + hand shower", Warranty: "3 years" }
  },
  {
    id: "p13",
    name: "Brass Towel Rail",
    slug: "brass-towel-rail",
    category: "accessories",
    brand: "jaquar",
    price: 6400,
    unit: "piece",
    rating: 4.6,
    image: "/images/demo/accessories-towels.jpg",
    gallery: ["/images/demo/accessories-towels.jpg"],
    description: "Solid brass 600 mm towel rail in a warm brushed finish.",
    tags: ["bathroom"],
    finishes: ["Brushed brass", "Chrome"],
    specifications: { Finish: "Brushed brass", Material: "Solid brass", Length: "600 mm", Warranty: "2 years" }
  },
  {
    id: "p14",
    name: "Concealed Shower Mixer",
    slug: "concealed-shower-mixer",
    category: "accessories",
    brand: "grohe",
    price: 18900,
    unit: "piece",
    rating: 4.7,
    image: "/images/demo/product-shower.jpg",
    gallery: ["/images/demo/product-shower.jpg", "/images/demo/shower.jpg"],
    description: "Two-way concealed mixer with a slim chrome plate and hand shower.",
    tags: ["showers"],
    finishes: ["Chrome"],
    specifications: { Finish: "Chrome", Outlets: "2", Material: "Brass", Warranty: "3 years" }
  }
];

export const brands: Brand[] = [
  { name: "RAK Ceramics", slug: "rak-ceramics", description: "Tiles & surfaces", image: "/images/demo/tiles.jpg" },
  { name: "GROHE", slug: "grohe", description: "Bathroom fittings", image: "/images/demo/shower.jpg" },
  { name: "Kohler", slug: "kohler", description: "Sanitaryware", image: "/images/demo/commode.jpg" },
  { name: "Jaquar", slug: "jaquar", description: "Bathroom fittings", image: "/images/demo/tap.jpg" },
  { name: "CERA", slug: "cera", description: "Sanitaryware", image: "/images/demo/product-commode.jpg" },
  { name: "Nobel", slug: "nobel", description: "Tiles & flooring", image: "/images/demo/oak.jpg" }
];

export const projectTypes = ["Bathrooms", "Kitchens", "Living spaces", "Outdoor"] as const;

export const projects = [
  { slug: "warm-stone-bathroom", title: "Warm stone bathroom", type: "Bathrooms", image: "/images/demo/hero-bath.jpg", desc: "Soft stone tones, brass fittings and a calming everyday feel." },
  { slug: "contemporary-kitchen", title: "A calm, contemporary kitchen", type: "Kitchens", image: "/images/demo/kitchen.jpg", desc: "Oak textures, marble counters and practical sink fittings." },
  { slug: "natural-textures", title: "Natural textures", type: "Living spaces", image: "/images/demo/living-warm.jpg", desc: "Layered neutrals and porcelain finishes for comfortable rooms." },
  { slug: "outdoor-porcelain", title: "Outdoor porcelain", type: "Outdoor", image: "/images/demo/tiles.jpg", desc: "Durable surfaces for terraces and garden seating areas." },
  { slug: "showroom-bathroom-suite", title: "Showroom bathroom suite", type: "Bathrooms", image: "/images/demo/showroom.jpg", desc: "A complete suite as displayed in our Lahore showroom." },
  { slug: "spa-inspired-wet-room", title: "Spa-inspired wet room", type: "Bathrooms", image: "/images/demo/shower.jpg", desc: "Concealed fittings and large-format grey porcelain." }
];

export const gallery = [
  { title: "Bath display", image: "/images/demo/hero-bath.jpg" },
  { title: "Tile wall", image: "/images/demo/tiles.jpg" },
  { title: "Kitchen setting", image: "/images/demo/kitchen.jpg" },
  { title: "Showroom floor", image: "/images/demo/showroom.jpg" },
  { title: "Living room finishes", image: "/images/demo/living-warm.jpg" },
  { title: "Material swatches", image: "/images/demo/swatches.jpg" },
  { title: "Sanitaryware display", image: "/images/demo/commode.jpg" },
  { title: "Accessories wall", image: "/images/demo/accessories-towels.jpg" },
  { title: "Shower fittings", image: "/images/demo/shower.jpg" }
];

export const brandMap = Object.fromEntries(brands.map((b) => [b.slug, b])) as Record<string, Brand>;
export const categoryMap = Object.fromEntries(categories.map((c) => [c.slug, c])) as Record<string, Category>;

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
