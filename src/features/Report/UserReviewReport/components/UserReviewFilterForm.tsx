import React, { useEffect } from "react";

import { Grid, MenuItem } from "@mui/material";

import { FormProvider, UseFormReturn, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
  activityFilterProps,
  reviewTypeFilterProps,
} from "src/components/filter/formFilterPropsUtils.ts";
import { FormAutoComplete } from "src/components/form/FormAutoComplete.tsx";
import { FormDateInput } from "src/components/form/FormDateInput.tsx";
import { FormSelectInput } from "src/components/form/FormSelectInput.tsx";

import { UseUserReviewDependenciesReturns } from "../hooks/dependencies.tsx";
import {
  CompanyInputResponse,
  CorporateInputResponse,
  DivisionResponseInput,
  SubsidiaryInputResponse,
  UserInputResponse,
} from "../types/inputTypes.ts";
import { UserReviewFilterSchemaType } from "../validation/filterUserReview.ts";

export { UserReviewFilterForm };

interface UserReviewFilterFormProps {
  form: UseFormReturn<UserReviewFilterSchemaType>;
  dependencies: UseUserReviewDependenciesReturns;
}
function UserReviewFilterForm({
  form,
  dependencies,
}: UserReviewFilterFormProps): React.ReactElement {
  const { t } = useTranslation();

  const [corporate_id, companies] = useWatch({
    control: form.control,
    name: ["corporate_id", "companies"],
  });

  useEffect(() => {
    form.setValue("companies", []);
    form.setValue("subsidiaries", []);
  }, [corporate_id]);

  useEffect(() => {
    form.setValue("subsidiaries", []);
  }, [companies]);

  return (
    <FormProvider {...form}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormDateInput name={"dateFrom"} label={"Desde"} />
        </Grid>
        <Grid item xs={12}>
          <FormDateInput name={"dateTo"} label={"Hasta"} />
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
          <FormSelectInput
            name={"companies"}
            label={t("common:company")}
            multiple
          >
            {dependencies.companies.map((company: CompanyInputResponse) => (
              <MenuItem value={company.company_id} key={company.company_id}>
                {company.name}
              </MenuItem>
            ))}
          </FormSelectInput>
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
        <Grid item xs={12}>
          <FormSelectInput
            name={"users"}
            label={t("labels:user.plural")}
            multiple
          >
            {dependencies.users.map((user: UserInputResponse) => (
              <MenuItem value={user.user_id} key={user.user_id}>
                {user.name}
                {" " + user.last_name_1}
                {" " + user.last_name_2}
              </MenuItem>
            ))}
          </FormSelectInput>
        </Grid>
        <Grid item xs={12}>
          <FormSelectInput
            name={"divisions"}
            label={t("common:division")}
            multiple
          >
            {dependencies.divisions.map((divisions: DivisionResponseInput) => (
              <MenuItem
                value={divisions.division_id}
                key={divisions.division_id}
              >
                {divisions.name}
              </MenuItem>
            ))}
          </FormSelectInput>
        </Grid>
        <Grid item xs={12}>
          {/* <FormSelectInput name={"activity"} label={"Descartar revisiones"}>
            <MenuItem value={"GENERAL"}>
              {"Descartar montajes y desmontajes"}
            </MenuItem>
            <MenuItem value={"GENERAL,MOUNT"}>
              {"Descartar desmontajes"}
            </MenuItem>
          </FormSelectInput> */}
          <FormAutoComplete {...activityFilterProps} />
        </Grid>
        <Grid item xs={12}>
          {/* <FormSelectInput name={"review_type"} label={"Tipo de revisión"}>
            <MenuItem value={"COMPLETE"}>
              {t("labels:review_type.options.complete")}
            </MenuItem>
            <MenuItem value={"PRESSURE"}>
              {t("labels:review_type.options.pressure")}
            </MenuItem>
            <MenuItem value={"IDENTIFY"}>
              {t("labels:review_type.options.identify")}
            </MenuItem>
            <MenuItem value={"DAMAGE AND WEAR"}>
              {t("labels:review_type.options.damage_and_wear")}
            </MenuItem>
            <MenuItem value={"MOUNT/DISMOUNT"}>
              {t("labels:review_type.options.mount_dismount")}
            </MenuItem>
            <MenuItem value={"ROTATION"}>
              {t("labels:review_type.options.rotation")}
            </MenuItem>
            <MenuItem value={"INITIAL"}>
              {t("labels:review_type.options.initial")}
            </MenuItem>
            <MenuItem value={"PARTIAL"}>
              {t("labels:review_type.options.partial")}
            </MenuItem>
          </FormSelectInput> */}
          <FormAutoComplete {...reviewTypeFilterProps} />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
