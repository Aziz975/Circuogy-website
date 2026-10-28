import React, { useEffect, useRef, useState } from "react";

export default function CriticalMinerals() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  /* =====================================================
     VIEWPORT ANIMATION
     RESTART EVERY TIME SECTION ENTERS VIEWPORT
  ====================================================== */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    let wasVisible = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;

        if (visible && !wasVisible) {
          wasVisible = true;

          setIsVisible(false);

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setIsVisible(true);
            });
          });
        }

        if (!visible && wasVisible) {
          wasVisible = false;
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
      className="relative w-full overflow-hidden bg-[#faf9f6] px-5 py-14 sm:px-8 sm:py-16 md:px-10 md:py-20 lg:min-h-[680px] lg:px-12 lg:py-0 xl:px-[4%]"
    >
      {/* =====================================================
          FLOATING LABEL ANIMATION
      ====================================================== */}

      <style>
        {`
          @keyframes mineralFloat1 {
            0%,
            100% {
              transform: translateY(0px);
            }

            50% {
              transform: translateY(-8px);
            }
          }

          @keyframes mineralFloat2 {
            0%,
            100% {
              transform: translateY(0px);
            }

            50% {
              transform: translateY(-10px);
            }
          }

          @keyframes mineralFloat3 {
            0%,
            100% {
              transform: translateY(0px);
            }

            50% {
              transform: translateY(-7px);
            }
          }

          @keyframes mineralFloat4 {
            0%,
            100% {
              transform: translateY(0px);
            }

            50% {
              transform: translateY(-9px);
            }
          }

          @keyframes mineralFloat5 {
            0%,
            100% {
              transform: translateY(0px);
            }

            50% {
              transform: translateY(-8px);
            }
          }

          .mineral-float-1 {
            animation: mineralFloat1 3.8s ease-in-out infinite;
            will-change: transform;
          }

          .mineral-float-2 {
            animation: mineralFloat2 4.3s ease-in-out infinite;
            animation-delay: -1.2s;
            will-change: transform;
          }

          .mineral-float-3 {
            animation: mineralFloat3 3.6s ease-in-out infinite;
            animation-delay: -2s;
            will-change: transform;
          }

          .mineral-float-4 {
            animation: mineralFloat4 4.1s ease-in-out infinite;
            animation-delay: -0.8s;
            will-change: transform;
          }

          .mineral-float-5 {
            animation: mineralFloat5 3.9s ease-in-out infinite;
            animation-delay: -1.7s;
            will-change: transform;
          }

          @media (prefers-reduced-motion: reduce) {
            .mineral-float-1,
            .mineral-float-2,
            .mineral-float-3,
            .mineral-float-4,
            .mineral-float-5 {
              animation: none;
            }
          }
        `}
      </style>

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div className="relative mx-auto flex w-full max-w-[1600px] flex-col lg:min-h-[680px] lg:flex-row lg:items-center">
        {/* =====================================================
            LEFT CONTENT
        ====================================================== */}

        <div className="relative z-40 w-full max-w-[650px] lg:w-[46%] lg:max-w-[650px]">
          {/* EYEBROW */}

          <p
            className={`mb-4 text-[11px] font-extrabold tracking-[0.08em] text-[#079e99] transition-all duration-[750ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:mb-5 sm:text-[13px] md:text-[14px] lg:text-[15px] ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-[50px] opacity-0"
            }`}
          >
            THE NEED OF TOMORROW
          </p>

          {/* =================================================
              MAIN HEADING
          ================================================= */}

          <h1 className="overflow-hidden text-[40px] font-[800] leading-[0.94] tracking-[-0.045em] text-[#050707] sm:text-[48px] md:text-[56px] lg:text-[54px] xl:text-[60px] 2xl:text-[64px]">
            {/* Tomorrow's */}

            <span className="inline-block">
              {"Tomorrow’s".split("").map((letter, index) => (
                <span
                  key={`tomorrow-${index}`}
                  className={`inline-block transition-all duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-[100%] opacity-0"
                  }`}
                  style={{
                    transitionDelay: `${100 + index * 45}ms`,
                  }}
                >
                  {letter}
                </span>
              ))}
            </span>

            <br />

            {/* Economy */}

            <span className="inline-block">
              {"Economy".split("").map((letter, index) => (
                <span
                  key={`economy-${index}`}
                  className={`inline-block transition-all duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-[100%] opacity-0"
                  }`}
                  style={{
                    transitionDelay: `${600 + index * 45}ms`,
                  }}
                >
                  {letter}
                </span>
              ))}
            </span>

            <br />

            {/* Needs More */}

            <span className="inline-block">
              {"Needs More".split("").map((letter, index) => (
                <span
                  key={`needs-${index}`}
                  className={`inline-block transition-all duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-[100%] opacity-0"
                  }`}
                  style={{
                    transitionDelay: `${1000 + index * 45}ms`,
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </span>

            <br />

            {/* Critical Minerals */}

            <span className="text-[#0a9f99]">
              {"Critical Minerals".split("").map((letter, index) => (
                <span
                  key={`critical-${index}`}
                  className={`inline-block transition-all duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-[100%] opacity-0"
                  }`}
                  style={{
                    transitionDelay: `${1450 + index * 45}ms`,
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </span>
          </h1>

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <p
            className={`mt-6 max-w-[470px] text-[14px] font-medium leading-[1.5] tracking-[-0.01em] text-[#394542] transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-[15px] md:text-[16px] lg:text-[16px] xl:text-[17px] ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-[70px] opacity-0"
            }`}
            style={{
              transitionDelay: "2100ms",
            }}
          >
            The demand for lithium, cobalt, nickel, copper,
            <br className="hidden sm:block" />
            and rare earth elements is accelerating.
            <br className="hidden sm:block" />
            Yet traditional extraction alone cannot meet
            <br className="hidden sm:block" />
            the growing need for sustainable, resilient, and
            <br className="hidden sm:block" />
            secure supply chains.
          </p>
        </div>

        {/* =====================================================
            RIGHT IMAGE AREA
        ====================================================== */}

        <div
          className={`relative mt-12 flex w-full justify-center transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:mt-14 md:mt-16 lg:absolute lg:right-[-3%] lg:mt-0 lg:h-[650px] lg:w-[62%] xl:right-[-2%] xl:w-[64%] 2xl:right-[-4%] 2xl:w-[66%] ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-[120px] opacity-0"
          }`}
          style={{
            transitionDelay: "300ms",
          }}
        >
          {/* IMAGE WRAPPER */}

          <div className="relative w-full max-w-[680px] lg:max-w-none">
            {/* IMAGE */}

            <img
              src="/images/critical-minerals2.jpeg"
              alt="Critical minerals"
              className="block h-auto w-full object-contain"
            />

            {/* =================================================
                LITHIUM
            ================================================== */}

            <div
              className={`mineral-float-1 absolute left-[25%] top-[14%] flex items-center gap-1 rounded-[7px] border border-[#e5e5e5] bg-white px-1.5 py-1 shadow-md sm:left-[27%] sm:px-2 sm:py-1 md:rounded-[8px] lg:left-[28%] ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="text-[15px] font-bold leading-none text-[#249d8d] sm:text-[20px] md:text-[23px] lg:text-[26px]">
                Li
              </span>

              <span className="text-[12px] font-normal text-black sm:text-[15px] md:text-[18px] lg:text-[20px]">
                —
              </span>

              <span className="text-[10px] font-semibold text-[#1b2927] sm:text-[13px] md:text-[15px] lg:text-[17px]">
                Lithium
              </span>
            </div>

            {/* =================================================
                COBALT
            ================================================== */}

            <div
              className={`mineral-float-2 absolute left-[66%] top-[14%] flex items-center gap-1 rounded-[7px] border border-[#e5e5e5] bg-white px-1.5 py-1 shadow-md sm:left-[68%] sm:gap-2 sm:px-2 md:rounded-[8px] lg:left-[70%] ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="text-[15px] font-bold leading-none text-[#249d8d] sm:text-[20px] md:text-[23px] lg:text-[26px]">
               Ni
              </span>

              <span className="text-[12px] font-normal text-black sm:text-[15px] md:text-[18px] lg:text-[20px]">
                —
              </span>

              <span className="text-[10px] font-semibold text-[#1b2927] sm:text-[13px] md:text-[15px] lg:text-[17px]">
                Nickel
              </span>
            </div>

            {/* =================================================
                NICKEL
            ================================================== */}

            <div
              className={`mineral-float-3 absolute right-[3%] top-[39%] flex items-center gap-1 rounded-[7px] border border-[#e5e5e5] bg-white px-1.5 py-1 shadow-md sm:right-[4%] sm:gap-2 sm:px-2 md:rounded-[8px] lg:right-[5%] ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="text-[15px] font-bold leading-none text-[#249d8d] sm:text-[20px] md:text-[23px] lg:text-[26px]">
                Co
              </span>

              <span className="text-[12px] font-normal text-black sm:text-[15px] md:text-[18px] lg:text-[20px]">
                —
              </span>

              <span className="text-[px] font-semibold text-[#1b2927] sm:text-[13px] md:text-[15px] lg:text-[17px]">
                Cobalt
              </span>
            </div>

            {/* =================================================
                COPPER
            ================================================== */}

            <div
              className={`mineral-float-4 absolute right-[8%] bottom-[22%] flex items-center gap-1 rounded-[7px] border border-[#e5e5e5] bg-white px-1.5 py-1 shadow-md sm:right-[9%] sm:gap-2 sm:px-2 md:rounded-[8px] lg:right-[10%] ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="text-[15px] font-bold leading-none text-[#249d8d] sm:text-[20px] md:text-[23px] lg:text-[26px]">
                Cu
              </span>

              <span className="text-[12px] font-normal text-black sm:text-[15px] md:text-[18px] lg:text-[20px]">
                —
              </span>

              <span className="text-[10px] font-semibold text-[#1b2927] sm:text-[13px] md:text-[15px] lg:text-[17px]">
                Copper
              </span>
            </div>

            {/* =================================================
                RARE EARTH
            ================================================== */}

            <div
              className={`mineral-float-5 absolute left-[3%] bottom-[36%] flex items-center gap-1 rounded-[7px] border border-[#e5e5e5] bg-white px-1.5 py-1 shadow-md sm:left-[4%] sm:gap-2 sm:px-2 md:rounded-[8px] lg:left-[5%] ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="text-[15px] font-bold leading-none text-[#249d8d] sm:text-[20px] md:text-[23px] lg:text-[26px]">
                REE
              </span>

              <span className="text-[12px] font-normal text-black sm:text-[15px] md:text-[18px] lg:text-[20px]">
                —
              </span>

              <span className="text-[9px] font-semibold leading-[1.1] text-[#1b2927] sm:text-[11px] md:text-[13px] lg:text-[15px]">
                Rare Earth
                <br />
                Elements
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}