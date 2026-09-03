import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { HeaderCell, type HeaderCellSort } from "./HeaderCell";

const meta = {
  title: "Atoms/Header Cell",
  component: HeaderCell,
  decorators: [
    (Story) => (
      <div role="table">
        <div role="row">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof HeaderCell>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Drug Name",
  },
};

function SortableHeaderCell() {
  const [sort, setSort] = useState<HeaderCellSort>(null);

  return (
    <HeaderCell onSortChange={setSort} sortable sortDirection={sort}>
      Drug Name
    </HeaderCell>
  );
}

export const Sortable: Story = {
  args: {
    children: "Drug Name",
  },
  render: () => <SortableHeaderCell />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Drug Name" });
    const header = button.closest("[aria-sort]") as HTMLElement;

    await expect(header).toHaveAttribute("aria-sort", "none");

    await userEvent.click(button);
    await expect(header).toHaveAttribute("aria-sort", "ascending");

    await userEvent.click(button);
    await expect(header).toHaveAttribute("aria-sort", "descending");

    await userEvent.click(button);
    await expect(header).toHaveAttribute("aria-sort", "none");
  },
};

export const SortedAscending: Story = {
  args: {
    children: "Drug Name",
    sortable: true,
    sortDirection: "asc",
  },
};

export const SortedDescending: Story = {
  args: {
    children: "Drug Name",
    sortable: true,
    sortDirection: "desc",
  },
};
