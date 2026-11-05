import React from "react";
import { Link } from "react-router-dom";

function Logo() {
  return (
   <Link
  to="/"
  className="flex items-center"
>
  <img
    src="/images/companylogo.png"
    alt="Circulogy"
    className="
      h-[32px]
      w-auto
      object-contain

      sm:h-[36px]
      md:h-[40px]
      lg:h-[45px]
      xl:h-[50px]
    "
  />
</Link>
  );
}

export default Logo;