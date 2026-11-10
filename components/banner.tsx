import Link from "next/link";
import { Search, MapPin, Briefcase, ChartColumn, UserSearch, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const trendingChips = [
  { name: "Product Designer", query: "Product Designer" },
  { name: "AI Engineering", query: "AI Engineer" },
  { name: "DevOps Engineer", query: "DevOps Engineer", ghost: true },
];

const stats = [
  { value: "50K", label: "Active Jobs", icon: Briefcase },
  { value: "12K", label: "Companies", icon: ChartColumn },
  { value: "2M", label: "Job Seekers", icon: UserSearch },
  { value: "97%", label: "Satisfaction Rate", icon: Star },
];

// Deterministic scattered stars for the sky
const stars = [
  [4, 62], [9, 18], [13, 84], [17, 40], [22, 8], [26, 70], [31, 28], [35, 55],
  [40, 12], [43, 78], [47, 35], [52, 64], [55, 20], [58, 90], [63, 44], [66, 10],
  [70, 74], [74, 30], [77, 58], [81, 16], [84, 68], [88, 38], [91, 92], [95, 24],
  [7, 95], [20, 60], [33, 88], [46, 5], [61, 82], [72, 48], [86, 55], [50, 80],
];

const Banner = () => {
  return (
    <section className="relative isolate overflow-hidden bg-[#050609]">
      {/* Sky glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(110%_75%_at_50%_0%,rgba(79,70,229,0.10),transparent_65%)]"
      />

      {/* Starfield */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[440px] w-full max-w-6xl"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {stars.map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={i % 5 === 0 ? 0.35 : 0.22}
            fill="white"
            opacity={i % 4 === 0 ? 0.55 : 0.25}
          />
        ))}
      </svg>

      {/* Globe */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0"
        style={{ height: "calc(min(1200px, 175vw) / 2)" }}
      >
        {/* Atmosphere glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-full aspect-[2/1] rounded-[50%] bg-[radial-gradient(60%_60%_at_50%_100%,rgba(99,102,241,0.35),transparent_70%)] blur-xl" />

        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 rounded-[50%]"
          style={{
            width: "min(1200px, 175vw)",
            height: "min(1200px, 175vw)",
            background:
              "radial-gradient(70% 45% at 50% 0%, #a5abf2 0%, #7b83d8 7%, #4a52a6 15%, #23284e 36%, #101226 62%, #080a14 100%)",
            boxShadow:
              "0 0 110px 20px rgba(99,102,241,0.25), inset 0 2px 5px rgba(210,214,255,0.7), inset 0 16px 42px -8px rgba(99,102,241,0.35)",
          }}
        >
          {/* Planet texture */}
          <div
            className="absolute inset-0 rounded-[50%] opacity-[0.09] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='320'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.012 0.03' numOctaves='4' seed='7'/%3E%3C/filter%3E%3Crect width='320' height='320' filter='url(%23n)'/%3E%3C/svg%3E\")",
              backgroundSize: "cover",
            }}
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-14 sm:px-6 sm:pt-20 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Announcement pill */}
          <div className="flex items-center">
            <span
              aria-hidden
              className="h-px w-8 bg-gradient-to-r from-transparent to-white/20 sm:w-16"
            />
            <div className="mx-3 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-[#0F1116]/90 py-2 pl-3.5 pr-4 shadow-lg shadow-black/40 backdrop-blur-sm">
              <span aria-hidden className="text-sm">
                💼
              </span>
              <span className="font-mono text-sm font-bold text-white">
                50,000+
              </span>
              <span className="font-mono text-xs tracking-widest text-zinc-500">
                NEW JOBS THIS MONTH
              </span>
            </div>
            <span
              aria-hidden
              className="h-px w-8 bg-gradient-to-l from-transparent to-white/20 sm:w-16"
            />
          </div>

          {/* Title */}
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-[56px] lg:leading-[1.1]">
            Find Your Dream Job Today
          </h1>

          {/* Subtitle */}
          <p className="mt-4 max-w-xl text-sm text-zinc-400 sm:text-base sm:leading-relaxed">
            HireLoop connects top talent with world-class companies. Browse
            thousands of curated opportunities and land your next role —
            faster.
          </p>

          {/* Search bar */}
          <form
            action="/jobs"
            className="mt-10 flex w-full max-w-xl flex-col rounded-full border border-white/10 bg-[#101319]/90 p-1.5 shadow-lg shadow-black/40 backdrop-blur md:flex-row md:items-center md:pl-5"
          >
            <label className="relative flex flex-1 items-center">
              <Search
                size={16}
                className="pointer-events-none absolute left-2 text-zinc-500 md:left-0"
              />
              <Input
                type="text"
                name="q"
                placeholder="Job title, skill or company"
                aria-label="Job title, skill or company"
                className="h-10 border-transparent bg-transparent pl-8 text-sm text-white placeholder:text-zinc-500 focus-visible:border-transparent focus-visible:ring-0 md:pl-6"
              />
            </label>

            <div
              aria-hidden
              className="mx-3 hidden h-6 w-px bg-white/10 md:block"
            />

            <label className="relative flex flex-1 items-center border-t border-white/[0.07] md:border-t-0">
              <MapPin
                size={16}
                className="pointer-events-none absolute left-2 text-zinc-500 md:left-0"
              />
              <Input
                type="text"
                name="location"
                placeholder="Location or Remote"
                aria-label="Location or Remote"
                className="h-10 border-transparent bg-transparent pl-8 text-sm text-white placeholder:text-zinc-500 focus-visible:border-transparent focus-visible:ring-0 md:pl-6"
              />
            </label>

            <Button
              type="submit"
              size="icon"
              aria-label="Search jobs"
              className="mt-2 size-10 self-center shrink-0 rounded-full bg-indigo-500 text-white shadow-md shadow-indigo-500/30 hover:bg-indigo-400 md:mt-0 md:ml-1 md:size-9"
            >
              <Search size={16} />
            </Button>
          </form>

          {/* Trending positions */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 text-xs">
            <span className="text-zinc-500">Trending Position</span>
            {trendingChips.map((chip) => (
              <Link
                key={chip.name}
                href={`/jobs?q=${encodeURIComponent(chip.query)}`}
                className={
                  chip.ghost
                    ? "rounded-full border border-white/[0.07] bg-transparent py-1.5 px-3 text-zinc-500 transition-colors hover:text-zinc-300"
                    : "rounded-full border border-white/10 bg-[#161A22] py-1.5 px-3 text-zinc-100 transition-colors hover:bg-[#1d222d]"
                }
              >
                {chip.name}
              </Link>
            ))}
          </div>

          {/* Globe overlay text */}
          <p className="mx-auto mt-44 max-w-md text-2xl font-medium leading-snug text-zinc-400 max-sm:mt-20 sm:text-[26px]">
            Assisting over{" "}
            <span className="text-white">15,000 job seekers</span> find their
            dream positions.
          </p>

          {/* Stats */}
          <div className="mt-10 grid w-full grid-cols-2 gap-3 pb-14 lg:grid-cols-4 lg:gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="flex flex-col self-stretch rounded-2xl border border-white/[0.06] bg-[#0B0D12]/80 p-5 text-left shadow-lg shadow-black/20 backdrop-blur-sm"
                >
                  <Icon size={18} className="text-zinc-600" />

                  <p className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs text-zinc-500 sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
