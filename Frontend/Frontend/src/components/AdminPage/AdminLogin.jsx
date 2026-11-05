
// import { useState } from "react";

// export default function AdminLogin() {
//   const [mode, setMode] = useState("login");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showCurrent, setShowCurrent] = useState(false);
//   const [showNew, setShowNew] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [message, setMessage] = useState("");

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const inputClass =
//     "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10";

//   const labelClass =
//     "mb-2 block text-sm font-medium text-slate-700";

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     // Connect this form to your backend login API.
//     console.log({ email, password });

//     setMessage("Connect your backend API to complete login.");
//   };

//   const handleChangePassword = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     if (newPassword.length < 8) {
//       setMessage("New password must contain at least 8 characters.");
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       setMessage("New passwords do not match.");
//       return;
//     }

//     // Connect this form to your change-password API.
//     console.log({
//       email,
//       currentPassword,
//       newPassword,
//     });

//     setMessage(
//       "Connect your backend API to update your password."
//     );
//   };

//   const PasswordField = ({
//     label,
//     value,
//     onChange,
//     visible,
//     toggle,
//     placeholder = "Enter password",
//   }) => (
//     <div>
//       <label className={labelClass}>{label}</label>

//       <div className="relative">
//         <input
//           type={visible ? "text" : "password"}
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//           placeholder={placeholder}
//           className={`${inputClass} pr-20`}
//           required
//           autoComplete="current-password"
//         />

//         <button
//           type="button"
//           onClick={toggle}
//           aria-label={visible ? "Hide password" : "Show password"}
//           className="absolute inset-y-0 right-3 my-auto text-sm font-medium text-teal-700 hover:text-teal-900"
//         >
//           {visible ? "Hide" : "Show"}
//         </button>
//       </div>
//     </div>
//   );

//   const switchMode = (nextMode) => {
//     setMode(nextMode);
//     setMessage("");
//   };

//   return (
//     <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-teal-50 via-white to-cyan-50 px-4 py-10">
//       <div className="w-full max-w-md overflow-hidden rounded-3xl border border-white bg-white shadow-xl shadow-teal-900/10">

//         {/* Header */}
//         <div className="bg-teal-950 px-8 py-8 text-center text-white">
//           <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-100 text-teal-800">
//             <svg
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="1.8"
//               className="h-8 w-8"
//               aria-hidden="true"
//             >
//               <path d="M3 12h4l3-7 4 14 3-7h4" />
//               <circle cx="12" cy="12" r="10" />
//             </svg>
//           </div>

//           <h1 className="text-3xl font-bold tracking-tight">
//             Circulogy
//           </h1>

//           <p className="mt-2 text-sm text-teal-100">
//             Admin Portal
//           </p>
//         </div>

//         {/* Form */}
//         <div className="px-6 py-8 sm:px-8">
//           <div className="mb-7">
//             <h2 className="text-2xl font-bold text-slate-900">
//               {mode === "login"
//                 ? "Welcome back"
//                 : "Change password"}
//             </h2>

//             <p className="mt-2 text-sm leading-6 text-slate-500">
//               {mode === "login"
//                 ? "Sign in to access your administration dashboard."
//                 : "Verify your current password and choose a new one."}
//             </p>
//           </div>

//           {message && (
//             <div
//               role="status"
//               className="mb-5 rounded-xl bg-teal-50 p-3 text-sm text-teal-800"
//             >
//               {message}
//             </div>
//           )}

//           {mode === "login" ? (
//             <form onSubmit={handleLogin} className="space-y-5">
//               <div>
//                 <label htmlFor="email" className={labelClass}>
//                   Email address
//                 </label>

//                 <input
//                   id="email"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="admin@circulogy.com"
//                   autoComplete="username"
//                   className={inputClass}
//                   required
//                 />
//               </div>

//               <PasswordField
//                 label="Password"
//                 value={password}
//                 onChange={setPassword}
//                 visible={showPassword}
//                 toggle={() => setShowPassword(!showPassword)}
//               />

//               <div className="flex justify-end">
//                 <button
//                   type="button"
//                   onClick={() => switchMode("change")}
//                   className="text-sm font-semibold text-teal-700 hover:text-teal-900"
//                 >
//                   Change password?
//                 </button>
//               </div>

//               <button
//                 type="submit"
//                 className="w-full rounded-xl bg-teal-800 px-4 py-3.5 font-semibold text-white shadow-lg shadow-teal-900/10 transition hover:bg-teal-900 focus:outline-none focus:ring-4 focus:ring-teal-600/20"
//               >
//                 Sign in to dashboard
//                 <span className="ml-2" aria-hidden="true">→</span>
//               </button>
//             </form>
//           ) : (
//             <form
//               onSubmit={handleChangePassword}
//               className="space-y-5"
//             >
//               <div>
//                 <label htmlFor="change-email" className={labelClass}>
//                   Admin email
//                 </label>

//                 <input
//                   id="change-email"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="admin@circulogy.com"
//                   autoComplete="username"
//                   className={inputClass}
//                   required
//                 />
//               </div>

//               <PasswordField
//                 label="Current password"
//                 value={currentPassword}
//                 onChange={setCurrentPassword}
//                 visible={showCurrent}
//                 toggle={() => setShowCurrent(!showCurrent)}
//               />

//               <PasswordField
//                 label="New password"
//                 value={newPassword}
//                 onChange={setNewPassword}
//                 visible={showNew}
//                 toggle={() => setShowNew(!showNew)}
//                 placeholder="At least 8 characters"
//               />

//               <PasswordField
//                 label="Confirm new password"
//                 value={confirmPassword}
//                 onChange={setConfirmPassword}
//                 visible={showConfirm}
//                 toggle={() => setShowConfirm(!showConfirm)}
//               />

//               <button
//                 type="submit"
//                 className="w-full rounded-xl bg-teal-800 px-4 py-3.5 font-semibold text-white transition hover:bg-teal-900 focus:outline-none focus:ring-4 focus:ring-teal-600/20"
//               >
//                 Update password
//               </button>

//               <button
//                 type="button"
//                 onClick={() => switchMode("login")}
//                 className="w-full rounded-xl border border-slate-200 px-4 py-3 font-medium text-slate-600 transition hover:bg-slate-50"
//               >
//                 ← Back to login
//               </button>
//             </form>
//           )}

//           <div className="mt-8 border-t border-slate-100 pt-5 text-center">
//             <p className="text-xs text-slate-400">
//               Protected administration access · Circulogy
//             </p>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }
