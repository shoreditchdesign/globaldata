import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { Tabs, TabsList, TabsTab } from "./Tabs";
import { TabsOverview } from "./TabsOverview";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  parameters: {
    layout: "fullscreen",
    chromatic: {
      viewports: [375, 768, 1200],
    },
  },
  render: () => <TabsOverview />,
};

export const Default: Story = {
  args: {
    defaultValue: "one",
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTab value="one">One</TabsTab>
        <TabsTab value="two">Two</TabsTab>
        <TabsTab value="three">Three</TabsTab>
      </TabsList>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const one = canvas.getByRole("tab", { name: "One" });
    const two = canvas.getByRole("tab", { name: "Two" });
    const three = canvas.getByRole("tab", { name: "Three" });

    await expect(one).toHaveAttribute("aria-selected", "true");
    await expect(two).toHaveAttribute("aria-selected", "false");

    await userEvent.click(two);

    await expect(two).toHaveAttribute("aria-selected", "true");
    await expect(one).toHaveAttribute("aria-selected", "false");

    await userEvent.click(one);
    await userEvent.keyboard("{ArrowRight}");

    await expect(two).toHaveFocus();
    await expect(one).toHaveAttribute("aria-selected", "true");

    await userEvent.keyboard("{Enter}");
    await expect(two).toHaveAttribute("aria-selected", "true");

    await userEvent.keyboard("{End}");
    await expect(three).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await expect(three).toHaveAttribute("aria-selected", "true");

    await userEvent.keyboard("{Home}");
    await expect(one).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await expect(one).toHaveAttribute("aria-selected", "true");
  },
};
