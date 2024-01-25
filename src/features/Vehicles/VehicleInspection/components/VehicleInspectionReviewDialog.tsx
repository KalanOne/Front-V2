import React from "react";

import { Divider, Grid, Typography } from "@mui/material";

import {
  FormProvider,
  UseFieldArrayReturn,
  UseFormReturn,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

import { AddButton } from "src/components/common/AddButton";
import { LabelAndText } from "src/components/common/LabelAndText";
import { RemoveButton } from "src/components/common/RemoveButton";
import { FormTextInput } from "src/components/form/FormTextInput";
import { UpdateTireReviewButtonSchemaType } from "src/features/Tire/Tire/validation/updateTireReview";

export { VehicleInspectionReviewDialog };

interface VehicleInspectionReviewDialogProps {
  form: UseFormReturn<UpdateTireReviewButtonSchemaType>;
  tire?: any;
  updateTireReviewArrayForm: UseFieldArrayReturn;
}

function VehicleInspectionReviewDialog({
  form,
  tire,
  updateTireReviewArrayForm,
}: VehicleInspectionReviewDialogProps) {
  const { t } = useTranslation();

  return (
    <FormProvider {...form}>
      <Grid container spacing={1}>
        {tire && (
          <>
            <Grid item xs={4}>
              <LabelAndText
                label={t("labels:code")}
                text={tire.code || "-"}
              ></LabelAndText>
            </Grid>
            <Grid item xs={4}>
              <LabelAndText
                label={t("labels:tire_position")}
                text={tire.cycle?.movement_tire.vehicle_tire[0].vehicle_type_axle_tire.vehicle_type_axle.axle_number.toString()}
              ></LabelAndText>
            </Grid>
            <Grid item xs={4}>
              <LabelAndText
                label={"Condicion"}
                text={tire.cycle?.tire_condition_id}
              ></LabelAndText>
            </Grid>

            <Grid item xs={4}>
              <LabelAndText
                label={t("labels:brand_field.label")}
                text={tire.cycle?.variation.tire_model.brand.name || "- -"}
              ></LabelAndText>
            </Grid>
            <Grid item xs={4}>
              <LabelAndText
                label={t("labels:tire_model_field.label")}
                text={tire.cycle?.variation.tire_model.name || "- -"}
              ></LabelAndText>
            </Grid>
            <Grid item xs={4}>
              <LabelAndText
                label={t("labels:size")}
                text={tire.cycle?.variation.tire_size.size || "- -"}
              ></LabelAndText>
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"pressure"}
            label={t("labels:pressure")}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="caption"
            color="textSecondary"
            display="block"
            sx={{ mt: 2 }}
          >
            {t("labels:depths")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {updateTireReviewArrayForm.fields.map((field, index) => {
            return (
              <React.Fragment key={field.id}>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <FormTextInput
                      sx={{ width: "100%" }}
                      name={`depth.${index}.depth_external`}
                      label={t("labels:depth_external")}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormTextInput
                      sx={{ width: "100%" }}
                      name={`depth.${index}.depth_middle`}
                      label={t("labels:depth_middle")}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormTextInput
                      sx={{ width: "100%" }}
                      name={`depth.${index}.depth_internal`}
                      label={t("labels:depth_internal")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      display="block"
                    >
                      {t("labels:line") + " " + (index + 1)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider light sx={{ fontWeight: "bold", my: 1 }} />
                  </Grid>
                </Grid>
              </React.Fragment>
            );
          })}
          {updateTireReviewArrayForm.fields.length - 1 > 0 && (
            <RemoveButton
              onClick={() =>
                updateTireReviewArrayForm.remove(
                  updateTireReviewArrayForm.fields.length - 1,
                )
              }
            />
          )}
          <AddButton
            onClick={() =>
              updateTireReviewArrayForm.append({
                depth_external: 0,
                depth_internal: 0,
                depth_middle: 0,
              })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"comment"}
            label={t("labels:observation")}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
