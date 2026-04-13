#!/usr/bin/env node
import fs from "node:fs"

const registry = JSON.parse(fs.readFileSync(new URL("../registry.json", import.meta.url), "utf8"))

const unowned = registry.items
  .filter((item) => item.type.startsWith("registry:") && item.type !== "registry:theme")
  .filter((item) => !item.files || item.files.length === 0)
  .map((item) => item.name)

console.log(JSON.stringify({ total: unowned.length, items: unowned }, null, 2))
