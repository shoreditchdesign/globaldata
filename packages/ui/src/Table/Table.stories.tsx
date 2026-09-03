import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";

import { Table, type TableProps } from "./Table";
import { TableOverview } from "./TableOverview";
import styles from "./TableOverview.module.css";
import {
  drugColumnDefs,
  drugRows,
  getDemoTableHeight,
  longContentRows,
  longTextColumnDefs,
  type DrugRow,
} from "./tableDemoData";

function DrugTable(props: TableProps<DrugRow>) {
  return <Table {...props} />;
}

const meta = {
  title: "Molecules/Table",
  component: DrugTable,
} satisfies Meta<typeof DrugTable>;

export default meta;

type Story = StoryObj<typeof meta>;

const tableChromatic = {
  delay: 400,
  viewports: [375, 768, 1200],
};

const drugHeaders = [
  "Drug Name",
  "Generic Name",
  "Brand Name",
  "Company Name",
  "Therapy Area",
  "Indication",
  "Development Stage",
  "Drug Geography",
];

function findNamedGrid(canvas: ReturnType<typeof within>, name: string) {
  return (
    canvas.queryByRole("treegrid", { name }) ??
    canvas.queryByRole("grid", { name })
  );
}

async function waitForNamedGrid(canvasElement: HTMLElement, name: string) {
  const canvas = within(canvasElement);

  await waitFor(() => {
    const grid = findNamedGrid(canvas, name);
    expect(grid).not.toBeNull();
    expect(grid).toBeVisible();
  });

  return { canvas, grid: findNamedGrid(canvas, name)! };
}

async function expectHeaders(canvas: ReturnType<typeof within>) {
  for (const header of drugHeaders) {
    await expect(
      canvas.getByRole("columnheader", { name: header }),
    ).toBeVisible();
  }
}

function expectNoPageOverflow(canvasElement: HTMLElement) {
  const { documentElement } = canvasElement.ownerDocument;

  expect(documentElement.scrollWidth).toBeLessThanOrEqual(
    documentElement.clientWidth + 1,
  );
}

function getGridViewport(canvasElement: HTMLElement) {
  return canvasElement.querySelector<HTMLElement>(".ag-grid-viewport");
}

function getTableRoot(canvasElement: HTMLElement) {
  return canvasElement.querySelector<HTMLElement>("[data-layout]");
}

async function expectScrollToLastColumn(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  const viewport =
    getGridViewport(canvasElement) ??
    canvasElement.querySelector<HTMLElement>(
      ".ag-body-horizontal-scroll-viewport",
    );
  const root = getTableRoot(canvasElement);

  expect(viewport).not.toBeNull();
  expect(root).not.toBeNull();

  if (viewport!.scrollWidth > viewport!.clientWidth) {
    viewport!.scrollLeft = viewport!.scrollWidth;
  }
  const fakeScroll = canvasElement.querySelector<HTMLElement>(
    ".ag-body-horizontal-scroll-viewport",
  );
  if (fakeScroll && fakeScroll !== viewport) {
    fakeScroll.scrollLeft = fakeScroll.scrollWidth;
  }

  await waitFor(() => {
    const lastHeader = canvas.getByRole("columnheader", {
      name: "Drug Geography",
    });
    const rootBox = root!.getBoundingClientRect();
    const headerBox = lastHeader.getBoundingClientRect();

    expect(headerBox.right).toBeLessThanOrEqual(rootBox.right + 2);
    expect(headerBox.left).toBeGreaterThanOrEqual(rootBox.left - 2);
    expect(headerBox.width).toBeGreaterThan(1);
  });

  expectNoPageOverflow(canvasElement);
}

async function expectScrollAtMaxWidth(
  canvasElement: HTMLElement,
  maxWidth: number,
) {
  const frame = canvasElement.querySelector<HTMLElement>(
    `.${styles.storyFrame}`,
  );
  expect(frame).not.toBeNull();

  const previousMaxWidth = frame!.style.maxWidth;
  frame!.style.maxWidth = `${maxWidth}px`;

  try {
    await waitFor(() => {
      const root = getTableRoot(canvasElement);
      expect(root).not.toBeNull();
      expect(root!.getBoundingClientRect().width).toBeLessThanOrEqual(
        maxWidth + 1,
      );
    });

    await expectScrollToLastColumn(canvasElement);
  } finally {
    frame!.style.maxWidth = previousMaxWidth;
  }
}

export const Overview: Story = {
  args: {
    "aria-label": "Drugs",
    columnDefs: drugColumnDefs,
    rowData: drugRows,
  },
  parameters: {
    layout: "fullscreen",
    chromatic: tableChromatic,
  },
  render: () => <TableOverview />,
};

export const Default: Story = {
  args: {
    "aria-label": "Drugs",
    columnDefs: drugColumnDefs,
    height: "auto",
    rowData: drugRows,
  },
  parameters: {
    layout: "padded",
    chromatic: tableChromatic,
  },
  render: (args) => (
    <div className={styles.storyFrame}>
      <Table {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const { canvas } = await waitForNamedGrid(canvasElement, "Drugs");

    await expectHeaders(canvas);
    await expect(
      canvas.getByRole("gridcell", { name: "pembrolizumab" }),
    ).toBeVisible();
    expectNoPageOverflow(canvasElement);
  },
};

export const LongContent: Story = {
  name: "Long Content",
  args: {
    "aria-label": "Drugs",
    className: styles.longContentTable,
    columnDefs: longTextColumnDefs,
    height: "auto",
    rowData: longContentRows,
  },
  parameters: {
    layout: "padded",
    chromatic: tableChromatic,
  },
  render: (args) => (
    <div className={styles.storyFrame}>
      <Table {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const { canvas } = await waitForNamedGrid(canvasElement, "Drugs");

    await expectHeaders(canvas);
    await expect(
      canvas.getByRole("gridcell", {
        name: /hereditary transthyretin amyloidosis/i,
      }),
    ).toBeVisible();
    await expectScrollToLastColumn(canvasElement);
    await expectScrollAtMaxWidth(canvasElement, 375);
    await expectScrollAtMaxWidth(canvasElement, 768);
  },
};

export const Empty: Story = {
  args: {
    "aria-label": "Drugs",
    columnDefs: drugColumnDefs,
    height: getDemoTableHeight(0),
    rowData: [] as DrugRow[],
  },
  parameters: {
    layout: "padded",
    chromatic: tableChromatic,
  },
  render: (args) => (
    <div className={styles.storyFrame}>
      <Table {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const { canvas } = await waitForNamedGrid(canvasElement, "Drugs");

    await expectHeaders(canvas);
    await expect(canvas.getByText("No data available")).toBeVisible();
    expectNoPageOverflow(canvasElement);
  },
};
