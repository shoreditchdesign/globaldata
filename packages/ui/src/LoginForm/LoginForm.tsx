import type {
  ChangeEventHandler,
  FormEvent,
  FormEventHandler,
  MouseEventHandler,
  ReactNode,
} from "react";
import { useId, useState } from "react";
import clsx from "clsx";

import { Button } from "../Button/Button";
import { Switch } from "../Switch/Switch";
import { TextInput } from "../TextInput/TextInput";
import styles from "./LoginForm.module.css";

export type LoginFormProps = {
  className?: string;
  defaultEmail?: string;
  defaultPassword?: string;
  defaultRememberMe?: boolean;
  email?: string;
  forgotPasswordHref?: string;
  isSubmitting?: boolean;
  onEmailChange?: ChangeEventHandler<HTMLInputElement>;
  onIpAccess?: MouseEventHandler<HTMLButtonElement>;
  onPasswordChange?: ChangeEventHandler<HTMLInputElement>;
  onRememberMeChange?: (checked: boolean) => void;
  onSsoLogin?: MouseEventHandler<HTMLButtonElement>;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  password?: string;
  rememberMe?: boolean;
  signUpHref?: string;
  title?: ReactNode;
};

function UserIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="16"
      viewBox="0 0 16 16"
      width="16"
    >
      <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M3.25 13.25c.35-2.35 2.2-3.75 4.75-3.75s4.4 1.4 4.75 3.75"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.25"
      />
    </svg>
  );
}

function KeyIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="16"
      viewBox="0 0 16 16"
      width="16"
    >
      <circle cx="6" cy="8" r="2.75" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="6" cy="8" r="1" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M8.6 8h5.15M11.4 8v2.4M13.75 8v1.7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.25"
      />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg aria-hidden="true" fill="none" focusable="false" viewBox="0 0 20 20">
      <path
        d="M2.25 10c1.8-3.6 4.55-5.5 7.75-5.5s5.95 1.9 7.75 5.5c-1.8 3.6-4.55 5.5-7.75 5.5S4.05 13.6 2.25 10Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg aria-hidden="true" fill="none" focusable="false" viewBox="0 0 20 20">
      <path
        d="M2.25 10c1.8-3.6 4.55-5.5 7.75-5.5s5.95 1.9 7.75 5.5c-1.8 3.6-4.55 5.5-7.75 5.5S4.05 13.6 2.25 10Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M4 16 16 4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function PasswordVisibilityButton({
  disabled,
  revealed,
  onToggle,
}: {
  disabled?: boolean;
  revealed: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      aria-label={revealed ? "Hide password" : "Show password"}
      data-revealed={revealed ? "true" : undefined}
      disabled={disabled}
      type="button"
      onClick={onToggle}
    >
      {revealed ? <EyeOffIcon /> : <EyeIcon />}
    </button>
  );
}

function OptionalLink({
  children,
  className,
  href,
}: {
  children: ReactNode;
  className: string;
  href?: string;
}) {
  if (href) {
    return (
      <a className={className} href={href}>
        {children}
      </a>
    );
  }

  return <span className={className}>{children}</span>;
}

export function LoginForm({
  className,
  defaultEmail,
  defaultPassword,
  defaultRememberMe = false,
  email,
  forgotPasswordHref,
  isSubmitting = false,
  onEmailChange,
  onIpAccess,
  onPasswordChange,
  onRememberMeChange,
  onSsoLogin,
  onSubmit,
  password,
  rememberMe,
  signUpHref,
  title = "Intelligence Center Login",
}: LoginFormProps) {
  const headingId = useId();
  const rememberId = useId();
  const [showPassword, setShowPassword] = useState(false);
  const emailField =
    email !== undefined
      ? { value: email }
      : { defaultValue: defaultEmail };
  const passwordField =
    password !== undefined
      ? { value: password }
      : { defaultValue: defaultPassword };
  const rememberField =
    rememberMe !== undefined
      ? { checked: rememberMe }
      : { defaultChecked: defaultRememberMe };

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    onSubmit?.(event);
  }

  return (
    <form
      aria-labelledby={headingId}
      className={clsx(styles.root, className)}
      onSubmit={handleSubmit}
    >
      <header className={styles.header}>
        <h2 className={styles.title} id={headingId}>
          {title}
        </h2>
        <OptionalLink className={styles.signUp} href={signUpHref}>
          New User? Sign up
        </OptionalLink>
      </header>

      <div className={styles.fields}>
        <TextInput
          autoComplete="email"
          disabled={isSubmitting}
          label="Email"
          name="email"
          onChange={onEmailChange}
          placeholder="Enter here..."
          prefix={<UserIcon />}
          type="email"
          {...emailField}
        />
        <TextInput
          autoComplete="current-password"
          disabled={isSubmitting}
          label="Password"
          name="password"
          onChange={onPasswordChange}
          placeholder="Enter here..."
          prefix={<KeyIcon />}
          suffix={
            <PasswordVisibilityButton
              disabled={isSubmitting}
              revealed={showPassword}
              onToggle={() => setShowPassword((current) => !current)}
            />
          }
          {...passwordField}
          type={showPassword ? "text" : "password"}
        />
      </div>

      <div className={styles.utility}>
        <OptionalLink className={styles.forgot} href={forgotPasswordHref}>
          Forgotten Password?
        </OptionalLink>
        <label className={styles.remember} htmlFor={rememberId}>
          <span>Remember me</span>
          <Switch
            disabled={isSubmitting}
            id={rememberId}
            onCheckedChange={(checked) => onRememberMeChange?.(checked)}
            {...rememberField}
          />
        </label>
      </div>

      <Button
        className={styles.submit}
        disabled={isSubmitting}
        type="submit"
      >
        Login
      </Button>

      <div className={styles.divider}>
        <span aria-hidden="true" className={styles.dividerLine} />
        <span className={styles.dividerLabel}>or</span>
        <span aria-hidden="true" className={styles.dividerLine} />
      </div>

      <div className={styles.secondary}>
        <Button
          className={styles.actionButton}
          disabled={isSubmitting}
          onClick={onSsoLogin}
          type="button"
          variant="secondary"
        >
          SSO Login
        </Button>
        <Button
          className={styles.actionButton}
          disabled={isSubmitting}
          onClick={onIpAccess}
          type="button"
          variant="secondary"
        >
          IP Access
        </Button>
      </div>
    </form>
  );
}
