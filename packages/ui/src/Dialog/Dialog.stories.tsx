import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import type { ReactNode } from "react";

import { Button } from "../Button/Button";
import { Dialog, DialogPopup, DialogTrigger } from "./Dialog";
import { DialogProfileContent, DialogProfileFooter } from "./DialogOverview";

const meta = {
  title: "Components/Dialog",
  component: Dialog,
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

function getPage(canvasElement: HTMLElement) {
  return within(canvasElement.ownerDocument.body);
}

function isFocusInsideDialog(dialog: HTMLElement, active: Element | null) {
  if (!active) {
    return false;
  }

  if (active === dialog || dialog.contains(active)) {
    return true;
  }

  return active.hasAttribute("data-base-ui-focus-guard");
}

async function waitForDialogFocus(dialog: HTMLElement) {
  await waitFor(() => {
    expect(dialog).toHaveFocus();
  });
}

async function waitForDialogClosed(
  dialog: HTMLElement,
  trigger: HTMLElement,
) {
  await waitFor(() => {
    expect(dialog).not.toBeVisible();
    expect(trigger).toHaveFocus();
  });
}

async function clickOutsideDialog(
  canvasElement: HTMLElement,
  dialog: HTMLElement,
) {
  const hitTarget = canvasElement.ownerDocument.elementFromPoint(8, 8);

  expect(hitTarget).not.toBeNull();
  expect(dialog.contains(hitTarget) || dialog === hitTarget).toBe(false);

  await userEvent.click(hitTarget as Element);
}

function CenterInCanvas({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      {children}
    </div>
  );
}

const centerTriggerDecorator: Story["decorators"] = [
  (Story) => (
    <CenterInCanvas>
      <Story />
    </CenterInCanvas>
  ),
];

export const Default: Story = {
  parameters: {
    layout: "fullscreen",
  },
  args: {
    defaultOpen: true,
  },
  render: (args) => (
    <Dialog {...args}>
      <DialogPopup
        title="Example dialog"
        description="A reusable dialog with a title, description, body content, and footer."
        footer={<Button>Continue</Button>}
      >
        <p>Dialog body content goes here.</p>
      </DialogPopup>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const page = getPage(canvasElement);
    const dialog = page.getByRole("dialog", { name: "Example dialog" });

    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAccessibleName("Example dialog");
    await expect(dialog).toHaveAttribute("aria-modal", "true");
    await waitForDialogFocus(dialog);
    await expect(page.getByRole("button", { name: "Close" })).toBeEnabled();
  },
};

export const WithTrigger: Story = {
  parameters: {
    layout: "fullscreen",
  },
  decorators: centerTriggerDecorator,
  args: {
    onOpenChange: fn(),
  },
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger render={<Button />}>Open dialog</DialogTrigger>
      <DialogPopup
        title="Example dialog"
        description="Open, close, and return focus from the trigger."
        footer={<Button>Continue</Button>}
      >
        <p>Dialog body content goes here.</p>
      </DialogPopup>
    </Dialog>
  ),
};

export const WithTriggerInteractions: Story = {
  parameters: {
    layout: "fullscreen",
    chromatic: { disableSnapshot: true },
  },
  decorators: centerTriggerDecorator,
  tags: ["!dev"],
  args: {
    onOpenChange: fn(),
  },
  render: WithTrigger.render,
  play: async ({ canvasElement }) => {
    const page = getPage(canvasElement);
    const trigger = page.getByRole("button", { name: "Open dialog" });

    await userEvent.click(trigger);

    const dialog = page.getByRole("dialog", { name: "Example dialog" });
    const close = page.getByRole("button", { name: "Close" });
    const continueButton = page.getByRole("button", { name: "Continue" });

    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAccessibleName("Example dialog");
    await expect(dialog).toHaveAttribute("aria-modal", "true");
    await waitForDialogFocus(dialog);

    const ownerDocument = canvasElement.ownerDocument;
    let reachedClose = false;
    let reachedContinue = false;

    for (let index = 0; index < 8; index += 1) {
      await userEvent.tab();
      const active = ownerDocument.activeElement;

      expect(isFocusInsideDialog(dialog, active)).toBe(true);
      expect(active).not.toBe(trigger);

      if (active === close) {
        reachedClose = true;
      }

      if (active === continueButton) {
        reachedContinue = true;
      }
    }

    expect(reachedClose).toBe(true);
    expect(reachedContinue).toBe(true);

    await userEvent.tab({ shift: true });
    expect(isFocusInsideDialog(dialog, ownerDocument.activeElement)).toBe(true);
    expect(ownerDocument.activeElement).not.toBe(trigger);

    await userEvent.click(close);

    await waitForDialogClosed(dialog, trigger);

    await userEvent.click(trigger);

    const reopened = page.getByRole("dialog", { name: "Example dialog" });

    await expect(reopened).toBeVisible();
    await waitForDialogFocus(reopened);

    await userEvent.keyboard("{Escape}");

    await waitForDialogClosed(reopened, trigger);
  },
};

