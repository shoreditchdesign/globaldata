import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
  type ColDef,
  type GridReadyEvent,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import clsx from "clsx";

import styles from "./Table.module.css";
import { TABLE_DEFAULT_COL_DEF } from "./tableDefaults";

ModuleRegistry.registerModules([AllCommunityModule]);

export type TableColumnDef<TData = any> = ColDef<TData>;

export type TableProps<TData = any> = {
  "aria-label": string;
  className?: string;
  columnDefs: TableColumnDef<TData>[];
  height?: number | string;
  rowData: TData[] | null | undefined;
};

function resolveHeight(height: number | string | undefined) {
  if (height == null) {
    return undefined;
  }

  return typeof height === "number" ? `${height}px` : height;
}

function applyAccessibleName(
  event: GridReadyEvent,
  ariaLabel: string,
) {
  event.api.setGridAriaProperty("label", ariaLabel);
}

export function Table<TData = any>({
  "aria-label": ariaLabel,
  className,
  columnDefs,
  height,
  rowData,
}: TableProps<TData>) {
  if (!ariaLabel.trim()) {
    throw new Error("Table requires a non-empty aria-label.");
  }

  const resolvedHeight = resolveHeight(height);
  const isAutoLayout = height === "auto";

  return (
    <div
      className={clsx(styles.root, className)}
      data-layout={isAutoLayout ? "auto" : "fixed"}
      style={
        isAutoLayout
          ? { height: "auto" }
          : resolvedHeight
            ? { height: resolvedHeight }
            : undefined
      }
    >
      <AgGridReact<TData>
        animateRows={false}
        columnDefs={columnDefs}
        containerStyle={
          isAutoLayout ? { width: "100%" } : { height: "100%", width: "100%" }
        }
        defaultColDef={TABLE_DEFAULT_COL_DEF}
        domLayout={isAutoLayout ? "autoHeight" : "normal"}
        enableCellTextSelection
        ensureDomOrder
        onGridReady={(event) => applyAccessibleName(event, ariaLabel)}
        overlayNoRowsTemplate="No data available"
        pagination={false}
        rowData={rowData ?? []}
        suppressColumnVirtualisation
        theme={themeQuartz}
      />
    </div>
  );
}
