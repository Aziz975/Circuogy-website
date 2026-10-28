import React, { useEffect, useRef, useState } from "react";
import CountUp from "./CountUp";

export default function PledgeHero() {
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    const currentImage = imageRef.current;

    if (!currentImage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(currentImage);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-[#f4faf7] px-5 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-12 xl:py-14">
      {/* BACKGROUND GRID */}
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage: `
            linear-gradient(#dcebe6 1px, transparent 1px),
            linear-gradient(90deg, #dcebe6 1px, transparent 1px)
          `,
          backgroundSize: "36px 36px",
        }}
      />

      {/* MAIN CONTAINER */}
      <div className="relative z-10 mx-auto grid w-full max-w-[1380px] items-center gap-8 sm:gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-2 xl:gap-6">
        {/* LEFT CONTENT */}
        <div className="relative z-30 order-1 min-w-0 py-2 lg:py-0">
          <p className="mb-4 animate-[fadeUp_0.7s_ease-out_0.1s_forwards] text-[11px] font-extrabold uppercase tracking-[2.5px] text-[#079e99] opacity-0 sm:mb-5 sm:text-[13px] sm:tracking-[3px]">
            Sustainability Pledge
          </p>

          <h1 className="text-[clamp(47px,7vw,52px)] font-bold leading-[1.02] tracking-[-1.8px] text-[#071313] sm:text-[72px] sm:tracking-[-2.5px] lg:text-[clamp(68px,4.1vw,61px)] xl:text-[72px]">
            {"Sign the".split("").map((letter, index) => (
              <span
                key={`sign-${index}`}
                className="letter-reveal"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}

            <br />

            {"sustainability".split("").map((letter, index) => (
              <span
                key={`sustainability-${index}`}
                className="letter-reveal text-[#36a88f]"
                style={{ animationDelay: `${0.45 + index * 0.045}s` }}
              >
                {letter}
              </span>
            ))}

            <br />

            {"pledge".split("").map((letter, index) => (
              <span
                key={`pledge-${index}`}
                className="letter-reveal"
                style={{ animationDelay: `${1.1 + index * 0.06}s` }}
              >
                {letter}
              </span>
            ))}

            <br />


             
          </h1>

          {/* PLEDGE DESCRIPTION */}
          <p className="mt-5 max-w-[470px] animate-[fadeUp_0.8s_ease-out_0.5s_forwards] text-[15px] leading-[1.65] text-[#687876] opacity-0 sm:mt-6 sm:text-[17px] lg:text-[16px] xl:text-[18px]">
            “I / We pledge to act for a sustainable future by adopting
            practices that protect our planet, uplift our communities, and
            promote long-term responsibility.”
          </p>

          {/* BUTTON + COUNT */}
          <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-4 sm:mt-8 lg:gap-x-4">
            <button
              type="button"
              className="flex h-[46px] shrink-0 items-center gap-3 rounded-full bg-[#35aa91] px-5 text-[13px] font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#278d78] sm:px-6 sm:text-[14px]"
            >
              I Pledge Now
              <span className="text-[21px] font-bold">→</span>
            </button>

            <div className="hidden h-[34px] w-px bg-[#a9d1c7] sm:block" />

            <div className="flex min-w-0 items-center gap-2">
              <span className="text-[12px] font-semibold leading-5 text-[#71817e] sm:text-[13px] lg:text-[12px] xl:text-[14px]">
                Total Pledges Submitted:
              </span>

              <span className="whitespace-nowrap text-[20px] font-bold text-[#071313] sm:text-[22px]">
                <CountUp end={10147} duration={800} />
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT EARTH AREA */}
        <div className="relative order-2 mx-auto flex aspect-square w-full max-w-[430px] items-center justify-center sm:max-w-[500px] lg:max-w-none lg:translate-x-[3%]">
          {/* RESPONSIVE EARTH ORBIT */}
          <div
            className={`relative flex aspect-square w-full items-center justify-center ${
              isVisible ? "animate-earth-spin" : ""
            }`}
          >
            {/* SOFT GREEN GLOW */}
            <div
              className={`absolute left-1/2 top-1/2 aspect-square w-[76%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d9eee7] opacity-60 blur-[35px] sm:blur-[50px] ${
                isVisible ? "animate-earth-spin" : ""
              }`}
            />

            {/* OUTER RING */}
            <div className="absolute left-1/2 top-1/2 aspect-square w-[84%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#62bdaa] opacity-70" />

            {/* MIDDLE RING */}
            <div className="absolute left-1/2 top-1/2 aspect-square w-[74%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#62bdaa] opacity-70" />

            {/* INNER RING */}
            <div className="absolute left-1/2 top-1/2 aspect-square w-[64%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#72c5b2] opacity-60" />

            {/* ORBIT DOTS */}
          
        <span className="absolute left-[27%] top-[13%] z-30 h-2 w-2 rounded-full bg-[#299d84] shadow-[0_0_8px_rgba(41,157,132,0.35)] sm:h-[9px] sm:w-[9px]" />

        <span className="absolute left-[72%] top-[14%] z-30 h-2 w-2 rounded-full bg-[#299d84] shadow-[0_0_8px_rgba(41,157,132,0.35)] sm:h-[9px] sm:w-[9px]" />

        <span className="absolute left-[7%] top-[49%] z-30 h-2 w-2 rounded-full bg-[#299d84] shadow-[0_0_8px_rgba(41,157,132,0.35)] sm:h-[9px] sm:w-[9px]" />

        <span className="absolute right-[8%] top-[48%] z-30 h-2 w-2 rounded-full bg-[#299d84] shadow-[0_0_8px_rgba(41,157,132,0.35)] sm:h-[9px] sm:w-[9px]" />

        <span className="absolute bottom-[14%] left-[27%] z-30 h-2 w-2 rounded-full bg-[#299d84] shadow-[0_0_8px_rgba(41,157,132,0.35)] sm:h-[9px] sm:w-[9px]" />

        <span className="absolute bottom-[16%] right-[24%] z-30 h-2 w-2 rounded-full bg-[#299d84] shadow-[0_0_8px_rgba(41,157,132,0.35)] sm:h-[9px] sm:w-[9px]" />
            {/* EARTH IMAGE */}
            <div className="relative z-20 flex aspect-square w-[88%] items-center justify-center">
              <img
                ref={imageRef}
                src="/images/earth.png"
                alt="Sustainable Earth"
                className="relative top-[20px] left-[10px] right-[px] h-full w-full object-contain drop-shadow-[0_15px_65px_rgba(35,115,95,0.35)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}