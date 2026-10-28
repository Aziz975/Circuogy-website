import React from "react";
import { useEffect, useRef, useState } from "react";


const minerals = [
  {
    name: "LITHIUM",
    image: "/images/graphite-stone.png",
    className: "flex items-center justify-center bg-[#249d8d]/10 absolute top-[10%] left-[42%] w-[82px] h-[82px] md:w-[105px] md:h-[105px] rounded-full overflow-hidden border border-[#8edbd1]/50 shadow-[0_0_35px_rgba(40,170,150,0.18)] animate-[float_5s_ease-in-out_infinite]",
  },
  {
    name: "NICKEL",
    image: "/images/nickel-stone.png",
    className: "flex items-center justify-center bg-[#249d8d]/10 absolute top-[40%] right-[9%] w-[75px] h-[75px] md:w-[98px] md:h-[98px] rounded-full overflow-hidden border border-[#8edbd1]/50 shadow-[0_0_35px_rgba(40,170,150,0.18)] animate-[float_6s_ease-in-out_infinite_0.8s]",
  },
  {
    name: "GRAPHITE",
    image: "/images/lithium-stone.png",
    className: "flex items-center justify-center bg-[#249d8d]/10 absolute bottom-[15%] right-[25%] w-[80px] h-[72px] md:w-[94px] md:h-[94px] rounded-full overflow-hidden border border-[#8edbd1]/50 shadow-[0_0_35px_rgba(40,170,150,0.18)] animate-[float_5.5s_ease-in-out_infinite_1.2s]",
  },
  {
    name: "RARE EARTHS",
    image: "/images/rare-earth-stone.png",
    className: "flex items-center justify-center bg-[#249d8d]/10 absolute bottom-[30%] left-[18%] w-[70px] h-[70px] md:w-[92px] md:h-[92px] rounded-full overflow-hidden border border-[#8edbd1]/50 shadow-[0_0_35px_rgba(40,170,150,0.18)] animate-[float_6s_ease-in-out_infinite_1.5s]",
  },
];

