import React from "react";

import {
  Divider,
  Grid,
  InputAdornment,
  MenuItem,
  Typography,
} from "@mui/material";

import {
  FormProvider,
  UseFieldArrayReturn,
  UseFormReturn,
  useWatch,
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
import { DamageInput } from "src/features/Tire/Tire/types/inputTypes";

import { PathDamageButtonSchemaType } from "../validation/pathDamageButton";

export { PathDamageButtonForm };

interface PathDamageButtonFormProps {
  form: UseFormReturn<PathDamageButtonSchemaType>;
  tire?: any;
  revitalizedButtonArrayForm: UseFieldArrayReturn;
}

function PathDamageButtonForm({
  form,
  tire,
  revitalizedButtonArrayForm,
}: PathDamageButtonFormProps) {
  const { t } = useTranslation();
  const dependencies = useButtonDependencies();

  const [surcharge] = useWatch({
    control: form.control,
    name: ["surcharge"],
  });

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
          {revitalizedButtonArrayForm.fields.map((field, index) => {
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
                  {revitalizedButtonArrayForm.fields.length > 1 && (
                    <Grid item xs={12}>
                      <RemoveButton
                        onClick={() => revitalizedButtonArrayForm.remove(index)}
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
              revitalizedButtonArrayForm.append({
                damage_id: "",
                comment: "",
                image: null,
              })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <FormSelectInput
            name="provider_id"
            label={t("labels:provider_field.label")}
          >
            {dependencies.providers.map((provider, index) => {
              return (
                <MenuItem
                  key={index}
                  value={provider.provider_id.toString()}
                  disabled={!provider.status}
                >
                  {provider.name}
                </MenuItem>
              );
            })}
          </FormSelectInput>
        </Grid>
        <Grid item xs={12}>
          <FormTextInput
            name="price"
            label={t("labels:price")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
              type: "number",
            }}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormDateInput
            name="invoice_date"
            label={t("labels:invoice_date")}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            name="invoice_folio"
            label={t("labels:invoice_folio")}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormTextInput
            name="surcharge"
            label={t("labels:surcharge")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
              type: "number",
            }}
            sx={{ width: "100%" }}
          />
        </Grid>
        {surcharge && (
          <>
            <Grid item xs={12}>
              <FormSelectInput
                name="driver_id"
                label={t("labels:driver.singular")}
              >
                {dependencies.drivers.map((driver, index) => {
                  return (
                    <MenuItem
                      key={index}
                      value={driver.driver_id.toString()}
                      disabled={!driver.status}
                    >
                      {driver.name}
                    </MenuItem>
                  );
                })}
              </FormSelectInput>
            </Grid>
            <Grid item xs={12}>
              <FormSelectInput
                name="surcharge_item"
                label={t("labels:surcharge_item.label")}
              >
                <MenuItem value="OPERATION">
                  {t("labels:surcharge_item.options.operation")}
                </MenuItem>
              </FormSelectInput>
            </Grid>
          </>
        )}
      </Grid>
    </FormProvider>
  );
}
