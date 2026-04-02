function InputField({
  label,
  type = "text",
  name,
  value,
  onChange,
  error,
  placeholder
}) {

  return (
    <div className="flex flex-col mb-4">

      <label className="text-sm font-medium text-slate-600 mb-1">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}

        className={`w-full px-4 py-3 rounded-xl border text-sm transition-all
        focus:outline-none focus:ring-2
        ${error
          ? "border-red-400 bg-red-50 focus:ring-red-200"
          : "border-slate-200 bg-slate-50 focus:ring-teal-200 focus:border-teal-400"
        }`}
      />

      {error && (
        <span className="text-red-500 text-xs mt-1 flex items-center gap-1">
          ⚠ {error}
        </span>
      )}

    </div>
  );
}

export default InputField;