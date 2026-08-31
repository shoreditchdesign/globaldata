import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Card } from "./Card";
import styles from "./Card.module.css";

function getClassList(markup: string) {
  const classNameMatch = markup.match(/class="([^"]+)"/);

  expect(classNameMatch).not.toBeNull();

  return classNameMatch![1].split(/\s+/);
}

describe("Card", () => {
  it("renders a date and title", () => {
    const markup = renderToStaticMarkup(
      <Card date="12.08.2026" title="Oncology Drug Development Review" />,
    );

    expect(markup).toContain("12.08.2026");
    expect(markup).toContain("Oncology Drug Development Review");
    expect(markup).not.toContain(styles.icon);
  });

  it("renders an optional icon and forwards className", () => {
    const markup = renderToStaticMarkup(
      <Card
        className="custom-class"
        date="12.08.2026"
        icon={<svg data-icon="doc" />}
        title="Pipeline review"
      />,
    );
    const classList = getClassList(markup);

    expect(classList).toEqual(
      expect.arrayContaining([styles.root, "custom-class"]),
    );
    expect(markup).toContain('data-icon="doc"');
    expect(markup).toContain('aria-hidden="true"');
  });
});
