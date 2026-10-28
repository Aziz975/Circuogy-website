import React, { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react"; // or: import { motion } from "framer-motion";


const CareersHero = () => {
  const fileInputRef = useRef(null);
  const sectionRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);

  /* =========================================================
     SECTION SCROLL REVEAL
     Animation restarts whenever section enters viewport
  ========================================================= */
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Reset first
          setIsVisible(false);

          // Double RAF gives browser time to register initial state
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setIsVisible(true);
            });
          });
        } else {
          // Reset when section leaves viewport
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

  /* =========================================================
     CV UPLOAD
  ========================================================= */
  const handleCVUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      console.log("Selected CV:", file);
    }
  };

  /* =========================================================
     LETTER REVEAL
  ========================================================= */
  const renderLetters = (text, colorClass = "", startDelay = 0) => {
    return (
      <span className={`block ${colorClass}`}>
        {text.split("").map((letter, index) => (
          <span
            key={`${text}-${index}`}
            className={`
              inline-block
              transform-gpu
              transition-all
              duration-[750ms]
              ease-[cubic-bezier(0.22,1,0.36,1)]
              ${isVisible
                ? "translate-y-0 rotate-0 opacity-100 blur-0"
                : "translate-y-[115%] rotate-[8deg] opacity-0 blur-[7px]"
              }
            `}
            style={{
              transitionDelay: `${startDelay + index * 38}ms`,
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </span>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-[#f5faf8] px-5 py-8 sm:px-8 sm:py-10 md:px-12 md:py-12 lg:px-[6%] lg:py-14 xl:px-[6%]"
    >
      <div
        className={`
          mx-auto flex min-h-[680px] w-full max-w-[1790px] items-center
          border-b border-[#dcece7] pb-12
          sm:min-h-[700px]
          md:min-h-[720px]
          lg:min-h-[750px]
        `}
      >
        <div className="grid w-full grid-cols-1 items-center gap-14 lg:grid-cols-[48%_52%] lg:gap-4">

          {/* =====================================================
              LEFT CONTENT
          ===================================================== */}
          <div className="flex w-full flex-col items-start pt-4 lg:pt-0">

            {/* EYEBROW */}
            <div
              className={`
                mb-9 flex items-center gap-3
                transform-gpu
                transition-all duration-[800ms]
                ease-[cubic-bezier(0.22,1,0.36,1)]
                sm:mb-10
                ${isVisible
                  ? "translate-y-0 opacity-100 blur-0"
                  : "translate-y-8 opacity-0 blur-[5px]"
                }
              `}
              style={{
                transitionDelay: "100ms",
              }}
            >
             

            
            </div>

            {/* =================================================
                MAIN HEADING — LETTER REVEAL
            ================================================= */}
            <h1
              className="
                max-w-[650px]
                overflow-hidden
                text-[52px]
                font-bold
                leading-[0.93]
                tracking-[-0.045em]
                text-[#071514]
                sm:text-[64px]
                md:text-[76px]
                lg:text-[78px]
                xl:text-[82px]
              "
            >
              {renderLetters("Build", "", 180)}

              {renderLetters(
                "Your Career",
                "text-[#299f8f]",
                390
              )}

              {renderLetters(
                "With Us",
                "text-[#071514]",
                650
              )}
            </h1>

            {/* =================================================
                SHORT DESCRIPTION
            ================================================= */}
            <p
              className={`
                mt-10 max-w-[670px]
                transform-gpu
                text-[18px]
                font-medium
                leading-[1.45]
                tracking-[-0.015em]
                text-[#193c38]
                transition-all duration-[800ms]
                ease-[cubic-bezier(0.22,1,0.36,1)]
                sm:mt-11 sm:text-[20px]
                md:text-[21px]
                ${isVisible
                  ? "translate-y-0 opacity-100 blur-0"
                  : "translate-y-8 opacity-0 blur-[5px]"
                }
              `}
              style={{
                transitionDelay: "900ms",
              }}
            >
              Be a part of our mission to build a sustainable future.
            </p>

            {/* =================================================
                LONG DESCRIPTION
            ================================================= */}
            <p
              className={`
                mt-7 max-w-[690px]
                transform-gpu
                text-[15px]
                font-normal
                leading-[1.65]
                tracking-[0.005em]
                text-[#6c7d79]
                transition-all duration-[850ms]
                ease-[cubic-bezier(0.22,1,0.36,1)]
                sm:mt-8 sm:text-[17px]
                md:text-[18px]
                ${isVisible
                  ? "translate-y-0 opacity-100 blur-0"
                  : "translate-y-8 opacity-0 blur-[5px]"
                }
              `}
              style={{
                transitionDelay: "1020ms",
              }}
            >
              Join a team that's building the infrastructure for India's
              circular economy connecting people, technology and purpose to
              create measurable impact.
            </p>

            {/* =================================================
                ACTIONS
            ================================================= */}
            <div
              className={`
                mt-10 flex flex-wrap items-center gap-8
                transform-gpu
                transition-all duration-[850ms]
                ease-[cubic-bezier(0.22,1,0.36,1)]
                sm:mt-12 sm:gap-11
                ${isVisible
                  ? "translate-y-0 opacity-100 blur-0"
                  : "translate-y-10 opacity-0 blur-[6px]"
                }
              `}
              style={{
                transitionDelay: "1150ms",
              }}
            >

              {/* =================================================
                  EXPLORE OPPORTUNITIES
              ================================================= */}
              <button
                type="button"
                className="
                  group relative
                  flex h-[60px] items-center gap-3
                  overflow-hidden
                  rounded-full
                  bg-[#3eb4a1]
                  px-7
                  text-[15px]
                  font-medium
                  text-white
                  shadow-[0_10px_25px_rgba(43,157,140,0.15)]
                  transition-all
                  duration-500
                  ease-out

                  hover:-translate-y-1.5
                  hover:bg-[#299f8f]
                  hover:shadow-[0_18px_38px_rgba(43,157,140,0.28)]

                  active:translate-y-0

                  sm:h-[62px]
                  sm:px-8
                "
              >
                {/* Hover shine */}
                <span
                  className="
                    absolute inset-y-0 -left-[100%] w-[70%]
                    skew-x-[-20deg]
                    bg-white/15
                    transition-all duration-700
                    group-hover:left-[120%]
                  "
                />

                <span className="relative z-10">
                  Explore Opportunities
                </span>

                <ArrowUpRight
                  size={18}
                  strokeWidth={1.8}
                  className="
                    relative z-10
                    transition-all duration-500
                    ease-out
                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                    group-hover:scale-110
                  "
                />
              </button>

              {/* =================================================
                  SUBMIT YOUR CV
              ================================================= */}
              <button
                type="button"
                onClick={handleCVUpload}
                className="
                  group
                  flex flex-col items-start gap-2
                  text-[15px]
                  font-medium
                  text-[#284c48]
                  transition-all duration-300
                  hover:-translate-y-1
                  sm:text-[16px]
                "
              >
                <span className="flex items-center gap-3 font-semibold">

                  <span
                    className="
                      transition-colors duration-300
                      group-hover:text-[#299f8f]
                    "
                  >
                    Submit Your CV
                  </span>

                  <ArrowDown
                    size={21}
                    strokeWidth={2}
                    className="
                      transition-all duration-500
                      ease-out
                      group-hover:translate-y-1.5
                      group-hover:text-[#299f8f]
                    "
                  />
                </span>

                {/* Animated underline */}
                <span className="relative block h-[2px] w-[131px] overflow-hidden bg-[#d4e6e2]">
                  <span
                    className="
                      absolute inset-y-0 left-0
                      w-full
                      origin-left
                      scale-x-100
                      bg-[#3da997]
                      transition-transform
                      duration-500
                      ease-out
                      group-hover:scale-x-0
                    "
                  />

                  <span
                    className="
                      absolute inset-y-0 left-0
                      w-full
                      origin-right
                      scale-x-0
                      bg-[#299f8f]
                      transition-transform
                      duration-500
                      ease-out
                      group-hover:scale-x-100
                    "
                  />
                </span>
              </button>

              {/* FILE INPUT */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

          {/* =====================================================
              RIGHT IMAGE COLLAGE
          ===================================================== */}
          <div
            className={`
              relative mx-auto
              h-[430px]
              w-full
              max-w-[600px]
              transform-gpu
              transition-all
              duration-[1000ms]
              ease-[cubic-bezier(0.22,1,0.36,1)]
              sm:h-[490px]
              md:h-[540px]
              lg:h-[570px]
              xl:h-[600px]
              ${isVisible
                ? "translate-x-0 opacity-100 blur-0"
                : "translate-x-12 opacity-0 blur-[8px]"
              }
            `}
            style={{
              transitionDelay: "350ms",
            }}
          >

            {/* =================================================
                MAIN CENTER IMAGE
            ================================================= */}
            <div
              className="
                group
                absolute left-[18%] top-[12%]
                z-20
                h-[245px] w-[59%]
                overflow-hidden
                rounded-[30px]
                border border-white
                shadow-[0_18px_40px_rgba(20,70,65,0.12)]
                sm:h-[280px]
                sm:rounded-[34px]
                md:h-[315px]
                lg:h-[330px]
                xl:h-[345px]
              "
            >
              <img
                src="/images/IndianRecoveryTeam.png"
                alt=""
                className="
                  h-full w-full object-cover
                  transform-gpu
                  transition-transform
                  duration-700
                  ease-out
                  group-hover:scale-[1.07]
                "
              />

              {/* Image hover overlay */}
              <div
                className="
                  pointer-events-none
                  absolute inset-0
                  bg-[#299f8f]/0
                  transition-colors duration-500
                  group-hover:bg-[#299f8f]/10
                "
              />
            </div>

            {/* =================================================
                TOP RIGHT IMAGE
            ================================================= */}
            <div
              className="
                group
                absolute right-[7%] top-[2%]
                z-40
                h-[135px] w-[35%]
                overflow-hidden
                rounded-[25px]
                border border-white
                shadow-[0_15px_32px_rgba(20,70,65,0.16)]
                transition-all duration-500
                ease-out
                hover:-translate-y-2
                hover:rotate-1
                hover:shadow-[0_22px_42px_rgba(20,70,65,0.22)]
                sm:h-[155px]
                sm:rounded-[29px]
                md:h-[175px]
                lg:h-[190px]
                xl:h-[200px]
              "
            >
              <img
                src="/images/MonochromeEngineer.png"
                alt=""
                className="
                  h-full w-full object-cover
                  transform-gpu
                  transition-transform duration-700
                  group-hover:scale-110
                "
              />
            </div>

            {/* =================================================
                LEFT IMAGE
            ================================================= */}
            <div
              className="
                group
                absolute left-[1%] top-[20%]
                z-50
                h-[135px] w-[30%]
                overflow-hidden
                rounded-[24px]
                border border-white
                shadow-[0_15px_32px_rgba(20,70,65,0.16)]
                transition-all duration-500
                ease-out
                hover:-translate-y-2
                hover:-rotate-1
                hover:shadow-[0_22px_42px_rgba(20,70,65,0.22)]
                sm:h-[155px]
                sm:rounded-[28px]
                md:h-[175px]
                lg:h-[185px]
                xl:h-[195px]
              "
            >
              <img
                src="/images/Monochromelaboratory.png"
                alt=""
                className="
                  h-full w-full object-cover
                  transform-gpu
                  transition-transform duration-700
                  group-hover:scale-110
                "
              />
            </div>

            {/* =================================================
                BOTTOM RIGHT IMAGE
            ================================================= */}
            <div
              className="
                group
                absolute bottom-[13%] right-[5%]
                z-50
                h-[130px] w-[35%]
                overflow-hidden
                rounded-[27px]
                border border-white
                shadow-[0_16px_35px_rgba(20,70,65,0.16)]
                transition-all duration-500
                ease-out
                hover:-translate-y-2
                hover:rotate-1
                hover:shadow-[0_22px_42px_rgba(20,70,65,0.22)]
                sm:h-[150px]
                sm:rounded-[31px]
                md:h-[170px]
                lg:h-[180px]
                xl:h-[190px]
              "
            >
              <img
                src="/images/Blackwhite.png"
                alt=""
                className="
                  h-full w-full object-cover
                  transform-gpu
                  transition-transform duration-700
                  group-hover:scale-110
                "
              />
            </div>

            {/* =================================================
                CONNECTOR LINE 1
            ================================================= */}
            <div
              className={`
                absolute right-[18%] top-[47%]
                z-[25]
                h-[1px] w-[55px]
                origin-right
                bg-[#299f8f]
                transition-transform duration-700
                sm:w-[65px]
                ${isVisible
                  ? "scale-x-100"
                  : "scale-x-0"
                }
              `}
              style={{
                transitionDelay: "950ms",
              }}
            />

            {/* =================================================
                CONNECTOR LINE 2
            ================================================= */}
            <div
              className={`
                absolute right-[13%] top-[68%]
                z-[25]
                h-[1px] w-[45px]
                origin-right
                bg-[#299f8f]
                transition-transform duration-700
                sm:w-[55px]
                ${isVisible
                  ? "scale-x-100"
                  : "scale-x-0"
                }
              `}
              style={{
                transitionDelay: "1100ms",
              }}
            />

            {/* =================================================
                INFINITY BADGE
            ================================================= */}
            <div
              className={`
                absolute left-[4%] top-[61%]
                z-[70]
                flex h-[72px] w-[72px]
                -translate-y-1/2
                items-center justify-center
                rounded-full
                border-[7px] border-white
                bg-[#07534c]
                shadow-[0_12px_28px_rgba(7,83,76,0.24)]
                transition-all
                duration-[800ms]
                ease-[cubic-bezier(0.22,1,0.36,1)]
                sm:h-[82px]
                sm:w-[82px]
                sm:border-[8px]
                md:h-[92px]
                md:w-[92px]
                md:border-[9px]
                ${isVisible
                  ? "scale-100 rotate-0 opacity-100"
                  : "scale-50 rotate-[-20deg] opacity-0"
                }
              `}
              style={{
                transitionDelay: "1050ms",
              }}
            >
         
<motion.div
  initial={{ opacity: 0, scale: 0.6 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ type: "spring", stiffness: 200, damping: 15 }}
  whileHover={{ scale: 1.1 }}
  className="
    relative flex h-[50px] w-[50px]
    items-center justify-center
    sm:h-[58px] sm:w-[58px]
    md:h-[66px] md:w-[66px]
  "
>
  {/* Soft pulsing glow behind the ring */}
  <motion.span
    className="absolute inset-0 rounded-full bg-[#55b8aa]/20"
    animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0, 0.5] }}
    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
  />

  {/* Rotating dashed ring */}
  <motion.div
    className="absolute inset-0 rounded-full border border-dashed border-[#55b8aa]"
    animate={{ rotate: 360 }}
    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
  />

  {/* Logo with subtle breathing effect */}
  <motion.img
    src="/images/logo-white.png"
    alt=""
    className="relative h-[40px] w-[50px] object-contain"
    animate={{ scale: [1, 1.06, 1] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
  />
</motion.div>
            </div>


          </div>
        </div>
      </div>
    </section>
  );
};

export default CareersHero;