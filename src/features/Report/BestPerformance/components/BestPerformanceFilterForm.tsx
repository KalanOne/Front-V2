import React, { useEffect } from "react";

import { FormLabel, Grid, MenuItem } from "@mui/material";

import { FormProvider, UseFormReturn, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
  companiesFilterProps,
  conditionFilterProps,
  movementFilterProps,
} from "src/components/filter/formFilterPropsUtils.ts";
import { FormAutoComplete } from "src/components/form/FormAutoComplete.tsx";
import { FormDateInput } from "src/components/form/FormDateInput.tsx";
import { FormSelectInput } from "src/components/form/FormSelectInput.tsx";
import { FormTextInput } from "src/components/form/FormTextInput.tsx";

import {
  CompanyInputResponse,
  CorporateInputResponse,
  SubsidiaryInputResponse,
} from "../../Renewability/types/inputsTypes.ts";
import { UseBestPerformanceDependenciesReturns } from "../hooks/dependencies.tsx";
import { BestPerformanceFilterSchemaType } from "../validation/filterBestPerformance.ts";

export { BestPerformanceFilterForm };

interface BestPerformanceFilterFormProps {
  form: UseFormReturn<BestPerformanceFilterSchemaType>;
  dependencies: UseBestPerformanceDependenciesReturns;
}
function BestPerformanceFilterForm({
  form,
  dependencies,
}: BestPerformanceFilterFormProps): React.ReactElement {
  const { t } = useTranslation();
  const [corporate_id, companies] = useWatch({
    control: form.control,
    name: ["corporate_id", "companies"],
  });

  useEffect(() => {
    form.setValue("companies", "");
    form.setValue("subsidiaries", []);
  }, [corporate_id]);

  useEffect(() => {
    form.setValue("subsidiaries", []);
  }, [companies]);

  return (
    <FormProvider {...form}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormLabel>Rango de Fechas</FormLabel>
        </Grid>
        <Grid item xs={6}>
          <FormDateInput name={"date_from"} label={"Desde"} />
        </Grid>
        <Grid item xs={6}>
          <FormDateInput name={"date_to"} label={"Hasta"} />
        </Grid>
        <Grid item xs={12}>
          {/* <FormSelectInput name={"movement"} label={"Ubicación"}>
            <MenuItem value={"BOTH"}>Ambas (Almacenadas y Montadas)</MenuItem>
            <MenuItem value={"WAREHOUSE"}>Almacén</MenuItem>
            <MenuItem value={"MOUNT"}>Montadas</MenuItem>
            <MenuItem value={"PILE"}>Pila</MenuItem>
          </FormSelectInput> */}
          <FormAutoComplete {...movementFilterProps} />
        </Grid>
        <Grid item xs={12}>
          <FormSelectInput name={"corporate_id"} label={t("common:corporate")}>
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
          </FormSelectInput>
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
          <FormSelectInput
            name={"subsidiaries"}
            label={t("common:subsidiary")}
            multiple
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
          </FormSelectInput>
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"min_travel"}
            label={"Km mínimo"}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"max_travel"}
            label={"Km máximo"}
          />
        </Grid>
        <Grid item xs={6}>
          {/* <FormSelectInput name={"tire_condition"} label={"Condición"} multiple>
            <MenuItem value={"ORIGINAL_NEW"}>Original Nueva</MenuItem>
            <MenuItem value={"ORIGINAL_USED"}>Original Usada</MenuItem>
            <MenuItem value={"RETREAD_NEW"}>Renovada Nueva</MenuItem>
            <MenuItem value={"RETREAD_USED"}>Renovada Usada</MenuItem>
          </FormSelectInput> */}
          <FormAutoComplete {...conditionFilterProps} name={"tire_condition"} />
        </Grid>
        <Grid item xs={6}>
          <FormSelectInput
            name="tire_application"
            label={t("labels:tire_application.label.singular")}
            multiple={true}
          >
            <MenuItem value="ALL_POSITION">
              {t("labels:tire_application.options.all_position")}
            </MenuItem>
            <MenuItem value="DIRECTIONAL">
              {t("labels:tire_application.options.directional")}
            </MenuItem>
            <MenuItem value="TRACTION">
              {t("labels:tire_application.options.traction")}
            </MenuItem>
            <MenuItem value="TRAILER">
              {t("labels:tire_application.options.trailer")}
            </MenuItem>
          </FormSelectInput>
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"price"}
            label={"Precio"}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"helmet_value"}
            label={"Valor del casco"}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
