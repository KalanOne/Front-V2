import React from "react";

import { Grid } from "@mui/material";

import { FormProvider, UseFormReturn, useWatch } from "react-hook-form";

import FormStatus from "src/components/filter/FormStatus.tsx";
import {
  brandFilterProps,
  brandRevilatizedFilterProps,
  conditionFilterProps,
  dateDOTFinalFilterProps,
  dateDOTInitialFilterProps,
  dateFromFilterProps,
  dateToFilterProps,
  locationFilterProps,
  modelRevitalizedFilterProps,
  modelsFilterProps,
  providersFilterProps,
  sizesFilterProps,
  subsidiariesFilterProps,
  vehiclesFilterProps,
  warehousesFilterProps,
} from "src/components/filter/formFilterPropsUtils.ts";
// import { useTranslation } from "react-i18next";
import { FormAutoComplete } from "src/components/form/FormAutoComplete.tsx";
import { FormDateInput } from "src/components/form/FormDateInput.tsx";
import { FormTextInput } from "src/components/form/FormTextInput.tsx";

import { useFilterTireDependencies } from "../hooks/dependenciesFilter.tsx";
import { TireFilterSchemaType } from "../validation/filterTire.ts";

export { TireFilterForm };

interface TireFilterFormProps {
  form: UseFormReturn<TireFilterSchemaType>;
}

function TireFilterForm({ form }: TireFilterFormProps): React.ReactElement {
  // const { t } = useTranslation();
  const [brands, brandsRevitalized] = useWatch({
    control: form.control,
    name: ["brands", "brandsRevitalized"],
  });

  const dependencies = useFilterTireDependencies({
    brand: brands,
    brandRetread: brandsRevitalized,
  });

  return (
    <FormProvider {...form}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormStatus label={"ESTATUS DE LA ALERTA"} />
        </Grid>
        <Grid item xs={6}>
          <FormDateInput {...dateFromFilterProps} />
        </Grid>
        <Grid item xs={6}>
          <FormDateInput {...dateToFilterProps} />
        </Grid>
        <Grid item xs={6}>
          <FormAutoComplete
            {...brandFilterProps}
            options={dependencies.brands ?? []}
            multiple={true}
          />
        </Grid>
        <Grid item xs={6}>
          <FormAutoComplete
            {...modelsFilterProps}
            options={dependencies.models ?? []}
            multiple={false}
          />
        </Grid>
        <Grid item xs={6}>
          <FormAutoComplete
            {...brandRevilatizedFilterProps}
            options={dependencies.brandsRetread ?? []}
            multiple={false}
            label={"Marca revitalizada"}
          />
        </Grid>
        <Grid item xs={6}>
          <FormAutoComplete
            {...modelRevitalizedFilterProps}
            options={dependencies.modelsRevitalized ?? []}
            multiple={false}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"invoice_folio"}
            label={"Folio de factura"}
          />
        </Grid>
        <Grid item xs={6}>
          <FormDateInput name={"invoice_date"} label={"Fecha de factura"} />
        </Grid>
        <Grid item xs={6}>
          <FormDateInput {...dateDOTInitialFilterProps} />
        </Grid>
        <Grid item xs={6}>
          <FormDateInput {...dateDOTFinalFilterProps} />
        </Grid>
        <Grid item xs={6}>
          <FormAutoComplete
            {...sizesFilterProps}
            multiple={false}
            options={dependencies.sizes ?? []}
          />
        </Grid>
        <Grid item xs={6}>
          <FormAutoComplete
            {...providersFilterProps}
            multiple={false}
            options={dependencies.providers ?? []}
          />
        </Grid>
        <Grid item xs={6}>
          <FormAutoComplete
            {...subsidiariesFilterProps}
            multiple={false}
            options={dependencies.subsidiaries ?? []}
          />
        </Grid>
        <Grid item xs={6}>
          <FormAutoComplete
            {...warehousesFilterProps}
            multiple={false}
            options={dependencies.warehouses ?? []}
          />
        </Grid>
        <Grid item xs={6}>
          <FormAutoComplete
            {...vehiclesFilterProps}
            multiple={false}
            options={dependencies.vehicles ?? []}
          />
        </Grid>
        <Grid item xs={6}>
          <FormAutoComplete {...conditionFilterProps} />
        </Grid>
        <Grid item xs={12}>
          <FormAutoComplete {...locationFilterProps} />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
