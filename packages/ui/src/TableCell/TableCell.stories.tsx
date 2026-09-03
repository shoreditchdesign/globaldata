import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { TableCell } from "./TableCell";

const meta = {
  title: "Atoms/Table Cell",
  component: TableCell,
} satisfies Meta<typeof TableCell>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "pembrolizumab",
  },
};

export const Link: Story = {
  args: {
    children: "Keytruda",
    href: "#keytruda",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link", { name: "Keytruda" });

    await expect(link).toHaveAttribute("href", "#keytruda");
  },
};

export const Empty: Story = {
  args: {
    children: "—",
  },
};
