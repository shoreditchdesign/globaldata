import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { NavigationBar } from "./NavigationBar";
import { NavigationBarOverview } from "./NavigationBarOverview";
import styles from "./NavigationBarOverview.module.css";
import {
  NavigationBarDemoLogo,
  navigationBarDemoItems,
  navigationBarDemoUserHref,
  navigationBarDemoUserLabel,
} from "./navigationBarDemo";

const meta = {
  title: "Organisms/Navigation Bar",
  id: "components-navigationbar",
  component: NavigationBar,
  args: {
    items: navigationBarDemoItems,
    logo: <NavigationBarDemoLogo />,
    userHref: navigationBarDemoUserHref,
    userLabel: navigationBarDemoUserLabel,
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            // Figma-defined brand colour; contrast pending design confirmation
            id: "color-contrast",
            enabled: false,
          },
        ],
      },
    },
  },
} satisfies Meta<typeof NavigationBar>;

export default meta;

type Story = StoryObj<typeof meta>;

const navigationBarChromatic = {
  viewports: [375, 768, 1200],
};

function expectNoPageOverflow(canvasElement: HTMLElement) {
  const { documentElement } = canvasElement.ownerDocument;

  expect(documentElement.scrollWidth).toBeLessThanOrEqual(
    documentElement.clientWidth + 1,
  );
}

export const Overview: Story = {
  parameters: {
    layout: "fullscreen",
    chromatic: navigationBarChromatic,
  },
  render: () => <NavigationBarOverview />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(
      canvas.getAllByRole("navigation", { name: "Primary" }).length,
    ).toBeGreaterThan(0);
    expect(canvas.getAllByRole("img", { name: "Logo" }).length).toBeGreaterThan(
      0,
    );
    expectNoPageOverflow(canvasElement);
  },
};

export const Default: Story = {
  parameters: {
    layout: "fullscreen",
    chromatic: navigationBarChromatic,
  },
  render: (args) => (
    <div className={styles.storyFrame}>
      <NavigationBar {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const companies = canvas.getByRole("button", { name: "Companies" });

    await expect(
      canvas.getByRole("navigation", { name: "Primary" }),
    ).toBeVisible();
    await expect(companies).toHaveAttribute("aria-expanded", "false");
    await expect(canvas.getByRole("link", { name: /AI Hub/ })).toBeVisible();
    await expect(
      canvas.getByRole("link", { name: navigationBarDemoUserLabel }),
    ).toBeVisible();
    expect(
      canvas.queryByRole("region", { name: "Companies" }),
    ).toBeNull();
    expectNoPageOverflow(canvasElement);
  },
};

export const MegaMenuOpen: Story = {
  name: "Mega Menu Open",
  args: {
    defaultOpenId: "companies",
  },
  parameters: {
    layout: "fullscreen",
    chromatic: navigationBarChromatic,
  },
  render: (args) => (
    <div className={styles.storyFrame}>
      <NavigationBar {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const companies = canvas.getByRole("button", { name: "Companies" });

    await expect(companies).toHaveAttribute("aria-expanded", "true");
    await expect(
      canvas.getByRole("region", { name: "Companies" }),
    ).toBeVisible();
    await expect(canvas.getByText("Inactive reports")).toBeVisible();
    expect(
      canvas.queryByRole("link", { name: "Inactive reports" }),
    ).toBeNull();
    await expect(
      canvas.getByRole("link", { name: "Company Profiles" }),
    ).toBeVisible();

    await userEvent.keyboard("{Escape}");

    await expect(companies).toHaveAttribute("aria-expanded", "false");
    await expect(companies).toHaveFocus();

    await userEvent.click(companies);

    await expect(companies).toHaveAttribute("aria-expanded", "true");
    companies.blur();
    expectNoPageOverflow(canvasElement);
  },
};
