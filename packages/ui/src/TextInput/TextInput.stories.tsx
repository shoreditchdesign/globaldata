import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fireEvent, userEvent, within } from "storybook/test";

import { TextInput } from "./TextInput";
import { HoldToShowPasswordField } from "./HoldToShowPasswordField";
import { TextInputOverview } from "./TextInputOverview";

const meta = {
  title: "Atoms/Text Input",
  id: "components-textinput",
  component: TextInput,
  args: {
    label: "Email",
    placeholder: "Enter here...",
  },
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

function UserPrefixIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
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

export const Overview: Story = {
  parameters: {
    layout: "fullscreen",
    chromatic: {
      viewports: [375, 768, 1200],
    },
  },
  render: () => <TextInputOverview />,
};

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Email");

    await expect(input).toBeEnabled();
    await expect(input).toHaveAttribute("type", "text");

    await userEvent.type(input, "user@example.com");

    await expect(input).toHaveValue("user@example.com");
  },
};

function SuffixActionIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="16"
      viewBox="0 0 16 16"
      width="16"
    >
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M1.75 8c1.5-3 3.7-4.75 6.25-4.75S13.75 5 15.25 8c-1.5 3-3.7 4.75-6.25 4.75S3.25 11 1.75 8Z"
        stroke="currentColor"
        strokeWidth="1.25"
      />
    </svg>
  );
}

export const WithPrefix: Story = {
  name: "With Prefix",
  args: {
    prefix: <UserPrefixIcon />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Email");

    await expect(input).toBeVisible();
    await expect(canvas.getByLabelText("Email")).toHaveAccessibleName("Email");
  },
};

export const WithSuffix: Story = {
  name: "With Suffix",
  args: {
    autoComplete: "current-password",
    label: "Password",
    suffix: (
      <button aria-label="Show password" type="button">
        <SuffixActionIcon />
      </button>
    ),
    type: "password",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Password");

    await expect(input).toHaveAttribute("type", "password");
    await expect(
      canvas.getByRole("button", { name: "Show password" }),
    ).toBeVisible();
  },
};

export const Filled: Story = {
  args: {
    defaultValue: "user@example.com",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Email");

    await expect(input).toBeDisabled();

    await userEvent.click(input);
    await userEvent.keyboard("x");

    await expect(input).toHaveValue("");
  },
};

export const Error: Story = {
  args: {
    defaultValue: "invalid",
    error: "Enter a valid email",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Email");

    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(canvas.getByText("Enter a valid email")).toBeVisible();
  },
};

export const HelperText: Story = {
  name: "Helper Text",
  args: {
    hint: "We'll never share your email.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Email");

    await expect(input).toHaveAccessibleDescription(
      "We'll never share your email.",
    );
  },
};

export const Password: Story = {
  args: {
    autoComplete: "current-password",
    label: "Password",
  },
  render: ({ suffix: _suffix, type: _type, ...args }) => (
    <HoldToShowPasswordField {...args} />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Password");
    const reveal = canvas.getByRole("button", {
      name: "Hold to show password",
    });

    await userEvent.type(input, "secret");

    await expect(input).toHaveAttribute("type", "password");
    await expect(input).toHaveValue("secret");
    await expect(reveal).toBeVisible();

    await fireEvent.pointerDown(reveal);
    await expect(input).toHaveAttribute("type", "text");

    await fireEvent.pointerUp(reveal);
    await expect(input).toHaveAttribute("type", "password");
  },
};
