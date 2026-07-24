"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import type { buttonVariants } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";

type Props = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    confirmMessage: string;
  };

/** Submit button that requires a native confirm() before submitting its form. */
export function ConfirmSubmitButton({
  confirmMessage,
  onClick,
  children,
  variant,
  size,
  ...props
}: Props) {
  return (
    <Button
      type="submit"
      variant={variant}
      size={size}
      onClick={(event) => {
        if (!window.confirm(confirmMessage)) {
          event.preventDefault();
          return;
        }
        onClick?.(event);
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
