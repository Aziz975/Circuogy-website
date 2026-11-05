
import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const cards = [
  {
    number: "01",
    title: "Urban Mining & Feedstock",
    text: "Spent lithium-ion batteries, e-waste and NdFeB magnets aggregated at source through a pan-India network of formal and informal collection channels.",
    image: "/images/urban.png",
  },
  {
    number: "02",
    title: "Hydrometallurgical Refining",
    text: "One proprietary hydromet process. Two output streams — battery-grade critical minerals from black mass, and rare earth elements from NdFeB magnets.",
    image: "/images/refining.png",
  },
  {
    number: "03",
    title: "Domestic Supply Chain",
    text: "Refined outputs supplied to cathode manufacturers, cell makers, EV OEMs and defence users — closing India's loop and two of its most critical import dependencies.",
    image: "/images/supply-chain.png",
  },
  {
    number: "04",
    title: "EPR & Compliance",
    text: "Every tonne of feedstock is traceable and certified — managed end-to-end through our EPRSense™ compliance infrastructure.",
    image: "/images/epr.png",
  },
];

const headingLines = [
  [{ text: "Turning end-of-life", color: "text-[#080c0b]" }],
  [{ text: "materials into the", color: "text-[#32a092]" }],
  [{ text: "building blocks of", color: "text-[#080c0b]" }],
  [{ text: "India's clean energy economy.", color: "text-[#32a092]" }],
];

