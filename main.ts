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

const pngSignature = Buffer.from([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
]);

if (!bytes.subarray(0, 8).equals(pngSignature)) {
  throw new Error("entry.png is not a PNG file");
}

writeFileSync(join(outputDir, "entry.png"), bytes);
console.log(`Wrote ${bytes.length} bytes to ${join(outputDir, "entry.png")}`);
