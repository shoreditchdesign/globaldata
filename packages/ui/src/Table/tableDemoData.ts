import type { TableColumnDef } from "./Table";
import { TableDemoLink } from "./TableDemoLink";

export type DrugRow = {
  brandName: string;
  companyName: string;
  developmentStage: string;
  drugGeography: string;
  drugName: string;
  genericName: string;
  indication: string;
  therapyArea: string;
};

export const drugColumnDefs: TableColumnDef<DrugRow>[] = [
  {
    field: "drugName",
    headerName: "Drug Name",
    minWidth: 160,
    width: 180,
    flex: 0,
    cellRenderer: TableDemoLink,
  },
  {
    field: "genericName",
    headerName: "Generic Name",
    minWidth: 170,
    width: 190,
    flex: 0,
  },
  {
    field: "brandName",
    headerName: "Brand Name",
    minWidth: 140,
    width: 160,
    flex: 0,
  },
  {
    field: "companyName",
    headerName: "Company Name",
    minWidth: 220,
    width: 260,
    flex: 1,
    cellRenderer: TableDemoLink,
  },
  {
    field: "therapyArea",
    headerName: "Therapy Area",
    minWidth: 150,
    width: 170,
    flex: 0,
  },
  {
    field: "indication",
    headerName: "Indication",
    minWidth: 360,
    width: 440,
    flex: 2,
  },
  {
    field: "developmentStage",
    headerName: "Development Stage",
    minWidth: 150,
    width: 170,
    flex: 0,
  },
  {
    field: "drugGeography",
    headerName: "Drug Geography",
    minWidth: 280,
    width: 340,
    flex: 1.5,
  },
];

export const longTextColumnDefs = drugColumnDefs.map((column) =>
  column.field === "indication" || column.field === "drugGeography"
    ? { ...column, autoHeight: true, wrapText: true }
    : column,
);

export const drugRows: DrugRow[] = [
  {
    drugName: "Keytruda",
    genericName: "pembrolizumab",
    brandName: "Keytruda",
    companyName: "Merck & Co.",
    therapyArea: "Oncology",
    indication: "Melanoma; NSCLC",
    developmentStage: "Marketed",
    drugGeography: "United States, EU, Japan",
  },
  {
    drugName: "Ozempic",
    genericName: "semaglutide",
    brandName: "Ozempic",
    companyName: "Novo Nordisk",
    therapyArea: "Metabolic Disorders",
    indication: "Type 2 diabetes mellitus",
    developmentStage: "Marketed",
    drugGeography: "United States, EU, UK",
  },
  {
    drugName: "Dupixent",
    genericName: "dupilumab",
    brandName: "Dupixent",
    companyName: "Sanofi / Regeneron",
    therapyArea: "Immunology",
    indication: "Atopic dermatitis; asthma",
    developmentStage: "Marketed",
    drugGeography: "United States, EU",
  },
  {
    drugName: "GD-401",
    genericName: "unspecified ASO",
    brandName: "—",
    companyName: "Example Pharma Ltd",
    therapyArea: "Rare Diseases",
    indication: "ATTR polyneuropathy",
    developmentStage: "Phase II",
    drugGeography: "United States, Canada",
  },
  {
    drugName: "Aspirin",
    genericName: "acetylsalicylic acid",
    brandName: "Bayer Aspirin",
    companyName: "Bayer",
    therapyArea: "Cardiovascular",
    indication: "Pain; secondary prevention",
    developmentStage: "Marketed",
    drugGeography: "Global",
  },
];

export const overviewDrugRows = drugRows.slice(0, 4);

export const longContentRows: DrugRow[] = [
  {
    drugName: "Keytruda",
    genericName: "pembrolizumab",
    brandName: "Keytruda",
    companyName: "Merck Sharp & Dohme LLC",
    therapyArea: "Oncology",
    indication:
      "Melanoma, non-small cell lung cancer, head and neck squamous cell carcinoma, and additional labelled indications across multiple tumour types in adults, including combination regimens with chemotherapy.",
    developmentStage: "Marketed",
    drugGeography:
      "United States, European Union, United Kingdom, Japan, China, Canada, Australia, South Korea, Brazil, and other authorised markets.",
  },
  {
    drugName: "Ozempic",
    genericName: "semaglutide",
    brandName: "Ozempic",
    companyName: "Novo Nordisk A/S",
    therapyArea: "Metabolic Disorders",
    indication:
      "Adjunct to diet and exercise to improve glycaemic control in adults with type 2 diabetes mellitus, including patients with established cardiovascular disease.",
    developmentStage: "Marketed",
    drugGeography:
      "United States, European Union, United Kingdom, Japan, Canada, Australia, and additional launch markets in Latin America and the Middle East.",
  },
  {
    drugName: "Dupixent",
    genericName: "dupilumab",
    brandName: "Dupixent",
    companyName: "Sanofi and Regeneron Pharmaceuticals",
    therapyArea: "Immunology",
    indication:
      "Moderate-to-severe atopic dermatitis, asthma, chronic rhinosinusitis with nasal polyps, eosinophilic oesophagitis, and prurigo nodularis in eligible patient populations.",
    developmentStage: "Marketed",
    drugGeography:
      "United States, European Union, United Kingdom, Japan, China, and other regions with local labelling variations.",
  },
  {
    drugName: "GD-401",
    genericName:
      "unspecified antisense oligonucleotide directed against transthyretin",
    brandName: "—",
    companyName: "GlobalData Example Pharma Limited",
    therapyArea: "Rare Diseases / Neurology",
    indication:
      "Investigational treatment of genetically confirmed hereditary transthyretin amyloidosis with polyneuropathy in adults previously treated with a TTR silencer, including patients with mixed phenotype cardiomyopathy.",
    developmentStage: "Phase II",
    drugGeography:
      "United States investigational sites, Canada, United Kingdom, Germany, France, Spain, Italy, and planned expansion into Japan and South Korea.",
  },
  {
    drugName: "ASA",
    genericName: "acetylsalicylic acid",
    brandName: "Bayer Aspirin",
    companyName: "Bayer",
    therapyArea: "CV",
    indication: "Pain",
    developmentStage: "Marketed",
    drugGeography: "Global",
  },
];

const TABLE_DEMO_HEADER_HEIGHT = 30;
const TABLE_DEMO_ROW_HEIGHT = 44;
const TABLE_DEMO_CHROME = 2;
const TABLE_DEMO_H_SCROLLBAR = 17;
const TABLE_DEMO_EMPTY_BODY = 88;

export function getDemoTableHeight(rowCount: number) {
  if (rowCount <= 0) {
    return TABLE_DEMO_HEADER_HEIGHT + TABLE_DEMO_EMPTY_BODY + TABLE_DEMO_CHROME;
  }

  return (
    TABLE_DEMO_HEADER_HEIGHT +
    rowCount * TABLE_DEMO_ROW_HEIGHT +
    TABLE_DEMO_CHROME +
    TABLE_DEMO_H_SCROLLBAR
  );
}
