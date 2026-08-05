import React from "react";

function Input({
  placeholder,
  label,
  type="text",
  value,
  className = "",
  ...props
}: {
  placeholder?: string;
  label?: string;
  value?: string,
} & React.InputHTMLAttributes<HTMLInputElement>) {
    if(type==="checkbox"){
        return(
            <label className="flex item-center gap-2 text-sm text-slate-600 cursor-pointer">
                <input
                {...props}
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-black focus:ring-2 focus-ring-slate-300"
                />
                <span>{label}</span>
            </label>
        )
    };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}

      <input
        {...props}
        value={value}
        placeholder={placeholder} type={type}
        className={`w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-black focus:ring-4 focus:ring-slate-200 ${className}`}
      />
    </div>
  );
}

export default Input;