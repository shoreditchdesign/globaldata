import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  timeout: 30_000,
  expect: {
    toHaveScreenshot: { maxDiffPixelRatio: 0.02 },
  },
  reporter: [["list"], ["html", { outputFolder: "playwright-report", open: "never" }]],
  use: {
    baseURL: "http://localhost:6007",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "http-server storybook-static -p 6007 -s",
    url: "http://localhost:6007",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
