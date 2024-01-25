import React from "react";

import { Grid } from "@mui/material";

import { FormProvider, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FormAutoComplete } from "src/components/form/FormAutoComplete";
import { alphabeticalSort } from "src/utils/sort.ts";

import { TireLinkResponse } from "../types/rfidTypes";
import { RfidLinkSchemaType } from "../validation/linkRfid";

export { RfidLinkForm };

// TODO: Virtualize the list of tires
// TODO resolved: Virtualize the list of tires

interface RfidLinkFormProps {
  form: UseFormReturn<RfidLinkSchemaType>;
  tires: TireLinkResponse[];
}

function RfidLinkForm({ form, tires }: RfidLinkFormProps): React.ReactElement {
  const { t } = useTranslation();
  tires = tires.sort(alphabeticalSort("code"));
  return (
    <FormProvider {...form}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <FormAutoComplete
            name={"tire_id"}
            label={t("general:tire")}
            labelExtractor={(size: TireLinkResponse) => size.code}
            valueExtractor={(size: TireLinkResponse) => size.tire_id}
            options={tires}
            multiple={false}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
