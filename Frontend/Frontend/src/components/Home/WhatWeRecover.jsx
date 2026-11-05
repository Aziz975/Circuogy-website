import React, { useEffect, useRef, useState } from "react";

const minerals = [
  {
    name: "Lithium",
    img: "/images/lithium2.jpeg",
    number: "3",
    mass: "6.941",
    bg: "bg-[#080D10]",
    glow: "rgba(231,225,213,0.85)",
    description:
      "Essential for rechargeable batteries and energy storage.",
  },

  {
    name: "Nickel",
    img: "/images/nickel2.jpeg",
    number: "28",
    mass: "58.693",
    bg: "bg-[#0b8880]",
    glow: "rgba(11,136,128,0.75)",
    description:
      "Used in high-performance batteries and advanced alloys.",
  },

  {
    name: "Cobalt",
    img: "/images/cobalt2.jpeg",
    number: "27",
    mass: "58.933",
    bg: "bg-[#1d2423]",
    glow: "rgba(29,36,35,0.85)",
    description:
      "Critical for battery cathodes and energy technologies.",
  },

  {
    name: "Copper",
    img: "/images/copper2.jpeg",
    number: "29",
    mass: "63.546",
    bg: "bg-[#b84b0c]",
    glow: "rgba(184,75,12,0.8)",
    description:
      "Important for electrical systems, mobility, and electronics.",
  },

  {
    name: "Rare Earth Elements",
    img: "/images/rare-earth2.jpeg",
    number: "",
    mass: "",
    bg: "bg-[#242b2a]",
    glow: "rgba(36,43,42,0.85)",
    description:
      "Strategic elements used in magnets, electronics, and defence.",
  },

  {
    name: "Future Minerals",
    img: "/images/future-minerals.jpeg",
    number: "",
    mass: "",
    bg: "bg-[#151b1a]",
    glow: "rgba(21,27,26,0.9)",
    description:
      "Emerging resources supporting India's future technologies.",
  },
];

