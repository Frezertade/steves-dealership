import { NextResponse } from 'next/server'
import { VEHICLES } from '@/lib/data'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const PHONE = '(717) 397-3497'
const ADDRESS = '1027 Dillerville Rd #16, Lancaster, PA 17603'
const HOURS = 'Monday–Friday 9am–7pm, Saturday 10am–5pm, closed Sunday'

type ChatMessage = { role: string; content: string }

function asString(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function money(amount: number) {
  return `$${amount.toLocaleString('en-US')}`
}

function miles(amount: number) {
  return `${amount.toLocaleString('en-US')} miles`
}

function formatVehicle(vehicle: (typeof VEHICLES)[number]) {
  return `${vehicle.year} ${vehicle.make} ${vehicle.model} — ${money(vehicle.price)}, ${miles(vehicle.mileage)}, ${vehicle.fuel} ${vehicle.category}`
}

function inventoryList() {
  return VEHICLES.map(formatVehicle).join('\n')
}

function systemPrompt() {
  return [
    "You are the sales assistant for Steve's Dealership, an independent used-car lot in Lancaster, PA.",
    `Address: ${ADDRESS}. Phone: ${PHONE}. Email: stevesdealer@gmail.com.`,
    `Hours: ${HOURS}.`,
    'Help customers find cars from the current lot, explain financing in general terms, and invite them to call or visit for a test drive.',
    'Never invent a VIN. Never mention a vehicle, year, price, or mileage that is not in the inventory list below.',
    'If someone asks for a car we do not have, say it is not on the lot right now, offer the closest inventory match if there is one, and invite them to call.',
    'Do not claim the lot is #1 rated or a luxury franchise.',
    '',
    'Current inventory:',
    inventoryList(),
  ].join('\n')
}

function lastUserText(messages: ChatMessage[], extra: string) {
  const fromHistory = [...messages].reverse().find((m) => m.role === 'user' && m.content)
  return extra || fromHistory?.content || ''
}

function matchVehicles(query: string) {
  const q = query.toLowerCase()
  return VEHICLES.filter((vehicle) => {
    const make = vehicle.make.toLowerCase()
    const model = vehicle.model.toLowerCase()
    const hay = `${make} ${model} ${vehicle.category} ${vehicle.fuel}`.toLowerCase()
    if (q.includes(make) || q.includes(model)) return true
    if (make.includes('mercedes') && q.includes('mercedes')) return true
    if (/\bsuvs?\b/.test(q) && /suv/i.test(vehicle.category)) return true
    if (/\btrucks?\b/.test(q) && /truck/i.test(vehicle.category)) return true
    if (/\bsedans?\b/.test(q) && /sedan/i.test(vehicle.category)) return true
    if (/\bhybrids?\b/.test(q) && /hybrid/i.test(hay)) return true
    if (/\belectric|evs?\b/.test(q) && /electric/i.test(hay)) return true
    return false
  })
}

function fallbackAnswer(query: string) {
  const q = query.toLowerCase()

  if (!q) {
    return `Hi — this is Steve's Dealership in Lancaster. I can help with cars on the lot, financing, and test drives. Call ${PHONE} or visit ${ADDRESS}. Hours: ${HOURS}.`
  }

  if (/\b(hour|hours|open|opening|close|closed|when are you)\b/.test(q)) {
    return `We're open ${HOURS}. Visit us at ${ADDRESS} or call ${PHONE}.`
  }

  if (/\b(phone|call|number|contact)\b/.test(q)) {
    return `Call Steve's Dealership at ${PHONE}. We're at ${ADDRESS}. Hours: ${HOURS}.`
  }

  if (/\b(address|where|location|lot|map|directions?)\b/.test(q)) {
    return `We're at ${ADDRESS}. Hours: ${HOURS}. Call ${PHONE} if you want directions or a test drive.`
  }

  if (/\b(financ|loan|payment|credit|apr)\b/.test(q)) {
    return `We can help with used-car financing. Use the calculator on this page for a rough payment, then call ${PHONE} so a salesperson can go over options. Nothing here is a credit decision.`
  }

  if (/\b(test drive|testdrive|drive it|come by|visit)\b/.test(q)) {
    return `You're welcome to test drive any car currently on the lot. Call ${PHONE} to set a time, or stop by ${ADDRESS} during ${HOURS}.`
  }

  const priceCap = /\bunder\s*\$?20/.test(q) || /\bcheap|budget|affordable\b/.test(q)
    ? 20000
    : /\bunder\s*\$?30/.test(q)
      ? 30000
      : null

  let matches = matchVehicles(q)
  if (priceCap != null) {
    matches = (matches.length ? matches : VEHICLES).filter((v) => v.price < priceCap)
  }

  if (/\b(inventory|in stock|what cars|vehicles?|what do you have|on the lot)\b/.test(q) && matches.length === 0) {
    matches = VEHICLES
  }

  if (matches.length) {
    const lines = matches.slice(0, 8).map((v) => `• ${formatVehicle(v)}`)
    const more = matches.length > 8 ? `\nThere ${matches.length - 8 === 1 ? 'is 1 more match' : `are ${matches.length - 8} more matches`} — call ${PHONE} for the rest.` : ''
    return `Here's what we have on the lot that fits:\n${lines.join('\n')}${more}\nWant a test drive? Call ${PHONE}.`
  }

  const askedForCar = /\b(have|got|looking for|any|tesla|bmw|honda|toyota|ford|chevy|chevrolet|nissan|hyundai|jeep|mercedes|prius|camry|accord)\b/.test(q)
  if (askedForCar) {
    const sample = VEHICLES.slice(0, 5).map((v) => `• ${formatVehicle(v)}`).join('\n')
    return `I don't see that on the current lot, and I won't invent a car or VIN. A few that are here now:\n${sample}\nCall ${PHONE} if you want us to watch for something specific.`
  }

  return `I can help with inventory, hours, financing, and test drives at Steve's Dealership. Browse the list on this page or call ${PHONE}. We're at ${ADDRESS}, ${HOURS}.`
}

function parseMessages(body: Record<string, unknown>): ChatMessage[] {
  if (!Array.isArray(body.messages)) return []
  return body.messages
    .filter((item) => item && typeof item === 'object')
    .map((item) => {
      const row = item as Record<string, unknown>
      return { role: asString(row.role) || 'user', content: asString(row.content) }
    })
    .filter((item) => item.content)
}

async function answerWithOpenAI(apiKey: string, messages: ChatMessage[], userText: string) {
  const history = messages
    .filter((m) => m.role === 'user' || m.role === 'assistant')
    .slice(-12)
    .map((m) => ({ role: m.role, content: m.content }))

  if (!history.length || history[history.length - 1].content !== userText) {
    history.push({ role: 'user', content: userText })
  }

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      temperature: 0.3,
      max_tokens: 400,
      messages: [{ role: 'system', content: systemPrompt() }, ...history],
    }),
  })

  if (!res.ok) {
    throw new Error(`OpenAI ${res.status}: ${await res.text()}`)
  }

  const data = await res.json()
  const text = asString(data?.choices?.[0]?.message?.content)
  if (!text) throw new Error('OpenAI returned empty text')
  return text
}

export async function POST(req: Request) {
  let body: Record<string, unknown> = {}
  try {
    const parsed = await req.json()
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      body = parsed as Record<string, unknown>
    }
  } catch {
    return NextResponse.json({ error: 'Invalid JSON', text: fallbackAnswer('') }, { status: 400 })
  }

  const messages = parseMessages(body)
  const userText = lastUserText(messages, asString(body.message) || asString(body.text))
  const apiKey = process.env.OPENAI_API_KEY?.trim()

  if (apiKey) {
    try {
      const text = await answerWithOpenAI(apiKey, messages, userText || 'Hello')
      return NextResponse.json({ text })
    } catch (error) {
      console.error('[chat] OpenAI failed, using inventory fallback', error)
    }
  }

  return NextResponse.json({ text: fallbackAnswer(userText) })
}
