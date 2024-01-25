import React from "react";

import { Grid, MenuItem } from "@mui/material";

import { FormProvider, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { corporateFilterProps } from "src/components/filter/formFilterPropsUtils";
import { FormAutoComplete } from "src/components/form/FormAutoComplete";
import FormFileInput from "src/components/form/FormFileInput";
import { FormSelectInput } from "src/components/form/FormSelectInput";
import { FormTextInput } from "src/components/form/FormTextInput";

import { CorporateResponse } from "../../Corporate/types/corporateTypes";
import { CompanyUpdateSchemaType } from "../validation/updateCompany";

export { CompanyUpdateForm };

interface CompanyUpdateFormProps {
  form: UseFormReturn<CompanyUpdateSchemaType>;
  corporates: CorporateResponse[];
}

function CompanyUpdateForm({
  form,
  corporates,
}: CompanyUpdateFormProps): React.ReactElement {
  const { t } = useTranslation();
  return (
    <FormProvider {...form}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <FormFileInput
            placeholder={t("labels:placeholder.image")}
            name={"logo"}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"name"}
            label={t("labels:name.special")}
          />
        </Grid>
        <Grid item xs={6}>
          {/* <FormSelectInput name={"corporate_id"} label={"Corporativo"}>
            {corporates.map((corporate) => (
              <MenuItem
                key={corporate.corporate_id}
                value={corporate.corporate_id}
                disabled={corporate.status === 0}
              >
                {corporate.name}
              </MenuItem>
            ))}
          </FormSelectInput> */}
          <FormAutoComplete
            {...corporateFilterProps}
            name={"corporate_id"}
            options={corporates}
            getOptionDisabled={(option) => option.status === 0}
            multiple={false}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"social_reason"}
            label={t("labels:social_reason")}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"rfc"}
            label={t("labels:rfc")}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"tire_fee"}
            label={t("labels:tire_fee")}
            inputProps={{ type: "number" }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormSelectInput
            name={"fee_currency_type"}
            label={t("labels:fee_field.label")}
          >
            <MenuItem value="MXN">{t("labels:fee_field.options.mxn")}</MenuItem>
            <MenuItem value="USD">{t("labels:fee_field.options.usd")}</MenuItem>
            <MenuItem value="EUR">{t("labels:fee_field.options.eur")}</MenuItem>
          </FormSelectInput>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
