import React from "react";
import { motion, useReducedMotion } from "motion/react";

const leftServices = [
  {
    number: "01",
    title: "Zero Waste & Carbon Neutral Events",
    description:
      "Zero waste operations, green event design and carbon neutrality certification, with a post-event impact report included.",
  },
  {
    number: "02",
    title: "IEC & Behavioural Activation",
    description:
      "On-ground information, education and communication campaigns that shift waste behaviour across communities and campuses.",
  },
  {
    number: "03",
    title: "Corporate Sustainability & CSR Programs",
    description: "",
  },
];

const rightServices = [
  {
    number: "04",
    title: "Circular Economy Strategy & Advisory",
    description:
      "Waste stream audits, circular roadmaps and implementation support for manufacturers integrating circularity into the supply chain.",
  },
  {
    number: "05",
    title: "Supply Chain Decarbonisation",
    description:
      "Scope 3 emissions mapping, sustainable procurement policy and supplier engagement aligned with India's net-zero trajectory.",
  },
  {
    number: "06",
    title: "Carbon Credits & CCTS",
    description: "",
  },
];


/* =====================================================
   SERVICE COLUMN
===================================================== */

const ServiceColumn = ({ services }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="grid grid-rows-3">
      {services.map((service, index) => (
        <motion.div
          key={service.number}

          /* Initial scroll animation */
          initial={
            shouldReduceMotion
              ? {
                  opacity: 1,
                  y: 0,
                  x: 0,
                }
              : {
                  opacity: 0,
                  y: 35,
                  x: index % 2 === 0 ? -20 : 20,
                }
          }

          /* Replay animation whenever visible */
          whileInView={{
            opacity: 1,
            y: 0,
            x: 0,
          }}

          viewport={{
            once: false,
            amount: 0.35,
          }}

          transition={{
            duration: 0.7,
            delay: index * 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}

          /* Card hover */
          whileHover={
            shouldReduceMotion
              ? {}
              : {
                  y: -6,
                  x: 3,
                }
          }

          className={`group relative flex cursor-pointer gap-4 overflow-hidden rounded-[12px] sm:gap-[18px] py-6 sm:py-[23px] px-2 -mx-2 transition-colors duration-500 ${
            index !== 2 ? "border-b border-[#e7e9e3]" : ""
          }`}
        >

          {/* =================================================
              HOVER BACKGROUND
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
            }}
            whileHover={
              shouldReduceMotion
                ? {}
                : {
                    opacity: 1,
                  }
            }
            transition={{
              duration: 0.35,
            }}
            className="pointer-events-none absolute inset-0 -z-10 rounded-[12px] bg-[#e8f5f1]"
          />


          {/* =================================================
              HOVER GLOW
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            whileHover={
              shouldReduceMotion
                ? {}
                : {
                    opacity: 1,
                    scale: 1,
                  }
            }
            transition={{
              duration: 0.45,
            }}
            className="pointer-events-none absolute -right-10 top-1/2 -z-10 h-24 w-24 -translate-y-1/2 rounded-full bg-[#36aaa0]/20 blur-[35px]"
          />


          {/* =================================================
              NUMBER + ACCENT LINE
          ================================================= */}

          <div className="flex shrink-0 items-start gap-[5px]">

            <motion.span
              whileHover={
                shouldReduceMotion
                  ? {}
                  : {
                      scale: 1.12,
                      x: 2,
                    }
              }
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 18,
              }}
              className="text-[20px] sm:text-[20px] font-medium leading-[18px] tracking-[0.02em] text-[#36aaa0]"
            >
              {service.number}
            </motion.span>

            <motion.span
              initial={{
                scaleY: 1,
              }}
              whileHover={
                shouldReduceMotion
                  ? {}
                  : {
                      scaleY: 1.5,
                    }
              }
              transition={{
                duration: 0.3,
              }}
              className="mt-[4px] h-[13px] w-[1px] origin-top bg-[#8ecfc5]"
            />

          </div>


          {/* =================================================
              SERVICE CONTENT
          ================================================= */}

          <div className="min-w-0 flex-1">

            <motion.h3
              whileHover={
                shouldReduceMotion
                  ? {}
                  : {
                      x: 4,
                    }
              }
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
              className="relative mt-[-5px] text-[20px] sm:text-[20px] font-bold leading-[1.35] tracking-[-0.015em] text-[#202522]"
            >
              {service.title}
            </motion.h3>


            {/* Description */}

            {service.description && (
              <motion.p
                initial={
                  shouldReduceMotion
                    ? {
                        opacity: 1,
                        y: 0,
                      }
                    : {
                        opacity: 0,
                        y: 12,
                      }
                }
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: false,
                  amount: 0.35,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.12 + 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-[9px] max-w-[370px] text-[15px] sm:text-[15px] font-normal leading-[1.65] tracking-[0.005em] text-[#78817c]"
              >
                {service.description}
              </motion.p>
            )}

          </div>


          {/* =================================================
              HOVER ARROW
          ================================================= */}

          <motion.span
            initial={{
              opacity: 0,
              x: -8,
            }}
            whileHover={
              shouldReduceMotion
                ? {}
                : {
                    opacity: 1,
                    x: 0,
                  }
            }
            transition={{
              duration: 0.25,
            }}
            className="absolute right-2 top-6 text-[15px] font-medium text-[#36aaa0]"
          >
            ↗
          </motion.span>

        </motion.div>
      ))}
    </div>
  );
};


/* =====================================================
   MAIN COMPONENT
===================================================== */

export default function SustainabilityServices() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
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
        amount: 0.1,
      }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="w-full bg-[#e0f2ed] py-5  sm:py-7  lg:py-0"
    >

      <motion.div
        initial={
          shouldReduceMotion
            ? {
                opacity: 1,
                scale: 1,
              }
            : {
                opacity: 0,
                scale: 0.98,
              }
        }
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{
          once: false,
          amount: 0.15,
        }}
        transition={{
          duration: 0.9,
          delay: 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mx-auto w-full max-w-full overflow-hidden rounded-t-[22px] bg-[#f8f8f4] px-5 py-7 shadow-[0_12px_35px_rgba(39,100,84,0.12)] sm:px-7 sm:py-8 md:px-9 md:py-9 lg:px-[60px] lg:pt-[35px] lg:pb-[18px]"
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-4 flex items-center justify-between">

          <motion.h2
            initial={
              shouldReduceMotion
                ? {
                    opacity: 1,
                    x: 0,
                  }
                : {
                    opacity: 0,
                    x: -25,
                  }
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
              duration: 0.6,
              delay: 0.15,
            }}
            className="text-[13px] font-extrabold uppercase tracking-[0.18em] text-[#246d68]"
          >
            Sustainability Services
          </motion.h2>


          <motion.span
            initial={
              shouldReduceMotion
                ? {
                    opacity: 1,
                    x: 0,
                  }
                : {
                    opacity: 0,
                    x: 25,
                  }
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
              duration: 0.6,
              delay: 0.25,
            }}
            className="text-[8px] font-medium uppercase tracking-[0.02em] text-[#929b95]"
          >
   
          </motion.span>

        </div>


        {/* =================================================
            SERVICES
        ================================================= */}

        <div className="grid grid-cols-1 gap-x-15 md:grid-cols-2 md:gap-x-50 lg:gap-x-[50px]">

          <ServiceColumn services={leftServices} />

          <ServiceColumn services={rightServices} />

        </div>

      </motion.div>
    </motion.section>
  );
}