import { readdir, rm } from "node:fs/promises"
import path from "node:path"

const registryDir = path.resolve("public/r")

for (const entry of await readdir(registryDir, { withFileTypes: true })) {
  if (!entry.isFile() || !entry.name.endsWith(".json")) {
    continue
  }

  await rm(path.join(registryDir, entry.name))
}
