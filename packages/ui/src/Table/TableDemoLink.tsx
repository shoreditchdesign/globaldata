import type { ICellRendererParams } from "ag-grid-community";

export function TableDemoLink({ value }: ICellRendererParams<unknown, string>) {
  if (value == null || value === "" || value === "—") {
    return value ?? null;
  }

  return (
    <a
      href={`#${encodeURIComponent(value)}`}
      onClick={(event) => event.preventDefault()}
    >
      {value}
    </a>
  );
}
