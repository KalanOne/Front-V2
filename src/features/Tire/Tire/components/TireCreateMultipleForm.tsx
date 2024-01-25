import React from "react";

import { Grid, MenuItem, Typography } from "@mui/material";

import {
  FormProvider,
  UseFieldArrayReturn,
  UseFormReturn,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FormSelectInput } from "src/components/form/FormSelectInput";
import { FormTextInput } from "src/components/form/FormTextInput";

import { UseTireDependenciesReturns } from "../hooks/dependecies";
import { RfidInput } from "../types/inputTypes";
import { TireCreateSchemaType } from "../validation/createTire";

export { TireCreateMultipleForm };

interface TireCreateMultipleFormProps {
  form: UseFormReturn<TireCreateSchemaType>;
  dependencies: UseTireDependenciesReturns;
  formArray: UseFieldArrayReturn;
}

function TireCreateMultipleForm({
  form,
  dependencies,
  formArray,
}: TireCreateMultipleFormProps): React.ReactElement {
  const { t } = useTranslation();
  return (
    <FormProvider {...form}>
      {formArray.fields.map((field, index) => {
        return (
          <React.Fragment key={field.id}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  display="block"
                  sx={{ mt: 2 }}
                >
                  {"NEUMÁTICO"} {index + 1}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <FormTextInput
                  sx={{ width: "100%" }}
                  name={`tires.${index}.code`}
                  label={t("labels:code")}
                />
              </Grid>
              <Grid item xs={4}>
                <FormSelectInput
                  name={`tires.${index}.rfid_id`}
                  label={t("labels:rfid")}
                >
                  {dependencies.rfids.map((rfid: RfidInput) => (
                    <MenuItem
                      key={rfid.rfid_id}
                      value={rfid.rfid_id}
                      disabled={rfid.status === 0}
                    >
                      {rfid.device_code}
                    </MenuItem>
                  ))}
                </FormSelectInput>
              </Grid>
              <Grid item xs={4}>
                <FormTextInput
                  sx={{ width: "100%" }}
                  name={`tires.${index}.dot`}
                  label={t("labels:dot")}
                />
              </Grid>
            </Grid>
          </React.Fragment>
        );
      })}
    </FormProvider>
  );
}

{
  /* <Button onClick={() => formArray.remove(index)}>-</Button>
            <Button
              onClick={() =>
                formArray.append({
                  code: "",
                  rfid_id: "",
                  dot: "",
                })
              }
            >
              Add
            </Button> */
}
