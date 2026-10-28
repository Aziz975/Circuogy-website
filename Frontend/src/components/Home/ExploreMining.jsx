// UrbanMining.jsx
import React, { useEffect, useRef, useState } from "react";

/* ───────────────────────── DATA ───────────────────────── */

const stageDetails = [
  {
    label: "The input",
    heading: ["Collect from", "circulation"],
    description:
      "End-of-life electronics and batteries become a domestic resource stream instead of leaving the value chain.",
    whatEnters: "Devices, batteries and production scrap",
    whatChanges: "A traceable collected feedstock",
    image: "images/first.png",
    alt: "Collected electronics and batteries in bins",
    imageLabel: "Materials already in use",
    imageDescription:
      "The urban mine starts with products moving through homes, businesses and industry.",
  },
  {
    label: "The preparation",
    heading: ["Sort and", "prepare"],
    description:
      "Collected materials are sorted and prepared to create suitable feedstock for the recovery process.",
    whatEnters: "Collected electronics, batteries and magnets",
    whatChanges: "Prepared material ready for processing",
    image: "images/second.png",
    alt: "Electronic waste sorted for recycling",
    imageLabel: "Prepared for recovery",
    imageDescription:
      "Sorting and preparation help direct materials into the appropriate recovery pathway.",
  },
  {
    label: "The process",
    heading: ["Recover", "critical minerals"],
    description:
      "Hydrometallurgical processing helps recover valuable metals and rare earth elements from prepared secondary resources.",
    whatEnters: "Battery black mass and NdFeB magnets",
    whatChanges: "Recovered mineral-bearing streams",
    image: "images/third.png",
    alt: "Critical mineral recovery process",
    imageLabel: "Value recovered",
    imageDescription:
      "Discarded materials can become valuable resources for India's manufacturing ecosystem.",
  },
  {
    label: "The output",
    heading: ["Refine for", "the future"],
    description:
      "Recovered materials can support domestic battery, electronics and advanced manufacturing supply chains.",
    whatEnters: "Recovered mineral-bearing materials",
    whatChanges: "Inputs for domestic industry",
    image: "images/fourth.png",
    alt: "Refined materials for industrial applications",
    imageLabel: "Back into the value chain",
    imageDescription:
      "Closing the loop helps retain material value within the domestic supply chain.",
  },
];

const stages = [
  { no: "01", title: "Collect", sub: "The input" },
  { no: "02", title: "Prepare", sub: "The feedstock" },
  { no: "03", title: "Recover", sub: "The materials" },
  { no: "04", title: "Return", sub: "The value" },
];

const materials = [
  { symbol: "Li", name: "Lithium" },
  { symbol: "Ni", name: "Nickel" },
  { symbol: "Co", name: "Cobalt" },
  { symbol: "Cu", name: "Copper" },
  { symbol: "C", name: "Graphite" },
  { symbol: "REE", name: "Rare earths" },
];

/* ───────────────────── ANIMATION CSS ───────────────────── */

