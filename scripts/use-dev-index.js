import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const source = path.join(root, "index.source.html");
const target = path.join(root, "index.html");

fs.copyFileSync(source, target);
console.log("Using dev index.html");
