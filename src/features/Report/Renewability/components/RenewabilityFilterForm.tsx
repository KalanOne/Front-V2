import React, { useEffect } from "react";

import { Grid } from "@mui/material";

import { FormProvider, UseFormReturn, useWatch } from "react-hook-form";

import {
  brandFilterProps,
  companiesFilterProps,
  corporateFilterProps,
  modelsFilterProps,
  sizesFilterProps,
  subsidiariesFilterProps,
} from "src/components/filter/formFilterPropsUtils.ts";
import { FormAutoComplete } from "src/components/form/FormAutoComplete.tsx";

import { UseRenewabilityDependenciesReturns } from "../hooks/dependencies.tsx";
import { RenewabilityFilterSchemaType } from "../validation/filterRenewability.ts";

export { RenewabilityFilterForm };

interface RenewabilityFilterFormProps {
  form: UseFormReturn<RenewabilityFilterSchemaType>;
  dependencies: UseRenewabilityDependenciesReturns;
}
function RenewabilityFilterForm({
  form,
  dependencies,
}: RenewabilityFilterFormProps): React.ReactElement {
  const [corporate_id, companies, brands] = useWatch({
    control: form.control,
    name: ["corporate_id", "companies", "brands"],
  });

  useEffect(() => {
    form.setValue("companies", "");
    form.setValue("subsidiaries", "");
  }, [corporate_id]);

  useEffect(() => {
    form.setValue("subsidiaries", "");
  }, [companies]);

  useEffect(() => {
    form.setValue("models", "");
  }, [brands]);

  return (
    <FormProvider {...form}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {/* <FormSelectInput
            name={"corporate_id"}
            label={t("labels:corporate.singular")}
          >
            {dependencies.corporates.map(
              (corporate: CorporateInputResponse) => (
                <MenuItem
                  value={corporate.corporate_id}
                  key={corporate.corporate_id}
                >
                  {corporate.name}
                </MenuItem>
              ),
            )}
          </FormSelectInput> */}
          <FormAutoComplete
            {...corporateFilterProps}
            name={"corporate_id"}
            options={dependencies.corporates}
          />
        </Grid>
        <Grid item xs={12}>
          {/* <FormSelectInput
            name={"companies"}
            label={t("common:company")}
          >
            {dependencies.companies.map((company: CompanyInputResponse) => (
              <MenuItem value={company.company_id} key={company.company_id}>
                {company.name}
              </MenuItem>
            ))}
          </FormSelectInput> */}
          <FormAutoComplete
            {...companiesFilterProps}
            name={"companies"}
            options={dependencies.companies}
          />
        </Grid>
        <Grid item xs={12}>
          {/* <FormSelectInput
            name={"subsidiaries"}
            label={t("common:subsidiary")}
          >
            {dependencies.subsidiaries.map(
              (subsidiary: SubsidiaryInputResponse) => (
                <MenuItem
                  value={subsidiary.subsidiary_id}
                  key={subsidiary.subsidiary_id}
                >
                  {subsidiary.name}
                </MenuItem>
              ),
            )}
          </FormSelectInput> */}
          <FormAutoComplete
            {...subsidiariesFilterProps}
            options={dependencies.subsidiaries}
          />
        </Grid>
        <Grid item xs={12}>
          {/* <FormSelectInput name={"brands"} label={t("common:brand")}>
            {dependencies.brands.map((brand: BrandResponseInput) => (
              <MenuItem value={brand.brand_id} key={brand.brand_id}>
                {brand.name}
              </MenuItem>
            ))}
          </FormSelectInput> */}
          <FormAutoComplete
            {...brandFilterProps}
            options={dependencies.brands}
          />
        </Grid>
        <Grid item xs={12}>
          {/* <FormSelectInput
            name={"models"}
            label={t("common:model")}
          >
            {dependencies.models.map((model: ModelInputResponse) => (
              <MenuItem value={model.tire_model_id} key={model.tire_model_id}>
                {model.tire_model.name}
              </MenuItem>
            ))}
          </FormSelectInput> */}
          <FormAutoComplete
            {...modelsFilterProps}
            name={"models"}
            options={dependencies.models}
          />
        </Grid>
        <Grid item xs={12}>
          {/* <FormSelectInput
            name={"sizes"}
            label={t("common:size")}
            // multiple={true}
          >
            {dependencies.sizes.map((size: SizeResponseInput) => (
              <MenuItem value={size.tire_size_id} key={size.tire_size_id}>
                {size.size}
              </MenuItem>
            ))}
          </FormSelectInput> */}
          <FormAutoComplete
            {...sizesFilterProps}
            options={dependencies.sizes}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
