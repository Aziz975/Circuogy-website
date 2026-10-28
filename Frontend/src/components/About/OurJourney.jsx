
import React, { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const journeyItems = [
  {
    year: "2025",
    title: "Founded",
    text: "DPIIT-recognised DeepTech startup incorporated and headquartered in Noida, registered in Meerut, UP.",
    image: "/images/founded.png",
    dark: true,
  },
  {
    year: "2026",
    title: "Hub & Spoke Activated",
    text: "Onboarding of an e-waste recycling facility with 20,000+ MT per annum capacity activating the informal supply chain network to fulfill the feedstock need.",
    image: "/images/Hub.png",
    dark: true,
  },
  {
    year: "2026",
    title: "R&D Facility Setup",
    text: "Setting up a dedicated hydrometallurgical R&D facility focused on developing and validating the process technology for critical mineral and rare earth element extraction, processing and refining from battery black mass and NdFeB magnets.",
    image: "/images/facility.png",
    dark: true,
  },
  {
    year: "2027 (Proposed)",
    title: "Pilot Plant",
    text: "Pre-commercial pilot validates hydromet recovery of critical minerals and rare earth elements to battery-grade specifications.",
    image: "/images/pilot.png",
    dark: false,
  },
  {
    year: "2028 (Proposed)",
    title: "Gigafactory — Meerut, UP",
    text: "India’s first integrated critical mineral and rare earth refinery reaches commercial scale supplying battery-grade outputs to India’s EV, energy storage and defence supply chains.",
    image: "/images/giga.png",
    dark: false,
  },
];

const headingText = [
  { text: "From vision to ", accent: false },
  { text: "refinery.", accent: true },
];

const letterVariants = {
  hidden: {
    opacity: 0,
    y: "110%",
    rotateX: -35,
    filter: "blur(7px)",
  },
  visible: {
    opacity: 1,
    y: "0%",
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function OurJourney() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let frameOne;
    let frameTwo;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (prefersReducedMotion) {
            setVisible(true);
            return;
          }

          setVisible(false);

          frameOne = requestAnimationFrame(() => {
            frameTwo = requestAnimationFrame(() => {
              setVisible(true);
            });
          });
        } else {
          setVisible(false);
          cancelAnimationFrame(frameOne);
          cancelAnimationFrame(frameTwo);
        }
      },
      {
        threshold: 0.12,
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameOne);
      cancelAnimationFrame(frameTwo);
    };
  }, [prefersReducedMotion]);

  const headingContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.035,
        delayChildren: prefersReducedMotion ? 0 : 0.12,
      },
    },
  };

  const letterAnimation = prefersReducedMotion
    ? {
        hidden: { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" },
        visible: { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" },
      }
    : letterVariants;

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-[#f5fbf9] px-5 py-16 sm:px-8 sm:py-20 md:px-10 lg:px-8 lg:py-[90px] xl:px-[2vw]"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,rgba(207,244,237,0.65),transparent_42%)]" />
      <div className="pointer-events-none absolute left-[-10%] top-[-100px] -z-10 h-[230px] w-[120%] rounded-[50%] bg-[#dff6f1]/70" />

      {/* Decorative teal waves */}
      <div className="pointer-events-none absolute bottom-[-190px] left-[-8%] -z-10 h-[350px] w-[116%] rounded-[50%] bg-[#087b76]" />
      <div className="pointer-events-none absolute bottom-[-235px] left-[-5%] -z-10 h-[320px] w-[110%] rounded-[50%] border-t border-[#55c7bb]/50 bg-[#005b58]" />
      <div className="pointer-events-none absolute bottom-[-280px] left-[5%] -z-10 h-[270px] w-[95%] rounded-[50%] border-t border-[#64cfc3]/30" />

      {/* Ambient accent */}
      <div className="pointer-events-none absolute right-[8%] top-[18%] -z-10 h-[250px] w-[250px] rounded-full bg-[#55c7bb]/10 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-[1600px]">
        {/* Header */}
        <div className="grid items-end gap-8 lg:grid-cols-[57%_43%] xl:grid-cols-[58%_42%]">
          <div className="relative">
            {/* Section label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={
                visible
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{
                duration: prefersReducedMotion ? 0 : 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative mb-7 inline-flex items-center gap-3 rounded-full border border-[#d5eee8] bg-[#f5fbf9]/90 px-6 py-3 text-[15px] font-medium text-[#087b76] shadow-[0_5px_20px_rgba(8,123,118,0.04)] sm:px-7 sm:text-[16px]"
            >
              <span className="h-2 w-2 rounded-full bg-[#159b95]" />
              Our Journey
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/60" />
            </motion.div>

            {/* Main heading: letter reveal */}
            <h2
              aria-label="From vision to refinery."
              className="max-w-[850px] text-[46px] font-semibold leading-[0.98] tracking-[-0.055em] text-[#080b0b] sm:text-[56px] md:text-[64px] lg:text-[62px] xl:text-[72px]"
            >
              {headingText.map((part, partIndex) => (
                <motion.span
                  key={part.text}
                  className={`inline ${part.accent ? "text-[#087d78]" : ""}`}
                  initial="hidden"
                  animate={visible ? "visible" : "hidden"}
                  variants={headingContainerVariants}
                  aria-hidden="true"
                >
                  {Array.from(part.text).map((letter, letterIndex) => (
                    <motion.span
                      key={`${partIndex}-${letterIndex}`}
                      className="inline-block whitespace-pre"
                      variants={letterAnimation}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.span>
              ))}
            </h2>

            {/* Heading underline */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={
                visible
                  ? { scaleX: 1, opacity: 1 }
                  : { scaleX: 0, opacity: 0 }
              }
              transition={{
                duration: prefersReducedMotion ? 0 : 0.8,
                delay: prefersReducedMotion ? 0 : 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-7 h-[3px] w-20 origin-left rounded-full bg-gradient-to-r from-[#087d78] to-[#8bd8ca]"
            />
          </div>
        </div>

        {/* Journey cards */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3 xl:gap-4">
          {journeyItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{
                opacity: 0,
                y: prefersReducedMotion ? 0 : 38,
                scale: prefersReducedMotion ? 1 : 0.98,
              }}
              animate={
                visible
                  ? { opacity: 1, y: 0, scale: 1 }
                  : {
                      opacity: 0,
                      y: prefersReducedMotion ? 0 : 38,
                      scale: prefersReducedMotion ? 1 : 0.98,
                    }
              }
              transition={{
                duration: prefersReducedMotion ? 0 : 0.75,
                delay: prefersReducedMotion ? 0 : 0.2 + index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : {
                      y: -9,
                      transition: { duration: 0.3, ease: "easeOut" },
                    }
              }
              className={`group relative isolate flex h-[510px] w-full flex-col overflow-hidden rounded-[18px] border shadow-[0_10px_30px_rgba(0,70,65,0.08)] transition-[border-color,box-shadow] duration-500 hover:shadow-[0_25px_55px_rgba(0,70,65,0.18),0_0_25px_rgba(53,180,163,0.12)] sm:h-[530px] lg:h-[510px] xl:h-[520px] ${
                item.dark
                  ? "border-[#086f6a] bg-[#00504e] text-white hover:border-[#36b4a5]"
                  : "border-[#cce9e5] bg-[#f9fdfc] text-[#111414] hover:border-[#74c8ba]"
              }`}
            >
              {/* Hover glow */}
              <div className="pointer-events-none absolute -inset-px -z-10 rounded-[19px] bg-[radial-gradient(ellipse_at_top,rgba(70,207,185,0.25),transparent_65%)] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

              {/* Card content */}
              <div className="relative z-20 flex flex-1 flex-col px-5 pt-5 sm:px-6 sm:pt-6">
                {/* Year and arrow */}
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`inline-flex min-h-[43px] items-center rounded-full px-4 text-[14px] font-medium transition-colors duration-300 sm:px-5 sm:text-[16px] ${
                      item.dark
                        ? "bg-[#087d78] text-white group-hover:bg-[#10958d]"
                        : "bg-[#e4f6f3] text-[#087b76] group-hover:bg-[#d6f0ec]"
                    }`}
                  >
                    {item.year}
                  </span>

                  <div
                    className={`flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full transition-all duration-500 group-hover:rotate-[-35deg] group-hover:scale-110 group-hover:shadow-[0_0_18px_rgba(53,180,163,0.22)] ${
                      item.dark
                        ? "bg-[#087d78] text-white group-hover:bg-[#10958d]"
                        : "bg-[#e4f6f3] text-[#087b76] group-hover:bg-[#d6f0ec]"
                    }`}
                  >
                    <ArrowRight size={21} strokeWidth={1.7} />
                  </div>
                </div>

                {/* Title */}
                <h3
                  className={`mt-6 text-[21px] font-semibold leading-[1.08] tracking-[-0.025em] transition-transform duration-500 ease-out group-hover:-translate-y-1 sm:text-[22px] ${
                    item.dark ? "text-white" : "text-[#111313]"
                  }`}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p
                  className={`mt-4 text-[14px] leading-[1.5] transition-colors duration-500 sm:text-[15px] ${
                    item.dark
                      ? "text-white/90 group-hover:text-white"
                      : "text-[#625778] group-hover:text-[#4e405f]"
                  }`}
                >
                  {item.text}
                </p>
              </div>

              {/* Image section */}
              <div
                className={`absolute inset-x-0 bottom-0 h-[255px] overflow-hidden ${
                  item.dark ? "bg-[#00504e]" : "bg-[#e8f5f2]"
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Main gradient merge */}
                <div
                  className={`absolute inset-x-0 top-0 h-[135px] bg-gradient-to-b ${
                    item.dark
                      ? "from-[#00504e] via-[#00504e]/90 via-[42%] to-transparent"
                      : "from-[#f9fdfc] via-[#f9fdfc]/90 via-[42%] to-transparent"
                  }`}
                />

                {/* Soft blurred transition */}
                <div
                  className={`absolute inset-x-0 top-0 h-[105px] blur-[7px] ${
                    item.dark
                      ? "bg-gradient-to-b from-[#00504e] via-[#00504e]/70 to-transparent"
                      : "bg-gradient-to-b from-[#f9fdfc] via-[#f9fdfc]/70 to-transparent"
                  }`}
                />

                {/* Image tint */}
                <div
                  className={`absolute inset-0 ${
                    item.dark
                      ? "bg-gradient-to-t from-[#003f3d]/35 via-transparent to-transparent"
                      : "bg-gradient-to-t from-[#d9eee9]/20 via-transparent to-transparent"
                  }`}
                />

                {/* Subtle image highlight */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#35b4a3]/0 via-transparent to-white/0 transition-all duration-500 group-hover:to-white/10" />
              </div>

              {/* Extra merge layer */}
              <div
                className={`pointer-events-none absolute inset-x-0 top-[120px] z-10 h-[115px] bg-gradient-to-b to-transparent ${
                  item.dark
                    ? "from-[#00504e] via-[#00504e]/80"
                    : "from-[#f9fdfc] via-[#f9fdfc]/80"
                }`}
              />

              {/* Bottom hover line */}
              <div className="absolute bottom-0 left-0 z-30 h-[3px] w-0 bg-[#35b4a3] transition-all duration-700 ease-out group-hover:w-full" />
            </motion.div>
          ))}
        </div>

        {/* Bottom spacing for decorative waves */}
        <div className="h-[130px] sm:h-[150px]" />
      </div>
    </section>
  );
}
