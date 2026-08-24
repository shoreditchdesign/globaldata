import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Button } from "./Button";
import styles from "./Button.module.css";

function getClassList(markup: string) {
  const classNameMatch = markup.match(/class="([^"]+)"/);

  expect(classNameMatch).not.toBeNull();

  return classNameMatch![1].split(/\s+/);
}

describe("Button", () => {
  it("renders default button markup", () => {
    const markup = renderToStaticMarkup(
      <Button className="custom-class">Primary action</Button>,
    );
    const classList = getClassList(markup);

    expect(markup).toContain('type="button"');
    expect(markup).toContain(">Primary action</button>");
    expect(classList).toEqual(
      expect.arrayContaining([
        styles.button,
        styles.primary,
        styles.medium,
        "custom-class",
      ]),
    );
  });

  it("applies explicit props and forwards native attributes", () => {
    const markup = renderToStaticMarkup(
      <Button disabled size="small" type="submit" variant="secondary">
        Secondary action
      </Button>,
    );
    const classList = getClassList(markup);

    expect(markup).toContain('type="submit"');
    expect(markup).toContain('disabled=""');
    expect(markup).toContain(">Secondary action</button>");
    expect(classList).toEqual(
      expect.arrayContaining([
        styles.button,
        styles.secondary,
        styles.small,
      ]),
    );
  });
});
