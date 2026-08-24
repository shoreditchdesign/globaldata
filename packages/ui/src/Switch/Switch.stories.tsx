import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { Switch } from "./Switch";

const meta = {
  title: "Components/Switch",
  component: Switch,
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    "aria-label": "Notifications",
    onCheckedChange: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole("switch", { name: "Notifications" });

    await expect(toggle).toHaveAttribute("aria-checked", "false");

    await userEvent.click(toggle);

    await expect(args.onCheckedChange).toHaveBeenCalledOnce();
  },
};

export const Checked: Story = {
  args: {
    "aria-label": "Notifications",
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    "aria-label": "Notifications",
    disabled: true,
    onCheckedChange: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole("switch", { name: "Notifications" });

    await expect(toggle).toHaveAttribute("data-disabled");

    await userEvent.click(toggle);

    await expect(args.onCheckedChange).not.toHaveBeenCalled();
  },
};
