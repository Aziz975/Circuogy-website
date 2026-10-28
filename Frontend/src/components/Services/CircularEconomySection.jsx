import React, { useRef } from "react";
import {
    motion,
    useReducedMotion,
    useScroll,
    useTransform,
} from "motion/react";

const CircularEconomySection = () => {
    const shouldReduceMotion = useReducedMotion();

    /* =====================================================
       SCROLL BACKGROUND TRANSITION
       White → Dark while entering this section
    ===================================================== */

    const sectionRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "start start"],
    });

    const backgroundColor = useTransform(
        scrollYProgress,
        [0, 0.35, 1],
        ["#ffffff", "#f4f8f5", "#061d19"]
    );

    /* =====================================================
       LETTER REVEAL
    ===================================================== */

    const letterVariants = {
        hidden: {
            opacity: 0,
            y: "100%",
        },
        visible: {
            opacity: 1,
            y: 0,
        },
    };

    return (
        <motion.section
            ref={sectionRef}
            style={{
                backgroundColor,
            }}
            className="w-full px-3 py-4 sm:px-5 sm:py-5 md:px-7 lg:px-10 lg:py-6"
        >
            <motion.div
                className="relative mx-auto flex min-h-[700px] w-full max-w-[1450px] flex-col overflow-hidden rounded-[18px] border border-[#dce9e4] bg-[#eaf7f3] shadow-[0_15px_40px_rgba(0,40,32,0.12)] sm:min-h-[760px] md:min-h-[620px] md:flex-row md:rounded-[20px] lg:min-h-[565px]"
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
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                }}
            >
                {/* =====================================================
                    LEFT DARK PANEL
                ===================================================== */}

                <motion.div
                    className="relative z-10 flex min-h-[500px] w-full flex-col justify-between overflow-hidden rounded-t-[18px] bg-[#061d19] px-5 py-7 sm:min-h-[540px] sm:px-7 sm:py-8 md:min-h-[620px] md:w-[61%] md:rounded-l-[20px] md:rounded-tr-none md:px-8 md:py-9 lg:px-10 lg:py-10 xl:px-11 xl:py-11 2xl:px-12 2xl:py-12"
                    initial={
                        shouldReduceMotion
                            ? { opacity: 1, x: 0 }
                            : { opacity: 0, x: -35 }
                    }
                    whileInView={{
                        opacity: 1,
                        x: 0,
                    }}
                    viewport={{
                        once: false,
                        amount: 0.2,
                    }}
                    transition={{
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    {/* Subtle glow */}
                    <motion.div
                        className="pointer-events-none absolute -right-[130px] top-[20px] h-[280px] w-[280px] rounded-full bg-[#0d5a50]/20 blur-[70px] sm:-right-[140px] sm:top-[10px] sm:h-[340px] sm:w-[340px] sm:blur-[80px] md:-right-[120px] md:h-[380px] md:w-[380px] lg:h-[420px] lg:w-[420px] xl:h-[450px] xl:w-[450px]"
                        initial={{
                            opacity: 0,
                            scale: 0.7,
                        }}
                        whileInView={{
                            opacity: [0, 0.8, 0.45],
                            scale: [0.7, 1.08, 1],
                        }}
                        viewport={{
                            once: false,
                            amount: 0.2,
                        }}
                        transition={{
                            duration: 1.3,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    />

                    {/* =================================================
                        HEADING
                    ================================================= */}

                    <div className="relative z-10 mt-2 w-full max-w-[700px]">
                        <motion.h1
                            initial="hidden"
                            whileInView="visible"
                            viewport={{
                                once: false,
                                amount: 0.6,
                            }}
                            variants={{
                                hidden: {},
                                visible: {
                                    transition: {
                                        staggerChildren: 0.025,
                                    },
                                },
                            }}
                            className="pl-[10px] text-[34px] font-medium leading-[0.96] tracking-[-0.045em] text-white sm:text-[45px] md:text-[52px] lg:text-[60px] xl:text-[74px] 2xl:text-[80px]"
                        >
                            {/* The full circular */}
                            {"The full circular".split("").map((letter, index) => (
                                <motion.span
                                    key={`first-${index}`}
                                    variants={letterVariants}
                                    transition={{
                                        duration: 0.55,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="inline-block"
                                >
                                    {letter === " " ? "\u00A0" : letter}
                                </motion.span>
                            ))}

                            <br />

                            {/* economy */}
                            {"economy".split("").map((letter, index) => (
                                <motion.span
                                    key={`economy-${index}`}
                                    variants={letterVariants}
                                    transition={{
                                        duration: 0.55,
                                        delay: 0.15,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="inline-block"
                                >
                                    {letter}
                                </motion.span>
                            ))}

                            {" "}

                            {/* stack */}
                            {"stack".split("").map((letter, index) => (
                                <motion.span
                                    key={`stack-${index}`}
                                    variants={letterVariants}
                                    transition={{
                                        duration: 0.55,
                                        delay: 0.3,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="inline-block text-[#43c5b3]"
                                >
                                    {letter}
                                </motion.span>
                            ))}

                            <br />

                            {/* compliance to */}
                            {"compliance to".split("").map((letter, index) => (
                                <motion.span
                                    key={`compliance-${index}`}
                                    variants={letterVariants}
                                    transition={{
                                        duration: 0.55,
                                        delay: 0.45,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="inline-block"
                                >
                                    {letter === " " ? "\u00A0" : letter}
                                </motion.span>
                            ))}

                            <br />

                            {/* decarbonisation */}
                            {"decarbonisation.".split("").map((letter, index) => (
                                <motion.span
                                    key={`decarbonisation-${index}`}
                                    variants={letterVariants}
                                    transition={{
                                        duration: 0.55,
                                        delay: 0.6,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="inline-block text-white"
                                >
                                    {letter}
                                </motion.span>
                            ))}
                        </motion.h1>
                    </div>

                    {/* =================================================
                        BOTTOM PARAGRAPH
                    ================================================= */}

                    <motion.div
                        className="relative z-10 mt-7 w-full max-w-[520px] sm:mt-10 md:mt-8 lg:mt-10"
                        initial={
                            shouldReduceMotion
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: 25 }
                        }
                        whileInView={{
                            opacity: 1,
                            y: 0,
                        }}
                        viewport={{
                            once: false,
                            amount: 0.45,
                        }}
                        transition={{
                            duration: 0.8,
                            delay: 0.8,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    >
                        <p className="relative ml-3 mb-10 w-full pr-4 text-[15px] font-normal leading-[1.5] tracking-[-0.01em] text-[#aeb9b8] sm:ml-5 sm:mb-12 sm:pr-2 sm:text-[17px] md:text-[18px] lg:text-[18px] xl:text-[18px] 2xl:text-[18px]">
                            From EPR registration and verified credit procurement
                            to zero waste events and carbon strategy Circulogy
                            delivers the complete circular economy service stack
                            for producers, brand owners and organisations
                            navigating India's sustainability transition.
                        </p>
                    </motion.div>
                </motion.div>

                {/* =====================================================
                    RIGHT LIGHT PANEL
                ===================================================== */}

                <motion.div
                    className="relative z-20 min-h-[320px] w-full overflow-hidden bg-[#e9f7f3] sm:min-h-[350px] md:absolute md:right-0 md:top-0 md:h-full md:min-h-0 md:w-[50%] md:overflow-visible"
                    initial={
                        shouldReduceMotion
                            ? { opacity: 1, x: 0 }
                            : { opacity: 0, x: 35 }
                    }
                    whileInView={{
                        opacity: 1,
                        x: 0,
                    }}
                    viewport={{
                        once: false,
                        amount: 0.15,
                    }}
                    transition={{
                        duration: 0.9,
                        delay: 0.15,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    {/* =================================================
                        DECORATIVE CIRCLES
                    ================================================= */}

                    <motion.div
                        className="pointer-events-none absolute -right-[110px] -top-[100px] h-[330px] w-[330px] rounded-full border border-[#cce7e1] sm:h-[390px] sm:w-[390px] md:h-[440px] md:w-[440px]"
                        initial={{
                            opacity: 0,
                            scale: 0.8,
                            rotate: -15,
                        }}
                        whileInView={{
                            opacity: 1,
                            scale: 1,
                            rotate: 0,
                        }}
                        viewport={{
                            once: false,
                            amount: 0.25,
                        }}
                        transition={{
                            duration: 1,
                            delay: 0.25,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    />

                    <motion.div
                        className="pointer-events-none absolute -right-[65px] -top-[55px] h-[275px] w-[275px] rounded-full border border-[#d3ebe5] sm:h-[330px] sm:w-[330px] md:h-[355px] md:w-[355px]"
                        initial={{
                            opacity: 0,
                            scale: 0.8,
                        }}
                        whileInView={{
                            opacity: 1,
                            scale: 1,
                        }}
                        viewport={{
                            once: false,
                            amount: 0.25,
                        }}
                        transition={{
                            duration: 0.9,
                            delay: 0.4,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    />

                    <motion.div
                        className="pointer-events-none absolute right-[0px] top-[25px] h-[210px] w-[210px] rounded-full border border-[#d8eee9] sm:h-[250px] sm:w-[250px] md:right-[8px] md:top-[30px] md:h-[270px] md:w-[270px]"
                        initial={{
                            opacity: 0,
                            scale: 0.75,
                        }}
                        whileInView={{
                            opacity: 1,
                            scale: 1,
                        }}
                        viewport={{
                            once: false,
                            amount: 0.25,
                        }}
                        transition={{
                            duration: 0.8,
                            delay: 0.55,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    />

                    {/* =================================================
                        MINERAL IMAGE
                    ================================================= */}

                    <div className="group absolute left-[-8%] top-[4%] z-[9999] h-[95%] w-auto sm:left-[-5%] sm:h-[96%] md:left-[-17%] md:top-[5%] md:h-[94%] lg:left-[-15%] lg:h-[95%] xl:left-[-14%] xl:h-[96%]">
                        <motion.div
                            className="pointer-events-none absolute inset-[-10%] rounded-full bg-[#43c5b3]/30 blur-[55px]"
                            animate={
                                shouldReduceMotion
                                    ? {}
                                    : {
                                          opacity: [0.25, 0.65, 0.25],
                                          scale: [0.92, 1.08, 0.92],
                                      }
                            }
                            transition={{
                                duration: 3.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />

                        <motion.div
                            className="pointer-events-none absolute inset-[-18%] rounded-full bg-[#43c5b3]/40 blur-[65px]"
                            initial={{
                                opacity: 0,
                                scale: 0.85,
                            }}
                            whileHover={{
                                opacity: 1,
                                scale: 1.12,
                            }}
                            transition={{
                                duration: 0.5,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        />

                        <motion.div
                            className="pointer-events-none absolute inset-[-4%] rounded-full bg-[#65e6d2]/25 blur-[30px]"
                            animate={
                                shouldReduceMotion
                                    ? {}
                                    : {
                                          opacity: [0.2, 0.55, 0.2],
                                          scale: [0.96, 1.04, 0.96],
                                      }
                            }
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.3,
                            }}
                        />

                        <motion.img
                            src="/images/critical-mineral-rock.png"
                            alt="Critical mineral rock"
                            className="relative z-10 h-full w-[120%] max-w-none cursor-pointer object-contain"
                            animate={
                                shouldReduceMotion
                                    ? {}
                                    : {
                                          y: [0, -5, 0],
                                      }
                            }
                            whileHover={
                                shouldReduceMotion
                                    ? {}
                                    : {
                                          scale: 1.06,
                                          filter:
                                              "drop-shadow(0 0 25px rgba(67,197,179,0.45))",
                                      }
                            }
                            transition={{
                                y: {
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                },
                                scale: {
                                    duration: 0.45,
                                    ease: [0.22, 1, 0.36, 1],
                                },
                                filter: {
                                    duration: 0.45,
                                },
                            }}
                        />
                    </div>

                    {/* =================================================
                        SERVICE CARD 01
                    ================================================= */}

                    <motion.div
                        className="group absolute right-[12%] top-[13%] z-[10000] flex w-[125px] cursor-pointer flex-col rounded-[8px] border border-transparent bg-[#f8fcfa] px-2.5 py-2 shadow-[0_7px_20px_rgba(0,50,43,0.08)] sm:right-[6%] sm:top-[15%] sm:w-[145px] sm:px-3 sm:py-2.5 md:right-[10%] md:top-[18%] md:w-[170px] md:px-4 md:py-3.5 lg:w-[195px] lg:px-4 lg:py-4 xl:w-[220px] xl:px-5 xl:py-4 2xl:w-[240px] 2xl:px-5 2xl:py-5"
                        initial={
                            shouldReduceMotion
                                ? { opacity: 1, x: 0, y: 0 }
                                : { opacity: 0, x: 25, y: 15 }
                        }
                        whileInView={{
                            opacity: 1,
                            x: 0,
                            y: 0,
                        }}
                        viewport={{
                            once: false,
                            amount: 0.3,
                        }}
                        whileHover={{
                            y: -8,
                            scale: 1.04,
                            boxShadow:
                                "0 18px 40px rgba(67, 197, 179, 0.22)",
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                            delay: 0.55,
                        }}
                    >
                        <motion.div
                            className="pointer-events-none absolute inset-0 rounded-[8px] bg-[#43c5b3]/10 opacity-0 blur-xl"
                            whileHover={{
                                opacity: 1,
                            }}
                            transition={{
                                duration: 0.3,
                            }}
                        />

                        <div className="relative z-10 flex items-center justify-between">
                            <span className="font-['Inter',Arial,sans-serif] text-[5px] font-[700] uppercase tracking-[0.7px] text-[#6ca99e] sm:text-[6px] md:text-[7px] lg:text-[8px] xl:text-[8.5px] 2xl:text-[9px]">
                                01 • SERVICE CLUSTER
                            </span>

                            <motion.span
                                className="text-[8px] font-bold text-[#41bca9] sm:text-[9px] md:text-[11px] lg:text-[12px] xl:text-[13px] 2xl:text-[14px]"
                                whileHover={{
                                    x: 3,
                                    y: -3,
                                    scale: 1.25,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 15,
                                }}
                            >
                                ↗
                            </motion.span>
                        </div>

                        <p className="relative z-10 mt-1 font-['Inter',Arial,sans-serif] text-[9px] font-[700] leading-[1.25] text-[#193a35] sm:text-[10px] md:text-[12px] lg:mt-2 lg:text-[14px] xl:text-[15px] 2xl:text-[16px]">
                            EPR &amp; Compliance
                        </p>
                    </motion.div>

                    {/* =================================================
                        SERVICE CARD 02
                    ================================================= */}

                    <motion.div
                      className="group absolute right-[12%] top-[50%] z-[10000] flex w-[125px] cursor-pointer flex-col rounded-[8px] border border-transparent bg-[#06241f] px-2.5 py-2 shadow-[0_8px_20px_rgba(0,30,25,0.12)] sm:right-[8%] sm:top-[20%] sm:w-[140px] sm:px-3 sm:py-2.5 md:right-[100%] md:top-[28%] md:w-[165px] md:px-3.5 md:py-3 lg:right-[10%] lg:top-[40%] lg:w-[190px] lg:px-4 lg:py-3.5 xl:right-[9%] xl:top-[32%] xl:w-[215px] xl:px-5 xl:py-4 2xl:right-[10%] 2xl:top-[34%] 2xl:w-[235px] 2xl:px-5 2xl:py-5"
                        initial={
                            shouldReduceMotion
                                ? { opacity: 1, x: 0, y: 0 }
                                : { opacity: 0, x: 25, y: 15 }
                        }
                        whileInView={{
                            opacity: 1,
                            x: 0,
                            y: 0,
                        }}
                        viewport={{
                            once: false,
                            amount: 0.3,
                        }}
                        whileHover={{
                            y: -8,
                            scale: 1.04,
                            boxShadow:
                                "0 18px 40px rgba(67, 197, 179, 0.28)",
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                            delay: 0.7,
                        }}
                    >
                        <motion.div
                            className="pointer-events-none absolute inset-0 rounded-[8px] bg-[#43c5b3]/15 opacity-0 blur-xl"
                            whileHover={{
                                opacity: 1,
                            }}
                            transition={{
                                duration: 0.3,
                            }}
                        />

                        <div className="relative z-10 flex items-center justify-between">
                            <span className="font-['Inter',Arial,sans-serif] text-[5px] font-[700] uppercase tracking-[0.7px] text-[#54bcae] sm:text-[6px] md:text-[7px] lg:text-[8px] xl:text-[8.5px] 2xl:text-[9px]">
                                02 • SERVICE CLUSTER
                            </span>

                            <motion.span
                                className="text-[8px] font-bold text-[#46c6b4] sm:text-[9px] md:text-[11px] lg:text-[12px] xl:text-[13px] 2xl:text-[14px]"
                                whileHover={{
                                    x: 3,
                                    y: -3,
                                    scale: 1.25,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 15,
                                }}
                            >
                                ↗
                            </motion.span>
                        </div>

                        <p className="relative z-10 mt-1 font-['Inter',Arial,sans-serif] text-[9px] font-[700] leading-[1.25] text-white sm:text-[10px] md:text-[12px] lg:mt-2 lg:text-[14px] xl:text-[15px] 2xl:text-[16px]">
                            Decarbonisation &amp;
                            <br />
                            Sustainability
                        </p>
                    </motion.div>

                    {/* =================================================
                        VERTICAL TEXT
                    ================================================= */}

                    <motion.div
                        className="absolute bottom-[30px] right-[14px] z-30 hidden rotate-[-90deg] origin-right sm:block md:bottom-[37px] md:right-[18px]"
                        initial={
                            shouldReduceMotion
                                ? { opacity: 1, x: 0 }
                                : { opacity: 0, x: 20 }
                        }
                        whileInView={{
                            opacity: 1,
                            x: 0,
                        }}
                        viewport={{
                            once: false,
                            amount: 0.3,
                        }}
                        transition={{
                            duration: 0.7,
                            delay: 0.85,
                        }}
                    >
                        <span className="font-['Inter',Arial,sans-serif] text-[4px] font-[700] uppercase tracking-[1.5px] text-[#78a9a1] sm:text-[5px] sm:tracking-[2px]">
                            CIRCULAR ECONOMY • COMPLIANCE • SUSTAINABILITY
                        </span>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.section>
    );
};

export default CircularEconomySection;