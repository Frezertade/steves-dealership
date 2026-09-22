import { Resend } from 'resend'

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function fieldsToHtml(title: string, rows: Array<[string, string]>) {
  const body = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;color:#64748b;vertical-align:top">${escapeHtml(label)}</td><td style="padding:8px 12px;color:#0f172a;font-weight:600">${escapeHtml(value)}</td></tr>`
    )
    .join('')

  return `<!doctype html>
<html>
  <body style="margin:0;background:#f8fafc;font-family:system-ui,-apple-system,sans-serif">
    <div style="max-width:560px;margin:24px auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;padding:24px">
      <h1 style="margin:0 0 16px;font-size:20px;color:#0f172a">${escapeHtml(title)}</h1>
      <table style="width:100%;border-collapse:collapse">${body}</table>
    </div>
  </body>
</html>`
}

export async function sendTransactionalEmail(input: {
  subject: string
  text: string
  html: string
  replyTo?: string
  idempotencyKey: string
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!apiKey) return false

  const from =
    process.env.LEAD_FROM?.trim() || "Steve's Dealership <onboarding@resend.dev>"
  const to = process.env.LEAD_INBOX?.trim() || 'stevesdealer@gmail.com'
  const resend = new Resend(apiKey)

  const { error } = await resend.emails.send(
    {
      from,
      to,
      subject: input.subject,
      text: input.text,
      html: input.html,
      ...(input.replyTo ? { replyTo: input.replyTo } : {}),
    },
    {
      headers: {
        'Idempotency-Key': input.idempotencyKey,
      },
    }
  )

  if (error) {
    console.error('[mail] Resend failed', error)
    return false
  }

  return true
}
