// import emailjs from "@emailjs/browser";
// import React, { useRef, useState } from "react";

// import {
//   ArrowRight,
//   CalendarDays,
//   ChevronDown,
//   UploadCloud,
//   LoaderCircle,
//   CheckCircle2,
//   AlertCircle,
//   X,
// } from "lucide-react";

// // EmailJS credentials — enter your actual dashboard values.
// const SERVICE_ID = "service_n9t362c";
// const TEMPLATE_ID = "template_4j3f8ms";
// const PUBLIC_KEY = "0jGQIMCLShcTUDnlF";

// const positions = [
//   "Business Development",
//   "Executive Assistant",
//   "Public Relation",
//   "Equity / Capital Raising Specialist",
//   "Sr. Manager / Manager",
//   "Partner Onboarding Executive",
// ];

// const inputClass =
//   "career-input h-[45px] w-full rounded-[8px] border border-[#d7e5e1] bg-white px-3 text-[12px] text-[#314541] outline-none transition-all placeholder:text-[#82928e] focus:border-[#299f8f] focus:ring-2 focus:ring-[#299f8f]/10 sm:h-[47px]";

// const labelClass =
//   "mb-2 block text-[11px] font-semibold text-[#1c302d]";

// export default function CareerApplicationForm() {
//   const formRef = useRef(null);
//   const fileInputRef = useRef(null);

//   const [fileName, setFileName] = useState("");
//   const [isDragging, setIsDragging] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [status, setStatus] = useState("");
//   const [feedback, setFeedback] = useState("");

//   const validateFile = (file) => {
//     if (!file) return true;

//     const allowedExtensions = /\.(pdf|doc|docx)$/i;

//     if (!allowedExtensions.test(file.name)) {
//       setStatus("error");
//       setFeedback("Please upload a PDF, DOC, or DOCX file.");
//       return false;
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       setStatus("error");
//       setFeedback("Your CV must be smaller than 5 MB.");
//       return false;
//     }

//     return true;
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files?.[0];

//     if (!file) {
//       setFileName("");
//       return;
//     }

//     if (!validateFile(file)) {
//       event.target.value = "";
//       setFileName("");
//       return;
//     }

//     setFileName(file.name);
//     setStatus("");
//     setFeedback("");
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();
//     setIsDragging(false);

//     const file = event.dataTransfer.files?.[0];

//     if (!file || !fileInputRef.current) return;
//     if (!validateFile(file)) return;

//     // Transfer the dropped file to the actual form input.
//     const transfer = new DataTransfer();
//     transfer.items.add(file);
//     fileInputRef.current.files = transfer.files;

//     setFileName(file.name);
//     setStatus("");
//     setFeedback("");
//   };

//   const handleBrowse = () => {
//     fileInputRef.current?.click();
//   };

//   const removeFile = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }

//     setFileName("");
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (isSubmitting) return;

//     if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
//       setStatus("error");
//       setFeedback(
//         "Email service is not configured. Please try again later."
//       );
//       return;
//     }

//     const file = fileInputRef.current?.files?.[0];

//     if (file && !validateFile(file)) return;

//     setIsSubmitting(true);
//     setStatus("");
//     setFeedback("");

//     try {
//       await emailjs.sendForm(
//         SERVICE_ID,
//         TEMPLATE_ID,
//         formRef.current,
//         {
//           publicKey: PUBLIC_KEY,
//         }
//       );

//       setStatus("success");
//       setFeedback(
//         "Your application has been submitted successfully. Thank you for applying!"

//       );

//       formRef.current.reset();
//       setFileName("");
//     } catch (error) {
//       console.error("EmailJS application error:", error);

//       setStatus("error");
//       setFeedback(
//         "We couldn't send your application. Please try again or email info@circulogy.com."
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="career-right-panel flex w-full items-center justify-center bg-[#f4f9f7] px-4 py-8 sm:px-7 sm:py-10 md:px-10 lg:w-[65%] lg:px-[4%] lg:py-10">
//       <div className="career-form-card w-full max-w-[900px] rounded-[22px] border border-[#dce9e5] bg-white px-6 py-7 shadow-[0_18px_50px_rgba(27,78,70,0.10)] sm:rounded-[25px] sm:px-8 sm:py-8 md:px-9 md:py-9 lg:px-8 lg:py-7 xl:px-9 xl:py-8">
//         {/* Header */}
//         <div className="career-form-header mb-6 flex justify-end">
//           <span className="text-[10px] font-semibold tracking-[0.2em] text-[#86a19c] sm:text-[11px]">
//             A CLEANER · BRIGHTER · TOMORROW
//           </span>
//         </div>

