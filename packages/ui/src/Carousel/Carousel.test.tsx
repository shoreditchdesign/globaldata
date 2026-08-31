import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Carousel, type CarouselItem } from "./Carousel";
import styles from "./Carousel.module.css";

const items: CarouselItem[] = [
  {
    actionLabel: "Open report",
    description: "Featured summary",
    eyebrow: "NEW REPORT",
    id: "one",
    media: <div data-media="one" />,
    title: "Featured title",
  },
  {
    eyebrow: "Press Release",
    id: "two",
    title: "Second title",
  },
  {
    eyebrow: "Webinar Recording",
    id: "three",
    title: "Third title",
  },
];

describe("Carousel", () => {
  it("renders the active item as featured and others as compact previews", () => {
    const markup = renderToStaticMarkup(
      <Carousel className="custom-class" items={items} />,
    );

    expect(markup).toContain(styles.root);
    expect(markup).toContain("custom-class");
    expect(markup).toContain("Featured title");
    expect(markup).toContain("Featured summary");
    expect(markup).toContain("Open report");
    expect(markup).toContain("→");
    expect(markup).toContain('data-media="one"');
    expect(markup).toContain("Second title");
    expect(markup).toContain("Third title");
    expect(markup).toContain('aria-label="Previous item"');
    expect(markup).toContain("disabled");
    expect(markup).toContain('aria-label="Next item"');
    expect(markup).toContain('aria-roledescription="carousel"');
  });

  it("omits the media column when the active item has no media", () => {
    const markup = renderToStaticMarkup(
      <Carousel
        items={items.map(({ media: _media, ...item }) => item)}
      />,
    );

    expect(markup).toContain("Featured title");
    expect(markup).not.toContain('data-media="one"');
    expect(markup).toContain('data-has-media="false"');
  });
});
