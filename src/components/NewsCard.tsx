import Image from "next/image";
import Link from "next/link";
import type { NewsItem } from "@/data/site";
import { Icon } from "@/components/icons";

export function NewsCard({
  item,
  showMore = true,
}: {
  item: NewsItem;
  showMore?: boolean;
}) {
  return (
    <article className="news-card">
      {item.img ? (
        <div className="news-thumb">
          <Image
            src={item.img}
            alt={item.title}
            fill
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
          />
        </div>
      ) : null}
      <div className="news-body">
        <span className="news-date">
          <Icon name="calendar" size={14} />
          {item.date}
        </span>
        <h3>{item.title}</h3>
        <p>{item.text}</p>
        {showMore ? (
          <Link className="news-link link-more" href="/novosti">
            Читать дальше <Icon name="arrow-right" size={15} />
          </Link>
        ) : null}
      </div>
    </article>
  );
}
