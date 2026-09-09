import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CAT_INTRO, MENU, NEWS, PAGE_TEXT, SITE, SPECIALTIES } from "@/data/site";
import { Icon } from "@/components/icons";

type SlugParams = { params: Promise<{ slug: string }> };

function allSlugs(): string[] {
  const set = new Set<string>();
  for (const cat of MENU) {
    set.add(cat.slug);
    for (const it of cat.items) if (it.slug) set.add(it.slug);
  }
  for (const key of Object.keys(PAGE_TEXT)) set.add(key);
  return Array.from(set);
}

export function generateStaticParams() {
  return allSlugs().map((slug) => ({ slug }));
}

function findOwner(slug: string) {
  return MENU.find((c) => !c.contacts && c.items.some((i) => i.slug === slug));
}

function titleFor(slug: string): { title: string; icon?: string } {
  const cat = MENU.find((c) => c.slug === slug);
  if (cat) return { title: cat.label };
  const owner = findOwner(slug);
  const item = owner?.items.find((i) => i.slug === slug);
  if (item) return { title: item.t };
  const txt = PAGE_TEXT[slug];
  if (txt) return { title: txt.title };
  return { title: slug };
}

export async function generateMetadata({ params }: SlugParams): Promise<Metadata> {
  const { slug } = await params;
  const { title } = titleFor(slug);
  return {
    title,
    description: CAT_INTRO[slug] || PAGE_TEXT[slug]?.paragraphs?.[0]?.slice(0, 160),
  };
}

function Crumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="breadcrumb" aria-label="Хлебные крошки">
      <Link href="/">Главная</Link>
      {items.map((it, idx) => (
        <span key={idx} style={{ display: "inline-flex", gap: "0.4rem", alignItems: "center" }}>
          <span className="sep">›</span>
          {it.href ? <Link href={it.href}>{it.label}</Link> : <span>{it.label}</span>}
        </span>
      ))}
    </nav>
  );
}

function PageHead({ title, lead }: { title: string; lead?: string }) {
  return (
    <div className="container-app page-head">
      <h1 className="page-title">{title}</h1>
      {lead ? <p className="page-lead">{lead}</p> : null}
    </div>
  );
}

function Placeholder({ title }: { title: string }) {
  return (
    <div className="container-app">
      <PageHead title={title} />
      <div className="band" style={{ display: "block", maxWidth: 780 }}>
        <h3 style={{ fontSize: "1.25rem" }}>Раздел в наполнении</h3>
        <p>
          Информация раздела находится в стадии актуализации. Полные материалы
          будут перенесены с действующего сайта колледжа.
        </p>
      </div>
    </div>
  );
}