//         {/* Application form */}
//         <form
//           ref={formRef}
//           onSubmit={handleSubmit}
//           className="w-full"
//         >
//           {/* Hidden template fields */}
//           <input
//             type="hidden"
//             name="application_source"
//             value="Circulogy Careers Website"
//           />

//           {/* Row 1: First and last name */}
//           <div className="career-form-row grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-5">
//             <div>
//               <label htmlFor="first_name" className={labelClass}>
//                 FIRST NAME *
//               </label>
//               <input
//                 id="first_name"
//                 name="first_name"
//                 type="text"
//                 autoComplete="given-name"
//                 placeholder="Enter your first name"
//                 className={inputClass}
//                 maxLength={100}
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="last_name" className={labelClass}>
//                 LAST NAME *
//               </label>
//               <input
//                 id="last_name"
//                 name="last_name"
//                 type="text"
//                 autoComplete="family-name"
//                 placeholder="Enter your last name"
//                 className={inputClass}
//                 maxLength={100}
//                 required
//               />
//             </div>
//           </div>

//           {/* Row 2: Email and position */}
//           <div className="career-form-row mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-5">
//             <div>
//               <label htmlFor="email" className={labelClass}>
//                 EMAIL *
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 placeholder="Enter your email address"
//                 className={inputClass}
//                 maxLength={254}
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="position" className={labelClass}>
//                 POSITION APPLYING FOR *
//               </label>

//               <div className="relative">
//                 <select
//                   id="position"
//                   name="position"
//                   defaultValue=""
//                   className={`${inputClass} appearance-none pr-9`}
//                   required
//                 >
//                   <option value="" disabled>
//                     Select a position
//                   </option>

//                   {positions.map((position) => (
//                     <option key={position} value={position}>
//                       {position}
//                     </option>
//                   ))}
//                 </select>

//                 <ChevronDown
//                   size={16}
//                   strokeWidth={1.6}
//                   className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#173c38]"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Row 3: Referral and date of birth */}
//           <div className="career-form-row mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-5">
//             <div>
//               <label htmlFor="referral_source" className={labelClass}>
//                 WHERE DID YOU KNOW ABOUT US?
//               </label>

//               <input
//                 id="referral_source"
//                 name="referral_source"
//                 type="text"
//                 placeholder="e.g. LinkedIn, referral, website"
//                 className={inputClass}
//                 maxLength={200}
//               />
//             </div>

//             <div>
//               <label htmlFor="date_of_birth" className={labelClass}>
//                 DATE OF BIRTH
//               </label>

//               <div className="relative">
//                 <input
//                   id="date_of_birth"
//                   name="date_of_birth"
//                   type="date"
//                   max={new Date().toLocaleDateString("en-CA")}
//                   className={`${inputClass} pr-10`}
//                 />

//                 <CalendarDays
//                   size={15}
//                   strokeWidth={1.5}
//                   className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#31504b]"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* CV upload */}
//           <div className="career-upload-section mt-6">
//             <label htmlFor="cv_file" className={labelClass}>
//               UPLOAD CV
//             </label>

//             <div
//               onClick={handleBrowse}
//               onDragOver={(event) => {
//                 event.preventDefault();
//                 setIsDragging(true);
//               }}
//               onDragLeave={() => setIsDragging(false)}
//               onDrop={handleDrop}
//               className={`career-upload group flex min-h-[125px] cursor-pointer flex-col items-center justify-center rounded-[12px] border-[1.5px] border-dashed px-5 transition-all duration-300 sm:min-h-[130px] ${
//                 isDragging
//                   ? "border-[#299f8f] bg-[#e8f7f3] shadow-[0_0_30px_rgba(41,159,143,0.15)]"
//                   : "border-[#a9d5cd] bg-[#f5faf8]"
//               }`}
//             >
//               <UploadCloud
//                 size={48}
//                 strokeWidth={1.4}
//                 className="text-[#008c82]"
//               />

