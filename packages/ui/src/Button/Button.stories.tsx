import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { Button } from "./Button";
import { ButtonOverview } from "./ButtonOverview";

const meta = {
  title: "Components/Button",
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => <ButtonOverview />,
};

export const Primary: Story = {
  args: {
    children: "Primary",
    onClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Primary" });

    await expect(button).toBeEnabled();
    await expect(button).toHaveAttribute("type", "button");

    await userEvent.click(button);

    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary",
    variant: "secondary",
  },
};

export const Small: Story = {
  args: {
    children: "Small",
    size: "small",
  },
};

export const Medium: Story = {
  args: {
    children: "Medium",
    size: "medium",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true,
    onClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Disabled" });

    await expect(button).toBeDisabled();

    await userEvent.click(button);

    await expect(args.onClick).not.toHaveBeenCalled();
  },
};
