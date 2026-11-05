import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";

function NavLinks({ onNavigate }) {
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const dropdownRef = useRef(null);

  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Technology", path: "/technology", dropdown: true },
    { name: "Resources", path: "/resources", dropdown: true },
    { name: "Career", path: "/career" },
    { name: "About Us", path: "/about" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setResourcesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close dropdown and mobile menu after navigation
  const handleLinkClick = () => {
    setResourcesOpen(false);
    onNavigate?.();
  };

  return (
    <nav className="flex flex-col items-start gap-5 lg:flex-row lg:items-center lg:gap-8 xl:gap-[42px]">

      {navLinks.map((item) => {

        // Resources Dropdown
        if (item.name === "Resources") {
          const isActive =
            location.pathname === "/blog" ||
            location.pathname === "/news" ||
            location.pathname === "/resources";

          return (
            <div
              key={item.name}
              ref={dropdownRef}
              className="relative w-full lg:w-auto"
            >
              <button
                type="button"
                onClick={() => setResourcesOpen(!resourcesOpen)}
                aria-expanded={resourcesOpen}
                className={`flex w-full items-center gap-1 text-[16px] font-bold transition-colors duration-200 hover:text-[#35a99b] lg:w-auto lg:text-[16px] xl:text-[17px] ${isActive ? "text-[#35a99b]" : "text-white"
                  }`}
              >
                <span>Resources</span>

                <ChevronDown
                  size={17}
                  strokeWidth={2}
                  className={`transition-transform duration-300 ${resourcesOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute left-0 top-full z-[100] mt-3 w-[190px] origin-top rounded-xl border border-white/10 bg-[#202020] p-2 shadow-xl transition-all duration-300 lg:left-0 ${resourcesOpen
                    ? "visible translate-y-0 scale-100 opacity-100"
                    : "invisible -translate-y-2 scale-95 opacity-0"
                  }`}
              >
                <Link
                  to="/blog"
                  onClick={handleLinkClick}
                  className={`block rounded-lg px-4 py-3 text-[15px] font-medium transition-colors duration-200 hover:bg-white/10 hover:text-[#35a99b] ${location.pathname === "/blog"
                      ? "bg-white/10 text-[#35a99b]"
                      : "text-white"
                    }`}
                >
                  Blog
                </Link>

                {/* <Link
                  to="/news"
                  onClick={handleLinkClick}
                  className={`block rounded-lg px-4 py-3 text-[15px] font-medium transition-colors duration-200 hover:bg-white/10 hover:text-[#35a99b] ${location.pathname === "/news"
                      ? "bg-white/10 text-[#35a99b]"
                      : "text-white"
                    }`}
                >
                  News
                </Link> */}

                <Link
                  to="/news"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  aria-disabled="true"
                  tabIndex={-1}
                  className={`block rounded-lg px-4 py-3 text-[15px] font-medium transition-colors duration-200 pointer-events-none opacity-50 ${location.pathname === "/news"
                      ? "bg-white/10 text-[#35a99b]"
                      : "text-white"
                    }`}
                >
                  News
                </Link>
              </div>
            </div>
          );
        }

        // Normal Navigation Links
        return (
          <Link
            key={item.name}
            to={item.path}
            onClick={handleLinkClick}
            className={`flex w-full items-center gap-1 text-[16px] font-bold transition-colors duration-200 hover:text-[#35a99b] lg:w-auto lg:text-[16px] xl:text-[17px] ${location.pathname === item.path
                ? "text-[#35a99b]"
                : "text-white"
              }`}
          >
            <span>{item.name}</span>

            {item.dropdown && (
              <span className="text-[17px] font-normal">+</span>
            )}
          </Link>
        );
      })}

    </nav>
  );
}

export default NavLinks;