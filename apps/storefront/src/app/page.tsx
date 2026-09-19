import Link from "next/link";
import { products, projects } from "@/data/catalog";
import { ProductGrid } from "@/components/products/ProductGrid";

export default function HomePage() {
  return (
    <>
      <section className="hero-home"><div className="hero-copy"><h1>Beautiful spaces.<br />Built around you.</h1><p>Discover tiles, sanitaryware and fittings for your next project.</p><div className="hero-actions"><Link className="button" href="/products">Explore products →</Link><Link className="button secondary" href="/quote">Request a quote</Link></div></div><div className="hero-image"><img src="/images/demo/hero-bath.jpg" alt="Modern bathroom" /></div></section>
      <section className="benefit-row"><div className="container benefit-grid"><div className="benefit"><span className="icon">♙</span><div><strong>Product guidance</strong><br /><span className="muted">Expert support for your selection</span></div></div><div className="benefit"><span className="icon">▣</span><div><strong>Delivery options</strong><br /><span className="muted">Flexible and reliable across Pakistan</span></div></div><div className="benefit"><span className="icon">☷</span><div><strong>Project quotations</strong><br /><span className="muted">Tailored solutions for homes and projects</span></div></div></div></section>
      <section className="section"><div className="container category-photo-grid"><Link className="photo-card" href="/category/tiles"><img src="/images/demo/tiles.jpg" alt="Tiles" /><span>Tiles →</span></Link><Link className="photo-card" href="/category/sanitaryware"><img src="/images/demo/commode.jpg" alt="Sanitaryware" /><span>Sanitaryware →</span></Link><Link className="photo-card" href="/category/kitchen"><img src="/images/demo/kitchen.jpg" alt="Kitchen" /><span>Kitchen →</span></Link><Link className="photo-card" href="/category/accessories"><img src="/images/demo/shower.jpg" alt="Accessories" /><span>Accessories →</span></Link></div></section>
      <section className="section"><div className="container"><div className="section-head"><h2>Considered details. Everyday quality.</h2><Link href="/products">View all products →</Link></div><ProductGrid products={products.slice(1,5)} /></div></section>
      <section className="section"><div className="container"><div className="section-head"><h2>Inspiration for your space</h2><Link href="/projects">View all projects →</Link></div><div className="masonry">{projects.slice(0,2).map(p => <Link key={p.slug} href={`/projects/${p.slug}`} className="project-card"><img src={p.image} alt={p.title}/><h3>{p.title} →</h3></Link>)}</div></div></section>
      <section className="section"><div className="container panel" style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:20}}><div><h3>Visit our showroom</h3><p className="muted">Explore our wide range of tiles, sanitaryware and fittings in person.</p></div><Link href="/contact" className="button">Get directions →</Link></div></section>
    </>
  );
}