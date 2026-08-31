import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import clsx from "clsx";

import styles from "./NavigationBar.module.css";

export type NavigationBarLink = {
  disabled?: boolean;
  href?: string;
  label: ReactNode;
};

export type NavigationBarGroup = {
  items: NavigationBarLink[];
  title: ReactNode;
};

export type NavigationBarItem = {
  badge?: ReactNode;
  href?: string;
  id: string;
  label: ReactNode;
  megaMenu?: NavigationBarGroup[];
  tone?: "default" | "accent";
};

export type NavigationBarProps = {
  ariaLabel?: string;
  className?: string;
  defaultOpenId?: string | null;
  items: NavigationBarItem[];
  logo: ReactNode;
  onOpenChange?: (id: string | null) => void;
  openId?: string | null;
  userHref?: string;
  userLabel?: ReactNode;
};

function hasMegaMenu(item: NavigationBarItem) {
  return Boolean(item.megaMenu && item.megaMenu.length > 0);
}

function isActionItem(item: NavigationBarItem) {
  return item.tone === "accent";
}

export function NavigationBar({
  ariaLabel = "Primary",
  className,
  defaultOpenId = null,
  items,
  logo,
  onOpenChange,
  openId,
  userHref,
  userLabel,
}: NavigationBarProps) {
  const baseId = useId();
  const rootRef = useRef<HTMLElement>(null);
  const isControlled = openId !== undefined;
  const [uncontrolledOpenId, setUncontrolledOpenId] = useState<string | null>(
    defaultOpenId,
  );
  const currentOpenId = isControlled ? openId : uncontrolledOpenId;
  const mainItems = items.filter((item) => !isActionItem(item));
  const actionItems = items.filter(isActionItem);

  const setOpen = useCallback(
    (next: string | null) => {
      if (!isControlled) {
        setUncontrolledOpenId(next);
      }

      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  function toggleItem(item: NavigationBarItem) {
    if (!hasMegaMenu(item)) {
      setOpen(null);
      return;
    }

    setOpen(currentOpenId === item.id ? null : item.id);
  }

  useEffect(() => {
    if (!currentOpenId) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") {
        return;
      }

      const panelId = `${baseId}-${currentOpenId}`;
      setOpen(null);
      const trigger = rootRef.current?.querySelector(
        `[aria-controls="${panelId}"]`,
      );

      if (trigger instanceof HTMLElement) {
        trigger.focus();
      }
    }

    function handlePointerDown(event: PointerEvent) {
      const target = event.target;

      if (
        !(target instanceof Node) ||
        !rootRef.current?.contains(target)
      ) {
        setOpen(null);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [baseId, currentOpenId, setOpen]);

  function renderItem(item: NavigationBarItem) {
    const expanded = currentOpenId === item.id;
    const panelId = `${baseId}-${item.id}`;
    const triggerId = `${panelId}-trigger`;
    const accent = item.tone === "accent";
    const triggerClassName = clsx(
      styles.trigger,
      accent && styles.triggerAccent,
    );
    const badge = item.badge ? (
      <span className={clsx(styles.badge, accent && styles.badgeAccent)}>
        {item.badge}
      </span>
    ) : null;
    const label = <span className={styles.triggerLabel}>{item.label}</span>;

    return (
      <li key={item.id} className={styles.item}>
        {hasMegaMenu(item) ? (
          <button
            aria-controls={panelId}
            aria-expanded={expanded}
            className={triggerClassName}
            id={triggerId}
            type="button"
            onClick={() => toggleItem(item)}
          >
            {badge}
            {label}
          </button>
        ) : item.href ? (
          <a className={triggerClassName} href={item.href}>
            {badge}
            {label}
          </a>
        ) : (
          <span className={triggerClassName}>
            {badge}
            {label}
          </span>
        )}
      </li>
    );
  }

  const user = userLabel ? (
    userHref ? (
      <a className={styles.user} href={userHref}>
        {userLabel}
      </a>
    ) : (
      <span className={styles.user}>{userLabel}</span>
    )
  ) : null;

  return (
    <nav
      ref={rootRef}
      aria-label={ariaLabel}
      className={clsx(styles.root, className)}
    >
      <div className={styles.bar}>
        <div className={styles.logo}>{logo}</div>
        <ul className={styles.items}>{mainItems.map(renderItem)}</ul>
        {actionItems.length > 0 || user ? (
          <div className={styles.actions}>
            {actionItems.length > 0 ? (
              <ul className={styles.actionItems}>
                {actionItems.map(renderItem)}
              </ul>
            ) : null}
            {user}
          </div>
        ) : null}
      </div>
      {items.map((item) => {
        if (!hasMegaMenu(item)) {
          return null;
        }

        const expanded = currentOpenId === item.id;
        const panelId = `${baseId}-${item.id}`;
        const triggerId = `${panelId}-trigger`;

        return (
          <div
            key={item.id}
            aria-labelledby={triggerId}
            className={styles.mega}
            hidden={!expanded}
            id={panelId}
            role="region"
          >
            <div className={styles.columns}>
              {item.megaMenu?.map((group, groupIndex) => (
                <div className={styles.column} key={groupIndex}>
                  <p className={styles.heading}>{group.title}</p>
                  <ul className={styles.links}>
                    {group.items.map((link, linkIndex) => {
                      const inactive = link.disabled || !link.href;

                      return (
                        <li key={linkIndex}>
                          {inactive ? (
                            <span
                              aria-disabled="true"
                              className={styles.megaDisabled}
                            >
                              {link.label}
                            </span>
                          ) : (
                            <a className={styles.megaLink} href={link.href}>
                              {link.label}
                            </a>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </nav>
  );
}
