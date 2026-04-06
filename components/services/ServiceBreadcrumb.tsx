import { ChevronRight } from "lucide-react";

type Crumb = {
  label: string;
  href?: string; // no href = current (non-link)
};

type Props = {
  crumbs: Crumb[];
};

export default function ServiceBreadcrumb({ crumbs }: Props) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.15em]"
    >
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && (
            <ChevronRight
              size={10}
              className="text-white/20"
              aria-hidden
            />
          )}
          {crumb.href ? (
            <a
              href={crumb.href}
              className="text-white/35 transition-colors duration-200 hover:text-gold-500"
            >
              {crumb.label}
            </a>
          ) : (
            <span className="text-gold-500" aria-current="page">
              {crumb.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
