import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Switch } from "./Switch";

describe("Switch", () => {
  it("renders as an unchecked ARIA switch by default", () => {
    const markup = renderToStaticMarkup(<Switch aria-label="Notifications" />);

    expect(markup).toContain('role="switch"');
    expect(markup).toContain('aria-checked="false"');
  });

  it("reflects a checked default state", () => {
    const markup = renderToStaticMarkup(
      <Switch aria-label="Notifications" defaultChecked />,
    );

    expect(markup).toContain('aria-checked="true"');
  });

  it("marks a disabled switch with data-disabled", () => {
    const markup = renderToStaticMarkup(
      <Switch aria-label="Notifications" disabled />,
    );

    expect(markup).toContain("data-disabled");
  });
});
