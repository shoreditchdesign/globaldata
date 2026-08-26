import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Dialog, DialogPopup, DialogTrigger } from "./Dialog";

describe("Dialog", () => {
  it("renders a trigger button", () => {
    const markup = renderToStaticMarkup(
      <Dialog>
        <DialogTrigger className="custom-class">Open dialog</DialogTrigger>
      </Dialog>,
    );

    expect(markup).toContain('type="button"');
    expect(markup).toContain(">Open dialog</button>");
    expect(markup).toContain("custom-class");
  });

  it("forwards native trigger attributes", () => {
    const markup = renderToStaticMarkup(
      <Dialog>
        <DialogTrigger disabled>Open dialog</DialogTrigger>
      </Dialog>,
    );

    expect(markup).toContain("disabled");
    expect(markup).toContain(">Open dialog</button>");
  });

  it("composes a popup without replacing the trigger", () => {
    const markup = renderToStaticMarkup(
      <Dialog defaultOpen disablePointerDismissal>
        <DialogTrigger>Open dialog</DialogTrigger>
        <DialogPopup title="Example dialog" description="More detail.">
          Body content
        </DialogPopup>
      </Dialog>,
    );

    expect(markup).toContain(">Open dialog</button>");
  });

  it("rejects a popup without an accessible name", () => {
    expect(() =>
      renderToStaticMarkup(
        <Dialog defaultOpen>
          <DialogPopup>Body content</DialogPopup>
        </Dialog>,
      ),
    ).toThrow(/title|aria-label|aria-labelledby/);
  });

  it("rejects an empty title without an alternative name", () => {
    expect(() =>
      renderToStaticMarkup(
        <Dialog defaultOpen>
          <DialogPopup title="">Body content</DialogPopup>
        </Dialog>,
      ),
    ).toThrow(/title|aria-label|aria-labelledby/);
  });
});
