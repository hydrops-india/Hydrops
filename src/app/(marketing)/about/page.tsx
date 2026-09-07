import { Navbar } from '@/components/layout/Navbar';
import { navigationData } from '@/data/site/navigation';
import { Footer } from '@/components/layout/Footer';
import type { Metadata } from 'next';
import { aboutSeo } from '@/data/site/seo';
import { generateBreadcrumbSchema } from '@/lib/schema/breadcrumb';
import {
  AboutHero,
  BrandIntroduction,
  BrandStory,
  MissionVision,
  CoreValues,
  ManufacturingPhilosophy,
  QualityCommitment,
  WhyChooseHydrops,
  CompanyInfo
} from '@/features/about';
import { AboutAnimationWrapper } from './AboutClient';
import { getAboutPage, getContactPage } from '@/lib/sanity/fetch';

export const metadata: Metadata = {
  title: aboutSeo.title,
  description: aboutSeo.description,
  alternates: {
    canonical: 'https://hydropsindia.com/about',
  },
  openGraph: {
    title: aboutSeo.title,
    description: aboutSeo.description,
    url: 'https://hydropsindia.com/about',
    type: 'website',
    images: [
      {
        url: 'https://hydropsindia.com/images/brand/philosophy-coconut.png',
        width: 1200,
        height: 630,
        alt: 'About Hydrops',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: aboutSeo.title,
    description: aboutSeo.description,
    images: ['https://hydropsindia.com/images/brand/philosophy-coconut.png'],
  },
};

export default async function AboutPage() {
  const [aboutData, contactPageData] = await Promise.all([
    getAboutPage(),
    getContactPage(),
  ]);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'About', item: '/about' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* 
        The Navbar is globally aware and will automatically adapt its text colour 
        based on the sections it passes over via the canvas probe we built earlier.
      */}
      <Navbar data={navigationData} />
      
      <AboutAnimationWrapper>
        <AboutHero data={aboutData.hero} />
        <BrandIntroduction data={aboutData.introduction} />
        <BrandStory data={aboutData.story} />
        <MissionVision data={aboutData.missionVision} />
        <CoreValues data={aboutData.coreValues} />
        <ManufacturingPhilosophy data={aboutData.manufacturing} />
        <QualityCommitment data={aboutData.quality} />
        <WhyChooseHydrops data={aboutData.whyChoose} />
        <CompanyInfo data={aboutData.companyInfo} contactPageData={contactPageData} />
      </AboutAnimationWrapper>

      <Footer />
    </>
  );
}

