import { cn } from "@/lib/utils";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

export interface InputProps extends ComponentPropsWithoutRef<"input"> {
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, invalid, ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        "h-12 w-full rounded-full border bg-transparent px-5 text-sm-body text-sm-text-inv placeholder:text-sm-text-inv-3",
        invalid ? "border-sm-red-600" : "border-white/20",
        className,
      )}
      {...rest}
    />
  );
});
