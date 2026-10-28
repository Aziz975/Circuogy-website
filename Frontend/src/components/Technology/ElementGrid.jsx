import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/* =========================================================
   MATERIAL DATA
========================================================= */

const targetElements = {
  Li: {
    symbol: "Li",
    name: "Lithium",
    atomicNumber: "03",
    category: "CRITICAL MINERAL",
    recoveredAs: "Lithium Carbonate",
    source: "FROM LI-ION BATTERY BLACK MASS",
    stream: "Critical Minerals",
    color: "critical",
    image: "images/lithium1.png",
  },
  C: {
    symbol: "C",
    name: "Carbon",
    atomicNumber: "06",
    category: "CRITICAL MATERIAL",
    recoveredAs: "Carbon Material",
    source: "FROM LI-ION BATTERY BLACK MASS",
    stream: "Critical Minerals",
    color: "critical",
    image: "images/graphite1.png",
  },
  Mn: {
    symbol: "Mn",
    name: "Manganese",
    atomicNumber: "25",
    category: "CRITICAL MINERAL",
    recoveredAs: "Manganese Compound",
    source: "FROM LI-ION BATTERY BLACK MASS",
    stream: "Critical Minerals",
    color: "critical",
    image: "/images/mn1.png",
  },
  Co: {
    symbol: "Co",
    name: "Cobalt",
    atomicNumber: "27",
    category: "CRITICAL MINERAL",
    recoveredAs: "Cobalt Compound",
    source: "FROM LI-ION BATTERY BLACK MASS",
    stream: "Critical Minerals",
    color: "critical",
    image: "/images/cobalt1.png",
  },
  Ni: {
    symbol: "Ni",
    name: "Nickel",
    atomicNumber: "28",
    category: "CRITICAL MINERAL",
    recoveredAs: "Nickel Compound",
    source: "FROM LI-ION BATTERY BLACK MASS",
    stream: "Critical Minerals",
    color: "critical",
    image: "/images/nickel1.png",
  },
  Pr: {
    symbol: "Pr",
    name: "Praseodymium",
    atomicNumber: "59",
    category: "RARE EARTH ELEMENT",
    recoveredAs: "Praseodymium Oxide",
    source: "FROM NdFeB MAGNETS",
    stream: "Rare Earth Elements",
    color: "rare",
    image: "/images/pd1.png",
  },
  Nd: {
    symbol: "Nd",
    name: "Neodymium",
    atomicNumber: "60",
    category: "RARE EARTH ELEMENT",
    recoveredAs: "Neodymium Oxide",
    source: "FROM NdFeB MAGNETS",
    stream: "Rare Earth Elements",
    color: "rare",
    image: "/images/nd1.png",
  },
  Sm: {
    symbol: "Sm",
    name: "Samarium",
    atomicNumber: "62",
    category: "RARE EARTH ELEMENT",
    recoveredAs: "Samarium Oxide",
    source: "FROM NdFeB MAGNETS",
    stream: "Rare Earth Elements",
    color: "rare",
    image: "/images/sm1.png",
  },
  Tb: {
    symbol: "Tb",
    name: "Terbium",
    atomicNumber: "65",
    category: "RARE EARTH ELEMENT",
    recoveredAs: "Terbium Oxide",
    source: "FROM NdFeB MAGNETS",
    stream: "Rare Earth Elements",
    color: "rare",
    image: "images/tb1.png",
  },
  Dy: {
    symbol: "Dy",
    name: "Dysprosium",
    atomicNumber: "66",
    category: "RARE EARTH ELEMENT",
    recoveredAs: "Dysprosium Oxide",
    source: "FROM NdFeB MAGNETS",
    stream: "Rare Earth Elements",
    color: "rare",
    image: "images/dy1.png",
  },
};

/* =========================================================
   PERIODIC TABLE DATA
========================================================= */