export default function CriticalMineralsHero() {


  const sectionRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className=" relative min-h-screen overflow-hidden bg-[#f7fbf9] text-[#071111]">

      {/* Background Grid */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#d8ebe7_1px,transparent_1px),linear-gradient(to_bottom,#d8ebe7_1px,transparent_1px)] bg-[size:70px_70px]" />
      </div>

      {/* Soft Background Glow */}
      <div className="absolute left-[40%] top-[15%] h-[600px] w-[600px] rounded-full bg-[#c9eee7]/30 blur-[100px]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1450px] items-center px-6 py-20 md:px-10 lg:px-16">

        <div className="grid w-full items-center gap-10 lg:grid-cols-[48%_52%]">

          {/* ================= LEFT CONTENT ================= */}
          <div className="relative z-20 max-w-[650px]">



            {/* Heading */}

            <h1 className={`text-[52px] font-bold leading-[0.92] tracking-[-0.055em] sm:text-[64px] md:text-[76px] lg:text-[78px] xl:text-[82px] ${isVisible ? "letter-reveal-active" : "opacity-0"}`}>
              <span className="block">
                {"Refining".split("").map((letter, index) => (
                  <span key={index} className="reveal-letter" style={{ animationDelay: `${0.15 + index * 0.045}s` }}>
                    {letter}
                  </span>
                ))}
              </span>

              <span className="block">
                {"India's ".split("").map((letter, index) => (
                  <span key={index} className="reveal-letter" style={{ animationDelay: `${0.35 + index * 0.045}s` }}>
                    {letter === " " ? "\u00A0" : letter}
                  </span>
                ))}
                <span className="text-[#269f8e]">
                  {"critical".split("").map((letter, index) => (
                    <span key={index} className="reveal-letter" style={{ animationDelay: `${0.65 + index * 0.045}s` }}>
                      {letter}
                    </span>
                  ))}
                </span>
              </span>

              <span className="block">
                <span className="text-[#269f8e]">
                  {"minerals".split("").map((letter, index) => (
                    <span key={index} className="reveal-letter" style={{ animationDelay: `${0.95 + index * 0.045}s` }}>
                      {letter}
                    </span>
                  ))}
                </span>
                {" and".split("").map((letter, index) => (
                  <span key={index} className="reveal-letter" style={{ animationDelay: `${1.25 + index * 0.045}s` }}>
                    {letter === " " ? "\u00A0" : letter}
                  </span>
                ))}
              </span>

              <span className="block text-[#269f8e]">
                {"rare earths.".split("").map((letter, index) => (
                  <span key={index} className="reveal-letter" style={{ animationDelay: `${1.5 + index * 0.045}s` }}>
                    {letter}
                  </span>
                ))}
              </span>
            </h1>


            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4 animate-[fadeUp_.8s_ease-out_.7s_forwards] opacity-0">

              <a
                href="#contact"
                className=" group inline-flex items-center gap-3 rounded-full bg-[#239f8e] px-7 py-3.5 text-sm font-bold text-white shadow-[0_10px_30px_rgba(35,159,142,0.2)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#168575]"
              >
                Get in Touch
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>

              <a
                href="#work"
                className="inline-flex items-center gap-3 rounded-full border border-[#79c9bf] bg-white/70 px-7 py-3.5 text-sm font-bold text-[#14201e] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white"
              >
                Explore Our Work
              </a>

            </div>
          </div>


          {/* ================= RIGHT VISUAL ================= */}
          <div className="relative mx-auto h-[520px] w-full max-w-[650px] md:h-[650px]">

            {/* Orbit System */}
            <div className="absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 md:h-[590px] md:w-[590px]">

              {/* Outer Circle */}
              <div className="absolute inset-0 rounded-full border border-dashed border-[#7accc1]/50 animate-[spin_35s_linear_infinite]" />

              {/* Second Circle */}
              <div className="absolute inset-[35px] rounded-full border border-[#80cec4]/40" />

              {/* Third Circle */}
              <div className="absolute inset-[95px] rounded-full border border-[#82d1c6]/35" />

              {/* Vertical Line */}
              <div className="absolute left-1/2 top-[-45px] h-[680px] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#7bc9bf]/60 to-transparent" />

              {/* Horizontal Line */}
              <div className="absolute left-[-45px] top-1/2 h-px w-[680px] -translate-y-1/2 bg-gradient-to-r from-transparent via-[#7bc9bf]/40 to-transparent" />


              {/* Animated Dots */}
              <span className="absolute left-[8%] top-[30%] h-2.5 w-2.5 rounded-full bg-[#249d8d] shadow-[0_0_12px_#249d8d] animate-pulse" />

              <span className="absolute right-[12%] top-[18%] h-2 w-2 rounded-full bg-[#249d8d] animate-pulse" />

              <span className="absolute right-[5%] bottom-[28%] h-2.5 w-2.5 rounded-full bg-[#249d8d] animate-pulse" />

              <span className="absolute left-[25%] bottom-[12%] h-2 w-2 rounded-full bg-[#249d8d] animate-pulse" />


              {/* Central Circle */}
              <div className="absolute left-1/2 top-1/2 flex h-[230px] w-[230px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white bg-white/65 shadow-[0_20px_70px_rgba(31,145,128,0.12)] backdrop-blur-xl md:h-[290px] md:w-[290px]">

                <div className="absolute inset-[28px] rounded-full border border-[#a6ddd6]/60" />

                {/* Circulogy Style Logo */}
                <div className="relative flex items-center justify-center w-48 h-48">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 blur-2xl opacity-60 animate-spin-slow"></div>
                  <img
                    src="images/LOOP.png"
                    alt="circulogy logo"
                    className="relative animate-glow"
                  />
                </div>

              </div>


              {/* Mineral Images */}
              {minerals.map((mineral) => (
                <div key={mineral.name} className={mineral.className}>
                  <img
                    src={mineral.image}
                    alt={mineral.name}
                    className="w-[80%] h-[80%] object-contain"
                  />
                </div>
              ))}


              {/* Labels */}
              <div className="absolute left-[23%] top-[15%] rounded-full border border-[#d1ebe7] bg-white/90 px-4 py-2 text-[10px] font-black tracking-wider text-[#1b2927] shadow-lg backdrop-blur-md md:text-xs animate-[float_5s_ease-in-out_infinite]">
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#249d8d]" />
                NICKEL
              </div>

              <div className="absolute  right-[-9%] top-[43%] rounded-full border border-[#d1ebe7] bg-white/90 px-4 py-2 text-[10px] font-black tracking-wider text-[#1b2927] shadow-lg backdrop-blur-md md:text-xs animate-[float_5s_ease-in-out_infinite]">
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#249d8d]" />
                GRAPHITE
              </div>

              <div className="absolute right-[23%] bottom-[8%] rounded-full border border-[#d1ebe7] bg-white/90 px-4 py-2 text-[10px] font-black tracking-wider text-[#1b2927] shadow-lg backdrop-blur-md md:text-xs animate-[float_5s_ease-in-out_infinite]">
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#249d8d]" />
                RARE EARTHS
              </div>

              <div className="absolute left-[-7%] bottom-[35%] rounded-full border border-[#d1ebe7] bg-white/90 px-4 py-2 text-[10px] font-black tracking-wider text-[#1b2927] shadow-lg backdrop-blur-md md:text-xs animate-[float_5s_ease-in-out_infinite]">
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#249d8d]" />
                LITHIUM
              </div>

            </div>


            {/* Right Side Text */}
            <div className="absolute right-[-10px] top-[7%] hidden max-w-[120px] md:block">
              <div />
              <p className="text-[9px] font-semibold uppercase leading-[1.5] tracking-[0.18em] text-[#74a39e]">
                Circular solutions
                <br />
                for a brighter
                <br />
                tomorrow
              </p>
            </div>

            <div className="absolute bottom-[10%] right-[-10px] hidden max-w-[120px] md:block">
              <div />
              <p className="text-[9px] font-semibold uppercase leading-[1.5] tracking-[0.18em] text-[#74a39e]">
                Critical materials
                <br />
                cleaner planet
                <br />
                stronger India
              </p>
            </div>

          </div>
        </div>
      </div>


      {/* Bottom Scroll */}
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
        <div className="flex h-8 w-4 items-start justify-center rounded-full border border-[#9bd5cd] p-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[#239f8e] animate-[scrollDot_1.8s_ease-in-out_infinite]" />
        </div>

        <span className="text-[8px] font-bold tracking-[0.25em] text-[#9ab3b0]">
          SCROLL TO EXPLORE
        </span>
      </div>


      {/* Animations */}
      <style>{`
  @keyframes fadeUp {
    0% {
      opacity: 0;
      transform: translateY(35px);
    }

    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fadeUp {
    animation: fadeUp 0.8s ease-out forwards;


  }

`}

        {`
  @keyframes fadeUp {
    0% {
      opacity: 0;
      transform: translateY(35px);
    }

    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px);
    }

    50% {
      transform: translateY(-12px);
    }
  }

  @keyframes scrollDot {
    0% {
      opacity: 0;
      transform: translateY(0);
    }

    30% {
      opacity: 1;
    }

    80% {
      opacity: 1;
    }

    100% {
      opacity: 0;
      transform: translateY(12px);
    }
  }
`}




{`

.reveal-letter {
  display: inline-block;
  opacity: 0;
  filter: blur(8px);
  transform: translateY(110%);
  will-change: transform, opacity, filter;
}

.letter-reveal-active .reveal-letter {
  animation: letterReveal 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes letterReveal {
  0% {
    opacity: 0;
    filter: blur(8px);
    transform: translateY(110%);
  }

  65% {
    opacity: 1;
    filter: blur(0);
  }

  100% {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .letter-reveal-active .reveal-letter {
    animation: none;
    opacity: 1;
    filter: none;
    transform: none;
  }
}

`}

      </style>

    </section>
  );
}