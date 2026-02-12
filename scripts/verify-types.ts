import fs from "node:fs";
import path from "node:path";

const srcIndex = path.join("src", "index.ts");
const indexText = fs.readFileSync(srcIndex, "utf8");

const exportMatches = [...indexText.matchAll(/from\s+['"]([^'"]+)['"]/g)].map(
  (match) => match[1],
);
const exportPaths = exportMatches.filter((exportPath) =>
  exportPath.startsWith("."),
);

const dtsFiles = new Set(["dist/index.d.ts"]);
const isAsset = (exportPath: string) =>
  /\.(css|scss|sass|less|svg|png|jpg|jpeg|gif|webp|avif)$/.test(exportPath);
const withNoExt = (exportPath: string) => exportPath.replace(/\.[^/.]+$/, "");

const resolveSrc = (exportPath: string) => {
  const base = withNoExt(exportPath);
  const candidates = [
    `${base}.ts`,
    `${base}.tsx`,
    path.join(base, "index.ts"),
    path.join(base, "index.tsx"),
  ];
  for (const candidate of candidates) {
    const fullPath = path.join("src", candidate);
    if (fs.existsSync(fullPath)) {
      return candidate;
    }
  }
  return null;
};

for (const exportPath of exportPaths) {
  if (isAsset(exportPath)) {
    continue;
  }
  const resolved = resolveSrc(exportPath);
  if (!resolved) {
    continue;
  }
  const distPath = path.join("dist", resolved).replace(/\.tsx?$/, ".d.ts");
  dtsFiles.add(distPath);
}

const missing = [...dtsFiles].filter((filePath) => !fs.existsSync(filePath));
if (missing.length) {
  console.error("Missing types:", missing.join(", "));
  process.exit(1);
}
console.log("Types OK");
