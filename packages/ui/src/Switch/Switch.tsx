import type { ComponentPropsWithoutRef } from "react";
import { Switch as BaseSwitch } from "@base-ui/react/switch";
import clsx from "clsx";

import styles from "./Switch.module.css";

export type SwitchProps = Omit<
  ComponentPropsWithoutRef<typeof BaseSwitch.Root>,
  "className"
> & {
  className?: string;
};

export function Switch({ className, ...props }: SwitchProps) {
  return (
    <BaseSwitch.Root className={clsx(styles.root, className)} {...props}>
      <BaseSwitch.Thumb className={styles.thumb} />
    </BaseSwitch.Root>
  );
}
