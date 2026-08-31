import type { ArticleBlockItem, ArticleBlockTab } from "./ArticleBlock";

function datedItems(
  prefix: string,
  titles: Array<[string, string]>,
): ArticleBlockItem[] {
  return titles.map(([title, date], index) => ({
    date,
    href: `#${prefix}-${index + 1}`,
    id: `${prefix}-${index + 1}`,
    title,
  }));
}

function undatedItems(prefix: string, titles: string[]): ArticleBlockItem[] {
  return titles.map((title, index) => ({
    href: `#${prefix}-${index + 1}`,
    id: `${prefix}-${index + 1}`,
    title,
  }));
}

export const recommendedForYouTabs: ArticleBlockTab[] = [
  {
    id: "analysis",
    label: "Analysis",
    items: datedItems("analysis", [
      [
        "Oncology pipeline catalysts to watch in the next planning cycle",
        "12 Aug 2026",
      ],
      ["EU pricing reforms reshape late-stage immunology forecasts", "8 Aug 2026"],
      [
        "July Quarterly Contract Manufacturing Mergers, Acquisitions, and Financing across major markets and late-stage oncology programmes",
        "4 Aug 2026",
      ],
    ]),
  },
  {
    id: "deals",
    label: "Deals",
    items: datedItems("deals", [
      ["Mid-cap diagnostics group agrees $1.2bn take-private", "11 Aug 2026"],
      ["Series C financing for AI-enabled trial design platform", "6 Aug 2026"],
    ]),
  },
  {
    id: "news",
    label: "News",
    items: datedItems("news", [
      ["FDA calendar updates for late-stage immunology assets", "4 Aug 2026"],
      ["UK MHRA outlines new real-world evidence guidance", "1 Aug 2026"],
    ]),
  },
  {
    id: "clinical-trials",
    label: "Clinical Trials",
    items: datedItems("trials", [
      ["Phase III readout planned for next-gen CDK inhibitor", "29 Jul 2026"],
      ["Adaptive trial design adopted in rare-disease programme", "22 Jul 2026"],
    ]),
  },
];

export const latestDealsTabs: ArticleBlockTab[] = [
  {
    id: "ma",
    label: "M&A",
    items: datedItems("ma", [
      ["European CDMO acquired by US private equity consortium", "10 Aug 2026"],
      ["Specialty pharma bolt-on expands dermatology franchise", "2 Aug 2026"],
    ]),
  },
  {
    id: "financing",
    label: "Financing",
    items: datedItems("financing", [
      ["Growth equity round backs cell-therapy manufacturing network", "9 Aug 2026"],
      ["Convertible note extends runway for digital pathology vendor", "30 Jul 2026"],
    ]),
  },
  {
    id: "partnerships",
    label: "Partnerships",
    items: datedItems("partnerships", [
      ["Big pharma partners on antibody-drug conjugate platform", "7 Aug 2026"],
      ["Hospital network joins real-world data collaboration", "28 Jul 2026"],
    ]),
  },
  {
    id: "licensing",
    label: "Licensing",
    items: datedItems("licensing", [
      ["Ex-US rights licensed for oral GLP-1 candidate", "5 Aug 2026"],
      ["Regional licence covers three Southeast Asian markets", "21 Jul 2026"],
    ]),
  },
];

export const curatedCompanyListTabs: ArticleBlockTab[] = [
  {
    id: "sector-geography",
    label: "Sector & Geography",
    items: undatedItems("sector", [
      "US oncology companies with late-stage assets",
      "European medical device manufacturers by revenue",
      "APAC digital health platforms with Series B or later funding",
    ]),
  },
  {
    id: "advisors",
    label: "Top Advisors & Investors",
    items: undatedItems("advisors", [
      "Healthcare M&A advisors by deal count",
      "Life sciences growth investors active in 2026",
    ]),
  },
  {
    id: "tech-leaders",
    label: "Tech Leaders & Disruptors",
    items: undatedItems("tech", [
      "AI-enabled drug discovery platforms",
      "Clinical trial technology vendors with multi-region coverage",
    ]),
  },
];
