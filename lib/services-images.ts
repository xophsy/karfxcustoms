// ─────────────────────────────────────────────────────────────────────────────
// KAR FX Customs — Service Image Mapping
//
// HOW TO SWAP IMAGES:
// 1. Drop your new photo into the correct folder under /public/images/services/
// 2. Name it exactly as shown below (hero.jpg, gallery-01.jpg, etc.)
// 3. The site updates automatically — no code changes needed.
//
// FOLDER STRUCTURE:
// /public/images/services/{category-slug}/{service-slug}/
//   hero.jpg          ← main hero/banner image
//   gallery-01.jpg    ← first gallery image
//   gallery-02.jpg    ← second gallery image
//   gallery-03.jpg    ← third gallery image (add more as needed)
//   detail-01.jpg     ← close-up / detail shot
//   before-after-01.jpg ← before/after where applicable
//
// EXISTING REAL IMAGES (already in project):
// All catalog images live at:  /images/services/catalog/{name}.jpg
// All gallery images live at:  /images/gallery/all/{name}.jpg
// ─────────────────────────────────────────────────────────────────────────────

export type GalleryImage = {
  src: string;
  alt: string;
  isBeforeAfter?: boolean;
  isDetail?: boolean;
};

export type ServiceImageSet = {
  hero: string;
  heroAlt: string;
  categoryImage?: string;    // used on category cards — defaults to hero
  gallery: GalleryImage[];
};

// Shorthand helpers — keeps the data readable
const CATALOG = (name: string) => `/images/services/catalog/${name}`;
const GALLERY = (name: string) => `/images/gallery/all/${name}`;
const SVC = (cat: string, svc: string, file: string) =>
  `/images/services/${cat}/${svc}/${file}`;

// ─────────────────────────────────────────────────────────────────────────────
// IMAGE SETS — keyed by "{categorySlug}/{serviceSlug}"
// ─────────────────────────────────────────────────────────────────────────────

