import { portals } from "@/lib/mock";

export default function Marquee() {
  const list = [...portals, ...portals];
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      <div className="flex w-max gap-4 marquee-track">
        {list.map((p, i) => (
          <a
            key={i}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-72 shrink-0 rounded-xl border border-line bg-white p-5 hover:shadow-md hover:border-navy/20 transition-all group"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{p.icon}</span>
              <div>
                <b className="block text-sm font-semibold text-ink group-hover:text-navy transition-colors">{p.name}</b>
                <span className="text-xs text-mute">{p.tag}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
