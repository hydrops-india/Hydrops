import type { CompanyInfoData } from '@/features/about/types';
import type { ContactPageData } from '@/features/contact/types';
import { getMapEmbedUrl } from '@/features/contact/lib/maps';

interface Props {
  data: CompanyInfoData;
  contactPageData?: ContactPageData;
}

/**
 * CompanyInfo — premium editorial layout with location card, business hours,
 * certifications, and dual CTA buttons. Final section of the About page.
 */
export function CompanyInfo({ data, contactPageData }: Props) {
  const canonicalAddress = contactPageData?.cards.location.address;
  const canonicalGoogleMapsUrl = contactPageData?.cards.location.googleMapsUrl;
  const embedUrl = getMapEmbedUrl(canonicalAddress, contactPageData?.map.mapEmbedUrl);

  const addressLines = canonicalAddress
    ? [canonicalAddress]
    : [data.address.line1, data.address.line2, data.address.line3].filter(Boolean);

  return (
    <section
      id="about-company"
      aria-labelledby="company-heading"
      className="relative w-full bg-[#0D0D0D] py-32 overflow-hidden"
    >
      {/* Ambient gold radial glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 70% 30%, rgba(200,169,106,0.06) 0%, transparent 55%)',
        }}
      />

      <div className="container mx-auto px-8 md:px-16 lg:px-24 relative">

        {/* ── Top: Eyebrow + Heading + Description + CTAs ──────────── */}
        <div className="mb-24">
          <p
            className="text-[#C8A96A] font-medium uppercase mb-6"
            style={{ fontSize: '11px', letterSpacing: '0.4em' }}
          >
            {data.eyebrow}
          </p>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
            <div className="max-w-2xl">
              <h2
                id="company-heading"
                className="font-light text-white mb-6"
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                  lineHeight: 0.95,
                  letterSpacing: '-0.02em',
                }}
              >
                {data.heading}
              </h2>
              <p
                className="font-light leading-relaxed"
                style={{
                  color: 'rgba(255,255,255,0.45)',
                  fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)',
                }}
              >
                {data.description}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <a
                href={data.primaryCta.href}
                className="inline-flex items-center justify-center px-8 py-4 text-[#0D0D0D] bg-[#C8A96A] font-medium transition-opacity hover:opacity-85"
                style={{ fontSize: '13px', letterSpacing: '0.08em' }}
              >
                {data.primaryCta.label}
              </a>
              <a
                href={data.secondaryCta.href}
                target={data.secondaryCta.href.startsWith('http') ? '_blank' : undefined}
                rel={data.secondaryCta.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center justify-center px-8 py-4 font-medium border transition-colors hover:border-[#C8A96A] hover:text-[#C8A96A]"
                style={{
                  fontSize: '13px',
                  letterSpacing: '0.08em',
                  color: 'rgba(255,255,255,0.65)',
                  borderColor: 'rgba(255,255,255,0.15)',
                }}
              >
                {data.secondaryCta.label}
              </a>
            </div>
          </div>
        </div>

        {/* ── Divider ──────────────────────────────────────────────── */}
        <div
          aria-hidden="true"
          className="w-full mb-20"
          style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }}
        />

        {/* ── Bottom: Two-column grid ───────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* LEFT — Location card */}
          <div
            className="flex flex-col gap-8 p-10"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {/* Map placeholder / embed wrapper */}
            {embedUrl && (
              <div
                className="w-full overflow-hidden"
                style={{ aspectRatio: '16/7' }}
                aria-label="Location map"
              >
                <iframe
                  src={embedUrl}
                  title="Hydrops India location"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(0.6) contrast(1.1)' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}

            {/* Address */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p
                  className="text-[#C8A96A] font-medium uppercase mb-2"
                  style={{ fontSize: '10px', letterSpacing: '0.35em' }}
                >
                  Address
                </p>
                {canonicalGoogleMapsUrl && (
                  <a
                    href={canonicalGoogleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-mono tracking-[0.15em] text-[#C8A96A] hover:text-white uppercase transition-colors"
                  >
                    View on Map →
                  </a>
                )}
              </div>
              {addressLines.map((line, i) => (
                <p
                  key={i}
                  className="font-light text-white/70"
                  style={{ fontSize: 'clamp(0.9rem, 1.1vw, 1rem)', lineHeight: 1.6 }}
                >
                  {line}
                </p>
              ))}
              {data.coordinates && (
                <p
                  className="font-light mt-1"
                  style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}
                >
                  {data.coordinates}
                </p>
              )}
            </div>
          </div>

          {/* RIGHT — Contact + Hours + Company + Certifications */}
          <div className="flex flex-col gap-10">

            {/* Contact */}
            <div>
              <p
                className="text-[#C8A96A] font-medium uppercase mb-5"
                style={{ fontSize: '10px', letterSpacing: '0.35em' }}
              >
                Contact
              </p>
              <div className="flex flex-col gap-3">
                {data.email && (
                  <a
                    href={`mailto:${data.email}`}
                    className="font-light text-white/70 hover:text-[#C8A96A] transition-colors"
                    style={{ fontSize: 'clamp(0.9rem, 1.1vw, 1rem)' }}
                  >
                    {data.email}
                  </a>
                )}
                {data.phone && (
                  <a
                    href={`tel:${data.phone.replace(/\s/g, '')}`}
                    className="font-light text-white/70 hover:text-[#C8A96A] transition-colors"
                    style={{ fontSize: 'clamp(0.9rem, 1.1vw, 1rem)' }}
                  >
                    {data.phone}
                  </a>
                )}
              </div>
            </div>

            {/* Business Hours */}
            {data.businessHours && (
              <div>
                <p
                  className="text-[#C8A96A] font-medium uppercase mb-5"
                  style={{ fontSize: '10px', letterSpacing: '0.35em' }}
                >
                  Business Hours
                </p>
                <p
                  className="font-light text-white/70 whitespace-pre-line"
                  style={{ fontSize: 'clamp(0.9rem, 1.1vw, 1rem)', lineHeight: 1.8 }}
                >
                  {data.businessHours}
                </p>
              </div>
            )}

            {/* Company Details */}
            <div>
              <p
                className="text-[#C8A96A] font-medium uppercase mb-5"
                style={{ fontSize: '10px', letterSpacing: '0.35em' }}
              >
                Company
              </p>
              <dl className="flex flex-col gap-2">
                {[
                  { label: 'Legal Name', value: data.legalName },
                  { label: 'Founded', value: data.founded },
                  { label: 'Origin', value: data.origin },
                ].map(({ label, value }) =>
                  value ? (
                    <div key={label} className="flex gap-6">
                      <dt
                        className="font-light shrink-0"
                        style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', width: 90 }}
                      >
                        {label}
                      </dt>
                      <dd
                        className="font-light text-white/65"
                        style={{ fontSize: 'clamp(0.85rem, 1vw, 0.95rem)' }}
                      >
                        {value}
                      </dd>
                    </div>
                  ) : null
                )}
              </dl>
            </div>

            {/* Certifications */}
            {data.certifications.length > 0 && (
              <div>
                <p
                  className="text-[#C8A96A] font-medium uppercase mb-5"
                  style={{ fontSize: '10px', letterSpacing: '0.35em' }}
                >
                  Certifications
                </p>
                <ul className="flex flex-wrap gap-3">
                  {data.certifications.map((cert) => (
                    <li
                      key={cert}
                      className="font-light"
                      style={{
                        fontSize: '11px',
                        letterSpacing: '0.06em',
                        color: 'rgba(255,255,255,0.55)',
                        padding: '6px 14px',
                        border: '1px solid rgba(200,169,106,0.25)',
                      }}
                    >
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
