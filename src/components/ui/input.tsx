import { cn } from "@/lib/utils";
import * as React from "react";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
        "dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 shadow-xs transition-[color,box-shadow] outline-none",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",

        // ✅ Only apply placeholder fix for password fields
        type === "password" && [
          "font-sans text-base leading-[1.5] font-normal tracking-normal",
          // ⬇ Ensure placeholder doesn't get bold or too large
          "placeholder:text-muted-foreground placeholder:text-sm placeholder:leading-normal placeholder:font-normal placeholder:tracking-normal placeholder:opacity-100",
        ],

        className,
      )}
      {...props}
    />
  );
}

export { Input };
