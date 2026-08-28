import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import type { ReactNode } from "react";

import { Button } from "../Button/Button";
import { Dialog, DialogPopup, DialogTrigger } from "./Dialog";
import { DialogDocsOverview } from "./DialogDocsOverview";
import { DialogProfileContent, DialogProfileFooter } from "./DialogOverview";

const meta = {
  title: "Components/Modal Dialog",
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
    expect(dialog).toBeVisible();
    expect(dialog).toHaveFocus();
  });
}

async function waitForDialogClosed(dialog: HTMLElement, trigger: HTMLElement) {
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

export const Overview: Story = {
  parameters: {
    layout: "fullscreen",
    chromatic: {
      viewports: [375, 768, 1200],
    },
  },
  render: () => <DialogDocsOverview />,
};

export const Default: Story = {
  parameters: {
    layout: "fullscreen",
    chromatic: {
      viewports: [375, 768, 1200],
    },
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

    await waitFor(() => {
      expect(dialog).toBeVisible();
    });
    await expect(dialog).toHaveAccessibleName("Example dialog");
    await expect(dialog).toHaveAttribute("aria-modal", "true");
    await waitForDialogFocus(dialog);
    await expect(page.getByRole("button", { name: "Close" })).toBeEnabled();
    expect(dialog.scrollWidth).toBeLessThanOrEqual(dialog.clientWidth + 1);
  },
};

export const WithTrigger: Story = {
  parameters: {
    layout: "fullscreen",
    chromatic: {
      viewports: [375, 768, 1200],
    },
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

    await waitFor(() => {
      expect(dialog).toBeVisible();
    });
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

    await waitFor(() => {
      expect(reopened).toBeVisible();
    });
    await waitForDialogFocus(reopened);

    await userEvent.keyboard("{Escape}");

    await waitForDialogClosed(reopened, trigger);
  },
};

export const OverlayDismiss: Story = {
  parameters: {
    layout: "fullscreen",
    chromatic: { disableSnapshot: true },
  },
  tags: ["!dev"],
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

    await waitFor(() => {
      expect(dialog).toBeVisible();
    });

    await clickOutsideDialog(canvasElement, dialog);

    await waitForDialogClosed(dialog, trigger);
  },
};

export const DisablePointerDismissal: Story = {
  parameters: {
    layout: "fullscreen",
    chromatic: { disableSnapshot: true },
  },
  tags: ["!dev"],
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

    await waitFor(() => {
      expect(dialog).toBeVisible();
    });

    await clickOutsideDialog(canvasElement, dialog);

    await waitFor(() => {
      expect(dialog).toBeVisible();
    });
  },
};

export const WithoutDescription: Story = {
  parameters: {
    layout: "fullscreen",
    chromatic: { disableSnapshot: true },
  },
  tags: ["!dev"],
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

    await waitFor(() => {
      expect(dialog).toBeVisible();
    });
    await expect(dialog).toHaveAccessibleName("Example dialog");
  },
};

export const NamedWithAriaLabel: Story = {
  parameters: {
    layout: "fullscreen",
    chromatic: { disableSnapshot: true },
  },
  tags: ["!dev"],
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

    await waitFor(() => {
      expect(dialog).toBeVisible();
    });
    await expect(dialog).toHaveAccessibleName("Settings dialog");
  },
};

export const LongContent: Story = {
  parameters: {
    layout: "fullscreen",
    chromatic: {
      viewports: [375, 768, 1200],
    },
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

    await waitFor(() => {
      expect(dialog).toBeVisible();
    });
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
    expect(dialog.scrollWidth).toBeLessThanOrEqual(dialog.clientWidth + 1);
    expect(body!.scrollHeight).toBeGreaterThan(body!.clientHeight);
  },
};