//               {fileName ? (
//                 <div className="mt-2 flex max-w-full items-center gap-2">
//                   <span className="max-w-[220px] truncate text-[11px] font-medium text-[#087d78]">
//                     {fileName}
//                   </span>

//                   <button
//                     type="button"
//                     aria-label="Remove CV"
//                     onClick={(event) => {
//                       event.stopPropagation();
//                       removeFile();
//                     }}
//                     className="rounded-full p-1 text-[#71827e] hover:bg-[#e3f2ed] hover:text-[#087d78]"
//                   >
//                     <X size={15} />
//                   </button>
//                 </div>
//               ) : (
//                 <>
//                   <span className="mt-1 text-[11px] font-semibold text-[#284c48] sm:text-[13px]">
//                     Drop your CV here
//                   </span>
//                   <span className="mt-1 text-[11px] text-[#899d99]">
//                     PDF, DOC or DOCX · Maximum 5 MB
//                   </span>
//                 </>
//               )}

//               <button
//                 type="button"
//                 onClick={(event) => {
//                   event.stopPropagation();
//                   handleBrowse();
//                 }}
//                 className="career-browse-button mt-2 rounded-[7px] border border-[#d2e3df] bg-white px-4 py-2 text-[11px] font-semibold text-[#3a5550] transition-all hover:border-[#299f8f] hover:text-[#087d78]"
//               >
//                 Browse Files
//               </button>

//               <input
//                 ref={fileInputRef}
//                 id="cv_file"
//                 name="cv_file"
//                 type="file"
//                 accept=".pdf,.doc,.docx"
//                 onChange={handleFileChange}
//                 className="hidden"
//               />
//             </div>

//             <p className="mt-2 text-[10px] text-[#899d99]">
//               CV upload is optional.
//             </p>
//           </div>

//           {/* Success / error message */}
//           {feedback && (
//             <div
//               role="status"
//               aria-live="polite"
//               className={`mt-5 flex items-start gap-3 rounded-xl border p-4 text-[12px] leading-5 ${
//                 status === "success"
//                   ? "border-[#b9e4d0] bg-[#effaf4] text-[#176a43]"
//                   : "border-[#efcaca] bg-[#fff4f3] text-[#a12c2c]"
//               }`}
//             >
//               {status === "success" ? (
//                 <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
//               ) : (
//                 <AlertCircle size={18} className="mt-0.5 shrink-0" />
//               )}

//               <span>{feedback}</span>
//             </div>
//           )}

//           {/* Bottom row */}
//           <div className="career-bottom mt-6 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
//             <p className="max-w-[490px] text-[11px] font-normal leading-[1.55] text-[#71827e]">
//               By submitting, you agree that Circulogy may use your
//               information to review and respond to your application.
//             </p>

//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="career-submit group flex h-[45px] shrink-0 items-center justify-center gap-5 rounded-full bg-[#169d90] px-6 text-[11px] font-semibold text-white transition-all duration-300 hover:bg-[#087f78] disabled:cursor-not-allowed disabled:opacity-60 sm:gap-7"
//             >
//               {isSubmitting ? (
//                 <>
//                   <LoaderCircle size={16} className="animate-spin" />
//                   <span>Sending...</span>
//                 </>
//               ) : (
//                 <>
//                   <span>Apply Now</span>
//                   <ArrowRight
//                     size={18}
//                     strokeWidth={1.5}
//                     className="transition-transform duration-300 group-hover:translate-x-1"
//                   />
//                 </>
//               )}
//             </button>
//           </div>
//         </form>

//         {/* Footer */}
//         <div className="career-form-footer mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#e1ebe8] pt-4">
//           <span className="text-[10px] font-bold tracking-[0.18em] text-[#9aada9]">
//             CIRCULOGY CAREERS
//           </span>

//           <span className="text-[10px] font-bold tracking-[0.12em] text-[#9aada9] sm:tracking-[0.18em]">
//             PEOPLE — TECHNOLOGY — IMPACT
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }
