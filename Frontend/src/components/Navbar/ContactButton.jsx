import React from "react";
import { Phone } from "lucide-react";
import { Link } from "react-router-dom";

function ContactButton() {
  return (
    <button
      type="button"
      className=" flex h-[42px] w-full max-w-[160px] items-center justify-center gap-2 rounded-full  bg-white px-2 text-[13px] font-semibold  text-black transition-transform duration-200 hover:scale-105

        sm:h-[44px]
        sm:max-w-[175px]
        sm:px-3
        sm:text-[14px]

        md:h-[46px]
        md:max-w-[185px]
        md:text-[15px]

        lg:h-[48px]
        lg:max-w-[192px]
        lg:text-[16px]
      "
    >
      {/* Phone Icon */}
      <span
        className="
          flex
          h-[30px]
          w-[30px]
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-[#35a99b]

          sm:h-[32px]
          sm:w-[32px]

          md:h-[34px]
          md:w-[34px]

          lg:h-[36px]
          lg:w-[36px]
        "
      >
        <Phone
          size={15}
          className="text-white sm:h-[16px] sm:w-[16px] md:h-[17px] md:w-[17px] lg:h-[18px] lg:w-[18px]"
        />
      </span>

      <span className="whitespace-nowrap">
        <Link to="/career1">
         Contact Us
        </Link>
       
      </span>
    </button>
  );
}

export default ContactButton;