const elements = [
  { symbol: "H", name: "Hydrogen", number: 1, row: 1, col: 1 },
  { symbol: "He", name: "Helium", number: 2, row: 1, col: 18 },

  { symbol: "Li", name: "Lithium", number: 3, row: 2, col: 1 },
  { symbol: "Be", name: "Beryllium", number: 4, row: 2, col: 2 },
  { symbol: "B", name: "Boron", number: 5, row: 2, col: 13 },
  { symbol: "C", name: "Carbon", number: 6, row: 2, col: 14 },
  { symbol: "N", name: "Nitrogen", number: 7, row: 2, col: 15 },
  { symbol: "O", name: "Oxygen", number: 8, row: 2, col: 16 },
  { symbol: "F", name: "Fluorine", number: 9, row: 2, col: 17 },
  { symbol: "Ne", name: "Neon", number: 10, row: 2, col: 18 },

  { symbol: "Na", name: "Sodium", number: 11, row: 3, col: 1 },
  { symbol: "Mg", name: "Magnesium", number: 12, row: 3, col: 2 },
  { symbol: "Al", name: "Aluminium", number: 13, row: 3, col: 13 },
  { symbol: "Si", name: "Silicon", number: 14, row: 3, col: 14 },
  { symbol: "P", name: "Phosphorus", number: 15, row: 3, col: 15 },
  { symbol: "S", name: "Sulfur", number: 16, row: 3, col: 16 },
  { symbol: "Ar", name: "Argon", number: 18, row: 3, col: 18 },

  { symbol: "K", name: "Potassium", number: 19, row: 4, col: 1 },
  { symbol: "Ca", name: "Calcium", number: 20, row: 4, col: 2 },
  { symbol: "Sc", name: "Scandium", number: 21, row: 4, col: 3 },
  { symbol: "Ti", name: "Titanium", number: 22, row: 4, col: 4 },
  { symbol: "V", name: "Vanadium", number: 23, row: 4, col: 5 },
  { symbol: "Cr", name: "Chromium", number: 24, row: 4, col: 6 },
  { symbol: "Mn", name: "Manganese", number: 25, row: 4, col: 7 },
  { symbol: "Fe", name: "Iron", number: 26, row: 4, col: 8 },
  { symbol: "Co", name: "Cobalt", number: 27, row: 4, col: 9 },
  { symbol: "Ni", name: "Nickel", number: 28, row: 4, col: 10 },
  { symbol: "Cu", name: "Copper", number: 29, row: 4, col: 11 },
  { symbol: "Zn", name: "Zinc", number: 30, row: 4, col: 12 },
  { symbol: "Ga", name: "Gallium", number: 31, row: 4, col: 13 },
  { symbol: "Ge", name: "Germanium", number: 32, row: 4, col: 14 },
  { symbol: "As", name: "Arsenic", number: 33, row: 4, col: 15 },
  { symbol: "Se", name: "Selenium", number: 34, row: 4, col: 16 },
  { symbol: "Br", name: "Bromine", number: 35, row: 4, col: 17 },
  { symbol: "Kr", name: "Krypton", number: 36, row: 4, col: 18 },

  { symbol: "Rb", name: "Rubidium", number: 37, row: 5, col: 1 },
  { symbol: "Sr", name: "Strontium", number: 38, row: 5, col: 2 },
  { symbol: "Y", name: "Yttrium", number: 39, row: 5, col: 3 },
  { symbol: "Zr", name: "Zirconium", number: 40, row: 5, col: 4 },
  { symbol: "Nb", name: "Niobium", number: 41, row: 5, col: 5 },
  { symbol: "Mo", name: "Molybdenum", number: 42, row: 5, col: 6 },
  { symbol: "Tc", name: "Technetium", number: 43, row: 5, col: 7 },
  { symbol: "Ru", name: "Ruthenium", number: 44, row: 5, col: 8 },
  { symbol: "Rh", name: "Rhodium", number: 45, row: 5, col: 9 },
  { symbol: "Pd", name: "Palladium", number: 46, row: 5, col: 10 },
  { symbol: "Ag", name: "Silver", number: 47, row: 5, col: 11 },
  { symbol: "Cd", name: "Cadmium", number: 48, row: 5, col: 12 },
  { symbol: "In", name: "Indium", number: 49, row: 5, col: 13 },
  { symbol: "Sn", name: "Tin", number: 50, row: 5, col: 14 },
  { symbol: "Sb", name: "Antimony", number: 51, row: 5, col: 15 },
  { symbol: "Te", name: "Tellurium", number: 52, row: 5, col: 16 },
  { symbol: "I", name: "Iodine", number: 53, row: 5, col: 17 },
  { symbol: "Xe", name: "Xenon", number: 54, row: 5, col: 18 },

  { symbol: "Cs", name: "Cesium", number: 55, row: 6, col: 1 },
  { symbol: "Ba", name: "Barium", number: 56, row: 6, col: 2 },
  { symbol: "La", name: "Lanthanum", number: 57, row: 6, col: 4 },
  { symbol: "Hf", name: "Hafnium", number: 72, row: 6, col: 5 },
  { symbol: "Ta", name: "Tantalum", number: 73, row: 6, col: 6 },
  { symbol: "W", name: "Tungsten", number: 74, row: 6, col: 7 },
  { symbol: "Re", name: "Rhenium", number: 75, row: 6, col: 8 },
  { symbol: "Os", name: "Osmium", number: 76, row: 6, col: 9 },
  { symbol: "Ir", name: "Iridium", number: 77, row: 6, col: 10 },
  { symbol: "Pt", name: "Platinum", number: 78, row: 6, col: 11 },
  { symbol: "Au", name: "Gold", number: 79, row: 6, col: 12 },
  { symbol: "Hg", name: "Mercury", number: 80, row: 6, col: 13 },
  { symbol: "Tl", name: "Thallium", number: 81, row: 6, col: 14 },
  { symbol: "Pb", name: "Lead", number: 82, row: 6, col: 15 },
  { symbol: "Bi", name: "Bismuth", number: 83, row: 6, col: 16 },
  { symbol: "Po", name: "Polonium", number: 84, row: 6, col: 17 },
  { symbol: "At", name: "Astatine", number: 85, row: 6, col: 18 },

  { symbol: "Fr", name: "Francium", number: 87, row: 7, col: 1 },
  { symbol: "Ra", name: "Radium", number: 88, row: 7, col: 2 },
  { symbol: "Ac", name: "Actinium", number: 89, row: 7, col: 4 },
  { symbol: "Rf", name: "Rutherfordium", number: 104, row: 7, col: 5 },
  { symbol: "Db", name: "Dubnium", number: 105, row: 7, col: 6 },
  { symbol: "Sg", name: "Seaborgium", number: 106, row: 7, col: 7 },
  { symbol: "Bh", name: "Bohrium", number: 107, row: 7, col: 8 },
  { symbol: "Hs", name: "Hassium", number: 108, row: 7, col: 9 },
  { symbol: "Mt", name: "Meitnerium", number: 109, row: 7, col: 10 },
  { symbol: "Ds", name: "Darmstadtium", number: 110, row: 7, col: 11 },
  { symbol: "Rg", name: "Roentgenium", number: 111, row: 7, col: 12 },
  { symbol: "Cn", name: "Copernicium", number: 112, row: 7, col: 13 },
  { symbol: "Nh", name: "Nihonium", number: 113, row: 7, col: 14 },
  { symbol: "Fl", name: "Flerovium", number: 114, row: 7, col: 15 },
  { symbol: "Mc", name: "Moscovium", number: 115, row: 7, col: 16 },
  { symbol: "Lv", name: "Livermorium", number: 116, row: 7, col: 17 },
  { symbol: "Ts", name: "Tennessine", number: 117, row: 7, col: 18 },
  { symbol: "Og", name: "Oganesson", number: 118, row: 7, col: 18 },
];

