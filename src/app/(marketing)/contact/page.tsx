import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { navigationData } from '@/data/site/navigation';
import { Footer } from '@/components/layout/Footer';
import { getContactPage } from '@/lib/sanity/fetch';
import { generateBreadcrumbSchema } from '@/lib/schema/breadcrumb';
import { companyData } from '@/data/site/company';
import {
  ContactHero,
  ContactCards,
  ContactForm,
  ContactMap,
  ContactCTASection,
} from '@/features/contact';

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getContactPage();
  const title = `${pageData.hero.heading || 'Contact Us'} | Hydrops Pure Coconut Oil`;
  const description = pageData.hero.description || 'Get in touch with Hydrops for enquiries and wholesale distribution in India.';

  return {
    title,
    description,
    alternates: {
      canonical: 'https://hydropsindia.com/contact',
    },
    openGraph: {
      title,
      description,
      url: 'https://hydropsindia.com/contact',
      type: 'website',
      images: [
        {
          url: 'https://hydropsindia.com/images/brand/logo.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://hydropsindia.com/images/brand/logo.png'],
    },
  };
}

export default async function ContactPage() {
  const contactData = await getContactPage();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Contact', item: '/contact' },
  ]);

  const contactPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Hydrops',
    description: 'Get in touch with Hydrops for enquiries, orders, and support across India.',
    url: 'https://hydropsindia.com/contact',
    mainEntity: {
      '@type': 'Organization',
      name: companyData.name,
      legalName: companyData.legalName,
      url: 'https://hydropsindia.com',
      email: companyData.contact.email,
      telephone: companyData.contact.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: companyData.contact.address.street,
        addressLocality: companyData.contact.address.city,
        addressRegion: companyData.contact.address.state,
        postalCode: companyData.contact.address.postalCode,
        addressCountry: companyData.contact.address.country,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />

      <Navbar data={navigationData} />
      <main className="min-h-screen w-full bg-[#F8F6F1] text-[#1A1A1A]">
        {/* 01 · Hero Section */}
        <ContactHero data={contactData.hero} />

        {/* 02 · Contact Cards Section */}
        <ContactCards data={contactData.cards} />

        {/* 03 · Contact Form Section */}
        <ContactForm data={contactData.formContent} />

        {/* 04 · Live Google Map Section */}
        <ContactMap data={contactData.map} location={contactData.cards.location} />

        {/* 05 · Quick Action CTA Section */}
        <ContactCTASection data={contactData.cta} />
      </main>
      <Footer />
    </>
  );
}
