import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { LoginForm } from "./LoginForm";
import { LoginFormOverview } from "./LoginFormOverview";
import styles from "./LoginFormOverview.module.css";
import {
  loginFormDemoEmail,
  loginFormDemoForgotHref,
  loginFormDemoPassword,
  loginFormDemoSignUpHref,
} from "./loginFormDemo";

const meta = {
  title: "Organisms/Login Form",
  id: "components-loginform",
  component: LoginForm,
  args: {
    forgotPasswordHref: loginFormDemoForgotHref,
    onIpAccess: fn(),
    onSsoLogin: fn(),
    onSubmit: fn(),
    signUpHref: loginFormDemoSignUpHref,
  },
} satisfies Meta<typeof LoginForm>;

export default meta;

type Story = StoryObj<typeof meta>;

const loginFormChromatic = {
  viewports: [375, 768, 1200],
};

function expectNoPageOverflow(canvasElement: HTMLElement) {
  const { documentElement } = canvasElement.ownerDocument;

  expect(documentElement.scrollWidth).toBeLessThanOrEqual(
    documentElement.clientWidth + 1,
  );
}

export const Overview: Story = {
  parameters: {
    layout: "fullscreen",
    chromatic: loginFormChromatic,
  },
  render: () => <LoginFormOverview />,
};

export const Default: Story = {
  parameters: {
    layout: "padded",
    chromatic: loginFormChromatic,
  },
  render: (args) => (
    <div className={styles.storyFrame}>
      <LoginForm {...args} />
    </div>
  ),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const email = canvas.getByLabelText("Email");
    const password = canvas.getByLabelText("Password");
    const remember = canvas.getByRole("switch", { name: "Remember me" });
    const login = canvas.getByRole("button", { name: "Login" });
    const sso = canvas.getByRole("button", { name: "SSO Login" });
    const ipAccess = canvas.getByRole("button", { name: "IP Access" });

    await expect(canvas.getByRole("form")).toBeVisible();
    await expect(email).toHaveAttribute("type", "email");
    await expect(email).toHaveAttribute("autocomplete", "email");
    await expect(password).toHaveAttribute("type", "password");
    await expect(password).toHaveAttribute("autocomplete", "current-password");
    await expect(email).toHaveAttribute("placeholder", "Enter here...");
    await expect(password).toHaveAttribute("placeholder", "Enter here...");
    await expect(
      canvas.getByRole("button", { name: "Show password" }),
    ).toHaveAttribute("type", "button");

    await userEvent.type(password, "secret");
    await userEvent.click(canvas.getByRole("button", { name: "Show password" }));
    await expect(password).toHaveAttribute("type", "text");
    await expect(password).toHaveValue("secret");
    await expect(args.onSubmit).not.toHaveBeenCalled();
    await expect(
      canvas.getByRole("button", { name: "Hide password" }),
    ).toBeVisible();

    await userEvent.click(canvas.getByRole("button", { name: "Hide password" }));
    await expect(password).toHaveAttribute("type", "password");
    await expect(password).toHaveValue("secret");
    await expect(args.onSubmit).not.toHaveBeenCalled();
    await expect(login).toHaveAttribute("type", "submit");
    await expect(sso).toHaveAttribute("type", "button");
    await expect(ipAccess).toHaveAttribute("type", "button");
    await expect(
      canvas.getByRole("link", { name: "New User? Sign up" }),
    ).toBeVisible();
    await expect(
      canvas.getByRole("link", { name: "Forgotten Password?" }),
    ).toBeVisible();

    await userEvent.click(sso);
    await expect(args.onSsoLogin).toHaveBeenCalledOnce();
    await expect(args.onSubmit).not.toHaveBeenCalled();

    await userEvent.click(login);
    await expect(args.onSubmit).toHaveBeenCalledOnce();

    await expect(remember).toHaveAttribute("aria-checked", "false");
    await userEvent.click(remember);
    await expect(remember).toHaveAttribute("aria-checked", "true");
    expectNoPageOverflow(canvasElement);
  },
};

export const Filled: Story = {
  args: {
    defaultEmail: loginFormDemoEmail,
    defaultPassword: loginFormDemoPassword,
  },
  parameters: {
    layout: "padded",
    chromatic: loginFormChromatic,
  },
  render: (args) => (
    <div className={styles.storyFrame}>
      <LoginForm {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByLabelText("Email")).toHaveValue(
      loginFormDemoEmail,
    );
    await expect(canvas.getByLabelText("Password")).toHaveValue(
      loginFormDemoPassword,
    );
    await expect(canvas.getByLabelText("Password")).toHaveAttribute(
      "type",
      "password",
    );
    expectNoPageOverflow(canvasElement);
  },
};

export const RememberMe: Story = {
  name: "Remember Me",
  args: {
    defaultRememberMe: true,
  },
  parameters: {
    layout: "padded",
    chromatic: loginFormChromatic,
  },
  render: (args) => (
    <div className={styles.storyFrame}>
      <LoginForm {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const remember = canvas.getByRole("switch", { name: "Remember me" });

    await expect(remember).toHaveAttribute("aria-checked", "true");
    expectNoPageOverflow(canvasElement);
  },
};
