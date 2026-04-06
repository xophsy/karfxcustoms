// ─────────────────────────────────────────────────────────────────────────────
// KAR FX Customs — Services Data
// Single source of truth for all service categories, sub-services, and content.
// All pages are driven from this file. To add or update a service, edit here.
// ─────────────────────────────────────────────────────────────────────────────

export type ServiceItem = {
  slug: string;
  name: string;
  tagline: string;          // benefit-driven one-liner used on cards
  description: string[];    // paragraphs for "What is it?" section
  benefits: string[];       // 3–4 bullet points
  steps: { title: string; desc: string }[]; // 3-step process
  faq: { q: string; a: string }[];          // 2–4 accordion items
  relatedSlugs: string[];   // cross-links to other services (slug only)
  isB2B?: boolean;          // marks B2B services for optional badge
  cardGradient: string;     // CSS gradient — used until real photos added
  heroGradient: string;     // fuller gradient for service page hero
};

export type ServiceCategory = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  gradient: string;         // category card/hero gradient
  services: ServiceItem[];
};

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORIES + SERVICES
// ─────────────────────────────────────────────────────────────────────────────

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  // ── 1. PROTECTION ──────────────────────────────────────────────────────────
  {
    slug: "protection",
    name: "Protection",
    tagline: "Preserve your investment. Keep your vehicle looking its best.",
    description:
      "Our protection services are designed to shield your vehicle from daily damage — rock chips, UV fading, road grime, and harsh elements — while maintaining the look you paid for.",
    gradient:
      "linear-gradient(135deg, #0d1b2a 0%, #1b2838 50%, #0a1520 100%)",
    services: [
      {
        slug: "ppf",
        name: "Paint Protection Film",
        tagline:
          "Keep your paint looking newer longer by protecting it from rock chips, scratches, and road damage.",
        description: [
          "Paint Protection Film (PPF) is a virtually invisible urethane film applied directly to your vehicle's painted surfaces. It acts as a physical barrier between your paint and the road — absorbing impacts from rock chips, gravel, bug splatter, and minor abrasions before they ever reach your finish.",
          "At KAR FX Customs, we install PPF with precision fitment on full vehicles, partial coverage (hood, fenders, mirrors, rocker panels), or any custom zone you need protected. Premium film options include self-healing technology that removes light scratches with heat from the sun or warm water.",
        ],
        benefits: [
          "Protects against rock chips, road debris, and minor scratches",
          "Self-healing surface on select film options",
          "Virtually invisible — maintains factory gloss and color",
          "Preserves resale value over the life of the vehicle",
        ],
        steps: [
          {
            title: "Consultation",
            desc: "We assess your vehicle and discuss coverage zones, film options, and pricing.",
          },
          {
            title: "Paint Prep & Install",
            desc: "Paint is cleaned and decontaminated, then film is precision-cut and applied.",
          },
          {
            title: "Final Inspection",
            desc: "We review every edge and seam with you before you drive away protected.",
          },
        ],
        faq: [
          {
            q: "How long does PPF last?",
            a: "Quality PPF typically lasts 5–10 years depending on the film grade, care, and exposure. We'll walk you through the right option for your use case.",
          },
          {
            q: "Is PPF visible on the vehicle?",
            a: "When installed correctly, PPF is nearly invisible. It preserves the original color and gloss of your paint without changing the look.",
          },
          {
            q: "Can PPF be removed later?",
            a: "Yes. PPF can be safely removed by a professional without damaging the underlying paint, especially when the paint was in good condition at install.",
          },
          {
            q: "Do I need to prep my paint first?",
            a: "If your paint has swirl marks or light scratches, we recommend paint correction before PPF so the film locks in a perfect finish. We can advise at consultation.",
          },
        ],
        relatedSlugs: ["window-tint", "headlight-tint", "interior-exterior"],
        cardGradient:
          "linear-gradient(135deg, #0d1b2a 0%, #16334d 60%, #0a2040 100%)",
        heroGradient:
          "linear-gradient(160deg, #050e18 0%, #0d2033 40%, #0a1a2e 100%)",
      },
      {
        slug: "window-tint",
        name: "Window Tint",
        tagline:
          "Stay cooler, reduce glare, and give your vehicle a cleaner, more private look.",
        description: [
          "Window tinting reduces solar heat, cuts glare, and adds a layer of privacy — all while giving your vehicle a sharper, more refined appearance. The right tint film also blocks UV rays that fade interiors and cause skin damage over time.",
          "KAR FX Customs installs professional-grade window film with precision edge-to-edge fitment. We offer a range of tint levels from subtle to dark, including ceramic options for maximum heat rejection without signal interference.",
        ],
        benefits: [
          "Blocks UV rays that damage skin and fade interiors",
          "Reduces cabin heat significantly in direct sun",
          "Cuts glare for safer, more comfortable driving",
          "Adds privacy and improves the exterior appearance",
        ],
        steps: [
          {
            title: "Film Selection",
            desc: "We help you choose the right shade and film grade based on your goals and local tint laws.",
          },
          {
            title: "Professional Install",
            desc: "Glass is cleaned thoroughly, film is cut precisely and applied bubble-free.",
          },
          {
            title: "Cure & Review",
            desc: "Film is inspected edge-to-edge before delivery. Cure time is typically 2–5 days.",
          },
        ],
        faq: [
          {
            q: "What tint level is legal in NC?",
            a: "In North Carolina, front side windows must allow at least 35% light transmission. We'll guide you on compliant options during consultation.",
          },
          {
            q: "Will tint interfere with my phone or GPS signal?",
            a: "Standard metallic films can affect signal. Our ceramic film options provide the same heat rejection without any signal interference.",
          },
          {
            q: "How long does window tint last?",
            a: "Quality film installed properly can last 10+ years. Cheap film fades and bubbles much sooner — we only install professional-grade products.",
          },
        ],
        relatedSlugs: ["ppf", "headlight-tint", "interior-exterior"],
        cardGradient:
          "linear-gradient(135deg, #111118 0%, #1c1c2e 60%, #14141e 100%)",
        heroGradient:
          "linear-gradient(160deg, #080810 0%, #151525 40%, #0e0e1e 100%)",
      },
      {
        slug: "headlight-tint",
        name: "Headlight / Taillight Tint",
        tagline:
          "Sharpen your vehicle's look with tinted lighting that adds style and a more customized finish.",
        description: [
          "Headlight and taillight tinting is one of the most effective visual upgrades you can make to the exterior of your vehicle. A precision-applied tint film transforms the look of your lighting — adding an aggressive, blacked-out character or a smoky, refined style depending on the shade you choose.",
          "We use professional automotive-grade film designed specifically for lenses, ensuring a clean edge, proper adhesion, and a finish that holds up over time without peeling or yellowing.",
        ],
        benefits: [
          "Instantly changes the visual character of your exterior",
          "Film-based — fully reversible if you want to restore stock look",
          "Clean, sharp edges with no overspray or residue",
          "Available in multiple tint levels for subtle or bold results",
        ],
        steps: [
          {
            title: "Shade Selection",
            desc: "Choose your tint intensity — from a subtle smoke to a dark blacked-out look.",
          },
          {
            title: "Lens Prep & Film Apply",
            desc: "Lenses are cleaned and decontaminated, then film is precisely cut and applied.",
          },
          {
            title: "Edge Seal & Inspection",
            desc: "Every edge is sealed and inspected to ensure a factory-clean result.",
          },
        ],
        faq: [
          {
            q: "Is headlight tinting legal?",
            a: "Regulations vary by state. A light smoke is generally accepted; very dark tints on headlights may not meet safety standards. We can advise based on your local rules.",
          },
          {
            q: "Will tinted film reduce headlight output at night?",
            a: "Darker tints can reduce visible light output. We recommend lighter smoke shades for daily-driven vehicles and save dark tints for show or track use.",
          },
          {
            q: "Can it be removed?",
            a: "Yes — film-based tinting is fully reversible. It can be removed cleanly without damaging the lens.",
          },
        ],
        relatedSlugs: ["ppf", "window-tint", "wheel-painting"],
        cardGradient:
          "linear-gradient(135deg, #1a1008 0%, #2e1e0a 60%, #1e1408 100%)",
        heroGradient:
          "linear-gradient(160deg, #100c04 0%, #221604 40%, #1a1006 100%)",
      },
    ],
  },

  // ── 2. WRAPS & STYLING ─────────────────────────────────────────────────────
  {
    slug: "wraps-styling",
    name: "Wraps & Styling",
    tagline: "Change the look. Express the character.",
    description:
      "From full color change wraps to chrome deletes and commercial fleet branding, our wraps and styling services let you transform your vehicle — or your brand — with professional vinyl work built to last.",
    gradient:
      "linear-gradient(135deg, #0a0e1a 0%, #141c30 50%, #0c1020 100%)",
    services: [
      {
        slug: "color-change-wrap",
        name: "Color Change Wrap",
        tagline:
          "Transform your vehicle's entire look with a fresh color and finish without committing to new paint.",
        description: [
          "A full color change wrap replaces the visual appearance of your factory paint with a new color, finish, or texture — without permanently altering the vehicle. Satin black, matte midnight blue, brushed bronze, gloss white, color-shift chameleon — the options are far wider than traditional paint.",
          "KAR FX Customs installs full-vehicle wraps with precise panel-by-panel fitment. Vinyl protects the original paint underneath, and the wrap can be removed cleanly when you're ready for a new look or want to restore stock appearance for resale.",
        ],
        benefits: [
          "Completely transforms the exterior without permanent paint changes",
          "Protects original paint underneath while wrapped",
          "Far more color and finish options than traditional paint",
          "Removable and replaceable — change the look again later",
        ],
        steps: [
          {
            title: "Color & Finish Consult",
            desc: "We help you select the right color, finish, and material for your goals.",
          },
          {
            title: "Vehicle Prep & Wrap",
            desc: "Paint is cleaned and decontaminated; vinyl is applied panel-by-panel with precision.",
          },
          {
            title: "Trim & Final Inspection",
            desc: "All edges, seams, and panel gaps are trimmed and inspected before pickup.",
          },
        ],
        faq: [
          {
            q: "How long does a wrap last?",
            a: "A professionally installed wrap typically lasts 5–7 years with proper care. Exposure, washing habits, and parking conditions all affect longevity.",
          },
          {
            q: "Can I wash my wrapped vehicle normally?",
            a: "Hand washing is recommended. Avoid high-pressure washes, automatic car washes with brushes, and harsh chemical cleaners. We'll give you a care guide at pickup.",
          },
          {
            q: "Will a wrap damage my paint?",
            a: "No — quality vinyl applied to paint in good condition won't damage it. In fact, it protects it from UV, minor abrasions, and surface dirt.",
          },
          {
            q: "Can partial wraps be done?",
            a: "Yes. Hood only, roof, mirrors, lower bumper — we can wrap any portion of the vehicle for a customized accent look.",
          },
        ],
        relatedSlugs: ["chrome-delete", "ppf", "wheel-painting"],
        cardGradient:
          "linear-gradient(135deg, #0a0e1a 0%, #1a2040 60%, #10162e 100%)",
        heroGradient:
          "linear-gradient(160deg, #060810 0%, #101828 40%, #0c1220 100%)",
      },
      {
        slug: "chrome-delete",
        name: "Chrome Delete",
        tagline:
          "Create a cleaner, more aggressive look by blacking out bright trim and exterior accents.",
        description: [
          "Chrome delete transforms the bright, reflective trim elements on your vehicle — grille surrounds, window trim, door handles, side mirrors, and badging — into a blacked-out or color-matched finish. The result is a cleaner, more intentional exterior that looks custom without being loud.",
          "We use precision-cut vinyl to achieve crisp, clean coverage over chrome surfaces. It's a high-impact visual change with zero permanent modification to the vehicle — and can be reversed cleanly if needed.",
        ],
        benefits: [
          "Eliminates bright chrome for a cleaner, more modern look",
          "No permanent modification — vinyl is removable",
          "Can be done in matte, gloss, or satin black for different effects",
          "Dramatically changes the exterior character of the vehicle",
        ],
        steps: [
          {
            title: "Surface Assessment",
            desc: "We map the chrome areas to be covered and confirm the finish you want.",
          },
          {
            title: "Precision Vinyl Application",
            desc: "Each chrome surface is wrapped individually with clean edges and full coverage.",
          },
          {
            title: "Final Detail & Review",
            desc: "Every piece is inspected for edge seal, alignment, and finish quality.",
          },
        ],
        faq: [
          {
            q: "Can all chrome be deleted?",
            a: "Most exterior chrome trim can be wrapped. Some deeply recessed or irregular shapes may have limits — we assess this at consultation.",
          },
          {
            q: "What finishes are available?",
            a: "Matte black is the most popular, but we also do gloss black, satin black, and color-matched finishes to suit your vehicle's overall look.",
          },
          {
            q: "Is chrome delete reversible?",
            a: "Yes. Vinyl wrapping chrome is fully reversible — the film can be removed without damaging the underlying chrome.",
          },
        ],
        relatedSlugs: ["color-change-wrap", "headlight-tint", "wheel-painting"],
        cardGradient:
          "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 60%, #111111 100%)",
        heroGradient:
          "linear-gradient(160deg, #060606 0%, #141414 40%, #0c0c0c 100%)",
      },
      {
        slug: "commercial-wraps",
        name: "Commercial Wraps",
        tagline:
          "Turn your vehicle into a moving advertisement that helps your business get seen everywhere it goes.",
        description: [
          "A commercial vehicle wrap turns your truck, van, SUV, or car into a branded asset that generates impressions every time it's on the road. Unlike static advertising, a wrapped vehicle works for your business 24 hours a day — in parking lots, on the highway, and in every neighborhood you drive through.",
          "KAR FX Customs works with local and regional businesses to design, produce, and install commercial wraps that are eye-catching, on-brand, and built to last. We handle everything from full-coverage fleet wraps to partial wraps and door graphics.",
        ],
        isB2B: true,
        benefits: [
          "Generates thousands of impressions daily at a fraction of ad spend",
          "Builds brand recognition consistently across your service area",
          "Protects vehicle paint underneath while branded",
          "Professional design and installation that reflects your brand quality",
        ],
        steps: [
          {
            title: "Brand & Design Brief",
            desc: "We gather your brand assets and discuss the coverage, message, and visual goals.",
          },
          {
            title: "Design & Approval",
            desc: "We produce a vehicle-specific design for your review and approval before print.",
          },
          {
            title: "Print, Laminate & Install",
            desc: "Wrap is printed on commercial-grade film, laminated, and installed with precision.",
          },
        ],
        faq: [
          {
            q: "Do you handle the design or do I need to supply artwork?",
            a: "We can work from your existing brand assets or help develop the vehicle design layout. Final design is reviewed and approved by you before installation.",
          },
          {
            q: "How many vehicles can you wrap at once?",
            a: "We handle single vehicles through full fleets. Contact us to discuss scheduling for multi-vehicle projects.",
          },
          {
            q: "How long will a commercial wrap last?",
            a: "Quality commercial wraps typically last 4–6 years depending on vehicle use, exposure, and care.",
          },
        ],
        relatedSlugs: ["signage", "color-change-wrap"],
        cardGradient:
          "linear-gradient(135deg, #081814 0%, #142820 60%, #0a1e18 100%)",
        heroGradient:
          "linear-gradient(160deg, #040e0a 0%, #0e2018 40%, #081a12 100%)",
      },
      {
        slug: "signage",
        name: "Signage",
        tagline:
          "Make your business easier to notice with clean, professional signage built to stand out.",
        description: [
          "From storefront lettering to site signage and branded displays, professional signage helps your business create a strong first impression and stay visible to passing customers. Poor or aging signage undercuts an otherwise strong brand — sharp signage reinforces it.",
          "KAR FX Customs produces custom signage for businesses in the Raleigh area, including cut vinyl lettering, printed panels, window graphics, and branded displays. Every piece is built to be clearly legible, visually clean, and durable against outdoor conditions.",
        ],
        isB2B: true,
        benefits: [
          "Creates a strong, professional first impression for customers",
          "Built for outdoor durability in all weather conditions",
          "Custom-designed to match your brand visuals",
          "Increases visibility and walk-in discovery for local businesses",
        ],
        steps: [
          {
            title: "Brief & Scope",
            desc: "We discuss your signage needs, location, dimensions, and brand requirements.",
          },
          {
            title: "Design & Proof",
            desc: "We produce a design proof for your review before production begins.",
          },
          {
            title: "Production & Install",
            desc: "Signage is produced on professional materials and installed cleanly.",
          },
        ],
        faq: [
          {
            q: "What types of signage do you produce?",
            a: "Cut vinyl lettering, printed window graphics, panel signage, and branded vehicle graphics. Contact us to discuss your specific needs.",
          },
          {
            q: "How long does outdoor signage last?",
            a: "Material choice affects lifespan. Our standard outdoor materials are rated 5–7 years. We can discuss options based on your exposure and environment.",
          },
        ],
        relatedSlugs: ["commercial-wraps"],
        cardGradient:
          "linear-gradient(135deg, #081020 0%, #101c30 60%, #0c1828 100%)",
        heroGradient:
          "linear-gradient(160deg, #040a14 0%, #0c1828 40%, #081220 100%)",
      },
    ],
  },

  // ── 3. WHEELS, CALIPERS & LIGHTING ────────────────────────────────────────
  {
    slug: "wheels-calipers-lighting",
    name: "Wheels, Calipers & Lighting",
    tagline: "Details that define the difference.",
    description:
      "The finishing details that separate a well-built vehicle from a truly custom one. Painted wheels, bold caliper work, a starlight headliner, or ambient interior lighting — these are the upgrades that make people look twice.",
    gradient:
      "linear-gradient(135deg, #111111 0%, #1e1e1e 50%, #141414 100%)",
    services: [
      {
        slug: "wheel-painting",
        name: "Wheel Painting",
        tagline:
          "Refresh or customize your wheels with a finish that instantly upgrades your vehicle's overall look.",
        description: [
          "Your wheels are one of the most visible elements on your vehicle — and one of the fastest ways to elevate or drag down the entire exterior. Wheel painting gives you the ability to refresh faded or scuffed wheels back to like-new condition, or take them in a completely custom direction with a new color or finish.",
          "We prep, prime, and finish your wheels with durable automotive paint designed to hold up against brake dust, road debris, and cleaning products. Whether you want gloss black, gunmetal, bronze, or color-matched to your vehicle, we deliver a clean, lasting result.",
        ],
        benefits: [
          "Instantly refreshes or transforms the look of your wheels",
          "Durable automotive finish designed for wheel environments",
          "Color-match or contrast options available",
          "Far more cost-effective than replacing wheels entirely",
        ],
        steps: [
          {
            title: "Wheel Assessment",
            desc: "We inspect condition, discuss your color and finish goals, and confirm prep requirements.",
          },
          {
            title: "Strip, Prep & Paint",
            desc: "Wheels are stripped, sanded, primed, and finished in multiple coats.",
          },
          {
            title: "Clear Coat & Cure",
            desc: "A protective clear coat is applied and cured before remount.",
          },
        ],
        faq: [
          {
            q: "Do my wheels need to come off the vehicle?",
            a: "For the best result, yes. Wheels are painted off the car so every surface gets full, even coverage.",
          },
          {
            q: "How durable is painted wheel finish?",
            a: "With proper prep and quality materials, painted wheels hold up well to normal driving. Avoid harsh wheel cleaners and use pH-neutral soaps for washing.",
          },
          {
            q: "Can you paint over factory wheels?",
            a: "Yes. Factory wheels can be repainted with proper surface preparation. We assess the existing finish and advise the best prep process.",
          },
        ],
        relatedSlugs: [
          "caliper-painting",
          "reflective-calipers",
          "color-change-wrap",
        ],
        cardGradient:
          "linear-gradient(135deg, #111111 0%, #252525 60%, #1a1a1a 100%)",
        heroGradient:
          "linear-gradient(160deg, #080808 0%, #1c1c1c 40%, #121212 100%)",
      },
      {
        slug: "caliper-painting",
        name: "Caliper Painting",
        tagline:
          "Add a bold performance-inspired detail that makes your wheel setup stand out.",
        description: [
          "Painted brake calipers are one of the classic high-visibility details on a well-built vehicle. Visible through the spokes of your wheels, a sharply painted caliper in red, yellow, gold, or any custom color signals attention to detail and adds a genuine performance feel to the setup.",
          "We use high-temperature automotive paint formulated specifically for brake calipers — capable of handling the extreme heat cycles that brake components produce. The result is a finish that stays sharp and doesn't crack, peel, or fade under real driving conditions.",
        ],
        benefits: [
          "High-visibility upgrade visible through wheel spokes",
          "High-temp paint formulated for brake caliper heat cycles",
          "Available in any custom color — not just red",
          "Cleans up cleanly against painted or polished wheels",
        ],
        steps: [
          {
            title: "Color Selection",
            desc: "We discuss color options and how they'll interact with your wheel and vehicle finish.",
          },
          {
            title: "Caliper Prep & Paint",
            desc: "Calipers are cleaned, masked, and painted with high-temp caliper-specific coating.",
          },
          {
            title: "Cure & Reinstall",
            desc: "Paint cures before wheels are remounted and vehicle is returned.",
          },
        ],
        faq: [
          {
            q: "What colors are available?",
            a: "Any color — red, yellow, gold, blue, black, orange, or custom matched. We discuss what looks best with your wheel and vehicle at consultation.",
          },
          {
            q: "Will painted calipers hold up to heat?",
            a: "Yes — we use high-temperature caliper paint rated for the heat cycles brake components produce. It won't crack or peel under normal driving.",
          },
          {
            q: "Can you add a logo or text to calipers?",
            a: "Yes — stenciled branding or custom text is available as an add-on.",
          },
        ],
        relatedSlugs: [
          "wheel-painting",
          "reflective-calipers",
          "color-change-wrap",
        ],
        cardGradient:
          "linear-gradient(135deg, #1a0808 0%, #2e1010 60%, #1e0a0a 100%)",
        heroGradient:
          "linear-gradient(160deg, #100404 0%, #220a0a 40%, #180606 100%)",
      },
      {
        slug: "reflective-calipers",
        name: "Reflective Calipers",
        tagline:
          "Give your brakes a unique high-impact finish that grabs attention and adds custom character.",
        description: [
          "Reflective caliper finishing takes standard painted calipers to a different level. Using specialized reflective or metallic-effect coatings, the finish catches light and creates an eye-catching effect that sets your brake setup apart from anything stock.",
          "This is a distinctive, conversation-starting detail — especially effective at car shows, events, or simply at night under parking lot lighting. It pairs well with both blacked-out and polished wheel setups and can be executed in silver, chrome-effect, or multi-tone reflective finishes.",
        ],
        benefits: [
          "Unique reflective finish that stands out from standard painted calipers",
          "Eye-catching in low light and direct sun",
          "Pairs well with blacked-out or polished wheel setups",
          "High-temp coating formulated for brake caliper use",
        ],
        steps: [
          {
            title: "Finish Consultation",
            desc: "We discuss your reflective finish preference and how it pairs with your overall setup.",
          },
          {
            title: "Prep & Reflective Coat",
            desc: "Calipers are cleaned and prepped, then finished with the reflective coating process.",
          },
          {
            title: "Seal & Cure",
            desc: "A protective seal layer is applied over the reflective finish before reinstall.",
          },
        ],
        faq: [
          {
            q: "How is this different from standard caliper painting?",
            a: "Reflective calipers use specialized coatings that catch and return light differently than standard paint — creating a metallic or chrome-like visual effect.",
          },
          {
            q: "Will the reflective finish hold up to heat?",
            a: "Yes — the same high-temperature formulation used for standard caliper painting is the base layer, ensuring durability through normal brake cycles.",
          },
        ],
        relatedSlugs: [
          "caliper-painting",
          "wheel-painting",
          "ambient-lighting",
        ],
        cardGradient:
          "linear-gradient(135deg, #141418 0%, #22222c 60%, #1a1a24 100%)",
        heroGradient:
          "linear-gradient(160deg, #0c0c10 0%, #1c1c24 40%, #141420 100%)",
      },
      {
        slug: "starlight-headliner",
        name: "Starlight Headliner",
        tagline:
          "Bring a luxury-inspired star ceiling into your interior for a custom look that completely changes the cabin feel.",
        description: [
          "A starlight headliner replaces or overlays your vehicle's existing headliner with hundreds of individually placed fiber optic strands that create the appearance of a night sky inside your cabin. The effect is dramatic, immersive, and completely unique — transforming the feel of the interior without changing its structure.",
          "KAR FX Customs installs starlight headliners with custom density and color temperature options, from cool white star fields to warm amber tones and even shooting star effects with a controller. It's one of the most visually impactful interior upgrades available.",
        ],
        benefits: [
          "Creates a dramatic, luxury star ceiling effect in the cabin",
          "Adjustable brightness and optional shooting-star controller",
          "Custom fiber density for subtle or full-coverage looks",
          "Transforms the interior feel without structural modification",
        ],
        steps: [
          {
            title: "Design Consultation",
            desc: "We discuss fiber density, color temperature, and any special effects you want.",
          },
          {
            title: "Headliner Build & Install",
            desc: "Headliner is built with fiber strands threaded and secured, then installed in the vehicle.",
          },
          {
            title: "Wiring & Final Test",
            desc: "Electrical connections are made, the full effect is tested, and cabin is restored.",
          },
        ],
        faq: [
          {
            q: "Does it require removing my factory headliner?",
            a: "Yes — the factory headliner is removed, the fiber optic strands are installed into it (or a new headliner material), and it's reinstalled.",
          },
          {
            q: "How many stars are in a typical install?",
            a: "Density varies by preference and ceiling size. A typical install ranges from 200 to 800+ individual fiber strands. We discuss options at consultation.",
          },
          {
            q: "Can shooting star effects be added?",
            a: "Yes — a shooting star module can be added that randomly sends a sweep effect across the ceiling. It's one of the most popular add-ons.",
          },
          {
            q: "Is it dimmable?",
            a: "Yes. The light source is typically connected through a control module that allows brightness adjustment.",
          },
        ],
        relatedSlugs: [
          "ambient-lighting",
          "color-change-wrap",
          "interior-exterior",
        ],
        cardGradient:
          "linear-gradient(135deg, #04040e 0%, #08081e 60%, #050516 100%)",
        heroGradient:
          "linear-gradient(160deg, #020208 0%, #060618 40%, #040412 100%)",
      },
      {
        slug: "ambient-lighting",
        name: "Ambient Interior Lighting",
        tagline:
          "Upgrade your interior with customizable lighting that adds color, mood, and a more premium driving experience.",
        description: [
          "Ambient interior lighting adds programmable LED strips throughout the cabin — footwells, door panels, dashboard accents, under-seat glow, and more. The result is a more premium, immersive interior feel that can be tuned to match your mood, music, or driving preference.",
          "KAR FX Customs installs clean, professional ambient lighting systems with controller-based or app-based color selection. We route wiring invisibly and mount strips securely so the result looks factory-integrated — not afterthought.",
        ],
        benefits: [
          "Adds color, depth, and a premium feel to the interior",
          "Fully customizable color and brightness via controller or app",
          "Clean, professional install with hidden wiring",
          "Works in footwells, door panels, dash, and under seats",
        ],
        steps: [
          {
            title: "Zone Planning",
            desc: "We map out which areas of the interior you want lit and discuss color and controller options.",
          },
          {
            title: "Wiring & Strip Install",
            desc: "Strips are mounted and wiring is routed cleanly through the interior panels.",
          },
          {
            title: "Controller Setup & Test",
            desc: "Controller is installed and tested with you to confirm full operation.",
          },
        ],
        faq: [
          {
            q: "Can I control the colors from my phone?",
            a: "Yes — we offer Bluetooth-controlled systems that use a mobile app for color selection, effects, and brightness.",
          },
          {
            q: "Will installation damage my interior panels?",
            a: "No. We use proper fasteners and routes to avoid damaging panels. Wiring is tucked behind existing trim, not drilled through.",
          },
          {
            q: "Can it sync to music?",
            a: "Yes — select controller systems include a sound-reactive mode that pulses the lighting to audio.",
          },
        ],
        relatedSlugs: [
          "starlight-headliner",
          "interior-exterior",
          "caliper-painting",
        ],
        cardGradient:
          "linear-gradient(135deg, #0e0818 0%, #1a1028 60%, #120c20 100%)",
        heroGradient:
          "linear-gradient(160deg, #080410 0%, #140c22 40%, #0e081a 100%)",
      },
    ],
  },

  // ── 4. DETAILING ──────────────────────────────────────────────────────────
  {
    slug: "detailing",
    name: "Detailing",
    tagline: "A cleaner, sharper vehicle — inside and out.",
    description:
      "Professional detailing goes far beyond a standard wash. We restore, protect, and present your vehicle at its best — removing contamination, restoring surface clarity, and leaving every surface looking and feeling better than it did before.",
    gradient:
      "linear-gradient(135deg, #0a1010 0%, #141e1e 50%, #0c1616 100%)",
    services: [
      {
        slug: "interior-exterior",
        name: "Interior / Exterior Detailing",
        tagline:
          "Restore a cleaner, glossier, better-kept look inside and out with a deep refresh for your vehicle.",
        description: [
          "A professional detail is a complete reset for your vehicle's appearance. On the exterior, that means a thorough decontamination wash, clay bar treatment to remove bonded surface contamination, paint polish to restore gloss, and a protective sealant to maintain it. On the interior, it means deep cleaning every surface — seats, carpets, door panels, dash, glass, and vents.",
          "KAR FX Customs offers single-service exterior or interior details, full combined packages, and add-on services like engine bay cleaning, leather conditioning, and paint decontamination. We treat every vehicle with care and deliver results that make a visible difference.",
        ],
        benefits: [
          "Removes surface contamination that regular washing leaves behind",
          "Restores paint gloss and clarity with polish or light correction",
          "Deep interior cleaning removes odors, stains, and built-up grime",
          "Protective sealant extends the life of the clean result",
        ],
        steps: [
          {
            title: "Assessment & Package Selection",
            desc: "We assess the vehicle's current condition and recommend the right service level.",
          },
          {
            title: "Full Detail Process",
            desc: "Exterior decontamination, polish, and sealant. Interior deep clean from top to bottom.",
          },
          {
            title: "Final Inspection",
            desc: "Every surface is reviewed in good lighting before we hand the keys back.",
          },
        ],
        faq: [
          {
            q: "How long does a full detail take?",
            a: "A full interior and exterior detail typically takes 4–8 hours depending on vehicle size and condition. We'll give you a more specific estimate at booking.",
          },
          {
            q: "Is paint correction the same as detailing?",
            a: "Paint correction is a specific process of removing swirl marks and scratches using machine polishing — it's an optional add-on or upgrade beyond a standard detail.",
          },
          {
            q: "How often should I get my vehicle detailed?",
            a: "Most owners benefit from a full detail every 3–6 months for daily-driven vehicles. More frequent maintenance details can extend the time between deep cleans.",
          },
          {
            q: "Do you offer just an interior or just an exterior detail?",
            a: "Yes — we offer both as standalone services. Not every customer needs the full package, and we can focus on whichever area needs the most attention.",
          },
        ],
        relatedSlugs: ["ppf", "window-tint", "ambient-lighting"],
        cardGradient:
          "linear-gradient(135deg, #0a1010 0%, #182020 60%, #101818 100%)",
        heroGradient:
          "linear-gradient(160deg, #060c0c 0%, #101c1c 40%, #0c1616 100%)",
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/** Find a category by slug */
export function getCategoryBySlug(
  slug: string
): ServiceCategory | undefined {
  return SERVICE_CATEGORIES.find((c) => c.slug === slug);
}

/** Find a service by category + service slug */
export function getServiceBySlug(
  categorySlug: string,
  serviceSlug: string
): ServiceItem | undefined {
  const cat = getCategoryBySlug(categorySlug);
  return cat?.services.find((s) => s.slug === serviceSlug);
}

/** Get a flat list of all services (with category context attached) */
export function getAllServices(): (ServiceItem & {
  categorySlug: string;
  categoryName: string;
})[] {
  return SERVICE_CATEGORIES.flatMap((cat) =>
    cat.services.map((s) => ({
      ...s,
      categorySlug: cat.slug,
      categoryName: cat.name,
    }))
  );
}

/** Get related services (by slug) with their category attached */
export function getRelatedServices(
  slugs: string[]
): (ServiceItem & { categorySlug: string; categoryName: string })[] {
  const all = getAllServices();
  return slugs
    .map((slug) => all.find((s) => s.slug === slug))
    .filter(Boolean) as (ServiceItem & {
    categorySlug: string;
    categoryName: string;
  })[];
}
