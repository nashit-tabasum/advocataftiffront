import React from "react";

type NavItem = { label: React.ReactNode; href?: string };

type SecondaryNavProps = {
  items: NavItem[];
  className?: string;
};

export default function SecondaryNav({ items, className = "" }: SecondaryNavProps) {
  return (
    <div className={["secondary-nav", className].join(" ")}> 
      <div className="secondary-nav-wrapper">
        <div className="secondary-nav-flyout">
          <div className="secondary-nav-flyout-content no-scrollbar momentum">
            {items.map((it, idx) => (
              <a
                key={idx}
                href={it.href || "#"}
                className="secondary-nav-item"
              >
                {it.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

