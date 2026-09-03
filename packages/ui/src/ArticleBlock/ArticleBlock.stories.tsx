import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { ArticleBlock } from "./ArticleBlock";
import { ArticleBlockOverview } from "./ArticleBlockOverview";
import styles from "./ArticleBlockOverview.module.css";
import {
  curatedCompanyListTabs,
  latestDealsTabs,
  recommendedForYouTabs,
} from "./articleBlockDemo";

const meta = {
  title: "Organisms/Article Block",
  id: "components-articleblock",
  component: ArticleBlock,
} satisfies Meta<typeof ArticleBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

const articleBlockChromatic = {
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
    tabs: recommendedForYouTabs,
    title: "Recommended for you",
  },
  parameters: {
    layout: "fullscreen",
    chromatic: articleBlockChromatic,
  },
  render: () => <ArticleBlockOverview />,
};

export const RecommendedForYou: Story = {
  name: "Recommended for You",
  args: {
    actionHref: "#recommended",
    actionLabel: "View more",
    infoLabel: "About this recommendation",
    tabs: recommendedForYouTabs,
    title: "Recommended for you",
  },
  parameters: {
    layout: "padded",
    chromatic: articleBlockChromatic,
  },
  render: (args) => (
    <div className={styles.storyFrame}>
      <ArticleBlock {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const analysis = canvas.getByRole("tab", { name: "Analysis" });
    const deals = canvas.getByRole("tab", { name: "Deals" });

    await expect(
      canvas.getByRole("heading", { name: "Recommended for you" }),
    ).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "About this recommendation" }),
    ).toBeVisible();
    await userEvent.hover(
      canvas.getByRole("button", { name: "About this recommendation" }),
    );
    await expect(
      await within(canvasElement.ownerDocument.body).findByRole("tooltip"),
    ).toHaveTextContent("About this recommendation");
    await expect(
      canvas.getByRole("link", { name: "View more" }),
    ).toBeVisible();
    await expect(analysis).toHaveAttribute("aria-selected", "true");
    await expect(
      canvas.getByRole("link", {
        name: "Oncology pipeline catalysts to watch in the next planning cycle",
      }),
    ).toBeVisible();

    await userEvent.click(deals);

    await expect(deals).toHaveAttribute("aria-selected", "true");
    await expect(analysis).toHaveAttribute("aria-selected", "false");
    await expect(
      canvas.getByRole("link", {
        name: "Mid-cap diagnostics group agrees $1.2bn take-private",
      }),
    ).toBeVisible();
    expectNoPageOverflow(canvasElement);
  },
};

export const LatestDeals: Story = {
  name: "Latest Deals",
  args: {
    actionHref: "#latest-deals",
    actionLabel: "View all",
    tabs: latestDealsTabs,
    title: "Latest Deals",
  },
  parameters: {
    layout: "padded",
    chromatic: articleBlockChromatic,
  },
  render: (args) => (
    <div className={styles.storyFrame}>
      <ArticleBlock {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole("heading", { name: "Latest Deals" }),
    ).toBeVisible();
    await expect(canvas.getByRole("link", { name: "View all" })).toBeVisible();
    expect(
      canvas.queryByRole("button", { name: "About this recommendation" }),
    ).toBeNull();
    await expect(canvas.getByRole("tab", { name: "M&A" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await expect(
      canvas.getByRole("link", {
        name: "European CDMO acquired by US private equity consortium",
      }),
    ).toBeVisible();
    expectNoPageOverflow(canvasElement);
  },
};

export const CuratedCompanyLists: Story = {
  name: "Curated Company Lists",
  args: {
    actionHref: "#curated-lists",
    actionLabel: "View all",
    tabs: curatedCompanyListTabs,
    title: "Curated Company Lists",
  },
  parameters: {
    layout: "padded",
    chromatic: articleBlockChromatic,
  },
  render: (args) => (
    <div className={styles.storyFrame}>
      <ArticleBlock {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole("heading", { name: "Curated Company Lists" }),
    ).toBeVisible();
    await expect(
      canvas.getByRole("link", {
        name: "US oncology companies with late-stage assets",
      }),
    ).toBeVisible();
    expect(canvas.queryByText(/\d{1,2} \w{3} 2026/)).toBeNull();
    expectNoPageOverflow(canvasElement);
  },
};
