import React from "react";
import { motion } from "motion/react";

/* =========================================================
   ANIMATION VARIANTS
========================================================= */

const fadeUp = {
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
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const leftCardReveal = {
  hidden: {
    opacity: 0,
    x: -35,
    y: 18,
    scale: 0.98,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const rightCardReveal = {
  hidden: {
    opacity: 0,
    x: 35,
    y: 18,
    scale: 0.98,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const numberReveal = {
  hidden: {
    opacity: 0,
    y: 25,
    scale: 0.94,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const contentReveal = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const mineralReveal = {
  hidden: {
    opacity: 0,
    x: -12,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function WhatWeRecover() {
  return (
    <section className="relative w-full bg-[#f7f8f4] px-5 py-10 sm:px-7 sm:py-12 md:px-10 md:py-14 lg:px-[27px] lg:py-[21px] xl:px-[27px]">
      <div className="mx-auto max-w-[1300px]">
        {/* ================= SECTION LABEL ================= */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.7 }}
          className="mb-5 pl-1 sm:mb-6 md:mb-7"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#159b95] sm:text-[11px]">
            WHAT WE RECOVER
          </p>
        </motion.div>

        {/* ================= MAIN CARDS ================= */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-7">
          {/* ================================================= */}
          {/* LEFT CARD - CRITICAL MINERALS */}
          {/* ================================================= */}
          <motion.div
            variants={leftCardReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="group relative min-h-[445px] overflow-hidden rounded-[20px] bg-[#101312] sm:min-h-[460px] lg:h-[445px]"
          >
            {/* LEFT IMAGE */}
            <div className="absolute inset-y-0 left-[-1%] w-[34%] overflow-hidden">
              <img
                src="images/recoveringimg1.png"
                alt=""
                className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Image overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent" />
            </div>

            {/* CARD BACKGROUND */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#087f7b]/15" />

            {/* CONTENT */}
            <div className="relative z-10 ml-[31%] h-full px-5 py-6 sm:px-7 sm:py-7 md:px-8 lg:px-6 xl:px-7">
              {/* NUMBER */}
              <motion.div
                variants={numberReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: 0.1 }}
                className="absolute left-[px] top-[-2px] select-none text-[108px] font-bold leading-none tracking-[-0.08em] text-[#b9dedd]/70 sm:text-[115px] lg:text-[105px]"
              >
                0 1
              </motion.div>

              {/* SMALL LABEL */}
              <motion.div
                variants={contentReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.25 }}
                transition={{ delay: 0.12 }}
                className="relative z-10 mt-[105px]"
              >
                <p className="mb-1 text-[7px] font-semibold uppercase tracking-[0.12em] text-[#d5f4f0] sm:text-[8px]">
                  CRITICAL MINERALS — FROM LI-ION BATTERY BLACK MASS
                </p>

                {/* TITLE */}
                <h2 className="max-w-[285px] text-[27px] font-bold leading-[0.95] tracking-[-0.045em] text-white sm:text-[29px] md:text-[30px] lg:text-[27px]">
                  Battery-Grade
                  <br />
                  Critical Minerals
                </h2>

                {/* DESCRIPTION */}
                <p className="mt-2 max-w-[295px] text-[10px] font-medium leading-[1.28] text-[#d3e9e7] sm:text-[10.5px]">
                  Recovered from spent lithium-ion batteries across
                  NMC, NCA, LFP and LCO chemistries — refined to
                  battery-grade specifications for cathode
                  manufacturing and industrial applications.
                </p>

                {/* MINERAL LIST */}
                <motion.div
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.09,
                        delayChildren: 0.2,
                      },
                    },
                  }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.2 }}
                  className="mt-2.5 max-w-[300px]"
                >
                  <MineralRow
                    symbol="Li"
                    name="Lithium Carbonate"
                    variants={mineralReveal}
                  />
                  <MineralRow
                    symbol="Co"
                    name="Cobalt Sulphate"
                    variants={mineralReveal}
                  />
                  <MineralRow
                    symbol="Ni"
                    name="Nickel Sulphate"
                    variants={mineralReveal}
                  />
                  <MineralRow
                    symbol="Mn"
                    name="Manganese Carbonate"
                    variants={mineralReveal}
                  />
                  <MineralRow
                    symbol="C"
                    name="Graphite"
                    variants={mineralReveal}
                    last
                  />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* ================================================= */}
          {/* RIGHT CARD - RARE EARTH */}
          {/* ================================================= */}
          <motion.div
            variants={rightCardReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            transition={{ delay: 0.16 }}
            className="group relative min-h-[445px] overflow-hidden rounded-[20px] bg-[#f8f8f4] sm:min-h-[460px] lg:h-[445px]"
          >
            {/* RIGHT IMAGE */}
            <div className="absolute inset-y-0 right-0 w-[34%] overflow-hidden">
              <img
                src="images/recoveringimg2.png"
                alt=""
                className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Image fade */}
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#f8f8f4]/70" />
            </div>

            {/* CONTENT */}
            <div className="relative z-10 h-full px-5 py-6 sm:px-7 sm:py-7 md:px-8 lg:px-6 xl:px-7">
              {/* NUMBER */}
              <motion.div
                variants={numberReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: 0.2 }}
                className="absolute top-[-2px] select-none text-[108px] font-bold leading-none tracking-[-0.08em] text-[#b9dedd]/70 sm:text-[115px] lg:text-[105px]"
              >
                0 2
              </motion.div>

              {/* CONTENT AREA */}
              <motion.div
                variants={contentReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.25 }}
                transition={{ delay: 0.25 }}
                className="relative z-10 mr-[30%] pt-[105px]"
              >
                {/* SMALL LABEL */}
                <p className="mb-1 text-[7px] font-semibold uppercase tracking-[0.11em] text-[#159b95] sm:text-[8px]">
                  RARE EARTH ELEMENTS — FROM END-OF-LIFE NDFEB MAGNETS
                </p>

                {/* TITLE */}
                <h2 className="max-w-[315px] text-[27px] font-bold leading-[0.95] tracking-[-0.045em] text-[#080d0d] sm:text-[29px] md:text-[30px] lg:text-[27px]">
                  High-Purity Rare
                  <br />
                  Earth Oxides &amp; Metals
                </h2>

                {/* DESCRIPTION */}
                <p className="mt-2 max-w-[300px] text-[10px] font-medium leading-[1.28] text-[#3d4748] sm:text-[10.5px]">
                  Recovered from NdFeB permanent magnets in end-of-life
                  EV motors, hard disk drives, wind turbines and consumer
                  electronics — refined to precise specifications for alloy
                  and magnet manufacturing.
                </p>

                {/* ELEMENT LIST */}
                <motion.div
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.09,
                        delayChildren: 0.2,
                      },
                    },
                  }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.2 }}
                  className="mt-2.5 max-w-[300px]"
                >
                  <MineralRow
                    symbol="Nd"
                    name="Neodymium"
                    light
                    variants={mineralReveal}
                  />
                  <MineralRow
                    symbol="Pr"
                    name="Praseodymium"
                    light
                    variants={mineralReveal}
                  />
                  <MineralRow
                    symbol="Dy"
                    name="Dysprosium"
                    light
                    variants={mineralReveal}
                  />
                  <MineralRow
                    symbol="Tb"
                    name="Terbium"
                    light
                    variants={mineralReveal}
                  />
                  <MineralRow
                    symbol="Sm"
                    name="Samarium"
                    light
                    variants={mineralReveal}
                    last
                  />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   MINERAL ROW
========================================================= */

function MineralRow({
  symbol,
  name,
  last = false,
  light = false,
  variants,
}) {
  return (
    <motion.div
      variants={variants}
      className={`group/row flex items-center border-b ${
        light ? "border-[#a8d9d6]" : "border-[#54a9a5]"
      } py-[4px] transition-all duration-300 hover:translate-x-1 ${
        last ? "border-b-0" : ""
      }`}
    >
      {/* SYMBOL */}
      <span
        className={`w-[38px] text-[24px] font-semibold leading-none tracking-[-0.04em] ${
          light ? "text-[#050909]" : "text-white"
        }`}
      >
        {symbol}
      </span>

      {/* DASH */}
      <span
        className={`mr-3 text-[15px] ${
          light ? "text-[#343b3c]" : "text-[#c7e6e4]"
        }`}
      >
        —
      </span>

      {/* NAME */}
      <span
        className={`text-[10px] font-medium ${
          light ? "text-[#171e1f]" : "text-[#e4f3f1]"
        }`}
      >
        {name}
      </span>
    </motion.div>
  );
}