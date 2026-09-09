import Link from "next/link";
import type { Specialty } from "@/data/site";
import { Icon } from "@/components/icons";

export function SpecialtyCard({
  item,
  href,
}: {
  item: Specialty;
  href?: string;
}) {
  const content = (
    <>
      <span className="spec-code">{item.code}</span>
      <h3>{item.name}</h3>
      <span className="spec-meta">
        <span>{item.short}</span>
        <span>{item.level}</span>
      </span>
      {href ? (
        <span className="spec-arrow">
          <Icon name="arrow-right" size={18} />
        </span>
      ) : null}
    </>
  );
  return href ? (
    <Link className="spec-card" href={href}>
      {content}
    </Link>
  ) : (
    <div className="spec-card">{content}</div>
  );
}
