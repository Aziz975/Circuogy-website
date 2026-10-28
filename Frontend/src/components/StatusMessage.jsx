export default function StatusMessage({ type = "info", children }) {
  const styles = {
    error: "border-red-200 bg-red-50 text-red-800",
    empty: "border-ink-800/10 bg-white text-ink-800",
    success: "border-emerald-200 bg-emerald-50 text-emerald-800",
    info: "border-ink-800/10 bg-white text-ink-800",
  };

  return (
    <div className={`rounded-2xl border px-5 py-4 text-sm ${styles[type] || styles.info}`}>
      {children}
    </div>
  );
}
