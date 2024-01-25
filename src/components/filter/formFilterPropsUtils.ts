import i18n from "i18next";

import { FormDateProps } from "src/components/form/FormDateInput.tsx";
import {
  ModelRevitalizedResponseInput,
  ProviderResponseInput,
  VehicleResponseInput,
  WarehouseResponseInput,
} from "src/features/Alerts/AlertTire/types/inputsTypes.ts";
import {
  DriverResponseInput,
  VehicleTypeResponseInput,
} from "src/features/Alerts/Mounting/types/inputsTypes.ts";
import { alertsInputsResponse } from "src/features/AlertsPanel/types/inputsTypes";
import { VariationInputResponse } from "src/features/Areas/SubsidiaryHelmetValue/types/inputsTypes.ts";
import { AssociationResponse } from "src/features/Association/types/associationTypes.ts";
import { CorporateResponse } from "src/features/Corporate/types/corporateTypes.ts";
import { VehicleLinkResponse } from "src/features/Gps/types/gpsTypes";
import {
  BrandResponseInput,
  CompanyInputResponse,
  SizeResponseInput,
  SubsidiaryInputResponse,
} from "src/features/Report/Renewability/types/inputsTypes.ts";
import { ModelInputResponse } from "src/features/Report/Renewability/types/inputsTypes.ts";
import { SizeResponseInput as SizeResponseInputOriginalModel } from "src/features/Tire/Size/types/sizeTypes.ts";
import {
  RfidInput,
  WareHouseInput,
} from "src/features/Tire/Tire/types/inputTypes";
import { DivisionResponseInput } from "src/features/Vehicles/Vehicles/types/inputsTypes.ts";

import { FormAutoCompleteProps } from "../form/FormAutoComplete";

export {
  brandFilterProps,
  modelsFilterProps,
  dateFromFilterProps,
  dateToFilterProps,
  modelRevitalizedFilterProps,
  brandRevilatizedFilterProps,
  dateDOTInitialFilterProps,
  dateDOTFinalFilterProps,
  sizesFilterProps,
  providersFilterProps,
  subsidiariesFilterProps,
  warehousesFilterProps,
  vehiclesFilterProps,
  conditionFilterProps,
  locationFilterProps,
  alertClasificationFilterProps,
  vehicleTypeFilterProps,
  driversFilterProps,
  divisionsFilterProps,
  routeTypeFilterProps,
  wheelRimFilterProps,
  companiesFilterProps,
  reviewTypeFilterProps,
  languageUpdateProps,
  variationsFilterProps,
  associationFilterProps,
  corporateFilterProps,
  brandTypeFilterProps,
  selfItemFilterProps,
  areasFilterProps,
  damageCategoryFilterProps,
  movementFilterProps,
  activityFilterProps,
  tireAplicattionIdFilterProps,
  sizesOriginalFilterProps,
  tireModelVariationUseFilterProps,
  axleTypeFilterProps,
  warehousesTireRevitalizedFilterProps,
  rfidFilterProps,
  alertClasificationFilterProps2,
  alertsFilterProps,
  priorityFilterProps,
  conditionFilterProps2,
  pressureClasificationFilterProps,
  depthClasificationFilterProps,
  movementFilterProps2,
};

const brandFilterProps: FormAutoCompleteProps<BrandResponseInput> = {
  name: "brands",
  label: "common:brand",
  options: [],
  // keyExtractor: (item) => item.brand_id,
  valueExtractor: (item) => item.brand_id,
  labelExtractor: (item) => item.name,
  multiple: true,
};

const brandRevilatizedFilterProps: FormAutoCompleteProps<BrandResponseInput> = {
  name: "brandsRevitalized",
  label: "labels:revitalized_brand_field.label",
  options: [],
  // keyExtractor: (item) => item.brand_id,
  valueExtractor: (item) => item.brand_id,
  labelExtractor: (item) => item.name,
  multiple: true,
};