export const ProfileAndFocus: Story = {
  name: "Profile & Focus — Example Composition",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Example composition built from reusable Dialog and other primitives. Not a public library component.",
      },
    },
    a11y: {
      config: {
        rules: [{ id: "link-in-text-block", enabled: false }],
      },
    },
    chromatic: {
      viewports: [375, 768, 1200],
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
    const geography = page.getByRole("button", { name: "Geography Focus" });

    await waitFor(() => {
      expect(dialog).toBeVisible();
    });
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
    expect(dialog.scrollWidth).toBeLessThanOrEqual(dialog.clientWidth + 1);
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
    const geography = page.getByRole("button", { name: "Geography Focus" });
    const mobile = page.getByRole("textbox", { name: "Mobile Number" });

    await expect(geography).toBeEnabled();

    await userEvent.click(geography);

    await waitFor(() => {
      expect(geography).toHaveAttribute("aria-expanded", "true");
    });

    const unitedKingdom = page.getByRole("checkbox", {
      name: "United Kingdom",
    });

    await waitFor(() => {
      expect(unitedKingdom).toBeVisible();
    });
    await expect(unitedKingdom).not.toBeChecked();

    await userEvent.click(unitedKingdom);

    await expect(unitedKingdom).toBeChecked();
    await expect(geography).toHaveAttribute("aria-expanded", "true");
    await expect(
      page.queryByRole("button", { name: "Remove United Kingdom" }),
    ).not.toBeInTheDocument();

    await userEvent.click(page.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(geography).toHaveAttribute("aria-expanded", "false");
    });

    const geographyField = within(geography.parentElement as HTMLElement);
    const emptyHint =
      "None selected – add this to tailor our content to your business objectives.";

    await waitFor(() => {
      expect(
        geographyField.getByRole("button", { name: "Remove United Kingdom" }),
      ).toBeVisible();
    });
    await expect(geographyField.queryByText(emptyHint)).not.toBeInTheDocument();
    await expect(geography).toHaveTextContent("Geography Focus");
    await expect(page.getAllByText(emptyHint)).toHaveLength(2);

    await userEvent.click(geography);
    await waitFor(() => {
      expect(geography).toHaveAttribute("aria-expanded", "true");
    });
    await expect(
      geographyField.getByRole("checkbox", { name: "United Kingdom" }),
    ).toBeChecked();
    await userEvent.keyboard("{Escape}");
    await waitFor(() => {
      expect(geography).toHaveAttribute("aria-expanded", "false");
    });
    await expect(
      geographyField.getByRole("button", { name: "Remove United Kingdom" }),
    ).toBeVisible();

    await userEvent.click(
      geographyField.getByRole("button", { name: "Remove United Kingdom" }),
    );
    await waitFor(() => {
      expect(
        geographyField.queryByRole("button", { name: "Remove United Kingdom" }),
      ).not.toBeInTheDocument();
    });
    await expect(geographyField.getByText(emptyHint)).toBeVisible();

    const sector = page.getByRole("button", { name: "Sector Focus" });

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
    await expect(mobile).toHaveFocus();

    const mobileControl = mobile.parentElement as HTMLElement;
    const phoneGroup = mobileControl.parentElement
      ?.parentElement as HTMLElement;

    expect(getComputedStyle(mobile).outlineStyle).toBe("none");
    expect(getComputedStyle(mobileControl).outlineStyle).toBe("none");
    expect(getComputedStyle(phoneGroup).outlineStyle).toBe("none");
    await waitFor(() => {
      expect(getComputedStyle(phoneGroup).borderTopColor).toBe(
        "rgb(5, 10, 22)",
      );
      expect(getComputedStyle(mobile).backgroundColor).toBe(
        "rgb(255, 255, 255)",
      );
    });

    const countryCode = page.getByRole("combobox", { name: "Country Code" });

    await userEvent.click(countryCode);
    await waitFor(() => {
      expect(countryCode).toHaveAttribute("aria-expanded", "true");
    });

    const countryCodePopup = page.getByRole("listbox");

    await waitFor(() => {
      expect(countryCodePopup).toBeVisible();
    });

    const groupBox = phoneGroup.getBoundingClientRect();
    const popupBox = countryCodePopup.getBoundingClientRect();

    expect(Math.abs(popupBox.left - groupBox.left)).toBeLessThan(3);
    expect(Math.abs(popupBox.right - groupBox.right)).toBeLessThan(3);

    await userEvent.click(countryCode);
    await waitFor(() => {
      expect(countryCode).toHaveAttribute("aria-expanded", "false");
    });

    const country = page.getByRole("combobox", { name: "Country" });
    const countryClosedWidth = country.getBoundingClientRect().width;

    await userEvent.click(country);
    await waitFor(() => {
      expect(country).toHaveAttribute("aria-expanded", "true");
    });

    const countryPopup = page.getByRole("listbox");

    await waitFor(() => {
      expect(countryPopup).toBeVisible();
    });

    const countryBox = country.getBoundingClientRect();
    const countryPanel = countryPopup.parentElement as HTMLElement;
    const countryPanelBox = countryPanel.getBoundingClientRect();
    const dialogBox = page
      .getByRole("dialog", { name: "Your Profile and Focus" })
      .getBoundingClientRect();
    const countrySearch = page.getByRole("searchbox", {
      name: "Search countries",
    });
    const countrySearchBox = countrySearch.getBoundingClientRect();

    expect(
      Math.abs(country.getBoundingClientRect().width - countryClosedWidth),
    ).toBeLessThan(1);
    expect(Math.abs(countryPanelBox.left - countryBox.left)).toBeLessThan(2);
    expect(Math.abs(countryPanelBox.right - countryBox.right)).toBeLessThan(2);
    expect(Math.abs(countryPanelBox.width - countryBox.width)).toBeLessThan(2);
    expect(countryPanelBox.left).toBeGreaterThanOrEqual(dialogBox.left - 1);
    expect(countryPanelBox.right).toBeLessThanOrEqual(dialogBox.right + 1);
    expect(countrySearchBox.left).toBeGreaterThan(countryPanelBox.left);
    expect(countrySearchBox.right).toBeLessThan(countryPanelBox.right);
    expect(getComputedStyle(countryPanel).boxSizing).toBe("border-box");

    await userEvent.click(country);
    await waitFor(() => {
      expect(country).toHaveAttribute("aria-expanded", "false");
    });

    const department = page.getByRole("textbox", { name: "Job Department" });
    const jobTitle = page.getByRole("textbox", { name: "Job Title" });

    await userEvent.type(department, "Marketing");
    await expect(department).toHaveValue("Marketing");
    await expect(jobTitle).toBeEnabled();

    await expect(mobile).toHaveAttribute("inputmode", "tel");
    await expect(
      page.queryByText("Enter a valid mobile number"),
    ).not.toBeInTheDocument();

    await userEvent.clear(mobile);
    await userEvent.type(mobile, "not a number");
    await expect(mobile).toHaveValue("not a number");
    await expect(
      page.queryByText("Enter a valid mobile number"),
    ).not.toBeInTheDocument();

    await userEvent.click(jobTitle);
    await waitFor(() => {
      expect(page.getByText("Enter a valid mobile number")).toBeVisible();
    });

    await userEvent.click(mobile);
    await userEvent.clear(mobile);
    await userEvent.type(mobile, "+44 7700 900000");
    await waitFor(() => {
      expect(
        page.queryByText("Enter a valid mobile number"),
      ).not.toBeInTheDocument();
    });

    await userEvent.clear(mobile);
    await userEvent.type(mobile, "abc");
    await userEvent.click(
      page.getByRole("button", { name: "Save Preferences" }),
    );
    await waitFor(() => {
      expect(page.getByText("Enter a valid mobile number")).toBeVisible();
    });
    await expect(mobile).toHaveFocus();
  },
};
