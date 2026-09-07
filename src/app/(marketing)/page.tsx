import type { Metadata } from 'next';
import { Hero } from '@/features/hero';
import { SoulStatement } from '@/features/home/components/SoulStatement';
import { Philosophy } from '@/features/home/components/Philosophy';
import { CoconutJourney } from '@/features/home/components/CoconutJourney';
import { ProductShowcase } from '@/features/home/components/ProductShowcase';
import { PurityStatement } from '@/features/home/components/PurityStatement';
import { Craftsmanship } from '@/features/home/components/Craftsmanship';
import { Everyday } from '@/features/home/components/Everyday';
import { ContactCTA } from '@/features/home/components/ContactCTA';
import { Navbar } from '@/components/layout/Navbar';
import { navigationData } from '@/data/site/navigation';
import { Footer } from '@/components/layout/Footer';
import { getHomePage, getContactPage } from '@/lib/sanity/fetch';
import { HomeAnimationWrapper } from './HomeClient';
import { siteSeo } from '@/data/site/seo';

export const metadata: Metadata = {
  title: siteSeo.title,
  description: siteSeo.description,
  alternates: {
    canonical: 'https://hydropsindia.com',
  },
  openGraph: {
    title: siteSeo.title,
    description: siteSeo.description,
    url: 'https://hydropsindia.com',
    type: 'website',
    images: [
      {
        url: 'https://hydropsindia.com/images/brand/logo.png',
        width: 1200,
        height: 630,
        alt: siteSeo.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteSeo.title,
    description: siteSeo.description,
    images: ['https://hydropsindia.com/images/brand/logo.png'],
  },
};


export default async function HomePage() {
  const [homePageData, contactPageData] = await Promise.all([
    getHomePage(),
    getContactPage(),
  ]);

  return (
    <>
      <Navbar data={navigationData} />
      <HomeAnimationWrapper>
        {/* SVG clipPath definition for organic curved reveal (normalized objectBoundingBox coordinates) */}
        <svg width="0" height="0" className="absolute top-0 left-0 w-0 h-0 pointer-events-none" aria-hidden="true">
          <defs>
            <clipPath id="hero-curved-clip-path" clipPathUnits="objectBoundingBox">
              <path
                id="hero-clip-path-shape"
                d="M 0,0 L 1,0 L 1,1 C 0.85,1 0.65,1 0.5,1 C 0.35,1 0.15,1 0,1 Z"
              />
            </clipPath>
          </defs>
        </svg>

        {/* 01 & 02 · Organic Curved Reveal Sequence: Video Hero → Soul Statement */}
        <div id="hero-soul-wrapper" className="relative w-full">
          <div id="hero-soul-pinned-container" className="relative w-full h-screen overflow-hidden">
            {/* Soul Statement (Background Stationary Layer - z-10) */}
            <div className="absolute inset-0 w-full h-full z-10 pointer-events-auto">
              <SoulStatement />
            </div>

            {/* Video Hero (Foreground Layer with SVG Curved Clip-Path & Ambient Depth Drop Shadow - z-20) */}
            <div
              id="hero-clipped-layer"
              className="absolute inset-0 w-full h-full z-20 pointer-events-auto will-change-[clip-path,filter]"
              style={{
                clipPath: 'url(#hero-curved-clip-path)',
                WebkitClipPath: 'url(#hero-curved-clip-path)',
                filter: 'drop-shadow(0px -20px 40px rgba(0, 0, 0, 0.75))',
                WebkitFilter: 'drop-shadow(0px -20px 40px rgba(0, 0, 0, 0.75))',
              }}
            >
              <Hero data={homePageData.hero} />
            </div>
          </div>
        </div>

        {/* 03 · Philosophy — Every drop begins with purity */}
        <Philosophy />

        {/* 04 · Origin — The human story behind every bottle */}
        <CoconutJourney data={homePageData.journey} />

        {/* 05 · Product — The bottle as hero */}
        <ProductShowcase data={homePageData.productShowcase} />

        {/* 06 · Purity Statement — The dark contrast beat */}
        <PurityStatement data={homePageData.purityStatement} />

        {/* 07 · Craftsmanship — Documentary process story */}
        <Craftsmanship data={homePageData.craftsmanship} />

        {/* 08 · Everyday — Life with Hydrops */}
        <Everyday data={homePageData.everyday} />

        {/* 09 · Closing — The brand arrives */}
        <ContactCTA data={homePageData.contactCta} contactPageData={contactPageData} />
      </HomeAnimationWrapper>
      <Footer />
    </>
  );
}

