/**
 * Single source of truth for building WhatsApp (wa.me) links.
 * The pre-filled message comes from Sanity: `contact.contactInfo.whatsappMessage`.
 */

export interface WhatsAppConfig {
  /** Digits only, including country code (e.g. "917012123505"). */
  number: string;
  /** Pre-filled chat message. */
  message: string;
}

export const DEFAULT_WHATSAPP_NUMBER = '917012123505';
export const DEFAULT_WHATSAPP_MESSAGE =
  'Hello Hydrops Team, I would like to inquire about your crystal clear coconut oil.';

export const DEFAULT_WHATSAPP_CONFIG: WhatsAppConfig = {
  number: DEFAULT_WHATSAPP_NUMBER,
  message: DEFAULT_WHATSAPP_MESSAGE,
};

/** Strips everything except digits. Prefixes India's code for bare 10-digit numbers. */
export function normalizeWhatsAppNumber(raw: string | null | undefined): string | null {
  const digits = (raw ?? '').replace(/[^0-9]/g, '');
  if (!digits) return null;
  return digits.length === 10 ? `91${digits}` : digits;
}

export function buildWhatsAppUrl({ number, message }: WhatsAppConfig): string {
  const text = message.trim();
  return text
    ? `https://wa.me/${number}?text=${encodeURIComponent(text)}`
    : `https://wa.me/${number}`;
}

const WA_HOSTS = new Set(['wa.me', 'www.wa.me', 'api.whatsapp.com', 'whatsapp.com', 'www.whatsapp.com']);

export function isWhatsAppUrl(href: string | null | undefined): boolean {
  if (!href) return false;
  try {
    return WA_HOSTS.has(new URL(href).hostname.toLowerCase());
  } catch {
    return false;
  }
}

/**
 * If `href` is a WhatsApp link (e.g. a CMS-authored URL), replace its `text`
 * param with the global message. Non-WhatsApp links are returned unchanged.
 */
export function withWhatsAppMessage(href: string, message: string): string {
  if (!isWhatsAppUrl(href)) return href;
  const url = new URL(href);
  url.searchParams.delete('text');
  const text = message.trim();
  const rest = url.searchParams.toString();
  const query = [rest, text && `text=${encodeURIComponent(text)}`].filter(Boolean).join('&');
  return `${url.origin}${url.pathname}${query ? `?${query}` : ''}${url.hash}`;
}
