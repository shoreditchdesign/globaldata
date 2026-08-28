import type { ReactNode } from "react";

import { Button } from "../Button/Button";
import { Dialog, DialogPopup, DialogTrigger } from "./Dialog";
import {
  OverviewDemo,
  OverviewShell,
  OverviewShowcaseRow,
} from "../storybook/OverviewShell";
import overviewStyles from "../storybook/Overview.module.css";

const previewCode = `<Dialog>
  <DialogTrigger render={<Button />}>Open dialog</DialogTrigger>
  <DialogPopup
    title="Example dialog"
    description="A reusable dialog with a title, description, and footer."
    footer={<Button>Continue</Button>}
  >
    <p>Dialog body content goes here.</p>
  </DialogPopup>
</Dialog>`;

function ExampleDialog({
  children,
  description,
  footer,
  title,
  triggerLabel,
}: {
  children: ReactNode;
  description: string;
  footer?: ReactNode;
  title: string;
  triggerLabel: string;
}) {
  return (
    <Dialog>
      <DialogTrigger render={<Button />}>{triggerLabel}</DialogTrigger>
      <DialogPopup description={description} footer={footer} title={title}>
        {children}
      </DialogPopup>
    </Dialog>
  );
}

export function DialogDocsOverview() {
  return (
    <OverviewShell
      badge={
        <svg
          aria-hidden="true"
          className={overviewStyles.heroBadgeIcon}
          viewBox="0 0 24 24"
        >
          <rect x="3.5" y="5" width="17" height="14" rx="2" />
          <path d="M3.5 9h17" />
        </svg>
      }
      code={previewCode}
      description="Dialogs focus the user on a task or message without leaving the current screen. Use a trigger to open the modal, then dismiss it with the close button, overlay, or Escape."
      preview={
        <ExampleDialog
          description="A reusable dialog with a title, description, and footer."
          footer={<Button>Continue</Button>}
          title="Example dialog"
          triggerLabel="Open dialog"
        >
          <p>Dialog body content goes here.</p>
        </ExampleDialog>
      }
      title="Modal Dialog"
    >
      <OverviewShowcaseRow
        description="A title, description, and body. Open from a trigger and dismiss with close, overlay, or Escape."
        icon={
          <svg
            aria-hidden="true"
            className={overviewStyles.iconSvg}
            viewBox="0 0 24 24"
          >
            <rect x="4" y="6" width="16" height="12" rx="2" />
            <path d="M8 10h8" />
            <path d="M8 13h5" />
          </svg>
        }
        iconClassName={overviewStyles.iconToneBrand}
        title="Basic dialog"
      >
        <OverviewDemo>
          <ExampleDialog
            description="A focused message with a title and supporting description."
            title="Basic dialog"
            triggerLabel="Open basic dialog"
          >
            <p>Dialog body content goes here.</p>
          </ExampleDialog>
        </OverviewDemo>
      </OverviewShowcaseRow>

      <OverviewShowcaseRow
        description="Keep primary actions in the footer so the close control stays available and the task can complete."
        icon={
          <svg
            aria-hidden="true"
            className={overviewStyles.iconSvg}
            viewBox="0 0 24 24"
          >
            <rect x="4" y="5" width="16" height="14" rx="2" />
            <path d="M4 15h16" />
            <path d="M14 18h4" />
          </svg>
        }
        iconClassName={overviewStyles.iconToneTeal}
        title="With footer"
      >
        <OverviewDemo>
          <ExampleDialog
            description="Footer actions sit below the body and remain visible while content stays in view."
            footer={<Button>Continue</Button>}
            title="Dialog with footer"
            triggerLabel="Open dialog with footer"
          >
            <p>Use the footer for the primary action.</p>
          </ExampleDialog>
        </OverviewDemo>
      </OverviewShowcaseRow>

      <OverviewShowcaseRow
        description="When content is taller than the viewport, the body scrolls inside the dialog. The header, close control, and footer stay in place."
        icon={
          <svg
            aria-hidden="true"
            className={overviewStyles.iconSvg}
            viewBox="0 0 24 24"
          >
            <path d="M8 7h8" />
            <path d="M8 12h8" />
            <path d="M8 17h5" />
            <path d="M17 15v5" />
            <path d="M15 18l2 2 2-2" />
          </svg>
        }
        iconClassName={overviewStyles.iconToneBlue}
        title="Long content"
      >
        <OverviewDemo>
          <ExampleDialog
            description="The dialog body scrolls when the content is taller than the available space."
            footer={<Button>Continue</Button>}
            title="Long content"
            triggerLabel="Open long content"
          >
            {Array.from({ length: 16 }, (_, index) => (
              <p key={index}>
                Placeholder paragraph {index + 1}. This copy exists to
                demonstrate scrolling inside the dialog.
              </p>
            ))}
          </ExampleDialog>
        </OverviewDemo>
      </OverviewShowcaseRow>
    </OverviewShell>
  );
}