const animationCSS = `
/* hidden (pre-animation) states */
.um-pre{opacity:0}
.um-letter-pre{opacity:0;transform:translateY(110%) rotate(8deg)}

/* entrance animations (fill-mode "backwards" so hover transforms still work afterwards) */
.um-fade-up{animation:umFadeUp .9s cubic-bezier(.2,.7,.2,1) backwards}
.um-fade-left{animation:umFadeLeft .8s cubic-bezier(.2,.7,.2,1) backwards}
.um-scale-in{animation:umScaleIn 1s cubic-bezier(.2,.7,.2,1) backwards}
.um-letter{animation:umLetter .85s cubic-bezier(.2,.8,.2,1) backwards}
.um-clip-up{animation:umClipUp 1.1s cubic-bezier(.65,0,.15,1) backwards}
.um-clip-right{animation:umClipRight 1.3s cubic-bezier(.65,0,.15,1) backwards}
.um-zoom{animation:umZoomOut 1.8s cubic-bezier(.2,.7,.2,1) backwards}
.um-kenburns{animation:umKenBurns 2.6s cubic-bezier(.2,.7,.2,1) backwards}
.um-line{animation:umLine 1s cubic-bezier(.65,0,.15,1) backwards}

/* ambient loops */
.um-float{animation:umFloat 14s ease-in-out infinite}
.um-float-slow{animation:umFloat 20s ease-in-out infinite reverse}
.um-scroll-dot{animation:umScrollDot 2s ease-in-out infinite}

@keyframes umFadeUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:none}}
@keyframes umFadeLeft{from{opacity:0;transform:translateX(-32px)}to{opacity:1;transform:none}}
@keyframes umScaleIn{from{opacity:0;transform:translateY(48px) scale(.96)}to{opacity:1;transform:none}}
@keyframes umLetter{from{opacity:0;transform:translateY(110%) rotate(8deg)}to{opacity:1;transform:none}}
@keyframes umClipUp{from{clip-path:inset(100% 0 0 0 round 1rem)}to{clip-path:inset(0 0 0 0 round 1rem)}}
@keyframes umClipRight{from{clip-path:inset(0 100% 0 0 round 1.5rem)}to{clip-path:inset(0 0 0 0 round 1.5rem)}}
@keyframes umZoomOut{from{transform:scale(1.25)}to{transform:scale(1)}}
@keyframes umKenBurns{from{opacity:0;transform:scale(1.15)}to{opacity:1;transform:scale(1)}}
@keyframes umLine{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes umFloat{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(36px,-28px,0)}}
@keyframes umScrollDot{0%{transform:translateY(-100%)}100%{transform:translateY(300%)}}

/* hover glow on cards: soft light that follows the cursor + glowing border ring */
.um-glow{position:relative;transition:box-shadow .45s ease}
.um-glow::before{
  content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;
  opacity:0;transition:opacity .45s ease;
  background:radial-gradient(420px circle at var(--mx,50%) var(--my,50%), rgba(79,214,198,.16), transparent 45%);
}
.um-glow::after{
  content:"";position:absolute;inset:0;border-radius:inherit;padding:1px;pointer-events:none;
  opacity:0;transition:opacity .45s ease;
  background:radial-gradient(260px circle at var(--mx,50%) var(--my,50%), rgba(79,214,198,.95), transparent 60%);
  -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite:xor;mask-composite:exclude;
}
.um-glow:hover::before,.um-glow:hover::after{opacity:1}
.um-glow:hover{box-shadow:0 0 45px rgba(79,214,198,.22)}

@media (prefers-reduced-motion: reduce){
  .um-pre,.um-letter-pre{opacity:1!important;transform:none!important}
  [class*="um-"]{animation:none!important}
}
`;

/* ───────────────────── HELPERS ───────────────────── */

// true while the element is on screen, false when it leaves -> animations replay every time
function useInView(rootMargin = "0px 0px -20% 0px") {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin, threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return [ref, inView];
}

// moves the glow with the cursor
const glow = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

