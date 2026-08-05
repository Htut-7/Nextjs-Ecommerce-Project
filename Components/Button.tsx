import React from "react";
import Image, { StaticImageData } from "next/image";

function Button({
  children,
  icon,
  className = "",
  text,
  variant = "primary",
  ...props
}: {
  children: React.ReactNode;
  icon?: string | StaticImageData;
  text?: string
  variant?: "primary" | "secondary";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50
      ${
        variant === "primary"
          ? "border border-black bg-black text-white hover:bg-slate-800"
          : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 hover:border-slate-400"
      }
      ${className}`}
    >
      {icon && (
        <Image
          src={icon}
          alt="icon"
          width={20}
          height={20}
          className="rounded-full"
        />
      )}

      <span>{children}</span>
      <p>{text}</p>
    </button>
  );
}

export default Button;