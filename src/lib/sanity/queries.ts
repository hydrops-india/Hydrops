import { cloudinaryImageFragment, buttonFragment, headingBlockFragment } from './fragments';

export const HOME_PAGE_QUERY = `{
  "hero": *[_type == "homeHero"][0] {
    eyebrow,
    headline,
    description,
    videoUrl,
    posterUrl,
    primaryCta { ${buttonFragment} },
    secondaryCta { ${buttonFragment} }
  },
  "soulStatement": *[_type == "homeSoulStatement"][0] {
    label,
    headline,
    accentHeadline,
    background { ${cloudinaryImageFragment} }
  },
  "philosophy": *[_type == "homePhilosophy"][0] {
    persistentPhrase,
    chapters[] {
      lines,
      accentLine
    },
    cta { ${buttonFragment} }
  },
  "journey": *[_type == "homeJourney"][0] {
    ambientImage { ${cloudinaryImageFragment} },
    stages[] {
      chapter,
      title,
      description,
      mood,
      image { ${cloudinaryImageFragment} }
    }
  },
  "productShowcase": *[_type == "homeProductShowcase"][0] {
    label,
    headline,
    description,
    productImage { ${cloudinaryImageFragment} },
    floatingAsset { ${cloudinaryImageFragment} },
    primaryCta { ${buttonFragment} },
    secondaryCta { ${buttonFragment} },
    productReference
  },
  "purityStatement": *[_type == "homePurityStatement"][0] {
    label,
    statements[] {
      line,
      delay,
      accent
    },
    supportingText
  },
  "craftsmanship": *[_type == "homeCraftsmanship"][0] {
    heading { ${headingBlockFragment} },
    steps[] {
      step,
      title,
      headline,
      description,
      image { ${cloudinaryImageFragment} }
    }
  },
  "everyday": *[_type == "homeEveryday"][0] {
    heading { ${headingBlockFragment} },
    headlineAccent,
    moments[] {
      id,
      label,
      headline,
      description,
      image { ${cloudinaryImageFragment} },
      accent
    }
  },
  "contactCta": *[_type == "homeContactCta"][0] {
    label,
    headline,
    accentHeadline,
    description,
    primaryCta { ${buttonFragment} },
    secondaryCta { ${buttonFragment} },
    tagline,
    backgroundImage { ${cloudinaryImageFragment} }
  }
}`;

export const ABOUT_PAGE_QUERY = `{
  "hero": *[_type == "aboutHero"][0] {
    eyebrow,
    headline,
    subheadline,
    tagline
  },
  "introduction": *[_type == "aboutIntroduction"][0] {
    eyebrow,
    headline,
    body,
    stat
  },
  "story": *[_type == "aboutStory"][0] {
    eyebrow,
    headline,
    image { ${cloudinaryImageFragment} },
    imageCaption,
    chapters[] { year, heading, body }
  },
  "mission": *[_type == "aboutMission"][0] {
    eyebrow,
    headline,
    body
  },
  "vision": *[_type == "aboutVision"][0] {
    eyebrow,
    headline,
    body
  },
  "coreValues": *[_type == "aboutValues"][0] {
    eyebrow,
    headline,
    items[] { number, title, body }
  },
  "manufacturing": *[_type == "aboutManufacturing"][0] {
    eyebrow,
    headline,
    subheadline,
    stages[] {
      step,
      title,
      "body": body,
      image { ${cloudinaryImageFragment} }
    }
  },
  "quality": *[_type == "aboutCommitment"][0] {
    eyebrow,
    headline,
    body,
    pillars[] { label, headline, body },
    seal
  },
  "whyChoose": *[_type == "aboutWhyHydrops"][0] {
    eyebrow,
    headline,
    items[] { number, title, body }
  },
  "companyInfo": *[_type == "aboutCompanyInfo"][0] {
    eyebrow,
    heading,
    description,
    companyName,
    legalName,
    founded,
    origin,
    email,
    phone,
    address,
    coordinates,
    mapUrl,
    businessHours,
    certifications,
    primaryCta { ${buttonFragment} },
    secondaryCta { ${buttonFragment} }
  }
}`;

export const CONTACT_PAGE_QUERY = `*[_type == "contactPage" && _id == "contact-page"][0] {
  eyebrow,
  heading,
  highlightedWord,
  description,
  backgroundImage { ${cloudinaryImageFragment} },
  phoneTitle,
  phoneNumbers,
  whatsappTitle,
  whatsappButtonText,
  whatsappNumber,
  locationTitle,
  locationAddress,
  googleMapsUrl,
  hoursTitle,
  workingHours,
  formSectionTitle,
  formHeading,
  formDescription,
  submitButtonText,
  successMessage,
  errorMessage,
  fullNameLabel,
  fullNamePlaceholder,
  emailLabel,
  emailPlaceholder,
  phoneLabel,
  phonePlaceholder,
  subjectLabel,
  subjectPlaceholder,
  messageLabel,
  messagePlaceholder,
  mapEmbedUrl,
  ctaTitle,
  ctaDescription,
  ctaButtons[] {
    type,
    label,
    url
  }
}`;

export const GLOBAL_WHATSAPP_QUERY = `coalesce(
  *[_type == "contact"][0].contactInfo.whatsapp,
  *[_type == "contactPage"][0].whatsappNumber
)`;


