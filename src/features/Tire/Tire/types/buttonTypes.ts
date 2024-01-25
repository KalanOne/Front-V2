export type {
  RevitalizedButton,
  RepairButton,
  DiscardButton,
  DamageButton,
  SendToWareHouseRevitalization,
  SendToWareHouseRepair,
  UpdateTireReviewData,
};

interface SendToWareHouseRevitalization {
  warehouse_id: string;
  price: number;
  brand_id?: string;
  revitalized_tire_model_id: string;
  expected_durability: number;
  depth: number;
  date_return: string;
  comment: string;
  invoice_date: string;
  invoice_folio: string;
}

interface SendToWareHouseRepair {
  driver_id?: string;
  comment: string;
  surcharge: number;
  surcharge_item?: string;
  date_return: string;
  warehouse_id: string;
  price: number;
  invoice_date: string;
  invoice_folio: string;
  repair_detail?: boolean;
  repairs?: {
    repair_name?: string;
    price?: number;
  }[];
}

interface UpdateTireReviewData {
  id?: string | number;
  tire_review_id?: string | number;
  pressure: number;
  comment: string;
  depth?: {
    depth_external?: number;
    depth_middle?: number;
    depth_internal?: number;
  }[];
}
interface RevitalizedButton {
  provider_id: string;
  wears: {
    wear_id: string;
    comment: string;
    image?: File | null;
  }[];
  damages: {
    damage_id: string;
    comment: string;
    image?: File | null;
  }[];
  date_send: string;
  type: string;
}

interface RepairButton {
  provider_id: string;
  damages: {
    damage_id: string;
    comment: string;
    image?: File | null;
  }[];
  date_send: string;
  type: string;
}

interface DiscardButton {
  damages: {
    damage_id: string;
    comment: string;
    image?: File | null;
  }[];
  retirement_cause_id: string;
  driver_id: string;
  comment: string;
  surcharge: number;
  surcharge_item: string;
  cost_dispose_helmet: string;
  type: string;
}

interface DamageButton {
  damages: {
    damage_id: string;
    comment: string;
    image?: File | null;
  }[];
  type: string;
}
