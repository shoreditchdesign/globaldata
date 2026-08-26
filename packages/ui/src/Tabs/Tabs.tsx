import type { ComponentPropsWithoutRef } from "react";
import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import clsx from "clsx";

import styles from "./Tabs.module.css";

export type TabsProps = Omit<
  ComponentPropsWithoutRef<typeof BaseTabs.Root>,
  "className"
> & {
  className?: string;
};

export function Tabs({ className, ...props }: TabsProps) {
  return <BaseTabs.Root className={clsx(styles.root, className)} {...props} />;
}

export type TabsListProps = Omit<
  ComponentPropsWithoutRef<typeof BaseTabs.List>,
  "className"
> & {
  className?: string;
};

export function TabsList({ className, children, ...props }: TabsListProps) {
  return (
    <BaseTabs.List className={clsx(styles.list, className)} {...props}>
      {children}
      <BaseTabs.Indicator className={styles.indicator} />
    </BaseTabs.List>
  );
}

export type TabsTabProps = Omit<
  ComponentPropsWithoutRef<typeof BaseTabs.Tab>,
  "className"
> & {
  className?: string;
};

export function TabsTab({ className, ...props }: TabsTabProps) {
  return <BaseTabs.Tab className={clsx(styles.tab, className)} {...props} />;
}

export type TabsPanelProps = Omit<
  ComponentPropsWithoutRef<typeof BaseTabs.Panel>,
  "className"
> & {
  className?: string;
};

export function TabsPanel({ className, ...props }: TabsPanelProps) {
  return (
    <BaseTabs.Panel className={clsx(styles.panel, className)} {...props} />
  );
}