const associationFilterProps: FormAutoCompleteProps<AssociationResponse> = {
  name: "association",
  label: "common:association",
  options: [],
  // keyExtractor: (item) => item.association_id,
  valueExtractor: (item) => item.association_id,
  labelExtractor: (item) => item.name,
  multiple: false,
  getOptionDisabled: (item) => item.status === 0,
};

const rfidFilterProps: FormAutoCompleteProps<RfidInput> = {
  name: "rfid_id",
  label: "labels:rfid",
  options: [],
  // keyExtractor: (item) => item.association_id,
  valueExtractor: (item) => item.rfid_id,
  labelExtractor: (item) => item.device_code,
  multiple: false,
  getOptionDisabled: (item) => item.status === 0,
};

const corporateFilterProps: FormAutoCompleteProps<CorporateResponse> = {
  name: "corporates",
  label: "common:corporate",
  options: [],
  // keyExtractor: (item) => item.corporate_id,
  valueExtractor: (item) => item.corporate_id,
  labelExtractor: (item) => item.name,
  multiple: true,
};

const modelRevitalizedFilterProps: FormAutoCompleteProps<ModelRevitalizedResponseInput> =
  {
    name: "",
    label: "labels:revitalized_tire_model_field.label",
    options: [],
    // keyExtractor: (item) => item.revitalized_tire_model_id,
    valueExtractor: (item) => item.revitalized_tire_model_id,
    labelExtractor: (item) => item.name,
    multiple: true,
  };

const modelsFilterProps: FormAutoCompleteProps<ModelInputResponse> = {
  name: "models",
  label: "common:model",
  options: [],
  // keyExtractor: (item) => item.tire_model_id,
  valueExtractor: (item) => item.tire_model_id,
  labelExtractor: (item) => item.tire_model.name,
  multiple: false,
  getOptionDisabled: (option) => option.tire_model.status === 0,
};

const sizesFilterProps: FormAutoCompleteProps<SizeResponseInput> = {
  name: "sizes",
  label: "common:size",
  options: [],
  // keyExtractor: (item) => item.tire_size_id,
  valueExtractor: (item) => item.tire_size_id,
  labelExtractor: (item) => item.size,
  multiple: true,
};

const sizesOriginalFilterProps: FormAutoCompleteProps<SizeResponseInputOriginalModel> =
  {
    name: "tire_size_id",
    label: "common:size",
    options: [],
    // keyExtractor: (item) => item.tire_size_id,
    valueExtractor: (item) => item.tire_size_id,
    labelExtractor: (item) => item.size,
    multiple: false,
  };

const providersFilterProps: FormAutoCompleteProps<ProviderResponseInput> = {
  name: "providers",
  label: "common:provider",
  options: [],
  // keyExtractor: (item) => item.provider_id,
  valueExtractor: (item) => item.provider_id,
  labelExtractor: (item) => item.name,
  multiple: false,
  getOptionDisabled: (option) => option.status === 0,
};

const companiesFilterProps: FormAutoCompleteProps<CompanyInputResponse> = {
  name: "company_id",
  label: "common:company",
  options: [],
  // keyExtractor: (item) => item.company_id,
  valueExtractor: (item) => item.company_id,
  labelExtractor: (item) => item.name,
  multiple: true,
  getOptionDisabled: (option) => option.status === 0,
};

const subsidiariesFilterProps: FormAutoCompleteProps<SubsidiaryInputResponse> =
  {
    name: "subsidiaries",
    label: "common:subsidiary",
    options: [],
    // keyExtractor: (item) => item.subsidiary_id,
    valueExtractor: (item) => item.subsidiary_id,
    labelExtractor: (item) => item.name,
    multiple: false,
    getOptionDisabled: (option) => option.status === 0,
  };

