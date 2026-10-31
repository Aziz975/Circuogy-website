
import React, { useEffect } from "react";

const ContactPage = () => {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      elements.forEach((element) => {
        element.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const renderLetters = (text, startDelay = 0) =>
    Array.from(text).map((letter, index) => (
      <span
        key={`${index}-${letter}`}
        aria-hidden="true"
        className="contact-letter"
        style={{
          animationDelay: `${startDelay + index * 0.035}s`,
        }}
      >
        {letter === " " ? "\u00A0" : letter}
      </span>
    ));

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your enquiry has been submitted.");
  };

  return (
    <main className="contact-page min-h-screen w-full max-w-none overflow-x-clip bg-[#D9EFEC] font-sans">

      {/* =====================================================
          ANIMATION STYLES
      ===================================================== */}
      <style>{`
        .contact-page {
          --contact-teal: #299D8D;
          --contact-dark: #07545A;
        }

        /* Main heading letter reveal */
        .contact-letter {
          display: inline-block;
          opacity: 0;
          transform: translate3d(0, 110%, 0);
          animation: contactLetterReveal 0.75s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          will-change: transform, opacity;
        }

        @keyframes contactLetterReveal {
          from {
            opacity: 0;
            transform: translate3d(0, 110%, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        /* Main page entrance */
        .contact-page-enter {
          animation: contactPageEnter 0.85s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes contactPageEnter {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Scroll reveal */
        .contact-reveal {
          opacity: 0;
          transform: translate3d(0, 25px, 0);
          transition:
            opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .contact-reveal.is-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        .contact-delay-1 {
          transition-delay: 0.1s;
        }

        .contact-delay-2 {
          transition-delay: 0.2s;
        }

        .contact-delay-3 {
          transition-delay: 0.3s;
        }

        /* Floating material artwork */
        .contact-material {
          animation: contactMaterialFloat 5s ease-in-out infinite;
          transform-origin: center;
        }

        @keyframes contactMaterialFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-7px);
          }
        }

        /* Glowing button */
        .contact-glow {
          position: relative;
          isolation: isolate;
          box-shadow: 0 4px 14px rgba(7, 84, 90, 0.12);
          transition:
            background-color 0.3s ease,
            box-shadow 0.35s ease,
            transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .contact-glow::before {
          content: "";
          position: absolute;
          inset: -3px;
          z-index: -1;
          border-radius: inherit;
          background: linear-gradient(
            120deg,
            rgba(41, 157, 141, 0.75),
            rgba(86, 197, 176, 0.25),
            rgba(7, 84, 90, 0.7)
          );
          filter: blur(12px);
          opacity: 0;
          transition: opacity 0.35s ease;
        }

        .contact-glow:hover {
          background-color: #299D8D;
          box-shadow:
            0 8px 24px rgba(41, 157, 141, 0.28),
            0 0 30px rgba(41, 157, 141, 0.2);
          transform: translateY(-2px);
        }

        .contact-glow:hover::before {
          opacity: 1;
        }

        .contact-glow:active {
          transform: translateY(0) scale(0.98);
        }

        .contact-glow:focus-visible {
          outline: 2px solid #299D8D;
          outline-offset: 4px;
        }

        .contact-arrow {
          transition:
            transform 0.3s ease,
            background-color 0.3s ease;
        }

        .contact-glow:hover .contact-arrow {
          transform: rotate(45deg);
          background-color: #07545A;
        }

        /* Input focus animation */
        .contact-input {
          transition:
            border-color 0.3s ease,
            box-shadow 0.3s ease;
        }

        .contact-input:focus {
          border-color: #299D8D;
          box-shadow: 0 2px 0 rgba(41, 157, 141, 0.12);
        }

        /* Contact information hover */
        .contact-info-item {
          transition: transform 0.3s ease;
        }

        .contact-info-item:hover {
          transform: translateY(-3px);
        }

        @media (prefers-reduced-motion: reduce) {
          .contact-letter {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }

          .contact-page-enter,
          .contact-reveal {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }

          .contact-material {
            animation: none !important;
          }

          .contact-glow,
          .contact-info-item {
            transition: none !important;
          }
        }
      `}</style>

      {/* =====================================================
          HERO SECTION
      ===================================================== */}
      <section className="contact-page-enter relative flex min-h-[300px] w-full flex-col items-center justify-center px-4 pb-9 pt-10 text-center sm:min-h-[330px] sm:px-6 sm:pt-12 md:px-8 lg:min-h-[350px] lg:px-10 lg:pt-14">

        {/* Background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-10 -z-0 h-40 w-[75%] max-w-[700px] -translate-x-1/2 rounded-full bg-[#8CCFC5]/25 blur-[70px]"
        />

        <p
          data-reveal
          className="contact-reveal relative mb-5 text-[14px] font-extrabold uppercase tracking-[2px] text-[#07545A] sm:text-[16px] md:text-[18px]"
        >
          Contact Circulogy
        </p>

        <h1 className="relative z-10 max-w-[1250px] text-[32px] font-semibold leading-[1.12] tracking-[-1.2px] sm:text-[40px] sm:tracking-[-1.5px] md:text-[52px] lg:text-[66px] lg:tracking-[-2px] xl:text-[74px]">

          <span className="block pb-1 text-[#299D8D]">
            {renderLetters("Contact us to build the next", 0.1)}
          </span>

          <span className="mt-1 block text-black">
            <span className="inline-block">
              {renderLetters("material recovery", 0.55)}
            </span>{" "}
            <span className="inline-block text-[#299D8D]">
              {renderLetters("solution.", 1.15)}
            </span>
          </span>

        </h1>

        <p
          data-reveal
          className="contact-reveal contact-delay-2 relative mx-auto mt-6 max-w-[760px] text-[14px] leading-6 text-[#58736F] sm:text-[16px] md:text-[18px] md:leading-7"
        >
          Talk to us about collection, recovered materials, technology partnerships
          <br className="hidden sm:block" />
          or working with Circulogy.
        </p>
      </section>

      {/* =====================================================
          CONTACT SECTION
      ===================================================== */}
      <section className="relative w-full rounded-t-[23px] bg-[#FAFCFB]">

        <div className="mx-auto w-full px-5 sm:px-7 md:px-8 lg:px-10 xl:px-12 2xl:px-16">

          <div className="grid grid-cols-1 gap-10 pb-10 pt-10 md:grid-cols-[0.85fr_1.15fr] md:gap-8 md:pb-12 md:pt-12 lg:gap-10 lg:pt-14 xl:grid-cols-[0.8fr_1.2fr] xl:gap-12">

            {/* LEFT COLUMN */}
            <div className="grid min-w-0 grid-cols-1 gap-6 sm:grid-cols-[180px_minmax(0,1fr)] md:grid-cols-1 lg:grid-cols-[180px_minmax(0,1fr)] xl:grid-cols-[200px_minmax(0,1fr)] lg:gap-5">

              {/* MATERIAL IMAGE */}
              <div
                data-reveal
                className="contact-reveal relative hidden items-start justify-center sm:flex md:hidden lg:flex"
              >
                <img
                  src="/images/material-sculpture.png"
                  alt="Recovered copper and industrial materials"
                  className="contact-material h-auto w-full max-w-[200px] object-contain"
                />
              </div>

              {/* CONTACT INFORMATION */}
              <div
                data-reveal
                className="contact-reveal min-w-0 md:border-r md:border-[#E5ECE9] md:pr-6 lg:border-r-0 lg:pr-0 xl:border-r xl:border-[#E5ECE9] xl:pr-7"
              >
                <p className="mb-6 text-[16px] font-extrabold uppercase tracking-[1.1px] text-[#299D8D] sm:text-[17px] sm:tracking-[1.3px]">
                  Contact Information
                </p>

                <div className="grid grid-cols-1 gap-x-5 gap-y-6 sm:grid-cols-2 lg:gap-x-6">

                  {/* EMAIL */}
                  <div className="contact-info-item min-w-0">
                    <h3 className="mb-2 text-[15px] font-bold text-[#152A27]">
                      Email
                    </h3>

                    <a
                      href="mailto:info@circulogy.com"
                      className="break-words text-[12px] text-[#82938F] transition-colors hover:text-[#299D8D] sm:text-[13px]"
                    >
                      info@circulogy.com
                    </a>
                  </div>

                  {/* PHONE */}
                  <div className="contact-info-item min-w-0">
                    <h3 className="mb-2 text-[15px] font-bold text-[#152A27]">
                      Phone
                    </h3>

                    <a
                      href="tel:+918650907362"
                      className="text-[12px] text-[#82938F] transition-colors hover:text-[#299D8D] sm:text-[13px]"
                    >
                      +91 86509 07362
                    </a>
                  </div>

                  {/* OFFICE ADDRESS */}
                  <div className="contact-info-item min-w-0">
                    <h3 className="mb-2 text-[15px] font-bold text-[#152A27]">
                      Office Address
                    </h3>

                    <p className="text-[12px] leading-[19px] text-[#82938F] sm:text-[13px]">
                      18/15B, Silver Wing Wave One, Sector 18,
                      GB Nagar, Noida, Uttar Pradesh 201301
                    </p>
                  </div>

                  {/* BUSINESS HOURS */}
                  <div className="contact-info-item min-w-0">
                    <h3 className="mb-2 text-[15px] font-bold text-[#152A27]">
                      Business Hours
                    </h3>

                    <p className="text-[12px] leading-[19px] text-[#82938F] sm:text-[13px]">
                      Mon-Sat
                      <br />
                      10:00 AM-7:00 PM
                    </p>
                  </div>

                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: CONTACT FORM */}
            <div
              data-reveal
              className="contact-reveal min-w-0 md:border-l md:border-[#E5ECE9] md:pl-7 lg:border-l-0 lg:pl-0 xl:pl-8"
            >

              <h2 className="text-[24px] font-extrabold leading-tight tracking-[-0.8px] text-[#102522] sm:text-[27px] lg:text-[30px]">
                Start the conversation
              </h2>

              <p className="mb-7 mt-2 text-[12px] text-[#9AA9A5] sm:text-[13px]">
                Share your requirement and we'll route it to the relevant team.
              </p>

              <form
                className="grid grid-cols-1 gap-x-7 gap-y-7 sm:grid-cols-2 lg:gap-x-10"
                onSubmit={handleSubmit}
              >

                {/* FULL NAME */}
                <div className="min-w-0">
                  <label
                    htmlFor="contact-full-name"
                    className="mb-2 block text-[10px] font-bold tracking-[0.8px] text-[#899B96]"
                  >
                    FULL NAME
                  </label>

                  <input
                    id="contact-full-name"
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    autoComplete="name"
                    required
                    className="contact-input w-full min-w-0 border-0 border-b border-[#DFE8E5] bg-transparent pb-3 text-sm text-[#18332E] outline-none placeholder:text-[#B2BFBB]"
                  />
                </div>

                {/* WORK EMAIL */}
                <div className="min-w-0">
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-[10px] font-bold tracking-[0.8px] text-[#899B96]"
                  >
                    WORK EMAIL
                  </label>

                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder="you@company.com"
                    autoComplete="email"
                    required
                    className="contact-input w-full min-w-0 border-0 border-b border-[#DFE8E5] bg-transparent pb-3 text-sm text-[#18332E] outline-none placeholder:text-[#B2BFBB]"
                  />
                </div>

                {/* ORGANISATION */}
                <div className="min-w-0">
                  <label
                    htmlFor="contact-organisation"
                    className="mb-2 block text-[10px] font-bold tracking-[0.8px] text-[#899B96]"
                  >
                    ORGANISATION
                  </label>

                  <input
                    id="contact-organisation"
                    type="text"
                    name="organisation"
                    placeholder="Your organisation"
                    autoComplete="organization"
                    className="contact-input w-full min-w-0 border-0 border-b border-[#DFE8E5] bg-transparent pb-3 text-sm text-[#18332E] outline-none placeholder:text-[#B2BFBB]"
                  />
                </div>

                {/* DISCUSSION TOPIC */}
                <div className="min-w-0">
                  <label
                    htmlFor="contact-discussion"
                    className="mb-2 block text-[10px] font-bold tracking-[0.8px] text-[#899B96]"
                  >
                    WHAT WOULD YOU LIKE TO DISCUSS?
                  </label>

                  <input
                    id="contact-discussion"
                    type="text"
                    name="discussion"
                    placeholder="Tell us about your requirement"
                    required
                    className="contact-input w-full min-w-0 border-0 border-b border-[#DFE8E5] bg-transparent pb-3 text-sm text-[#18332E] outline-none placeholder:text-[#B2BFBB]"
                  />
                </div>

                {/* FORM FOOTER */}
                <div className="flex flex-col gap-5 pb-4 pt-1 sm:col-span-2 lg:flex-row lg:items-center lg:justify-between">

                  <p className="max-w-[340px] text-[12px] leading-5 text-[#9AA9A5] sm:text-[13px]">
                    Material recovery, partnerships, careers and media.
                  </p>

                  <button
                    type="submit"
                    className="contact-glow group inline-flex shrink-0 items-center gap-3 self-start whitespace-nowrap rounded-full bg-[#07545A] py-[7px] pl-5 pr-2 text-[14px] font-bold text-white sm:text-[15px] lg:self-auto"
                  >
                    Send enquiry

                    <span className="contact-arrow flex h-[27px] w-[27px] shrink-0 items-center justify-center rounded-full bg-[#56C5B0]">
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7 17L17 7M7 7h10v10" />
                      </svg>
                    </span>
                  </button>

                </div>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          MOBILE MATERIAL IMAGE
      ===================================================== */}
      <div
        data-reveal
        className="contact-reveal flex justify-center bg-[#FAFCFB] px-5 pb-8 sm:hidden"
      >
        <img
          src="/images/material-sculpture.png"
          alt="Recovered industrial materials"
          className="contact-material h-auto w-[190px] max-w-full object-contain"
        />
      </div>



   
    <section className="w-full bg-white px-6 py-10 md:px-12">
      <div className="mx-auto max-w-[1340px]">
        {/* Heading */}
        <p className="text-[15px] font-extrabold uppercase tracking-[0.2em] text-[#0b4f5c]">
          Our Office
        </p>
        <h2 className="mt-3 text-4xl font-extrabold text-[#0a2a2a] md:text-[50px]">
          Find us in <span className="text-[#2a9d8f]">Noida.</span>
        </h2>
        <p className="mt-3 text-[15px] text-[#5c6f6f]">
          A clear view of our office and the surrounding Sector 132 landmarks.
        </p>

        {/* Map container */}
        <div className="relative mt-5 p-5 rounded-[28px] border border-[#cfe3df] bg-gradient-to-r from-[#eaf4f2] to-[#f5f5f1]">
          {/* Map */}
          <div className="h-[560px] overflow-hidden  w-full md:ml-0 md:h-[533px] md:pl-[300px]">
            <img src="images/circulogymap.png" alt=""
            className="w-full h-full rounded-3xl" />
          </div>

          {/* Info card */}
          <div className="absolute left-5 top-5 w-[253px] rounded-3xl bg-white p-6 shadow-[0_10px_40px_rgba(11,79,92,0.12)] max-md:static max-md:m-5 max-md:w-auto md:bottom-5">
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#2a9d8f]">
              Visit Circulogy
            </p>
            <h3 className="mt-3 text-[21px] font-extrabold leading-tight text-[#0a2a2a]">
              Our Noida office
            </h3>
            <p className="mt-3 text-[13px] leading-[1.6] text-[#6b7b7b]">
              Located inside ATS Bouquet,
              <br />
              close to the Noida Expressway.
            </p>

            <div className="my-4 h-px bg-[#e6eceb]" />

            <div className="space-y-4">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#0a2a2a]">
                  Office Address
                </p>
                <p className="mt-1.5 text-[13px] leading-[1.7] text-[#5c6f6f]">
                  307, Tower B, ATS Bouquet
                  <br />
                  Sector 132, Noida
                  <br />
                  Uttar Pradesh 201304
                </p>
              </div>
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#0a2a2a]">
                  Coordinates
                </p>
                <p className="mt-1.5 text-[13px] text-[#5c6f6f]">28.510086, 77.379890</p>
              </div>
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#0a2a2a]">
                  Nearby Landmark
                </p>
                <p className="mt-1.5 text-[13px] text-[#5c6f6f]">Jaypee Wishtown Internal Road</p>
              </div>
            </div>

            <a
              href="https://www.google.com/maps?q=28.510086,77.379890"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-3 rounded-full bg-[#0b4a54] py-3 pl-5 pr-2 text-[11px] font-bold text-white transition hover:bg-[#093d46]"
            >
              Open in Google Maps
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2a9d8f] text-xs">
                ↗
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>


    </main>
  );
};

export default ContactPage;
