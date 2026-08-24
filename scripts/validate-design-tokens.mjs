import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import process from "node:process";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const tokensPath = path.resolve(scriptDir, "../packages/design-tokens/src/tokens.css");
const content = await readFile(tokensPath, "utf8");

const rootBlockMatch = content.match(/:root\s*\{([\s\S]*)\}\s*$/);

if (!rootBlockMatch) {
  console.error("Design tokens must be declared inside a single top-level :root block.");
  process.exit(1);
}

const declarations = [...content.matchAll(/^\s*(--[a-z0-9-]+)\s*:/gm)].map(
  ([, name]) => name,
);

if (declarations.length === 0) {
  console.error("No CSS custom properties were found in design tokens.");
  process.exit(1);
}

const duplicates = declarations.filter(
  (name, index) => declarations.indexOf(name) !== index,
);

if (duplicates.length > 0) {
  console.error(`Duplicate design tokens found: ${[...new Set(duplicates)].join(", ")}`);
  process.exit(1);
}
