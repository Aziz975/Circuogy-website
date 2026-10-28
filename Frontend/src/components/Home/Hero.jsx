
import React, { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const EASE = [0.22, 1, 0.36, 1];

const letterVariants = {
  hidden: {
    opacity: 0,
    y: "115%",
    rotate: 7,
    filter: "blur(8px)",
  },
  visible: (index) => ({
    opacity: 1,
    y: "0%",
    rotate: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.72,
      delay: index * 0.035,
      ease: EASE,
    },
  }),
};

const fadeUpVariants = {
  hidden: {
    opacity: 0,
    y: 28,
    filter: "blur(5px)",
  },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      delay: 0.12 + index * 0.15,
      ease: EASE,
    },
  }),
};

const Hero = () => {
  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, {
    amount: 0.15,
    once: false,
  });

  const shouldReduceMotion = useReducedMotion();

  // Smooth scroll-based parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -65]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 55]);

  const animationState = shouldReduceMotion ? "reduced" : isInView ? "visible" : "hidden";

  const revealVariants = {
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
        ease: EASE,
      },
    },
    reduced: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
    },
  };

  const headingVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.035,
      },
    },
    reduced: {},
  };

  const renderLetters = (text, startIndex = 0) =>
    text.split("").map((letter, index) => (
      <motion.span
        key={`${startIndex}-${index}`}
        custom={startIndex + index}
        variants={letterVariants}
        className="inline-block whitespace-pre text-[#f2f3f2]"
        style={{
          willChange: isInView && !shouldReduceMotion ? "transform, opacity" : "auto",
        }}
      >
        {letter === " " ? "\u00A0" : letter}
      </motion.span>
    ));

  const lineOne = "Building the Mine";
  const lineTwo = "Above Ground";

  return (
    <section
      ref={sectionRef}
      className="hero-section relative min-h-screen w-full overflow-hidden bg-[#050d0f] text-white"
    >
      {/* Background Image */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: shouldReduceMotion ? 0 : backgroundY,
        }}
      >
        <motion.img
          src="images/HomePage1.png"
          alt=""
          aria-hidden="true"
          initial={
            shouldReduceMotion
              ? false
              : { opacity: 0, scale: 1.08 }
          }
          animate={
            shouldReduceMotion
              ? { opacity: 1, scale: 1 }
              : isInView
                ? { opacity: 1, scale: 1 }
                : { opacity: 0.75, scale: 1.025 }
          }
          transition={{
            duration: shouldReduceMotion ? 0 : 1.6,
            ease: EASE,
          }}
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Background Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#050d0f]/95 via-[#050d0f]/75 to-[#050d0f]/25" />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050d0f]/65 via-transparent to-[#050d0f]/15" />

      {/* Animated Teal Glow */}
      <motion.div
        aria-hidden="true"
        style={{
          y: shouldReduceMotion ? 0 : glowY,
        }}
        className="pointer-events-none absolute -right-[5%] top-[5%] h-[450px] w-[450px] rounded-full bg-[#087d78]/15 blur-[120px] sm:h-[600px] sm:w-[600px]"
        animate={
          shouldReduceMotion
            ? {}
            : {
                opacity: [0.45, 0.8, 0.45],
                scale: [1, 1.12, 1],
              }
        }
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle Technical Texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle_at_70%_45%,rgba(25,205,181,0.4)_0,transparent_32%)]"
      />

      {/* Main Content */}
      <div className="relative z-10 mx-auto min-h-screen w-full max-w-[1800px] px-6 py-10 sm:px-10 md:px-12 lg:px-16 xl:px-[6%]">
        <div className="flex min-h-[calc(100vh-80px)] items-center">
          <motion.div
            style={{
              y: shouldReduceMotion ? 0 : contentY,
            }}
            className="relative z-20 w-full max-w-[800px] pt-8 lg:pt-0"
          >
       

            {/* Main Letter-Reveal Heading */}
            <motion.h1
              variants={headingVariants}
              initial="hidden"
              animate={animationState}
              className="max-w-[800px] text-[40px] font-medium leading-[0.98] tracking-[-0.055em] sm:text-[68px] md:text-[79px] lg:text-[75px] xl:text-[85px] 2xl:text-[65px]"
            >
              {/* First Line */}
              <span className="block  pb-[4px]">
                <span className="block">
                  {shouldReduceMotion
                    ? lineOne
                    : renderLetters(lineOne)}
                </span>
              </span>

              {/* Second Line */}
              <span className="block  pb-[5px]">
                <span className="block">
                  {shouldReduceMotion ? (
                    <span className="text-[#16b5a5]">{lineTwo}</span>
                  ) : (
                    lineTwo.split("").map((letter, index) => (
                      <motion.span
                        key={`second-${index}`}
                        custom={lineOne.length + index + 2}
                        variants={letterVariants}
                        className="inline-block whitespace-pre text-[#16b5a5]"
                        style={{
                          willChange: isInView ? "transform, opacity" : "auto",
                        }}
                      >
                        {letter === " " ? "\u00A0" : letter}
                      </motion.span>
                    ))
                  )}
                </span>
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              custom={0}
              variants={fadeUpVariants}
              initial="hidden"
              animate={animationState}
              className="mt-8 text-[18px] font-normal tracking-[-0.015em] text-[#e0e6e5] sm:text-[20px] md:text-[22px]"
            >
              Recovering critical minerals. Securing tomorrow.
            </motion.p>

            {/* Description */}
            <motion.p
              custom={1}
              variants={fadeUpVariants}
              initial="hidden"
              animate={animationState}
              className="mt-5 max-w-[650px] text-[14px] leading-[1.75] text-[#b0bcba] sm:text-[15px] md:text-[16px]"
            >
              The critical minerals powering tomorrow’s economy already exist
              in the products we use today. Circulogy closes the loop,
              recovering high-value materials from end-of-life electronics
              and batteries to build a resilient, circular supply chain.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              custom={2}
              variants={fadeUpVariants}
              initial="hidden"
              animate={animationState}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <motion.div
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: -3,
                        transition: { duration: 0.25, ease: EASE },
                      }
                }
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                className="sm:w-[310px]"
              >
                <Link
                  to="/exploremining"
                  className="group flex h-[50px] w-full items-center justify-between rounded-full bg-[#20b8a7] px-7 text-[16px] font-medium text-white transition-colors duration-300 hover:bg-[#27c9b6] hover:shadow-[0_0_35px_rgba(32,184,167,0.25)] sm:text-[17px]"
                >
                  <span>Explore Urban Mining</span>

                  <motion.span
                    animate={
                      shouldReduceMotion
                        ? {}
                        : { x: [0, 3, 0] }
                    }
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="flex items-center"
                  >
                    <ArrowRight
                      size={20}
                      strokeWidth={1.8}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </motion.span>
                </Link>
              </motion.div>

              <motion.div
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: -3,
                        transition: { duration: 0.25, ease: EASE },
                      }
                }
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              >
                <Link
                  to="/contact"
                  className="flex h-[50px] items-center justify-center gap-3 rounded-full border border-[#29393a] bg-[#061012]/60 px-8 text-[16px] font-medium text-[#d7dfdd] backdrop-blur-sm transition-all duration-300 hover:border-[#20b8a7] hover:bg-[#20b8a7]/10 hover:text-[#20b8a7] sm:px-10 sm:text-[17px]"
                >
                  Talk to Us
                  <ArrowUpRight size={17} strokeWidth={1.7} />
                </Link>
              </motion.div>
            </motion.div>

            {/* Trusted By */}
            <motion.div
              custom={3}
              variants={fadeUpVariants}
              initial="hidden"
              animate={animationState}
              className="mt-12 flex flex-wrap items-center gap-4 sm:mt-16"
            >
              <div className="flex -space-x-2">
                {[
                  "images/avatar1.png",
                  "images/avatar2.png",
                  "images/avatar3.png",
                  "images/avaatar4.png",
                ].map((src, index) => (
                  <motion.div
                    key={src}
                    initial={
                      shouldReduceMotion
                        ? false
                        : { opacity: 0, scale: 0.7, y: 10 }
                    }
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.45,
                      delay: shouldReduceMotion
                        ? 0
                        : 0.65 + index * 0.1,
                      ease: EASE,
                    }}
                    whileHover={
                      shouldReduceMotion
                        ? {}
                        : {
                            y: -4,
                            scale: 1.08,
                            zIndex: 10,
                          }
                    }
                    className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-[#071011] bg-[#596663]"
                  >
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>

              <p className="text-[12px] leading-5 text-[#a0aeab] sm:text-[13px]">
                Trusted by leading OEMs, recyclers, and innovators
              </p>

              <motion.span
                className="hidden h-[7px] w-[7px] rounded-full bg-[#19cdb5] shadow-[0_0_8px_#19cdb5] sm:block"
                animate={
                  shouldReduceMotion
                    ? {}
                    : { opacity: [1, 0.4, 1] }
                }
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
