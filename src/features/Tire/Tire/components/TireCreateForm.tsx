import React, { useEffect, useState } from "react";

import { Grid, MenuItem } from "@mui/material";

import { FormProvider, UseFormReturn, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
  brandFilterProps,
  modelsFilterProps,
  providersFilterProps,
  subsidiariesFilterProps,
  variationsFilterProps,
  warehousesFilterProps,
} from "src/components/filter/formFilterPropsUtils";
import { FormAutoComplete } from "src/components/form/FormAutoComplete";
import { FormDateInput } from "src/components/form/FormDateInput";
import { FormSelectInput } from "src/components/form/FormSelectInput";
import { FormTextInput } from "src/components/form/FormTextInput";
import { alphabeticalSort } from "src/utils/sort";

import { UseTireDependenciesReturns } from "../hooks/dependecies";
import { RfidInput, TireModelInput } from "../types/inputTypes";
import { TireCreateSchemaType } from "../validation/createTire";

export { TireCreateForm };

interface TireCreateFormProps {
  form: UseFormReturn<TireCreateSchemaType>;
  dependencies: UseTireDependenciesReturns;
}

function TireCreateForm({
  form,
  dependencies,
}: TireCreateFormProps): React.ReactElement {
  const { t } = useTranslation();
  const [tireModels, setTireModels] = useState<TireModelInput[]>([]);

  const [brand_id] = useWatch({ control: form.control, name: ["brand_id"] });

  const brands = dependencies.brands
    .filter((brand) => brand.brand_type === "TIRE")
    .sort(alphabeticalSort("name"));

  useEffect(() => {
    form.setValue("model_id", "");
    form.setValue("tire_model_variation_id", "");
    const tireModelsBrand = dependencies.tireModels
      .filter((model) => model.tire_model.brand_id.toString() == brand_id)
      .sort(alphabeticalSort("tire_model.name"));
    setTireModels(tireModelsBrand);
  }, [brand_id]);

  return (
    <FormProvider {...form}>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"code"}
            label={t("labels:code")}
          />
        </Grid>
        <Grid item xs={4}>
          <FormSelectInput name={"rfid_id"} label={t("labels:rfid")}>
            {dependencies.rfids.map((rfid: RfidInput) => (
              <MenuItem
                key={rfid.rfid_id}
                value={rfid.rfid_id}
                disabled={rfid.status === 0}
              >
                {rfid.device_code}
              </MenuItem>
            ))}
          </FormSelectInput>
        </Grid>
        <Grid item xs={4}>
          {/* <FormSelectInput name={"subsidiary_id"} label={"Sucursal"}>
            {dependencies.subsidiaries.map((subsidiary: SubsidiaryInput) => (
              <MenuItem
                key={subsidiary.subsidiary_id}
                value={subsidiary.subsidiary_id}
                disabled={subsidiary.status === 0}
              >
                {subsidiary.name}
              </MenuItem>
            ))}
          </FormSelectInput> */}
          <FormAutoComplete
            {...subsidiariesFilterProps}
            name={"subsidiary_id"}
            options={dependencies.subsidiaries}
          />
        </Grid>

        <Grid item xs={4}>
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
                {warehouse.name}
              </MenuItem>
            ))}
          </FormSelectInput> */}
          <FormAutoComplete
            {...warehousesFilterProps}
            name={"warehouse_id"}
            options={dependencies.wareHouses}
          />
        </Grid>
        <Grid item xs={4}>
          {/* <FormSelectInput name={"provider_id"} label={t("labels:provider")}>
            {dependencies.providers.map((provider: ProviderInput) => (
              <MenuItem
                key={provider.provider_id}
                value={provider.provider_id}
                disabled={provider.status === 0}
              >
                {provider.name}
              </MenuItem>
            ))}
          </FormSelectInput> */}
          <FormAutoComplete
            {...providersFilterProps}
            name={"provider_id"}
            options={dependencies.providers}
          />
        </Grid>
        <Grid item xs={4}>
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
          {/* <FormSelectInput
            name={"model_id"}
            label={t("common:model")}
          >
            {tireModels.map((tireModel: TireModelInput) => (
              <MenuItem
                key={tireModel.tire_model_id}
                value={tireModel.tire_model_id}
                disabled={tireModel.tire_model.status === 0}
              >
                {tireModel.tire_model.name}
              </MenuItem>
            ))}
          </FormSelectInput> */}
          <FormAutoComplete
            {...modelsFilterProps}
            name={"model_id"}
            options={tireModels}
          />
        </Grid>
        <Grid item xs={6}>
          {/* <FormSelectInput
            name={"tire_model_variation_id"}
            label={t("labels:tire_model_variation_field.label")}
          >
            {dependencies.tireModelVariations.map(
              (tireModelVariation: VariationInput) => (
                <MenuItem
                  key={tireModelVariation.tire_model_variation_id}
                  value={tireModelVariation.tire_model_variation_id}
                  disabled={tireModelVariation.status === 0}
                >
                  {tireModelVariation.tire_size.size}{" "}
                  {tireModelVariation.number_layers}
                </MenuItem>
              ),
            )}
          </FormSelectInput> */}
          <FormAutoComplete
            {...variationsFilterProps}
            options={dependencies.tireModelVariations}
            labelExtractor={(option) =>
              `${option.tire_size.size} ${option.number_layers}`
            }
          />
        </Grid>

        <Grid item xs={4}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"price"}
            label={t("labels:price")}
            inputProps={{ type: "number" }}
          />
        </Grid>
        <Grid item xs={4}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"expected_durability"}
            label={t("labels:expected_durability")}
            inputProps={{ type: "number" }}
          />
        </Grid>
        <Grid item xs={4}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"dot"}
            label={t("labels:dot")}
          />
        </Grid>

        <Grid item xs={4}>
          <FormDateInput
            name={"invoice_date"}
            label={t("labels:invoice_date")}
          />
        </Grid>
        <Grid item xs={4}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"invoice_folio"}
            label={t("labels:invoice_folio")}
          />
        </Grid>
        <Grid item xs={4}>
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
