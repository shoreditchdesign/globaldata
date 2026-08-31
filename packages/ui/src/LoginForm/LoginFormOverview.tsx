import { LoginForm } from "./LoginForm";
import {
  OverviewShell,
  OverviewShowcaseRow,
} from "../storybook/OverviewShell";
import overviewStyles from "../storybook/Overview.module.css";
import styles from "./LoginFormOverview.module.css";
import {
  loginFormDemoEmail,
  loginFormDemoForgotHref,
  loginFormDemoPassword,
  loginFormDemoSignUpHref,
} from "./loginFormDemo";

const previewCode = `<LoginForm
  forgotPasswordHref="#forgotten-password"
  signUpHref="#sign-up"
  onSubmit={handleSubmit}
/>`;

export function LoginFormOverview() {
  return (
    <OverviewShell
      badge={
        <svg
          aria-hidden="true"
          className={overviewStyles.heroBadgeIcon}
          viewBox="0 0 24 24"
        >
          <rect height="14" rx="2" width="16" x="4" y="5" />
          <path d="M8 12h8" />
        </svg>
      }
      code={previewCode}
      description="LoginForm composes TextInput, Switch, and Button. It is a presentation form — no authentication or network behaviour."
      preview={
        <div className={styles.livePreview}>
          <LoginForm
            forgotPasswordHref={loginFormDemoForgotHref}
            signUpHref={loginFormDemoSignUpHref}
          />
        </div>
      }
      previewFlush
      previewFullWidth
      previewWide
      title="Login Form"
    >
      <OverviewShowcaseRow
        description="Filled fields and Remember me use the same organism. Secondary actions stay type=button so they do not submit the form."
        icon={
          <svg
            aria-hidden="true"
            className={overviewStyles.iconSvg}
            viewBox="0 0 24 24"
          >
            <path d="M4 8h16" />
            <path d="M4 12h10" />
            <path d="M4 16h13" />
          </svg>
        }
        iconClassName={overviewStyles.iconToneBrand}
        title="Filled"
      >
        <div className={styles.previewForm}>
          <LoginForm
            defaultEmail={loginFormDemoEmail}
            defaultPassword={loginFormDemoPassword}
            defaultRememberMe
            forgotPasswordHref={loginFormDemoForgotHref}
            signUpHref={loginFormDemoSignUpHref}
          />
        </div>
      </OverviewShowcaseRow>
    </OverviewShell>
  );
}
