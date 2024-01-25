import React from "react";

import { Grid, Typography } from "@mui/material";
import { Divider, MenuItem } from "@mui/material";

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
} from "src/features/Tire/Tire/types/inputTypes";

import { DamageButtonSchemaType } from "../validation/damageButton";

export { VehicleInspectionDamage };

interface VehicleInspectionDamageProps {
  form: UseFormReturn<DamageButtonSchemaType>;
  tire?: any;
  revitalizedButtonArray2Form: UseFieldArrayReturn;
}

function VehicleInspectionDamage({
  form,
  tire,
  revitalizedButtonArray2Form,
}: VehicleInspectionDamageProps): React.ReactElement {
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
          <Typography variant="body1">{t("labels:damage.plural")}</Typography>
        </Grid>
        <Grid item xs={12}>
          {revitalizedButtonArray2Form.fields.map((field, index) => {
            return (
              <React.Fragment key={field.id}>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <FormSelectInput
                      name={`damages.${index}.damage_id`}
                      label={t("labels:damage.singular")}
                    >
                      {dependencies.damages.map((damage: DamageInput) => (
                        <MenuItem
                          key={damage.damage_id}
                          value={damage.damage_id}
                          disabled={damage.status === 0}
                        >
                          {/* {damage.name} */}
                          {t(`damage:name.${damage.name}`)}
                        </MenuItem>
                      ))}
                    </FormSelectInput>
                  </Grid>
                  <Grid item xs={6}>
                    <FormTextInput
                      sx={{ width: "100%" }}
                      name={`damages.${index}.comment`}
                      label={"Comentario"}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormFileInput
                      placeholder={t("labels:excel_placeholder")}
                      name={`damages.${index}.image`}
                    />
                  </Grid>
                  {revitalizedButtonArray2Form.fields.length > 1 && (
                    <Grid item xs={12}>
                      <RemoveButton
                        onClick={() =>
                          revitalizedButtonArray2Form.remove(index)
                        }
                      />
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <Divider light sx={{ fontWeight: "bold", my: 1 }} />
                  </Grid>
                </Grid>
              </React.Fragment>
            );
          })}
          <AddButton
            onClick={() =>
              revitalizedButtonArray2Form.append({
                damage_id: "",
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
