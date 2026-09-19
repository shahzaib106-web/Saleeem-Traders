"use client";
export default function ErrorPage({ reset }: { reset: () => void }) { return <div className="container section"><div className="panel"><h1>Something went wrong</h1><button className="button" onClick={reset}>Try again</button></div></div>; }
