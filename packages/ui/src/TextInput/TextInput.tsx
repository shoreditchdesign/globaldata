import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Field } from "@base-ui/react/field";
import { Input } from "@base-ui/react/input";
import clsx from "clsx";

import styles from "./TextInput.module.css";

export type TextInputProps = Omit<
  ComponentPropsWithoutRef<typeof Input>,
  "className" | "prefix"
> & {
  className?: string;
  error?: boolean | string;
  hint?: ReactNode;
  label: ReactNode;
  prefix?: ReactNode;
  suffix?: ReactNode;
};

export function TextInput({
  className,
  disabled,
  error,
  hint,
  id,
  label,
  name,
  prefix,
  suffix,
  type = "text",
  ...props
}: TextInputProps) {
  const errorMessage =
    typeof error === "string" && error.trim() !== "" ? error : null;
  const invalid = Boolean(error);

  return (
    <Field.Root
      className={clsx(styles.root, className)}
      disabled={disabled}
      invalid={invalid}
      name={name}
    >
      <div className={styles.control}>
        <div className={styles.leading}>
          {prefix ? <span className={styles.prefix}>{prefix}</span> : null}
          <Field.Label className={styles.label}>{label}</Field.Label>
        </div>
        <Input className={styles.input} id={id} type={type} {...props} />
        {suffix ? <span className={styles.suffix}>{suffix}</span> : null}
      </div>
      {hint && !errorMessage ? (
        <Field.Description className={styles.hint}>{hint}</Field.Description>
      ) : null}
      {errorMessage ? (
        <Field.Error className={styles.error} match>
          {errorMessage}
        </Field.Error>
      ) : null}
    </Field.Root>
  );
}
