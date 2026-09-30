export default function Beams() {
  const paths = [
    "M-50 100 C200 40 450 320 1250 240",
    "M-50 220 C200 150 550 480 1250 380",
    "M-50 360 C300 260 650 600 1250 520",
    "M-50 500 C250 450 600 220 1250 120",
    "M150 -40 C220 280 480 440 650 850",
    "M-50 640 C350 560 700 320 1250 450",
  ];
  const colors = [
    "var(--navy)", "var(--saffron)", "var(--leaf)",
    "var(--navy-light)", "var(--saffron-light)", "var(--leaf-light)",
  ];
  return (
    <svg
      className="absolute inset-0 h-full w-full pointer-events-none"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {paths.map((p, i) => (
        <path
          key={i}
          d={p}
          className="beam-path"
          style={{ stroke: colors[i], animationDelay: `${-i * 2.5}s` }}
        />
      ))}
    </svg>
  );
}
