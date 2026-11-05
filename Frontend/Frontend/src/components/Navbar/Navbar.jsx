import React, { useState } from "react";
import { X } from "lucide-react";
import Logo from "./Logo";
import NavLinks from "./Navlinks";
import ContactButton from "./ContactButton";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative bg-[#151515] text-white">
      
      {/* Navbar */}
      <div className="h-[70px] sm:h-[80px] md:h-[90px] lg:h-[100px]">
        <div className="mx-auto flex h-full w-full max-w-[1600px] items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 xl:px-[72px]">

          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center">
            <NavLinks />
          </div>

          {/* Desktop Contact Button */}
          <div className="hidden lg:flex">
            <ContactButton />
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center justify-center rounded-md p-2 text-white transition hover:bg-white/10 lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <X size={30} />
            ) : (
              <span className="text-[28px] leading-none">☰</span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute left-0 top-full z-50 w-full bg-[#151515] px-6 py-7 shadow-lg lg:hidden">
          
          {/* Vertical Navigation */}
          <div className="flex flex-col items-start">
            <NavLinks />
          </div>

          {/* Contact Button */}
          <div className="mt-7">
            <ContactButton />
          </div>

        </div>
      )}
    </header>
  );
}

export default Navbar;