/**
 * Helper to generate a valid Google Maps embed URL from Contact Page CMS fields.
 * 1. If customEmbedUrl (mapEmbedUrl) exists, use it directly.
 * 2. Otherwise, if locationAddress exists, generate a standard embed URL from locationAddress.
 * 3. If neither exists, return null (never fallback to obsolete hardcoded locations).
 */
export function getMapEmbedUrl(locationAddress?: string, customEmbedUrl?: string): string | null {
  if (customEmbedUrl && customEmbedUrl.trim().length > 0) {
    return customEmbedUrl.trim();
  }

  if (locationAddress && locationAddress.trim().length > 0) {
    return `https://maps.google.com/maps?q=${encodeURIComponent(locationAddress.trim())}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
  }

  return null;
}