const divisionsFilterProps: FormAutoCompleteProps<DivisionResponseInput> = {
  name: "divisions",
  label: "common:division",
  options: [],
  // keyExtractor: (item) => item.division_id,
  valueExtractor: (item) => item.division_id,
  labelExtractor: (item) => `${item.name} - ${item.subsidiary.name}`,
  multiple: true,
};

const warehousesFilterProps: FormAutoCompleteProps<WarehouseResponseInput> = {
  name: "warehouses",
  label: "common:warehouse",
  options: [],
  // keyExtractor: (item) => item.warehouse_id,
  valueExtractor: (item) => item.warehouse_id,
  labelExtractor: (item) => item.name,
  multiple: false,
  getOptionDisabled: (option) => option.status === 0,
};

const warehousesTireRevitalizedFilterProps: FormAutoCompleteProps<WareHouseInput> =
  {
    name: "warehouse_id",
    label: "common:warehouse",
    options: [],
    // keyExtractor: (item) => item.warehouse_id,
    valueExtractor: (item) => item.warehouse_id,
    labelExtractor: (item) => item.name,
    multiple: false,
    getOptionDisabled: (option) => option.status === 0,
  };

const vehiclesFilterProps: FormAutoCompleteProps<
  VehicleResponseInput | VehicleLinkResponse
> = {
  name: "Vehículo",
  label: "common:vehicle",
  options: [],
  // keyExtractor: (item) => item.vehicle_id,
  valueExtractor: (item) => item.vehicle_id,
  labelExtractor: (item) => item.economic_number,
  multiple: true,
  getOptionDisabled: (option) => option.status === 0,
};

const vehicleTypeFilterProps: FormAutoCompleteProps<VehicleTypeResponseInput> =
  {
    name: "vehicle_type_id",
    label: "labels:vehicle_type.label",
    options: [],
    // keyExtractor: (item) => item.vehicle_type_id,
    valueExtractor: (item) => item.vehicle_type_id,
    labelExtractor: (item) => item.name,
    multiple: true,
  };

const driversFilterProps: FormAutoCompleteProps<DriverResponseInput> = {
  name: "driver_id",
  label: "common:driver",
  options: [],
  // keyExtractor: (item) => item.driver_id,
  valueExtractor: (item) => item.driver_id,
  labelExtractor: (item) => item.name,
  multiple: true,
};

const variationsFilterProps: FormAutoCompleteProps<VariationInputResponse> = {
  name: "tire_model_variation_id",
  label: "labels:tire_model_variation_field.label",
  options: [],
  // keyExtractor: (item) => item.tire_model_variation_id,
  valueExtractor: (item) => item.tire_model_variation_id,
  labelExtractor: (item) => item.tire_size.size,
  multiple: false,
  getOptionDisabled: (option) => option.status === 0,
};

const alertsFilterProps: FormAutoCompleteProps<alertsInputsResponse> = {
  name: "alert_codes",
  label: "common:alert_plural",
  options: [],
  valueExtractor: (item: alertsInputsResponse) => item.code,
  labelExtractor: (item: alertsInputsResponse) =>
    i18n.t(`alerts:colloquial_name.${item.colloquial_name.toLowerCase()}`),
  multiple: false,
  getOptionDisabled: (item: alertsInputsResponse) => item.status === 0,
};

const dateFromFilterProps: FormDateProps = {
  name: "date_from",
  label: "labels:date.from",
};

const dateToFilterProps: FormDateProps = {
  name: "date_to",
  label: "labels:date.to",
};

const dateDOTInitialFilterProps: FormDateProps = {
  name: "DOT_initial",
  label: "labels:dot_initial",
};

const dateDOTFinalFilterProps: FormDateProps = {
  name: "DOT_final",
  label: "labels:dot_final",
};

