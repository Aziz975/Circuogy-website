import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowLeft, Triangle, RotateCcw } from "lucide-react";

export default function MiningCompare() {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const containerRef = useRef(null);
  const sectionRef = useRef(null);

  /* =========================
     VIEWPORT ANIMATION
  ========================= */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(false);

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setIsVisible(true);
            });
          });
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  /* =========================
     SLIDER POSITION
  ========================= */
  const updatePosition = (clientX) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    let newPosition = ((clientX - rect.left) / rect.width) * 100;

    newPosition = Math.max(5, Math.min(95, newPosition));

    setPosition(newPosition);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handleTouchMove = (e) => {
    updatePosition(e.touches[0].clientX);
  };

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-[#f5f6f1] px-4 py-10 sm:px-6 md:px-8 lg:px-10 xl:px-[3.6%] xl:py-12"
    >
      {/* =========================
          COMPARISON CONTAINER
      ========================= */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => setIsDragging(false)}
        className={`relative mx-auto h-[430px] w-full max-w-[1500px] select-none overflow-hidden rounded-[22px] bg-[#073f3d] shadow-[0_30px_80px_rgba(3,54,50,0.18)] sm:h-[500px] md:h-[560px] lg:h-[600px] ${
          isVisible ? "compare-container-visible" : "compare-container-hidden"
        }`}
      >
        {/* =========================
            LEFT IMAGE
        ========================= */}
        <div
          className={`absolute inset-0 overflow-hidden ${
            isVisible ? "mining-image-visible" : "mining-image-hidden-left"
          }`}
        >
          <div className="mining-image-zoom absolute inset-0">
            <img
              src="images/traditional_mining.png"
              alt="Traditional Mining"
              className="h-full w-full object-cover"
              draggable="false"
            />
          </div>

          {/* LEFT OVERLAY */}
          <div className="absolute inset-0 bg-[#052c2b]/35" />

          {/* LEFT CONTENT */}
          <div
            className={`absolute bottom-[24%] left-7 z-10 transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:left-10 md:left-12 lg:left-12 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-16 opacity-0"
            }`}
          >
            <div className="mb-4">
              <Triangle
                size={38}
                strokeWidth={1.4}
                className={`text-[#20d0bd] ${
                  isVisible ? "mining-icon-animation" : ""
                }`}
              />
            </div>

            <h2 className="text-xl font-semibold tracking-wide text-white sm:text-2xl md:text-3xl">
              TRADITIONAL MINING
            </h2>

            <p className="mt-2 text-xs text-white/65 sm:text-sm">
              Extracting from the earth
            </p>
          </div>
        </div>

        {/* =========================
            RIGHT IMAGE
        ========================= */}
        <div
          className={`absolute inset-y-0 right-0 overflow-hidden ${
            isVisible ? "mining-right-reveal" : "mining-right-hidden"
          }`}
          style={{
            width: `${100 - position}%`,
          }}
        >
          <div
            className="absolute inset-y-0 right-0"
            style={{
              width: `${100 / (100 - position) * 100}%`,
              maxWidth: "none",
            }}
          >
            <div className="mining-image-zoom absolute inset-0">
              <img
                src="images/urban_mining.png"
                alt="Urban Mining"
                className="h-full w-full object-cover"
                draggable="false"
              />
            </div>
          </div>

          {/* RIGHT OVERLAY */}
          <div className="absolute inset-0 bg-[#073f3d]/35" />

          {/* RIGHT CONTENT */}
          <div
            className={`absolute bottom-[24%] right-7 z-10 transition-all duration-[1200ms] delay-200 ease-[cubic-bezier(0.22,1,0.36,1)] sm:right-10 md:right-12 lg:right-12 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-16 opacity-0"
            }`}
          >
            <div className="mb-4 flex justify-end">
              <RotateCcw
                size={38}
                strokeWidth={1.4}
                className={`text-[#20d0bd] ${
                  isVisible ? "mining-icon-animation" : ""
                }`}
              />
            </div>

            <h2 className="text-right text-xl font-semibold tracking-wide text-white sm:text-2xl md:text-3xl">
              URBAN MINING
            </h2>

            <p className="mt-2 text-right text-xs text-white/65 sm:text-sm">
              Recovering from devices
            </p>
          </div>
        </div>

        {/* =========================
            CENTER DIVIDER
        ========================= */}
        <div
          className="absolute inset-y-0 z-30 w-[2px] bg-white/80"
          style={{
            left: `${position}%`,
            transform: "translateX(-50%)",
            transition: isDragging
              ? "none"
              : "left 700ms cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {/* DRAG LABEL */}
          <div
            className={`absolute left-1/2 top-5 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#173c39]/90 px-4 py-2 text-[8px] font-bold tracking-[0.25em] text-white/90 backdrop-blur-sm transition-all duration-700 sm:text-[9px] ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "-translate-y-5 opacity-0"
            }`}
          >
            DRAG TO COMPARE
          </div>

          {/* =========================
              HANDLE
          ========================= */}
          <button
            type="button"
            aria-label="Drag to compare"
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
            className={`absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-white text-[#18a997] shadow-[0_10px_35px_rgba(0,0,0,0.3)] transition-all duration-500 sm:h-14 sm:w-14 ${
              isVisible
                ? "scale-100 opacity-100"
                : "scale-50 opacity-0"
            } ${
              isDragging
                ? "scale-110"
                : "hover:scale-110"
            }`}
          >
            <span className="flex items-center">
              <ArrowLeft
                size={18}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />

              <ArrowRight
                size={18}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>

            {/* HANDLE RING */}
            <span className="absolute inset-[-5px] rounded-full border border-white/40" />
          </button>
        </div>

        {/* =========================
            MOVING LIGHT EFFECT
        ========================= */}
        <div
          className={`pointer-events-none absolute inset-y-0 z-20 w-[120px] bg-gradient-to-r from-transparent via-white/10 to-transparent ${
            isVisible ? "light-sweep" : "opacity-0"
          }`}
        />
      </div>
    </section>
  );
}