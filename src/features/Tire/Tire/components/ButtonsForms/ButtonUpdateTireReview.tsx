import React, { useEffect } from "react";

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

import { UseUpdateTireReviewDependenciesReturns } from "../../hooks/dependenciesUpdateTireReview";
import { TireResponse } from "../../types/tireTypes";
import { UpdateTireReviewButtonSchemaType } from "../../validation/updateTireReview";

export { UpdateTireReviewButtonForm };

interface UpdateTireReviewButtonFormProps {
  form: UseFormReturn<UpdateTireReviewButtonSchemaType>;
  tire?: TireResponse;
  dependencies?: UseUpdateTireReviewDependenciesReturns;
  updateTireReviewArrayForm: UseFieldArrayReturn;
  onGetTireReviewId: (reviewId: string) => void;
}

function UpdateTireReviewButtonForm({
  form,
  tire,
  dependencies,
  updateTireReviewArrayForm,
  onGetTireReviewId,
}: UpdateTireReviewButtonFormProps): React.ReactElement {
  const { t } = useTranslation();

  useEffect(() => {
    if (dependencies?.review) {
      form.setValue(
        "comment",
        dependencies.review.comment === null ? "" : dependencies.review.comment,
      );
      form.setValue(
        "pressure",
        dependencies.review.pressure === ""
          ? 0
          : Number(dependencies.review.pressure),
      );
      updateTireReviewArrayForm.replace([]);
      dependencies.review.tire_review_depth_line.tire_review_depth.map(
        (depth) => {
          updateTireReviewArrayForm.append({
            depth_external: depth.depth_external,
            depth_internal: depth.depth_internal,
            depth_middle: depth.depth_middle,
          });
        },
      );
      onGetTireReviewId(dependencies.review.tire_review_id.toString());
    }
  }, [dependencies?.review]);

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
                text={
                  tire.cycle.movement_tire?.vehicle_tire[0]?.vehicle_type_axle_tire.position.toString() ||
                  "0"
                }
              ></LabelAndText>
            </Grid>
            <Grid item xs={4}>
              <LabelAndText
                label={"Condicion"}
                text={tire.cycle.tire_condition_id || "-"}
              ></LabelAndText>
            </Grid>

            <Grid item xs={4}>
              <LabelAndText
                label={t("common:brand")}
                text={tire.cycle.variation.tire_model.brand.name}
              ></LabelAndText>
            </Grid>
            <Grid item xs={4}>
              <LabelAndText
                label={t("common:model")}
                text={tire.cycle.variation.tire_model.name}
              ></LabelAndText>
            </Grid>
            <Grid item xs={4}>
              <LabelAndText
                label={t("common:size")}
                text={`${tire.cycle.variation.tire_size.size}`}
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
