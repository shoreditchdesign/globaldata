import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { NavigationBar } from "./NavigationBar";
import styles from "./NavigationBar.module.css";
import {
  NavigationBarDemoLogo,
  navigationBarDemoItems,
  navigationBarDemoUserHref,
  navigationBarDemoUserLabel,
} from "./navigationBarDemo";

describe("NavigationBar", () => {
  it("renders a data-driven nav without hardcoded product or user labels", () => {
    const markup = renderToStaticMarkup(
      <NavigationBar
        className="custom-class"
        items={[
          { href: "#alpha", id: "alpha", label: "Alpha" },
          {
            badge: "New",
            href: "#beta",
            id: "beta",
            label: "Beta",
            tone: "accent",
          },
        ]}
        logo={<span>Mark</span>}
        userHref="#profile"
        userLabel="Pat"
      />,
    );

    expect(markup).toContain("<nav");
    expect(markup).toContain(styles.root);
    expect(markup).toContain("custom-class");
    expect(markup).toContain("Mark");
    expect(markup).toContain("Alpha");
    expect(markup).toContain("Beta");
    expect(markup).toContain("New");
    expect(markup).toContain("Pat");
    expect(markup).toContain('href="#profile"');
    expect(markup).not.toContain("Austin");
    expect(markup).not.toContain("Companies");
  });

  it("exposes mega-menu triggers and keeps disabled entries off links", () => {
    const markup = renderToStaticMarkup(
      <NavigationBar
        defaultOpenId="companies"
        items={navigationBarDemoItems}
        logo={<NavigationBarDemoLogo />}
        userHref={navigationBarDemoUserHref}
        userLabel={navigationBarDemoUserLabel}
      />,
    );

    expect(markup).toContain('aria-expanded="true"');
    expect(markup).toContain("aria-controls");
    expect(markup).toContain("Company Profiles");
    expect(markup).toContain("Inactive reports");
    expect(markup).toContain('aria-disabled="true"');
    expect(markup).not.toContain('href="#inactive');
    expect(markup).toContain("AI Hub");
    expect(markup).toContain(navigationBarDemoUserLabel);
  });
});
