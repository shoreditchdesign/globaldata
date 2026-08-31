import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { CarouselCard } from "./CarouselCard";
import styles from "./CarouselCard.module.css";

function getClassList(markup: string) {
  const classNameMatch = markup.match(/class="([^"]+)"/);

  expect(classNameMatch).not.toBeNull();

  return classNameMatch![1].split(/\s+/);
}

describe("CarouselCard", () => {
  it("renders featured content including optional slots", () => {
    const markup = renderToStaticMarkup(
      <CarouselCard
        actionLabel="Read the report"
        className="custom-class"
        description="A short summary."
        eyebrow="Featured"
        media={<div data-media="demo" />}
        title="Pipeline outlook"
      />,
    );
    const classList = getClassList(markup);

    expect(classList).toEqual(
      expect.arrayContaining([styles.root, styles.featured, "custom-class"]),
    );
    expect(markup).toContain("Featured");
    expect(markup).toContain("Pipeline outlook");
    expect(markup).toContain("A short summary.");
    expect(markup).toContain("Read the report");
    expect(markup).toContain("→");
    expect(markup).toContain('data-media="demo"');
    expect(markup).toContain('data-variant="featured"');
  });

  it("hides media, description, and action in the compact variant", () => {
    const markup = renderToStaticMarkup(
      <CarouselCard
        actionLabel="Read the report"
        description="A short summary."
        eyebrow="Insight"
        media={<div data-media="demo" />}
        title="Market access update"
        variant="compact"
      />,
    );

    expect(markup).toContain("Insight");
    expect(markup).toContain("Market access update");
    expect(markup).toContain('data-variant="compact"');
    expect(markup).not.toContain("A short summary.");
    expect(markup).not.toContain("Read the report");
    expect(markup).not.toContain("→");
    expect(markup).not.toContain('data-media="demo"');
    expect(markup).toContain(styles.compact);
  });
});
