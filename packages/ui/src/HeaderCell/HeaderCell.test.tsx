import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { HeaderCell } from "./HeaderCell";

describe("HeaderCell", () => {
  it("renders static text with no sort affordance by default", () => {
    const markup = renderToStaticMarkup(<HeaderCell>Drug Name</HeaderCell>);

    expect(markup).toContain("Drug Name");
    expect(markup).not.toContain("<button");
    expect(markup).not.toContain("aria-sort");
  });

  it("renders a sort button reflecting the current direction", () => {
    const markup = renderToStaticMarkup(
      <HeaderCell sortable sortDirection="asc">
        Drug Name
      </HeaderCell>,
    );

    expect(markup).toContain("<button");
    expect(markup).toContain('aria-sort="ascending"');
  });

  it("marks an unsorted sortable column as aria-sort=none", () => {
    const markup = renderToStaticMarkup(<HeaderCell sortable>Drug Name</HeaderCell>);

    expect(markup).toContain('aria-sort="none"');
  });
});
