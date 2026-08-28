import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import {
  Pagination,
  PaginationIndicators,
  PaginationNext,
  PaginationPrevious,
} from "./Pagination";
import { PaginationOverview } from "./PaginationOverview";

const meta = {
  title: "Components/Pagination",
  component: Pagination,
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  args: {
    count: 4,
  },
  parameters: {
    layout: "fullscreen",
    chromatic: {
      viewports: [375, 768, 1200],
    },
  },
  render: () => <PaginationOverview />,
};

export const Indicators: Story = {
  args: {
    count: 4,
    defaultPage: 1,
    onPageChange: fn(),
  },
  render: (args) => (
    <Pagination {...args}>
      <PaginationIndicators />
    </Pagination>
  ),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const pageTwo = canvas.getByRole("button", { name: "Page 2" });
    const pageFour = canvas.getByRole("button", { name: "Page 4" });

    await expect(canvas.getAllByRole("button")).toHaveLength(4);
    await expect(pageTwo).toHaveAttribute("aria-current", "true");
    await expect(canvas.getByRole("navigation")).toHaveAccessibleName(
      "Pagination, page 2 of 4",
    );

    await userEvent.click(pageFour);

    await expect(pageFour).toHaveAttribute("aria-current", "true");
    await expect(pageTwo).not.toHaveAttribute("aria-current");
    await expect(args.onPageChange).toHaveBeenCalledWith(3);
    await expect(canvas.getByRole("navigation")).toHaveAccessibleName(
      "Pagination, page 4 of 4",
    );
  },
};

export const PreviousNext: Story = {
  name: "Previous / Next",
  args: {
    count: 4,
    defaultPage: 0,
    onPageChange: fn(),
  },
  render: (args) => (
    <Pagination {...args}>
      <PaginationPrevious />
      <PaginationNext />
    </Pagination>
  ),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const previous = canvas.getByRole("button", { name: "Previous page" });
    const next = canvas.getByRole("button", { name: "Next page" });

    await expect(canvas.getAllByRole("button")).toHaveLength(2);
    await expect(previous).toBeDisabled();
    await expect(next).toBeEnabled();
    await expect(canvas.getByRole("navigation")).toHaveAccessibleName(
      "Pagination, page 1 of 4",
    );

    await userEvent.click(next);

    await expect(previous).toBeEnabled();
    await expect(args.onPageChange).toHaveBeenCalledWith(1);
    await expect(canvas.getByRole("navigation")).toHaveAccessibleName(
      "Pagination, page 2 of 4",
    );

    await userEvent.click(previous);

    await expect(previous).toBeDisabled();
    await expect(args.onPageChange).toHaveBeenCalledWith(0);
    await expect(canvas.getByRole("navigation")).toHaveAccessibleName(
      "Pagination, page 1 of 4",
    );

    await userEvent.click(next);
    await userEvent.click(next);
    await userEvent.click(next);

    await expect(next).toBeDisabled();
    await expect(previous).toBeEnabled();
    await expect(args.onPageChange).toHaveBeenCalledWith(3);
    await expect(canvas.getByRole("navigation")).toHaveAccessibleName(
      "Pagination, page 4 of 4",
    );

    await userEvent.click(next);

    await expect(args.onPageChange).not.toHaveBeenCalledWith(4);
  },
};
