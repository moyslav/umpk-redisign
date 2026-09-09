import Link from "next/link";
import { MENU, SITE } from "@/data/site";

function FooterColumn({ items }: { items: { t: string; slug?: string; href?: string }[] }) {
  return (
    <ul>
      {items.slice(0, 6).map((item) =>
        item.href ? (
          <li key={item.t}>
            <a href={item.href} target="_blank" rel="noopener noreferrer" referrerPolicy="no-referrer">
              {item.t}
            </a>
          </li>
        ) : (
          <li key={item.t}>
            <Link href={`/${item.slug}`}>{item.t}</Link>
          </li>
        )
      )}
    </ul>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container-app">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="brand">
              <span className="brand-mark" aria-hidden="true">
                У
              </span>
              <span className="brand-text">
                <strong>{SITE.short}</strong>
                <small>{SITE.name}</small>
              </span>
            </Link>
            <p>{SITE.address}</p>
            <p>
              {SITE.phones[0].label}: <a href={`tel:${SITE.phones[0].value.replace(/\D/g, "")}`}>{SITE.phones[0].value}</a>
            </p>
          </div>

          {MENU.filter((c) => !c.contacts && c.slug !== "svedeniya-oo")
            .slice(0, 4)
            .map((cat) => (
              <nav className="footer-col" key={cat.slug} aria-label={cat.label}>
                <h4>{cat.label}</h4>
                <FooterColumn items={cat.items} />
              </nav>
            ))}

          <nav className="footer-col" aria-label="Контакты">
            <h4>Контакты</h4>
            <ul>
              {SITE.phones.slice(0, 3).map((p) => (
                <li key={p.value}>
                  <a href={`tel:${p.value.replace(/\D/g, "")}`}>{p.value}</a>
                </li>
              ))}
              {SITE.emails.map((m) => (
                <li key={m}>
                  <a href={`mailto:${m}`}>{m}</a>
                </li>
              ))}
              <li>
                <Link href="/kontakty">Контакты и схема проезда</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="footer-bottom">
          <span>
            © 2014–{year} {SITE.short}
          </span>
          <span>{SITE.full}</span>
          <span className="socials">
            {SITE.socials.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                className="chip"
                title={s.name}
              >
                {s.name}
              </a>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
