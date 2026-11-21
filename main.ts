import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(scriptDir, "entry.png");
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outputDir, { recursive: true });

const bytes = readFileSync(sourcePath);

if (bytes.length === 0) {
  throw new Error("entry.png is empty");
}

writeFileSync(join(outputDir, "entry.png"), bytes);
console.log(`Wrote ${bytes.length} bytes to ${join(outputDir, "entry.png")}`);
