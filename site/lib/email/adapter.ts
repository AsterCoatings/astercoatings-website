export interface EmailMessage {
  to: string[];
  subject: string;
  text: string;
  replyTo?: string;
}

export interface EmailAdapter {
  readonly name: string;
  send(msg: EmailMessage): Promise<{ id: string }>;
}

/** Development adapter: logs to the server console, never sends. */
export class ConsoleEmailAdapter implements EmailAdapter {
  readonly name = 'console';
  sent: EmailMessage[] = [];
  failNext = false;
  async send(msg: EmailMessage) {
    if (this.failNext) {
      this.failNext = false;
      throw new Error('smtp unavailable (simulated)');
    }
    this.sent.push(msg);
    if (process.env.NODE_ENV !== 'test') {
      console.info(`[email:console] to=${msg.to.join(',')} subject="${msg.subject}"\n${msg.text}\n`);
    }
    return { id: `console-${Date.now()}` };
  }
}

function fromAddress(): string {
  const from = process.env.EMAIL_FROM;
  if (!from) throw new Error('EMAIL_FROM is not set');
  return from;
}

/**
 * Resend (https://resend.com) over its HTTPS API — the simplest provider on a serverless host.
 * Needs RESEND_API_KEY and EMAIL_FROM on a domain verified in Resend (SPF/DKIM records at the DNS host).
 */
export class ResendEmailAdapter implements EmailAdapter {
  readonly name = 'resend';
  async send(msg: EmailMessage) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error('RESEND_API_KEY is not set');
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: fromAddress(),
        to: msg.to,
        subject: msg.subject,
        text: msg.text,
        ...(msg.replyTo ? { reply_to: msg.replyTo } : {}),
      }),
    });
    if (!res.ok) throw new Error(`resend ${res.status}: ${(await res.text()).slice(0, 200)}`);
    const data = (await res.json()) as { id?: string };
    return { id: data.id ?? `resend-${Date.now()}` };
  }
}

/**
 * SMTP through the company mailbox provider (Microsoft 365, Google Workspace, …) via nodemailer.
 * Needs SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS and EMAIL_FROM. Port 465 is implicit TLS; 587 is STARTTLS.
 */
export class SmtpEmailAdapter implements EmailAdapter {
  readonly name = 'smtp';
  async send(msg: EmailMessage) {
    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    if (!host || !user || !pass) throw new Error('SMTP_HOST, SMTP_USER and SMTP_PASS must be set');
    const port = Number(process.env.SMTP_PORT ?? 587);
    const { createTransport } = await import('nodemailer');
    const transport = createTransport({ host, port, secure: port === 465, auth: { user, pass } });
    const info = await transport.sendMail({
      from: fromAddress(),
      to: msg.to.join(', '),
      subject: msg.subject,
      text: msg.text,
      ...(msg.replyTo ? { replyTo: msg.replyTo } : {}),
    });
    return { id: info.messageId ?? `smtp-${Date.now()}` };
  }
}

/**
 * Formspree (https://formspree.io): the notification is posted to a Formspree form, which emails the
 * form's owner and keeps the submission in the Formspree dashboard. Needs FORMSPREE_FORM_ID (the id
 * in https://formspree.io/f/<id>). Formspree only delivers to the form owner, so this adapter refuses
 * any message not addressed to the configured internal recipients (customer confirmations are never
 * sent through it).
 */
export class FormspreeEmailAdapter implements EmailAdapter {
  readonly name = 'formspree';
  async send(msg: EmailMessage) {
    const id = process.env.FORMSPREE_FORM_ID;
    if (!id) throw new Error('FORMSPREE_FORM_ID is not set');
    const internal = [
      process.env.SALES_NOTIFICATION_EMAIL,
      process.env.TECHNICAL_NOTIFICATION_EMAIL,
      process.env.ADMIN_ALERT_EMAIL,
    ]
      .filter(Boolean)
      .map((e) => String(e).toLowerCase());
    if (!msg.to.every((t) => internal.includes(t.toLowerCase())))
      throw new Error('formspree delivers to the form owner only; cannot email ' + msg.to.join(','));
    const res = await fetch(`https://formspree.io/f/${id}`, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        _subject: msg.subject,
        ...(msg.replyTo ? { email: msg.replyTo, _replyto: msg.replyTo } : {}),
        message: msg.text,
      }),
    });
    if (!res.ok) throw new Error(`formspree ${res.status}: ${(await res.text()).slice(0, 200)}`);
    return { id: `formspree-${Date.now()}` };
  }
}

export function createEmailAdapter(): EmailAdapter {
  const provider = process.env.EMAIL_PROVIDER ?? 'console';
  if (provider === 'console') return new ConsoleEmailAdapter();
  if (provider === 'resend') return new ResendEmailAdapter();
  if (provider === 'formspree') return new FormspreeEmailAdapter();
  if (provider === 'smtp') return new SmtpEmailAdapter();
  throw new Error(`Unknown EMAIL_PROVIDER '${provider}'`);
}
