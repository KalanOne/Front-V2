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
import { providersFilterProps } from "src/components/filter/formFilterPropsUtils";
import { FormAutoComplete } from "src/components/form/FormAutoComplete";
import { FormDateInput } from "src/components/form/FormDateInput";
import FormFileInput from "src/components/form/FormFileInput";
import { FormSelectInput } from "src/components/form/FormSelectInput";
import { FormTextInput } from "src/components/form/FormTextInput";

import { useButtonDependencies } from "../../hooks/dependenciesButtton";
import { DamageInput, ProviderInput } from "../../types/inputTypes";
import { TireResponse } from "../../types/tireTypes";
import { RepairButtonSchemaType } from "../../validation/repairButton";

export { RepairButtonForm };

interface RepairButtonFormProps {
  form: UseFormReturn<RepairButtonSchemaType>;
  tire?: TireResponse;
  repairButtonArrayForm: UseFieldArrayReturn;
}

function RepairButtonForm({
  form,
  tire,
  repairButtonArrayForm,
}: RepairButtonFormProps): React.ReactElement {
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
          {repairButtonArrayForm.fields.map((field, index) => {
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
                        onClick={() => repairButtonArrayForm.remove(index)}
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
              repairButtonArrayForm.append({
                damage_id: "",
                comment: "",
                image: null,
              })
            }
          />
        </Grid>
        <Grid item xs={12}>
          {/* <FormSelectInput name={"provider_id"} label={t("labels:provider")}>
            {dependencies.providers.map((provider: ProviderInput) => (
              <MenuItem
                key={provider.provider_id}
                value={provider.provider_id}
                disabled={provider.status === 0}
              >
                {provider.name} {" | "} {provider.subsidiary?.name}
              </MenuItem>
            ))}
          </FormSelectInput> */}
          <FormAutoComplete
            {...providersFilterProps}
            name={"provider_id"}
            options={dependencies.providers}
            labelExtractor={(option: ProviderInput) =>
              `${option.name} | ${option.subsidiary?.name}`
            }
          />
        </Grid>
        <Grid item xs={12}>
          <FormDateInput name={"date"} label={t("labels:date_send")} />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
