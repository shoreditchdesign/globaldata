import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  Pagination,
  PaginationIndicators,
  PaginationNext,
  PaginationPrevious,
} from "./Pagination";

function renderPagination({
  count = 4,
  page,
  defaultPage,
}: {
  count?: number;
  page?: number;
  defaultPage?: number;
} = {}) {
  return renderToStaticMarkup(
    <Pagination count={count} defaultPage={defaultPage} page={page}>
      <PaginationIndicators />
      <PaginationPrevious />
      <PaginationNext />
    </Pagination>,
  );
}

function activePageLabels(markup: string) {
  return [...markup.matchAll(/<button\b[^>]*>/g)]
    .map((match) => match[0])
    .filter((button) => button.includes("aria-current"))
    .map((button) => button.match(/aria-label="(Page \d+)"/)?.[1]);
}

describe("Pagination", () => {
  it("renders navigation semantics with interactive indicators", () => {
    const markup = renderPagination({ defaultPage: 0 });

    expect(markup).toContain('aria-label="Pagination, page 1 of 4"');
    expect(markup).toContain('aria-label="Previous page"');
    expect(markup).toContain('aria-label="Next page"');
    expect(markup).toContain('aria-label="Pages"');
    expect(markup).toContain('role="group"');
    expect(markup).toContain('aria-label="Page 1"');
    expect(markup).toContain("disabled");
    expect(markup.match(/<button /g)).toHaveLength(6);
  });

  it("marks the initial active page for uncontrolled state", () => {
    const markup = renderPagination({ defaultPage: 1 });

    expect(activePageLabels(markup)).toEqual(["Page 2"]);
    expect(markup).toContain('aria-label="Pagination, page 2 of 4"');
    expect(markup).not.toContain("disabled");
  });

  it("marks the active page for controlled state", () => {
    const markup = renderPagination({ page: 2 });

    expect(activePageLabels(markup)).toEqual(["Page 3"]);
    expect(markup).toContain('aria-label="Pagination, page 3 of 4"');
  });

  it("disables previous on the first page", () => {
    const markup = renderPagination({ defaultPage: 0 });
    const previous = markup.match(
      /<button[^>]*aria-label="Previous page"[^>]*>/,
    )?.[0];

    expect(previous).toContain("disabled");
  });

  it("disables next on the last page", () => {
    const markup = renderPagination({ defaultPage: 3 });
    const next = markup.match(
      /<button[^>]*aria-label="Next page"[^>]*>/,
    )?.[0];

    expect(next).toContain("disabled");
  });

  it("renders one indicator per page", () => {
    const markup = renderPagination({ count: 5, defaultPage: 0 });

    expect(activePageLabels(markup)).toEqual(["Page 1"]);
    expect(markup.match(/aria-label="Page \d+"/g)).toHaveLength(5);
  });
});
