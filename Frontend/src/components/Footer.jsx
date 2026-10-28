
import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { MapPin, Mail, Phone } from "lucide-react";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Technology", path: "/technology" },
  { name: "Blog", path: "/blog" },
  { name: "Pledge", path: "/pledge" },
  { name: "Career", path: "/career" },
];

const company = [
  { name: "About Us", path: "/about" },
  { name: "Our Impact", path: "/impact" },
  { name: "Investor Relations", path: "/investor-relations" },
  { name: "News & Press", path: "/news-press" },
  { name: "Blog", path: "/blog" },
  { name: "Events", path: "/events" },
  { name: "Partnerships", path: "/partnerships" },
];

const policies = [
  { name: "Privacy Policy", id: "privacy" },
  { name: "Terms & Conditions", id: "terms" },
  { name: "Cookies", id: "cookies" },
  { name: "Disclaimer", id: "disclaimer" },
  { name: "Accessibility", id: "accessibility" },
];

const EASE = [0.22, 1, 0.36, 1];

const revealUp = {
  hidden: {
    opacity: 0,
    y: 28,
    filter: "blur(5px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: EASE,
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.075,
    },
  },
};

function FooterColumn({ title, links, reduceMotion }) {
  return (
    <motion.div
      variants={revealUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.12 }}
      className="flex flex-col items-center px-4 py-9 text-center sm:px-5 sm:py-0 lg:px-6 lg:pt-[12px]"
    >
      <motion.h3
        variants={revealUp}
        className="relative mb-[27px] whitespace-nowrap text-[13px] font-semibold uppercase tracking-[0.09em] text-white sm:text-[14px] lg:text-[15px]"
      >
        {title}
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{
            duration: reduceMotion ? 0 : 0.65,
            delay: reduceMotion ? 0 : 0.15,
            ease: EASE,
          }}
          className="absolute -bottom-[10px] left-1/2 h-[2px] w-[25px] origin-center -translate-x-1/2 bg-[#19cdb5]"
        />
      </motion.h3>

      <motion.nav
        aria-label={title}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.08 }}
        className="flex flex-col items-center gap-[16px]"
      >
        {links.map((link) => (
          <motion.div
            key={link.name}
            variants={revealUp}
            whileHover={
              reduceMotion
                ? {}
                : {
                    x: 4,
                    transition: { duration: 0.2 },
                  }
            }
          >
            <Link
              to={link.path || `/${link.id}`}
              className="inline-block text-[14px] leading-[22px] text-[#c4cdcb] transition-colors duration-300 hover:text-[#19cdb5] sm:text-[15px]"
            >
              {link.name}
            </Link>
          </motion.div>
        ))}
      </motion.nav>
    </motion.div>
  );
}

