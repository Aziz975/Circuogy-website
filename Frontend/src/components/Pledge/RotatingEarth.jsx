// import { useEffect, useRef, useState } from "react";

// const RotatingEarth = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const imageRef = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         setIsVisible(entry.isIntersecting);
//       },
//       {
//         threshold: 0.2,
//       }
//     );

//     if (imageRef.current) {
//       observer.observe(imageRef.current);
//     }

//     return () => {
//       if (imageRef.current) {
//         observer.unobserve(imageRef.current);
//       }
//     };
//   }, []);

//   return (
//     <div className="relative z-20 flex h-[500px] w-[440px] items-center justify-center">
//       <img
//         ref={imageRef}
//         src="pledge-earth.png"
//         alt="Sustainable Earth"
//         className={`h-full w-full object-contain drop-shadow-[0_15px_110px_rgba(35,115,95,0.50)] ${
//           isVisible ? "animate-earth-rotate" : ""
//         }`}
//       />
//     </div>
//   );
// };

// export default RotatingEarth;