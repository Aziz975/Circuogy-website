
import React from "react";
import { Leaf } from "lucide-react";
import { motion } from "motion/react";


const CirculogyHero = () => {


const headingText = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.035,
    },
  },
};

const letterAnimation = {
  hidden: {
    y: "110%",
    opacity: 0,
    filter: "blur(8px)",
  },
  visible: {
    y: "0%",
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const renderLetters = (text) =>
  [...text].map((letter, index) => (
    <motion.span
      key={`${letter}-${index}`}
      variants={letterAnimation}
      className="inline-block"
      aria-hidden="true"
    >
      {letter === " " ? "\u00A0" : letter}
    </motion.span>
  ));

  const stats = [
    { value: "120+", label: "ARTICLES & REPORTS" },
    { value: "7", label: "FOCUS AREAS" },
    { value: "Weekly", label: "NEW INSIGHTS" },
  ];

  return (
    <section className="relative isolate min-h-[420px] w-full overflow-hidden bg-[#f4faff] font-sans text-[#080b0d] sm:min-h-[600px] lg:h-[calc(100vh-86px)] lg:min-h-[530px] lg:max-h-[850px]">
      {/* Background image */}
      <div className="absolute inset-0 z-0 h-90%">
        <img
          src="/images/heroblogimage.png"
          alt=""
          className="absolute inset-0 h-full w-[1800px] object-cover object-[60%_center]"
        />

        {/* Light overlay for text readability */}
      </div>



      {/* Hero content */}
      <div className="relative z-10 flex min-h-[520px] items-center px-6 py-14 sm:min-h-[600px] sm:px-10 lg:h-full lg:min-h-0 lg:px-[4.6%] lg:py-10">
        <div className="w-full max-w-[690px]">
          {/* Journal label */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#69cbd0] px-4 py-2 text-[11px] font-bold tracking-[0.13em] text-[#2bb3bd] sm:text-[13px]">
            <Leaf size={15} strokeWidth={2.2} />
            <span>CIRCULOGY JOURNAL</span>
          </div>

          {/* Heading */}
          <motion.h1
            variants={headingText}
            initial="hidden"
            animate="visible"
            className="max-w-[690px] text-[43px] font-bold leading-[1.02] tracking-[-0.055em] sm:text-[54px] sm:text-[bold] md:text-[87px] lg:text-[clamp(50px,5.5vw,80px)]"
          >
            <span className="sr-only">Insights, Ideas & Impact</span>

            <span className="block " aria-hidden="true">
              {renderLetters("Insights, Ideas ")}
              <motion.span
                variants={letterAnimation}
                className="inline-block text-[#12aab5]"
                aria-hidden="true"
              >
                &
              </motion.span>
            </span>

            <span className="block overflow-hidden" aria-hidden="true">
              {renderLetters("Impact")}
            </span>
          </motion.h1>

          {/* Description */}
          <p className="mt-6 max-w-[620px] text-[14px] leading-[1.75] tracking-[-0.01em] text-[#687080] sm:text-[16px] lg:text-[17px]">
            Perspectives from the front line of India’s circular economy — on
            sustainability, waste management, recycling, environmental
            innovation and the industry trends shaping what comes next.
          </p>

          {/* Statistics */}
          <div className="mt-9 grid max-w-[520px] grid-cols-3 sm:mt-12">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`min-w-0 ${index > 0
                    ? "ml-2 border-l border-[#9bdfe0] pl-3 sm:ml-5 sm:pl-7"
                    : ""
                  }`}
              >
                <p className="whitespace-nowrap text-[22px] font-extrabold leading-tight tracking-[-0.045em] text-[#13aab5] sm:text-[29px] lg:text-[32px]">
                  {stat.value}
                </p>
                <p className="mt-2 text-[8px] font-semibold tracking-[0.1em] text-[#727887] sm:text-[10px] lg:text-[12px]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CirculogyHero;
