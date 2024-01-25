export type { DivisionResponseInput, BrandResponseInput };

interface DivisionResponseInput {
  division_id: number;
  name: string;
  status: number;
  subsidiary_id: number;
  subsidiary: Subsidiary;
}

interface Subsidiary {
  name: string;
  subsidiary_id: number;
}

interface BrandResponseInput {
  brand_id: number;
  brand_type: string;
  name: string;
  status: number;
  approved: number;
}
