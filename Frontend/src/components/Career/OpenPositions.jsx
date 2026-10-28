
import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const positions = [
  {
    id: "01",
    department: "GROWTH & PARTNERSHIPS",
    title: "Business Development",
    description:
      "Build strategic relationships and new growth channels that expand Circulogy’s circular economy network.",
    focus: ["Partnerships", "Market development", "Client relationships"],
    link: "/career/business-development",
  },
  {
    id: "02",
    department: "BUSINESS OPERATIONS",
    title: "Executive Assistant",
    description:
      "Support leadership with strategic coordination, operational planning, and seamless day-to-day execution.",
    focus: ["Executive support", "Operations", "Strategic coordination"],
    link: "/career/executive-assistant",
  },
  {
    id: "03",
    department: "COMMUNICATIONS",
    title: "Public Relation",
    description:
      "Strengthen Circulogy’s public presence through strategic communication, storytelling, and meaningful media relationships.",
    focus: ["Media relations", "Brand communication", "Public outreach"],
    link: "/career/public-relations",
  },
  {
    id: "04",
    department: "STRATEGY & FINANCE",
    title: "Equity / Capital Raising Specialist",
    description:
      "Help unlock growth capital and build investor relationships that accelerate circular economy innovation.",
    focus: ["Investor relations", "Capital raising", "Financial strategy"],
    link: "/career/capital-raising-specialist",
  },
  {
    id: "05",
    department: "CIRCULAR OPERATIONS",
    title: "Sr. Manager / Manager – Commodity, Waste Management / Trading",
    description:
      "Drive sourcing, commodity trading, and waste management operations across the circular materials value chain.",
    focus: ["Commodity trading", "Waste management", "Supply chain"],
    link: "/career/circular-operations-manager",
  },
  {
    id: "06",
    department: "PARTNER NETWORK",
    title: "Partner Onboarding Executive",
    description:
      "Build and strengthen Circulogy’s partner ecosystem by onboarding new collection, recycling, and supply chain partners.",
    focus: ["Partner onboarding", "Network expansion", "Relationship management"],
    link: "/career/partner-onboarding",
  },
];

const EASE = [0.22, 1, 0.36, 1];

const sectionReveal = {
  hidden: {
    opacity: 0,
    y: 35,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.85,
      ease: EASE,
      staggerChildren: 0.12,
    },
  },
};

const childReveal = {
  hidden: {
    opacity: 0,
    y: 22,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: EASE,
    },
  },
};

