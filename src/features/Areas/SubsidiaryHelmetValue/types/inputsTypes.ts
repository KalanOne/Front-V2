export type { VariationInputResponse };

interface VariationInputResponse {
  approved: number;
  number_layers: number;
  status: number;
  tire_model_variation_id: number;
  tire_size: TireSizeInputResponse;
  tire_size_id: number;
}

interface TireSizeInputResponse {
  size: string;
  tire_size_id: number;
}
