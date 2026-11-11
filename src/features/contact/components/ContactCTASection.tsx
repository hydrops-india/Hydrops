import { Phone, MessageSquare, Mail, ArrowUpRight } from 'lucide-react';
import type { ContactCtaSectionData, ContactCtaButton } from '../types';
import { withWhatsAppMessage, type WhatsAppConfig } from '@/lib/whatsapp';

interface Props {
  data: ContactCtaSectionData;
  whatsappConfig: WhatsAppConfig;
}

export function ContactCTASection({ data, whatsappConfig }: Props) {
  const getIcon = (type: ContactCtaButton['type']) => {
    switch (type) {
      case 'call':
        return <Phone className="w-4 h-4 mr-2.5" />;
      case 'whatsapp':
        return <MessageSquare className="w-4 h-4 mr-2.5" />;
      case 'email':
        return <Mail className="w-4 h-4 mr-2.5" />;
      default:
        return <ArrowUpRight className="w-4 h-4 mr-2.5" />;
    }
  };

  const getButtonStyle = (type: ContactCtaButton['type']) => {
    switch (type) {
      case 'call':
        return 'bg-[#205C3B] hover:bg-[#18482d] text-white';
      case 'whatsapp':
        return 'bg-[#25D366] hover:bg-[#1eb956] text-white';
      case 'email':
        return 'bg-[#1A1A1A] hover:bg-black text-white';
      default:
        return 'bg-[#FAF8F5] hover:bg-white text-[#1A1A1A] border border-[#E8E5DF]';
    }
  };

  return (
    <section className="w-full bg-[#08180E] text-white py-20 sm:py-28 mt-12 sm:mt-16 mb-0 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 text-center">
        <span className="text-[11px] font-mono tracking-[0.35em] text-[#C8A96A] uppercase mb-4 block">
          QUICK CONNECT
        </span>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#FAF8F5] mb-6">
          {data.title}
        </h2>

        <p className="text-base sm:text-lg font-light text-white/70 max-w-xl mx-auto mb-10 leading-relaxed">
          {data.description}
        </p>

        {/* CTA Buttons list */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {data.buttons.map((button, idx) => (
            <a
              key={idx}
              href={withWhatsAppMessage(button.url, whatsappConfig.message)}
              target={button.url.startsWith('http') ? '_blank' : undefined}
              rel={button.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`inline-flex items-center justify-center rounded-full px-8 py-4 text-xs font-medium tracking-[0.15em] uppercase shadow-md transition-all duration-300 hover:scale-105 ${getButtonStyle(
                button.type
              )}`}
            >
              {getIcon(button.type)}
              <span>{button.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
