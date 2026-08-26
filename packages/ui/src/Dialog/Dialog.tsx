import {
  useLayoutEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import clsx from "clsx";

import styles from "./Dialog.module.css";

export type DialogProps = Omit<
  ComponentPropsWithoutRef<typeof BaseDialog.Root>,
  "modal"
>;

export function Dialog(props: DialogProps) {
  return <BaseDialog.Root {...props} modal />;
}

export type DialogTriggerProps = Omit<
  ComponentPropsWithoutRef<typeof BaseDialog.Trigger>,
  "className"
> & {
  className?: string;
};

export function DialogTrigger({ className, ...props }: DialogTriggerProps) {
  return <BaseDialog.Trigger className={className} {...props} />;
}

export type DialogPopupProps = Omit<
  ComponentPropsWithoutRef<typeof BaseDialog.Popup>,
  "className" | "title"
> & {
  className?: string;
  title?: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  closeLabel?: string;
};

function hasRenderableTitle(title: ReactNode): boolean {
  if (title == null || typeof title === "boolean") {
    return false;
  }

  if (typeof title === "string") {
    return title.trim() !== "";
  }

  return true;
}

function hasAccessibleName(
  title: ReactNode,
  ariaLabel: string | undefined,
  ariaLabelledBy: string | undefined,
) {
  return (
    hasRenderableTitle(title) ||
    Boolean(ariaLabel?.trim()) ||
    Boolean(ariaLabelledBy?.trim())
  );
}

export function DialogPopup({
  className,
  title,
  description,
  footer,
  closeLabel = "Close",
  children,
  initialFocus,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  ...props
}: DialogPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const showTitle = hasRenderableTitle(title);

  if (!hasAccessibleName(title, ariaLabel, ariaLabelledBy)) {
    throw new Error(
      "DialogPopup requires a non-empty `title`, `aria-label`, or `aria-labelledby`.",
    );
  }

  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop className={styles.backdrop} />
      <BaseDialog.Viewport className={styles.viewport}>
        <BaseDialog.Popup
          {...props}
          ref={popupRef}
          className={clsx(styles.popup, className)}
          aria-modal="true"
          initialFocus={initialFocus ?? (() => popupRef.current)}
          {...(showTitle
            ? {}
            : {
                "aria-label": ariaLabel,
                "aria-labelledby": ariaLabelledBy,
              })}
        >
          <BaseDialog.Close className={styles.close} aria-label={closeLabel}>
            <CloseIcon />
          </BaseDialog.Close>

          {showTitle || description != null ? (
            <div className={styles.header}>
              {showTitle ? (
                <BaseDialog.Title className={styles.title}>
                  {title}
                </BaseDialog.Title>
              ) : null}
              {description != null ? (
                <BaseDialog.Description className={styles.description}>
                  {description}
                </BaseDialog.Description>
              ) : null}
            </div>
          ) : null}

          {children != null ? <DialogBody>{children}</DialogBody> : null}

          {footer != null ? <div className={styles.footer}>{footer}</div> : null}
        </BaseDialog.Popup>
      </BaseDialog.Viewport>
    </BaseDialog.Portal>
  );
}

function DialogBody({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);

  useLayoutEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const sync = () => {
      setIsScrollable(node.scrollHeight - node.clientHeight > 1);
    };

    sync();

    const observer = new ResizeObserver(sync);
    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [children]);

  return (
    <div
      ref={ref}
      className={styles.body}
      tabIndex={isScrollable ? 0 : undefined}
    >
      {children}
    </div>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      className={styles.closeIcon}
      viewBox="0 0 16 16"
      focusable="false"
    >
      <path
        d="M2 2l12 12M14 2L2 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
