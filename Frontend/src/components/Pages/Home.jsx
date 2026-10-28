// import React, { useEffect, useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import CirculogyHomePage from "../Home/Hero";

// const slides = [
//   {
//     image: "/Home1.png",

//   },
//   {
//     image: "/Home.png",
//     title: "Building a Sustainable Future",
//     subtitle: "Innovate, Recycle, Grow",
//   },

// ];

// function HeroCarousel() {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // Automatic carousel
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) =>
//         prev === slides.length - 1 ? 0 : prev + 1
//       );
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   // Previous button
//   const previousSlide = () => {
//     setCurrentSlide((prev) =>
//       prev === 0 ? slides.length - 1 : prev - 1
//     );
//   };

//   // Next button
//   const nextSlide = () => {
//     setCurrentSlide((prev) =>
//       prev === slides.length - 1 ? 0 : prev + 1
//     );
//   };

//   return (
//     <>
//       {/* HERO CAROUSEL */}
//       <section className="relative h-[550px] w-full overflow-hidden bg-black">

//         {/* ================= SLIDES ================= */}
//         {slides.map((slide, index) => (
//           <div
//             key={index}
//             className={`absolute inset-0 transition-opacity duration-700 ${
//               currentSlide === index
//                 ? "opacity-100"
//                 : "pointer-events-none opacity-0"
//             }`}
//           >
//             {/* Background Image */}
//             <img
//               src={slide.image}
//               alt={slide.title}
//               className="absolute inset-0 h-full w-full object-cover"
//             />

//             {/* Dark Overlay */}
//             <div className="absolute inset-0 bg-black/60"></div>

//             {/* ================= CONTENT ================= */}
//             <div className="relative z-10 flex h-full items-center justify-center px-10 text-center">
//               <div>
//                 <h1
//                   className="
//                     text-[42px]
//                     font-extrabold
//                     leading-tight
//                     text-white
//                     sm:text-[52px]
//                     md:text-[65px]
//                     lg:text-[78px]
//                     xl:text-[90px]
//                   "
//                 >
//                   {slide.title}
//                 </h1>

//                 <p
//                   className="
//                     mt-6
//                     text-[18px]
//                     font-semibold
//                     text-white
//                     sm:text-[21px]
//                     md:text-[24px]
//                   "
//                 >
//                   {slide.subtitle}
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))}

//         {/* ================= LEFT BUTTON ================= */}
//         <button
//           type="button"
//           onClick={previousSlide}
//           aria-label="Previous slide"
//           className="
//             absolute
//             left-0
//             top-1/2
//             z-30
//             flex
//             h-[70px]
//             w-[50px]
//             -translate-y-1/2
//             items-center
//             justify-center
//             text-[#35a99b]
//             transition-all
//             duration-300
//             hover:scale-110
//             hover:text-white
//           "
//         >
//           <ChevronLeft size={38} strokeWidth={1.5} />
//         </button>

//         {/* ================= RIGHT BUTTON ================= */}
//         <button
//           type="button"
//           onClick={nextSlide}
//           aria-label="Next slide"
//           className="
//             absolute
//             right-0
//             top-1/2
//             z-30
//             flex
//             h-[70px]
//             w-[50px]
//             -translate-y-1/2
//             items-center
//             justify-center
//             text-[#35a99b]
//             transition-all
//             duration-300
//             hover:scale-110
//             hover:text-white
//           "
//         >
//           <ChevronRight size={38} strokeWidth={1.5} />
//         </button>

//         {/* ================= DOTS ================= */}
//         <div
//           className="
//             absolute
//             bottom-3
//             left-1/2
//             z-30
//             flex
//             -translate-x-1/2
//             items-center
//             gap-3
//           "
//         >
//           {slides.map((_, index) => (
//             <button
//               key={index}
//               type="button"
//               onClick={() => setCurrentSlide(index)}
//               aria-label={`Go to slide ${index + 1}`}
//               className={`h-[7px] w-[7px] rounded-full transition-all duration-300 ${
//                 currentSlide === index
//                   ? "scale-125 bg-[#35a99b]"
//                   : "bg-white"
//               }`}
//             ></button>
//           ))}
//         </div>

//       </section>
      
//       <CirculogyHomePage></CirculogyHomePage>
    
//     </>
//   );
// }



// export default HeroCarousel;


import CirculogyModel from "../Home/CirculogyModel";
import CriticalMinerals from "../Home/CriticalMinerals";
import FinalCTA from "../Home/FinalCTA";
import Hero from "../Home/Hero";
import MiningCompare from "../Home/MiningCompare";
import PartnerSection from "../Home/PartnerSection";
import WhatWeRecover from "../Home/WhatWeRecover";


const Home = () => {
  return (
    <>
    <Hero></Hero>
    <PartnerSection></PartnerSection> 
    <MiningCompare></MiningCompare>
    <CriticalMinerals></CriticalMinerals>
    <WhatWeRecover></WhatWeRecover>
    <CirculogyModel></CirculogyModel>
    <FinalCTA></FinalCTA>
    
   
    </>
  )
}

export default Home