const letterVariants = {
  hidden: {
    opacity: 0,
    y: "115%",
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: "0%",
    filter: "blur(0px)",
    transition: {
      duration: 0.62,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeUpVariants = {
  hidden: {
    opacity: 0,
    y: 28,
    filter: "blur(5px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function WhatDo() {
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
        threshold: 0.15,
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameOne);
      cancelAnimationFrame(frameTwo);
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-[#f7faf8] px-5 py-16 sm:px-8 sm:py-20 md:px-10 md:py-24 lg:px-[4.8vw] lg:py-[105px] xl:px-[4.8vw]"
    >
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(34,107,98,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,107,98,0.055)_1px,transparent_1px)] bg-[size:54px_54px] opacity-70" />

      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -right-[180px] -top-[170px] -z-10 h-[560px] w-[560px] rounded-full border border-[#249d8d]/[0.08] sm:h-[650px] sm:w-[650px]" />
      <div className="pointer-events-none absolute -right-[110px] -top-[100px] -z-10 h-[430px] w-[430px] rounded-full border border-[#249d8d]/[0.07]" />
      <div className="pointer-events-none absolute -bottom-[300px] -left-[220px] -z-10 h-[600px] w-[600px] rounded-full border border-[#249d8d]/[0.05]" />
      <div className="pointer-events-none absolute right-[10%] top-[15%] -z-10 h-[260px] w-[260px] rounded-full bg-[#52b8a5]/[0.07] blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-[1450px]">
        <div className="grid items-start gap-12 lg:grid-cols-[49%_51%] lg:gap-10 xl:grid-cols-[50%_50%]">
          {/* Left content */}
          <div className="max-w-[720px]">
            {/* Section label */}
            <motion.div
              initial="hidden"
              animate={visible ? "visible" : "hidden"}
              variants={fadeUpVariants}
              className="mb-7 flex items-center gap-4"
            >
              <span className="text-[11px] font-bold tracking-[0.22em] text-[#299d8e] sm:text-[12px]">
                WHAT WE DO
              </span>
             
            </motion.div>

            {/* Letter-by-letter heading */}
            <h2
              className="mt-8 max-w-[570px] text-[43px] font-bold leading-[1.04] tracking-[-0.05em] sm:text-[54px] md:text-[60px] lg:text-[52px] xl:text-[59px]"
              aria-label="Turning end-of-life materials into the building blocks of India's clean energy economy."
            >
              {headingLines.map((line, lineIndex) => (
                <motion.span
                  key={`line-${lineIndex}`}
                  className="block"
                  initial="hidden"
                  animate={visible ? "visible" : "hidden"}
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        delayChildren: prefersReducedMotion
                          ? 0
                          : 0.12 + lineIndex * 0.17,
                        staggerChildren: prefersReducedMotion ? 0 : 0.025,
                      },
                    },
                  }}
                  aria-hidden="true"
                >
                  {line.map((part, partIndex) => (
                    <motion.span
                      key={`part-${lineIndex}-${partIndex}`}
                      className={`inline ${part.color}`}
                      variants={{
                        hidden: {},
                        visible: {
                          transition: {
                            staggerChildren: prefersReducedMotion ? 0 : 0.025,
                          },
                        },
                      }}
                    >
                      {Array.from(part.text).map((letter, letterIndex) => (
                        <motion.span
                          key={`${lineIndex}-${partIndex}-${letterIndex}`}
                          className="inline-block whitespace-pre will-change-transform"
                          variants={
                            prefersReducedMotion
                              ? {
                                  hidden: { opacity: 1, y: 0, filter: "blur(0px)" },
                                  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
                                }
                              : letterVariants
                          }
                        >
                          {letter}
                        </motion.span>
                      ))}
                    </motion.span>
                  ))}
                </motion.span>
              ))}
            </h2>

            {/* Description */}
            <motion.div
              initial="hidden"
              animate={visible ? "visible" : "hidden"}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 28,
                  filter: "blur(5px)",
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: {
                    duration: prefersReducedMotion ? 0 : 0.8,
                    delay: prefersReducedMotion ? 0 : 0.85,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
              className="mt-8 max-w-[690px]"
            >
              <p className="text-[14px] leading-[1.75] text-[#63716e] sm:text-[15px] sm:leading-[1.7] md:text-[16px]">
                Every spent lithium-ion battery contains the critical minerals
                India imports at enormous cost — Lithium, Cobalt, Nickel,
                Graphite, Manganese. Every discarded electronic device and
                decommissioned motor holds rare earth elements — Neodymium,
                Dysprosium, Praseodymium — that power EV drivetrains, wind
                turbines and defence systems. India imports nearly all of both.
              </p>

              <p className="mt-5 text-[14px] leading-[1.75] text-[#63716e] sm:text-[15px] sm:leading-[1.7] md:text-[16px]">
                Circulogy has built the infrastructure and the technology to
                recover both from the same feedstock streams, using a single
                proprietary hydrometallurgical process. We are not a
                conventional recycler. We are a{" "}
                <strong className="font-semibold text-[#253a36]">
                  critical mineral and rare earth refinery
                </strong>{" "}
                purpose-built for India's energy transition, aligned with the
                National Critical Mineral Mission.
              </p>
            </motion.div>
          </div>

          {/* Right cards */}
          <div className="relative lg:top-[8%]">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              {cards.map((card, index) => (
                <motion.div
                  key={card.number}
                  initial={{
                    opacity: 0,
                    y: prefersReducedMotion ? 0 : 32,
                    scale: prefersReducedMotion ? 1 : 0.98,
                  }}
                  animate={
                    visible
                      ? { opacity: 1, y: 0, scale: 1 }
                      : {
                          opacity: 0,
                          y: prefersReducedMotion ? 0 : 32,
                          scale: prefersReducedMotion ? 1 : 0.98,
                        }
                  }
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.75,
                    delay: prefersReducedMotion ? 0 : 0.25 + index * 0.13,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : {
                          y: -7,
                          transition: { duration: 0.28, ease: "easeOut" },
                        }
                  }
                  className="group relative isolate rounded-[24px] border border-[#d7ebe5] bg-[#f8fcfa] p-6 transition-[border-color,box-shadow,background-color] duration-500 hover:border-[#62c7b6] hover:bg-white hover:shadow-[0_18px_45px_rgba(7,63,61,0.13),0_0_24px_rgba(50,160,146,0.12)] sm:p-6 md:p-7"
                >
                  {/* Teal glow on hover */}
                  <div className="pointer-events-none absolute -inset-px -z-10 rounded-[25px] bg-[radial-gradient(ellipse_at_top,rgba(50,160,146,0.22),transparent_68%)] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Top accent line */}
                  <div className="pointer-events-none absolute left-6 right-6 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-[#299d8e] via-[#72cdbb] to-transparent transition-transform duration-500 group-hover:scale-x-100" />

                  {/* Image icon */}
                  <div className="relative mb-6 flex h-[52px] w-[52px] items-center justify-center overflow-hidden rounded-full border border-[#cfe5df] bg-[#eef7f4] transition-all duration-500 group-hover:scale-110 group-hover:border-[#43a394] group-hover:bg-[#e0f5ef] group-hover:shadow-[0_0_22px_rgba(50,160,146,0.24)]">
                    <img
                      src={card.image}
                      alt=""
                      loading="lazy"
                      className="h-[30px] w-[30px] object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Card number */}
                  <span className="mb-3 block text-[13px] font-medium tracking-[0.08em] text-[#11706a]">
                    {card.number}
                  </span>

                  {/* Card title */}
                  <h3 className="text-[21px] font-semibold leading-[1.15] tracking-[-0.025em] text-[#073f3d] transition-colors duration-300 group-hover:text-[#168d80] sm:text-[22px]">
                    {card.title}
                  </h3>

                  {/* Card description */}
                  <p className="mt-4 text-[14px] leading-[1.7] text-[#55716d] transition-colors duration-300 group-hover:text-[#3e625d] sm:text-[15px]">
                    {card.text}
                  </p>

                  {/* Bottom hover detail */}
                  <div className="mt-6 h-[2px] w-8 overflow-hidden rounded-full bg-[#d9ebe5] transition-all duration-500 group-hover:w-16 group-hover:bg-[#299d8e]">
                    <div className="h-full w-full origin-left scale-x-0 bg-[#78cfc0] transition-transform duration-500 group-hover:scale-x-100" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom-right decorative detail */}
      <motion.div
        initial="hidden"
        animate={visible ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0, y: 12 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: prefersReducedMotion ? 0 : 0.8,
              delay: prefersReducedMotion ? 0 : 0.9,
            },
          },
        }}
        className="pointer-events-none absolute bottom-8 right-[5vw] hidden items-center gap-3 lg:flex"
      >
      
      </motion.div>
    </section>
  );
}
