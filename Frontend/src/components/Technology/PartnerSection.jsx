import React from "react";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";


export default function PartnerSection() {
  return (
    <section className="relative max-w-[1600px] overflow-hidden bg-[#031614] px-5 py-14 sm:px-8 sm:py-16 md:px-10 md:py-20 lg:min-h-[568px] lg:px-6 lg:py-12 xl:px-8">

      {/* ================= GRID BACKGROUND ================= */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.55]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,104,98,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(18,104,98,0.18)_1px,transparent_1px)] bg-[length:46px_46px]" />
      </div>

      {/* ================= DARK OVERLAY ================= */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_50%,rgba(0,170,157,0.08),transparent_38%),radial-gradient(circle_at_85%_50%,rgba(0,111,105,0.07),transparent_35%)]" />

      <div className="relative mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-[60px]">

        {/* ================================================= */}
        {/* LEFT CONTENT */}
        {/* ================================================= */}

        <div className="relative z-10">

          {/* TOP LABEL */}
          <div className="mb-6 flex items-center gap-3 sm:mb-7">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#19cdb5] sm:text-[11px]">
              WORK WITH US
            </span>
          </div>

          {/* HEADING */}
          <h1 className="max-w-[530px] text-[45px] font-bold leading-[0.93] tracking-[-0.055em] text-[#f7f9f8] sm:text-[53px] md:text-[59px] lg:text-[57px] xl:text-[60px]">
            Partner with
            <br />

            India's
            <br />

            <span className="text-[#19cdb5]">
              critical mineral
            </span>
            <br />

            and
            <br />

            <span className="text-[#19cdb5]">
              rare earth refinery.
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-6 max-w-[465px] text-[14px] font-normal leading-[1.45] tracking-[-0.01em] text-[#d0d9d7] sm:text-[15px] md:mt-7">
            Whether you are an industrial buyer of critical minerals
            or rare earths, an OEM with end-of-life battery or
            magnet streams, or an investor — Circulogy is building
            the infrastructure India needs.
          </p>

          {/* BUTTONS */}
          <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:items-center">

            {/* Get in Touch */}
            <Link
              to="/contactus"
              className="group flex h-[47px] w-full items-center justify-center gap-2 rounded-full bg-[#19cdb5] px-7 text-[13px] font-semibold text-[#06221f] shadow-[0_0_25px_rgba(25,205,181,0.12)] sm:w-auto"
            >
              <span>Get in Touch</span>
              <ArrowRight size={16} strokeWidth={2} />
            </Link>

            {/* About Circulogy */}
            <Link
              to="/about"
              className="flex h-[47px] w-full items-center justify-center rounded-full border border-[#64716f] bg-[#293332]/80 px-7 text-[13px] font-semibold text-[#f3f5f4] sm:w-auto"
            >
              About Circulogy
            </Link>

          </div>
        </div>

        
      </div>
    </section>
  );
}