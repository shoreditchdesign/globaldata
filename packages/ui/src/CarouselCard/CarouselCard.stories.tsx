import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { CarouselCard } from "./CarouselCard";
import { CarouselCardOverview } from "./CarouselCardOverview";
import styles from "./CarouselCardOverview.module.css";
import {
  CarouselCardDemoMedia,
  carouselCardDemoAction,
  carouselCardDemoCompactEyebrow,
  carouselCardDemoCompactItems,
  carouselCardDemoCompactTitle,
  carouselCardDemoDescription,
  carouselCardDemoEyebrow,
  carouselCardDemoLongDescription,
  carouselCardDemoLongTitle,
  carouselCardDemoTitle,
} from "./carouselCardDemo";

const meta = {
  title: "Components/Carousel Card",
  id: "components-carouselcard",
  component: CarouselCard,
} satisfies Meta<typeof CarouselCard>;

export default meta;

type Story = StoryObj<typeof meta>;

const carouselCardChromatic = {
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
    title: carouselCardDemoTitle,
  },
  parameters: {
    layout: "fullscreen",
    chromatic: carouselCardChromatic,
  },
  render: () => <CarouselCardOverview />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText(carouselCardDemoEyebrow)).toBeVisible();
    await expect(canvas.getByText(carouselCardDemoTitle)).toBeVisible();
    await expect(canvas.getByText(carouselCardDemoAction)).toBeVisible();

    await expect(canvas.getByText("Industry Insight")).toBeVisible();
    await expect(
      canvas.getByText(carouselCardDemoCompactItems[1].title),
    ).toBeVisible();
    expect(
      canvasElement.querySelectorAll('[data-variant="compact"]').length,
    ).toBeGreaterThanOrEqual(3);

    expectNoPageOverflow(canvasElement);
  },
};

export const Featured: Story = {
  args: {
    actionLabel: carouselCardDemoAction,
    description: carouselCardDemoDescription,
    eyebrow: carouselCardDemoEyebrow,
    media: <CarouselCardDemoMedia />,
    title: carouselCardDemoTitle,
    variant: "featured",
  },
  parameters: {
    layout: "padded",
    chromatic: carouselCardChromatic,
  },
  render: (args) => (
    <div className={styles.storyFrame}>
      <div className={styles.livePreview}>
        <CarouselCard {...args} />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText(carouselCardDemoEyebrow)).toBeVisible();
    await expect(canvas.getByText(carouselCardDemoTitle)).toBeVisible();
    await expect(canvas.getByText(carouselCardDemoDescription)).toBeVisible();
    await expect(canvas.getByText(carouselCardDemoAction)).toBeVisible();
    const mediaImage = canvasElement.querySelector("img");
    expect(mediaImage).not.toBeNull();
    expect(getComputedStyle(mediaImage!).objectFit).toBe("cover");
    expect(canvasElement.querySelector('[data-variant="compact"]')).toBeNull();
    expectNoPageOverflow(canvasElement);
  },
};

export const Compact: Story = {
  args: {
    actionLabel: carouselCardDemoAction,
    description: carouselCardDemoDescription,
    eyebrow: carouselCardDemoCompactEyebrow,
    media: <CarouselCardDemoMedia />,
    title: carouselCardDemoCompactTitle,
    variant: "compact",
  },
  parameters: {
    layout: "padded",
    chromatic: carouselCardChromatic,
  },
  render: (args) => (
    <div className={styles.storyFrame}>
      <CarouselCard className={styles.compactCard} {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText(carouselCardDemoCompactEyebrow)).toBeVisible();
    await expect(canvas.getByText(carouselCardDemoCompactTitle)).toBeVisible();
    expect(canvas.queryByText(carouselCardDemoDescription)).toBeNull();
    expect(canvas.queryByText(carouselCardDemoAction)).toBeNull();
    expect(canvasElement.querySelector("img")).toBeNull();

    const card = canvasElement.querySelector("[data-variant='compact']");
    const eyebrow = canvas.getByText(carouselCardDemoCompactEyebrow);

    expect(card).not.toBeNull();
    expect(getComputedStyle(card!).backgroundColor).toBe("rgb(255, 255, 255)");
    expect(getComputedStyle(eyebrow).backgroundColor).toBe("rgb(243, 246, 255)");
    expect(getComputedStyle(eyebrow).color).toBe("rgb(8, 33, 106)");
    expectNoPageOverflow(canvasElement);
  },
};

export const LongContent: Story = {
  name: "Long Content",
  tags: ["!dev"],
  args: {
    actionLabel: carouselCardDemoAction,
    description: carouselCardDemoLongDescription,
    eyebrow: carouselCardDemoEyebrow,
    media: <CarouselCardDemoMedia />,
    title: carouselCardDemoLongTitle,
    variant: "featured",
  },
  parameters: {
    layout: "padded",
    chromatic: carouselCardChromatic,
  },
  render: (args) => (
    <div className={styles.storyFrame}>
      <div className={styles.storyPreview}>
        <CarouselCard {...args} />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByRole("heading", {
      name: carouselCardDemoLongTitle,
    });
    const card = canvasElement.querySelector("[data-variant='featured']");
    const surface = canvasElement.querySelector("[class*='storyPreview']");

    await expect(title).toBeVisible();
    expect(title.getBoundingClientRect().height).toBeGreaterThan(36);
    expect(card).not.toBeNull();
    expect(surface).not.toBeNull();

    const cardBox = card!.getBoundingClientRect();
    const surfaceBox = surface!.getBoundingClientRect();

    expect(cardBox.bottom).toBeLessThanOrEqual(surfaceBox.bottom + 1);
    expect(cardBox.right).toBeLessThanOrEqual(surfaceBox.right + 1);
    expectNoPageOverflow(canvasElement);
  },
};

export const WithoutMedia: Story = {
  name: "Without Media",
  args: {
    actionLabel: carouselCardDemoAction,
    description: carouselCardDemoDescription,
    eyebrow: carouselCardDemoEyebrow,
    title: carouselCardDemoTitle,
    variant: "featured",
  },
  parameters: {
    layout: "padded",
    chromatic: carouselCardChromatic,
  },
  render: (args) => (
    <div className={styles.storyFrame}>
      <div className={styles.livePreview}>
        <CarouselCard {...args} />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText(carouselCardDemoTitle)).toBeVisible();
    expect(canvasElement.querySelector("img")).toBeNull();
    expectNoPageOverflow(canvasElement);
  },
};
