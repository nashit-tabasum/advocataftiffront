import React from "react";

type NavItem = { label: React.ReactNode; href?: string };

type SecondaryNavProps = {
  items: NavItem[];
  className?: string;
  activePath?: string;
};

export default function SecondaryNav({
  items,
  className = "",
  activePath,
}: SecondaryNavProps) {
  const normalizePath = (p?: string | null) => {
    if (!p) return "";
    try {
      // If it's an absolute URL, use URL API; otherwise, create a fake base
      const url = p.startsWith("http")
        ? new URL(p)
        : new URL(p, "http://local");
      let pathname = url.pathname || "";
      // remove trailing slash except root
      if (pathname.length > 1 && pathname.endsWith("/"))
        pathname = pathname.slice(0, -1);
      return pathname;
    } catch {
      // Fall back to basic split
      return String(p).split("?")[0].replace(/\/$/, "");
    }
  };

  const activePathNorm = normalizePath(activePath || "");

  return (
    <div className={["secondary-nav", className].join(" ")}>
      <div className="secondary-nav-wrapper">
        <div className="secondary-nav-flyout">
          <div className="secondary-nav-flyout-content no-scrollbar momentum flex gap-6">
            {items.map((it, idx) => {
              const hrefPathNorm = normalizePath(it.href || "");
              const isActive =
                !!hrefPathNorm && hrefPathNorm === activePathNorm;

              return (
                <a
                  key={idx}
                  href={it.href || "#"}
                  className={[
                    "secondary-nav-item px-4 py-2 transition-colors",
                    isActive ? "border-slate-600" : "",
                  ].join(" ")}
                >
                  {it.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
