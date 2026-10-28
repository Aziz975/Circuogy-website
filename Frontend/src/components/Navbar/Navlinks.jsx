import React from "react";
import { Link, useLocation } from "react-router-dom";



function NavLinks() {
  const navLinks = [
    { name: "Home", path: "/" },
    // { name: "Services", path: "/services", dropdown: true },
    { name: "Technology", path: "/technology", dropdown: true },
    { name: "Blog", path: "/blog", dropdown: true },
    // { name: "Pledge", path: "/pledge" },
    { name: "Career", path: "/career" },
    { name: "About Us", path: "/about" },
  ];
  const location = useLocation();

  return (
    <nav className="flex flex-col items-start gap-5 lg:flex-row lg:items-center lg:gap-8 xl:gap-[42px]">
      {navLinks.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className="flex w-full items-center gap-1 text-[16px] font-bold text-white transition-colors duration-200 hover:text-[#35a99b] lg:w-auto lg:text-[16px] xl:text-[17px]"
        >
          <span>{item.name}</span>

          {item.dropdown && (
            <span className="text-[17px] font-normal">+</span>
          )}
        </Link>


      ))}


       {/* login button */}
      <div className="inline-flex items-center gap-1 rounded-full bg-[#f5f3f0] p-1 ">
        <Link
          to="/"
          className={`rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 ${location.pathname === "/"
              ? "bg-[#1c1917] text-white"
              : "bg-white text-[#292524] hover:bg-[#eae7e2]"
            }`}
        >
          Home
        </Link>

        <Link
          to="/admin"
          className={`rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 ${location.pathname === "/admin" || location.pathname.startsWith("/admin/")
              ? "bg-[#1c1917] text-white"
              : "bg-white text-[#292524] hover:bg-[#eae7e2]"
            }`}
        >
          Admin
        </Link>
      </div>
    </nav>
  );
}

export default NavLinks;