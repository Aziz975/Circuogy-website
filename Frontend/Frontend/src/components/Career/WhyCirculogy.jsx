import React, { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "motion/react";

const WhyCirculogy = () => {
    const [active, setActive] = useState(0);
    const [hovered, setHovered] = useState(null);

    const sectionRef = useRef(null);

    const isInView = useInView(sectionRef, {
        amount: 0.15,
        once: false,
    });

    const reasons = [
        {
            number: "01",
            title: "PURPOSE",
            description:
                "Work on challenges that directly contribute to a more sustainable future.",
        },
        {
            number: "02",
            title: "IMPACT",
            description:
                "Your work helps connect businesses, people and technology across the circular economy.",
        },
        {
            number: "03",
            title: "INNOVATION",
            description:
                "Build practical solutions at the intersection of sustainability, technology and business.",
        },
        {
            number: "04",
            title: "GROWTH",
            description:
                "Grow alongside a team shaping a rapidly evolving circular economy ecosystem.",
        },
    ];

    /*
    ============================================================
    LETTER REVEAL
    ============================================================
    */

    const renderLetters = (
        text,
        className = "",
        startDelay = 0
    ) => {
        return (
            <span className={`block ${className}`}>
                {text.split("").map((letter, index) => (
                    <motion.span
                        key={`${text}-${index}`}
                        className="inline-block"
                        initial={{
                            y: "115%",
                            opacity: 0,
                            filter: "blur(7px)",
                            rotate: 7,
                        }}
                        animate={
                            isInView
                                ? {
                                      y: "0%",
                                      opacity: 1,
                                      filter: "blur(0px)",
                                      rotate: 0,
                                  }
                                : {
                                      y: "115%",
                                      opacity: 0,
                                      filter: "blur(7px)",
                                      rotate: 7,
                                  }
                        }
                        transition={{
                            duration: 0.7,
                            delay:
                                (startDelay + index * 35) /
                                1000,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    >
                        {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                ))}
            </span>
        );
    };

    return (
        <section
            ref={sectionRef}
            className="relative w-full overflow-hidden bg-[#f5faf8] px-5 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 lg:px-[4.7%] lg:py-10 xl:px-[1.7%] xl:py-12"
        >
            {/* =====================================================
                BACKGROUND GLOW
            ===================================================== */}

            <motion.div
                className="pointer-events-none absolute -left-[180px] top-[20%] h-[380px] w-[380px] rounded-full bg-[#58c5b4]/10 blur-[100px]"
                animate={
                    isInView
                        ? {
                              x: [0, 35, 0],
                              y: [0, -20, 0],
                              opacity: [0.25, 0.5, 0.25],
                          }
                        : {
                              opacity: 0,
                          }
                }
                transition={{
                    duration: 7,
                    repeat: isInView ? Infinity : 0,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="pointer-events-none absolute -right-[180px] bottom-[5%] h-[400px] w-[400px] rounded-full bg-[#299f8f]/10 blur-[110px]"
                animate={
                    isInView
                        ? {
                              x: [0, -30, 0],
                              y: [0, 20, 0],
                              opacity: [0.2, 0.45, 0.2],
                          }
                        : {
                              opacity: 0,
                          }
                }
                transition={{
                    duration: 8,
                    repeat: isInView ? Infinity : 0,
                    ease: "easeInOut",
                    delay: 1,
                }}
            />

            {/* =====================================================
                MAIN CONTAINER
            ===================================================== */}

            <motion.div
                className="relative mx-auto grid w-full max-w-[1350px] grid-cols-1 gap-8 sm:gap-10 md:gap-12 lg:min-h-[560px] lg:grid-cols-[39%_61%] lg:gap-[1%] xl:min-h-[600px]"
                initial={{
                    opacity: 0,
                    y: 35,
                    filter: "blur(5px)",
                }}
                animate={
                    isInView
                        ? {
                              opacity: 1,
                              y: 0,
                              filter: "blur(0px)",
                          }
                        : {
                              opacity: 0,
                              y: 35,
                              filter: "blur(5px)",
                          }
                }
                transition={{
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                }}
            >
                {/* =================================================
                    LEFT SIDE
                ================================================= */}

                <div className="flex flex-col">

                    {/* MAIN HEADING */}

                    <h2 className="max-w-[500px] overflow-hidden text-[46px] font-bold leading-[0.98] tracking-[-0.045em] text-[#071514] sm:text-[52px] md:text-[58px] lg:text-[54px] xl:text-[58px]">
                        {renderLetters(
                            "Build a Career",
                            "",
                            100
                        )}

                        {renderLetters(
                            "That Moves the",
                            "",
                            300
                        )}

                        {renderLetters(
                            "World Forward.",
                            "text-[#299f8f]",
                            500
                        )}
                    </h2>

                    {/* DESCRIPTION */}

                    <motion.p
                        className="mt-10 max-w-[480px] text-[15px] font-normal leading-[1.55] tracking-[0.005em] text-[#71807d] sm:mt-12 sm:text-[16px] md:text-[17px]"
                        initial={{
                            opacity: 0,
                            y: 25,
                            filter: "blur(5px)",
                        }}
                        animate={
                            isInView
                                ? {
                                      opacity: 1,
                                      y: 0,
                                      filter: "blur(0px)",
                                  }
                                : {
                                      opacity: 0,
                                      y: 25,
                                      filter: "blur(5px)",
                                  }
                        }
                        transition={{
                            duration: 0.8,
                            delay: 0.85,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    >
                        At Circulogy, we’re building a new-age,
                        tech-enabled ecosystem for India’s circular
                        economy. We connect brands, recyclers,
                        refurbishers and other stakeholders to create a
                        more transparent, trusted and sustainable
                        future.
                    </motion.p>

                    {/* =================================================
                        IMAGE
                    ================================================= */}

                    <motion.div
                        className="group relative mt-10 h-[280px] w-full max-w-[470px] overflow-hidden rounded-[38px] bg-[#e3f3ef] sm:mt-12 sm:h-[310px] md:h-[330px] lg:mt-9 lg:h-[250px] xl:h-[260px]"
                        initial={{
                            opacity: 0,
                            y: 45,
                            scale: 0.94,
                            filter: "blur(8px)",
                        }}
                        animate={
                            isInView
                                ? {
                                      opacity: 1,
                                      y: 0,
                                      scale: 1,
                                      filter: "blur(0px)",
                                  }
                                : {
                                      opacity: 0,
                                      y: 45,
                                      scale: 0.94,
                                      filter: "blur(8px)",
                                  }
                        }
                        transition={{
                            duration: 1,
                            delay: 1,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        whileHover={{
                            y: -6,
                            scale: 1.015,
                            boxShadow:
                                "0 25px 55px rgba(32,126,113,0.20)",
                        }}
                    >
                        <motion.img
                            src="/images/whycirculogyimage.png"
                            alt=""
                            className="absolute inset-0 h-full w-full object-contain"
                            whileHover={{
                                scale: 1.07,
                            }}
                            transition={{
                                duration: 0.8,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        />

                        {/* Image teal glow */}

                        <motion.div
                            className="pointer-events-none absolute inset-0 rounded-[38px]"
                            initial={{
                                backgroundColor:
                                    "rgba(41,159,143,0)",
                            }}
                            whileHover={{
                                backgroundColor:
                                    "rgba(41,159,143,0.10)",
                            }}
                            transition={{
                                duration: 0.5,
                            }}
                        />

                        {/* Image border */}

                        <div className="pointer-events-none absolute inset-0 rounded-[38px] border border-white/70 transition-all duration-500 group-hover:border-[#73cbbf]/80" />
                    </motion.div>
                </div>

                {/* =================================================
                    RIGHT SIDE
                ================================================= */}

                <motion.div
                    className="flex w-full flex-col"
                    initial={{
                        opacity: 0,
                        x: 35,
                    }}
                    animate={
                        isInView
                            ? {
                                  opacity: 1,
                                  x: 0,
                              }
                            : {
                                  opacity: 0,
                                  x: 35,
                              }
                    }
                    transition={{
                        duration: 0.9,
                        delay: 0.25,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    {/* RIGHT TITLE */}

                    <motion.div
                        className="mb-7 pl-0 lg:mb-8"
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        animate={
                            isInView
                                ? {
                                      opacity: 1,
                                      y: 0,
                                  }
                                : {
                                      opacity: 0,
                                      y: 20,
                                  }
                        }
                        transition={{
                            duration: 0.7,
                            delay: 0.55,
                        }}
                    >
                        <span className="text-[22px] font-bold tracking-[-0.025em] text-[#111c1a] sm:text-[24px] md:text-[25px]">
                            WHY CIRCULOGY?
                        </span>
                    </motion.div>

                    {/* =================================================
                        CARDS
                    ================================================= */}

                    <div className="flex w-full flex-col">
                        {reasons.map((reason, index) => {
                            const isActive = active === index;
                            const isHovered = hovered === index;

                            return (
                                <motion.button
                                    key={reason.number}
                                    type="button"
                                    onClick={() =>
                                        setActive(index)
                                    }
                                    onMouseEnter={() =>
                                        setHovered(index)
                                    }
                                    onMouseLeave={() =>
                                        setHovered(null)
                                    }
                                    className={`
                                        group relative flex
                                        min-h-[135px]
                                        w-full
                                        items-center
                                        text-left
                                        sm:min-h-[138px]
                                        lg:min-h-[138px]
                                        ${
                                            isActive
                                                ? "border-b border-[#c9e1dc]"
                                                : "border-b border-[#d8e7e3]"
                                        }
                                    `}
                                    initial={{
                                        opacity: 0,
                                        x: 40,
                                        y: 15,
                                    }}
                                    animate={
                                        isInView
                                            ? {
                                                  opacity: 1,
                                                  x: 0,
                                                  y: 0,
                                              }
                                            : {
                                                  opacity: 0,
                                                  x: 40,
                                                  y: 15,
                                              }
                                    }
                                    transition={{
                                        duration: 0.7,
                                        delay:
                                            0.7 +
                                            index * 0.12,
                                        ease: [
                                            0.22,
                                            1,
                                            0.36,
                                            1,
                                        ],
                                    }}
                                    whileHover={{
                                        x: 4,
                                    }}
                                >
                                    {/* =================================================
                                        HOVER BACKGROUND
                                    ================================================= */}

                                    <motion.div
                                        className="pointer-events-none absolute inset-0 rounded-[22px]"
                                        animate={
                                            isHovered
                                                ? {
                                                      opacity: 1,
                                                      backgroundColor:
                                                          "rgba(226,243,239,1)",
                                                      boxShadow:
                                                          "0 12px 35px rgba(38,120,108,0.10)",
                                                  }
                                                : {
                                                      opacity: 0,
                                                      backgroundColor:
                                                          "rgba(226,243,239,0)",
                                                      boxShadow:
                                                          "0 0px 0px rgba(38,120,108,0)",
                                                  }
                                        }
                                        transition={{
                                            duration: 0.35,
                                            ease: [
                                                0.22,
                                                1,
                                                0.36,
                                                1,
                                            ],
                                        }}
                                    />

                                    {/* =================================================
                                        HOVER GLOW BORDER
                                    ================================================= */}

                                    <motion.div
                                        className="pointer-events-none absolute inset-0 rounded-[22px] border"
                                        animate={
                                            isHovered
                                                ? {
                                                      opacity: 1,
                                                      borderColor:
                                                          "rgba(205,228,223,1)",
                                                  }
                                                : {
                                                      opacity: 0,
                                                      borderColor:
                                                          "rgba(205,228,223,0)",
                                                  }
                                        }
                                        transition={{
                                            duration: 0.3,
                                        }}
                                    />

                                    {/* =================================================
                                        CARD CONTENT
                                    ================================================= */}

                                    <div
                                        className="
                                            relative z-10
                                            grid w-full
                                            grid-cols-[42px_1fr_55px]
                                            items-center
                                            gap-3
                                            px-6
                                            sm:grid-cols-[48px_1fr_60px]
                                            sm:gap-4
                                            sm:px-7
                                        "
                                    >
                                        {/* NUMBER */}

                                        <motion.span
                                            className="self-start text-[11px] font-semibold tracking-[0.08em] sm:text-[19px]"
                                            animate={{
                                                color:
                                                    isHovered ||
                                                    isActive
                                                        ? "#429b8e"
                                                        : "#52a99d",
                                                scale:
                                                    isHovered
                                                        ? 1.08
                                                        : 1,
                                            }}
                                            transition={{
                                                duration: 0.3,
                                            }}
                                        >
                                            {reason.number}
                                        </motion.span>

                                        {/* TEXT */}

                                        <div className="flex flex-col items-start">
                                            <motion.span
                                                className="text-[21px] font-semibold leading-none tracking-[-0.025em] text-[#111c1a] sm:text-[22px] md:text-[23px]"
                                                animate={{
                                                    x:
                                                        isHovered
                                                            ? 5
                                                            : 0,
                                                }}
                                                transition={{
                                                    duration: 0.3,
                                                    ease: [
                                                        0.22,
                                                        1,
                                                        0.36,
                                                        1,
                                                    ],
                                                }}
                                            >
                                                {reason.title}
                                            </motion.span>

                                            <motion.span
                                                className="mt-4 max-w-[500px] text-[13px] font-normal leading-[1.55] text-[#71817d] sm:text-[14px] md:text-[15px]"
                                                animate={{
                                                    x:
                                                        isHovered
                                                            ? 5
                                                            : 0,
                                                }}
                                                transition={{
                                                    duration: 0.3,
                                                }}
                                            >
                                                {reason.description}
                                            </motion.span>
                                        </div>

                                        {/* =================================================
                                            ARROW
                                        ================================================= */}

                                        <motion.span
                                            className="
                                                ml-auto flex
                                                h-[46px] w-[46px]
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-full
                                                border
                                                sm:h-[47px]
                                                sm:w-[47px]
                                            "
                                            animate={{
                                                backgroundColor:
                                                    isActive
                                                        ? "#168d80"
                                                        : "rgba(255,255,255,0)",
                                                borderColor:
                                                    isActive
                                                        ? "#148d80"
                                                        : isHovered
                                                        ? "#74bdb3"
                                                        : "#cbded9",
                                                color:
                                                    isActive
                                                        ? "#ffffff"
                                                        : "#168d80",
                                                scale:
                                                    isHovered
                                                        ? 1.08
                                                        : 1,
                                            }}
                                            whileHover={{
                                                rotate: -5,
                                            }}
                                            transition={{
                                                duration: 0.3,
                                                ease: [
                                                    0.22,
                                                    1,
                                                    0.36,
                                                    1,
                                                ],
                                            }}
                                        >
                                            <ArrowRight
                                                size={21}
                                                strokeWidth={2.5}
                                            />
                                        </motion.span>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default WhyCirculogy;