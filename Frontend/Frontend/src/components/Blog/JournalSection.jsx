import React, { useEffect, useRef, useState } from "react";

/* =========================================================
   REVEAL HOOK
   Animation restarts when element leaves/re-enters viewport
========================================================= */

function useReveal(options = {}) {
  const {
    threshold = 0.15,
    rootMargin = "0px 0px -50px 0px",
  } = options;

  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, visible];
}


/* =========================================================
   FADE / BLUR REVEAL
========================================================= */

function Reveal({
  children,
  className = "",
  delay = 0,
  duration = 750,
  distance = 30,
}) {
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      className={`transition-all ease-[cubic-bezier(0.22,1,0.36,1)] ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translate3d(0,0,0) scale(1)"
          : `translate3d(0,${distance}px,0) scale(0.985)`,
        filter: visible ? "blur(0px)" : "blur(8px)",
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}


/* =========================================================
   LETTER REVEAL
========================================================= */

function LetterReveal({
  text,
  className = "",
  delay = 0,
  stagger = 32,
}) {
  const [ref, visible] = useReveal({
    threshold: 0.2,
    rootMargin: "0px 0px -40px 0px",
  });

  return (
    <span
      ref={ref}
      className={`inline-block ${className}`}
      aria-label={text}
    >
      {text.split("").map((char, index) => (
        <span
          key={`${char}-${index}`}
          aria-hidden="true"
          className="inline-block transition-all duration-[750ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible
              ? "translate3d(0,0,0) rotateX(0deg)"
              : "translate3d(0,42px,0) rotateX(-75deg)",
            filter: visible ? "blur(0px)" : "blur(7px)",
            transitionDelay: `${delay + index * stagger}ms`,
            transformOrigin: "bottom center",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}


/* =========================================================
   JOURNAL SECTION
========================================================= */

export default function JournalSection() {
  return (
    <section className="w-full overflow-hidden bg-white px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">

      <div className="relative mx-auto flex min-h-[680px] w-full max-w-[1790px] overflow-hidden rounded-[28px] bg-[#f2fcfb] px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12 xl:px-10">


        {/* =====================================================
            AMBIENT BACKGROUND GLOW
        ====================================================== */}

        <div className="pointer-events-none absolute -left-[180px] top-[20%] h-[420px] w-[420px] rounded-full bg-[#16c8c2]/10 blur-[100px]" />

        <div className="pointer-events-none absolute right-[5%] top-[5%] h-[360px] w-[360px] rounded-full bg-[#55e4df]/10 blur-[110px]" />

        <div className="pointer-events-none absolute bottom-[-180px] left-[35%] h-[400px] w-[400px] rounded-full bg-[#08aaa8]/5 blur-[100px]" />


        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}

        <div className="relative z-10 flex w-full flex-col lg:flex-row">


          {/* =================================================
              LEFT SIDE
          ================================================== */}

          <div className="flex w-full flex-col justify-center lg:w-[55%] lg:pr-12 xl:w-[55%]">


            {/* =================================================
                JOURNAL BADGE
            ================================================== */}

            <Reveal
              delay={50}
              duration={800}
              distance={25}
            >

              <div className="group relative mb-8 flex w-fit items-center gap-3 overflow-hidden rounded-full border border-[#14c6c4] px-5 py-2.5 transition-all duration-500 hover:-translate-y-1 hover:border-[#00aaa8] hover:bg-white/40 hover:shadow-[0_8px_30px_rgba(0,180,177,0.15)]">

                {/* Hover shine */}

                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />


                <svg
                  width="23"
                  height="20"
                  viewBox="0 0 23 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-4deg]"
                >
                  <rect
                    x="1.5"
                    y="1.5"
                    width="20"
                    height="17"
                    rx="1"
                    stroke="#00AAA8"
                    strokeWidth="1.8"
                  />

                  <path
                    d="M2.5 3L11.5 10L20.5 3"
                    stroke="#00AAA8"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>


                <span className="relative z-10 text-[16px] font-semibold tracking-wide text-[#00aaa8] sm:text-[17px]">
                  CIRCULOGY JOURNAL
                </span>

              </div>

            </Reveal>


            {/* =================================================
                MAIN HEADING
            ================================================== */}

            <h1 className="max-w-[720px] text-[48px] font-black leading-[0.98] tracking-[-2.5px] text-[#061416] sm:text-[58px] md:text-[68px] lg:text-[64px] xl:text-[76px]">

              <LetterReveal
                text="Stay Ahead of the"
                delay={100}
                stagger={38}
              />

              <br />

              <LetterReveal
                text="Circular Economy"
                className="text-[#08aaa8]"
                delay={620}
                stagger={38}
              />

            </h1>


            {/* =================================================
                DESCRIPTION
            ================================================== */}

            <Reveal
              delay={900}
              duration={850}
              distance={25}
            >

              <p className="mt-7 max-w-[650px] text-[13px] font-normal leading-[1.35] tracking-[-0.3px] text-[#39444e] sm:text-[12px] lg:text-[17px]">

                Get the latest insights, ideas, and updates

                <br className="hidden sm:block" />

                from Circulogy delivered to your inbox.

              </p>

            </Reveal>


            {/* =================================================
                EMAIL FORM
            ================================================== */}

            <Reveal
              delay={1050}
              duration={850}
              distance={35}
            >

              <form
                onSubmit={(e) => e.preventDefault()}
                className="group/form relative mt-8 flex h-[60px] w-full max-w-[630px] overflow-hidden rounded-full border border-[#09b8b6] bg-white transition-all duration-500 hover:border-[#00aaa8] hover:shadow-[0_10px_35px_rgba(0,174,171,0.12)] focus-within:border-[#00aaa8] focus-within:shadow-[0_10px_40px_rgba(0,174,171,0.16)]"
              >

                {/* =================================================
                    FORM GLOW
                ================================================== */}

                <div className="pointer-events-none absolute -inset-1 -z-10 rounded-full bg-[#0bc4c0]/20 opacity-0 blur-xl transition-opacity duration-500 group-focus-within/form:opacity-100" />


                {/* Email icon */}

                <div className="relative z-10 flex shrink-0 items-center pl-5 sm:pl-6">

                  <svg
                    width="27"
                    height="24"
                    viewBox="0 0 27 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="transition-transform duration-300 group-focus-within/form:scale-105"
                  >
                    <rect
                      x="1.5"
                      y="2"
                      width="24"
                      height="19"
                      rx="1.5"
                      stroke="#7A8490"
                      strokeWidth="1.8"
                    />

                    <path
                      d="M2.5 4L13.5 12L24.5 4"
                      stroke="#7A8490"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                </div>


                {/* Input */}

                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="relative z-10 min-w-0 flex-1 bg-transparent px-4 text-[16px] font-medium text-[#4e5968] outline-none placeholder:text-[#737d8d] sm:text-[18px]"
                />


                {/* =================================================
                    SUBSCRIBE BUTTON
                ================================================== */}

                <button
                  type="submit"
                  className="group/button relative z-10 flex shrink-0 items-center gap-4 overflow-hidden rounded-full bg-[#08b5b3] px-7 text-[16px] font-bold text-white transition-all duration-400 hover:bg-[#079f9d] hover:shadow-[0_0_25px_rgba(0,181,179,0.35)] sm:px-9 sm:text-[18px]"
                >

                  {/* Button shine */}

                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/button:translate-x-full" />


                  <span className="relative z-10">
                    Subscribe
                  </span>


                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="relative z-10 transition-transform duration-400 group-hover/button:-translate-y-0.5 group-hover/button:translate-x-1"
                  >
                    <path
                      d="M22 3L11.8 13.2"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <path
                      d="M22 3L15.5 21.5L11.8 13.2L3.5 9.5L22 3Z"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                </button>

              </form>

            </Reveal>


            {/* =================================================
                NO SPAM
            ================================================== */}

            <Reveal
              delay={1200}
              duration={750}
              distance={18}
            >

              <div className="mt-4 flex items-center gap-2.5 text-[15px] font-medium text-[#697586] transition-colors duration-300 hover:text-[#078f8d] sm:text-[17px]">

                <svg
                  width="24"
                  height="26"
                  viewBox="0 0 24 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform duration-300 hover:scale-105"
                >

                  <path
                    d="M12 2L21 5.5V12.5C21 18.2 17.3 22.8 12 24C6.7 22.8 3 18.2 3 12.5V5.5L12 2Z"
                    stroke="#687584"
                    strokeWidth="1.7"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M7.5 12.5L10.3 15.3L16.5 9"
                    stroke="#687584"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                </svg>


                <span>
                  No spam. Unsubscribe anytime.
                </span>

              </div>

            </Reveal>

          </div>


          {/* =================================================
              VERTICAL DIVIDER
          ================================================== */}

          <div className="relative my-10 hidden w-px overflow-hidden bg-[#d5e5e5] lg:block">

            <Reveal
              delay={650}
              duration={1100}
              distance={0}
              className="absolute inset-x-0 top-0 h-full w-full"
            >

              <div className="h-full w-full origin-top bg-[#c5dddd]" />

            </Reveal>

          </div>


          {/* =================================================
              RIGHT SIDE
          ================================================== */}

          <div className="mt-12 flex w-full items-center justify-center lg:mt-0 lg:w-[45%] lg:pl-10 xl:pl-12">


            {/* =================================================
                IMAGE CARD WRAPPER
            ================================================== */}

            <Reveal
              delay={450}
              duration={1000}
              distance={55}
              className="w-full max-w-[515px]"
            >

              <div className="group/image relative w-full">


                {/* =================================================
                    AMBIENT IMAGE GLOW
                ================================================== */}

                <div className="pointer-events-none absolute -inset-8 rounded-[35px] bg-[#08b8b6]/15 opacity-50 blur-[45px] transition-all duration-700 group-hover/image:opacity-80 group-hover/image:blur-[55px]" />


                {/* =================================================
                    SECONDARY GLOW
                ================================================== */}

                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0ac7c1]/10 blur-[65px] transition-all duration-700 group-hover/image:scale-110 group-hover/image:bg-[#0ac7c1]/15" />


                {/* =================================================
                    SHADOW / OFFSET LAYER
                ================================================== */}

                <div className="absolute left-[13px] top-[13px] h-full w-full rounded-[20px] bg-[#073c3d] transition-all duration-500 group-hover/image:left-[17px] group-hover/image:top-[17px] group-hover/image:bg-[#052f30] group-hover/image:shadow-[0_10px_35px_rgba(0,55,55,0.25)]" />


                {/* =================================================
                    IMAGE BOX
                ================================================== */}

                <div className="relative aspect-[1.06/1] w-full overflow-hidden rounded-[20px] border-[2px] border-[#08b8b6] bg-[#fafafa] shadow-[0_10px_30px_rgba(0,70,70,0.06)] transition-all duration-600 group-hover/image:-translate-y-1 group-hover/image:border-[#00d1cc] group-hover/image:shadow-[0_20px_60px_rgba(0,180,175,0.18),0_0_35px_rgba(0,190,184,0.16)]">


                  {/* =================================================
                      IMAGE
                  ================================================== */}

                  <img
                    src="images/Blackwhite.png"
                    alt=""
                    className="h-full w-full object-cover transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/image:scale-[1.045] group-hover/image:brightness-[1.04]"
                  />


                  {/* =================================================
                      IMAGE OVERLAY
                  ================================================== */}

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-[#00aaa8]/10 opacity-0 transition-opacity duration-700 group-hover/image:opacity-100" />


                  {/* =================================================
                      MOVING LIGHT
                  ================================================== */}

                  <div className="pointer-events-none absolute inset-y-0 -left-[80%] w-[55%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 transition-all duration-[1200ms] group-hover/image:left-[130%] group-hover/image:opacity-100" />


                </div>

              </div>

            </Reveal>

          </div>

        </div>


        {/* =====================================================
            SMALL DECORATIVE DOT
        ====================================================== */}

        <div className="pointer-events-none absolute bottom-8 right-8 hidden h-2 w-2 animate-pulse rounded-full bg-[#08aaa8] opacity-60 lg:block" />

      </div>


      {/* =====================================================
          REDUCED MOTION
      ====================================================== */}

      <style>{`

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }

      `}</style>

    </section>
  );
}