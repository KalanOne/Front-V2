import React, { useEffect } from "react";

import { Grid, MenuItem } from "@mui/material";

import { FormProvider, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FormSelectInput } from "src/components/form/FormSelectInput";
import { FormTextInput } from "src/components/form/FormTextInput";

import { ApplicationPolicyUpdateSchemaType } from "../validation/updateApplicationPolicy";

export { ApplicationPolicyUpdateForm };

interface ApplicationPolicyUpdateFormProps {
  form: UseFormReturn<ApplicationPolicyUpdateSchemaType>;
  tireApplications: any[];
}

function ApplicationPolicyUpdateForm({
  form,
  tireApplications,
}: ApplicationPolicyUpdateFormProps): React.ReactElement {
  const { t } = useTranslation();
  useEffect(() => {
    if (tireApplications.length > 0) {
      // console.log(tireApplications);
    }
  }, [tireApplications]);
  return (
    <FormProvider {...form}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <FormSelectInput
            name={"tire_application_id"}
            label={t("labels:depth_tolerance_policies.tire_application_id")}
            disabled
          >
            {tireApplications.map((tireApplication: any) => (
              <MenuItem
                key={tireApplication.tire_application_id}
                value={tireApplication.tire_application_id}
              >
                {tireApplication.tire_application_id}
              </MenuItem>
            ))}
          </FormSelectInput>
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"maximum_number_patches"}
            label={t("labels:depth_tolerance_policies.maximum_number_patches")}
            inputProps={{type:"number"}}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"critical_number_patches"}
            label={t("labels:depth_tolerance_policies.critical_number_patches")}
            inputProps={{type:"number"}}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"good_condition"}
            label={t("labels:depth_tolerance_policies.good_condition")}
            inputProps={{type:"number"}}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"scheduled_withdrawal"}
            label={t("labels:depth_tolerance_policies.scheduled_withdrawal")}
            inputProps={{type:"number"}}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"critical_withdrawal"}
            label={t("labels:depth_tolerance_policies.critical_withdrawal")}
            inputProps={{type:"number"}}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
