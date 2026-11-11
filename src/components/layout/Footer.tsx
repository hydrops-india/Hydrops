'use client';

import Link from 'next/link';
import { companyData } from '@/data/site/company';
import { footerData } from '@/data/site/footer';
import { socialData } from '@/data/site/social';
import type { FooterDocument, SocialLinkDocument } from '@/types';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { useWhatsAppConfig } from '@/components/global/WhatsAppConfigProvider';

// ─── Design tokens (local constants so the component is self-contained) ────────
const GOLD = 'rgba(200,169,106,1)';
const GOLD_DIM = 'rgba(200,169,106,0.55)';
const GOLD_FAINT = 'rgba(200,169,106,0.15)';
const WHITE_60 = 'rgba(255,255,255,0.60)';
const WHITE_35 = 'rgba(255,255,255,0.35)';
const WHITE_18 = 'rgba(255,255,255,0.18)';
const WHITE_08 = 'rgba(255,255,255,0.08)';

// ─── SVG Icons ─────────────────────────────────────────────────────────────────

function PhoneIcon() {
  return (
    <svg
      aria-hidden="true"
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.86a16 16 0 0 0 6.29 6.29l.96-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      aria-hidden="true"
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.885 3.488" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      aria-hidden="true"
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      aria-hidden="true"
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      aria-hidden="true"
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function SocialIconRenderer({ icon }: { icon: string }) {
  if (icon === 'facebook') return <FacebookIcon />;
  if (icon === 'instagram') return <InstagramIcon />;
  return null;
}

// ─── Sub-components ────────────────────────────────────────────────────────────

/** Contact row: icon + label/link */
function ContactRow({
  icon,
  label,
  href,
  isExternal = false,
}: {
  icon: React.ReactNode;
  label: string;
  href?: string;
  isExternal?: boolean;
}) {
  const content = (
    <span className="flex items-start gap-3 group/row">
      <span
        className="shrink-0 mt-[1px] transition-colors duration-300"
        style={{ color: GOLD_DIM }}
      >
        {icon}
      </span>
      <span
        className="leading-snug transition-colors duration-300"
        style={{ color: WHITE_60 }}
      >
        {label}
      </span>
    </span>
  );

  if (!href) return <div className="text-[13px]">{content}</div>;

  return (
    <a
      href={href}
      {...(isExternal
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {})}
      className="text-[13px] block hover:opacity-80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A96A] rounded-sm"
    >
      {content}
    </a>
  );
}

/** Brand / first column */
function FooterBrandColumn({ socials }: { socials: SocialLinkDocument[] }) {
  return (
    <div className="flex flex-col gap-6">
      {/* Wordmark */}
      <div>
        <span
          className="block text-[22px] font-light tracking-[0.3em] uppercase"
          style={{ color: 'rgba(255,255,255,0.92)' }}
        >
          {companyData.name}
        </span>
        <span
          className="block mt-1 text-[10px] tracking-[0.25em] uppercase"
          style={{ color: GOLD_DIM }}
        >
          {companyData.countryLabel}
        </span>
      </div>

      {/* Tagline */}
      <p
        className="text-[13px] leading-relaxed max-w-[260px]"
        style={{ color: WHITE_35 }}
      >
        {footerData.tagline}
      </p>

      {/* Social icons */}
      {socials.length > 0 && (
        <div className="flex items-center gap-3 mt-1">
          {socials.map((s) => (
            <a
              key={s.platform}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Hydrops on ${s.platform}`}
              className="flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A96A]"
              style={{
                borderColor: WHITE_08,
                color: WHITE_35,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = GOLD_FAINT;
                el.style.color = GOLD;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = WHITE_08;
                el.style.color = WHITE_35;
              }}
            >
              <SocialIconRenderer icon={s.icon} />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

/** Contact / second column */
function FooterContactColumn({
  contact,
  address,
}: Pick<FooterDocument, 'contact' | 'address'>) {
  const emailDisplay = contact.email ?? footerData.labels.emailUnavailable;
  const emailHref = contact.email ? `mailto:${contact.email}` : undefined;
  const whatsappConfig = useWhatsAppConfig();

  return (
    <div className="flex flex-col gap-4">
      {/* Section label */}
      <p
        className="text-[10px] tracking-[0.3em] uppercase mb-1"
        style={{ color: GOLD_DIM }}
      >
        Contact
      </p>

      <ContactRow
        icon={<PhoneIcon />}
        label={contact.phone}
        href={`tel:${contact.phone}`}
      />
      <ContactRow
        icon={<WhatsAppIcon />}
        label={`WhatsApp · ${contact.whatsapp}`}
        href={buildWhatsAppUrl(whatsappConfig)}
        isExternal
      />
      <ContactRow
        icon={<MailIcon />}
        label={emailDisplay}
        href={emailHref}
      />

      {/* Address — tighter layout, each line on its own */}
      <div className="flex items-start gap-3 text-[13px]">
        <span className="shrink-0 mt-[1px]" style={{ color: GOLD_DIM }}>
          <MapPinIcon />
        </span>
        <div style={{ color: WHITE_60 }} className="leading-relaxed">
          <span className="block">{address.company}</span>
          <span className="block">{address.street}</span>
          <span className="block">{address.city}</span>
          <span className="block">{address.state} {address.postalCode}</span>
          <a
            href={address.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-2 text-[11px] tracking-[0.12em] uppercase transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A96A] rounded-sm"
            style={{ color: GOLD_DIM }}
            onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
            onMouseLeave={(e) => (e.currentTarget.style.color = GOLD_DIM)}
          >
            Open in Maps
            <svg
              aria-hidden="true"
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 7h10v10M7 17 17 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

/** Hours / third column */
function FooterHoursColumn({
  workingHours,
}: Pick<FooterDocument, 'workingHours'>) {
  return (
    <div className="flex flex-col gap-4">
      {/* Section label */}
      <p
        className="text-[10px] tracking-[0.3em] uppercase mb-1"
        style={{ color: GOLD_DIM }}
      >
        Hours
      </p>

      <div className="flex items-start gap-3 text-[13px]">
        <span className="shrink-0 mt-[1px]" style={{ color: GOLD_DIM }}>
          <ClockIcon />
        </span>
        <div className="flex flex-col gap-3">
          {/* Open hours */}
          <div>
            <span
              className="block text-[11px] tracking-[0.12em] uppercase mb-1"
              style={{ color: WHITE_35 }}
            >
              {workingHours.weekdays}
            </span>
            <span
              className="block text-[15px] font-light tracking-wide"
              style={{ color: 'rgba(255,255,255,0.82)' }}
            >
              {workingHours.hours}
            </span>
          </div>

          {/* Divider */}
          <div
            className="w-10 h-px"
            style={{ background: WHITE_08 }}
            aria-hidden="true"
          />

          {/* Closed */}
          <div>
            <span
              className="block text-[11px] tracking-[0.12em] uppercase mb-1"
              style={{ color: WHITE_35 }}
            >
              {workingHours.closedDay}
            </span>
            <span
              className="block text-[13px] font-light tracking-wide"
              style={{ color: WHITE_35 }}
            >
              {workingHours.closedLabel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Bottom legal bar */
function FooterLegalBar({
  copyright,
  legalLinks,
}: Pick<FooterDocument, 'copyright' | 'legalLinks'>) {
  return (
    <div
      className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0"
      style={{ borderTop: `1px solid ${WHITE_08}` }}
    >
      <p
        className="text-[11px] tracking-[0.2em]"
        style={{ color: WHITE_18 }}
      >
        {copyright}
      </p>
      <nav aria-label="Legal links">
        <ul className="flex items-center gap-6">
          {legalLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-[11px] tracking-[0.15em] uppercase transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A96A] rounded-sm"
                style={{ color: WHITE_18 }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = WHITE_18)
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

// ─── Root export ───────────────────────────────────────────────────────────────

export function Footer() {
  return (
    <footer
      aria-label="Site footer"
      style={{ backgroundColor: '#0D0D0D' }}
    >
      {/* ── Gold signature ripple — visual continuity from CTA above ─── */}
      <div
        aria-hidden="true"
        className="w-full h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(200,169,106,0.3) 20%, rgba(200,169,106,0.6) 50%, rgba(200,169,106,0.3) 80%, transparent 100%)',
        }}
      />

      <div className="container mx-auto px-6 md:px-12 lg:px-16">

        {/* ── Main content grid ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16 py-16 md:py-20">
          <FooterBrandColumn socials={socialData} />
          <FooterContactColumn
            contact={footerData.contact}
            address={footerData.address}
          />
          <FooterHoursColumn workingHours={footerData.workingHours} />
        </div>

        {/* ── Legal bar ─────────────────────────────────────────────── */}
        <FooterLegalBar
          copyright={footerData.copyright}
          legalLinks={footerData.legalLinks}
        />

        {/* ── Bottom breathing room ──────────────────────────────────── */}
        <div className="pb-10" aria-hidden="true" />
      </div>
    </footer>
  );
}
