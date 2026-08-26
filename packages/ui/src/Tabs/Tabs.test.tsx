import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Tabs, TabsList, TabsPanel, TabsTab } from "./Tabs";

describe("Tabs", () => {
  it("renders a tablist with the default tab selected", () => {
    const markup = renderToStaticMarkup(
      <Tabs defaultValue="one">
        <TabsList>
          <TabsTab value="one">One</TabsTab>
          <TabsTab value="two">Two</TabsTab>
        </TabsList>
      </Tabs>,
    );

    expect(markup).toContain('role="tablist"');
    expect(markup).toContain('role="tab"');
    expect(markup).toContain("aria-selected");
    expect(markup).toContain(">One</button>");
    expect(markup).toContain(">Two</button>");
  });

  it("marks a disabled tab", () => {
    const markup = renderToStaticMarkup(
      <Tabs defaultValue="one">
        <TabsList>
          <TabsTab value="one">One</TabsTab>
          <TabsTab disabled value="two">
            Two
          </TabsTab>
        </TabsList>
      </Tabs>,
    );

    expect(markup).toContain("disabled");
    expect(markup).toContain(">Two</button>");
  });

  it("renders the selected panel and omits the inactive panel", () => {
    const markup = renderToStaticMarkup(
      <Tabs defaultValue="one">
        <TabsList>
          <TabsTab value="one">One</TabsTab>
          <TabsTab value="two">Two</TabsTab>
        </TabsList>
        <TabsPanel value="one">Panel A</TabsPanel>
        <TabsPanel value="two">Panel B</TabsPanel>
      </Tabs>,
    );

    expect(markup).toContain("Panel A");
    expect(markup).not.toContain("Panel B");
    expect(markup).toContain('role="tabpanel"');
  });
});
