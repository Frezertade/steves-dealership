import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type Lead = {
  name: string
  phone: string
  email?: string
  message?: string
  createdAt: string
}

function asString(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

async function persistLead(lead: Lead) {
  const dataDir = path.join(process.cwd(), 'data')
  const filePath = path.join(dataDir, 'leads.json')
  await mkdir(dataDir, { recursive: true })

  let existing: Lead[] = []
  try {
    const raw = await readFile(filePath, 'utf8')
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) existing = parsed
  } catch {
    existing = []
  }

  existing.push(lead)
  await writeFile(filePath, JSON.stringify(existing, null, 2))
}

async function emailLead(lead: Lead) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return false

  const inbox = process.env.LEAD_INBOX || 'stevesdealer@gmail.com'
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: "Steve's Dealership <beth.t@example.com>",
      to: [inbox],
      subject: `New sales lead from ${lead.name}`,
      text: [
        'New sales lead from stevesdealership.com',
        '',
        `Name: ${lead.name}`,
        `Phone: ${lead.phone}`,
        `Email: ${lead.email || 'Not provided'}`,
        `Message: ${lead.message || 'Not provided'}`,
        `Received: ${lead.createdAt}`,
      ].join('\n'),
    }),
  })

  if (!res.ok) {
    console.error('[leads] resend failed', await res.text())
    return false
  }

  return true
}

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const input = body && typeof body === 'object' ? (body as Record<string, unknown>) : {}
  const name = asString(input.name)
  const phone = asString(input.phone)
  const email = asString(input.email)
  const message = asString(input.message)

  if (!name || !phone) {
    return NextResponse.json({ error: 'Name and phone are required.' }, { status: 400 })
  }

  const lead: Lead = {
    name,
    phone,
    createdAt: new Date().toISOString(),
  }
  if (email) lead.email = email
  if (message) lead.message = message

  console.log('[leads]', lead)

  let saved = false
  try {
    await persistLead(lead)
    saved = true
  } catch (err) {
    console.error('[leads] persist failed', err)
  }

  let delivered = false
  try {
    delivered = await emailLead(lead)
  } catch (err) {
    console.error('[leads] resend error', err)
  }

  return NextResponse.json({ ok: true, saved, delivered }, { status: 200 })
}
