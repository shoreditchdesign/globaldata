import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { ArticleBlock, type ArticleBlockTab } from "./ArticleBlock";
import styles from "./ArticleBlock.module.css";

const tabs: ArticleBlockTab[] = [
  {
    id: "analysis",
    label: "Analysis",
    items: [
      {
        date: "12 Aug 2026",
        href: "#one",
        id: "one",
        title: "Pipeline catalysts",
      },
    ],
  },
  {
    id: "deals",
    label: "Deals",
    items: [
      {
        id: "two",
        title: "Take-private",
      },
    ],
  },
];

describe("ArticleBlock", () => {
  it("composes a heading, tabs, and article rows", () => {
    const markup = renderToStaticMarkup(
      <ArticleBlock
        actionHref="#more"
        actionLabel="View more"
        className="custom-class"
        infoLabel="About this recommendation"
        tabs={tabs}
        title="Recommended for you"
      />,
    );

    expect(markup).toContain(styles.root);
    expect(markup).toContain("custom-class");
    expect(markup).toContain(">Recommended for you</h2>");
    expect(markup).toContain('aria-label="About this recommendation"');
    expect(markup).not.toContain('title="About this recommendation"');
    expect(markup).toContain('href="#more"');
    expect(markup).toContain("View more");
    expect(markup).toContain("→");
    expect(markup).toContain("Analysis");
    expect(markup).toContain("Pipeline catalysts");
    expect(markup).toContain("12 Aug 2026");
    expect(markup).not.toContain("Take-private");
  });

  it("omits info and action when they are not provided", () => {
    const markup = renderToStaticMarkup(
      <ArticleBlock tabs={tabs} title="Latest Deals" />,
    );

    expect(markup).toContain(">Latest Deals</h2>");
    expect(markup).not.toContain(styles.info);
    expect(markup).not.toContain(styles.action);
    expect(markup).not.toContain("→");
  });

  it("renders rows without dates when items omit them", () => {
    const markup = renderToStaticMarkup(
      <ArticleBlock
        defaultTab="deals"
        tabs={tabs}
        title="Curated Company Lists"
        titleLevel={3}
      />,
    );

    expect(markup).toContain(">Curated Company Lists</h3>");
    expect(markup).toContain("Take-private");
    expect(markup).not.toContain("12 Aug 2026");
    expect(markup).not.toContain("Pipeline catalysts");
  });
});
