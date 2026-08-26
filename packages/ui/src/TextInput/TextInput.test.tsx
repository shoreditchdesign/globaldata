import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { TextInput } from "./TextInput";

describe("TextInput", () => {
  it("associates the visible label with the input", () => {
    const markup = renderToStaticMarkup(
      <TextInput label="Email" placeholder="Enter here..." />,
    );

    expect(markup).toContain("<label");
    expect(markup).toContain(">Email</label>");
    expect(markup).toContain("<input");
    expect(markup).toContain('type="text"');
    expect(markup).toMatch(/for="[^"]+"/);
    expect(markup).toMatch(/id="[^"]+"/);
  });

  it("forwards native input attributes", () => {
    const markup = renderToStaticMarkup(
      <TextInput
        autoComplete="email"
        className="custom-class"
        label="Email"
        name="email"
        placeholder="Enter here..."
        type="email"
      />,
    );

    expect(markup).toContain("custom-class");
    expect(markup).toContain('name="email"');
    expect(markup).toContain('type="email"');
    expect(markup).toContain('placeholder="Enter here..."');
    expect(markup).toContain('autoComplete="email"');
  });

  it("renders generic prefix content", () => {
    const markup = renderToStaticMarkup(
      <TextInput
        label="Email"
        prefix={<span className="prefix-mark">@</span>}
      />,
    );

    expect(markup).toContain("prefix-mark");
    expect(markup).toContain(">@</span>");
  });

  it("renders generic suffix content", () => {
    const markup = renderToStaticMarkup(
      <TextInput
        label="Password"
        suffix={
          <button
            aria-label="Show password"
            className="suffix-mark"
            type="button"
          >
            eye
          </button>
        }
      />,
    );

    expect(markup).toContain("suffix-mark");
    expect(markup).toContain('aria-label="Show password"');
    expect(markup).toContain(">eye</button>");
  });

  it("marks the field invalid when error is set", () => {
    const markup = renderToStaticMarkup(
      <TextInput error="Enter a valid email" label="Email" />,
    );

    expect(markup).toContain("data-invalid");
    expect(markup).toContain("Enter a valid email");
  });

  it("marks a disabled field with data-disabled", () => {
    const markup = renderToStaticMarkup(
      <TextInput disabled label="Email" placeholder="Enter here..." />,
    );

    expect(markup).toContain("data-disabled");
    expect(markup).toContain("disabled");
  });
});
