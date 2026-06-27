export default function FormInput({ error, label, registration, type = 'text', ...props }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
      <input
        type={type}
        className="min-h-11 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-ocean focus:ring-2 focus:ring-cyan-100"
        {...registration}
        {...props}
      />
      {error ? <span className="mt-1 block text-sm text-coral">{error.message}</span> : null}
    </label>
  );
}

