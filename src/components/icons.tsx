import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base(
  { size = 20, ...rest }: IconProps,
  children: React.ReactNode
) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

export function ArrowRight(p: IconProps) {
  return base(p, (<>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </>));
}

export function ArrowUpRight(p: IconProps) {
  return base(p, (<>
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </>));
}

export function ChevronDown(p: IconProps) {
  return base(p, <path d="m6 9 6 6 6-6" />);
}

export function Menu(p: IconProps) {
  return base(p, (<>
    <path d="M4 6h16" />
    <path d="M4 12h16" />
    <path d="M4 18h16" />
  </>));
}

export function Sun(p: IconProps) {
  return base(p, (<>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </>));
}

export function Moon(p: IconProps) {
  return base(p, <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />);
}

export function Calendar(p: IconProps) {
  return base(p, (<>
    <rect x="3" y="5" width="18" height="16" rx="3" />
    <path d="M8 3v4M16 3v4M3 10h18" />
  </>));
}

export function Phone(p: IconProps) {
  return base(p, <path d="M5 4h4l1.5 4.5-2.2 1.6a12 12 0 0 0 5.6 5.6l1.6-2.2L20 15v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />);
}

export function Mail(p: IconProps) {
  return base(p, (<>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="m3 7 9 6 9-6" />
  </>));
}

export function Pin(p: IconProps) {
  return base(p, (<>
    <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </>));
}

export function Doc(p: IconProps) {
  return base(p, (<>
    <path d="M6 3h8l4 4v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
    <path d="M14 3v4h4M8.5 12h7M8.5 16h7" />
  </>));
}

export function Cap(p: IconProps) {
  return base(p, (<>
    <path d="m2 9 10-5 10 5-10 5L2 9Z" />
    <path d="M6 11.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5" />
    <path d="M22 9v5" />
  </>));
}

export function Users(p: IconProps) {
  return base(p, (<>
    <circle cx="9" cy="8" r="3.4" />
    <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
    <path d="M16 4.6a3.4 3.4 0 0 1 0 6.8M17.5 14.6a5.5 5.5 0 0 1 3 5.4" />
  </>));
}

export function Building(p: IconProps) {
  return base(p, (<>
    <path d="M5 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16" />
    <path d="M15 9h2a2 2 0 0 1 2 2v10M3 21h18" />
    <path d="M8 7h2M8 11h2M8 15h2" />
  </>));
}

export function Tools(p: IconProps) {
  return base(p, <path d="M14.7 6.3a4.5 4.5 0 0 0-6 5.7L3 17.7V21h3.3l5.7-5.7a4.5 4.5 0 0 0 5.7-6L14.5 12 12 9.5l2.7-3.2Z" />);
}

export function Monitor(p: IconProps) {
  return base(p, (<>
    <rect x="3" y="4" width="18" height="13" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </>));
}

export function Bed(p: IconProps) {
  return base(p, (<>
    <path d="M3 18v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8" />
    <path d="M3 14h18M3 18v2M21 18v2" />
    <circle cx="8" cy="10" r="1.6" />
  </>));
}

export function Ball(p: IconProps) {
  return base(p, (<>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3a9 9 0 0 0 0 18M3.5 9h17M3.5 15h17" />
  </>));
}

export function Spark(p: IconProps) {
  return base(p, <path d="M12 3v0c.6 3.9 2.1 5.4 6 6-3.9.6-5.4 2.1-6 6v0c-.6-3.9-2.1-5.4-6-6 3.9-.6 5.4-2.1 6-6Z" />);
}

export function Check(p: IconProps) {
  return base(p, <path d="m5 12.5 4.5 4.5L19 7.5" />);
}

export function External(p: IconProps) {
  return base(p, (<>
    <path d="M14 4h6v6" />
    <path d="M20 4 10 14" />
    <path d="M20 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5" />
  </>));
}

export function Globe(p: IconProps) {
  return base(p, (<>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
  </>));
}

export type IconName =
  | "arrow-right"
  | "arrow-up-right"
  | "chevron-down"
  | "menu"
  | "sun"
  | "moon"
  | "calendar"
  | "phone"
  | "mail"
  | "pin"
  | "doc"
  | "cap"
  | "users"
  | "building"
  | "tools"
  | "monitor"
  | "bed"
  | "ball"
  | "spark"
  | "check"
  | "external"
  | "globe";

const ICONS: Record<IconName, (p: IconProps) => React.ReactElement> = {
  "arrow-right": ArrowRight,
  "arrow-up-right": ArrowUpRight,
  "chevron-down": ChevronDown,
  menu: Menu,
  sun: Sun,
  moon: Moon,
  calendar: Calendar,
  phone: Phone,
  mail: Mail,
  pin: Pin,
  doc: Doc,
  cap: Cap,
  users: Users,
  building: Building,
  tools: Tools,
  monitor: Monitor,
  bed: Bed,
  ball: Ball,
  spark: Spark,
  check: Check,
  external: External,
  globe: Globe,
};

export function Icon({ name, ...rest }: { name: IconName } & IconProps) {
  const Cmp = ICONS[name];
  return <Cmp {...rest} />;
}
