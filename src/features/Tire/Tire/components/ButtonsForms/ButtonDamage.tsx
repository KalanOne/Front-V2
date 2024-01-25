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
import FormFileInput from "src/components/form/FormFileInput";
import { FormSelectInput } from "src/components/form/FormSelectInput";
import { FormTextInput } from "src/components/form/FormTextInput";

import { useButtonDependencies } from "../../hooks/dependenciesButtton";
import { DamageInput } from "../../types/inputTypes";
import { TireResponse } from "../../types/tireTypes";
import { DamageButtonSchemaType } from "../../validation/damageButton";

export { DamageButtonForm };

interface DamageButtonFormProps {
  form: UseFormReturn<DamageButtonSchemaType>;
  tire?: TireResponse;
  damageButtonArrayForm: UseFieldArrayReturn;
}

function DamageButtonForm({
  form,
  tire,
  damageButtonArrayForm,
}: DamageButtonFormProps): React.ReactElement {
  const { t } = useTranslation();
  const dependencies = useButtonDependencies();
  return (
    <FormProvider {...form}>
      <Grid container spacing={1}>
        {tire && (
          <>
            <Grid item xs={6}>
              <LabelAndText
                label={t("labels:code")}
                text={tire.code || "-"}
              ></LabelAndText>
            </Grid>
            <Grid item xs={6}>
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
          <Typography variant="body1">
            {t("common:damage", { context: "plural" })}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {damageButtonArrayForm.fields.map((field, index) => {
            return (
              <React.Fragment key={field.id}>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <FormSelectInput
                      name={`damages.${index}.damage_id`}
                      label={t("common:damage")}
                    >
                      {dependencies.damages.map((damage: DamageInput) => (
                        <MenuItem
                          key={damage.damage_id}
                          value={damage.damage_id}
                          disabled={damage.status === 0}
                        >
                          {t(`damage:damage.name.${damage.name}`)}
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
                      placeholder={t("labels:placeholder.image")}
                      name={`damages.${index}.image`}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {index > 0 && (
                      <RemoveButton
                        onClick={() => damageButtonArrayForm.remove(index)}
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
              damageButtonArrayForm.append({
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
