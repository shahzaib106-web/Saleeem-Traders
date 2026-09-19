import type { Metadata } from "next";
import Link from "next/link";
import { ProjectsGallery } from "@/components/projects/ProjectsGallery";

export const metadata: Metadata = { title: "Inspiration", description: "Explore materials, finishes and room combinations." };

export default function ProjectsPage() {
  return (
    <section className="container section">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link> / Inspiration
      </nav>
      <h1>Ideas for your next space</h1>
      <p className="muted lead">Explore materials, finishes and room combinations.</p>
      <ProjectsGallery />
      <div className="panel cta-panel" style={{ marginTop: 36 }}>
        <h2>Bring your ideas to the showroom</h2>
        <Link href="/contact" className="button">
          Plan your visit
        </Link>
      </div>
    </section>
  );
}