export const OverlayDismiss: Story = {
  parameters: {
    layout: "fullscreen",
  },
  decorators: centerTriggerDecorator,
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button />}>Open dialog</DialogTrigger>
      <DialogPopup
        title="Example dialog"
        description="Click the overlay to dismiss."
      >
        <p>Dialog body content goes here.</p>
      </DialogPopup>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const page = getPage(canvasElement);
    const trigger = page.getByRole("button", { name: "Open dialog" });

    await userEvent.click(trigger);

    const dialog = page.getByRole("dialog", { name: "Example dialog" });

    await expect(dialog).toBeVisible();

    await clickOutsideDialog(canvasElement, dialog);

    await waitForDialogClosed(dialog, trigger);
  },
};

export const DisablePointerDismissal: Story = {
  parameters: {
    layout: "fullscreen",
  },
  args: {
    defaultOpen: true,
    disablePointerDismissal: true,
  },
  render: (args) => (
    <Dialog {...args}>
      <DialogPopup
        title="Example dialog"
        description="Overlay clicks do not close this dialog."
      >
        <p>Dialog body content goes here.</p>
      </DialogPopup>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const page = getPage(canvasElement);
    const dialog = page.getByRole("dialog", { name: "Example dialog" });

    await expect(dialog).toBeVisible();

    await clickOutsideDialog(canvasElement, dialog);

    await expect(dialog).toBeVisible();
  },
};

export const WithoutDescription: Story = {
  parameters: {
    layout: "fullscreen",
  },
  args: {
    defaultOpen: true,
  },
  render: (args) => (
    <Dialog {...args}>
      <DialogPopup title="Example dialog" footer={<Button>Continue</Button>}>
        <p>This dialog has a title and body, but no description.</p>
      </DialogPopup>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const page = getPage(canvasElement);
    const dialog = page.getByRole("dialog", { name: "Example dialog" });

    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAccessibleName("Example dialog");
  },
};

export const NamedWithAriaLabel: Story = {
  parameters: {
    layout: "fullscreen",
  },
  args: {
    defaultOpen: true,
  },
  render: (args) => (
    <Dialog {...args}>
      <DialogPopup aria-label="Settings dialog">
        <p>This dialog is named with aria-label instead of a title.</p>
      </DialogPopup>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const page = getPage(canvasElement);
    const dialog = page.getByRole("dialog", { name: "Settings dialog" });

    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAccessibleName("Settings dialog");
  },
};

export const LongContent: Story = {
  parameters: {
    layout: "fullscreen",
  },
  args: {
    defaultOpen: true,
  },
  render: (args) => (
    <Dialog {...args}>
      <DialogPopup
        title="Long content"
        description="The dialog body scrolls when the content is taller than the available space."
        footer={<Button>Continue</Button>}
      >
        {Array.from({ length: 24 }, (_, index) => (
          <p key={index}>
            Placeholder paragraph {index + 1}. This copy exists to demonstrate
            scrolling inside the dialog while the header, close button, and
            footer stay in place.
          </p>
        ))}
      </DialogPopup>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const page = getPage(canvasElement);
    const dialog = page.getByRole("dialog", { name: "Long content" });
    const heading = page.getByRole("heading", { name: "Long content" });
    const footerButton = page.getByRole("button", { name: "Continue" });

    await expect(dialog).toBeVisible();
    await expect(heading).toBeVisible();
    await expect(footerButton).toBeVisible();

    const popupChildren = Array.from(dialog.children) as HTMLElement[];
    const body = popupChildren.at(-2);
    const footer = popupChildren.at(-1);

    expect(body).toBeDefined();
    expect(footer).toBeDefined();

    const dialogBox = dialog.getBoundingClientRect();
    const headingBox = heading.getBoundingClientRect();
    const bodyBox = body!.getBoundingClientRect();
    const footerBox = footer!.getBoundingClientRect();

    expect(headingBox.top).toBeGreaterThanOrEqual(dialogBox.top);
    expect(footerBox.bottom).toBeLessThanOrEqual(dialogBox.bottom + 1);
    expect(bodyBox.bottom).toBeLessThanOrEqual(footerBox.top + 1);
    expect(dialog.scrollHeight).toBeLessThanOrEqual(dialog.clientHeight + 1);
    expect(body!.scrollHeight).toBeGreaterThan(body!.clientHeight);
  },
};

