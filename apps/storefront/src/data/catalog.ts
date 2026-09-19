import type { Brand } from "@/types/brand";
import type { Category } from "@/types/category";
import type { Product } from "@/types/product";

export const categories: Category[] = [
  { name: "Tiles", slug: "tiles", description: "Floor, wall and outdoor porcelain tiles.", icon: "▦" },
  { name: "Sanitaryware", slug: "sanitaryware", description: "Commodes, basins, tubs and bathroom fixtures.", icon: "◠" },
  { name: "Kitchen", slug: "kitchen", description: "Sinks, mixer taps and kitchen fittings.", icon: "⌂" },
  { name: "Accessories", slug: "accessories", description: "Showers, drains, angle valves and finishing details.", icon: "✦" }
];

export const products: Product[] = [
  { id:"p1", name:"Marble Grey Porcelain Tile", slug:"marble-grey-porcelain-tile", category:"tiles", brand:"rak-ceramics", price:450, unit:"sq ft", packPrice:6975, rating:4.9, image:"/images/demo/marble-grey.jpg", description:"Elegant grey porcelain floor and wall tile with refined stone movement.", specifications:{Size:"60 × 60 cm", Finish:"Matt", Material:"Porcelain", Coverage:"15.5 sq ft / box", Application:"Indoor & outdoor", "Tile type":"Rectified"}},
  { id:"p2", name:"Carrara White Tile", slug:"carrara-white-tile", category:"tiles", brand:"rak-ceramics", price:420, unit:"sq ft", rating:4.8, image:"/images/demo/carrara.jpg", description:"Bright marble-effect porcelain for bathrooms and living areas.", specifications:{Size:"60 × 60 cm", Finish:"Matt", Material:"Porcelain"}},
  { id:"p3", name:"Oak Look Tile", slug:"oak-look-tile", category:"tiles", brand:"nobel", price:380, unit:"sq ft", rating:4.7, image:"/images/demo/oak.jpg", description:"Warm wood-effect porcelain with easy maintenance.", specifications:{Size:"20 × 120 cm", Finish:"Textured", Material:"Porcelain"}},
  { id:"p4", name:"Wall-hung Commode", slug:"wall-hung-commode", category:"sanitaryware", brand:"kohler", price:28500, unit:"piece", rating:4.8, image:"/images/demo/commode.jpg", description:"Clean, space-saving ceramic commode for modern bathrooms.", specifications:{Color:"White", Material:"Ceramic", Installation:"Wall-hung", Warranty:"5 years"}},
  { id:"p5", name:"Countertop Basin", slug:"countertop-basin", category:"sanitaryware", brand:"cera", price:16800, unit:"piece", rating:4.6, image:"/images/demo/commode.jpg", description:"Soft rectangular basin with premium glaze.", specifications:{Color:"White", Material:"Ceramic", Size:"560 mm"}},
  { id:"p6", name:"Kitchen Mixer Tap", slug:"kitchen-mixer-tap", category:"kitchen", brand:"grohe", price:8750, unit:"piece", rating:4.7, image:"/images/demo/tap.jpg", description:"Chrome kitchen mixer with smooth single-lever control.", specifications:{Finish:"Chrome", Material:"Brass", Warranty:"3 years"}},
  { id:"p7", name:"Kitchen Sink", slug:"kitchen-sink", category:"kitchen", brand:"jaquar", price:28000, unit:"piece", rating:4.5, image:"/images/demo/kitchen.jpg", description:"Durable stainless steel sink for everyday use.", specifications:{Material:"Stainless steel", Bowl:"Single", Finish:"Satin"}},
  { id:"p8", name:"Rain Shower Set", slug:"rain-shower-set", category:"accessories", brand:"grohe", price:24900, unit:"set", rating:4.8, image:"/images/demo/shower.jpg", description:"Overhead shower and hand shower set with premium chrome finish.", specifications:{Finish:"Chrome", Includes:"Rain shower + hand shower", Warranty:"3 years"}},
  { id:"p9", name:"Urban Grey Tile", slug:"urban-grey-tile", category:"tiles", brand:"nobel", price:420, unit:"sq ft", rating:4.5, image:"/images/demo/marble-grey.jpg", description:"Contemporary grey tile for minimalist interiors.", specifications:{Size:"60 × 60 cm", Finish:"Matt", Material:"Porcelain"}}
];

export const cartItems = [
  { product: products[0], qty: 9, lineTotal: 62775, note: "60 × 60 cm · Matt" },
  { product: products[3], qty: 1, lineTotal: 28500, note: "White · Ceramic" },
  { product: products[5], qty: 1, lineTotal: 8750, note: "Chrome" }
];

export const brands: Brand[] = [
  { name:"RAK Ceramics", slug:"rak-ceramics", description:"Tiles & surfaces", image:"/images/demo/tiles.jpg" },
  { name:"GROHE", slug:"grohe", description:"Bathroom fittings", image:"/images/demo/shower.jpg" },
  { name:"Kohler", slug:"kohler", description:"Sanitaryware", image:"/images/demo/commode.jpg" },
  { name:"Jaquar", slug:"jaquar", description:"Bathroom fittings", image:"/images/demo/tap.jpg" },
  { name:"CERA", slug:"cera", description:"Sanitaryware", image:"/images/demo/commode.jpg" },
  { name:"Nobel", slug:"nobel", description:"Tiles & flooring", image:"/images/demo/oak.jpg" }
];

export const projects = [
  { slug:"warm-stone-bathroom", title:"Warm stone bathroom", type:"Bathrooms", image:"/images/demo/hero-bath.jpg", desc:"Soft stone tones, brass fittings and a calming everyday feel." },
  { slug:"contemporary-kitchen", title:"A calm, contemporary kitchen", type:"Kitchens", image:"/images/demo/kitchen.jpg", desc:"Oak textures, marble counters and practical sink fittings." },
  { slug:"natural-textures", title:"Natural textures", type:"Living spaces", image:"/images/demo/showroom.jpg", desc:"Layered neutrals and porcelain finishes for comfortable rooms." },
  { slug:"outdoor-porcelain", title:"Outdoor porcelain", type:"Outdoor", image:"/images/demo/tiles.jpg", desc:"Durable surfaces for terraces and garden seating areas." }
];
