#!/usr/bin/env node
import { readFileSync, existsSync, statSync, writeFileSync, mkdirSync, unlinkSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const tasksPath = join(root, 'TASKS.md')
const lockPath = join(root, '.grok', 'builder.lock')
const LOCK_MS = 25 * 60 * 1000

if (existsSync(lockPath)) {
  const age = Date.now() - statSync(lockPath).mtimeMs
  if (age < LOCK_MS) {
    console.log(JSON.stringify({ status: 'locked', ageMs: age }))
    process.exit(0)
  }
}

const text = readFileSync(tasksPath, 'utf8')
const match = text.match(/^- \[ \] \*\*([A-Z]\d+)\*\* (.+)$/m)
if (!match) {
  console.log(JSON.stringify({ status: 'complete' }))
  process.exit(0)
}

mkdirSync(dirname(lockPath), { recursive: true })
writeFileSync(
  lockPath,
  JSON.stringify({ task: match[1], startedAt: new Date().toISOString() }, null, 2)
)
console.log(JSON.stringify({ status: 'picked', id: match[1], title: match[2].slice(0, 180) }))
