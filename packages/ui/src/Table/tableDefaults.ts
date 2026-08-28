import type { ColDef } from "ag-grid-community";

export const TABLE_DEFAULT_COL_DEF = {
  editable: false,
  filter: false,
  resizable: true,
  sortable: true,
  suppressHeaderMenuButton: true,
  suppressMovable: true,
  wrapText: false,
} satisfies ColDef;
