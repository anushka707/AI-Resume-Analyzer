export default function Button({ children, className = '', isLoading = false, type = 'button', ...props }) {
  return (
    <button
      type={type}
      disabled={isLoading || props.disabled}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-ocean px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-cyan-800 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    >
      {isLoading ? 'Working...' : children}
    </button>
  );
}

