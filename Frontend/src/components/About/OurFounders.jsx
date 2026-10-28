
import React, { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  X,
  Settings,
  ChartNoAxesCombined,
  Recycle,
  Factory,
  ShieldCheck,
  Truck,
  FlaskConical,
  Pickaxe,
  Globe,
} from "lucide-react";

/* =========================================================
   FOUNDER DATA
========================================================= */

const founders = [
  {
    id: 1,
    name: "Saeem Rizvi",
    role: "Founder & CEO",
    src: "/images/saeem-rizvi.jpeg",
    experience: [
      {
        icon: Settings,
        text: "More than half a decade of experience in recycling and materials operations",
      },
      {
        icon: ChartNoAxesCombined,
        text: "Built and scaled a prior e-waste recycling facility of 30,000 MT/year capacity",
      },
      {
        icon: Recycle,
        text: "Owns recycling operations, material recovery, and on-ground execution",
      },
    ],
  },
  {
    id: 2,
    name: "Abhishek Tiwari",
    role: "Co-Founder & COO",
    src: "/images/abhishek-tiwari.jpeg",
    experience: [
      {
        icon: Factory,
        text: "20+ years experience at KPMG at government advisory, across 25+ countries",
      },
      {
        icon: ShieldCheck,
        text: "Architected the government of Uttar Pradesh's states startup mission.",
      },
      {
        icon: Truck,
        text: "Owns business strategy, government relations, partnerships and market.",
      },
    ],
  },
  {
    id: 3,
    name: "Azeem Rizvi",
    role: "Co-Founder and CPO",
    src: "/images/azeem-sir.jpeg",
    experience: [
      {
        icon: FlaskConical,
        text: "Owns recycling factory supervision across the network",
      },
      {
        icon: Pickaxe,
        text: "Leads e-waste procurement and output material sales",
      },
      {
        icon: Globe,
        text: "Drives on-ground plant operations from facility to facility",
      },
    ],
  },
];

/* =========================================================
   HEADING ANIMATION
========================================================= */

const headingLines = [
  { text: "Built by people", accent: false },
  { text: "who have been", accent: false },
  { text: "in the trenches.", accent: true },
];

