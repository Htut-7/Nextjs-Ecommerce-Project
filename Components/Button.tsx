import React from "react";
import Image, { StaticImageData } from "next/image";

function Button({
  children,
  icon,
  className = "",
  variant="primary",
  ...props
}: {
  children: React.ReactNode;
  icon?: string | StaticImageData;
  variant?: "primary" | "secondary";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-black px-5 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-slate-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${
        variant === "primary"
          ? "border border-slate-300 bg-black text-white hover:bg-slate-800"
          : "border border-slate-300 bg-black text-black hover:bg-slate-100"
      } ${className}`}
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
    </button>
  );
}

export default Button;