export const SERVICE_IMAGES: Record<string, ServiceImageSet> = {

  // ── PROTECTION ─────────────────────────────────────────────────────────────

  "protection/ppf": {
    hero: GALLERY("IMG_0073.jpg"),
    heroAlt: "Paint protection film installation on vehicle hood — Raleigh NC",
    gallery: [
      {
        src: GALLERY("maserati-ppf.jpg"),
        alt: "PPF applied to Maserati — front bumper and hood coverage",
      },
      {
        src: GALLERY("ppf.jpg"),
        alt: "BMW with full front-end PPF — hood, fenders, and mirrors protected",
      },
      {
        src: GALLERY("ppf.jpg"),
        alt: "PPF on hood edge — film line and edge seal close-up",
      },
      {
        src: GALLERY("ppf.jpg"),
        alt: "Front bumper PPF on primary impact zone — edge detail close-up",
        isDetail: true,
      },
    ],
  },

  "protection/window-tint": {
    hero: CATALOG("tint.jpg"),
    heroAlt: "Professional window tint installation — Raleigh NC",
    gallery: [
      {
        src: GALLERY("tint.jpg"),
        alt: "F-350 with professional window tint — side profile in daylight",
      },
      {
        src: GALLERY("tint.jpg"),
        alt: "Interior view through tinted windows — reduced glare in daylight",
      },
      {
        src: GALLERY("tint.jpg"),
        alt: "Rear window tint close-up — clean edge and even coverage",
      },
    ],
  },

  "protection/headlight-tint": {
    hero: GALLERY("headlight-tint.jpg"),
    heroAlt: "Headlight and taillight tint — smoked lens finish",
    gallery: [
      {
        src: GALLERY("chrome-delete.jpg"),
        alt: "Smoked headlight close-up — side angle showing tint depth",
      },
      {
        src: GALLERY("tint.jpg"),
        alt: "Tinted taillights on dark vehicle — rear 3/4 view",
      },
      {
        src: GALLERY("tint.jpg"),
        alt: "Before and after: stock vs smoked headlight comparison",
        isBeforeAfter: true,
      },
    ],
  },

  // ── WRAPS & STYLING ────────────────────────────────────────────────────────

  "wraps-styling/color-change-wrap": {
    hero: CATALOG("color-change-v2.jpg"),
    heroAlt: "Full vehicle color change wrap — premium vinyl finish",
    gallery: [
      {
        src: GALLERY("wraps.jpg"),
        alt: "Supra with custom ombre color-change wrap — full vehicle view",
      },
      {
        src: GALLERY("wraps.jpg"),
        alt: "Vehicle with full color-change wrap — side profile",
      },
      {
        src: GALLERY("color-change.jpg"),
        alt: "Color change wrap — full vehicle 3/4 front view",
      },
    ],
  },

  "wraps-styling/chrome-delete": {
    hero: CATALOG("chrome-delete-v2.jpg"),
    heroAlt: "Chrome delete — blacked-out trim and exterior accents",
    gallery: [
      {
        src: GALLERY("chrome-delete.jpg"),
        alt: "Chrome deleted trim — close-up of blacked-out exterior accents",
      },
      {
        src: GALLERY("chrome-delete.jpg"),
        alt: "Chrome deleted window trim — clean side profile view",
      },
      {
        src: GALLERY("color-change.jpg"),
        alt: "Blacked-out grille surround and badge close-up",
        isDetail: true,
      },
    ],
  },

  "wraps-styling/commercial-wraps": {
    hero: CATALOG("commercial.jpg"),
    heroAlt: "Commercial vehicle wrap with business branding — full vehicle",
    gallery: [
      {
        src: GALLERY("tarifa-comercial.jpg"),
        alt: "Commercial wrapped vehicle — business branding on full side panel",
      },
      {
        src: GALLERY("commercial.jpg"),
        alt: "Commercial wrapped truck — full side panel with visible branding",
      },
      {
        src: GALLERY("tarifa-comercial.jpg"),
        alt: "Commercial wrap installation process in shop",
      },
    ],
  },

  "wraps-styling/signage": {
    hero: GALLERY("commercial.jpg"),
    heroAlt: "Professional business signage — clean and branded",
    gallery: [
      {
        src: GALLERY("tarifa-comercial.jpg"),
        alt: "Cut vinyl lettering applied to glass window — storefront",
      },
      {
        src: GALLERY("commercial.jpg"),
        alt: "Branded panel signage in outdoor environment",
      },
      {
        src: GALLERY("wraps.jpg"),
        alt: "Vehicle door graphics and partial logo wrap",
      },
    ],
  },

  // ── WHEELS, CALIPERS & LIGHTING ────────────────────────────────────────────

  "wheels-calipers-lighting/wheel-painting": {
    hero: CATALOG("wheels.jpg"),
    heroAlt: "Custom painted wheels — professional automotive finish",
    gallery: [
      {
        src: GALLERY("wheels.jpg"),
        alt: "Painted wheels — custom finish on vehicle in shop",
      },
      {
        src: GALLERY("wheels.jpg"),
        alt: "Custom painted wheel close-up — gloss or matte finish",
        isDetail: true,
      },
      {
        src: GALLERY("wheels.jpg"),
        alt: "Before and after wheel paint — close-up comparison",
        isBeforeAfter: true,
      },
    ],
  },

  "wheels-calipers-lighting/caliper-painting": {
    hero: GALLERY("wheels.jpg"),
    heroAlt: "Painted brake calipers — bold color visible through wheel spokes",
    gallery: [
      {
        src: GALLERY("wheels.jpg"),
        alt: "Painted caliper color close-up with wheel background",
        isDetail: true,
      },
      {
        src: GALLERY("IMG_7774.jpg"),
        alt: "Painted caliper on dark wheel — parked vehicle",
      },
      {
        src: GALLERY("IMG_7790.jpg"),
        alt: "Caliper painting process in shop — prep and application",
      },
    ],
  },

  "wheels-calipers-lighting/reflective-calipers": {
    hero: GALLERY("reflective-calipers.avif"),
    heroAlt: "Reflective caliper finish — metallic coating catching light through spokes",
    gallery: [
      {
        src: GALLERY("IMG_7772.jpg"),
        alt: "Reflective caliper detail — full wheel view showing finish effect",
        isDetail: true,
      },
      {
        src: GALLERY("IMG_7774.jpg"),
        alt: "Reflective caliper lit from side at night — high-impact finish",
      },
    ],
  },

  "wheels-calipers-lighting/starlight-headliner": {
    hero: CATALOG("starlight.jpg"),
    heroAlt: "Starlight headliner — luxury fiber optic star ceiling inside vehicle cabin",
    gallery: [
      {
        src: GALLERY("starlight.jpg"),
        alt: "Starlight headliner wide interior shot — full star ceiling visible",
      },
      {
        src: GALLERY("starlight.jpg"),
        alt: "Starlight headliner close-up — individual fiber strands glowing",
        isDetail: true,
      },
    ],
  },

  "wheels-calipers-lighting/ambient-lighting": {
    hero: CATALOG("ambient-lighting.jpg"),
    heroAlt: "Ambient interior lighting — customizable LED throughout vehicle cabin",
    gallery: [
      {
        src: GALLERY("ambient-lighting.jpg"),
        alt: "Ambient interior lighting — footwells and door panels glowing",
      },
      {
        src: GALLERY("ambient-lighting.jpg"),
        alt: "Mercedes Maybach ambient lighting — premium cabin atmosphere",
      },
    ],
  },

  // ── DETAILING ──────────────────────────────────────────────────────────────

  "detailing/interior-exterior": {
    hero: GALLERY("detail-shot-1.jpg"),
    heroAlt: "Professional vehicle detailing — exterior paint gloss restored",
    gallery: [
      {
        src: GALLERY("detail-shot-2.jpg"),
        alt: "Detailing — paint surface close-up showing restored gloss",
        isDetail: true,
      },
      {
        src: GALLERY("paint-correction.jpg"),
        alt: "Paint correction and polish — removing swirl marks from paint surface",
      },
      {
        src: GALLERY("bmw-ceramic.jpg"),
        alt: "BMW after full detail and ceramic treatment — exterior finish",
      },
      {
        src: GALLERY("detail-shot-1.jpg"),
        alt: "Interior deep clean — seats, dashboard, and floors restored",
      },
      {
        src: GALLERY("paint-correction.jpg"),
        alt: "Before and after full detail — exterior transformation",
        isBeforeAfter: true,
      },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORY CARD IMAGES — used on the /services hub grid
// ─────────────────────────────────────────────────────────────────────────────

export const CATEGORY_IMAGES: Record<string, { src: string; alt: string }> = {
  protection: {
    src: CATALOG("protection.jpg"),
    alt: "Paint protection film — KAR FX protection services",
  },
  "wraps-styling": {
    src: CATALOG("wraps-styling-v3.jpg"),
    alt: "Color change wrap — KAR FX wraps and styling services",
  },
  "wheels-calipers-lighting": {
    src: CATALOG("wheels.jpg"),
    alt: "Painted wheels and calipers — KAR FX wheel and lighting services",
  },
  detailing: {
    src: GALLERY("detail-shot-1.jpg"),
    alt: "Professional vehicle detailing — KAR FX detailing services",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// RESTORFX PARTNER IMAGE
// ─────────────────────────────────────────────────────────────────────────────

export const RESTORFX_IMAGE = {
  src: CATALOG("restorfx.jpg"),
  alt: "RestorFX — trusted partner for paint clearcoat restoration",
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPER — get images for a service page
// ─────────────────────────────────────────────────────────────────────────────

export function getServiceImages(
  categorySlug: string,
  serviceSlug: string
): ServiceImageSet | undefined {
  return SERVICE_IMAGES[`${categorySlug}/${serviceSlug}`];
}

