import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { NextResponse } from 'next/server'
import { fieldsToHtml, sendTransactionalEmail } from '../../../lib/mail'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type Lead = {
  id: string
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
  const candidates = [
    path.join(process.cwd(), 'data', 'leads.json'),
    path.join('/tmp', 'steves-leads.json'),
  ]

  for (const filePath of candidates) {
    try {
      await mkdir(path.dirname(filePath), { recursive: true })
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
      return true
    } catch (error) {
      console.error(`[leads] persist failed at ${filePath}`, error)
    }
  }

  return false
}

async function emailLead(lead: Lead) {
  const rows: Array<[string, string]> = [
    ['Name', lead.name],
    ['Phone', lead.phone],
    ['Email', lead.email || 'Not provided'],
    ['Message', lead.message || 'Not provided'],
    ['Received', lead.createdAt],
    ['ID', lead.id],
  ]
  const text = [
    'New sales lead from Steve\'s Dealership',
    '',
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    'Call the customer at the number above.',
  ].join('\n')

  return sendTransactionalEmail({
    subject: `New sales lead from ${lead.name}`,
    text,
    html: fieldsToHtml('New sales lead', rows),
    replyTo: lead.email,
    idempotencyKey: `dealer-lead-${lead.id}`,
  })
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
    id: crypto.randomUUID(),
    name,
    phone,
    createdAt: new Date().toISOString(),
  }
  if (email) lead.email = email
  if (message) lead.message = message

  console.log('[leads]', { id: lead.id, name: lead.name, phone: lead.phone })

  const saved = await persistLead(lead)
  let delivered = false
  try {
    delivered = await emailLead(lead)
  } catch (err) {
    console.error('[leads] resend error', err)
  }

  return NextResponse.json({ ok: true, id: lead.id, saved, delivered }, { status: 200 })
}
