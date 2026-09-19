import { notFound } from "next/navigation";
import { projects } from "@/data/catalog";
import Link from "next/link";
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }){const {slug}=await params;const p=projects.find(x=>x.slug===slug);if(!p)notFound();return <section className="container section"><div className="breadcrumb"><Link href="/">Home</Link> / <Link href="/projects">Projects</Link> / {p.title}</div><div className="page-hero with-image"><div><span className="badge">{p.type}</span><h1>{p.title}</h1><p className="muted" style={{fontSize:22}}>{p.desc}</p><Link className="button" href="/quote">Request this look →</Link></div><img src={p.image} alt={p.title}/></div></section>}
export function generateStaticParams(){return projects.map(p=>({slug:p.slug}))}
