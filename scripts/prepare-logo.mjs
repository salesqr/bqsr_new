// One-off: turns the supplied logo (white background) into a transparent, web-sized PNG.
import sharp from "sharp";

const SRC = process.argv[2];
const OUT = process.argv[3] ?? "public";

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: w, height: h } = info;
const isBg = (i) => data[i] > 238 && data[i + 1] > 238 && data[i + 2] > 238;

// Flood-fill from the image border so only the OUTER white is removed
// (the white inside the flag / lettering band stays).
const seen = new Uint8Array(w * h);
const stack = [];
const push = (x, y) => {
  if (x < 0 || y < 0 || x >= w || y >= h) return;
  const p = y * w + x;
  if (seen[p] || !isBg(p * 4)) return;
  seen[p] = 1;
  stack.push(p);
};
for (let x = 0; x < w; x++) { push(x, 0); push(x, h - 1); }
for (let y = 0; y < h; y++) { push(0, y); push(w - 1, y); }
while (stack.length) {
  const p = stack.pop();
  const x = p % w, y = (p / w) | 0;
  push(x + 1, y); push(x - 1, y); push(x, y + 1); push(x, y - 1);
}
for (let p = 0; p < w * h; p++) if (seen[p]) data[p * 4 + 3] = 0;

// Soften the 1px fringe: pixels touching background and very light get half alpha.
for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) {
  const p = y * w + x;
  if (seen[p]) continue;
  const near = seen[p - 1] || seen[p + 1] || seen[p - w] || seen[p + w];
  if (near && isBg(p * 4)) data[p * 4 + 3] = 90;
}

const base = sharp(data, { raw: { width: w, height: h, channels: 4 } }).trim();
await base.clone().resize({ height: 360 }).png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(`${OUT}/logo.png`);
await base.clone().resize({ width: 256, height: 256, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(`app/icon.png`);
await base.clone().resize({ width: 180, height: 180, fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } }).png().toFile(`app/apple-icon.png`);
console.log("done");
