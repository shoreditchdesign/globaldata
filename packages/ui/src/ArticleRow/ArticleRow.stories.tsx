import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { ArticleRow } from "./ArticleRow";
import { ArticleRowOverview } from "./ArticleRowOverview";
import styles from "./ArticleRowOverview.module.css";
import {
  articleRowDemoDate,
  articleRowDemoHref,
  articleRowDemoLongTitle,
  articleRowDemoTitle,
} from "./articleRowDemo";

const meta = {
  title: "Molecules/Article Row",
  id: "components-articlerow",
  component: ArticleRow,
} satisfies Meta<typeof ArticleRow>;

export default meta;

type Story = StoryObj<typeof meta>;

const articleRowChromatic = {
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
    title: articleRowDemoTitle,
  },
  parameters: {
    layout: "fullscreen",
    chromatic: articleRowChromatic,
  },
  render: () => <ArticleRowOverview />,
};

export const Default: Story = {
  args: {
    date: articleRowDemoDate,
    href: articleRowDemoHref,
    title: articleRowDemoTitle,
  },
  parameters: {
    layout: "padded",
    chromatic: articleRowChromatic,
  },
  render: (args) => (
    <div className={styles.storyFrame}>
      <ArticleRow {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByRole("link", { name: articleRowDemoTitle });

    await expect(title).toBeVisible();
    await expect(title).toHaveAttribute("href", articleRowDemoHref);
    await expect(canvas.getByText(articleRowDemoDate)).toBeVisible();
    expectNoPageOverflow(canvasElement);
  },
};

export const WithoutDate: Story = {
  name: "Without Date",
  args: {
    href: articleRowDemoHref,
    title: articleRowDemoTitle,
  },
  parameters: {
    layout: "padded",
    chromatic: articleRowChromatic,
  },
  render: (args) => (
    <div className={styles.storyFrame}>
      <ArticleRow {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole("link", { name: articleRowDemoTitle }),
    ).toBeVisible();
    expect(canvas.queryByText(articleRowDemoDate)).toBeNull();
    expectNoPageOverflow(canvasElement);
  },
};

export const LongTitle: Story = {
  name: "Long Title",
  args: {
    date: articleRowDemoDate,
    href: articleRowDemoHref,
    title: articleRowDemoLongTitle,
  },
  parameters: {
    layout: "padded",
    chromatic: articleRowChromatic,
  },
  render: (args) => (
    <div className={styles.storyFrame}>
      <ArticleRow {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByRole("link", { name: articleRowDemoLongTitle });
    const date = canvas.getByText(articleRowDemoDate);

    await expect(title).toBeVisible();
    await expect(title).toHaveAttribute("href", articleRowDemoHref);
    await expect(date).toBeVisible();
    expectNoPageOverflow(canvasElement);
  },
};
