import React, { useEffect, useRef, useState } from "react";
import { Mail, MapPin, Building2, Share2, ShieldCheck, ArrowRight } from "lucide-react";

const contactItems = [
  { icon: Mail, label: "EMAIL", value: "info@circulogy.com" },
  { icon: MapPin, label: "HEADQUARTERS", value: "Noida, Uttar Pradesh" },
  { icon: Building2, label: "REGISTERED OFFICE", value: "Meerut, Uttar Pradesh" },
  { icon: Share2, label: "COLLECTION NETWORK", value: "Pan-India Partner Network" },
  { icon: ShieldCheck, label: "RECOGNITION", value: "DPIIT-Recognised DeepTech Startup" },
  { icon: null, label: "LINKEDIN", value: "linkedin.com/company/circulogy", linkedin: true },
];

function ContactItem({ icon: Icon, label, value, linkedin }) {
  return (
    <div className="flex items-center gap-6 border-b border-white/[0.09] py-[18px] last:border-b-0 sm:gap-7">
      <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[13px] border border-[#0b5b50] bg-[#073b35] text-[#27b5a2] shadow-[inset_0_0_20px_rgba(31,184,161,0.08)]">
        {linkedin ? <span className="text-[23px] font-bold leading-none">in</span> : Icon && <Icon size={23} strokeWidth={1.8} />}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold tracking-[0.16em] text-[#6e7d79] sm:text-[11px]">{label}</p>
        <p className="mt-[5px] truncate text-[15px] font-semibold text-[#f0f5f3] sm:text-[16px]">{value}</p>
      </div>
    </div>
  );
}

const headingLines = [
  [{ text: "Building India's", color: "white" }],
  [
    { text: "critical ", color: "white" },
    { text: "mineral", color: "teal" },
  ],
  [
    { text: "and ", color: "white" },
    { text: "rare earth", color: "teal" },
  ],
  [{ text: "independence,", color: "white" }],
  [{ text: "together.", color: "white" }],
];

function AnimatedHeading({ visible }) {
  return (
    <h1 aria-label="Building India's critical mineral and rare earth independence, together." className="text-[48px] font-bold leading-[0.98] tracking-[-0.055em] text-white sm:text-[58px] md:text-[66px] lg:text-[62px] xl:text-[70px]">
      {headingLines.map((line, lineIndex) => (
        <span key={lineIndex} className="block overflow-hidden pb-[0.06em]">
          <span
            aria-hidden="true"
            className="block transition-[transform,opacity,filter] duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0) skewY(0deg)" : "translateY(110%) skewY(3deg)",
              filter: visible ? "blur(0px)" : "blur(9px)",
              transitionDelay: visible ? `${160 + lineIndex * 140}ms` : "0ms",
            }}
          >
            {line.map((part, partIndex) => (
              <span key={partIndex} className={part.color === "teal" ? "text-[#24b6a2]" : "text-white"}>
                {part.text}
              </span>
            ))}
          </span>
        </span>
      ))}
    </h1>
  );
}

export default function WorkWithUs() {
  const [visible, setVisible] = useState(false);
  const leftRef = useRef(null);

  useEffect(() => {
    const element = leftRef.current;
    if (!element) return;

    let frameOne;
    let frameTwo;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(false);

          frameOne = requestAnimationFrame(() => {
            frameTwo = requestAnimationFrame(() => {
              setVisible(true);
            });
          });
        } else {
          setVisible(false);
          cancelAnimationFrame(frameOne);
          cancelAnimationFrame(frameTwo);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameOne);
      cancelAnimationFrame(frameTwo);
    };
  }, []);

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-[#020b09] px-5 py-16 text-white sm:px-8 md:px-12 lg:px-[9.3vw] lg:py-[105px]">
      {/* Background Image */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[-1] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/footer.jpeg')" }} />

      {/* Grid Background */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(112,166,158,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(112,166,158,0.07)_1px,transparent_1px)] bg-[size:54px_54px]" />

      {/* Left Green Glow */}
      <div className="pointer-events-none absolute -left-[180px] top-[-180px] z-0 h-[480px] w-[480px] rounded-full bg-[#0a9d87]/20 blur-[120px]" />

      {/* Right Green Glow */}
      <div className="pointer-events-none absolute -right-[190px] bottom-[-170px] z-0 h-[500px] w-[500px] rounded-full bg-[#0b8e7b]/20 blur-[130px]" />

      {/* Center Glow */}
      <div className="pointer-events-none absolute left-[45%] top-[30%] z-0 h-[450px] w-[450px] rounded-full bg-[#0a7769]/[0.04] blur-[100px]" />

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-[1305px]">
        <div className="grid items-center gap-14 lg:grid-cols-[52%_48%] lg:gap-10 xl:grid-cols-[51%_49%]">
          <div ref={leftRef} className="max-w-[690px]">
            {/* Section Label */}
            <div className={`mb-8 flex items-center gap-3 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
              
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#31b7a4] sm:text-[12px]">WORK WITH US</span>
            </div>

            {/* Animated Main Heading */}
            <AnimatedHeading visible={visible} />

            {/* Description */}
            <p className={`mt-8 max-w-[650px] text-[15px] leading-[1.65] text-[#bdc8c5] transition-[transform,opacity,filter] duration-1000 delay-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:text-[17px] sm:leading-[1.65] ${visible ? "translate-y-0 opacity-100 blur-0" : "translate-y-6 opacity-0 blur-[3px]"}`}>
              Whether you are an investor, an industrial buyer of critical minerals or rare earths, an EPR-obligated producer, or a policy partner Circulogy is building the infrastructure India needs.
            </p>

            {/* Buttons */}
            <div className={`mt-9 flex flex-wrap gap-4 transition-[transform,opacity,filter] duration-1000 delay-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${visible ? "translate-y-0 opacity-100 blur-0" : "translate-y-6 opacity-0 blur-[3px]"}`}>
              <a href="#contact" className="group inline-flex h-[63px] items-center justify-center gap-3 rounded-full bg-[#29b6a2] px-8 text-[15px] font-bold text-white shadow-[0_10px_35px_rgba(25,181,160,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#32c3ae] hover:shadow-[0_15px_45px_rgba(25,181,160,0.3)] sm:px-9">
                Get in Touch
                <ArrowRight size={19} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a href="#solutions" className="inline-flex h-[63px] items-center justify-center rounded-full border border-white/[0.18] bg-white/[0.13] px-8 text-[15px] font-semibold text-[#edf2f0] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.18] sm:px-9">
                Explore Solutions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}