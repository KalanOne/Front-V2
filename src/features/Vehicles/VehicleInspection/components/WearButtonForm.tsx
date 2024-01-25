import React from "react";

import { Divider, Grid, MenuItem, Typography } from "@mui/material";

import {
  FormProvider,
  UseFieldArrayReturn,
  UseFormReturn,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

import { AddButton } from "src/components/common/AddButton";
import { LabelAndText } from "src/components/common/LabelAndText";
import { RemoveButton } from "src/components/common/RemoveButton";
import { FormDateInput } from "src/components/form/FormDateInput";
import FormFileInput from "src/components/form/FormFileInput";
import { FormSelectInput } from "src/components/form/FormSelectInput";
import { FormTextInput } from "src/components/form/FormTextInput";
import { useButtonDependencies } from "src/features/Tire/Tire/hooks/dependenciesButtton";
import {
  DamageInput,
  ProviderInput,
  WearInput,
} from "src/features/Tire/Tire/types/inputTypes";

import { WearButtonSchemaType } from "../validation/wearButton";

export { WearButtonForm };

interface WearButtonFormProps {
  form: UseFormReturn<WearButtonSchemaType>;
  tire?: any;
  revitalizedButtonArrayForm: UseFieldArrayReturn;
}

function WearButtonForm({
  form,
  tire,
  revitalizedButtonArrayForm,
}: WearButtonFormProps): React.ReactElement {
  const { t } = useTranslation();
  const dependencies = useButtonDependencies();
  return (
    <FormProvider {...form}>
      <Grid container spacing={1}>
        {tire && (
          <>
            <Grid item xs={6}>
              <LabelAndText
                label={t("labels:tire_position")}
                text={
                  tire.cycle.movement_tire?.vehicle_tire[0]?.vehicle_type_axle_tire.position.toString() ||
                  "0"
                }
              ></LabelAndText>
            </Grid>
            <Grid item xs={6}>
              <LabelAndText
                label={t("labels:condition")}
                text={t(
                  `labels:tire_condition.options.${tire.cycle.tire_condition_id.toLowerCase()}`,
                )}
              ></LabelAndText>
            </Grid>

            <Grid item xs={4}>
              <LabelAndText
                label={t("labels:brand_field.label")}
                text={
                  tire.cycle.number_cycle > 0
                    ? tire.cycle.revitalized.brand.name
                    : tire.cycle.variation.tire_model.brand.name
                }
              ></LabelAndText>
            </Grid>
            <Grid item xs={4}>
              <LabelAndText
                label={t("labels:tire_model_field.label")}
                text={
                  tire.cycle.number_cycle > 0
                    ? tire.cycle.revitalized?.name
                    : tire.cycle.variation.tire_model.name
                }
              ></LabelAndText>
            </Grid>
            <Grid item xs={4}>
              <LabelAndText
                label={t("labels:size")}
                text={tire.cycle.variation.tire_size.size}
              ></LabelAndText>
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <Typography variant="body1">{t("labels:wear.plural")}</Typography>
        </Grid>
        <Grid item xs={12}>
          {revitalizedButtonArrayForm.fields.map((field, index) => {
            return (
              <React.Fragment key={field.id}>
                <Grid container spacing={1} sx={{ mt: 1 }}>
                  <Grid item xs={6}>
                    <FormSelectInput
                      name={`wears.${index}.wear_id`}
                      label={t("labels:wear.singular")}
                    >
                      {dependencies.wears.map((wear: WearInput) => (
                        <MenuItem
                          key={wear.wear_id}
                          value={wear.wear_id}
                          disabled={wear.status === 0}
                        >
                          {/* {wear.name} */}
                          {t(`damage:name.${wear.name}`)}
                        </MenuItem>
                      ))}
                    </FormSelectInput>
                  </Grid>
                  <Grid item xs={6}>
                    <FormTextInput
                      sx={{ width: "100%" }}
                      name={`wears.${index}.comment`}
                      label={"Comentario"}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormFileInput
                      placeholder={t("labels:excel_placeholder")}
                      name={`wears.${index}.image`}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {index > 0 && (
                      <RemoveButton
                        onClick={() => revitalizedButtonArrayForm.remove(index)}
                      />
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <Divider light sx={{ fontWeight: "bold", my: 1 }} />
                  </Grid>
                </Grid>
              </React.Fragment>
            );
          })}
          <AddButton
            onClick={() =>
              revitalizedButtonArrayForm.append({
                wear_id: "",
                comment: "",
                image: null,
              })
            }
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