const letterVariants = {
  hidden: {
    opacity: 0,
    y: "110%",
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: "0%",
    filter: "blur(0px)",
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* =========================================================
   EXPERIENCE CARD
   Original size and styling preserved
========================================================= */

function ExperienceCard({ experience = [] }) {
  return (
    <div className="w-full rounded-xl border border-[#e0efeb] bg-white p-4 sm:p-5">
      <div className="space-y-4">
        {experience.map((item, index) => {
          const Icon = item.icon;

          return (
            <div key={index} className="flex items-center gap-3 sm:gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e0f7f3] text-[#278f82] transition-all duration-300 hover:bg-[#d0f1e9] hover:shadow-[0_0_18px_rgba(54,162,148,0.18)] sm:h-11 sm:w-11">
                <Icon size={21} strokeWidth={2} />
              </div>

              <div className="h-9 w-px shrink-0 bg-[#d5e8e3] sm:h-11" />

              <p className="min-w-0 flex-1 text-[13px] font-medium leading-[1.4] tracking-[-0.015em] text-[#293431] sm:text-[14px]">
                {item.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================
   FOUNDER CARD
========================================================= */

function FounderCard({ founder, onViewProfile }) {
  return (
    <motion.div
      whileHover={{
        y: -7,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      className="group relative isolate overflow-hidden rounded-[18px] border border-[#d9ebe7] bg-white shadow-[0_12px_35px_rgba(28,110,99,0.07)] transition-[border-color,box-shadow] duration-500 hover:border-[#75c8ba] hover:shadow-[0_22px_50px_rgba(28,110,99,0.14),0_0_28px_rgba(54,162,148,0.13)]"
    >
      {/* Hover glow */}
      <div className="pointer-events-none absolute -inset-px -z-10 rounded-[19px] bg-[radial-gradient(ellipse_at_top,rgba(54,162,148,0.23),transparent_68%)] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

      {/* Top accent */}
      <div className="absolute left-0 right-0 top-0 z-20 h-[5px] bg-gradient-to-r from-[#278f82] via-[#58c1b0] to-[#a2e3d7]" />

      {/* Founder image */}
      <div className="relative mx-[7px] mt-[7px] aspect-[1.06/1] overflow-hidden rounded-[13px] bg-[#edf6f3]">
        <img
          src={founder.src}
          alt={founder.name}
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.055]"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#073f3d]/15 via-transparent to-white/10 opacity-40 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#32a092]/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      {/* Founder details */}
      <div className="relative px-5 pb-6 pt-5 sm:px-5">
        <h3 className="text-[22px] font-semibold leading-[1.1] tracking-[-0.035em] text-[#0d1110] transition-colors duration-300 group-hover:text-[#167f73] sm:text-[24px]">
          {founder.name}
        </h3>

        <p className="mt-2 text-[15px] leading-normal text-[#73807e] sm:text-[16px]">
          {founder.role}
        </p>

        <button
          type="button"
          onClick={() => onViewProfile(founder)}
          aria-label={`View ${founder.name}'s profile`}
          className="mt-6 flex h-[48px] w-full items-center justify-center gap-3 rounded-[12px] border-[1.5px] border-[#72c4b9] bg-white text-[15px] font-medium text-[#3ba394] transition-all duration-300 hover:border-[#36a294] hover:bg-[#eef9f7] hover:shadow-[0_0_20px_rgba(54,162,148,0.14)] focus:outline-none focus:ring-2 focus:ring-[#36a294] focus:ring-offset-2"
        >
          View Profile
          <ArrowRight
            size={18}
            strokeWidth={1.8}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </div>

      {/* Bottom hover line */}
      <div className="absolute bottom-0 left-0 z-20 h-[3px] w-0 bg-gradient-to-r from-[#278f82] to-[#8cddcd] transition-all duration-500 group-hover:w-full" />
    </motion.div>
  );
}

/* =========================================================
   FOUNDER PROFILE MODAL
   Portal prevents clipping by parent sections
========================================================= */

function FounderModal({ founder, onClose }) {
  useEffect(() => {
    if (!founder) return;

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [founder, onClose]);

  if (!founder || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <motion.div
      key="founder-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[99999] flex items-center justify-center overflow-y-auto overscroll-contain bg-[#071b18]/65 p-3 backdrop-blur-sm sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="founder-modal-title"
        initial={{ opacity: 0, y: 18, scale: 0.975 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative my-auto w-full max-w-[850px] overflow-hidden rounded-[22px] border border-[#d9ebe7] bg-white shadow-[0_30px_100px_rgba(0,0,0,0.25)] sm:rounded-[24px]"
      >
        {/* Top accent */}
        <div className="absolute left-0 right-0 top-0 z-10 h-[5px] bg-gradient-to-r from-[#278f82] via-[#58c1b0] to-[#a2e3d7]" />

        {/* Close icon */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close profile"
          className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-[#d9ebe7] bg-white text-[#263a36] transition hover:bg-[#eef9f7] hover:text-[#269484] focus:outline-none focus:ring-2 focus:ring-[#36a294] sm:right-4 sm:top-4"
        >
          <X size={21} />
        </button>

        <div className="grid md:grid-cols-[0.8fr_1.2fr]">
          {/* Founder image */}
          <div className="relative min-h-[230px] bg-[#edf6f3] sm:min-h-[300px] md:min-h-[480px]">
            <img
              src={founder.src}
              alt={founder.name}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />

            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent md:hidden" />

            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/50 bg-white/90 px-3 py-2 text-[10px] font-semibold tracking-wide text-[#278f82] backdrop-blur-sm sm:text-xs">
              <span className="h-2 w-2 rounded-full bg-[#36a294]" />
              CIRCULOGY LEADERSHIP
            </div>
          </div>

          {/* Founder information */}
          <div className="flex min-w-0 w-full flex-col justify-center p-4 sm:p-6 md:p-8 lg:p-9">
            <h2
              id="founder-modal-title"
              className="break-words pr-6 text-2xl font-bold leading-tight tracking-[-0.04em] text-[#101716] sm:pr-8 sm:text-3xl md:text-[36px] md:leading-[1.08]"
            >
              {founder.name}
            </h2>

            <p className="mb-4 mt-2 text-sm font-medium text-[#36a294] sm:mb-5 sm:text-base">
              {founder.role}
            </p>

            {/* Original experience box dimensions and styling */}
            <div className="w-full min-w-0">
              <ExperienceCard experience={founder.experience} />
            </div>

            <div className="mt-5 sm:mt-7">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-[#36a294] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#278f82] focus:outline-none focus:ring-2 focus:ring-[#36a294] focus:ring-offset-2 sm:w-auto sm:gap-3 sm:px-6"
              >
                Close Profile
                <X size={17} className="shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

/* =========================================================
   OUR FOUNDERS SECTION
========================================================= */

export default function OurFounders() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [selectedFounder, setSelectedFounder] = useState(null);
  const prefersReducedMotion = useReducedMotion();

  const closeModal = useCallback(() => {
    setSelectedFounder(null);
  }, []);

  /* Replay entrance animations when re-entering the viewport */
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
      { threshold: 0.12 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameOne);
      cancelAnimationFrame(frameTwo);
    };
  }, [prefersReducedMotion]);

  const activeLetterVariants = prefersReducedMotion
    ? {
        hidden: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        },
      }
    : letterVariants;

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-[#f8fbfa] px-5 py-14 text-[#101716] sm:px-8 md:px-12 lg:px-[5vw] lg:py-[78px]"
    >
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e4eeeb_1px,transparent_1px),linear-gradient(to_bottom,#e4eeeb_1px,transparent_1px)] bg-[size:54px_54px] opacity-60" />

      {/* Top-right decorative orbits */}
      <div className="pointer-events-none absolute -right-[95px] -top-[105px] -z-10 h-[510px] w-[510px] rounded-full border border-[#dcece9]" />
      <div className="pointer-events-none absolute -right-[30px] -top-[35px] -z-10 h-[370px] w-[370px] rounded-full border border-[#dcece9]" />
      <div className="pointer-events-none absolute right-[55px] top-[25px] -z-10 h-[255px] w-[255px] rounded-full border border-[#dcece9]" />

      <div className="pointer-events-none absolute right-[9px] top-[142px] -z-10 flex h-[29px] w-[29px] items-center justify-center rounded-full border border-[#a9dcd4] bg-[#f8fbfa]">
        <span className="h-[9px] w-[9px] rounded-full bg-[#35a293] shadow-[0_0_0_5px_rgba(53,162,147,0.08)]" />
      </div>

      {/* Bottom-left decorative orbits */}
      <div className="pointer-events-none absolute -bottom-[240px] left-[29%] -z-10 h-[610px] w-[610px] rounded-full border border-[#dcece9]" />
      <div className="pointer-events-none absolute -bottom-[170px] left-[33%] -z-10 h-[470px] w-[470px] rounded-full border border-[#dcece9]" />
      <div className="pointer-events-none absolute -bottom-[90px] left-[38%] -z-10 h-[310px] w-[310px] rounded-full border border-[#dcece9]" />

      <div className="pointer-events-none absolute bottom-[290px] left-[30.5%] -z-10 flex h-[29px] w-[29px] items-center justify-center rounded-full border border-[#a9dcd4] bg-[#f8fbfa]">
        <span className="h-[8px] w-[8px] rounded-full bg-[#35a293]" />
      </div>

      {/* Soft ambient glow */}
      <div className="pointer-events-none absolute left-[5%] top-[25%] -z-10 h-[280px] w-[280px] rounded-full bg-[#75cbbb]/[0.08] blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-[1450px]">
        <div className="grid items-start gap-12 lg:grid-cols-[38%_62%] lg:gap-8 xl:grid-cols-[37%_63%]">
          {/* Left content */}
          <div className="pt-2 lg:pt-[25px]">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={
                visible
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 18 }
              }
              transition={{
                duration: prefersReducedMotion ? 0 : 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex items-center gap-4"
            >
              <span className="text-[11px] font-bold tracking-[0.25em] text-[#409e93] sm:text-[12px]">
                OUR FOUNDERS
              </span>
            </motion.div>

            {/* Letter-by-letter heading */}
            <h2
              aria-label="Built by people who have been in the trenches."
              className="mt-8 max-w-[570px] text-[47px] font-bold leading-[1.01] tracking-[-0.05em] sm:text-[54px] md:text-[60px] lg:text-[52px] xl:text-[59px]"
            >
              {headingLines.map((line, lineIndex) => (
                <motion.span
                  key={line.text}
                  className={`block ${line.accent ? "text-[#32a092]" : "text-[#101716]"}`}
                  initial="hidden"
                  animate={visible ? "visible" : "hidden"}
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: prefersReducedMotion ? 0 : 0.035,
                        delayChildren: prefersReducedMotion ? 0 : 0.12 + lineIndex * 0.2,
                      },
                    },
                  }}
                  aria-hidden="true"
                >
                  {Array.from(line.text).map((letter, letterIndex) => (
                    <motion.span
                      key={`${lineIndex}-${letterIndex}`}
                      className="inline-block whitespace-pre"
                      variants={activeLetterVariants}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.span>
              ))}
            </h2>

            {/* Accent underline */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={
                visible
                  ? { opacity: 1, scaleX: 1 }
                  : { opacity: 0, scaleX: 0 }
              }
              transition={{
                duration: prefersReducedMotion ? 0 : 0.75,
                delay: prefersReducedMotion ? 0 : 0.85,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-7 h-[3px] w-[76px] origin-left rounded-full bg-gradient-to-r from-[#278f82] to-[#a2e3d7]"
            />

            {/* Supporting text */}
            <motion.p
              initial={{ opacity: 0, y: 22, filter: "blur(4px)" }}
              animate={
                visible
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 22, filter: "blur(4px)" }
              }
              transition={{
                duration: prefersReducedMotion ? 0 : 0.75,
                delay: prefersReducedMotion ? 0 : 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-8 max-w-[400px] text-[18px] leading-[1.5] text-[#697875] sm:text-[19px]"
            >
              Meet the leadership behind Circulogy.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={
                visible
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: -12 }
              }
              transition={{
                duration: prefersReducedMotion ? 0 : 0.7,
                delay: prefersReducedMotion ? 0 : 0.7,
              }}
              className="mt-8 hidden items-center gap-3 lg:flex"
            />
          </div>

          {/* Founder cards */}
          <div className="mt-2 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-8 lg:grid-cols-3 lg:gap-5 xl:gap-7">
            {founders.map((founder, index) => (
              <motion.div
                key={founder.id}
                initial={{
                  opacity: 0,
                  y: prefersReducedMotion ? 0 : 32,
                  filter: "blur(4px)",
                }}
                animate={
                  visible
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : {
                        opacity: 0,
                        y: prefersReducedMotion ? 0 : 32,
                        filter: "blur(4px)",
                      }
                }
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.75,
                  delay: prefersReducedMotion ? 0 : 0.25 + index * 0.16,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <FounderCard
                  founder={founder}
                  onViewProfile={setSelectedFounder}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal is rendered into document.body by createPortal */}
      <FounderModal
        founder={selectedFounder}
        onClose={closeModal}
      />
    </section>
  );
}
