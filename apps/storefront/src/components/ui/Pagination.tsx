"use client";

type PaginationProps = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null;
  return (
    <nav className="pagination" aria-label="Pagination">
      <button type="button" onClick={() => onChange(page - 1)} disabled={page <= 1} aria-label="Previous page">
        ‹
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <button type="button" key={n} onClick={() => onChange(n)} aria-current={n === page ? "page" : undefined} aria-label={`Page ${n}`}>
          {n}
        </button>
      ))}
      <button type="button" onClick={() => onChange(page + 1)} disabled={page >= totalPages} aria-label="Next page">
        ›
      </button>
    </nav>
  );
}
