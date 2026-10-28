import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authApi } from "../lib/api";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10 disabled:opacity-60";

const labelClass = "mb-2 block text-sm font-medium text-slate-700";

// Defined outside AdminLogin so React doesn't remount it (and drop input focus) on every keystroke.
function PasswordField({
  id,
  label,
  value,
  onChange,
  visible,
  toggle,
  placeholder = "Enter password",
  autoComplete = "current-password",
  disabled,
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${inputClass} pr-20`}
          required
          disabled={disabled}
          autoComplete={autoComplete}
        />

        <button
          type="button"
          onClick={toggle}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute inset-y-0 right-3 my-auto text-sm font-medium text-teal-700 hover:text-teal-900"
        >
          {visible ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
}

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/admin/dashboard";

  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [showPassword, setShowPassword] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Already signed in? Skip the form.
  useEffect(() => {
    let active = true;
    authApi
      .me()
      .then(() => active && navigate(redirectTo, { replace: true }))
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [navigate, redirectTo]);

  const setError = (text) => setMessage({ type: "error", text });
  const setSuccess = (text) => setMessage({ type: "success", text });

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    setLoading(true);

    try {
      await authApi.login(email, password);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message);
      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (newPassword.length < 8) {
      setError("New password must contain at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    if (newPassword === currentPassword) {
      setError("New password must be different from the current password.");
      return;
    }

    setLoading(true);
    try {
      const res = await authApi.changePassword(email, currentPassword, newPassword);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPassword("");
      setMode("login");
      setSuccess(res.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setMessage({ type: "", text: "" });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-teal-50 via-white to-cyan-50 px-4 py-10">
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-white bg-white shadow-xl shadow-teal-900/10">
        {/* Header */}
        <div className="bg-teal-950 px-8 py-8 text-center text-white">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-100 text-teal-800">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-8 w-8"
              aria-hidden="true"
            >
              <path d="M3 12h4l3-7 4 14 3-7h4" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold tracking-tight">Circulogy</h1>

          <p className="mt-2 text-sm text-teal-100">Admin Portal</p>
        </div>

        {/* Form */}
        <div className="px-6 py-8 sm:px-8">
          <div className="mb-7">
            <h2 className="text-2xl font-bold text-slate-900">
              {mode === "login" ? "Welcome back" : "Change password"}
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {mode === "login"
                ? "Sign in to access your administration dashboard."
                : "Verify your current password and choose a new one."}
            </p>
          </div>

          {message.text && (
            <div
              role={message.type === "error" ? "alert" : "status"}
              className={`mb-5 rounded-xl p-3 text-sm ${
                message.type === "error"
                  ? "bg-red-50 text-red-700"
                  : "bg-teal-50 text-teal-800"
              }`}
            >
              {message.text}
            </div>
          )}

          {mode === "login" ? (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@circulogy.com"
                  autoComplete="username"
                  className={inputClass}
                  disabled={loading}
                  required
                />
              </div>

              <PasswordField
                id="password"
                label="Password"
                value={password}
                onChange={setPassword}
                visible={showPassword}
                toggle={() => setShowPassword(!showPassword)}
                disabled={loading}
              />

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => switchMode("change")}
                  className="text-sm font-semibold text-teal-700 hover:text-teal-900"
                >
                  Change password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-teal-800 px-4 py-3.5 font-semibold text-white shadow-lg shadow-teal-900/10 transition hover:bg-teal-900 focus:outline-none focus:ring-4 focus:ring-teal-600/20 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Signing in…" : "Sign in to dashboard"}
                {!loading && (
                  <span className="ml-2" aria-hidden="true">
                    →
                  </span>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleChangePassword} className="space-y-5">
              <div>
                <label htmlFor="change-email" className={labelClass}>
                  Admin email
                </label>

                <input
                  id="change-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@circulogy.com"
                  autoComplete="username"
                  className={inputClass}
                  disabled={loading}
                  required
                />
              </div>

              <PasswordField
                id="current-password"
                label="Current password"
                value={currentPassword}
                onChange={setCurrentPassword}
                visible={showCurrent}
                toggle={() => setShowCurrent(!showCurrent)}
                disabled={loading}
              />

              <PasswordField
                id="new-password"
                label="New password"
                value={newPassword}
                onChange={setNewPassword}
                visible={showNew}
                toggle={() => setShowNew(!showNew)}
                placeholder="At least 8 characters"
                autoComplete="new-password"
                disabled={loading}
              />

              <PasswordField
                id="confirm-password"
                label="Confirm new password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                visible={showConfirm}
                toggle={() => setShowConfirm(!showConfirm)}
                autoComplete="new-password"
                disabled={loading}
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-teal-800 px-4 py-3.5 font-semibold text-white transition hover:bg-teal-900 focus:outline-none focus:ring-4 focus:ring-teal-600/20 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Updating…" : "Update password"}
              </button>

              <button
                type="button"
                onClick={() => switchMode("login")}
                disabled={loading}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-60"
              >
                ← Back to login
              </button>
            </form>
          )}

          <div className="mt-8 border-t border-slate-100 pt-5 text-center">
            <p className="text-xs text-slate-400">
              Protected administration access · Circulogy
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
