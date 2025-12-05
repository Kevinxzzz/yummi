const fs = require("fs");
const path = require("path");

async function copyRecursive(src, dest) {
  try {
    const stat = await fs.promises.stat(src);
    if (stat.isDirectory()) {
      await fs.promises.mkdir(dest, { recursive: true });
      const entries = await fs.promises.readdir(src);
      for (const entry of entries) {
        await copyRecursive(path.join(src, entry), path.join(dest, entry));
      }
    } else {
      await fs.promises.mkdir(path.dirname(dest), { recursive: true });
      await fs.promises.copyFile(src, dest);
    }
  } catch (err) {
    // propagate non-ENOENT errors
    if (err.code !== "ENOENT") throw err;
  }
}

async function main() {
  const root = path.join(__dirname, "..");
  const dist = path.join(root, "dist");

  const copies = [
    {
      from: path.join(root, "node_modules", ".prisma"),
      to: path.join(dist, "node_modules", ".prisma"),
    },
    {
      from: path.join(root, "node_modules", "@prisma"),
      to: path.join(dist, "node_modules", "@prisma"),
    },
    {
      from: path.join(root, "prisma", "schema.prisma"),
      to: path.join(dist, "prisma", "schema.prisma"),
    },
  ];

  for (const item of copies) {
    try {
      const s = item.from;
      const d = item.to;
      const exists = await fs.promises
        .stat(s)
        .then(() => true)
        .catch(() => false);
      if (!exists) {
        console.warn(`[copy-prisma] Source not found: ${s}`);
        continue;
      }
      console.log(`[copy-prisma] Copying ${s} -> ${d}`);
      await copyRecursive(s, d);
    } catch (err) {
      console.error("[copy-prisma] Error copying", item, err);
      process.exitCode = 2;
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