export const ProfileAndFocus: Story = {
  parameters: {
    layout: "fullscreen",
    a11y: {
      config: {
        rules: [{ id: "link-in-text-block", enabled: false }],
      },
    },
  },
  args: {
    defaultOpen: true,
  },
  render: (args) => (
    <Dialog {...args}>
      <DialogPopup
        title="Your Profile and Focus"
        description="Customer Obsession. It runs through everything we do. Help us understand your focus so we can be your partner in achieving business excellence."
        footer={<DialogProfileFooter />}
      >
        <DialogProfileContent />
      </DialogPopup>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const page = getPage(canvasElement);
    const dialog = page.getByRole("dialog", { name: "Your Profile and Focus" });
    const heading = page.getByRole("heading", {
      name: "Your Profile and Focus",
    });
    const footerButton = page.getByRole("button", { name: "Save Preferences" });
    const geography = page.getByRole("combobox", { name: "Geography Focus" });

    await expect(dialog).toBeVisible();
    await expect(heading).toBeVisible();
    await expect(footerButton).toBeVisible();
    await expect(geography).toBeEnabled();

    const popupChildren = Array.from(dialog.children) as HTMLElement[];
    const body = popupChildren.at(-2);
    const footer = popupChildren.at(-1);

    expect(body).toBeDefined();
    expect(footer).toBeDefined();

    const bodyBox = body!.getBoundingClientRect();
    const footerBox = footer!.getBoundingClientRect();

    expect(bodyBox.bottom).toBeLessThanOrEqual(footerBox.top + 1);
    expect(dialog.scrollHeight).toBeLessThanOrEqual(dialog.clientHeight + 1);
  },
};

export const ProfileAndFocusInteractions: Story = {
  parameters: {
    layout: "fullscreen",
    chromatic: { disableSnapshot: true },
    a11y: {
      config: {
        rules: [{ id: "link-in-text-block", enabled: false }],
      },
    },
  },
  tags: ["!dev"],
  args: {
    defaultOpen: true,
  },
  render: ProfileAndFocus.render,
  play: async ({ canvasElement }) => {
    const page = getPage(canvasElement);
    const geography = page.getByRole("combobox", { name: "Geography Focus" });
    const mobile = page.getByRole("textbox", { name: "Mobile Number" });

    await expect(geography).toBeEnabled();

    await userEvent.click(geography);

    await waitFor(() => {
      expect(geography).toHaveAttribute("aria-expanded", "true");
    });

    const listbox = page.getByRole("listbox");

    await expect(listbox).toBeVisible();
    await expect(page.getByRole("option", { name: "United Kingdom" })).toBeVisible();

    await userEvent.click(page.getByRole("option", { name: "United Kingdom" }));

    await waitFor(() => {
      expect(page.queryByRole("listbox")).toBeNull();
    });
    await expect(geography).toHaveTextContent("United Kingdom");
    await expect(
      page.getAllByText(
        "None selected – add this to tailor our content to your business objectives.",
      ),
    ).toHaveLength(2);

    const sector = page.getByRole("combobox", { name: "Sector Focus" });

    await userEvent.click(sector);
    await waitFor(() => {
      expect(sector).toHaveAttribute("aria-expanded", "true");
    });

    await userEvent.keyboard("{Escape}");
    await waitFor(() => {
      expect(sector).toHaveAttribute("aria-expanded", "false");
    });

    await userEvent.type(mobile, "7700900000");
    await expect(mobile).toHaveValue("7700900000");
  },
};
