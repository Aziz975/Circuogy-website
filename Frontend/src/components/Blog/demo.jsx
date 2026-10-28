import React from "react";
import { Leaf } from "lucide-react";

const CirculogyHero = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#f4fbfd]">
      {/* Background Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          backgroundImage: `
            linear-gradient(rgba(77,154,181,0.10) 1px, transparent 1px),
            linear-gradient(90deg, rgba(77,154,181,0.10) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />


      

      <div className="relative mx-auto flex min-h-[520px] w-full max-w-[1440px] lg:min-h-[560px]">
        {/* =====================================================
            LEFT CONTENT
        ====================================================== */}
        <div className="relative z-20 flex w-full flex-col justify-center px-6 py-16 sm:px-10 md:px-12 lg:w-[52%] lg:px-[44px] lg:py-14 xl:px-[48px]">
          {/* Journal Badge */}
          <div className="mb-7 flex w-fit items-center gap-2 rounded-full border border-[#16b8cc] bg-white/40 px-3.5 py-1.5 sm:mb-8">
            <Leaf
              size={13}
              strokeWidth={2}
              className="text-[#10aec1]"
            />

            <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#079db2] sm:text-[10px]">
              Circulogy Journal
            </span>
          </div>

          {/* Heading */}
          <h1 className="max-w-[570px] text-[48px] font-bold leading-[0.94] tracking-[-0.055em] text-[#080808] sm:text-[58px] md:text-[64px] lg:text-[58px] xl:text-[64px]">
            Insights, Ideas{" "}
            <span className="text-[#0daab9]">&amp;</span>
            <br />
            Impact
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-[555px] text-[13px] font-medium leading-[1.55] tracking-[-0.01em] text-[#586779] sm:mt-7 sm:text-[14px] md:text-[15px]">
            Perspectives from the front line of India&apos;s circular economy —
            on sustainability, waste management, recycling, environmental
            innovation and the industry trends shaping what comes next.
          </p>

          {/* Statistics */}
          <div className="mt-8 flex flex-wrap items-center sm:mt-9">
            {/* Stat 1 */}
            <div className="pr-5 sm:pr-7">
              <div className="text-[21px] font-bold leading-none tracking-[-0.035em] text-[#08a8ba] sm:text-[22px]">
                120+
              </div>

              <div className="mt-1.5 whitespace-nowrap text-[8px] font-medium uppercase tracking-[0.08em] text-[#667482] sm:text-[9px]">
                Articles &amp; Reports
              </div>
            </div>

            {/* Divider */}
            <div className="h-9 w-px bg-[#7ad7e0]" />

            {/* Stat 2 */}
            <div className="px-5 sm:px-7">
              <div className="text-[21px] font-bold leading-none tracking-[-0.035em] text-[#08a8ba] sm:text-[22px]">
                7
              </div>

              <div className="mt-1.5 whitespace-nowrap text-[8px] font-medium uppercase tracking-[0.08em] text-[#667482] sm:text-[9px]">
                Focus Areas
              </div>
            </div>

            {/* Divider */}
            <div className="h-9 w-px bg-[#7ad7e0]" />

            {/* Stat 3 */}
            <div className="pl-5 sm:pl-7">
              <div className="text-[21px] font-bold leading-none tracking-[-0.035em] text-[#08a8ba] sm:text-[22px]">
                Weekly
              </div>

              <div className="mt-1.5 whitespace-nowrap text-[8px] font-medium uppercase tracking-[0.08em] text-[#667482] sm:text-[9px]">
                New Insights
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            RIGHT IMAGE AREA
        ====================================================== */}
        <div className="absolute right-0 top-0 hidden h-full w-[58%] lg:block">
          {/* Curved blue transition */}
          <div className="absolute inset-y-0 left-[-105px] z-10 w-[190px] overflow-hidden">
            <div className="absolute left-[-105px] top-[-100px] h-[650px] w-[330px] rotate-[27deg] rounded-[120px] bg-[#f4fbfd]" />
          </div>

          {/* Image */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              src=""
              alt="Circular economy and electronic waste"
              className="h-full w-full object-cover object-center"
            />

            {/* Soft image overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#f4fbfd]/30 via-transparent to-transparent" />
          </div>
        </div>

        {/* =====================================================
            TABLET IMAGE
        ====================================================== */}
        <div className="relative hidden h-[430px] w-full overflow-hidden md:block lg:hidden">
          <img
            src=""
            alt="Circular economy and electronic waste"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#f4fbfd] via-[#f4fbfd]/80 to-transparent" />

          <div className="absolute inset-0 flex items-center px-10">
            <div className="max-w-[58%]">
              <div className="mb-6 flex w-fit items-center gap-2 rounded-full border border-[#16b8cc] bg-white/60 px-3.5 py-1.5">
                <Leaf size={13} className="text-[#10aec1]" />

                <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#079db2]">
                  Circulogy Journal
                </span>
              </div>

              <h1 className="text-[52px] font-bold leading-[0.94] tracking-[-0.055em] text-[#080808]">
                Insights, Ideas{" "}
                <span className="text-[#0daab9]">&amp;</span>
                <br />
                Impact
              </h1>

              <p className="mt-5 text-[13px] leading-[1.5] text-[#586779]">
                Perspectives from the front line of India&apos;s circular
                economy — on sustainability, waste management, recycling,
                environmental innovation and the industry trends shaping what
                comes next.
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            MOBILE IMAGE
        ====================================================== */}
        <div className="absolute bottom-0 left-0 right-0 h-[230px] overflow-hidden sm:h-[270px] md:hidden">
          <img
            src=""
            alt="Circular economy and electronic waste"
            className="h-full w-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-[#f4fbfd] via-[#f4fbfd]/20 to-transparent" />
        </div>
      </div>

      {/* =====================================================
          MOBILE CONTENT
      ====================================================== */}
      <div className="relative z-20 block px-6 pb-[250px] pt-12 sm:px-10 sm:pb-[290px] sm:pt-14 md:hidden">
        {/* Badge */}
        <div className="mb-7 flex w-fit items-center gap-2 rounded-full border border-[#16b8cc] bg-white/50 px-3.5 py-1.5">
          <Leaf size={13} className="text-[#10aec1]" />

          <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#079db2]">
            Circulogy Journal
          </span>
        </div>

        {/* Heading */}
        <h1 className="max-w-[500px] text-[48px] font-bold leading-[0.94] tracking-[-0.055em] text-[#080808] sm:text-[58px]">
          Insights, Ideas{" "}
          <span className="text-[#0daab9]">&amp;</span>
          <br />
          Impact
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-[570px] text-[13px] font-medium leading-[1.55] text-[#586779] sm:text-[14px]">
          Perspectives from the front line of India&apos;s circular economy —
          on sustainability, waste management, recycling, environmental
          innovation and the industry trends shaping what comes next.
        </p>

        {/* Stats */}
        <div className="mt-8 flex items-center">
          <div className="pr-4">
            <div className="text-[20px] font-bold leading-none text-[#08a8ba]">
              120+
            </div>

            <div className="mt-1 text-[7px] uppercase tracking-[0.07em] text-[#667482]">
              Articles &amp; Reports
            </div>
          </div>

          <div className="h-9 w-px bg-[#7ad7e0]" />

          <div className="px-4">
            <div className="text-[20px] font-bold leading-none text-[#08a8ba]">
              7
            </div>

            <div className="mt-1 text-[7px] uppercase tracking-[0.07em] text-[#667482]">
              Focus Areas
            </div>
          </div>

          <div className="h-9 w-px bg-[#7ad7e0]" />

          <div className="pl-4">
            <div className="text-[20px] font-bold leading-none text-[#08a8ba]">
              Weekly
            </div>

            <div className="mt-1 text-[7px] uppercase tracking-[0.07em] text-[#667482]">
              New Insights
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CirculogyHero;