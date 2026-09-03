import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { expect, test } from "@playwright/test";

type StoryIndexEntry = {
  id: string;
  type: string;
};

type StoryIndex = {
  entries: Record<string, StoryIndexEntry>;
};

/**
 * The story list is read from the built catalogue synchronously so that each
 * story can be declared as its own Playwright test. Declaring them up front is
 * what lets the run parallelise and report per-story failures; fetching the
 * index over HTTP inside a single test would force one serial mega-test whose
 * timeout has to cover the entire catalogue.
 *
 * `storybook-static` is already a prerequisite of this suite -- the webServer in
 * playwright-visual.config.ts serves it -- so reading it here adds no new
 * requirement beyond running `pnpm build` first.
 */
const indexPath = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../storybook-static/index.json",
);

function readStoryIds(): string[] {
  let raw: string;

  try {
    raw = readFileSync(indexPath, "utf8");
  } catch {
    throw new Error(
      `Could not read the Storybook index at ${indexPath}. ` +
        `Run \`pnpm build\` to generate storybook-static before the visual tests.`,
    );
  }

  const index = JSON.parse(raw) as StoryIndex;

  return Object.values(index.entries)
    .filter((entry) => entry.type === "story")
    .map((entry) => entry.id)
    .sort();
}

const storyIds = readStoryIds();

test("the catalogue index lists at least one story", () => {
  expect(storyIds.length).toBeGreaterThan(0);
});

for (const id of storyIds) {
  test(`${id} matches its baseline screenshot`, async ({ page }) => {
    await page.goto(`/iframe.html?id=${id}&viewMode=story`);

    // Wait on Storybook's own "story is rendered" signal rather than on
    // #storybook-root being visible. Stories that open a modal portal their
    // content to a sibling of the root and mark the root itself aria-hidden and
    // inert, so a visibility wait on the root never resolves for them.
    await page.waitForSelector("body.sb-show-main", { state: "attached" });

    await expect(page).toHaveScreenshot(`${id}.png`);
  });
}
