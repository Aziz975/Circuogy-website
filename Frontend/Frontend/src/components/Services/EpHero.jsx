import React from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const EpHero = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={
        shouldReduceMotion
          ? { opacity: 1 }
          : { opacity: 0 }
      }
      whileInView={{ opacity: 1 }}
      viewport={{
        once: false,
        amount: 0.05,
      }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
      className="relative isolate flex min-h-[480px] w-full
        items-center overflow-hidden bg-[#003f3b]
        sm:min-h-[540px] lg:min-h-[600px] xl:min-h-[650px]"
    >
      {/* Background image */}
      <motion.div
        initial={
          shouldReduceMotion
            ? { scale: 1 }
            : { scale: 1.08 }
        }
        whileInView={{ scale: 1 }}
        viewport={{
          once: false,
          amount: 0.05,
        }}
        transition={{
          duration: 1.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/eprimage.png')",
          backgroundPosition: "center center",
        }}
      />

      {/* Teal gradient overlay */}
      <motion.div
        initial={
          shouldReduceMotion
            ? { opacity: 1 }
            : { opacity: 0 }
        }
        whileInView={{ opacity: 1 }}
        viewport={{
          once: false,
          amount: 0.05,
        }}
        transition={{
          duration: 1.2,
          delay: 0.1,
          ease: "easeOut",
        }}
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,49,46,0.88) 0%, rgba(0,65,61,0.72) 38%, rgba(0,61,57,0.35) 68%, rgba(0,45,42,0.15) 100%)",
        }}
      />

      {/* Overall teal tint */}
      <div className="absolute inset-0 -z-10 bg-[#003f3b]/10" />

      {/* Top navigation */}
      <motion.header
        initial={
          shouldReduceMotion
            ? {
                opacity: 1,
                y: 0,
              }
            : {
                opacity: 0,
                y: -25,
              }
        }
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: false,
          amount: 0.2,
        }}
        transition={{
          duration: 0.75,
          delay: 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute left-0 right-0 top-0 z-20
          flex items-center justify-between px-5 py-6
          sm:px-8 sm:py-7 lg:px-[5%] lg:py-8"
      >
        {/* Logo */}
        <motion.a
          href="/"
          initial={
            shouldReduceMotion
              ? { opacity: 1, x: 0 }
              : { opacity: 0, x: -20 }
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
            duration: 0.6,
            delay: 0.25,
          }}
          whileHover={
            shouldReduceMotion
              ? {}
              : {
                  x: 3,
                }
          }
          className="flex items-center gap-2 text-white no-underline"
        >
          <svg
            viewBox="0 0 32 22"
            className="h-[20px] w-[29px] sm:h-[23px] sm:w-[32px]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.2 5.3 10.4 2.5a6.2 6.2 0 0 0-8.8 8.8l3 3a6.2 6.2 0 0 0 8.8 0l2.1-2.1"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            <path
              d="m18.8 16.7 2.8 2.8a6.2 6.2 0 0 0 8.8-8.8l-3-3a6.2 6.2 0 0 0-8.8 0l-2.1 2.1"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            <path
              d="m10.5 11 11-1"
              stroke="white"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>

          <span
            className="text-[17px] font-bold tracking-[-0.6px]
              sm:text-[19px]"
          >
            Circulogy
          </span>
        </motion.a>

        {/* Service badge */}
    
      </motion.header>

      {/* Hero content */}
      <div
        className="relative z-10 w-full px-5 pb-8 pt-24
          sm:px-8 sm:pb-12 sm:pt-28
          lg:px-[5%] lg:pb-14 lg:pt-32"
      >
        <motion.div
          initial={
            shouldReduceMotion
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {
                  opacity: 0,
                  y: 35,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: false,
            amount: 0.3,
          }}
          transition={{
            duration: 0.9,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-[550px]"
        >
          {/* Eyebrow */}
          <motion.p
            initial={
              shouldReduceMotion
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: -20 }
            }
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: false,
              amount: 0.6,
            }}
            transition={{
              duration: 0.7,
              delay: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-5 text-[13px] font-extrabold uppercase 
              tracking-[2px] text-[#159f91] sm:text-[13px] 
              sm:mb-6 sm:tracking-[2.4px]"
          >
            SERVICE CLUSTER 01
          </motion.p>

          {/* Heading */}
          <motion.h1
            initial={
              shouldReduceMotion
                ? {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }
                : {
                    opacity: 0,
                    y: 35,
                    scale: 0.97,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            viewport={{
              once: false,
              amount: 0.6,
            }}
            transition={{
              duration: 0.9,
              delay: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}

            
            className="mb-5 text-[42px] font-bold
              leading-[0.98] tracking-[-2px] text-white
              sm:text-[58px] sm:tracking-[-2.5px]
              md:text-[72px] lg:text-[68px] xl:text-[90px]  2xl:text-[80px]"
          >
            EPR &amp;
            <br />
            <span className="text-[#8ccfc5]">
              Compliance.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={
              shouldReduceMotion
                ? {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }
                : {
                    opacity: 0,
                    y: 25,
                    filter: "blur(7px)",
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            viewport={{
              once: false,
              amount: 0.45,
            }}
            transition={{
              duration: 0.9,
              delay: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-[440px] text-[18px]
              font-normal leading-[1.65] tracking-[0.05px]
             text-[#aeb9b8]
              sm:text-[18px] sm:leading-[1.7]
              md:text-[18px]"
          >
            End-to-end compliance for every regulated waste
            category. From registration and takeback to
            verified credits, reporting and regulatory
            advisory  all managed through EPRSense™.
          </motion.p>

          {/* CTA */}
          <motion.a
            href="/contact"
            initial={
              shouldReduceMotion
                ? {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }
                : {
                    opacity: 0,
                    y: 25,
                    scale: 0.94,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            viewport={{
              once: false,
              amount: 0.5,
            }}
            transition={{
              duration: 0.75,
              delay: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={
              shouldReduceMotion
                ? {}
                : {
                    scale: 1.04,
                    y: -3,
                  }
            }
            className="group mt-6 inline-flex min-h-[38px]
              items-center justify-center gap-2 rounded-full
              bg-[#f4faf7] px-5 py-2 text-[12px]
              font-bold uppercase tracking-[1px]
              text-[#00504e] transition-all duration-300
              hover:bg-[#8ccfc5]
              hover:shadow-[0_0_25px_rgba(140,207,197,0.25)]
              sm:mt-7 sm:min-h-[42px] sm:px-6 sm:text-[12px]"
          >
            TRACEABLE · AUDIT-READY

            <ArrowUpRight
              size={13}
              className="transition-transform duration-300
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5"
            />
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default EpHero;