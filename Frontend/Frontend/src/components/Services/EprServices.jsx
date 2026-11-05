import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useInView } from "motion/react";

const leftServices = [
  {
    number: "01",
    title: "EPR Registration & Compliance",
    description:
      "CPCB portal registration, PRO tie-ups, target-setting and compliance management. Always audit-ready.",
  },
  {
    number: "02",
    title: "EPR Certificate Procurement",
    description:
      "Verified EPR credits sourced from CPCB-registered recyclers and transferred directly to your CPCB account  traceable, pan-India.",
  },
  {
    number: "03",
    title: "Material Takeback & Reverse Logistics",
    description:
      "EPR-linked collection from dealer, retail and enterprise networks  from first-mile pickup to documented delivery at processing facilities, under a verifiable chain of custody.",
  },
];

const rightServices = [
  {
    number: "04",
    title: "Data Management & Regulatory Reporting",
    description:
      "Real-time compliance dashboards, credit inventory tracking and annual return filing  managed through EPRSense™. Every deadline met, every filing accurate.",
  },
  {
    number: "05",
    title: "Regulatory Advisory",
    description:
      "Continuous monitoring of CPCB notifications, MoEFCC rule changes and amended targets  translated into actionable compliance steps before they become obligations.",
  },
];

const stats = [
  {
    label: "SUSTAINABLE EVENTS",
    value: "50",
    suffix: "+",
    description:
      "Green and sustainable events delivered across India",
  },
  {
    label: "COMMUNITY REACH",
    value: "2L",
    suffix: "+",
    description:
      "People reached through IEC and green programs",
  },
  {
    label: "EPR COVERAGE",
    value: "5",
    suffix: "+",
    description:
      "EPR waste categories managed across India",
  },
  {
    label: "COMPLIANCE",
    value: "100%",
    suffix: "+",
    description:
      "Compliance audit pass rate across all clients",
  },
];

/* =========================================================
   SERVICE ITEM
========================================================= */

function ServiceItem({ number, title, description, index = 0 }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="group flex cursor-default gap-[14px] py-[17px] sm:gap-[17px] sm:py-[18px]"
      initial={
        shouldReduceMotion
          ? { opacity: 1, x: 0 }
          : { opacity: 0, x: -25 }
      }
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{
        once: false,
        amount: 0.35,
      }}
      transition={{
        duration: 0.65,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={
        shouldReduceMotion
          ? {}
          : {
            x: 6,
            transition: {
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            },
          }
      }
    >
      {/* Number + line */}
      <div className="flex shrink-0 items-start gap-[5px]">
        <motion.span
          className="text-[20px] font-medium leading-[15px] text-[#36aaa0] transition-all duration-300 group-hover:scale-110 group-hover:text-[#168f85] sm:text-[20px]"
          initial={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 0 }
          }
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{
            duration: 0.4,
            delay: index * 0.12 + 0.15,
          }}
        >
          {number}
        </motion.span>

        <motion.span
          className="mt-[3px] h-[69px] w-[1px] origin-top bg-[#8ccfc5] transition-all duration-300 group-hover:h-[76px] group-hover:bg-[#36aaa0] sm:h-[69px]"
          initial={
            shouldReduceMotion
              ? { scaleY: 1 }
              : { scaleY: 0 }
          }
          whileInView={{ scaleY: 1 }}
          viewport={{
            once: false,
            amount: 0.35,
          }}
          transition={{
            duration: 0.6,
            delay: index * 0.12 + 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>

      {/* Content */}
      <div className="relative top-[-7px] min-w-0 flex-1 ">
        <motion.h3
          className="text-[20px] font-bold leading-[1.4] tracking-[-0.15px] text-[#171d1b] transition-colors duration-300 group-hover:text-[#126e68] sm:text-[20px]"
          initial={
            shouldReduceMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 12 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{
            duration: 0.5,
            delay: index * 0.12 + 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {title}
        </motion.h3>

        <motion.p
  className="mt-[10px] max-w-[520px] text-[15px] font-normal leading-[1.65] text-[#78817c] transition-colors duration-300 group-hover:text-[#596661] sm:text-[15px]"

          initial={
            shouldReduceMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 10 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{
            duration: 0.55,
            delay: index * 0.12 + 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
}

/* =========================================================
   COMPLIANCE CARD
========================================================= */

function ComplianceCard() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="group relative flex min-h-[112px] cursor-default flex-col justify-center overflow-hidden rounded-[13px] bg-[#dcefeb] px-5 py-4 transition-shadow duration-500 hover:shadow-[0_14px_35px_rgba(0,80,76,0.14)] sm:min-h-[113px] sm:px-5"
      initial={
        shouldReduceMotion
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 25, scale: 0.97 }
      }
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: false,
        amount: 0.35,
      }}
      whileHover={
        shouldReduceMotion
          ? {}
          : {
            y: -5,
            scale: 1.015,
            transition: {
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            },
          }
      }
      transition={{
        duration: 0.7,
        delay: 0.2,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Soft hover glow */}
      <motion.div
        className="pointer-events-none absolute -right-10 -top-10 h-[100px] w-[100px] rounded-full bg-[#8ccfc5]/30 blur-2xl"
        initial={{
          opacity: 0,
          scale: 0.7,
        }}
        whileHover={{
          opacity: 1,
          scale: 1.2,
        }}
        transition={{
          duration: 0.4,
        }}
      />

      <motion.p
        className="relative z-10 text-[12px] font-extrabold uppercase tracking-[1.3px] text-[#286c67] transition-transform duration-300 group-hover:translate-x-1"
        initial={
          shouldReduceMotion
            ? { opacity: 1, x: 0 }
            : { opacity: 0, x: -10 }
        }
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        transition={{
          duration: 0.4,
          delay: 0.35,
        }}
      >
        EPRSense™ Compliance Intelligence
      </motion.p>

      <motion.h3
        className="relative z-10 mt-[10px] text-[14px] font-bold leading-[1.3] tracking-[-0.3px] text-[#15201d] transition-transform duration-300 group-hover:translate-x-1 sm:text-[15px]"
        initial={
          shouldReduceMotion
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 10 }
        }
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{
          duration: 0.5,
          delay: 0.42,
        }}
      >
        One operating view.
        <br />
        Every obligation visible.
      </motion.h3>

      <motion.p
        className="relative z-10 mt-[10px] text-[13px] font-normal text-[#73817b]"
        initial={
          shouldReduceMotion
            ? { opacity: 1 }
            : { opacity: 0 }
        }
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{
          duration: 0.5,
          delay: 0.52,
        }}
      >
        Dashboards · Credits · Returns · Alerts
      </motion.p>
    </motion.div>
  );
}