const lanthanides = [
  ["La", 57],
  ["Ce", 58],
  ["Pr", 59],
  ["Nd", 60],
  ["Pm", 61],
  ["Sm", 62],
  ["Eu", 63],
  ["Gd", 64],
  ["Tb", 65],
  ["Dy", 66],
  ["Ho", 67],
  ["Er", 68],
  ["Tm", 69],
  ["Yb", 70],
  ["Lu", 71],
];

const actinides = [
  ["Ac", 89],
  ["Th", 90],
  ["Pa", 91],
  ["U", 92],
  ["Np", 93],
  ["Pu", 94],
  ["Am", 95],
  ["Cm", 96],
  ["Bk", 97],
  ["Cf", 98],
  ["Es", 99],
  ["Fm", 100],
  ["Md", 101],
  ["No", 102],
  ["Lr", 103],
];

/* =========================================================
   ANIMATION VARIANTS
========================================================= */

const revealUp = {
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

const headingReveal = {
  hidden: {
    opacity: 0,
    y: 35,
    filter: "blur(7px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const featuredCardReveal = {
  hidden: {
    opacity: 0,
    x: -25,
    y: 20,
    scale: 0.985,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const tableReveal = {
  hidden: {
    opacity: 0,
    x: 25,
    y: 18,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const tileContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.008,
      delayChildren: 0.1,
    },
  },
};

const tileReveal = {
  hidden: {
    opacity: 0,
    y: 8,
    scale: 0.92,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const materialContent = {
  initial: {
    opacity: 0,
    y: 12,
    filter: "blur(4px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    filter: "blur(3px)",
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function ElementGrid() {
  const [selected, setSelected] = useState(targetElements.Li);

  const selectElement = (symbol) => {
    const target = targetElements[symbol];

    if (target) {
      setSelected(target);
    }
  };

  return (
    <section className="w-full overflow-hidden bg-[#f4f6f0] px-1 py-12 sm:px-8 sm:py-16 md:px-10 lg:px-5 xl:px-8">
      <div className="mx-auto max-w-[1550px]">
        {/* ================= TOP HEADING ================= */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="mb-8 max-w-[1000px] md:mb-10 lg:mb-12"
        >
          <motion.div variants={revealUp} className="mb-5 flex items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#23776d] sm:text-[11px]">
              What We Recover
            </span>
          </motion.div>

          <motion.h1
            variants={headingReveal}
            className="text-[40px] font-light leading-[0.98] tracking-[-0.055em] text-[#101615] sm:text-[50px] md:text-[58px] lg:text-[64px] xl:text-[68px]"
          >
            The{" "}
            <span className="font-semibold text-[#08766d]">
              rare earth elements
            </span>{" "}
            and{" "}
            <span className="font-semibold text-[#19a894]">
              critical materials
            </span>{" "}
            we collect and process
          </motion.h1>

          <motion.p
            variants={revealUp}
            className="mt-4 max-w-[850px] text-[12px] leading-relaxed text-[#7b817e] sm:text-[13px]"
          >
            Ten strategic materials recovered from two feedstocks through one
            integrated hydromet platform.
          </motion.p>
        </motion.div>

        {/* ================= MAIN CONTENT ================= */}
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[575px_minmax(0,1fr)] xl:gap-6">
          {/* ================= LEFT MATERIAL CARD ================= */}
          <motion.div
            variants={featuredCardReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            className="relative h-[600px] overflow-hidden rounded-[28px] bg-[#101312] sm:h-[680px] md:h-[720px] xl:h-[590px]"
          >
            {/* Background grid */}
            <div className="pointer-events-none absolute inset-0 opacity-20">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(40,150,135,.22) 1px, transparent 1px), linear-gradient(90deg, rgba(40,150,135,.22) 1px, transparent 1px)",
                  backgroundSize: "56px 56px",
                }}
              />
            </div>

            {/* Top label */}
            <motion.div
              variants={revealUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              className="absolute left-8 top-7 z-10 sm:left-10 sm:top-9"
            >
              <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[white]">
                Featured Material
              </p>
            </motion.div>

            {/* Selected Material Image */}
            <div className="absolute left-1/2 top-[25px] flex h-[310px] w-[80%] -translate-x-1/2 items-center justify-center sm:top-[45px] sm:h-[370px] md:h-[400px] xl:top-[-20px] xl:h-[390px]">
              <AnimatePresence mode="wait">
                {selected.image ? (
                  <motion.img
                    key={selected.symbol}
                    src={selected.image}
                    alt={selected.name}
                    initial={{ opacity: 0, scale: 0.93, y: 12, filter: "blur(5px)" }}
                    animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.02, filter: "blur(3px)" }}
                    transition={{
                      duration: 0.55,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <motion.div
                    key={selected.symbol}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="text-center">
                      <div className="mx-auto mb-3 h-24 w-24 rounded-full border border-[#277a70]/40" />
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#4c8981]">
                        Image Placeholder
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom details */}
            <div className="absolute bottom-7 left-8 right-8 sm:bottom-9 sm:left-10 sm:right-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected.symbol}
                  variants={materialContent}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <h2 className="text-[42px] font-medium leading-none tracking-[-0.04em] text-white sm:text-[52px]">
                    {selected.name}
                  </h2>

                  <div className="mt-4 inline-flex rounded-full border border-[white] bg-[black] px-3 py-1.5">
                    <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[white]">
                      {selected.category}
                    </span>
                  </div>

                  <div className="mt-7 grid grid-cols-[100px_1fr] border-t border-[white] pt-5">
                    <div className="border-r border-[white]">
                      <p className="text-[8px] font-medium uppercase tracking-[0.18em] text-[white]">
                        Atomic Number
                      </p>

                      <p className="mt-2 text-[28px] font-medium leading-none text-white">
                        {selected.atomicNumber}
                      </p>
                    </div>

                    <div className="pl-6">
                      <p className="text-[8px] font-medium uppercase tracking-[0.18em] text-[white]">
                        Recovered As
                      </p>

                      <p className="mt-2 text-[15px] font-medium text-white sm:text-[17px]">
                        {selected.recoveredAs}
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 text-[8px] font-semibold uppercase tracking-[0.2em] text-[white]">
                    {selected.source}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ================= RIGHT PERIODIC TABLE ================= */}
          <motion.div
            variants={tableReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            className="min-w-0"
          >
            {/* Table heading */}
            <motion.div
              variants={revealUp}
              className="mb-5 flex items-center justify-between gap-5"
            >
              <h2 className="text-[14px] font-bold uppercase tracking-[0.12em] text-[#252b29] sm:text-[16px]">
                Periodic Table · 118 Elements
              </h2>

              <p className="hidden text-[9px] font-bold text-[#888e8a] md:block">
                Target materials are highlighted by output stream
              </p>
            </motion.div>

            {/* Horizontal scroll wrapper */}
            <div className="overflow-x-auto pb-4">
              <div className="min-w-[700px]">
                {/* Group numbers */}
                <div className="mb-2 grid grid-cols-18 gap-[4px] px-1">
                  {Array.from({ length: 18 }, (_, i) => (
                    <span
                      key={i}
                      className="text-center text-[7px] text-[#8b918d]"
                    >
                      {i + 1}
                    </span>
                  ))}
                </div>

                {/* Periodic table */}
                <motion.div
                  variants={tileContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.05 }}
                  className="ml-[5px] grid grid-cols-18 gap-[4px]"
                >
                  {elements.map((element) => {
                    const target = targetElements[element.symbol];
                    const isSelected = selected.symbol === element.symbol;

                    return (
                      <motion.button
                        key={`${element.symbol}-${element.number}`}
                        variants={tileReveal}
                        type="button"
                        disabled={!target}
                        aria-label={
                          target
                            ? `Select ${element.name}`
                            : `${element.name}, not a target material`
                        }
                        aria-pressed={target ? isSelected : undefined}
                        onClick={() => selectElement(element.symbol)}
                        whileHover={
                          target
                            ? { y: -3, scale: 1.035 }
                            : undefined
                        }
                        whileTap={target ? { scale: 0.96 } : undefined}
                        transition={{
                          duration: 0.2,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        style={{
                          gridColumn: element.col,
                          gridRow: element.row,
                        }}
                        className={`
                          relative flex h-[51px] min-w-0 flex-col justify-between rounded-[7px] border p-[5px] text-left
                          ${
                            target
                              ? target.color === "rare"
                                ? "cursor-pointer border-[#074d47] bg-[#063d38] text-white hover:bg-[#07584f]"
                                : "cursor-pointer border-[#159b8b] bg-[#16a997] text-white hover:bg-[#0e9687]"
                              : "cursor-default border-[#dfe2dc] bg-[#f8f9f5] text-[#59605c]"
                          }
                          ${
                            isSelected
                              ? "z-10 ring-2 ring-[#19cdb5] ring-offset-2 ring-offset-[#f4f6f0]"
                              : ""
                          }
                        `}
                      >
                        <span className="text-[6px] opacity-70">
                          {element.number}
                        </span>

                        <span className="text-[16px] font-semibold leading-none">
                          {element.symbol}
                        </span>

                        <span className="truncate text-[5px] opacity-70">
                          {element.name}
                        </span>
                      </motion.button>
                    );
                  })}
                </motion.div>

                {/* ================= LANTHANIDE / ACTINIDE ================= */}
                <motion.div
                  variants={revealUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.1 }}
                  className="mt-6 grid grid-cols-[70px_1fr] gap-3"
                >
                  <div className="flex flex-col justify-center gap-5">
                    <div>
                      <p className="text-[10px] font-medium text-[#277d73]">
                        Ln
                      </p>
                      <p className="text-[6px] uppercase tracking-[0.15em] text-[#777d79]">
                        Lanthanides
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] font-medium text-[#277d73]">
                        An
                      </p>
                      <p className="text-[6px] uppercase tracking-[0.15em] text-[#777d79]">
                        Actinides
                      </p>
                    </div>
                  </div>

                  <div>
                    {/* Lanthanides */}
                    <motion.div
                      variants={tileContainer}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: false, amount: 0.1 }}
                      className="grid grid-cols-15 gap-[4px]"
                    >
                      {lanthanides.map(([symbol, number]) => (
                        <PeriodicTile
                          key={symbol}
                          symbol={symbol}
                          number={number}
                          selected={selected}
                          onSelect={selectElement}
                        />
                      ))}
                    </motion.div>

                    {/* Actinides */}
                    <motion.div
                      variants={tileContainer}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: false, amount: 0.1 }}
                      className="mt-[4px] grid grid-cols-15 gap-[4px]"
                    >
                      {actinides.map(([symbol, number]) => (
                        <motion.div
                          key={symbol}
                          variants={tileReveal}
                          className="h-[51px] rounded-[7px] border border-[#dfe2dc] bg-[#f8f9f5] p-[5px] text-left text-[#59605c]"
                        >
                          <span className="block text-[6px] opacity-70">
                            {number}
                          </span>

                          <span className="block text-[15px] font-semibold">
                            {symbol}
                          </span>

                          <span className="block truncate text-[5px] opacity-70">
                            {symbol}
                          </span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* ================= LEGEND ================= */}
            <motion.div
              variants={revealUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              className="mt-4 flex flex-wrap items-center justify-between gap-5 border-t border-[#dfe2dc] pt-5"
            >
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-[3px] bg-[#16a997]" />
                  <span className="text-[9px] font-medium text-[#6c746f]">
                    Critical minerals
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-[3px] bg-[#202124]" />
                  <span className="text-[9px] font-medium text-[#6c746f]">
                    Rare earth elements
                  </span>
                </div>
              </div>

              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[black]">
                10 Target Elements · 2 Output Streams
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   LANTHANIDE / TARGET ELEMENT TILE
========================================================= */

function PeriodicTile({ symbol, number, selected, onSelect }) {
  const target = targetElements[symbol];
  const isSelected = selected.symbol === symbol;

  return (
    <motion.button
      type="button"
      variants={tileReveal}
      disabled={!target}
      aria-label={
        target
          ? `Select ${target.name}`
          : `${symbol}, not a target material`
      }
      aria-pressed={target ? isSelected : undefined}
      onClick={() => onSelect(symbol)}
      whileHover={target ? { y: -3, scale: 1.035 } : undefined}
      whileTap={target ? { scale: 0.96 } : undefined}
      className={`
        h-[51px] rounded-[7px] border p-[5px] text-left
        ${
          target
            ? "cursor-pointer border-[#202124] bg-[#101312] text-white hover:bg-[#202124]"
            : "cursor-default border-[#dfe2dc] bg-[#f8f9f5] text-[#59605c]"
        }
        ${
          isSelected
            ? "relative z-10 ring-2 ring-[black] ring-offset-2 ring-offset-[#f4f6f0]"
            : ""
        }
      `}
    >
      <span className="block text-[6px] opacity-70">{number}</span>

      <span className="block text-[15px] font-semibold">{symbol}</span>

      <span className="block truncate text-[5px] opacity-70">
        {target ? target.name : symbol}
      </span>
    </motion.button>
  );
}