const OpenPositions = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeRole = positions[activeIndex];
  const shouldReduceMotion = useReducedMotion();

  const reveal = shouldReduceMotion
    ? {
        hidden: { opacity: 1, y: 0, filter: "blur(0px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)" },
      }
    : sectionReveal;

  const child = shouldReduceMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0 },
      }
    : childReveal;

  const detailsTransition = shouldReduceMotion
    ? { duration: 0 }
    : {
        duration: 0.38,
        ease: EASE,
      };

  return (
    <section className="relative overflow-hidden bg-[#f2f7f6] px-5 py-[60px] text-[#10211e] sm:px-8 sm:py-[75px] md:px-[5%] lg:px-[4.5%] lg:py-[85px] xl:px-[4.55%]">

      {/* Ambient background glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[160px] top-[100px] h-[380px] w-[380px] rounded-full bg-[#b5e4d8]/30 blur-[100px]"
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [0, 35, 0],
                y: [0, 25, 0],
                scale: [1, 1.12, 1],
              }
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[180px] bottom-[30px] h-[360px] w-[360px] rounded-full bg-[#83c9b6]/20 blur-[110px]"
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [0, -30, 0],
                y: [0, -20, 0],
              }
        }
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative mx-auto min-h-[500px] w-full max-w-[1455px]">

        {/* Section Heading */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          className="mb-[22px] flex flex-col justify-between gap-5 sm:mb-[27px] sm:flex-row sm:items-end"
        >
          <div>
            <motion.div
              variants={child}
              className="mb-[17px] flex items-center gap-[12px]"
            >
            

             
            </motion.div>

            <div className="overflow-hidden">
              <motion.h2
                variants={child}
                className="text-[39px] font-medium leading-[1.08] tracking-[-0.055em] text-[#0b1c18] sm:text-[48px] md:text-[54px] lg:text-[56px]"
              >
                Open positions
              </motion.h2>
            </div>

            <motion.p
              variants={child}
              className="mt-[7px] text-[14px] leading-[1.6] text-[#83928f] sm:text-[16px]"
            >
              Six roles, one clear place to explore each opportunity.
            </motion.p>
          </div>

          <motion.p
            variants={child}
            whileHover={
              shouldReduceMotion
                ? {}
                : { x: -4, transition: { duration: 0.2 } }
            }
            className="pb-[5px] text-[12px] font-semibold text-[#328779] sm:text-right sm:text-[13px]"
          >
            Click a role to view its details
          </motion.p>
        </motion.div>

        {/* Main Positions Card */}
        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 45,
                  scale: 0.985,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{ once: false, amount: 0.08 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.9,
            ease: EASE,
          }}
          className="grid grid-cols-1 overflow-hidden rounded-[25px] border border-[#dce8e5] bg-white shadow-[0_20px_55px_rgba(30,76,65,0.07)] transition-shadow duration-500 hover:shadow-[0_25px_70px_rgba(30,76,65,0.12)] lg:min-h-[638px] lg:grid-cols-[39%_61%] lg:rounded-[30px]"
        >

          {/* Left: Job List */}
          <div className="min-w-0 px-[18px] pb-[24px] pt-[23px] sm:px-[26px] sm:pb-[30px] sm:pt-[30px] lg:px-[30px] lg:pb-[32px] lg:pl-[31px] lg:pr-[30px] lg:pt-[29px]">

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.1 }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: shouldReduceMotion ? 0 : 0.07,
                  },
                },
              }}
              className="flex items-center justify-between border-b border-[#e4ece9] pb-[17px]"
            >
              <motion.span
                variants={child}
                className="text-[10px] font-semibold uppercase tracking-[0.01em] text-[#788783] sm:text-[11px]"
              >
                Current openings
              </motion.span>

              <motion.span
                variants={child}
                className="text-[10px] font-semibold uppercase text-[#788783] sm:text-[11px]"
              >
                06 roles
              </motion.span>
            </motion.div>

            <div className="mt-[16px] flex flex-col">
              {positions.map((role, index) => {
                const isActive = activeIndex === index;

                return (
                  <motion.button
                    key={role.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-pressed={isActive}
                    aria-label={`View ${role.title} details`}
                    initial={
                      shouldReduceMotion
                        ? false
                        : {
                            opacity: 0,
                            x: -24,
                          }
                    }
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{ once: false, amount: 0.1 }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.55,
                      delay: shouldReduceMotion ? 0 : index * 0.075,
                      ease: EASE,
                    }}
                    whileHover={
                      shouldReduceMotion
                        ? {}
                        : {
                            x: isActive ? 0 : 4,
                            transition: {
                              duration: 0.22,
                              ease: EASE,
                            },
                          }
                    }
                    whileTap={
                      shouldReduceMotion ? {} : { scale: 0.99 }
                    }
                    className={`group relative flex w-full items-center gap-[15px] rounded-[17px] px-[14px] py-[15px] text-left transition-[background-color,border-color,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#399f90] sm:gap-[20px] sm:px-[15px] sm:py-[17px] lg:gap-[20px] lg:px-[15px] lg:py-[16px] ${
                      isActive
                        ? "bg-[#e3f3ef] shadow-[0_5px_18px_rgba(36,125,105,0.06)]"
                        : "border-b border-[#e3eae8] bg-transparent hover:bg-[#f6faf8]"
                    }`}
                  >
                    {/* Animated Active Indicator */}
                    {isActive && (
                      <motion.span
                        layoutId="active-position-indicator"
                        className="absolute bottom-[17px] left-0 top-[17px] w-[4px] rounded-full bg-[#399f90]"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}

                    {!isActive && (
                      <span className="absolute bottom-[17px] left-0 top-[17px] w-[4px] rounded-full bg-transparent transition-colors duration-300 group-hover:bg-[#b5ded4]" />
                    )}

                    {/* Number */}
                    <span
                      className={`ml-[1px] min-w-[29px] text-[13px] font-semibold tabular-nums transition-colors duration-300 sm:min-w-[30px] ${
                        isActive
                          ? "text-[#338b7e]"
                          : "text-[#378d80]"
                      }`}
                    >
                      {role.id}
                    </span>

                    {/* Job Information */}
                    <span className="min-w-0 flex-1">
                      <span className="mb-[4px] block text-[9px] font-semibold uppercase leading-[1.3] tracking-[0.01em] text-[#879590] sm:text-[10px]">
                        {role.department}
                      </span>

                      <span className="block text-[14px] font-semibold leading-[1.3] tracking-[-0.025em] text-[#192823] sm:text-[16px] lg:text-[16px]">
                        {role.title}
                      </span>
                    </span>

                    {/* Animated Selected Arrow */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.span
                          key="selected-arrow"
                          initial={
                            shouldReduceMotion
                              ? false
                              : {
                                  opacity: 0,
                                  scale: 0.7,
                                  x: -8,
                                }
                          }
                          animate={{
                            opacity: 1,
                            scale: 1,
                            x: 0,
                          }}
                          exit={{
                            opacity: 0,
                            scale: 0.7,
                            x: -8,
                          }}
                          transition={detailsTransition}
                          className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full border border-[#c9e1db] bg-white text-[#399c8d]"
                        >
                          <ArrowRight size={17} strokeWidth={1.6} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Right: Selected Position Details */}
          <div className="relative isolate flex min-h-[500px] flex-col overflow-hidden rounded-t-[22px] bg-[#091d18] px-[25px] py-[27px] text-white sm:min-h-[550px] sm:px-[38px] sm:py-[34px] md:min-h-[550px] lg:min-h-[638px] lg:rounded-l-[30px] lg:rounded-tr-[30px] lg:px-[52px] lg:py-[42px] xl:px-[68px] xl:py-[44px]">

            {/* Technical Grid Background */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 opacity-80 [background-image:linear-gradient(rgba(75,125,109,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(75,125,109,0.12)_1px,transparent_1px)] [background-size:58px_58px] sm:[background-size:59px_59px]"
            />

            {/* Soft Inner Glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_40%_45%,transparent_0%,rgba(5,25,20,0.14)_65%,rgba(5,25,20,0.3)_100%)]"
            />

            {/* Animated Teal Light */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -right-[120px] top-[80px] -z-10 h-[300px] w-[300px] rounded-full bg-[#168a70]/15 blur-[85px]"
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      x: [0, -35, 0],
                      y: [0, 25, 0],
                      opacity: [0.45, 0.8, 0.45],
                    }
              }
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Top Bar */}
            <div className="flex items-center justify-between gap-4 border-b border-[#355047]/40 pb-[15px]">
              <span className="text-[10px] font-semibold uppercase tracking-[0.025em] text-[#83c8b9] sm:text-[11px]">
                {activeRole.department}
              </span>

              <span className="shrink-0 text-[10px] font-medium tabular-nums text-[#7b9189] sm:text-[11px]">
                {activeRole.id} / 06
              </span>
            </div>

            {/* Large Background Number */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`number-${activeRole.id}`}
                aria-hidden="true"
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 15,
                        filter: "blur(8px)",
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                exit={
                  shouldReduceMotion
                    ? {}
                    : {
                        opacity: 0,
                        y: -10,
                        filter: "blur(5px)",
                      }
                }
                transition={detailsTransition}
                className="pointer-events-none absolute right-[8%] top-[105px] -z-10 select-none text-[125px] font-medium leading-none tracking-[-0.02em] text-[#102f27] sm:right-[8%] sm:top-[105px] sm:text-[155px] lg:right-[8%] lg:top-[118px] lg:text-[155px] xl:text-[160px]"
              >
                {activeRole.id}
              </motion.div>
            </AnimatePresence>

            {/* Selected Role Details */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`details-${activeRole.id}`}
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 18,
                        filter: "blur(6px)",
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                exit={
                  shouldReduceMotion
                    ? {}
                    : {
                        opacity: 0,
                        y: -12,
                        filter: "blur(4px)",
                      }
                }
                transition={detailsTransition}
                className="relative z-10 mt-[37px] sm:mt-[40px] lg:mt-[41px]"
              >
                <p className="mb-[17px] text-[9px] font-medium uppercase tracking-[0.02em] text-[#82958d] sm:text-[10px]">
                  Career opportunity
                </p>

                <h3 className="max-w-[500px] text-[30px] font-semibold leading-[1.12] tracking-[-0.055em] text-[#f4f8f6] sm:text-[35px] md:text-[42px] lg:text-[35px] xl:text-[45px]">
                  {activeRole.title}
                </h3>

                <p className="mt-[21px] max-w-[500px] text-[14px] leading-[1.55] text-[#b4c2bc] sm:text-[16px] sm:leading-[1.5]">
                  {activeRole.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Role Focus and CTA */}
            <div className="relative z-10 mt-auto pt-[43px] sm:pt-[55px] lg:pt-[65px]">
              <p className="mb-[25px] text-[9px] font-medium uppercase tracking-[0.02em] text-[#758a81] sm:text-[10px]">
                Role focus
              </p>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`focus-${activeRole.id}`}
                  initial={
                    shouldReduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 12,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={
                    shouldReduceMotion
                      ? {}
                      : {
                          opacity: 0,
                          y: -8,
                        }
                  }
                  transition={{
                    ...detailsTransition,
                    delay: shouldReduceMotion ? 0 : 0.06,
                  }}
                  className="grid grid-cols-1 gap-[16px] sm:grid-cols-3 sm:gap-[15px] lg:gap-[16px]"
                >
                  {activeRole.focus.map((item, index) => (
                    <motion.div
                      key={item}
                      initial={
                        shouldReduceMotion
                          ? false
                          : {
                              opacity: 0,
                              x: -8,
                            }
                      }
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        duration: shouldReduceMotion ? 0 : 0.4,
                        delay: shouldReduceMotion
                          ? 0
                          : 0.08 + index * 0.09,
                        ease: EASE,
                      }}
                      className="flex min-w-0 items-center gap-[12px]"
                    >
                      <span className="h-[25px] w-[6px] shrink-0 rounded-full bg-[#39a594]" />

                      <span className="text-[13px] font-medium leading-[1.35] text-[#d0dcd6] sm:text-[13px] lg:text-[14px]">
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* View Opening Button */}
              <motion.a
                href={activeRole.link}
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        scale: 1.025,
                        transition: {
                          duration: 0.22,
                          ease: EASE,
                        },
                      }
                }
                whileTap={
                  shouldReduceMotion ? {} : { scale: 0.975 }
                }
                className="mt-[39px] inline-flex min-h-[48px] items-center gap-[18px] rounded-full bg-[#f3f8f5] py-[6px] pl-[20px] pr-[7px] text-[13px] font-semibold text-[#14251f] transition-colors duration-300 hover:bg-[#dff4ed] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#399f90] sm:mt-[47px] sm:pl-[22px]"
              >
                <span>View opening</span>

                <motion.span
                  whileHover={
                    shouldReduceMotion
                      ? {}
                      : {
                          rotate: 45,
                        }
                  }
                  transition={{
                    duration: 0.25,
                    ease: EASE,
                  }}
                  className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-[#399f90] text-white"
                >
                  <ArrowUpRight size={18} strokeWidth={1.8} />
                </motion.span>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OpenPositions;
