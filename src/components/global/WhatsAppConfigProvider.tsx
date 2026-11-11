'use client';

import { createContext, useContext } from 'react';
import { DEFAULT_WHATSAPP_CONFIG, type WhatsAppConfig } from '@/lib/whatsapp';

const WhatsAppConfigContext = createContext<WhatsAppConfig>(DEFAULT_WHATSAPP_CONFIG);

/** Makes the Sanity-driven WhatsApp config available to client components. */
export function WhatsAppConfigProvider({
  value,
  children,
}: {
  value: WhatsAppConfig;
  children: React.ReactNode;
}) {
  return <WhatsAppConfigContext.Provider value={value}>{children}</WhatsAppConfigContext.Provider>;
}

export function useWhatsAppConfig(): WhatsAppConfig {
  return useContext(WhatsAppConfigContext);
}
