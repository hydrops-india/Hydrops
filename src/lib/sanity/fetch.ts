import { cache } from 'react';
import { client } from './client';
import { HOME_PAGE_QUERY, ABOUT_PAGE_QUERY, CONTACT_PAGE_QUERY, GLOBAL_WHATSAPP_QUERY } from './queries';
import {
  DEFAULT_WHATSAPP_CONFIG,
  DEFAULT_WHATSAPP_MESSAGE,
  DEFAULT_WHATSAPP_NUMBER,
  normalizeWhatsAppNumber,
  type WhatsAppConfig,
} from '@/lib/whatsapp';

/**
 * Global WhatsApp config (number + pre-filled message) from the `contact` singleton.
 * Wrapped in React `cache` so every component in a request shares one fetch.
 */
export const getWhatsAppConfig = cache(async (): Promise<WhatsAppConfig> => {
  try {
    const raw = await client.fetch<{ number: string | null; message: string | null } | null>(
      GLOBAL_WHATSAPP_QUERY,
      {},
      { next: { revalidate: 60 } }
    );
    return {
      number: normalizeWhatsAppNumber(raw?.number) ?? DEFAULT_WHATSAPP_NUMBER,
      message: raw?.message?.trim() || DEFAULT_WHATSAPP_MESSAGE,
    };
  } catch (error) {
    console.error('Failed to fetch global WhatsApp config from Sanity:', error);
    return DEFAULT_WHATSAPP_CONFIG;
  }
});

import { mapSanityHomeToFrontend, mapSanityAboutToFrontend, mapSanityContactToFrontend } from './adapters';
import { homePageData as fallbackHomePageData } from '@/data/home/home';
import type { HomePageDocument } from '@/data/types';
import type { AboutPageData } from '@/features/about/types';
import type { ContactPageData } from '@/features/contact/types';
import type { SanityRawHomePage, SanityRawAboutPage, SanityRawContactPage } from './sanity.raw.types';

export async function getHomePage(): Promise<HomePageDocument> {
  try {
    const rawData = await client.fetch<SanityRawHomePage>(HOME_PAGE_QUERY, {}, { next: { revalidate: 60 } });
    if (!rawData) {
      console.warn('Sanity returned null for home page, falling back to static data.');
      return fallbackHomePageData;
    }
    return mapSanityHomeToFrontend(rawData);
  } catch (error) {
    console.error('Failed to fetch home page from Sanity, falling back to static data:', error);
    return fallbackHomePageData;
  }
}

import { aboutData as fallbackAboutPageData } from '@/data/about/about';

export async function getAboutPage(): Promise<AboutPageData> {
  try {
    const rawData = await client.fetch<SanityRawAboutPage>(ABOUT_PAGE_QUERY, {}, { next: { revalidate: 60 } });
    if (!rawData) {
      console.warn('Sanity returned null for about page, falling back to static data.');
      return fallbackAboutPageData;
    }
    return mapSanityAboutToFrontend(rawData);
  } catch (error) {
    console.error('Failed to fetch about page from Sanity, falling back to static data:', error);
    return fallbackAboutPageData;
  }
}

import { fallbackContactPageData } from '@/data/contact/contact-page';

export async function getContactPage(): Promise<ContactPageData> {
  try {
    const rawData = await client.fetch<SanityRawContactPage>(CONTACT_PAGE_QUERY, {}, { next: { revalidate: 60 } });
    if (!rawData) {
      console.warn('Sanity returned null for contact page, falling back to static data.');
      return fallbackContactPageData;
    }
    return mapSanityContactToFrontend(rawData);
  } catch (error) {
    console.error('Failed to fetch contact page from Sanity, falling back to static data:', error);
    return fallbackContactPageData;
  }
}

