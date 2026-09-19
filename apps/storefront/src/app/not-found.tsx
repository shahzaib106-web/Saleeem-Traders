import Link from "next/link";
export default function NotFound() { return <div className="container section"><div className="panel"><h1>Page not found</h1><p className="muted">The page you requested does not exist.</p><Link className="button" href="/">Back home</Link></div></div>; }
