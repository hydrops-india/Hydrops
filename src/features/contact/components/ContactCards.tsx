import { Phone, MessageSquare, MapPin, Clock, ExternalLink } from 'lucide-react';
import type { ContactCardsData } from '../types';
import { buildWhatsAppUrl, normalizeWhatsAppNumber, type WhatsAppConfig } from '@/lib/whatsapp';

interface Props {
  data: ContactCardsData;
  whatsappConfig: WhatsAppConfig;
}

export function ContactCards({ data, whatsappConfig }: Props) {
  // Card keeps its own CMS number if set; the message always comes from the global field.
  const whatsappUrl = buildWhatsAppUrl({
    number: normalizeWhatsAppNumber(data.whatsapp.whatsappNumber) ?? whatsappConfig.number,
    message: whatsappConfig.message,
  });

  return (
    <section className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {/* Card 1: Phone Numbers */}
        <div className="bg-[#FAF8F5] border border-[#E8E5DF] hover:border-[#C8A96A]/60 rounded-3xl p-7 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] group">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#205C3B]/10 text-[#205C3B] flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-normal text-[#1A1A1A] mb-3">
              {data.phone.title}
            </h3>
            <div className="space-y-2">
              {data.phone.phoneNumbers.map((phoneNum, idx) => (
                <a
                  key={idx}
                  href={`tel:${phoneNum.replace(/[^0-9+]/g, '')}`}
                  className="block text-sm font-light text-[#1A1A1A]/70 hover:text-[#205C3B] transition-colors"
                >
                  {phoneNum}
                </a>
              ))}
            </div>
          </div>
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#737373] uppercase mt-8 block">
            DIRECT CALL
          </span>
        </div>

        {/* Card 2: WhatsApp */}
        <div className="bg-[#FAF8F5] border border-[#E8E5DF] hover:border-[#25D366]/60 rounded-3xl p-7 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] group">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-normal text-[#1A1A1A] mb-2">
              {data.whatsapp.title}
            </h3>
            <p className="text-sm font-light text-[#1A1A1A]/70 mb-6">
              Instant assistance via WhatsApp business messaging.
            </p>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-between w-full bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full px-5 py-3 text-xs font-medium tracking-wider uppercase transition-all shadow-sm group-hover:shadow-md"
          >
            <span>{data.whatsapp.buttonText}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Card 3: Location */}
        <div className="bg-[#FAF8F5] border border-[#E8E5DF] hover:border-[#C8A96A]/60 rounded-3xl p-7 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] group">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#C8A96A]/15 text-[#C8A96A] flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-normal text-[#1A1A1A] mb-2">
              {data.location.title}
            </h3>
            <p className="text-sm font-light text-[#1A1A1A]/70 leading-relaxed">
              {data.location.address}
            </p>
          </div>
          <a
            href={data.location.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-xs font-mono tracking-[0.2em] text-[#C8A96A] hover:text-[#1A1A1A] uppercase transition-colors gap-2 mt-6"
          >
            <span>VIEW MAP</span>
            <ExternalLink className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Card 4: Business Hours */}
        <div className="bg-[#FAF8F5] border border-[#E8E5DF] hover:border-[#C8A96A]/60 rounded-3xl p-7 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] group">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#205C3B]/10 text-[#205C3B] flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-normal text-[#1A1A1A] mb-2">
              {data.businessHours.title}
            </h3>
            <p className="text-sm font-light text-[#1A1A1A]/70 leading-relaxed">
              {data.businessHours.workingHours}
            </p>
          </div>
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#737373] uppercase mt-8 block">
            INDIAN STANDARD TIME (IST)
          </span>
        </div>
      </div>
    </section>
  );
}