const conditionFilterProps: FormAutoCompleteProps<{
  label: string;
  value: string;
}> = {
  name: "condition",
  label: "labels:condition",
  options: [
    {
      label: "Original Nueva",
      value: "ORIGINAL_NEW",
    },
    {
      label: "Original Usada",
      value: "ORIGINAL_USED",
    },
    {
      label: "Renovada Nueva",
      value: "RETREAD_NEW",
    },
    {
      label: "Renovada Usada",
      value: "RETREAD_USED",
    },
  ],
  // keyExtractor: (item) => item.value,
  valueExtractor: (item) => item.value,
  labelExtractor: (item) => i18n.t(item.label),
  multiple: false,
};

const conditionFilterProps2: FormAutoCompleteProps<{
  label: string;
  value: string;
}> = {
  name: "tire_condition",
  label: "labels:condition",
  options: [
    {
      label: "labels:tire_condition.options.renewed",
      value: "RETREAD_USED",
    },
    {
      label: "labels:tire_condition.options.original",
      value: "ORIGINAL_USED",
    },
  ],
  valueExtractor: (item) => item.value,
  labelExtractor: (item) => i18n.t(item.label),
  multiple: false,
};

const locationFilterProps: FormAutoCompleteProps<{
  label: string;
  value: string;
}> = {
  name: "location",
  label: "labels:location.label",
  options: [
    {
      label: "Almacén",
      value: "WAREHOUSE",
    },
    {
      label: "Montadas",
      value: "MOUNT",
    },
    {
      label: "Revitalización",
      value: "REVITALIZATION",
    },
    {
      label: "Reparación",
      value: "REPAIR",
    },
    {
      label: "Pila",
      value: "PILE",
    },
  ],
  // keyExtractor: (item) => item.value,
  valueExtractor: (item) => item.value,
  labelExtractor: (item) => i18n.t(item.label),
  multiple: false,
};

const alertClasificationFilterProps: FormAutoCompleteProps<{
  label: string;
  value: string;
}> = {
  name: "ranking_alert",
  label: "labels:ranking_alert.label",
  options: [
    {
      label: "labels:ranking_alert.options.application",
      value: "APPLICATION",
    },
    {
      label: "labels:ranking_alert.options.condition",
      value: "CONDITION",
    },
    {
      label: "labels:ranking_alert.options.pressure",
      value: "PRESSURE",
    },
    {
      label: "labels:ranking_alert.options.depth",
      value: "DEPTH",
    },
  ],

  // keyExtractor: (item) => item.value,
  valueExtractor: (item) => item.value,
  labelExtractor: (item) => i18n.t(item.label),
  multiple: false,
};

const routeTypeFilterProps: FormAutoCompleteProps<{
  label: string;
  value: string;
}> = {
  name: "type_of_route",
  label: "labels:type_of_route.label",
  options: [
    {
      label: "labels:type_of_route.options.local",
      value: "LOCAL",
    },
    {
      label: "labels:type_of_route.options.foreign",
      value: "FOREIGN",
    },
  ],
  // keyExtractor: (item) => item.value,
  valueExtractor: (item) => item.value,
  labelExtractor: (item) => i18n.t(item.label),
  multiple: false,
};

const wheelRimFilterProps: FormAutoCompleteProps<{
  label: string;
  value: string;
}> = {
  name: "wheel",
  label: "labels:wheel.default",
  options: [
    {
      label: "Acero",
      value: "STEEL",
    },
    {
      label: "Aluminio",
      value: "ALUMINUM",
    },
    {
      label: "Aluminio y acero",
      value: "BOTH",
    },
  ],
  // keyExtractor: (item) => item.value,
  valueExtractor: (item) => item.value,
  labelExtractor: (item) => i18n.t(item.label),
  multiple: false,
};

