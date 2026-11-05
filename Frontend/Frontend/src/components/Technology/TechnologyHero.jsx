
import React from "react";
import { motion } from "motion/react";

const headingText = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.025,
      delayChildren: 0.15,
    },
  },
};

const letterVariant = {
  hidden: {
    y: "110%",
    opacity: 0,
    filter: "blur(6px)",
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

const sectionReveal = {
  hidden: {
    opacity: 0,
    y: 24,
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

const imageReveal = {
  hidden: {
    opacity: 0,
    scale: 1.06,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const renderLetters = (text, keyPrefix) =>
  [...text].map((letter, index) => (
    <motion.span
      key={`${keyPrefix}-${index}`}
      variants={letterVariant}
      className="inline-block"
      aria-hidden="true"
    >
      {letter === " " ? "\u00A0" : letter}
    </motion.span>
  ));

const stats = [
  {
    title: "Hydromet",
    description: "Proprietary process",
  },
  {
    title: "Dual Feedstock",
    description: "Batteries + NdFeB magnets",
  },
  {
    title: "97–99%",
    description: "Recovery rate",
  },
  {
    title: "NMC + LFP",
    description: "Chemistry Support",
  },
];

export default function TechnologyHero() {
  return (
    <section className="w-full bg-[#f8f8f6] px-4 py-5 sm:px-6 sm:py-7 md:px-8 lg:px-10 xl:px-[38px]">
      <div className="mx-auto w-full max-w-[1600px]">
        {/* ================= HERO IMAGE ================= */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          className="relative min-h-[500px] overflow-hidden rounded-[20px] bg-[#d8efeb] sm:min-h-[540px] md:min-h-[570px] lg:min-h-[590px] xl:min-h-[545px]"
        >
          {/* BACKGROUND IMAGE */}
          <motion.img
            src="images/full-mountain.png"
            alt=""
            variants={imageReveal}
            className="absolute inset-0 top-[30%] h-[80%] w-full object-cover"
          />

          {/* ================= HEADING ================= */}
          <div className="relative z-10 mx-auto max-w-[1120px] px-5 pt-12 text-center sm:px-8 sm:pt-14 md:pt-16 lg:pt-[64px] xl:pt-[42px]">
            <motion.h1
              variants={headingText}
              className="text-[30px] font-bold leading-[1.08] tracking-[-1.5px] text-black sm:text-[37px] md:text-[45px] md:tracking-[-2px] lg:text-[48px] xl:text-[50px]"
            >
              <span className="block">
                <span className="text-[#2b9d8c]">
                  {renderLetters(
                    "Proprietary hydromet technology for",
                    "line-one"
                  )}
                </span>
              </span>

              <span className="block overflow-hidden">
                {renderLetters("Critical minerals ", "line-two")}
                <span className="text-[#2b9d8c]">
                  {renderLetters("and Rare earths, both", "line-three")}
                </span>
              </span>
            </motion.h1>
          </div>

          {/* ================= DESCRIPTION ================= */}
          <motion.div
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            transition={{ delay: 0.25 }}
            className="relative z-10 mx-auto mt-12 max-w-[530px] px-5 text-center sm:mt-14 md:mt-16 lg:mt-[62px]"
          >
            <p className="text-[17px] font-medium leading-[1.18] tracking-[-0.3px] text-[#34383a] sm:text-[19px] md:text-[20px] lg:text-[21px]">
              Circulogy's proprietary hydrometallurgical
              <br className="hidden sm:block" />
              platform processes two feedstock streams i.e.
              <br className="hidden sm:block" />
              lithium-ion battery and permanent magnets
              <br className="hidden sm:block" />
              both through a single integrated refinery.
            </p>
          </motion.div>
        </motion.div>

        {/* ================= STATS STRIP ================= */}
        <div className="grid grid-cols-2 bg-white px-3 py-6 sm:px-5 sm:py-7 md:grid-cols-4 md:px-8 md:py-8 lg:px-10 lg:py-7">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              variants={sectionReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`flex min-h-[65px] flex-col items-center justify-center px-3 text-center md:px-5 ${
                index === 0
                  ? "border-r border-[#48c5b7]"
                  : index === 1
                    ? "md:border-r md:border-[#48c5b7]"
                    : index === 2
                      ? "mt-5 border-r border-[#48c5b7] md:mt-0"
                      : "mt-5 md:mt-0"
              }`}
            >
              <h3 className="text-[17px] font-extrabold leading-none text-[#111] sm:text-[18px] md:text-[19px]">
                {stat.title}
              </h3>

              <p className="mt-1 text-[12px] font-medium leading-tight text-[#34383a] sm:text-[13px] md:text-[14px]">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
