import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { Card } from "./Card";
import { CardOverview } from "./CardOverview";
import styles from "./CardOverview.module.css";
import {
  CardDemoIcon,
  cardDemoDate,
  cardDemoLongTitle,
  cardDemoTitle,
} from "./cardDemo";

const meta = {
  title: "Components/Card",
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

const cardChromatic = {
  viewports: [375, 768, 1200],
};

function expectNoPageOverflow(canvasElement: HTMLElement) {
  const { documentElement } = canvasElement.ownerDocument;

  expect(documentElement.scrollWidth).toBeLessThanOrEqual(
    documentElement.clientWidth + 1,
  );
}

export const Overview: Story = {
  args: {
    title: cardDemoTitle,
  },
  parameters: {
    layout: "fullscreen",
    chromatic: cardChromatic,
  },
  render: () => <CardOverview />,
};

export const Default: Story = {
  args: {
    date: cardDemoDate,
    icon: <CardDemoIcon />,
    title: cardDemoTitle,
  },
  parameters: {
    layout: "padded",
    chromatic: cardChromatic,
  },
  render: (args) => (
    <div className={styles.storyFrame}>
      <Card className={styles.storyCard} {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText(cardDemoDate)).toBeVisible();
    await expect(canvas.getByText(cardDemoTitle)).toBeVisible();
    expectNoPageOverflow(canvasElement);
  },
};

export const WithoutIcon: Story = {
  name: "Without Icon",
  args: {
    date: cardDemoDate,
    title: cardDemoTitle,
  },
  parameters: {
    layout: "padded",
    chromatic: cardChromatic,
  },
  render: (args) => (
    <div className={styles.storyFrame}>
      <Card className={styles.storyCard} {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText(cardDemoDate)).toBeVisible();
    await expect(canvas.getByText(cardDemoTitle)).toBeVisible();
    expect(canvasElement.querySelector("svg")).toBeNull();
    expectNoPageOverflow(canvasElement);
  },
};

export const LongTitle: Story = {
  name: "Long Title",
  args: {
    date: cardDemoDate,
    icon: <CardDemoIcon />,
    title: cardDemoLongTitle,
  },
  parameters: {
    layout: "padded",
    chromatic: cardChromatic,
  },
  render: (args) => (
    <div className={styles.storyFrame}>
      <Card className={styles.storyCard} {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByText(cardDemoLongTitle);

    await expect(title).toBeVisible();
    expect(title.getBoundingClientRect().height).toBeGreaterThan(17);
    expectNoPageOverflow(canvasElement);
  },
};
