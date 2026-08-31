import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { ArticleRow } from "./ArticleRow";
import styles from "./ArticleRow.module.css";

function getClassList(markup: string) {
  const classNameMatch = markup.match(/class="([^"]+)"/);

  expect(classNameMatch).not.toBeNull();

  return classNameMatch![1].split(/\s+/);
}

describe("ArticleRow", () => {
  it("renders a title and optional date", () => {
    const markup = renderToStaticMarkup(
      <ArticleRow
        className="custom-class"
        date="12 Aug 2026"
        title="Pipeline catalysts"
      />,
    );
    const classList = getClassList(markup);

    expect(classList).toEqual(
      expect.arrayContaining([styles.root, "custom-class"]),
    );
    expect(markup).toContain("Pipeline catalysts");
    expect(markup).toContain("12 Aug 2026");
    expect(markup).not.toContain("<a ");
  });

  it("omits the date when it is not provided", () => {
    const markup = renderToStaticMarkup(
      <ArticleRow title="Pipeline catalysts" />,
    );

    expect(markup).toContain("Pipeline catalysts");
    expect(markup).not.toContain(styles.date);
  });

  it("renders the title as a link when href is provided", () => {
    const markup = renderToStaticMarkup(
      <ArticleRow
        date="12 Aug 2026"
        href="#article-pipeline"
        title="Pipeline catalysts"
      />,
    );

    expect(markup).toContain(`<a class="${styles.title}" href="#article-pipeline">Pipeline catalysts</a>`);
    expect(markup).toContain(styles.date);
  });
});
