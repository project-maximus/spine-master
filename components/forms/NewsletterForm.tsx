"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { newsletterSchema, type NewsletterValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterValues>({ resolver: zodResolver(newsletterSchema) });

  // No delivery backend is wired yet — see LAUNCH-BLOCKERS.md.
  const onSubmit = async () => {
    setSubmitted(true);
    reset();
  };

  return (
    // Full width, not max-w-md: in the footer this sits in a half-width column
    // and the reference runs the field the whole way across it.
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          {/* Flat field with an accent edge bar, per the reference — the pill
              treatment belongs to buttons here, not inputs. */}
          <Input
            id="newsletter-email"
            type="email"
            autoComplete="email"
            placeholder="name@email.com"
            invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "newsletter-email-error" : undefined}
            className="rounded-none border-0 border-l-2 border-sm-red-600 px-4"
            {...register("email")}
          />
        </div>
        <Button type="submit" disabled={isSubmitting}>
          Subscribe
        </Button>
      </div>

      {/* `empty:hidden` rather than a reserved min-height: holding a blank line
          open under the field padded the footer band by ~24px for a message
          that is almost never showing. The live region still exists for
          screen readers, it just takes no space until it has something to say. */}
      <p aria-live="polite" className="mt-2 text-sm-small empty:hidden">
        {errors.email && (
          <span id="newsletter-email-error" className="text-sm-red-600">
            {errors.email.message}
          </span>
        )}
        {!errors.email && submitted && <span className="text-sm-text-inv-2">Thanks — you are subscribed.</span>}
      </p>
    </form>
  );
}
