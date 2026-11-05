export default function Loading({ label = "Loading..." }) {
  return (
    <div className="flex items-center justify-center gap-3 py-16 text-ink-800/70" role="status">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-ink-800/20 border-t-accent-500" />
      <span>{label}</span>
    </div>
  );
}
