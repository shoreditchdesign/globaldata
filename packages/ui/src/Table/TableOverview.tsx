import { Table } from "./Table";
import { OverviewShell, OverviewShowcaseRow } from "../storybook/OverviewShell";
import overviewStyles from "../storybook/Overview.module.css";
import styles from "./TableOverview.module.css";
import {
  drugColumnDefs,
  getDemoTableHeight,
  longContentRows,
  longTextColumnDefs,
  overviewDrugRows,
  type DrugRow,
} from "./tableDemoData";

const previewCode = `<Table
  aria-label="Drugs"
  columnDefs={columns}
  rowData={rows}
/>`;

export function TableOverview() {
  return (
    <OverviewShell
      badge={
        <svg
          aria-hidden="true"
          className={overviewStyles.heroBadgeIcon}
          viewBox="0 0 24 24"
        >
          <rect height="14" rx="1.5" width="16" x="4" y="5" />
          <path d="M4 10h16" />
          <path d="M10 5v14" />
        </svg>
      }
      code={previewCode}
      description="Table presents dense GlobalData datasets in a keyboard-accessible grid. Pass rowData and columnDefs; the wrapper standardises theme, sizing, column resize and sorting."
      preview={
        <div className={styles.previewTable}>
          <Table
            aria-label="Drugs"
            columnDefs={drugColumnDefs}
            height="auto"
            rowData={overviewDrugRows}
          />
        </div>
      }
      previewFlush
      previewFullWidth
      previewWide
      title="Table"
    >
      <OverviewShowcaseRow
        description="Long values stay inside the grid. Wrap and row auto-height are opt-in on specific columns — the wrapper does not enable them globally."
        icon={
          <svg
            aria-hidden="true"
            className={overviewStyles.iconSvg}
            viewBox="0 0 24 24"
          >
            <path d="M5 7h14" />
            <path d="M5 12h10" />
            <path d="M5 17h7" />
          </svg>
        }
        iconClassName={overviewStyles.iconToneBrand}
        title="Long content"
      >
        <div className={styles.demoTable}>
          <Table
            aria-label="Drugs with long content"
            columnDefs={longTextColumnDefs}
            height="auto"
            rowData={longContentRows.slice(0, 2)}
          />
        </div>
      </OverviewShowcaseRow>

      <OverviewShowcaseRow
        description="An empty dataset keeps the grid chrome and shows a clear empty message. Filters, editing and row selection stay off in v1."
        icon={
          <svg
            aria-hidden="true"
            className={overviewStyles.iconSvg}
            viewBox="0 0 24 24"
          >
            <rect height="12" rx="1.5" width="14" x="5" y="6" />
            <path d="M5 10h14" />
          </svg>
        }
        iconClassName={overviewStyles.iconToneTeal}
        title="Empty"
      >
        <div className={styles.demoTable}>
          <Table
            aria-label="Empty drugs"
            columnDefs={drugColumnDefs}
            height={getDemoTableHeight(0)}
            rowData={[] as DrugRow[]}
          />
        </div>
      </OverviewShowcaseRow>
    </OverviewShell>
  );
}
