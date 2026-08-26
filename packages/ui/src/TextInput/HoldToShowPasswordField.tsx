import { useState, type KeyboardEvent, type MouseEvent, type PointerEvent } from "react";

import { TextInput, type TextInputProps } from "./TextInput";

function EyeIcon({ revealed }: { revealed: boolean }) {
  if (revealed) {
    return (
      <svg aria-hidden="true" fill="none" viewBox="0 0 20 20">
        <path
          d="M2.25 10c1.8-3.6 4.55-5.5 7.75-5.5s5.95 1.9 7.75 5.5c-1.8 3.6-4.55 5.5-7.75 5.5S4.05 13.6 2.25 10Z"
          fill="currentColor"
          fillOpacity="0.16"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <circle cx="10" cy="10" fill="currentColor" r="2.75" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20">
      <path
        d="M2.25 10c1.8-3.6 4.55-5.5 7.75-5.5s5.95 1.9 7.75 5.5c-1.8 3.6-4.55 5.5-7.75 5.5S4.05 13.6 2.25 10Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle
        cx="10"
        cy="10"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

export function HoldToShowPasswordField(
  props: Omit<TextInputProps, "suffix" | "type">,
) {
  const [revealed, setRevealed] = useState(false);

  const show = () => {
    setRevealed(true);
  };

  const hide = () => {
    setRevealed(false);
  };

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    show();

    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // Synthetic events in tests may not have a capturable pointer id.
    }
  };

  const handleMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    show();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== " " && event.key !== "Enter") {
      return;
    }

    event.preventDefault();

    if (!event.repeat) {
      show();
    }
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === " " || event.key === "Enter") {
      hide();
    }
  };

  return (
    <TextInput
      {...props}
      suffix={
        <button
          aria-label="Hold to show password"
          data-revealed={revealed ? "true" : undefined}
          type="button"
          onBlur={hide}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onLostPointerCapture={hide}
          onMouseDown={handleMouseDown}
          onMouseLeave={hide}
          onMouseUp={hide}
          onPointerCancel={hide}
          onPointerDown={handlePointerDown}
          onPointerLeave={hide}
          onPointerUp={hide}
        >
          <EyeIcon revealed={revealed} />
        </button>
      }
      type={revealed ? "text" : "password"}
    />
  );
}
