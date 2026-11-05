import React from "react";
import { motion, useReducedMotion } from "motion/react";

const Decarbonisation = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={
        shouldReduceMotion
          ? { opacity: 1 }
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
        amount: 0.15,
      }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative isolate min-h-[360px] w-full overflow-hidden bg-[#f2f5ee] sm:min-h-[420px] lg:min-h-[480px]"
    >

      {/* Curved mint background */}
      <motion.div
        initial={
          shouldReduceMotion
            ? {
                opacity: 1,
                scale: 1,
              }
            : {
                opacity: 0,
                scale: 1.05,
              }
        }
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{
          once: false,
          amount: 0.1,
        }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute inset-0 -z-10 overflow-hidden"
      >
        <svg
          className="absolute left-0 top-0 h-full w-full"
          viewBox="0 0 1440 600"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 55 C240 150 570 145 850 160 C1110 178 1290 145 1440 125 L1440 600 L0 600 Z"
            fill="#DDF1EC"
          />
        </svg>
      </motion.div>


      {/* Main content */}
      <div className="relative mx-auto flex min-h-[360px] w-full max-w-[1600px] flex-col justify-center gap-8 px-6 py-12 sm:min-h-[420px] sm:px-10 sm:py-14 md:px-12 lg:min-h-[480px] lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-[5%] lg:py-10">


        {/* Left content */}
        <motion.div
          initial={
            shouldReduceMotion
              ? {
                  opacity: 1,
                  x: 0,
                }
              : {
                  opacity: 0,
                  x: -60,
                }
          }
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: false,
            amount: 0.25,
          }}
          transition={{
            duration: 0.9,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative z-10 w-full lg:w-[51%] lg:max-w-[560px]"
        >

          {/* Service label */}
          <motion.p
            initial={
              shouldReduceMotion
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {
                    opacity: 0,
                    y: 20,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: false,
              amount: 0.6,
            }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-6 text-[13px] font-extrabold uppercase 
              tracking-[2px] text-[#159f91] sm:text-[13px] 
              sm:mb-6 sm:tracking-[2.4px]"
          >
            SERVICE CLUSTER 02
          </motion.p>


          {/* Heading */}
          <motion.h1
            initial={
              shouldReduceMotion
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {
                    opacity: 0,
                    y: 25,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: false,
              amount: 0.6,
            }}
            transition={{
              duration: 0.75,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}

           
            className="mb-5 text-[42px] font-bold leading-[1.04] tracking-[-1.5px] text-[#101716] sm:text-[58px] sm:tracking-[-2px] md:text-[52px] lg:text-[54px] xl:text-[72px]"
          >
            Decarbonisation
            <br />
            <span className="text-[#15998e]">
              &amp; Sustainability
            </span>
          </motion.h1>


          {/* Description */}
          <motion.p
            initial={
              shouldReduceMotion
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {
                    opacity: 0,
                    y: 25,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: false,
              amount: 0.5,
            }}
            transition={{
              duration: 0.8,
              delay: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-[490px] text-[18px] font-normal leading-[1.75] tracking-[0.05px] text-[#aeb9b8] sm:text-[18px] md:text-[18px]"
          >
            From zero waste events and behaviour change programs to carbon 
            strategy and circular economy advisory, making sustainability 
            visible and measurable for organisations across India. 
          </motion.p>

        </motion.div>


        {/* Right image card */}
        <motion.div
          initial={
            shouldReduceMotion
              ? {
                  opacity: 1,
                  x: 0,
                  scale: 1,
                }
              : {
                  opacity: 0,
                  x: 60,
                  scale: 0.95,
                }
          }
          whileInView={{
            opacity: 1,
            x: 0,
            scale: 1,
          }}
          viewport={{
            once: false,
            amount: 0.25,
          }}
          transition={{
            duration: 0.95,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative z-10 w-full lg:w-[47%] lg:max-w-[590px]"
        >

          {/* Service number */}
          <motion.span
            initial={
              shouldReduceMotion
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {
                    opacity: 0,
                    y: -10,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: false,
              amount: 0.5,
            }}
            transition={{
              duration: 0.6,
              delay: 0.5,
            }}
            className="absolute -top-1 right-0 z-20 -translate-y-full pr-1 text-[8px] font-bold tracking-[1.5px] text-[#176c67] sm:text-[9px]"
          >
      
          </motion.span>


          {/* Image */}
          <motion.div
            initial={
              shouldReduceMotion
                ? {
                    opacity: 1,
                    scale: 1,
                  }
                : {
                    opacity: 0,
                    scale: 0.96,
                  }
            }
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: false,
              amount: 0.3,
            }}
            transition={{
              duration: 1,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative h-[230px] w-full overflow-hidden rounded-[24px] shadow-[0_14px_35px_rgba(20,75,65,0.12)] sm:h-[280px] sm:rounded-[28px] md:h-[320px] lg:h-[350px] lg:rounded-[30px] xl:h-[370px]"
          >
            <motion.img
              src="/images/decarbonisation_sustainability.png"
              alt="Zero waste event operations"
              whileHover={
                shouldReduceMotion
                  ? {}
                  : {
                      scale: 1.05,
                    }
              }
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="h-full w-full object-cover object-center"
            />


            {/* Bottom image overlay */}
            <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#003f3b]/80 to-transparent" />


            {/* Image caption */}
            <motion.p
              initial={
                shouldReduceMotion
                  ? {
                      opacity: 1,
                      y: 0,
                    }
                  : {
                      opacity: 0,
                      y: 15,
                    }
              }
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: false,
                amount: 0.5,
              }}
              transition={{
                duration: 0.6,
                delay: 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute bottom-5 left-5 text-[8px] font-bold uppercase tracking-[1.5px] text-white sm:bottom-6 sm:left-6 sm:text-[9px]"
            >
              ZERO WASTE EVENT OPERATIONS
            </motion.p>

          </motion.div>
        </motion.div>

      </div>
    </motion.section>
  );
};

export default Decarbonisation;