import { expect, test } from "@playwright/test";

type StoryIndexEntry = {
  id: string;
  type: string;
};

type StoryIndex = {
  entries: Record<string, StoryIndexEntry>;
};

test("every catalogue story matches its baseline screenshot", async ({
  page,
  baseURL,
}) => {
  const response = await page.request.get(`${baseURL}/index.json`);
  const index = (await response.json()) as StoryIndex;

  const storyIds = Object.values(index.entries)
    .filter((entry) => entry.type === "story")
    .map((entry) => entry.id);

  expect(storyIds.length).toBeGreaterThan(0);

  for (const id of storyIds) {
    await test.step(id, async () => {
      await page.goto(`/iframe.html?id=${id}&viewMode=story`);
      await page.waitForSelector("#storybook-root");
      await expect(page).toHaveScreenshot(`${id}.png`);
    });
  }
});
