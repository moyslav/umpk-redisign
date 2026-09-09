"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MENU, SITE } from "@/data/site";
import { Icon } from "@/components/icons";
import ThemeToggle from "@/components/ThemeToggle";

function itemUrl(item: { slug?: string; href?: string }): string | null {
  if (item.href) return item.href;
  if (item.slug) return `/${item.slug}`;
  return null;
}

function isActiveCategory(cat: (typeof MENU)[number], pathname: string): boolean {
  if (pathname === `/${cat.slug}`) return true;
  return cat.items.some((i) => i.slug && pathname === `/${i.slug}`);
}

export default function Header() {
  const pathname = usePathname();
  const [openPanel, setOpenPanel] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerGroup, setDrawerGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);
  const headerRef = useRef<HTMLElement | null>(null);

  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpenPanel(null);
    setDrawerOpen(false);
    setDrawerGroup(null);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenPanel(null);
        setDrawerOpen(false);
      }
    }
    function onDown(e: PointerEvent) {
      const target = e.target as Node;
      if (headerRef.current && !headerRef.current.contains(target)) {
        setOpenPanel(null);
        setDrawerOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", drawerOpen);
    return () => document.body.classList.remove("no-scroll");
  }, [drawerOpen]);

  const togglePanel = (slug: string) =>
    setOpenPanel((cur) => (cur === slug ? null : slug));

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`} ref={headerRef}>
      <div className="container-app header-inner">
        <Link href="/" className="brand" aria-label={`${SITE.full} — на главную`}>
          <span className="brand-mark" aria-hidden="true">
            У
          </span>
          <span className="brand-text">
            <strong>{SITE.short}</strong>
            <small>{SITE.name}</small>
          </span>
        </Link>

        <nav className="main-nav-desktop" aria-label="Основное меню">
          <ul className="nav-list">
            {MENU.map((cat) =>
              cat.contacts ? (
                <li key={cat.slug} className="nav-item">
                  <Link
                    href={`/${cat.slug}`}
                    className={`nav-trigger${pathname === `/${cat.slug}` ? " active" : ""}`}
                  >
                    {cat.label}
                  </Link>
                </li>
              ) : (
                <li
                  key={cat.slug}
                  className={`nav-item${cat.wide ? " wide" : ""}${
                    openPanel === cat.slug ? " open" : ""
                  }`}
                >
                  <button
                    type="button"
                    className={`nav-trigger${isActiveCategory(cat, pathname) ? " active" : ""}`}
                    aria-expanded={openPanel === cat.slug}
                    aria-controls={`panel-${cat.slug}`}
                    onClick={() => togglePanel(cat.slug)}
                  >
                    {cat.short || cat.label}
                    <span className="chev">
                      <Icon name="chevron-down" size={15} />
                    </span>
                  </button>
                  <div className="nav-panel" id={`panel-${cat.slug}`}>
                    <div className="panel-head">
                      <Link href={`/${cat.slug}`} className="go">
                        {cat.label} <Icon name="arrow-right" size={16} />
                      </Link>
                      <span className="hint">все материалы</span>
                    </div>
                    <div className="nav-grid">
                      {cat.items.map((item) => {
                        const url = itemUrl(item);
                        if (!url) return null;
                        const external = Boolean(item.href);
                        const cls = "nav-link";
                        const icon = (
                          <Icon name={external ? "external" : "arrow-up-right"} size={15} />
                        );
                        return external ? (
                          <a
                            key={item.t}
                            className={cls}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            referrerPolicy="no-referrer"
                          >
                            <span>{item.t}</span>
                            {icon}
                          </a>
                        ) : (
                          <Link
                            key={item.t}
                            className={cls}
                            href={url}
                            onClick={() => setOpenPanel(null)}
                          >
                            <span>{item.t}</span>
                            {icon}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </li>
              )
            )}
          </ul>
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <button
            type="button"
            className="icon-btn burger"
            aria-label="Открыть меню"
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen(true)}
          >
            <Icon name="menu" size={20} />
          </button>
        </div>
      </div>

      <div
        className={`scrim${drawerOpen ? " show" : ""}`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />
      <aside className={`nav-drawer${drawerOpen ? " open" : ""}`} aria-label="Мобильное меню">
        <div className="drawer-head">
          <span className="d-brand">
            <span className="brand-mark" aria-hidden="true">
              У
            </span>
            <span>{SITE.short}</span>
          </span>
          <ThemeToggle />
        </div>

        {MENU.map((cat) =>
          cat.contacts ? (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="drawer-link"
              onClick={() => setDrawerOpen(false)}
            >
              {cat.label}
            </Link>
          ) : (
            <div
              key={cat.slug}
              className={`drawer-group${drawerGroup === cat.slug ? " open" : ""}`}
            >
              <button
                type="button"
                className="drawer-link"
                aria-expanded={drawerGroup === cat.slug}
                onClick={() =>
                  setDrawerGroup((cur) => (cur === cat.slug ? null : cat.slug))
                }
              >
                <span>{cat.label}</span>
                <Icon name="chevron-down" size={18} />
              </button>
              <div className="drawer-sub-wrap">
                <div className="drawer-sub">
                  <Link
                    href={`/${cat.slug}`}
                    className="drawer-link sub"
                    onClick={() => setDrawerOpen(false)}
                  >
                    <span>Весь раздел</span>
                    <Icon name="arrow-right" size={16} />
                  </Link>
                  {cat.items.map((item) => {
                    const url = itemUrl(item);
                    if (!url) return null;
                    const external = Boolean(item.href);
                    const subCls = "drawer-link sub";
                    const icon = (
                      <Icon name={external ? "external" : "arrow-up-right"} size={15} />
                    );
                    return external ? (
                      <a
                        key={item.t}
                        className={subCls}
                        href={url}
                        onClick={() => setDrawerOpen(false)}
                        target="_blank"
                        rel="noopener noreferrer"
                        referrerPolicy="no-referrer"
                      >
                        <span>{item.t}</span>
                        {icon}
                      </a>
                    ) : (
                      <Link
                        key={item.t}
                        className={subCls}
                        href={url}
                        onClick={() => setDrawerOpen(false)}
                      >
                        <span>{item.t}</span>
                        {icon}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          )
        )}

        <div style={{ marginTop: "1rem" }}>
          <Link
            className="btn btn-primary"
            href="/specialnosti"
            onClick={() => setDrawerOpen(false)}
          >
            Выбрать специальность
          </Link>
        </div>
      </aside>
    </header>
  );
}
