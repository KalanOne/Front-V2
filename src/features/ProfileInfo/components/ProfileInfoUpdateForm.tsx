import { Grid } from "@mui/material";

import { FormProvider, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FormAutoComplete } from "src/components/form/FormAutoComplete";
import { languageUpdateProps } from "src/components/filter/formFilterPropsUtils";
import { FormTextInput } from "src/components/form/FormTextInput";

import { ProfileInfoUpdateSchemaType } from "../validation/updateProfileInfo";

export { ProfileInfoUpdateForm };

interface ProfileInfoUpdateFormProps {
  form: UseFormReturn<ProfileInfoUpdateSchemaType>;
}

function ProfileInfoUpdateForm({
  form,
}: ProfileInfoUpdateFormProps): React.ReactElement {
  const { t } = useTranslation();
  return (
    <FormProvider {...form}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"password"}
            label={t("labels:password")}
            inputProps={{ type: "password" }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"passwordConfirmation"}
            label={t("features:profileInfo.form.labels.confirm_pass")}
            inputProps={{ type: "password" }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormAutoComplete {...languageUpdateProps} />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
