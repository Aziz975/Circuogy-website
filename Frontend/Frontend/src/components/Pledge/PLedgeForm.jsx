import React, { useEffect, useRef, useState } from "react";

export default function PledgeForm() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const currentSection = sectionRef.current;
    if (!currentSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(false);

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setVisible(true);
            });
          });
        } else {
          setVisible(false);
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(currentSection);

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Add your form submission API or backend integration here.
    alert("Thank you for taking the sustainability pledge!");
  };

  return (
    <section
      ref={sectionRef}
      className={`w-full overflow-hidden bg-[#f5faf7] px-4 py-10 sm:px-6 sm:py-12 md:px-10 md:py-14 lg:px-16 lg:py-16 xl:px-20 ${
        visible
          ? "animate-[fadeUp_0.9s_ease-out_forwards]"
          : "opacity-0"
      }`}
    >
      {/* MAIN CARD */}
      <div className="mx-auto grid w-full max-w-[1450px] overflow-hidden rounded-2xl bg-[#071211] sm:rounded-3xl lg:grid-cols-2">
        {/* LEFT CONTENT */}
        <div className="flex min-w-0 flex-col justify-center p-6 sm:p-9 md:p-12 lg:p-10 xl:p-16">
          <p className="mb-4 text-[11px] font-extrabold uppercase tracking-[2.5px] text-[#079e99] sm:mb-6 sm:text-[13px] sm:tracking-[3px]">
            Signature
          </p>

          <h2 className="max-w-[600px] text-[clamp(27px,6vw,38px)] font-bold leading-[1.15] tracking-[-1px] text-white sm:text-[42px] sm:leading-[1.13] md:text-5xl lg:text-[clamp(32px,3.1vw,46px)] xl:text-[52px]">
            “Because caring for
            <br className="hidden sm:block" /> Earth is not optional
            <br className="hidden sm:block" /> it’s a responsibility we
            <br className="hidden sm:block" /> all share.”
          </h2>

          <p className="mt-5 max-w-lg text-[14px] leading-6 text-gray-400 sm:mt-7 sm:text-[16px] sm:leading-7">
            I hereby pledge to follow the sustainability practices outlined
            above and commit to acting responsibly for a greener,
            circular future.
          </p>

          {/* DECORATIVE ACCENT */}
          <div className="mt-7 h-1 w-16 rounded-full bg-[#35a98f] sm:mt-9 sm:w-20" />
        </div>

        {/* RIGHT FORM */}
        <div className="min-w-0 bg-[#101615] p-6 sm:p-9 md:p-12 lg:p-10 xl:p-16">
          <div className="mb-6 sm:mb-8">
            <h3 className="text-xl font-bold tracking-[-0.5px] text-white sm:text-2xl">
              Make Your Pledge
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-400">
              Add your details and take a step toward a sustainable future.
            </p>
          </div>

          <form className="flex w-full flex-col gap-5" onSubmit={handleSubmit}>
            {/* NAME */}
            <div className="flex min-w-0 flex-col">
              <label
                htmlFor="pledge-name"
                className="mb-2 text-[12px] font-bold uppercase tracking-[1.8px] text-white sm:text-[13px]"
              >
                Name
              </label>

              <input
                id="pledge-name"
                name="name"
                type="text"
                placeholder="Enter your name"
                autoComplete="name"
                required
                className="h-12 w-full min-w-0 rounded-lg border border-[#34403e] bg-[#181e1d] px-4 text-[14px] font-medium text-white outline-none transition duration-300 placeholder:text-gray-500 focus:border-[#35a98f] focus:ring-2 focus:ring-[#35a98f]/20 sm:h-[50px] sm:text-[15px]"
              />
            </div>

            {/* EMAIL */}
            <div className="flex min-w-0 flex-col">
              <label
                htmlFor="pledge-email"
                className="mb-2 text-[12px] font-bold uppercase tracking-[1.8px] text-white sm:text-[13px]"
              >
                Email
              </label>

              <input
                id="pledge-email"
                name="email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                required
                className="h-12 w-full min-w-0 rounded-lg border border-[#34403e] bg-[#181e1d] px-4 text-[14px] font-medium text-white outline-none transition duration-300 placeholder:text-gray-500 focus:border-[#35a98f] focus:ring-2 focus:ring-[#35a98f]/20 sm:h-[50px] sm:text-[15px]"
              />
            </div>

            {/* SIGNATURE */}
            <div className="flex min-w-0 flex-col">
              <label
                htmlFor="pledge-signature"
                className="mb-2 text-[12px] font-bold uppercase tracking-[1.8px] text-white sm:text-[13px]"
              >
                Signature
              </label>

              <input
                id="pledge-signature"
                name="signature"
                type="text"
                placeholder="Type your signature"
                autoComplete="off"
                required
                className="h-12 w-full min-w-0 rounded-lg border border-[#34403e] bg-[#181e1d] px-4 text-[14px] font-medium text-white outline-none transition duration-300 placeholder:text-gray-500 focus:border-[#35a98f] focus:ring-2 focus:ring-[#35a98f]/20 sm:h-[50px] sm:text-[15px]"
              />
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="mt-1 flex min-h-[48px] w-full items-center justify-center gap-3 rounded-full bg-[#35a98f] px-5 py-3 text-[14px] font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#258c75] focus:outline-none focus:ring-2 focus:ring-[#35a98f] focus:ring-offset-2 focus:ring-offset-[#101615] active:translate-y-0 sm:mt-2 sm:min-h-[52px] sm:text-[16px]"
            >
              I Pledge Now
              <span className="text-xl" aria-hidden="true">
                →
              </span>
            </button>

            <p className="text-center text-[11px] leading-5 text-gray-500 sm:text-xs">
              Together, we can build a greener and more sustainable future.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}