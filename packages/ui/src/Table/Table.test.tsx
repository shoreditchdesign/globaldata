import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Table } from "./Table";

describe("Table", () => {
  it("requires a non-empty aria-label", () => {
    expect(() =>
      renderToStaticMarkup(
        <Table aria-label="" columnDefs={[]} rowData={[]} />,
      ),
    ).toThrow(/aria-label/);
  });

  it("rejects a whitespace-only aria-label", () => {
    expect(() =>
      renderToStaticMarkup(
        <Table aria-label="   " columnDefs={[]} rowData={[]} />,
      ),
    ).toThrow(/aria-label/);
  });
});
