import React from "react";

import { Divider, Grid, MenuItem, Typography } from "@mui/material";

import {
  FormProvider,
  UseFieldArrayReturn,
  UseFormReturn,
  useWatch,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { any } from "zod";

import { AddButton } from "src/components/common/AddButton";
import { LabelAndText } from "src/components/common/LabelAndText";
import { RemoveButton } from "src/components/common/RemoveButton";
import FormFileInput from "src/components/form/FormFileInput";
import { FormSelectInput } from "src/components/form/FormSelectInput";
import { FormTextInput } from "src/components/form/FormTextInput";

import { useButtonDependencies } from "../../hooks/dependenciesButtton";
import {
  DamageInput,
  DriverInput,
  RetirementCauseInput,
} from "../../types/inputTypes";
import { TireResponse } from "../../types/tireTypes";
import { DiscardButtonSchemaType } from "../../validation/discardButton";

export { DiscardButtonForm };

interface DiscardButtonFormProps {
  form: UseFormReturn<DiscardButtonSchemaType>;
  tire?: TireResponse;
  discardButtonArrayForm: UseFieldArrayReturn;
}

function DiscardButtonForm({
  form,
  tire,
  discardButtonArrayForm,
}: DiscardButtonFormProps): React.ReactElement {
  const { t } = useTranslation();
  const dependencies = useButtonDependencies();
  const [surcharge] = useWatch({ control: form.control, name: ["surcharge"] });

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
          <FormSelectInput
            name={"retirement_cause_id"}
            label={t("labels:retirement_cause_field.label")}
          >
            {dependencies.retirementCauses.map(
              (retirementCause: RetirementCauseInput) => (
                <MenuItem
                  key={retirementCause.retirement_cause_id}
                  value={retirementCause.retirement_cause_id}
                  disabled={retirementCause.status === 0}
                >
                  {t(`features:cause.name.${retirementCause.name}`)}
                </MenuItem>
              ),
            )}
          </FormSelectInput>
        </Grid>
        <Grid item xs={12}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"comment"}
            label={"Comentario"}
          />
        </Grid>
        <Grid item xs={12}>
          <FormFileInput
            placeholder={t("labels:placeholder.image")}
            name={"image"}
          />
        </Grid>
        <Grid item xs={12}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"cost_dispose_helmet"}
            label={t("labels:cost_dispose_helmet")}
            inputProps={{ type: "number" }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"surcharge"}
            label={t("labels:surcharge")}
            inputProps={{ type: "number" }}
          />
        </Grid>
        {surcharge > 0 && (
          <>
            <Grid item xs={12}>
              <FormSelectInput name={"driver_id"} label={t("common:driver")}>
                {dependencies.drivers.map((driver: DriverInput) => (
                  <MenuItem
                    key={driver.driver_id}
                    value={driver.driver_id}
                    disabled={driver.status === 0}
                  >
                    {driver.name}
                  </MenuItem>
                ))}
              </FormSelectInput>
            </Grid>
            <Grid item xs={12}>
              <FormSelectInput
                name={"surcharge_item"}
                label={t("labels:surcharge_item.label")}
              >
                <MenuItem value={"OPERATION"}>{"Operación"}</MenuItem>
              </FormSelectInput>
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <Typography variant="body1">
            {t("common:damage", { context: "plural" })}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {discardButtonArrayForm.fields.map((field, index) => {
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
                    <RemoveButton
                      onClick={() => discardButtonArrayForm.remove(index)}
                    />
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
              discardButtonArrayForm.append({
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
