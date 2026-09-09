"use client";

import { useEffect, useRef } from "react";
import { Icon } from "@/components/icons";

const STORAGE_KEY = "umpk-theme";

function currentTheme(): "light" | "dark" {
  if (typeof document === "undefined") return "light";
  const t = document.documentElement.getAttribute("data-theme");
  return t === "dark" ? "dark" : "light";
}

export default function ThemeToggle() {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dark = currentTheme() === "dark";
    ref.current?.setAttribute("aria-pressed", String(dark));
    ref.current?.setAttribute(
      "aria-label",
      dark ? "Включить светлую тему" : "Включить тёмную тему"
    );
  }, []);

  function toggle() {
    const next = currentTheme() === "dark" ? "light" : "dark";
    const root = document.documentElement;
    root.classList.add("theme-switching");
    window.setTimeout(() => root.classList.remove("theme-switching"), 520);
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    const dark = next === "dark";
    ref.current?.setAttribute("aria-pressed", String(dark));
    ref.current?.setAttribute(
      "aria-label",
      dark ? "Включить светлую тему" : "Включить тёмную тему"
    );
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", dark ? "#1c1c1e" : "#f5f5f7");
  }

  return (
    <button
      ref={ref}
      type="button"
      className="icon-btn theme-toggle"
      onClick={toggle}
      aria-pressed="false"
      aria-label="Включить тёмную тему"
    >
      <Icon name="sun" size={19} className="ti ti-sun" />
      <Icon name="moon" size={19} className="ti ti-moon" />
    </button>
  );
}