// generic entrance wrapper
function Reveal({
  show,
  anim = "um-fade-up",
  delay = 0,
  as: Tag = "div",
  className = "",
  style,
  children,
  ...rest
}) {
  return (
    <Tag
      className={`${show ? anim : "um-pre"} ${className}`}
      style={{ animationDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// letter-by-letter heading reveal
function LetterReveal({
  as: Tag = "h2",
  lines,
  show,
  className = "",
  delay = 0,
  step = 38,
}) {
  let i = 0;
  return (
    <Tag className={className} aria-label={lines.map((l) => l.text).join(" ")}>
      {lines.map((line, li) => (
        <span key={li} className={`block ${line.className || ""}`} aria-hidden="true">
          {line.text.split(" ").map((word, wi, arr) => (
            <span key={wi}>
              <span className="-my-[0.1em] inline-block overflow-hidden whitespace-nowrap py-[0.1em] align-bottom">
                {[...word].map((ch, ci) => {
                  const d = delay + i++ * step;
                  return (
                    <span
                      key={ci}
                      className={`inline-block ${show ? "um-letter" : "um-letter-pre"}`}
                      style={{ animationDelay: `${d}ms` }}
                    >
                      {ch}
                    </span>
                  );
                })}
              </span>
              {wi < arr.length - 1 && " "}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}

/* ───────────────────── COMPONENT ───────────────────── */

export default function ExploreMining() {
  const [activeStage, setActiveStage] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const currentStage = stageDetails[activeStage];

  const [heroRef, heroIn] = useInView();
  const [journeyRef, journeyIn] = useInView();
  const [groupsRef, groupsIn] = useInView();

  // after the page leaves the screen, the next entrance plays the full intro again
  useEffect(() => {
    if (!journeyIn) setInteracted(false);
  }, [journeyIn]);

  // quicker timings when switching stages by click
  const base = interacted ? 0 : 650;

  return (
    <main className="w-full font-['Poppins',sans-serif]">
      <style>{animationCSS}</style>

      {/* ───────────── PAGE 1: HERO ───────────── */}
      <section
        ref={heroRef}
        className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#0b3a47] lg:flex-row lg:items-center"
      >
        {/* Background image (slow zoom-out) */}
        <div className="relative order-2  w-full overflow-hidden lg:absolute lg:inset-0 lg:order-none">
          <img
            src="images/hero.png"
            alt="Circuit board, recycling plant and city skyline collage"
            className={`h-full w-full object-cover object-right ${
              heroIn ? "um-kenburns" : "um-pre"
            }`}
          />
        </div>

        {/* Left text */}
        <div className="relative z-10 px-6 pb-6 pt-16 sm:px-10 lg:w-[42%] lg:py-0 lg:pl-[5.5%] lg:pr-0">
          <LetterReveal
            as="h1"
            show={heroIn}
            delay={200}
            step={42}
            className="text-6xl font-semibold leading-[1.15] tracking-tight text-white sm:text-6xl xl:text-[76px]"
            lines={[
              { text: "The mine is" },
              { text: "already" },
              { text: "in circulation", className: "text-[#4fd6c6]" },
            ]}
          />

          <Reveal
            as="p"
            show={heroIn}
            delay={1500}
            className="mt-8 max-w-[320px] text-sm leading-[1.5] text-white/90 sm:max-w-[530px] sm:text-[20px] lg:mt-12"
          >
            Urban mining recovers useful materials from end-of-life electronics
            and batteries through a controlled path from collection to
            qualified output.
          </Reveal>

          {/* accent line that draws in */}
          <div
            className={`mt-8 h-[2px] w-24 origin-left bg-[#4fd6c6] ${
              heroIn ? "um-line" : "um-pre"
            }`}
            style={{ animationDelay: "1900ms" }}
          />
        </div>

        {/* Scroll cue (desktop) */}
        <Reveal
          show={heroIn}
          delay={2200}
          className="absolute bottom-8 left-[5.5%] z-10 hidden items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/60 lg:flex"
        >
          <span className="relative block h-10 w-[1px] overflow-hidden bg-white/20">
            <span className="um-scroll-dot absolute left-0 top-0 block h-3 w-full bg-[#4fd6c6]" />
          </span>
          Scroll
        </Reveal>
      </section>

      {/* ───────────── PAGE 2: JOURNEY ───────────── */}
      <section
        ref={journeyRef}
        className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-[#f4f7f6] px-4 sm:px-8 lg:px-[4.5%]"
      >
        {/* ambient glow blobs */}
        <div
          aria-hidden="true"
          className="um-float pointer-events-none absolute -left-24 top-8 h-[420px] w-[420px] rounded-full bg-[#4fd6c6]/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="um-float-slow pointer-events-none absolute -right-32 bottom-0 h-[480px] w-[480px] rounded-full bg-[#063343]/10 blur-3xl"
        />

        <LetterReveal
          as="h2"
          show={journeyIn}
          step={32}
          className="relative z-10 text-3xl font-semibold tracking-tight text-[#0a1f1c] sm:text-[44px]"
          lines={[{ text: "The urban mining journey" }]}
        />

        <Reveal
          show={journeyIn}
          anim="um-scale-in"
          delay={300}
          onMouseMove={glow}
          className="um-glow relative z-10 mt-6 grid min-h-[600px] gap-8 overflow-hidden rounded-3xl bg-[#03303f] p-5 shadow-[0_15px_30px_rgba(0,0,0,0.15)] sm:min-h-[650px] sm:p-6 lg:min-h-[550px] lg:grid-cols-[0.8fr_1.1fr_1.2fr] lg:gap-0 lg:p-6"
        >
          {/* Stage list */}
          <div className="lg:pr-6">
            <Reveal
              show={journeyIn}
              delay={550}
              className="flex items-center justify-between border-b border-white/10 pb-3 text-[12px] uppercase tracking-wider text-white"
            >
              <span>Select a stage</span>
              <span className="text-white/40">
                {String(activeStage + 1).padStart(2, "0")} /{" "}
                {String(stages.length).padStart(2, "0")}
              </span>
            </Reveal>

            <div className="mt-4 flex flex-col">
              {stages.map((s, index) => {
                const isActive = activeStage === index;

                return (
                  <Reveal
                    key={s.no}
                    show={journeyIn}
                    anim="um-fade-left"
                    delay={650 + index * 100}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setInteracted(true);
                        setActiveStage(index);
                      }}
                      onMouseMove={glow}
                      aria-pressed={isActive}
                      className={`um-glow relative flex w-full items-center justify-between rounded-xl border px-5 py-4 text-left transition-all duration-300 ${
                        isActive
                          ? "border-white/10 bg-white/[0.08]"
                          : "border-transparent hover:border-white/10 hover:bg-white/[0.04]"
                      }`}
                    >
                      {isActive && (
                        <span className="absolute inset-y-2 left-0 w-[3px] rounded-full bg-[#4fd6c6]" />
                      )}

                      <div className="flex items-start gap-4">
                        <span
                          className={`mt-1 text-[12px] ${
                            isActive ? "text-[#4fd6c6]" : "text-white/60"
                          }`}
                        >
                          {s.no}
                        </span>

                        <div>
                          <p className="text-base font-medium text-white">
                            {s.title}
                          </p>
                          <p className="mt-1 text-[10px] text-white/60">
                            {s.sub}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`ml-3 text-sm transition-all duration-300 ${
                          isActive
                            ? "translate-x-0 text-[#4fd6c6] opacity-100"
                            : "-translate-x-2 opacity-0"
                        }`}
                      >
                        →
                      </span>
                    </button>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* Dynamic stage content (re-animates on every stage change) */}
          <div
            key={`content-${activeStage}`}
            className="flex min-w-0 flex-col border-t border-white/10 pt-6 lg:border-l lg:border-t-0 lg:px-8 lg:pt-0"
          >
            <Reveal
              show={journeyIn}
              delay={base}
              className="flex items-center justify-between text-[9px] uppercase tracking-wider"
            >
              <span className="text-[#4fd6c6]">{currentStage.label}</span>
              <span className="text-white/40">
                STAGE {stages[activeStage].no}
              </span>
            </Reveal>

            <LetterReveal
              as="h3"
              show={journeyIn}
              delay={base + 100}
              step={30}
              className="mt-6 text-4xl font-medium leading-[1.1] text-white sm:text-[40px]"
              lines={currentStage.heading.map((t) => ({ text: t }))}
            />

            <Reveal
              as="p"
              show={journeyIn}
              delay={base + 600}
              className="mt-8 max-w-[320px] text-xs leading-[1.6] text-white/60"
            >
              {currentStage.description}
            </Reveal>

            <Reveal show={journeyIn} delay={base + 750} className="mt-10">
              <p className="text-[8px] uppercase tracking-wider text-white/40">
                What enters
              </p>
              <p className="mt-2 text-xs font-semibold text-white">
                {currentStage.whatEnters}
              </p>
            </Reveal>

            <Reveal
              show={journeyIn}
              delay={base + 900}
              className="mt-8 border-t border-white/10 pt-6 lg:mt-auto"
            >
              <p className="text-[8px] uppercase tracking-wider text-white/40">
                What changes
              </p>
              <p className="mt-2 text-xs font-semibold text-white">
                {currentStage.whatChanges}
              </p>
            </Reveal>
          </div>

          {/* Dynamic image (wipes in on every stage change) */}
          <Reveal
            key={`image-${activeStage}`}
            show={journeyIn}
            anim="um-clip-up"
            delay={base + 100}
            className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-700 lg:ml-6 lg:aspect-auto lg:min-h-[320px]"
          >
            <img
              src={currentStage.image}
              alt={currentStage.alt}
              className={`absolute inset-0 h-full w-full object-cover ${
                journeyIn ? "um-zoom" : ""
              }`}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            <Reveal
              show={journeyIn}
              delay={base + 900}
              className="absolute inset-x-3 bottom-3 rounded-lg bg-black/70 px-4 py-3.5 backdrop-blur-sm"
            >
              <p className="text-[7px] uppercase tracking-wider text-[#4fd6c6]">
                {currentStage.imageLabel}
              </p>
              <p className="mt-2 text-[10px] leading-[1.5] text-white">
                {currentStage.imageDescription}
              </p>
            </Reveal>
          </Reveal>
        </Reveal>
      </section>

      {/* ───────────── PAGE 3: RECOVERED MATERIAL GROUPS ───────────── */}
      <section
        ref={groupsRef}
        className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-[#f4f7f6] px-4 py-12 sm:px-8 lg:px-[4.5%]"
      >
        {/* ambient glow blobs */}
        <div
          aria-hidden="true"
          className="um-float-slow pointer-events-none absolute -left-32 bottom-10 h-[460px] w-[460px] rounded-full bg-[#4fd6c6]/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="um-float pointer-events-none absolute -right-24 top-0 h-[420px] w-[420px] rounded-full bg-[#063343]/10 blur-3xl"
        />

        <div className="relative z-10 grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
          {/* Left text */}
          <div>
            <LetterReveal
              as="h2"
              show={groupsIn}
              step={40}
              className="text-5xl font-semibold leading-[1.05] tracking-tight text-[#063343] sm:text-6xl lg:text-[64px]"
              lines={[
                { text: "Recovered" },
                { text: "material" },
                { text: "groups" },
              ]}
            />
            <Reveal
              as="p"
              show={groupsIn}
              delay={900}
              className="mt-6 max-w-[480px] text-lg leading-[1.2] text-[#1f2a28] sm:text-[21px]"
            >
              Circulogy connects collection, processing and recovered-material
              pathways to keep valuable resources in circulation.
            </Reveal>
          </div>

          {/* Right image card */}
          <Reveal
            show={groupsIn}
            anim="um-clip-right"
            delay={300}
            onMouseMove={glow}
            className="um-glow relative aspect-[3/2] w-full overflow-hidden rounded-3xl bg-gray-200 shadow-[0_20px_40px_rgba(0,0,0,0.15)] lg:aspect-[522/332]"
          >
            <img
              src="images/recovered-materials.png"
              alt="Recovered material samples in glass dishes"
              className={`h-full w-full object-cover ${groupsIn ? "um-zoom" : ""}`}
            />
            <Reveal
              show={groupsIn}
              delay={1400}
              className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-xl bg-black px-4 py-3.5 sm:inset-x-3.5 sm:bottom-3.5 sm:px-5 sm:py-4"
            >
              <span className="text-[11px] font-medium text-white sm:text-xs">
                Qualified outputs from the urban mine
              </span>
              <span className="whitespace-nowrap text-[8px] font-medium uppercase tracking-wide text-[#4fd6c6] sm:text-[9px]">
                06 Material groups
              </span>
            </Reveal>
          </Reveal>
        </div>

        {/* Materials strip */}
        <Reveal
          show={groupsIn}
          delay={1000}
          onMouseMove={glow}
          className="um-glow relative z-10 mt-10 grid grid-cols-2 gap-y-6 rounded-3xl bg-[#0a1f1c] px-6 py-6 shadow-[0_15px_30px_rgba(0,0,0,0.15)] sm:grid-cols-3 lg:mt-12 lg:h-[102px] lg:grid-cols-6 lg:items-center lg:gap-y-0 lg:px-8 lg:py-0"
        >
          {materials.map((m, i) => (
            <Reveal
              key={m.symbol}
              show={groupsIn}
              delay={1200 + i * 90}
              className="group flex flex-col justify-center lg:h-[80px] lg:border-l lg:border-white/10 lg:pl-4 lg:first:border-l-0 lg:first:pl-0"
            >
              <span className="text-2xl font-medium leading-none text-[#4fd6c6] transition-all duration-300 group-hover:translate-x-1 group-hover:drop-shadow-[0_0_12px_rgba(79,214,198,0.9)] sm:text-[26px]">
                {m.symbol}
              </span>
              <span className="mt-4 text-xs font-medium text-white">
                {m.name}
              </span>
            </Reveal>
          ))}
        </Reveal>
      </section>
    </main>
  );
}