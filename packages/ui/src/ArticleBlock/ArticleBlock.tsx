import { useId, type ReactNode } from "react";
import { Tooltip } from "@base-ui/react/tooltip";
import clsx from "clsx";

import { ArticleRow } from "../ArticleRow/ArticleRow";
import { Tabs, TabsList, TabsPanel, TabsTab } from "../Tabs/Tabs";
import styles from "./ArticleBlock.module.css";

export type ArticleBlockItem = {
  date?: ReactNode;
  href?: string;
  id: string;
  title: ReactNode;
};

export type ArticleBlockTab = {
  id: string;
  items: ArticleBlockItem[];
  label: ReactNode;
};

export type ArticleBlockProps = {
  actionHref?: string;
  actionLabel?: ReactNode;
  className?: string;
  defaultTab?: string;
  infoLabel?: string;
  tabs: ArticleBlockTab[];
  title: ReactNode;
  titleLevel?: 2 | 3 | 4;
};

function InfoIcon() {
  return (
    <svg
      aria-hidden="true"
      className={styles.infoGlyph}
      fill="none"
      focusable="false"
      viewBox="0 0 16 15"
    >
      <circle cx="8" cy="4.25" fill="currentColor" r="1" />
      <path
        d="M8 6.75v5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.25"
      />
    </svg>
  );
}

function InfoButton({ label }: { label: string }) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger
        aria-label={label}
        className={styles.info}
        delay={150}
      >
        <InfoIcon />
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Positioner
          className={styles.infoTooltipPositioner}
          side="bottom"
          sideOffset={8}
        >
          <Tooltip.Popup className={styles.infoTooltip} role="tooltip">
            <Tooltip.Arrow className={styles.infoTooltipArrow}>
              <svg
                aria-hidden="true"
                fill="currentColor"
                focusable="false"
                height="8"
                viewBox="0 0 12 8"
                width="12"
              >
                <path d="M0 8L6 0L12 8H0Z" />
              </svg>
            </Tooltip.Arrow>
            {label}
          </Tooltip.Popup>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

function resolveDefaultTab(tabs: ArticleBlockTab[], defaultTab?: string) {
  if (defaultTab && tabs.some((tab) => tab.id === defaultTab)) {
    return defaultTab;
  }

  return tabs[0]?.id;
}

export function ArticleBlock({
  actionHref,
  actionLabel,
  className,
  defaultTab,
  infoLabel,
  tabs,
  title,
  titleLevel = 2,
}: ArticleBlockProps) {
  const headingId = useId();
  const HeadingTag = `h${titleLevel}` as const;
  const initialTab = resolveDefaultTab(tabs, defaultTab);

  const action = actionLabel ? (
    <>
      <span className={styles.actionLabel}>{actionLabel}</span>
      <span aria-hidden="true" className={styles.actionArrow}>
        →
      </span>
    </>
  ) : null;

  return (
    <section
      aria-labelledby={headingId}
      className={clsx(styles.root, className)}
    >
      <Tabs className={styles.tabs} defaultValue={initialTab}>
        <div className={styles.chrome}>
          <div className={styles.header}>
            <div className={styles.heading}>
              <HeadingTag className={styles.title} id={headingId}>
                {title}
              </HeadingTag>
              {infoLabel ? <InfoButton label={infoLabel} /> : null}
            </div>
            {action ? (
              actionHref ? (
                <a className={styles.action} href={actionHref}>
                  {action}
                </a>
              ) : (
                <span className={styles.action}>{action}</span>
              )
            ) : null}
          </div>
          {tabs.length > 0 ? (
            <TabsList className={styles.tabList}>
              {tabs.map((tab) => (
                <TabsTab key={tab.id} value={tab.id}>
                  {tab.label}
                </TabsTab>
              ))}
            </TabsList>
          ) : null}
        </div>
        {tabs.map((tab) => (
          <TabsPanel className={styles.panel} key={tab.id} value={tab.id}>
            {tab.items.map((item) => (
              <ArticleRow
                date={item.date}
                href={item.href}
                key={item.id}
                title={item.title}
              />
            ))}
          </TabsPanel>
        ))}
      </Tabs>
    </section>
  );
}