const reviewTypeFilterProps: FormAutoCompleteProps<{
  label: string;
  value: string;
}> = {
  name: "review_type",
  label: "labels:review_type.label",
  options: [
    {
      label: "labels:review_type.options.complete",
      value: "COMPLETE",
    },
    {
      label: "labels:review_type.options.pressure",
      value: "PRESSURE",
    },
    {
      label: "labels:review_type.options.identify",
      value: "IDENTIFY",
    },
    {
      label: "labels:review_type.options.damage_and_wear",
      value: "DAMAGE AND WEAR",
    },
    {
      label: "labels:review_type.options.mount_dismount",
      value: "MOUNT/DISMOUNT",
    },
    {
      label: "labels:review_type.options.rotation",
      value: "ROTATION",
    },
    {
      label: "labels:review_type.options.initial",
      value: "INITIAL",
    },
    {
      label: "labels:review_type.options.partial",
      value: "PARTIAL",
    },
  ],
  // keyExtractor: (item) => item.value,
  valueExtractor: (item) => item.value,
  labelExtractor: (item) => i18n.t(item.label),
  multiple: true,
};

const languageUpdateProps: FormAutoCompleteProps<{
  label: string;
  value: string;
}> = {
  name: "preferred_language",
  label: "labels:language_field.label",
  options: [
    {
      label: "labels:language_field.options.es",
      value: "es",
    },
    {
      label: "labels:language_field.options.en",
      value: "en",
    },
  ],
  // keyExtractor: (item) => item.value,
  valueExtractor: (item) => item.value,
  labelExtractor: (item) => i18n.t(item.label),
  // getOptionDisabled: (item) => item.value === "en",
  multiple: false,
};

const brandTypeFilterProps: FormAutoCompleteProps<{
  label: string;
  value: string;
}> = {
  name: "brandType",
  label: "labels:brand_type.label.singular",
  options: [
    {
      label: "labels:brand_type.options.vehicle",
      value: "VEHICLE",
    },
    {
      label: "labels:brand_type.options.tire",
      value: "TIRE",
    },
    {
      label: "labels:brand_type.options.engine_transmission",
      value: "ENGINE_TRANSMISSION",
    },
    {
      label: "labels:brand_type.options.vehicle_engine",
      value: "VEHICLE_ENGINE",
    },
    {
      label: "labels:brand_type.options.retread",
      value: "RETREAD",
    },
  ],
  // keyExtractor: (item) => item.value,
  valueExtractor: (item) => item.value,
  labelExtractor: (item) => i18n.t(item.label),
  multiple: false,
};

const selfItemFilterProps: FormAutoCompleteProps<any> = {
  name: "selfItem",
  label: "selfItem",
  options: [],
  // keyExtractor: (item) => item,
  valueExtractor: (item) => item,
  labelExtractor: (item) => item,
  multiple: false,
};

const areasFilterProps: FormAutoCompleteProps<{
  label: string;
  value: string;
}> = {
  name: "area",
  label: "labels:area.label",
  options: [
    {
      label: "labels:area.options.sidewall",
      value: "SIDEWALL",
    },
    {
      label: "labels:area.options.bead",
      value: "BEAD",
    },
    {
      label: "labels:area.options.tread",
      value: "TREAD",
    },
    {
      label: "labels:area.options.inside",
      value: "INSIDE",
    },
    {
      label: "labels:area.options.any",
      value: "ANY",
    },
  ],
  // keyExtractor: (item) => item.value,
  valueExtractor: (item) => item.value,
  labelExtractor: (item) => i18n.t(item.label),
  multiple: false,
};

const damageCategoryFilterProps: FormAutoCompleteProps<{
  label: string;
  value: string;
}> = {
  name: "damage_category",
  label: "labels:category.label",
  options: [
    {
      label: "labels:category.options.avoidable",
      value: "AVOIDABLE",
    },
    {
      label: "labels:category.options.helmet_failure",
      value: "HELMET_FAILURE",
    },
    {
      label: "labels:category.options.operation",
      value: "OPERATION",
    },
    {
      label: "labels:category.options.retread_repair",
      value: "RETREAD/REPAIR",
    },
    {
      label: "labels:category.options.road_risk",
      value: "ROAD_RISK",
    },
  ],
  // keyExtractor: (item) => item.value,
  valueExtractor: (item) => item.value,
  labelExtractor: (item) => i18n.t(item.label),
  multiple: false,
};

