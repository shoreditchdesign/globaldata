import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { TableCell } from "./TableCell";

describe("TableCell", () => {
  it("renders plain text content", () => {
    const markup = renderToStaticMarkup(<TableCell>pembrolizumab</TableCell>);

    expect(markup).toContain(">pembrolizumab<");
    expect(markup).not.toContain("<a ");
  });

  it("renders a link when href is provided", () => {
    const markup = renderToStaticMarkup(
      <TableCell href="#keytruda">Keytruda</TableCell>,
    );

    expect(markup).toContain('href="#keytruda"');
    expect(markup).toContain(">Keytruda</a>");
  });
});
