const demoMediaSrc =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
      <rect width="1600" height="900" fill="#c5cddb"/>
      <rect x="0" y="280" width="1600" height="340" fill="#8f9aaf"/>
    </svg>`,
  );

export const carouselCardDemoEyebrow = "NEW REPORT";

export const carouselCardDemoTitle = "Oncology Pipeline Outlook 2026";

export const carouselCardDemoDescription =
  "A concise look at late-stage oncology programmes, upcoming catalysts, and the commercial questions shaping the next planning cycle.";

export const carouselCardDemoAction = "Access the Full Report";

export const carouselCardDemoLongAction = "Read the full press release";

export const carouselCardDemoCompactEyebrow = "Press Release";

export const carouselCardDemoCompactTitle = "Cell Therapy Market Access Update";

export const carouselCardDemoCompactAltEyebrow = "Webinar Recording";

export const carouselCardDemoCompactLongTitle =
  "July Quarterly Contract Manufacturing Mergers, Acquisitions, and Financing across major markets";

export const carouselCardDemoCompactItems = [
  {
    eyebrow: carouselCardDemoCompactEyebrow,
    title: carouselCardDemoCompactTitle,
  },
  {
    eyebrow: carouselCardDemoCompactAltEyebrow,
    title: "Q3 pipeline catalysts shaping late-stage oncology decisions",
  },
  {
    eyebrow: "Industry Insight",
    title: carouselCardDemoCompactLongTitle,
  },
] as const;

export const carouselCardDemoLongTitle =
  "Cell and Gene Therapy Commercialisation Across Major Markets, Pricing Pathways, and Manufacturing Capacity Through 2028";

export const carouselCardDemoLongDescription =
  "This briefing follows how developers are sequencing launches, contracting capacity, and preparing evidence packages as regulators and payers tighten expectations around durability, comparability, and long-term follow-up.";

export function CarouselCardDemoMedia() {
  return <img alt="" src={demoMediaSrc} />;
}