const movementFilterProps: FormAutoCompleteProps<{
  label: string;
  value: string;
}> = {
  name: "movement",
  label: "labels:location.label",
  options: [
    {
      label: "labels:pile_summary_report.movements.options.both",
      value: "BOTH",
    },
    {
      label: "labels:location.options.warehouse",
      value: "WAREHOUSE",
    },
    {
      label: "labels:location.options.mount",
      value: "MOUNT",
    },
    {
      label: "labels:location.options.pile",
      value: "PILE",
    },
  ],
  // keyExtractor: (item) => item.value,
  valueExtractor: (item) => item.value,
  labelExtractor: (item) => i18n.t(item.label),
  multiple: false,
};

const movementFilterProps2: FormAutoCompleteProps<{
  label: string;
  value: string;
}> = {
  name: "movement",
  label: "labels:location.label",
  options: [
    {
      label: "labels:location.options.warehouse",
      value: "WAREHOUSE",
    },
    {
      label: "labels:location.options.mount",
      value: "MOUNT",
    },
  ],
  // keyExtractor: (item) => item.value,
  valueExtractor: (item) => item.value,
  labelExtractor: (item) => i18n.t(item.label),
  multiple: false,
};

const activityFilterProps: FormAutoCompleteProps<{
  label: string;
  value: string;
}> = {
  name: "activity",
  label: "labels:activity.label",
  options: [
    {
      label: "labels:activity.options.not_rule_out",
      value: "default",
    },
    {
      label: "labels:activity.options.general",
      value: "GENERAL",
    },
    {
      label: "labels:activity.options.general_and_mount",
      value: "GENERAL,MOUNT",
    },
  ],
  // keyExtractor: (item) => item.value,
  valueExtractor: (item) => item.value,
  labelExtractor: (item) => i18n.t(item.label),
  multiple: false,
};

const tireAplicattionIdFilterProps: FormAutoCompleteProps<{
  label: string;
  value: string;
}> = {
  name: "tire_application_id",
  label: "labels:tire_application.label.singular",
  options: [
    {
      label: "labels:tire_application.options.all_position",
      value: "ALL_POSITION",
    },
    {
      label: "labels:tire_application.options.directional",
      value: "DIRECTIONAL",
    },
    {
      label: "labels:tire_application.options.traction",
      value: "TRACTION",
    },
    {
      label: "labels:tire_application.options.trailer",
      value: "TRAILER",
    },
  ],
  // keyExtractor: (item) => item.value,
  valueExtractor: (item) => item.value,
  labelExtractor: (item) => i18n.t(item.label),
  multiple: false,
};

const axleTypeFilterProps: FormAutoCompleteProps<{
  label: string;
  value: string;
}> = {
  name: "axle_type",
  label: "labels:axle_field.label",
  options: [
    {
      label: "labels:tire_application.options.directional",
      value: "DIRECTIONAL",
    },
    {
      label: "labels:tire_application.options.traction",
      value: "TRACTION",
    },
    {
      label: "labels:tire_application.options.trailer",
      value: "TRAILER",
    },
    {
      label: "Refaccion",
      value: "REFECTION",
    },
  ],
  // keyExtractor: (item) => item.value,
  valueExtractor: (item) => item.value,
  labelExtractor: (item) => i18n.t(item.label),
  multiple: false,
};

const tireModelVariationUseFilterProps: FormAutoCompleteProps<{
  label: string;
  value: string;
}> = {
  name: "tire_model_variation_use",
  label: "labels:tire_model.use",
  options: [
    {
      label: "labels:tire_use.options.long_distance",
      value: "LONG_DISTANCE",
    },
    {
      label: "labels:tire_use.options.mixed",
      value: "MIXED",
    },
    {
      label: "labels:tire_use.options.regional",
      value: "REGIONAL",
    },
    {
      label: "labels:tire_use.options.urban",
      value: "URBAN",
    },
  ],
  // keyExtractor: (item) => item.value,
  valueExtractor: (item) => item.value,
  labelExtractor: (item) => i18n.t(item.label),
  multiple: true,
};

