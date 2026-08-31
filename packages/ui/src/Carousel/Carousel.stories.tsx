import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { Carousel } from "./Carousel";
import { CarouselOverview } from "./CarouselOverview";
import styles from "./CarouselOverview.module.css";
import {
  carouselDemoFewItems,
  carouselDemoItems,
  carouselDemoWithoutMedia,
} from "./carouselDemo";
import {
  carouselCardDemoAction,
  carouselCardDemoCompactItems,
  carouselCardDemoTitle,
} from "../CarouselCard/carouselCardDemo";

const meta = {
  title: "Components/Carousel",
  component: Carousel,
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

const carouselChromatic = {
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
    items: carouselDemoItems,
  },
  parameters: {
    layout: "fullscreen",
    chromatic: carouselChromatic,
  },
  render: () => <CarouselOverview />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText(carouselCardDemoTitle)).toBeVisible();
    expect(canvas.getAllByRole("button", { name: /Show item/i })).toHaveLength(
      3,
    );
    await expect(
      canvas.getByRole("button", { name: "Previous item" }),
    ).toBeDisabled();
    expectNoPageOverflow(canvasElement);
  },
};

export const Default: Story = {
  args: {
    items: carouselDemoItems,
  },
  parameters: {
    layout: "padded",
    chromatic: carouselChromatic,
  },
  render: (args) => (
    <div className={styles.storyFrame}>
      <Carousel {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const next = canvas.getByRole("button", { name: "Next item" });
    const previous = canvas.getByRole("button", { name: "Previous item" });

    await expect(canvas.getByText(carouselCardDemoTitle)).toBeVisible();
    await expect(previous).toBeDisabled();
    expect(canvas.getAllByRole("button", { name: /^Item \d+$/ })).toHaveLength(
      4,
    );

    await userEvent.click(next);

    await expect(
      canvas.getByText(carouselCardDemoCompactItems[0].title),
    ).toBeVisible();
    await expect(previous).toBeEnabled();

    await userEvent.click(canvas.getByRole("button", { name: "Item 4" }));

    await expect(
      canvas.getByText(carouselCardDemoCompactItems[2].title),
    ).toBeVisible();
    await expect(next).toBeDisabled();
    expectNoPageOverflow(canvasElement);
  },
};

export const FewItems: Story = {
  name: "Few Items",
  args: {
    items: carouselDemoFewItems,
  },
  parameters: {
    layout: "padded",
    chromatic: carouselChromatic,
  },
  render: (args) => (
    <div className={styles.storyFrame}>
      <Carousel {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText(carouselCardDemoTitle)).toBeVisible();
    expect(canvas.getAllByRole("button", { name: /Show item/i })).toHaveLength(
      1,
    );
    expect(canvas.getAllByRole("button", { name: /^Item \d+$/ })).toHaveLength(
      2,
    );
    expectNoPageOverflow(canvasElement);
  },
};

export const WithoutMedia: Story = {
  name: "Without Media",
  args: {
    items: carouselDemoWithoutMedia,
  },
  parameters: {
    layout: "padded",
    chromatic: carouselChromatic,
  },
  render: (args) => (
    <div className={styles.storyFrame}>
      <Carousel {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText(carouselCardDemoAction)).toBeVisible();
    expect(canvasElement.querySelector("img")).toBeNull();
    expectNoPageOverflow(canvasElement);
  },
};
