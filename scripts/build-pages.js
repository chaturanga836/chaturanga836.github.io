import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const dist = path.join(root, "dist");

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function copyDir(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) return;
  fs.mkdirSync(destDir, { recursive: true });
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const src = path.join(srcDir, entry.name);
    const dest = path.join(destDir, entry.name);
    if (entry.isDirectory()) copyDir(src, dest);
    else copyFile(src, dest);
  }
}

console.log("Building site...");
// Ensure Vite always builds from source entry, not deployed index.html
copyFile(path.join(root, "index.source.html"), path.join(root, "index.html"));
execSync("npm run build", { cwd: root, stdio: "inherit" });

// Deploy built files to repo root for GitHub Pages
copyFile(path.join(dist, "index.html"), path.join(root, "index.html"));
copyFile(path.join(dist, "index.html"), path.join(root, "404.html"));

const assetsSrc = path.join(dist, "assets");
const assetsDest = path.join(root, "assets");
if (fs.existsSync(assetsDest)) {
  for (const file of fs.readdirSync(assetsDest)) {
    fs.unlinkSync(path.join(assetsDest, file));
  }
}
copyDir(assetsSrc, assetsDest);

if (fs.existsSync(path.join(dist, "profile.jpg"))) {
  copyFile(path.join(dist, "profile.jpg"), path.join(root, "profile.jpg"));
}

if (fs.existsSync(path.join(dist, "favicon.ico"))) {
  copyFile(path.join(dist, "favicon.ico"), path.join(root, "favicon.ico"));
}

if (fs.existsSync(path.join(dist, "print.css"))) {
  copyFile(path.join(dist, "print.css"), path.join(root, "print.css"));
}

const imgSrc = path.join(dist, "img");
const imgDest = path.join(root, "img");
if (fs.existsSync(imgSrc)) {
  copyDir(imgSrc, imgDest);
}

console.log("\nDone! Site built to repo root.");
console.log("Edit content/resume.json, then run: npm run build:pages");
console.log("Preview locally with: npm run dev");
