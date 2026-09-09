/* =====================================================================
   УМПК — каркас: топбар, шапка с мега-меню, подвал, рендер страниц.
   Все страницы собираются в едином дизайне из данных data.js.
   ===================================================================== */
(function () {
  const SITE = window.SITE;
  const MENU = window.MENU;
  const PAGE_BODY = window.PAGE_BODY || {};

  const CAT_INTRO = {
    "kollej": "История и жизнь колледжа: о нас, руководитель, новости, библиотека, СМИ и нормативные сведения.",
    "abiturientu": "Всё для поступающих: направления подготовки, план и правила приёма, вступительные испытания и зачисление.",
    "studentu": "Справочник студента: расписание, документы, практика, общежитие, спорт и воспитательная работа.",
    "svedeniya-oo": "Официальные сведения об образовательной организации в соответствии с требованиями законодательства.",
    "prepodavatelyu": "Материалы для педагогических работников: документы, положения и предметно-цикловые комиссии.",
    "distancionnoe": "Организация дистанционного обучения: платформы, инструкции, контроль и горячая линия.",
    "dop-obrazovanie": "Центр РЦНО: курсы переподготовки, повышения квалификации и профессионального обучения.",
    "kontakty": "Контакты, адрес, телефоны и схема проезда.",
  };

  const DEFAULT_INTRO = "Информация раздела находится в стадии актуализации. Полные материалы будут перенесены с действующего сайта колледжа.";

  function el(tag, cls, html) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function pageUrl(slug) {
    return "section.html?slug=" + encodeURIComponent(slug);
  }
  function escHref(slug) {
    return esc(pageUrl(slug));
  }
  function findItem(slug) {
    for (const cat of MENU) if (cat.items) for (const it of cat.items) if (it.slug === slug) return it;
    return null;
  }
  function findCat(slug) {
    return MENU.find((c) => c.slug === slug);
  }
  function currentSlug() {
    const p = new URLSearchParams(location.search).get("slug");
    return p || "home";
  }

  /* ---------- Топбар (контакты) ---------- */
  function quickBadges() {
    return (window.QUICK_BADGES || []).map((b) => b.href
      ? `<a class="qk" href="${esc(b.href)}" target="_blank" rel="noopener">${esc(b.label)}</a>`
      : `<a class="qk" href="${escHref(b.slug)}">${esc(b.label)}</a>`).join("");
  }

  /* ---------- Шапка / меню ---------- */
  function buildMenu() {
    const slug = currentSlug();
    const isActive = (cat) => {
      if (cat.slug === slug) return true;
      if (cat.slug === "kontakty" && slug === "kontakty") return true;
      return (cat.items || []).some((it) => it.slug === slug);
    };
    return MENU.map((cat) => {
      if (cat.contacts) {
        return `<li class="m-plain"><a class="tl" href="${escHref("kontakty")}">📞 Контакты</a></li>`;
      }
      const cols = chunkArray(cat.items || [], cat.wide ? 6 : cat.items.length).map((chunk) =>
        `<div class="dcol">${chunk.map(ddItem).join("")}</div>`
      ).join("");
      const wide = cat.wide ? " wide" : "";
      const active = isActive(cat) ? " active" : "";
      const ddId = "dd-" + cat.slug;
      return `<li class="has-drop${wide}">
        <div class="drop-head">
          <a class="tl${active}" href="${escHref(cat.slug)}">${cat.icon} <span>${esc(cat.label)}</span></a>
          <button class="caret" type="button" aria-haspopup="true" aria-expanded="false" aria-controls="${esc(ddId)}" aria-label="Открыть подменю «${esc(cat.label)}»"><span aria-hidden="true">▾</span></button>
        </div>
        <div class="dropdown ${cat.wide ? "drop-wide" : ""}" id="${esc(ddId)}"><div class="dgroup">${cols}</div></div>
      </li>`;
    }).join("");
  }
  function ddItem(it) {
    if (it.href) {
      return `<a href="${esc(it.href)}" target="_blank" rel="noopener"><span class="ic">${it.ic || "🔗"}</span><span><strong>${esc(it.t)}</strong><small class="ext">внешний ресурс ↗</small></span></a>`;
    }
    return `<a href="${escHref(it.slug)}"><span class="ic">${it.ic || "•"}</span><span><strong>${esc(it.t)}</strong></span></a>`;
  }
  function chunkArray(arr, size) {
    const out = [];
    for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
    return out;
  }
  function ctaHtml() {
    return (window.HEADER_CTA || []).map((b) =>
      `<a class="btn ${b.style === "primary" ? "btn-primary" : "btn-ghost"}" href="${escHref(b.slug)}">${esc(b.label)}</a>`
    ).join("");
  }
  function themeToggleHtml(extra) {
    return `<button class="theme-toggle${extra ? " " + extra : ""}" type="button" aria-label="Переключить тему" aria-pressed="false">
      <span class="ti ti-sun" aria-hidden="true">☀</span>
      <span class="ti ti-moon" aria-hidden="true">☾</span>
    </button>`;
  }
  function buildHeader() {
    const logo = '<div class="brand-logo"><span class="brand-mark">У</span></div>';
    const short = window.SITE && window.SITE.short ? window.SITE.short : "УМПК";
    return `
      <div class="topbar"><div class="container topbar-inner">${buildTopbarInner()}</div></div>
      <header class="site-header" id="siteHeader">
        <div class="container header-inner">
          <a class="brand" href="index.html" aria-label="${esc(short)} — на главную">${logo}
            <span class="brand-text"><strong>ГБПОУ УМПК</strong><small>Уфимский многопрофильный профессиональный колледж</small></span>
          </a>
          <button class="burger" id="burger" type="button" aria-label="Открыть меню" aria-controls="mainNav" aria-expanded="false">☰</button>
          <div class="nav-scrim" id="navScrim" aria-hidden="true"></div>
          <nav class="main-nav" id="mainNav" aria-label="Основное меню">
            <div class="nav-top">
              <span class="nav-brand">${esc(short)}</span>
              <div class="nav-top-actions">
                ${themeToggleHtml()}
                <button class="nav-close" id="navClose" type="button" aria-label="Закрыть меню">✕</button>
              </div>
            </div>
            <ul class="menu">${buildMenu()}</ul>
            <div class="nav-cta">${ctaHtml()}</div>
          </nav>
          ${themeToggleHtml()}
          <div class="header-cta">${ctaHtml()}</div>
        </div>
      </header>`;
  }
  function buildTopbarInner() {
    const phones = SITE.phones.slice(0, 2).map((p) => `<span>📞 ${esc(p.value)}</span>`).join("");
    return `<div class="contacts">${phones}</div>
      <div class="gov"><span>ГБПОУ «Уфимский многопрофильный профессиональный колледж»</span></div>`;
  }

  /* ---------- Подвал ---------- */
  function buildFooter() {
    const cols = MENU.filter((c) => !c.contacts && c.slug !== "svedeniya-oo").map((c) => `
      <div>
        <h4>${esc(c.label)}</h4>
        <ul>${(c.items || []).slice(0, 6).map((it) => it.href
          ? `<li><a href="${esc(it.href)}" target="_blank" rel="noopener">${esc(it.t)}</a></li>`
          : `<li><a href="${escHref(it.slug)}">${esc(it.t)}</a></li>`).join("")}</ul>
      </div>`).join("");
    const social = SITE.socials.map((s) => `<a href="${esc(s.url)}" title="${esc(s.name)}">${esc(s.name[0])}</a>`).join("");
    return `
      <div class="footer-top container">
        <div class="footer-brand">
          <h4>${esc(SITE.short)}</h4>
          <p>${esc(SITE.name)}</p>
          <p>${esc(SITE.address)}</p>
          <div class="socials">${social}</div>
        </div>
        ${cols}
        <div>
          <h4>Контакты</h4>
          <ul>${SITE.phones.map((p) => `<li><a href="tel:${esc(p.value.replace(/[^\d]/g, ""))}">${esc(p.value)}</a></li>`).join("")}
          ${SITE.emails.map((e) => `<li><a href="mailto:${esc(e)}">${esc(e)}</a></li>`).join("")}
          <li><a href="${escHref("kontakty")}">Контакты и схема проезда</a></li></ul>
        </div>
      </div>
      <div class="footer-bottom container">
        <span>© 2014–2026 ${esc(SITE.short)}</span>
        <span>${esc(SITE.address)}</span>
        <span>${SITE.emails.map((e) => esc(e)).join(" · ")}</span>
      </div>`;
  }

  /* ---------- Монтирование ---------- */
  function mount(shellId) {
    const shell = document.getElementById(shellId || "app-shell");
    if (!shell) return;
    // Навигация всегда в начале страницы
    shell.insertAdjacentHTML("afterbegin", buildHeader());
    shell.insertAdjacentHTML("beforeend", `<footer class="site-footer">${buildFooter()}</footer>`);
    initNav();
  }

  function initNav() {
    const burger = document.getElementById("burger");
    const nav = document.getElementById("mainNav");
    const scrim = document.getElementById("navScrim");
    const closeBtn = document.getElementById("navClose");
    const header = document.getElementById("siteHeader");
    if (!burger || !nav) return;

    /* ---------- Desktop disclosure-подменю ---------- */
    function closeDropdowns() {
      nav.querySelectorAll("li.has-drop.open").forEach((li) => {
        li.classList.remove("open");
        const c = li.querySelector(".caret");
        if (c) c.setAttribute("aria-expanded", "false");
      });
    }
    function toggleDropdown(li) {
      const isOpen = li.classList.toggle("open");
      // аккордеон: закрываем остальные раскрытые пункты
      if (isOpen) nav.querySelectorAll("li.has-drop.open").forEach((o) => { if (o !== li) o.classList.remove("open"); });
      const c = li.querySelector(".caret");
      if (c) c.setAttribute("aria-expanded", isOpen ? "true" : "false");
    }

    /* ---------- Мобильный off-canvas ---------- */
    function setExpanded(open) {
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
    }
    function openMenu() {
      nav.classList.add("open");
      document.body.classList.add("nav-open");
      if (scrim) scrim.classList.add("show");
      setExpanded(true);
      if (closeBtn) closeBtn.focus();
    }
    function closeMenu() {
      nav.classList.remove("open");
      document.body.classList.remove("nav-open");
      if (scrim) scrim.classList.remove("show");
      setExpanded(false);
      if (closeBtn && document.activeElement === closeBtn) burger.focus();
    }

    burger.addEventListener("click", () => {
      nav.classList.contains("open") ? closeMenu() : openMenu();
    });
    if (closeBtn) closeBtn.addEventListener("click", closeMenu);
    if (scrim) scrim.addEventListener("click", closeMenu);
    nav.addEventListener("click", (e) => {
      const caret = e.target.closest(".caret");
      if (caret) {
        const li = caret.closest("li.has-drop");
        if (li) toggleDropdown(li);
        return;
      }
      if (e.target.closest("a") && nav.classList.contains("open")) {
        closeMenu();
        closeDropdowns();
      }
    });
    nav.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        const caret = e.target.closest(".caret");
        if (caret) {
          const li = caret.closest("li.has-drop");
          if (li) { e.preventDefault(); toggleDropdown(li); }
        }
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") { closeMenu(); closeDropdowns(); }
    });
    document.addEventListener("pointerdown", (e) => {
      // клик вне навигации закрывает открытые подменю
      if (!e.target.closest(".main-nav")) closeDropdowns();
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1024) {
        closeMenu();
        closeDropdowns();
      }
    });

    /* ---------- Тема (light / dark) ---------- */
    const themeToggles = Array.from(document.querySelectorAll(".theme-toggle"));
    function applyTheme(t) {
      document.documentElement.setAttribute("data-theme", t);
      try { localStorage.setItem("umpk-theme", t); } catch (e) { /* noop */ }
      themeToggles.forEach((b) => {
        b.setAttribute("aria-pressed", t === "dark" ? "true" : "false");
        b.setAttribute("aria-label", t === "dark" ? "Включить светлую тему" : "Включить тёмную тему");
      });
    }
    const stored = (function () { try { return localStorage.getItem("umpk-theme"); } catch (e) { return null; } })();
    const initial = stored || (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    applyTheme(initial);
    themeToggles.forEach((b) => b.addEventListener("click", () => {
      const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
    }));

    /* ---------- Scroll: тень шапки + кнопка «наверх» ---------- */
    const tt = document.getElementById("totop");
    const onScroll = () => {
      if (header) header.classList.toggle("scrolled", window.scrollY > 8);
      if (tt) tt.classList.toggle("show", window.scrollY > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    if (tt) tt.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    onScroll();
  }

  /* ---------- Рендер содержимого раздела (section.html) ---------- */
  function renderSection() {
    const slug = currentSlug();
    const out = document.getElementById("section-out");
    if (!out) return;
    const cat = findCat(slug);
    const item = findItem(slug);

    if (cat && cat.slug === "kontakty") {
      out.innerHTML = contactPage();
      document.title = "Контакты — " + SITE.short;
      return;
    }
    if (cat) {
      // Страница-лендинг раздела: intro + сетка подстраниц
      const intro = CAT_INTRO[cat.slug] || DEFAULT_INTRO;
      const items = (cat.items || []).map((it) => it.href
        ? card(it.t, `${it.ic}`, it.href, "Внешний ресурс ↗", true)
        : card(it.t, it.ic || "•", it.slug, null, false)).join("");
      out.innerHTML = `
        <div class="content-block container">
          <nav class="breadcrumb"><a href="index.html">Главная</a><span>›</span><span>${esc(cat.label)}</span></nav>
          <h1 style="font-size:clamp(1.8rem,3vw,2.4rem)">${cat.icon} ${esc(cat.label)}</h1>
          <p class="muted" style="max-width:820px;font-size:1.08rem">${esc(intro)}</p>
          <div class="subgrid mt-3">${items}</div>
        </div>`;
      document.title = cat.label + " — " + SITE.short;
      return;
    }

    // Обычная страница
    const owner = MENU.find((c) => (c.items || []).some((i) => i.slug === slug));
    const raw = PAGE_BODY[slug];
    const meta = raw && typeof raw === "object" ? raw : { title: null, icon: null, html: raw };
    const body = meta.html
      ? `<div class="prose">${meta.html}</div>`
      : `<div class="band band-note" style="display:block"><h3>Раздел в наполнении</h3><p>${esc(DEFAULT_INTRO)}</p></div>`;
    const title = meta.title || (item ? item.t : (slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ")));
    const icon = meta.icon || (item ? item.ic : "");
    const crumbs = owner
      ? `<nav class="breadcrumb"><a href="index.html">Главная</a><span>›</span><a href="${escHref(owner.slug)}">${esc(owner.label)}</a><span>›</span><span>${esc(title)}</span></nav>`
      : `<nav class="breadcrumb"><a href="index.html">Главная</a><span>›</span><span>${esc(title)}</span></nav>`;

    // карточка-ссылки на соседние страницы того же раздела
    let related = "";
    if (owner) {
      const rel = (owner.items || []).filter((i) => i.slug && i.slug !== slug).slice(0, 4);
      if (rel.length) related = `
        <h2 class="mt-3" style="font-size:1.2rem">Смотрите также</h2>
        <div class="subgrid">${rel.map((r) => card(r.t, r.ic || "•", r.slug, null, false)).join("")}</div>`;
    }

    out.innerHTML = `
      <div class="content-block container">
        ${crumbs}
        <div class="grid-2" style="align-items:start">
          <div>
            <h1>${icon ? icon + " " : ""}${esc(title)}</h1>
            ${body}
          </div>
          ${related ? `<aside>${related}</aside>` : ""}
        </div>
      </div>`;
    document.title = title + " — " + SITE.short;
  }

  function card(title, icon, url, note, external) {
    return `<a class="subcard" href="${external ? esc(url) : escHref(url)}" ${external ? 'target="_blank" rel="noopener"' : ""}>
      <span class="si">${icon}</span>
      <span><strong>${esc(title)}</strong><small>${note ? esc(note) : "Открыть раздел"}</small></span>
    </a>`;
  }

  /* ---------- Рендер главной (index.html) ---------- */
  function renderHome() {
    if (!document.getElementById("app-shell")) return;
    fillNews();
    fillSpecials();
    // quick-числа
    const years = 2026 - 2014;
    const q = document.querySelectorAll("[data-num]");
    if (q.length) {
      const nums = { years: years, specs: window.SPECIALTIES.length };
      q.forEach((n) => { n.textContent = nums[n.getAttribute("data-num")] ?? n.textContent; });
    }
  }
  function fillNews() {
    const grid = document.getElementById("news-grid");
    if (!grid) return;
    grid.innerHTML = (window.NEWS || []).map((n, i) => `
      <article class="news-card">
        ${n.img ? `<div class="thumb"><img loading="lazy" src="${esc(n.img)}" alt="${esc(n.title)}"></div>` : ""}
        <div class="body">
          <time>📅 ${esc(n.date)}</time>
          <h3>${esc(n.title)}</h3>
          <p class="muted" style="font-size:.92rem">${esc(n.text)}</p>
          <a class="read" href="${escHref("novosti")}">Читать дальше <span>→</span></a>
        </div>
      </article>`).join("");
  }
  function fillSpecials() {
    const grid = document.getElementById("spec-grid");
    if (!grid) return;
    grid.innerHTML = (window.SPECIALTIES || []).map((s) => `
      <a class="prog-card" href="${escHref("specialnosti")}">
        <span class="pcode">${esc(s.code)}</span>
        <h3>${esc(s.name)}</h3>
        <div class="prog-meta"><span>🎯 ${esc(s.short)}</span><span>🏛️ ${esc(s.level)}</span></div>
        <span class="arrow">→</span>
      </a>`).join("");
  }

  /* ---------- Точки входа ---------- */
  function contactPage() {
    const phones = SITE.phones.map((p) =>
      `<div class="crow"><span class="ci">📞</span><div><strong>${esc(p.label)}</strong><span>${esc(p.value)}</span></div></div>`).join("");
    const mails = SITE.emails.map((m) =>
      `<div class="crow"><span class="ci">✉️</span><div><strong>Электронная почта</strong><a href="mailto:${esc(m)}" style="color:#fff">${esc(m)}</a></div></div>`).join("");
    const social = SITE.socials.map((s) => `<a class="btn btn-light" href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.name)}</a>`).join("");
    return `
      <div class="content-block container">
        <nav class="breadcrumb"><a href="index.html">Главная</a><span>›</span><span>Контакты</span></nav>
        <h1 style="font-size:clamp(1.8rem,3vw,2.4rem)">📞 Контакты</h1>
        <div class="contact-wrap mt-2">
          <div class="contact-panel">
            <h3>Контактная информация</h3>
            <div class="crow"><span class="ci">📍</span><div><strong>Адрес</strong><span>${esc(SITE.address)}</span></div></div>
            ${phones}${mails}
            <div class="crow"><span class="ci">🌐</span><div><strong>Мы в соц. сетях</strong><div style="display:flex;gap:8px;margin-top:6px">${social}</div></div></div>
          </div>
          <div>
            <div class="band band-note" style="display:block">
              <h3>Госуслуги: сообщить о проблеме</h3>
              <p>Проблемы со сдачей экзаменов, поступлением или получением документов?</p>
              <a class="btn btn-primary" href="https://pos.gosuslugi.ru/form/" target="_blank" rel="noopener">Написать о проблеме</a>
            </div>
            <div class="map-holder">🗺️ Карта: г. Уфа, ул. Российская, д. 100/3</div>
          </div>
        </div>
      </div>`;
  }

  /* ---------- Точки входа ---------- */
  window.UMPK = {
    mount: mount,
    renderSection: renderSection,
    renderHome: renderHome,
  };

  // авто-запуск по наличию разметки
  if (document.getElementById("app-shell")) mount("app-shell");
  if (document.getElementById("section-out")) renderSection();
  if (document.getElementById("app-shell") || document.getElementById("news-grid")) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", renderHome);
    else renderHome();
  }
})();
