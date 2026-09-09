import Link from "next/link";
import { HERO_BADGES, NEWS, SITE, SPECIALTIES } from "@/data/site";
import { NewsCard } from "@/components/NewsCard";
import { SpecialtyCard } from "@/components/SpecialtyCard";
import { Icon } from "@/components/icons";

const YEARS = new Date().getFullYear() - SITE.founded;

const QUICK_LINKS = [
  { t: "Поступающим", slug: "abiturientu", sub: "Правила и план приёма", icon: "doc" as const },
  { t: "Расписание", slug: "raspisanie", sub: "Занятия и испытания", icon: "calendar" as const },
  { t: "Сведения об ОО", slug: "osnovnye-svedeniya", sub: "Официальная информация", icon: "building" as const },
  { t: "Контакты", slug: "kontakty", sub: "Адрес и телефоны", icon: "phone" as const },
];

const WHY = [
  { icon: "cap" as const, t: "Профессионалитет", d: "Участник федерального проекта с современными мастерскими и программами под запросы работодателей." },
  { icon: "users" as const, t: "Опытные педагоги", d: "Преподаватели с практическим опытом и актуальными компетенциями, наставничество в обучении." },
  { icon: "tools" as const, t: "Практика", d: "Учебно-производственная практика и партнёрство с профильными организациями региона." },
  { icon: "monitor" as const, t: "Цифровая среда", d: "Дистанционное обучение, платформа Moodle и современные электронные ресурсы." },
  { icon: "bed" as const, t: "Общежитие", d: "Возможность заселения иногородних студентов на время обучения." },
  { icon: "ball" as const, t: "Внеучебная жизнь", d: "Спортивный клуб, воспитательная работа и творческие инициативы студентов." },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container-app hero-inner">
          <span className="hero-kicker">
            <Icon name="spark" size={15} />
            Федеральный проект «Профессионалитет»
          </span>
          <h1>
            Стань востребованным специалистом в{" "}
            <span className="hl">Уфимском многопрофильном колледже</span>
          </h1>
          <p className="lead">
            Педагогика, социальная работа, юриспруденция и документационное
            обеспечение. Очная и заочная формы обучения, современные мастерские и
            поддержка при трудоустройстве.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-glass" href="/priyomnaya-komissiya">
              Приёмная комиссия
            </Link>
            <Link className="btn btn-primary" href="/specialnosti">
              Выбрать направление <Icon name="arrow-right" size={17} />
            </Link>
            <Link className="btn btn-glass" href="/plan-priema">
              План приёма 2025–2026
            </Link>
          </div>
          <div className="hero-badges">
            {HERO_BADGES.map((b) =>
              b.href ? (
                <a
                  key={b.label}
                  className="chip chip-glass"
                  href={b.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                >
                  <Icon name="calendar" size={14} />
                  {b.label}
                </a>
              ) : (
                <Link key={b.label} className="chip chip-glass" href={`/${b.slug}`}>
                  {b.label}
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      <section className="quick-wrap">
        <div className="container-app">
          <div className="quick-grid">
            {QUICK_LINKS.map((q) => (
              <Link key={q.slug} className="quick-card" href={`/${q.slug}`}>
                <span className="q-icon">
                  <Icon name={q.icon} size={22} />
                </span>
                <strong>{q.t}</strong>
                <span className="sub">{q.sub}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container-app">
          <div className="section-head">
            <div>
              <div className="eyebrow">Жизнь колледжа</div>
              <h2 className="section-title">Новости</h2>
              <p className="section-sub">
                Актуальные события, объявления и достижения студентов и педагогов.
              </p>
            </div>
            <Link className="link-more" href="/novosti">
              Все новости <Icon name="arrow-right" size={16} />
            </Link>
          </div>
          <div className="news-grid">
            {NEWS.map((n) => (
              <NewsCard key={n.title} item={n} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-app">
          <div className="band">
            <div>
              <h3>Приглашаем абитуриентов!</h3>
              <p>Обучение по востребованным специальностям в очной и заочной форме.</p>
            </div>
            <Link className="btn btn-light" href="/specialnosti">
              Смотреть направления <Icon name="arrow-right" size={17} />
            </Link>
          </div>

          <div className="section-head" style={{ marginBottom: "2rem" }}>
            <div>
              <div className="eyebrow">Специальности</div>
              <h2 className="section-title">Направления подготовки</h2>
              <p className="section-sub">
                Программы среднего профессионального образования с возможностью
                обучения в колледже.
              </p>
            </div>
            <Link className="link-more" href="/specialnosti">
              Полный список <Icon name="arrow-right" size={16} />
            </Link>
          </div>
          <div className="spec-grid">
            {SPECIALTIES.map((s) => (
              <SpecialtyCard key={s.code} item={s} href="/specialnosti" />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container-app">
          <div className="stats">
            <div className="stat">
              <strong>{YEARS}</strong>
              <span>лет готовим специалистов</span>
            </div>
            <div className="stat">
              <strong>6+</strong>
              <span>направлений подготовки</span>
            </div>
            <div className="stat">
              <strong>2</strong>
              <span>формы обучения</span>
              <small>очная и заочная</small>
            </div>
            <div className="stat">
              <strong>100%</strong>
              <span>поддержка на всех этапах</span>
              <small>от подачи документов до диплома</small>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-app">
          <div className="section-head" style={{ justifyContent: "center", textAlign: "center" }}>
            <div style={{ marginInline: "auto" }}>
              <div className="eyebrow">Почему выбирают нас</div>
              <h2 className="section-title">Преимущества колледжа</h2>
            </div>
          </div>
          <div className="why-grid">
            {WHY.map((w) => (
              <div className="why-card" key={w.t}>
                <span className="why-icon">
                  <Icon name={w.icon} size={22} />
                </span>
                <h3>{w.t}</h3>
                <p>{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container-app">
          <div className="cta">
            <div>
              <div className="eyebrow" style={{ color: "#8ec9ff" }}>
                Приёмная кампания
              </div>
              <h2>Готовы стать частью УМПК?</h2>
              <p>
                Подайте документы, уточните детали приёма или задайте вопрос
                приёмной комиссии — мы поможем на каждом шаге.
              </p>
              <div className="link-row" style={{ marginTop: "1.4rem" }}>
                <Link className="btn btn-light" href="/priem-dokumenty">
                  Документы и бланки
                </Link>
                <Link className="btn btn-glass" href="/perechen-ispytaniy">
                  Вступительные испытания
                </Link>
              </div>
            </div>
            <ul className="cta-list">
              <li>
                <span className="check">
                  <Icon name="check" size={15} />
                </span>
                Онлайн-подача заявлений
              </li>
              <li>
                <span className="check">
                  <Icon name="check" size={15} />
                </span>
                Помощь с выбором специальности
              </li>
              <li>
                <span className="check">
                  <Icon name="check" size={15} />
                </span>
                Актуальный план приёма
              </li>
              <li>
                <span className="check">
                  <Icon name="check" size={15} />
                </span>
                Консультации приёмной комиссии
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container-app">
          <div className="section-head">
            <div>
              <div className="eyebrow">Свяжитесь с нами</div>
              <h2 className="section-title">Контакты</h2>
            </div>
            <Link className="link-more" href="/kontakty">
              Схема проезда и телефоны <Icon name="arrow-right" size={16} />
            </Link>
          </div>
          <div className="contact-wrap">
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
              <div className="contact-row">
                <span className="contact-icon">
                  <Icon name="phone" size={20} />
                </span>
                <div>
                  <strong>Приёмная директора</strong>
                  <span className="cval">{SITE.phones[0].value} · {SITE.phones[1].value}</span>
                </div>
              </div>
              <div className="contact-row">
                <span className="contact-icon">
                  <Icon name="phone" size={20} />
                </span>
                <div>
                  <strong>Приёмная комиссия</strong>
                  <span className="cval">{SITE.phones[2].value}</span>
                </div>
              </div>
              <div className="contact-row">
                <span className="contact-icon">
                  <Icon name="phone" size={20} />
                </span>
                <div>
                  <strong>Учебная часть</strong>
                  <span className="cval">{SITE.phones[3].value}</span>
                </div>
              </div>
              <div className="contact-row">
                <span className="contact-icon">
                  <Icon name="mail" size={20} />
                </span>
                <div>
                  <strong>Электронная почта</strong>
                  <span className="cval">{SITE.emails[0]}</span>
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
                <h3 style={{ fontSize: "1.3rem" }}>Проблема с документами?</h3>
                <p style={{ marginBottom: "1rem" }}>
                  Обратитесь через Госуслуги — поможем разобраться.
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
      </section>
    </>
  );
}
