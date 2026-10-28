import React from "react";
import { ArrowRight } from "lucide-react";

export default function JourneyCard() {
  return (
    <div className="group relative flex h-[510px] w-full max-w-[310px] flex-col overflow-hidden rounded-[18px] bg-[#00504e] text-white shadow-[0_10px_30px_rgba(0,70,65,0.12)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:shadow-[0_22px_45px_rgba(0,70,65,0.2)]">
      
      {/* Content */}
      <div className="relative z-20 px-5 pt-5 sm:px-6 sm:pt-6">
        
        {/* Year + Arrow */}
        <div className="flex items-center justify-between">
          <span className="inline-flex h-[42px] items-center rounded-full bg-[#087d78] px-5 text-[16px] font-medium text-white transition-all duration-500 group-hover:scale-105 group-hover:bg-[#10958d]">
            2025
          </span>

          <div className="flex h-[43px] w-[43px] items-center justify-center rounded-full bg-[#087d78] text-white transition-all duration-500 group-hover:rotate-[-35deg] group-hover:scale-110 group-hover:bg-[#10958d]">
            <ArrowRight size={21} strokeWidth={1.7} />
          </div>
        </div>

        {/* Title */}
        <h3 className="mt-5 text-[20px] font-semibold leading-[1.1] tracking-[-0.02em] text-white transition-all duration-500 group-hover:-translate-y-1 sm:text-[21px]">
          Founded
        </h3>

        {/* Description */}
        <p className="mt-3 max-w-[270px] text-[14px] leading-[1.4] text-white/90 transition-all duration-500 group-hover:-translate-y-1 group-hover:text-white sm:text-[15px]">
          DPIIT-recognised DeepTech startup incorporated and headquartered in
          Noida, registered in Meerut, UP.
        </p>

      </div>


      {/* Image + Gradient Merge */}
      <div className="absolute inset-x-0 bottom-0 h-[275px] overflow-hidden">
        
        {/* Image */}
        <img
          src="images/founded.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Main Blend */}
        <div className="absolute inset-x-0 top-0 h-[145px] bg-gradient-to-b from-[#00504e] via-[#00504e]/80 via-[45%] to-transparent" />

        {/* Extra Blur/Glow at Image Start */}
        <div className="absolute inset-x-0 top-0 h-[105px] bg-gradient-to-b from-[#00504e] via-[#00504e]/60 to-transparent blur-[5px]" />

        {/* Bottom Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#003f3d]/30 via-transparent to-transparent" />

      </div>


      {/* Content Protection Gradient */}
      <div className="pointer-events-none absolute inset-x-0 top-[125px] z-10 h-[100px] bg-gradient-to-b from-[#00504e] via-[#00504e]/80 to-transparent" />

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 z-30 h-[3px] w-0 bg-[#36b5a4] transition-all duration-700 ease-out group-hover:w-full" />

    </div>
  );
}