import React from "react";

import { FormLabel, Grid } from "@mui/material";

import { FormProvider, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import FormStatus from "src/components/filter/FormStatus.tsx";
import { subsidiariesFilterProps } from "src/components/filter/formFilterPropsUtils.ts";
import { FormAutoComplete } from "src/components/form/FormAutoComplete.tsx";
import { SubsidiaryInputResponse } from "src/features/Report/Renewability/types/inputsTypes.ts";

import { WareHouseFilterSchemaType } from "../validation/filterWareHouse.ts";

export { WareHouseFilterForm };

interface WareHouseFilterFormProps {
  form: UseFormReturn<WareHouseFilterSchemaType>;
  subsidiaries: SubsidiaryInputResponse[];
}

function WareHouseFilterForm({
  form,
  subsidiaries,
}: WareHouseFilterFormProps): React.ReactElement {
  const { t } = useTranslation();
  return (
    <FormProvider {...form}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormStatus label={t("titles:filter.status.warehouse")} />
        </Grid>
        <Grid item xs={12}>
          <FormAutoComplete
            {...subsidiariesFilterProps}
            options={subsidiaries}
            multiple={true}
            name={"subsidiary_id"}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