const priorityFilterProps: FormAutoCompleteProps<{
  label: string;
  value: string;
}> = {
  name: "priority",
  label: "labels:priority.label",
  options: [
    {
      label: "labels:priority.options.high",
      value: "HIGH",
    },
    {
      label: "labels:priority.options.half",
      value: "HALF",
    },
    {
      label: "labels:priority.options.low",
      value: "LOW",
    },
  ],
  // keyExtractor: (item) => item.value,
  valueExtractor: (item) => item.value,
  labelExtractor: (item) => i18n.t(item.label),
  multiple: true,
};

const alertClasificationFilterProps2: FormAutoCompleteProps<{
  label: string;
  value: string;
}> = {
  name: "ranking_alert",
  label: "labels:ranking_alert.label",
  options: [
    {
      label: "labels:ranking_alert.options.pressure",
      value: "PRESSURE",
    },
    {
      label: "labels:ranking_alert.options.depth",
      value: "DEPTH",
    },
    {
      label: "labels:ranking_alert.options.condition",
      value: "CONDITION",
    },
    {
      label: "labels:ranking_alert.options.application",
      value: "APPLICATION",
    },
    {
      label: "labels:ranking_alert.options.projection",
      value: "PROJECTION",
    },
    {
      label: "labels:ranking_alert.options.patches",
      value: "PATCHES",
    },
    {
      label: "labels:ranking_alert.options.retirement",
      value: "RETIREMENT",
    },
    {
      label: "labels:ranking_alert.options.model",
      value: "MODEL",
    },
    {
      label: "labels:ranking_alert.options.size",
      value: "SIZE",
    },
    {
      label: "labels:ranking_alert.options.review",
      value: "REVIEW",
    },
    {
      label: "labels:ranking_alert.options.assignment",
      value: "ASSIGNMENT",
    },
    {
      label: "labels:ranking_alert.options.identification",
      value: "IDENTIFICATION",
    },
  ],

  // keyExtractor: (item) => item.value,
  valueExtractor: (item) => item.value,
  labelExtractor: (item) => i18n.t(item.label),
  multiple: true,
};

const pressureClasificationFilterProps: FormAutoCompleteProps<{
  label: string;
  value: string;
}> = {
  name: "pressure_condition",
  label: "labels2:pressure_rating",
  options: [
    {
      label: "labels2:summary_report.pressure_condition.no_pressure",
      value: "NO PRESSURE",
    },
    {
      label: "labels2:summary_report.pressure_condition.high",
      value: "HIGH",
    },
    {
      label: "labels2:summary_report.pressure_condition.low",
      value: "LOW",
    },
    {
      label: "labels2:summary_report.pressure_condition.normal",
      value: "NORMAL",
    },
  ],

  // keyExtractor: (item) => item.value,
  valueExtractor: (item) => item.value,
  labelExtractor: (item) => i18n.t(item.label),
  multiple: false,
};

const depthClasificationFilterProps: FormAutoCompleteProps<{
  label: string;
  value: string;
}> = {
  name: "depth_condition",
  label: "labels2:depth_rating",
  options: [
    {
      label: "labels2:summary_report.depth_condition.good_condition",
      value: "GOOD CONDITION",
    },
    {
      label: "labels2:summary_report.depth_condition.scheduled_withdrawal",
      value: "SCHEDULED WITHDRAWAL",
    },
    {
      label: "labels2:summary_report.depth_condition.critical_withdrawal",
      value: "CRITICAL WITHDRAWAL",
    },
  ],

  // keyExtractor: (item) => item.value,
  valueExtractor: (item) => item.value,
  labelExtractor: (item) => i18n.t(item.label),
  multiple: false,
};