/* =========================================================
   COUNT UP COMPONENT
========================================================= */

function CountUpNumber({
  value,
  suffix,
  index = 0,
}) {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: false,
    amount: 0.5,
  });

  const shouldReduceMotion = useReducedMotion();

  const [count, setCount] = useState(0);

  /*
    Extract the numeric part from values like:
    "50"  -> 50
    "2L"  -> 2
    "5"   -> 5
    "100%" -> 100
  */
  const numericValue = parseFloat(value);
  const textSuffix = value
    .toString()
    .replace(/[0-9.]/g, "");

  useEffect(() => {
    if (shouldReduceMotion) {
      setCount(numericValue);
      return;
    }

    if (!isInView) {
      setCount(0);
      return;
    }

    let animationFrame;
    let startTime = null;

    const duration = 1500 + index * 150;

    const animate = (currentTime) => {
      if (!startTime) {
        startTime = currentTime;
      }

      const elapsed = currentTime - startTime;

      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out effect
      const easedProgress =
        1 - Math.pow(1 - progress, 4);

      const currentCount =
        numericValue * easedProgress;

      setCount(
        numericValue % 1 === 0
          ? Math.floor(currentCount)
          : Number(currentCount.toFixed(1))
      );

      if (progress < 1) {
        animationFrame =
          requestAnimationFrame(animate);
      } else {
        setCount(numericValue);
      }
    };

    // Small stagger between cards
    const timeout = setTimeout(() => {
      animationFrame =
        requestAnimationFrame(animate);
    }, index * 120);

    return () => {
      clearTimeout(timeout);

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [
    isInView,
    numericValue,
    index,
    shouldReduceMotion,
  ]);

  return (
    <span ref={ref}>
      {count}
      {textSuffix}
      {suffix}
    </span>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  label,
  value,
  suffix,
  description,
  index = 0,
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="group relative flex min-h-[175px] cursor-default flex-col overflow-hidden rounded-[15px] border border-white/20 bg-white/[0.12] px-[15px] py-[17px] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.17] hover:shadow-[0_15px_35px_rgba(0,0,0,0.12)] sm:min-h-[193px] sm:px-[17px] sm:py-[19px] lg:min-h-[193px]"
      initial={
        shouldReduceMotion
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 35, scale: 0.96 }
      }
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: false,
        amount: 0.3,
      }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={
        shouldReduceMotion
          ? {}
          : {
            y: -7,
            scale: 1.025,
            transition: {
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            },
          }
      }
    >
      {/* Hover glow */}
      <motion.div
        className="pointer-events-none absolute -right-8 -top-8 h-[90px] w-[90px] rounded-full bg-[#8ccfc5]/20 blur-2xl"
        initial={{
          opacity: 0,
          scale: 0.7,
        }}
        whileHover={{
          opacity: 1,
          scale: 1.25,
        }}
        transition={{
          duration: 0.45,
        }}
      />

      {/* Label */}
      <motion.p
        className="relative z-10 text-[10px] font-bold uppercase tracking-[1.3px] text-[#a7d7cf] transition-transform duration-300 group-hover:translate-x-1 sm:text-[12px]"
        initial={
          shouldReduceMotion
            ? { opacity: 1 }
            : { opacity: 0 }
        }
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{
          duration: 0.4,
          delay: index * 0.12 + 0.15,
        }}
      >
        {label}
      </motion.p>

      {/* Value */}
      <div className="relative z-10 mt-[15px] flex items-baseline text-white">
        <motion.span
          className="text-[40px] font-normal leading-none tracking-[-1.5px] transition-transform duration-300 group-hover:-translate-y-1 sm:text-[40px] lg:text-[42px]"
          initial={
            shouldReduceMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 18 }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: false,
          }}
          transition={{
            duration: 0.6,
            delay: index * 0.12 + 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <CountUpNumber
            value={value}
            suffix={suffix}
            index={index}
          />
        </motion.span>
      </div>

      {/* Underline */}
      <motion.div
        className="relative z-10 mt-[12px] h-[2px] w-[27px] rounded-full bg-[#8ccfc5] transition-all duration-300 group-hover:w-[42px]"
        initial={
          shouldReduceMotion
            ? { opacity: 1, scaleX: 1 }
            : { opacity: 0, scaleX: 0 }
        }
        whileInView={{
          opacity: 1,
          scaleX: 1,
        }}
        viewport={{
          once: false,
        }}
        style={{
          transformOrigin: "left",
        }}
        transition={{
          duration: 0.5,
          delay: index * 0.12 + 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      {/* Description */}
      <motion.p
        className="relative z-10 mt-[15px] max-w-[145px] text-[14px] font-normal leading-[1.6] text-[#d4e8e3] transition-colors duration-300 group-hover:text-white sm:text-[14px]"
        initial={
          shouldReduceMotion
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 10 }
        }
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: false,
        }}
        transition={{
          duration: 0.5,
          delay: index * 0.12 + 0.42,
        }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function EprServices() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      className="w-full overflow-hidden bg-[#00504c] pb-5 pt-0  sm:pb-6"
      initial={
        shouldReduceMotion
          ? { opacity: 1 }
          : { opacity: 0 }
      }
      whileInView={{
        opacity: 1,
      }}
      viewport={{
        once: false,
        amount: 0.08,
      }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
    >
      <div className="mx-auto max-w-full">
        {/* Main service panel */}
        <motion.div
          className="rounded-b-none rounded-t-[18px] bg-[#f8f8f4] px-5 pb-6 pt-8 sm:rounded-t-[22px] sm:px-7 sm:pb-7 sm:pt-9 lg:px-[60px] lg:pb-[30px] lg:pt-[39px]"
          initial={
            shouldReduceMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 45 }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: false,
            amount: 0.15,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* Header */}
          <motion.div
            className="mb-[12px] flex items-center justify-between"
            initial={
              shouldReduceMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: -12 }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: false,
            }}
            transition={{
              duration: 0.55,
              delay: 0.15,
            }}
          >
            <h2 className="text-[14px] font-extrabold uppercase tracking-[1.5px] text-[#286e68] sm:text-[12px]">
              What This Service Covers
            </h2>
          </motion.div>

          {/* Service grid */}
       <div className="grid grid-cols-1 gap-x-16 text-lg md:grid-cols-2 md:gap-x-20 md:text-xl lg:gap-x-[75px] lg:text-2xl">
            {/* Left column */}
            <div className="flex flex-col ">
              {leftServices.map((service, index) => (
                <div
                  key={service.number}
                  className={ 
                    index < 2 
                      ? "border-b border-[#e5e8e2]"
                      : ""
                  }
                >
                  <ServiceItem
                    {...service}
                    index={index}
                  />
                </div>
              ))}
            </div>

            {/* Right column */}
            <div className="flex flex-col">
              {rightServices.map((service, index) => (
                <div
                  key={service.number}
                  className={
                    index === 0
                      ? "border-b border-[#e5e8e2]"
                      : ""
                  }
                >
                  <ServiceItem
                    {...service}
                    index={index + 3}
                  />
                </div>
              ))}

              {/* Intelligence card */}
              <div className="mt-1 pb-0 pt-2 sm:pt-3">
                <ComplianceCard />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom stats */}
        <div className="grid grid-cols-2 gap-3 px-2 pt-[14px] sm:gap-4 sm:px-3 sm:pt-[15px] lg:grid-cols-4 lg:gap-[16px] lg:px-[13px] lg:pt-[14px]">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              {...stat}
              index={index}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}