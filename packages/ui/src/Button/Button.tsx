import type { ButtonHTMLAttributes } from "react";
import { Button as BaseButton } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

import styles from "./Button.module.css";

const buttonVariants = cva(styles.button, {
  variants: {
    variant: {
      primary: styles.primary,
      secondary: styles.secondary,
    },
    size: {
      small: styles.small,
      medium: styles.medium,
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "medium",
  },
});

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      type={type}
      className={clsx(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
