import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { LoginForm } from "./LoginForm";
import styles from "./LoginForm.module.css";

describe("LoginForm", () => {
  it("composes a semantic form from TextInput, Switch, and Button", () => {
    const markup = renderToStaticMarkup(
      <LoginForm
        className="custom-class"
        forgotPasswordHref="#forgotten-password"
        signUpHref="#sign-up"
      />,
    );

    expect(markup).toContain("<form");
    expect(markup).toContain(styles.root);
    expect(markup).toContain("custom-class");
    expect(markup).toContain("Intelligence Center Login");
    expect(markup).toContain(">Email</label>");
    expect(markup).toContain('type="email"');
    expect(markup).toContain('autoComplete="email"');
    expect(markup).toContain(">Password</label>");
    expect(markup).toContain('type="password"');
    expect(markup).toContain('autoComplete="current-password"');
    expect(markup).toContain('placeholder="Enter here..."');
    expect(markup).toContain('aria-label="Show password"');
    expect(markup).toContain("Remember me");
    expect(markup).toContain('role="switch"');
    expect(markup).toContain('href="#sign-up"');
    expect(markup).toContain('href="#forgotten-password"');
    expect(markup).toContain(">Login</button>");
    expect(markup).toContain('type="submit"');
    expect(markup).toContain(">SSO Login</button>");
    expect(markup).toContain(">IP Access</button>");
    expect(markup.match(/type="button"/g)?.length).toBeGreaterThanOrEqual(2);
  });

  it("renders sign-up and forgot actions as text when hrefs are omitted", () => {
    const markup = renderToStaticMarkup(<LoginForm />);

    expect(markup).toContain("New User? Sign up");
    expect(markup).toContain("Forgotten Password?");
    expect(markup).not.toContain("<a");
  });

  it("renders filled values and a checked remember-me switch", () => {
    const markup = renderToStaticMarkup(
      <LoginForm
        defaultEmail="user@example.com"
        defaultPassword="password"
        defaultRememberMe
      />,
    );

    expect(markup).toContain("user@example.com");
    expect(markup).toContain("password");
    expect(markup).toContain('aria-checked="true"');
  });
});