const SocialIcon = ({ type }) => {
  if (type === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" fill="currentColor">
        <path d="M6.5 8.3H3.2V21h3.3V8.3ZM4.85 3A2.02 2.02 0 1 0 4.85 7.04 2.02 2.02 0 0 0 4.85 3ZM21 13.72c0-3.83-2.04-5.61-4.76-5.61-2.2 0-3.18 1.21-3.73 2.06V8.3H9.18V21h3.33v-6.29c0-1.66.31-3.27 2.37-3.27 2.03 0 2.06 1.9 2.06 3.38V21H21v-7.28Z" />
      </svg>
    );
  }

  if (type === "x") {
    return (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 4.5 18.8 19.5M18.2 4.5 5.2 19.5" />
      </svg>
    );
  }

  if (type === "youtube") {
    return (
      <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" fill="currentColor">
        <path d="M23.5 6.2a3.05 3.05 0 0 0-2.14-2.16C19.47 3.5 12 3.5 12 3.5s-7.47 0-9.36.54A3.05 3.05 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3.05 3.05 0 0 0 2.14 2.16c1.89.54 9.36.54 9.36.54s7.47 0 9.36-.54a3.05 3.05 0 0 0 2.14-2.16c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8ZM9.6 15.75v-7.5l6.3 3.75-6.3 3.75Z" />
      </svg>
    );
  }

  if (type === "instagram") {
    return (
      <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="4.5" />
        <circle cx="12" cy="12" r="4.1" />
        <circle cx="17.7" cy="6.4" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  return null;
};

const socialLinks = [
  {
    type: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/circulogy/posts/?feedView=all",
    external: true,
  },
  {
    type: "x",
    label: "X",
    href: "#",
    external: false,
  },
  {
    type: "youtube",
    label: "YouTube",
    href: "#",
    external: false,
  },
  {
    type: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/circulogy/",
    external: true,
  },
];

const Footer = () => {
  const reduceMotion = useReducedMotion();

  const reveal = reduceMotion
    ? {
        hidden: { opacity: 1, y: 0, filter: "blur(0px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)" },
      }
    : revealUp;

  const hoverLift = reduceMotion ? {} : { y: -5, scale: 1.04 };

  return (
    <footer className="relative isolate w-full overflow-hidden bg-[black] font-[Inter,sans-serif] text-white">

      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_48%_0%,rgba(11,75,67,0.22),transparent_58%)]"
          animate={
            reduceMotion
              ? {}
              : { opacity: [0.65, 1, 0.65] }
          }
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Left Decorative Rings */}
        <motion.div
          className="absolute -bottom-[180px] -left-[125px] h-[350px] w-[350px] rounded-full border border-[#16423e]/60 sm:-left-[100px] sm:h-[400px] sm:w-[400px]"
          animate={
            reduceMotion
              ? {}
              : {
                  rotate: [0, 12, 0],
                  scale: [1, 1.04, 1],
                }
          }
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -bottom-[145px] -left-[85px] h-[280px] w-[280px] rounded-full border border-[#16423e]/50 sm:-left-[65px] sm:h-[320px] sm:w-[320px]"
          animate={reduceMotion ? {} : { rotate: [0, -10, 0] }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="absolute -bottom-[110px] -left-[45px] h-[210px] w-[210px] rounded-full border border-[#16423e]/40" />

        {/* Right Decorative Rings */}
        <motion.div
          className="absolute -bottom-[190px] -right-[100px] h-[380px] w-[380px] rounded-full border border-[#16423e]/60 sm:-right-[70px] sm:h-[450px] sm:w-[450px]"
          animate={
            reduceMotion
              ? {}
              : {
                  rotate: [0, -12, 0],
                  scale: [1, 1.05, 1],
                }
          }
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -bottom-[150px] -right-[45px] h-[300px] w-[300px] rounded-full border border-[#16423e]/50 sm:-right-[35px] sm:h-[370px] sm:w-[370px]"
          animate={reduceMotion ? {} : { rotate: [0, 10, 0] }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Subtle Dot Pattern */}
        <motion.div
          className="absolute bottom-[100px] left-[8%] h-[100px] w-[280px] opacity-20 [background-image:radial-gradient(#24766b_1px,transparent_1px)] [background-size:9px_9px]"
          animate={
            reduceMotion
              ? {}
              : {
                  y: [0, -8, 0],
                  opacity: [0.12, 0.24, 0.12],
                }
          }
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main Container */}
      <div className="relative z-10 mx-auto w-full max-w-[1487px] px-5 pb-[25px] pt-[45px] sm:px-4 sm:pt-[60px] lg:px-[30px] lg:pt-[75px]">

        {/* Footer Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.18fr_1fr_1fr_1fr]">

          {/* Brand and Contact */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.12 }}
            transition={{
              duration: reduceMotion ? 0 : 0.8,
              ease: EASE,
            }}
            className="flex flex-col items-center border-[#334744]/70 px-4 pb-[38px] text-center sm:items-start sm:border-r sm:px-6 sm:pb-[40px] sm:text-left lg:pb-[12px] lg:pl-5 lg:pr-[42px]"
          >

            {/* Logo */}
            <motion.div
              variants={reveal}
              whileHover={
                reduceMotion
                  ? {}
                  : {
                      scale: 1.035,
                      transition: { duration: 0.25 },
                    }
              }
            >
              <Link to="/" aria-label="Circulogy home" className="inline-flex max-w-full">
                <img
                  src="/images/companylogo.png"
                  alt="Circulogy"
                  className="h-[36px] w-auto max-w-full object-contain sm:h-[40px] lg:h-[43px]"
                />
              </Link>
            </motion.div>

            <motion.p
              variants={reveal}
              className="mt-[12px] text-[12px] font-medium uppercase tracking-[0.20em] text-[#d0d8d6] sm:text-[13px]"
            >
              ACT CIRCULAR NOW
            </motion.p>

            <motion.p
              variants={reveal}
              className="mt-[25px] max-w-[290px] text-[14px] leading-[23px] text-[#b8c3c1] sm:text-[15px]"
            >
              A tech-enabled platform connecting and empowering every player in India's circular economy.
            </motion.p>

            {/* Address */}
            <motion.a
              variants={reveal}
              whileHover={
                reduceMotion
                  ? {}
                  : {
                      x: 3,
                      transition: { duration: 0.2 },
                    }
              }
              href="https://maps.google.com/?q=307+Tower+B+ATS+Bouquet+Sector+132+Noida+201304"
              target="_blank"
              rel="noreferrer"
              className="mt-[25px] flex w-full max-w-[310px] items-start gap-4 text-left text-[14px] leading-[22px] text-[#c0c9c8] transition-colors duration-300 hover:text-white"
            >
              <MapPin className="mt-[4px] h-[22px] w-[22px] shrink-0 text-[#19cdb5]" strokeWidth={1.8} />
              <span>307, Tower B, ATS Bouquet, Sector 132, Noida, 201304</span>
            </motion.a>

            {/* Email */}
            <motion.a
              variants={reveal}
              whileHover={
                reduceMotion
                  ? {}
                  : {
                      x: 3,
                      transition: { duration: 0.2 },
                    }
              }
              href="mailto:info@circulogy.com"
              className="mt-[22px] flex items-center gap-4 text-[14px] text-[#c0c9c8] transition-colors duration-300 hover:text-[#19cdb5]"
            >
              <Mail className="h-[21px] w-[21px] shrink-0 text-[#19cdb5]" strokeWidth={1.8} />
              <span>info@circulogy.com</span>
            </motion.a>

            {/* Phone */}
            <motion.a
              variants={reveal}
              whileHover={
                reduceMotion
                  ? {}
                  : {
                      x: 3,
                      transition: { duration: 0.2 },
                    }
              }
              href="tel:+918650907362"
              className="mt-[18px] flex items-center gap-4 text-[14px] text-[#c0c9c8] transition-colors duration-300 hover:text-[#19cdb5]"
            >
              <Phone className="h-[21px] w-[21px] shrink-0 text-[#19cdb5]" strokeWidth={1.8} />
              <span>+9186509 07362</span>
            </motion.a>

            {/* Social Links */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              className="mt-[25px] flex flex-wrap justify-center gap-[12px] sm:justify-start sm:gap-[14px]"
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.type}
                  variants={reveal}
                  whileHover={hoverLift}
                  whileTap={reduceMotion ? {} : { scale: 0.94 }}
                  href={social.href}
                  target={social.external ? "_blank" : undefined}
                  rel={social.external ? "noreferrer" : undefined}
                  aria-label={social.label}
                  className="flex h-[46px] w-[46px] items-center justify-center rounded-full border border-[#435352] text-[#e5e9e8] transition-[border-color,background-color,color] duration-300 hover:border-[#19cdb5] hover:bg-[#19cdb5]/10 hover:text-[#19cdb5]"
                >
                  <SocialIcon type={social.type} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <div className="border-b border-[#334744]/70 sm:border-b-0 sm:border-r sm:py-[40px] lg:py-[12px]">
            <FooterColumn
              title="QUICK LINKS"
              links={quickLinks}
              reduceMotion={reduceMotion}
            />
          </div>

          {/* Company */}
          <div className="border-b border-[#334744]/70 sm:border-b-0 lg:border-r lg:py-[12px]">
            <FooterColumn
              title="COMPANY"
              links={company}
              reduceMotion={reduceMotion}
            />
          </div>

          {/* Policies */}
          <div className="sm:py-[40px] lg:py-[12px]">
            <FooterColumn
              title="POLICIES"
              links={policies.map((link) => ({
                ...link,
                path: `/policies/${link.id}`,
              }))}
              reduceMotion={reduceMotion}
            />
          </div>
        </section>

        {/* Bottom Copyright */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 20,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{
            duration: reduceMotion ? 0 : 0.75,
            ease: EASE,
          }}
          className="mt-[28px] flex flex-col items-center justify-center gap-[13px] border-t border-[#63706f]/60 px-3 pt-[25px] text-center sm:mt-[38px] sm:pt-[27px]"
        >
          <p className="text-[12px] leading-[18px] text-[#aeb9b7] sm:text-[13px]">
            © 2026 Circulogy. All rights reserved.
          </p>

          <motion.p
            animate={
              reduceMotion
                ? {}
                : {
                    opacity: [0.7, 1, 0.7],
                  }
            }
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#a6b0ae] sm:text-[10px] sm:tracking-[0.35em]"
          >
            CIRCULAR TODAY. BRIGHTER TOMORROW.
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