/* -------------------- Категория (лендинг) -------------------- */
function CategoryPage({ slug, cat }: { slug: string; cat: (typeof MENU)[number] }) {
  return (
    <div className="container-app">
      <div className="page-head">
        <Crumb items={[{ label: cat.label }]} />
        <h1 className="page-title">{cat.label}</h1>
        {CAT_INTRO[slug] ? <p className="page-lead">{CAT_INTRO[slug]}</p> : null}
      </div>
      <div className="subgrid" style={{ marginTop: "1.2rem", marginBottom: "3rem" }}>
        {cat.items.map((item) => {
          const external = Boolean(item.href);
          const href = item.href || (item.slug ? `/${item.slug}` : "");
          if (!href) return null;
          const icon = (
            <Icon name={external ? "external" : "arrow-right"} size={18} />
          );
          const content = (
            <>
              <span style={{ minWidth: 0 }}>
                <strong>{item.t}</strong>
                <small>{external ? "Внешний ресурс" : "Открыть раздел"}</small>
              </span>
              <span className="arrow-ic">{icon}</span>
            </>
          );
          return external ? (
            <a
              key={item.t}
              className="subcard"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              referrerPolicy="no-referrer"
            >
              {content}
            </a>
          ) : (
            <Link key={item.t} className="subcard" href={href}>
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------- Страница специальностей -------------------- */
function SpecialtiesPage() {
  return (
    <div className="container-app">
      <div className="page-head">
        <Crumb items={[{ label: "Абитуриенту", href: "/abiturientu" }, { label: "Направления подготовки" }]} />
        <h1 className="page-title">Направления подготовки</h1>
        <p className="page-lead">
          Колледж реализует программы подготовки специалистов среднего звена по
          педагогическим и социально-правовым направлениям. Ниже представлены
          основные специальности.
        </p>
      </div>
      <div className="spec-grid" style={{ marginBottom: "3rem" }}>
        {SPECIALTIES.map((s) => (
          <div className="spec-card" key={s.code}>
            <span className="spec-code">{s.code}</span>
            <h3>{s.name}</h3>
            <span className="spec-meta">
              <span>{s.short}</span>
              <span>{s.level}</span>
            </span>
          </div>
        ))}
      </div>
      <Link className="btn btn-primary" href="/plan-priema">
        План приёма на 2025–2026 <Icon name="arrow-right" size={17} />
      </Link>
    </div>
  );
}

/* -------------------- Лента новостей -------------------- */
function NewsPage() {
  return (
    <div className="container-app">
      <div className="page-head">
        <Crumb items={[{ label: "Колледж", href: "/kollej" }, { label: "Новости" }]} />
        <h1 className="page-title">Новости</h1>
        <p className="page-lead">Актуальные события, объявления и достижения студентов и педагогов.</p>
      </div>
      <div className="news-grid" style={{ marginBottom: "3rem" }}>
        {NEWS.map((n) => (
          <article className="news-card" key={n.title}>
            {n.img ? (
              <div className="news-thumb">
                <Image
                  src={n.img}
                  alt={n.title}
                  fill
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                />
              </div>
            ) : null}
            <div className="news-body">
              <span className="news-date">
                <Icon name="calendar" size={14} />
                {n.date}
              </span>
              <h3>{n.title}</h3>
              <p>{n.text}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

/* -------------------- Контакты -------------------- */
function ContactsPage() {
  return (
    <div className="container-app">
      <div className="page-head">
        <Crumb items={[{ label: "Контакты" }]} />
        <h1 className="page-title">Контакты</h1>
        <p className="page-lead">Адрес, телефоны и схема проезда.</p>
      </div>
      <div className="contact-wrap" style={{ marginBottom: "3rem" }}>
        <div className="contact-panel">
          <div className="contact-row">
            <span className="contact-icon">
              <Icon name="pin" size={20} />
            </span>
            <div>
              <strong>Адрес</strong>
              <span className="cval">{SITE.address}</span>
            </div>
          </div>
          {SITE.phones.map((p) => (
            <div className="contact-row" key={p.label + p.value}>
              <span className="contact-icon">
                <Icon name="phone" size={20} />
              </span>
              <div>
                <strong>{p.label}</strong>
                <span className="cval">{p.value}</span>
              </div>
            </div>
          ))}
          {SITE.emails.map((m) => (
            <div className="contact-row" key={m}>
              <span className="contact-icon">
                <Icon name="mail" size={20} />
              </span>
              <div>
                <strong>Электронная почта</strong>
                <a href={`mailto:${m}`} className="cval">
                  {m}
                </a>
              </div>
            </div>
          ))}
          <div className="contact-row">
            <span className="contact-icon">
              <Icon name="globe" size={20} />
            </span>
            <div>
              <strong>Мы в социальных сетях</strong>
              <span className="cval" style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {SITE.socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    referrerPolicy="no-referrer"
                    className="chip"
                  >
                    {s.name}
                  </a>
                ))}
              </span>
            </div>
          </div>
        </div>
        <div className="contact-stack">
          <div className="map-holder">
            <span>
              <Icon name="pin" size={26} />
              <br />
              Карта проезда — г. Уфа, ул. Российская, д. 100/3
            </span>
          </div>
          <div className="band" style={{ display: "block" }}>
            <h3 style={{ fontSize: "1.3rem" }}>Госуслуги: сообщить о проблеме</h3>
            <p style={{ marginBottom: "1rem" }}>
              Проблемы со сдачей экзаменов, поступлением или получением документов?
            </p>
            <a
              className="btn btn-light"
              href="https://pos.gosuslugi.ru/form/"
              target="_blank"
              rel="noopener noreferrer"
              referrerPolicy="no-referrer"
            >
              Написать о проблеме <Icon name="external" size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------- Prose-страница -------------------- */
function ProsePage({ slug }: { slug: string }) {
  const data = PAGE_TEXT[slug];
  const owner = findOwner(slug);
  const title = data?.title || titleFor(slug).title;
  const crumbs = owner
    ? [
        { label: owner.label, href: `/${owner.slug}` },
        { label: title },
      ]
    : [{ label: title }];
  return (
    <div className="container-app">
      <div className="page-head">
        <Crumb items={crumbs} />
        <h1 className="page-title">{title}</h1>
      </div>
      <div className="prose" style={{ marginBottom: "3rem" }}>
        {(data?.paragraphs || []).map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        {data?.links?.length ? (
          <div className="link-row">
            {data.links.map((l) =>
              l.href ? (
                <a
                  key={l.label}
                  className={l.primary ? "btn btn-primary" : "btn btn-surface"}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                >
                  {l.label} <Icon name="external" size={16} />
                </a>
              ) : (
                <Link key={l.label} className={l.primary ? "btn btn-primary" : "btn btn-surface"} href={`/${l.slug}`}>
                  {l.label} <Icon name="arrow-right" size={16} />
                </Link>
              )
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* -------------------- Роутер -------------------- */
export default async function Page({ params }: SlugParams) {
  const { slug } = await params;
  const cat = MENU.find((c) => c.slug === slug);

  if (slug === "kontakty") return <ContactsPage />;
  if (slug === "specialnosti") return <SpecialtiesPage />;
  if (slug === "novosti") return <NewsPage />;
  if (cat && !cat.contacts) return <CategoryPage slug={slug} cat={cat} />;

  const knownItem = allSlugs().includes(slug);
  const hasText = Boolean(PAGE_TEXT[slug]);
  if (knownItem) {
    if (hasText) return <ProsePage slug={slug} />;
    const { title } = titleFor(slug);
    return <Placeholder title={title} />;
  }
  notFound();
}
