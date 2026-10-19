/**
 * Approved copy, keyed by page. Every entry carries `approved`. Unapproved copy renders in development
 * with a visible [OWNER COPY NEEDED] marker and is replaced by a neutral fallback in production.
 * Tone rules: concrete nouns over adjectives; name the substrate, the method, the standard; no superlatives
 * without a checkable basis; no heritage, capacity or customer claims not in the verified-facts table.
 *
 * Audience (owner decision 2026-10-16, final): fabricators and OEMs who paint steel — the people who buy
 * finished industrial coatings. Reference sites: trinkote.com (products by chemistry family) and
 * shebpaint.com (services).
 */
export interface Copy {
  text: string;
  approved: boolean;
  /** Shown in production when not approved. Must itself be claim-free. */
  fallback?: string;
}

export const messaging = {
  home: {
    eyebrow: { text: 'Industrial alkyd coatings, made in the United States', approved: true },
    headline: {
      text: 'Primers and topcoats for steel fabrication, built on our own resin.',
      approved: true,
    },
    lead: {
      text: 'Aster makes water-reducible and short oil alkyd coatings for shops that build trailers, racking, doors, tanks and equipment out of steel. The alkyd resin is made in our own plant, so a product can be tuned for your line by the people who made it.',
      approved: true,
    },
    whyHeading: { text: 'How we work', approved: true },
    why: [
      {
        heading: 'You describe the job',
        text: 'Substrate, surface prep, how the part is sprayed or dipped, how it dries, the spec it has to pass and the colour it has to be. From that we recommend a primer and topcoat from stock, or formulate one.',
        approved: true,
      },
      {
        heading: 'The lab proves it before you buy it',
        text: 'Colour matches and custom formulations are made up as a sample batch and sprayed on your own line. Production starts when the sample passes, not before.',
        approved: true,
      },
      {
        heading: 'Made close to you',
        text: 'Aster coatings are manufactured in California, Kentucky, Michigan and Texas, so most customers are a short freight run from a plant. The resin and the formulation behind every batch are ours, and the people who can change them are one call away.',
        approved: true,
      },
    ],
    industriesHeading: { text: 'Industries we supply', approved: true },
    ctaHeading: { text: 'Tell us what you are coating.', approved: true },
    ctaText: {
      text: 'Send us the part, how you apply it and the colour it has to be. We will come back with a recommendation and a sample.',
      approved: true,
    },
  },
  /** Family copy for the Products page, Trinkote-style: application, cure, end uses. Claims → unapproved until confirmed. */
  families: {
    'water-reducible-alkyd': {
      text: 'A primer and a topcoat formulated on our water-reducible alkyd resin. Water-reducible alkyds give the film properties of a conventional alkyd — gloss, flow, corrosion resistance over properly prepared steel — with water as the main reducer, which lowers VOC and simplifies solvent handling on the line. [OWNER TO CONFIRM: application methods (spray / dip / flow), cure (air dry / force dry / bake) and the end uses you want named.]',
      approved: false,
      fallback: 'A primer and a topcoat formulated on a water-reducible alkyd resin, for steel fabrications.',
    },
    'short-oil-alkyd': {
      text: 'A primer and a topcoat formulated on our short oil, chain-stopped alkyd resin — the alkyd chemistry chosen when a line needs fast dry-to-handle and early hardness. Solvent-borne, single-component, and suited to air-dry and force-dry industrial finishing. [OWNER TO CONFIRM: application methods, cure schedule and end uses.]',
      approved: false,
      fallback: 'A primer and a topcoat formulated on a fast-drying short oil alkyd resin.',
    },
  },
  /**
   * Services page. Structure mirrors the reference (shebpaint.com/services): intro →
   * Technical development → Colour matching (with quality testing and quality policy beneath) →
   * Technical support → Shipping → closing invitation. The owner confirmed on 2026-10-19 that Aster
   * offers the same set of services. All wording is original; specifics that are facts about Aster
   * (instruments, turnaround, regions, test lists) are flagged for confirmation.
   */
  services: {
    headline: { text: 'Our Services', approved: true },
    lead: {
      text: 'Aster is a coatings formulator with its own alkyd resin plant and laboratory, serving OEMs and fabricators who finish metal. From the first formulation to the finished part on your line, the people who made the coating are the people you talk to.',
      approved: true,
      fallback:
        'Custom formulation, colour matching, quality testing, technical support and shipping for OEM and fabricator customers.',
    },
    items: [
      {
        id: 'technical-development',
        offered: true,
        heading: 'Technical Development',
        text: 'When a stock product does not meet the requirement — a VOC limit, a dry-to-handle time, a substrate, a performance test — our chemists formulate to it. Because we make the alkyd resins our coatings are built on, a formulation change is decided in our own lab rather than negotiated with a supplier. You receive a trial batch to run on your line before anything scales to production.',
        approved: true,
        fallback: 'Custom formulation to a customer requirement, with a trial batch before production.',
      },
      {
        id: 'color-matching',
        offered: true,
        heading: 'Precision Colour Matching',
        text: 'Send a colour standard, a painted part or a reference from an existing product and we match it — colour and sheen — using instrument measurement and visual checks under controlled lighting. The match is confirmed on a sample batch you approve before production, so there are no surprises at the first full run.',
        approved: true,
        fallback:
          'Colour and sheen matching to a standard or sample, confirmed on a sample batch before production.',
        subsections: [
          {
            heading: 'Product quality testing',
            text: 'Quality control runs at every stage: incoming raw materials, laboratory formulations, trial batches and full production lots. Tests we run include:',
            approved: true,
            fallback: 'Quality control on raw materials, trial batches and production lots.',
            columns: [
              {
                heading: 'Physical testing',
                items: [
                  'Fineness of grind',
                  'Viscosity',
                  'Weight per gallon',
                  'Gloss',
                  'Dry time',
                  'Colour against standard',
                ],
              },
              {
                heading: 'Performance testing',
                items: [
                  'Adhesion',
                  'Hardness',
                  'Impact and flexibility',
                  'Salt spray and humidity resistance',
                  'UV and weathering resistance',
                ],
              },
            ],
          },
          {
            heading: 'Our quality policy',
            text: 'We supply products that meet the requirements our customers agree with us, we keep records that show it, and we improve the process when the records show we should.',
            approved: true,
            fallback: 'Products made to agreed requirements, with records to show it.',
          },
        ],
      },
      {
        id: 'technical-support',
        offered: true,
        heading: 'Responsive Technical Support',
        text: 'Paint-line problems rarely wait. Our technical staff troubleshoot application, cure, environmental and safety questions on the phone, and on site when a visit is what it takes. Safety data sheets and regulatory information are maintained and supplied for every product we ship.',
        approved: true,
        fallback:
          'Technical support for application, cure and compliance questions, with safety data sheets supplied for every product.',
      },
      {
        id: 'shipping',
        offered: true,
        heading: 'Expedited Shipping',
        text: 'Liquid coatings ship as regulated hazardous materials, which means ground freight, so we plan for it: stock products ship promptly, and when a line is waiting we choose the carrier and service that gets there soonest.',
        approved: true,
        fallback:
          'Ground shipping of coatings throughout the service region, expedited when a line is waiting.',
      },
      {
        id: 'toll-manufacturing',
        offered: true,
        heading: 'Toll Manufacturing',
        text: 'We produce your own formulation under your specification and quality plan, at the plant best placed to serve you, with batch records supplied.',
        approved: true,
        fallback: 'Toll manufacturing of customer formulations to specification.',
      },
    ],
    closing: {
      heading: 'We are always ready to help.',
      text: 'Whether you have a part to coat, a colour to match or a line that is not behaving, the fastest way to an answer is to tell us about it.',
      approved: true,
      fallback: 'Tell us about your part, colour or line and we will respond.',
    },
  },
  /**
   * About page. Structure follows the reference (shebpaint.com/about-us) — mission, what we make, how we
   * work, who we work with, what we stand for, where we are, earning trust, get in touch — but every
   * paragraph is specific to Aster: two alkyd families, our own resin, six industries, four US plants
   * (CA, KY, MI, TX — states only, never cities, and never who owns the plants; owner, 2026-10-19).
   * Only the origin paragraph still needs the owner (A8); everything else states confirmed facts.
   */
  about: {
    headline: { text: 'A coatings company that makes its own resin.', approved: true },
    intro: {
      text: 'Most industrial paint companies buy their resin from someone else. Aster makes the alkyd resins its coatings are built on, formulates the primer and topcoat around them in its own laboratory, and has the finished coating manufactured in California, Kentucky, Michigan and Texas. For a fabricator that means one phone call reaches the people who can actually change the product, and a plant that is rarely far away.',
      approved: true,
    },
    make: {
      heading: 'What we make',
      text: 'Two alkyd families, each as a primer and a topcoat, for steel fabrications. The water-reducible alkyd family uses water as its main reducer, which cuts VOC and simplifies solvent handling without giving up alkyd gloss and corrosion resistance. The short oil alkyd family is the solvent-borne, fast-dry chemistry for lines that need parts handled quickly. Both are single-component, air-dry or force-dry, and both are formulated on resin we make ourselves.',
      approved: true,
    },
    how: {
      heading: 'How a job runs with us',
      steps: [
        {
          heading: 'Tell us the part and the line',
          text: 'Substrate, prep, application method, cure, the spec it has to pass, the colour it has to be.',
        },
        {
          heading: 'The lab answers',
          text: 'A stock product, a colour match, or a formulation to your requirement — confirmed on a trial batch you run yourself.',
        },
        {
          heading: 'Production and testing',
          text: 'Each batch is checked against the specification before it ships: grind, viscosity, weight per gallon, gloss, dry time, colour.',
        },
        {
          heading: 'On the line',
          text: 'If something behaves differently on your line than it did in ours, technical support is a call away, and on site when that is what it takes.',
        },
      ],
      approved: true,
    },
    who: {
      heading: 'Who we work with',
      text: 'OEMs and job shops that finish steel: agriculture and construction equipment, trailers and truck bodies, general metal fabrication, racking and storage systems, steel doors and frames, tanks, drums and containers.',
      approved: true,
    },
    values: {
      heading: 'What we stand for',
      text: 'Specific answers, products built on our own resin, and ownership of the outcome.',
      items: [
        {
          heading: 'Specific over generic',
          text: 'We answer the question you asked, about your part and your line, not the one in the brochure.',
        },
        {
          heading: 'Our resin, our formulation',
          text: 'The resin and the formulation behind every Aster product are ours. If the product needs to change, we change it.',
        },
        {
          heading: 'Own the outcome',
          text: 'A batch or a match that is not right is our problem to fix, not yours to work around.',
        },
        {
          heading: 'Earn the next order',
          text: 'We would rather be the supplier you call back than the one you were stuck with.',
        },
      ],
      approved: true,
    },
    history: {
      heading: 'Where we are',
      text: 'Aster is based in Fairfield, California. Its coatings are manufactured at plants in California, Kentucky, Michigan and Texas and ship to customers across the United States.',
      approved: true,
    },
    trust: {
      heading: 'We want to earn your trust',
      text: 'We are a small company that formulates what it sells. The chemist who formulated your coating is reachable. A colour match is confirmed on a sample batch before production. A problem on your line gets a same-day response. None of that is a slogan; it is how a small company with its own lab has to work to keep a customer.',
      approved: true,
    },
  },
  products: {
    headline: { text: 'Products', approved: true },
    lead: {
      text: 'Two chemistry families, each with a primer and a topcoat. Each product page lists specifications, suitable substrates, application methods and documents as they are released.',
      approved: true,
    },
  },
  industries: {
    headline: { text: 'Industries', approved: true },
    lead: {
      text: 'The kinds of fabrication Aster coatings are made for.',
      approved: true,
    },
  },
  quote: {
    headline: { text: 'Request a quote', approved: true },
    lead: {
      text: 'Tell us about the part, the substrate and how you apply. Fields marked optional can be left blank.',
      approved: true,
    },
  },
  sample: {
    headline: { text: 'Request a sample', approved: true },
    lead: {
      text: 'Evaluation samples for your line. Tell us the product, what you will coat with it and the coating you use today, and we will send the closest match with its data sheets.',
      approved: true,
    },
  },
  technical: {
    headline: { text: 'Technical inquiry', approved: true },
    lead: {
      text: 'Questions about product selection, surface preparation, application or compatibility.',
      approved: true,
    },
  },
  contact: {
    headline: { text: 'Contact', approved: true },
    lead: {
      text: 'For pricing use the quote request; for samples use the sample request. For everything else, use the form below.',
      approved: true,
    },
  },
} as const;

export function copy(c: Copy, isProduction: boolean): { text: string; needsApproval: boolean } {
  if (c.approved) return { text: c.text, needsApproval: false };
  if (isProduction) return { text: c.fallback ?? '', needsApproval: false };
  return { text: c.text, needsApproval: true };
}