export default function WhatWeRecover() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(false);

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setIsVisible(true);
            });
          });
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="minerals"
      className="bg-[#f7f7f5] px-5 pt-2 text-[#061715] sm:px-8 sm:pt-4 sm:pb-5 lg:px-10 xl:px-12"
    >
      <div className="mx-auto max-w-[1400px]">

        {/* ================= HEADER ================= */}

        <div className="mb-10">

          {/* EYEBROW */}

          <p className="mb-4 text-[13px] font-extrabold tracking-[0.08em] text-[#079e99] sm:mb-5 sm:text-[15px] md:text-[16px]">
            What We Recover
          </p>

          {/* HEADING */}

          <h2 className="max-w-[650px] font-[800] text-[40px] leading-[1] tracking-[-0.04em] sm:text-[48px]">

            {"Critical Minerals For The".split("").map(
              (letter, index) => (
                <span
                  key={`line1-${index}`}
                  className={`horizontal-letter ${isVisible ? "horizontal-letter-visible" : ""
                    }`}
                  style={{
                    transitionDelay: `${index * 35}ms`,
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              )
            )}

            <br />

            {"Industries Of Tomorrow".split("").map(
              (letter, index) => (
                <span
                  key={`line2-${index}`}
                  className={`horizontal-letter ${isVisible ? "horizontal-letter-visible" : ""
                    }`}
                  style={{
                    transitionDelay: `${900 + index * 35}ms`,
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              )
            )}

          </h2>

          {/* DESCRIPTION */}

          <p
            className={`mt-4 max-w-[500px] text-[15px] font-medium leading-5 text-[#282c2b] transition-all duration-[800ms] delay-[220ms] ease-out ${isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-[35px] opacity-0"
              }`}
          >
            Recovering strategic resources essential for energy, mobility,
            electronics, and advanced manufacturing.
          </p>
        </div>

        {/* ================= CARDS ================= */}

        <div className="grid h-auto min-h-[300px] w-full max-w-[1600px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {minerals.map((mineral, index) => (

            <div
              key={mineral.name}
              className="mineral-card group relative min-h-[500px] w-full"
            >

              {/* ================= FLIP WRAPPER ================= */}

              <div className="mineral-card-inner relative h-full min-h-[500px] w-full">

                {/* =================================================
                    FRONT
                ================================================== */}

                <div className="mineral-card-face absolute inset-0 h-full w-full overflow-hidden rounded-[16px]">
                  {/* IMAGE */}
                  <img
                    src={mineral.img}
                    alt={mineral.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-black/10 transition-all duration-500 group-hover:bg-black/20" />

                  {/* LABEL — CENTERED AT THE BOTTOM */}
                  <div className="absolute bottom-[3%] left-1/2 -translate-x-1/2">
                    <span className="whitespace-nowrap rounded-full bg-[#19cdb5] px-4 py-3 text-[15px] font-medium text-white">
                      {mineral.name}
                    </span>
                  </div>
                

              </div>

              {/* =================================================
                    BACK
                ================================================== */}

              <div
                className={`mineral-card-face mineral-card-back absolute inset-0 flex h-full w-full flex-col overflow-hidden rounded-[16px] ${mineral.bg} p-7 text-white sm:p-8`}
              >

                {/* DECORATIVE GLOW */}

                <div
                  className="pointer-events-none absolute -right-20 -top-20 h-[220px] w-[220px] rounded-full opacity-30 blur-[45px]"
                  style={{
                    backgroundColor: mineral.glow,
                  }}
                />

                {/* DECORATIVE CIRCLES */}

                <div className="pointer-events-none absolute -bottom-16 -left-16 h-[180px] w-[180px] rounded-full border border-[#19cdb5]/10" />

                <div className="pointer-events-none absolute bottom-[-40px] right-[-30px] h-[160px] w-[160px] rounded-full border border-[#19cdb5]/10" />

                {/* ================= TOP CONTENT ================= */}

                <div className="relative z-10">

                  <div className="flex items-start justify-between">

                    <div>

                      <div className="flex items-center gap-2">

                        <span className="h-[5px] w-[5px] rounded-full bg-[#19cdb5]" />

                        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#19cdb5] sm:text-[11px]">
                          Critical Mineral
                        </span>

                      </div>

                      <h3 className="mt-4 max-w-[300px] text-[32px] font-bold leading-[0.9] tracking-[-0.045em] text-white sm:text-[38px]">
                        {mineral.name}
                      </h3>

                    </div>

                    {/* ATOMIC NUMBER */}

                    {mineral.number && (
                      <div className="flex flex-col items-end">

                        <span className="text-[25px] font-light leading-none text-white sm:text-[28px]">
                          {mineral.number}
                        </span>

                        <span className="mt-1 text-[8px] font-semibold uppercase tracking-[0.1em] text-white/40">
                          Atomic No.
                        </span>

                      </div>
                    )}

                  </div>

                  {/* ATOMIC MASS */}

                  {mineral.mass && (
                    <div className="mt-7 flex items-center gap-3">

                      <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-white/40">
                        Atomic Mass
                      </span>

                      <div className="h-px w-8 bg-white/20" />

                      <span className="text-[12px] font-medium text-white/80">
                        {mineral.mass}
                      </span>

                    </div>
                  )}

                </div>

                {/* ================= MIDDLE VISUAL ================= */}

                <div className="relative z-10 my-auto flex min-h-[150px] items-center justify-center">

                  {/* ORBIT RING */}

                  <div className="absolute h-[125px] w-[125px] rounded-full border border-[#19cdb5]/20" />

                  <div className="absolute h-[95px] w-[95px] rounded-full border border-[#19cdb5]/10" />

                  {/* GLOW */}

                  <div
                    className="absolute h-[80px] w-[80px] rounded-full opacity-30 blur-[25px]"
                    style={{
                      backgroundColor: mineral.glow,
                    }}
                  />

                  {/* MINERAL SYMBOL */}

                  <div className="relative flex h-[72px] w-[72px] items-center justify-center rounded-full border border-[#19cdb5]/30 bg-black/10 backdrop-blur-sm">

                    <span className="text-[22px] font-light tracking-[-0.04em] text-[#19cdb5]">
                      {mineral.number || "✦"}
                    </span>

                  </div>

                  {/* ORBIT DOTS */}

                  <span className="absolute left-[12px] top-[35px] h-[4px] w-[4px] rounded-full bg-[#19cdb5]" />

                  <span className="absolute right-[18px] top-[18px] h-[3px] w-[3px] rounded-full bg-white/50" />

                  <span className="absolute bottom-[20px] right-[28px] h-[4px] w-[4px] rounded-full bg-[#19cdb5]/70" />

                </div>

                {/* ================= BOTTOM CONTENT ================= */}

                <div className="relative z-10">

                  {/* DIVIDER */}

                  <div className="mb-5 flex items-center gap-3">

                    <div className="h-px flex-1 bg-white/15" />

                    <span className="text-[8px] font-semibold uppercase tracking-[0.16em] text-white/30">
                      About
                    </span>

                    <div className="h-px flex-1 bg-white/15" />

                  </div>

                  {/* DESCRIPTION */}

                  <p className="max-w-[360px] text-[13px] font-normal leading-[1.55] text-white/70 sm:text-[14px]">
                    {mineral.description ||
                      `A critical material essential for modern technology, energy systems, and India's future supply chains.`}
                  </p>

                  {/* CTA */}

                  <div className="mt-6 flex items-center justify-between">

                    <div className="flex items-center gap-2">

                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#19cdb5] text-[15px] font-medium text-[#061817] transition-transform duration-300 group-hover:rotate-45">
                        →
                      </span>

                      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#19cdb5]">
                        Learn More
                      </span>

                    </div>

                    {/* MINERAL INDEX */}

                    <span className="text-[9px] font-medium uppercase tracking-[0.12em] text-white/25">
                      Mineral / 0{index + 1}
                    </span>

                  </div>

                </div>

              </div>

            </div>

            </div>

          ))}

      </div>

    </div>
    </section >
  );
}