#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const failures = []

function fail(message) {
  failures.push(message)
}

const tasksPath = join(root, 'TASKS.md')
if (!existsSync(tasksPath)) {
  fail('TASKS.md is missing')
} else {
  const open = readFileSync(tasksPath, 'utf8')
    .split(/\r?\n/)
    .filter((line) => /^- \[ \]/.test(line))
  if (open.length) {
    fail(`TASKS.md still has incomplete items:\n${open.map((line) => `    ${line}`).join('\n')}`)
  }
}

const nextConfigPath = join(root, 'next.config.js')
if (!existsSync(nextConfigPath)) {
  fail('next.config.js is missing')
} else {
  const nextConfig = readFileSync(nextConfigPath, 'utf8')
  if (/output\s*:\s*['"]export['"]/.test(nextConfig)) {
    fail("next.config.js still has output: 'export'")
  }
}

function hasApi(name) {
  return (
    existsSync(join(root, 'app', 'api', name, 'route.ts')) ||
    existsSync(join(root, 'app', 'api', name, 'route.js'))
  )
}

if (!hasApi('leads')) fail('missing /api/leads (app/api/leads/route.ts or route.js)')
if (!hasApi('chat')) fail('missing /api/chat (app/api/chat/route.ts or route.js)')

if (failures.length) {
  console.error('smoke failed:')
  for (const message of failures) console.error(`- ${message}`)
  process.exit(1)
}

console.log('smoke ok')
