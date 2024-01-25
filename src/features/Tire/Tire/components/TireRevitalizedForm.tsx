import React, { useEffect } from "react";

import { Grid, MenuItem } from "@mui/material";

import { FormProvider, UseFormReturn, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
  brandFilterProps,
  rfidFilterProps,
  warehousesTireRevitalizedFilterProps,
} from "src/components/filter/formFilterPropsUtils";
import { FormAutoComplete } from "src/components/form/FormAutoComplete";
import { FormDateInput } from "src/components/form/FormDateInput";
import { FormSelectInput } from "src/components/form/FormSelectInput";
import { FormTextInput } from "src/components/form/FormTextInput";
import { alphabeticalSort } from "src/utils/sort";

import { UseTireRevitalizedDependenciesReturns } from "../hooks/dependenciesRevitalized";
import {
  RevitalizedTireModelInput2,
  WareHouseInput,
} from "../types/inputTypes";
import { TireRevitalizedSchemaType } from "../validation/revitalizedTire";

export { TireRevitalizedForm };

interface TireRevitalizedFormProps {
  form: UseFormReturn<TireRevitalizedSchemaType>;
  dependencies: UseTireRevitalizedDependenciesReturns;
}

function TireRevitalizedForm({
  form,
  dependencies,
}: TireRevitalizedFormProps): React.ReactElement {
  const { t } = useTranslation();
  const brands = dependencies.brands
    .filter((brand) => brand.brand_type === "RETREAD")
    .sort(alphabeticalSort("name"));

  const [revitalized_tire_model_id, brand_id] = useWatch({
    control: form.control,
    name: ["revitalized_tire_model_id", "brand_id"],
  });

  useEffect(() => {
    const revitalizedTireModelDepth = dependencies.revitalizedTireModels.find(
      (revitalizedTireModel: RevitalizedTireModelInput2) =>
        revitalizedTireModel.revitalized_tire_model_id.toString() ===
        revitalized_tire_model_id.toString(),
    );
    if (revitalizedTireModelDepth) {
      form.setValue("depth", revitalizedTireModelDepth.depth);
    }
  }, [revitalized_tire_model_id]);

  useEffect(() => {
    form.setValue("revitalized_tire_model_id", "");
    form.setValue("depth", 0);
  }, [brand_id]);

  return (
    <FormProvider {...form}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"code"}
            label={t("labels:code")}
          />
        </Grid>
        <Grid item xs={6}>
          {/* <FormSelectInput
            name={"rfid_id"}
            label={t("labels:rfid")}
          >
            {dependencies.rfids.map((rfid: RfidInput) => (
              <MenuItem
                key={rfid.rfid_id}
                value={rfid.rfid_id}
                disabled={rfid.status === 0}
              >
                {rfid.device_code}
              </MenuItem>
            ))}
          </FormSelectInput> */}
          <FormAutoComplete {...rfidFilterProps} options={dependencies.rfids} />
        </Grid>

        <Grid item xs={12}>
          {/* <FormSelectInput
            name={"warehouse_id"}
            label={t("labels:warehouse.singular")}
          >
            {dependencies.wareHouses.map((warehouse: WareHouseInput) => (
              <MenuItem
                key={warehouse.warehouse_id}
                value={warehouse.warehouse_id}
                disabled={warehouse.status === 0}
              >
                {`${warehouse.name} | ${warehouse.subsidiary.name}`}
              </MenuItem>
            ))}
          </FormSelectInput> */}
          <FormAutoComplete
            {...warehousesTireRevitalizedFilterProps}
            options={dependencies.wareHouses}
            labelExtractor={(warehouse: WareHouseInput) =>
              `${warehouse.name} | ${warehouse.subsidiary.name}`
            }
          />
        </Grid>

        <Grid item xs={12}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"price"}
            label={t("labels:price")}
            inputProps={{ type: "number" }}
          />
        </Grid>

        <Grid item xs={6}>
          {/* <FormSelectInput name={"brand_id"} label={t("common:brand")}>
            {brands.map((brand: BrandInput) => (
              <MenuItem
                key={brand.brand_id}
                value={brand.brand_id}
                disabled={brand.status === 0}
              >
                {brand.name}
              </MenuItem>
            ))}
          </FormSelectInput> */}
          <FormAutoComplete
            {...brandFilterProps}
            name="brand_id"
            options={brands}
            multiple={false}
          />
        </Grid>
        <Grid item xs={6}>
          <FormSelectInput
            name={"revitalized_tire_model_id"}
            label={t("labels:revitalized_tire_model_field.label")}
          >
            {dependencies.revitalizedTireModels.map(
              (revitalizedTireModel: RevitalizedTireModelInput2) => (
                <MenuItem
                  key={revitalizedTireModel.revitalized_tire_model_id}
                  value={revitalizedTireModel.revitalized_tire_model_id}
                  disabled={revitalizedTireModel.status === 0}
                >
                  {revitalizedTireModel.name}
                </MenuItem>
              ),
            )}
          </FormSelectInput>
        </Grid>

        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"expected_durability"}
            label={t("labels:expected_durability")}
            inputProps={{ type: "number" }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"depth"}
            label={t("labels:depth")}
            inputProps={{ type: "number" }}
          />
        </Grid>

        <Grid item xs={12}>
          <FormDateInput
            name={"date_return"}
            label={t("labels:invoice_date")}
          />
        </Grid>

        <Grid item xs={12}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"comment"}
            label={"Comentario"}
          />
        </Grid>

        <Grid item xs={6}>
          <FormDateInput
            name={"invoice_date"}
            label={t("labels:invoice_date")}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"invoice_folio"}
            label={t("labels:invoice_folio")}
          />
        </Grid>

        <Grid item xs={12}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"similar_tires"}
            label={t("labels:similar_tires")}
            inputProps={{ type: "number" }}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
