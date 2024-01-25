import React, { useEffect, useState } from "react";

import { Grid, MenuItem } from "@mui/material";

import { FormProvider, UseFormReturn, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
  companiesFilterProps,
  subsidiariesFilterProps,
  warehousesFilterProps,
} from "src/components/filter/formFilterPropsUtils";
import { FormAutoComplete } from "src/components/form/FormAutoComplete";
import { FormSelectInput } from "src/components/form/FormSelectInput";

import { UseTireSendDependenciesReturns } from "../hooks/dependenciesSend";
import { CompanyInput } from "../types/inputTypes";
import { TireSendSchemaType } from "../validation/sendTire";

export { TireSendForm };

interface TireSendFormProps {
  form: UseFormReturn<TireSendSchemaType>;
  dependencies: UseTireSendDependenciesReturns;
}

function TireSendForm({
  form,
  dependencies,
}: TireSendFormProps): React.ReactElement {
  const { t } = useTranslation();

  const [company_id] = useWatch({
    control: form.control,
    name: ["company_id"],
  });

  useEffect(() => {
    form.setValue("subsidiary_id", "");
    form.setValue("warehouse_id", "");
  }, [company_id]);

  return (
    <FormProvider {...form}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {/* <FormSelectInput
            name={"company_id"}
            label={t("common:company")}
          >
            {dependencies.companies.map((company: CompanyInput) => (
              <MenuItem
                key={company.company_id}
                value={company.company_id}
                disabled={company.status === 0}
              >
                {company.name}
              </MenuItem>
            ))}
          </FormSelectInput> */}
          <FormAutoComplete
            {...companiesFilterProps}
            name={"company_id"}
            options={dependencies.companies}
          />
        </Grid>
        <Grid item xs={12}>
          {/* <FormSelectInput
            name={"subsidiary_id"}
            label={t("common:subsidiary")}
          >
            {dependencies.subsidiaries.map((subsudiary: SubsidiaryInput) => (
              <MenuItem
                key={subsudiary.subsidiary_id}
                value={subsudiary.subsidiary_id}
                disabled={subsudiary.status === 0}
              >
                {subsudiary.name}
              </MenuItem>
            ))}
          </FormSelectInput> */}
          <FormAutoComplete
            {...subsidiariesFilterProps}
            name={"subsidiary_id"}
            options={dependencies.subsidiaries}
          />
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
      </Grid>
    </FormProvider>
  );
}
