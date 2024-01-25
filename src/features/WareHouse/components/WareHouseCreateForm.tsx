import React, { useEffect, useState } from "react";

import { Grid } from "@mui/material";

import { FormProvider, UseFormReturn, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
  selfItemFilterProps,
  subsidiariesFilterProps,
} from "src/components/filter/formFilterPropsUtils";
import { FormAutoComplete } from "src/components/form/FormAutoComplete";
import { FormTextInput } from "src/components/form/FormTextInput";
import { SubsidiaryInputResponse } from "src/features/Report/Renewability/types/inputsTypes";

import json from "../../../assets/json/countries.json";
import { SubsidiaryResponse } from "../../Subsidiary/types/subsidiaryTypes";
import { WareHouseCreateSchemaType } from "../validation/createWareHouse";

export { WareHouseCreateForm };

interface WareHouseCreateFormProps {
  form: UseFormReturn<WareHouseCreateSchemaType>;
  subsidiaries: SubsidiaryInputResponse[];
}

function WareHouseCreateForm({
  form,
  subsidiaries,
}: WareHouseCreateFormProps): React.ReactElement {
  const { t } = useTranslation();
  const [countries, setCountries] = useState([""]);
  const [states, setStates] = useState([""]);
  const [provinces, setProvinces] = useState([""]);

  const [country, state] = useWatch({
    control: form.control,
    name: ["country", "state"],
  });

  useEffect(() => {
    const c = Object.keys(json);
    setCountries(c);
  }, []);

  useEffect(() => {
    const currentCountry = form.getValues("country");
    if (currentCountry) {
      form.setValue("state", "");
      form.setValue("province", "");
      const s = Object.keys(json[currentCountry]);
      setStates(s);
    } else {
      setStates([""]);
    }
  }, [country]);

  useEffect(() => {
    const currentState = form.getValues("state");
    if (currentState) {
      form.setValue("province", "");
      const currentCountry = form.getValues("country");
      const p = json[currentCountry][currentState];
      setProvinces(p);
    } else {
      setProvinces([""]);
    }
  }, [state]);

  return (
    <FormProvider {...form}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"name"}
            label={t("common:name")}
          />
        </Grid>
        <Grid item xs={6}>
          {/* <FormSelectInput name={"subsidiary_id"} label={"Sucursal"}>
            {subsidiaries.map((subsidiary) => (
              <MenuItem
                key={subsidiary.subsidiary_id}
                value={subsidiary.subsidiary_id}
                disabled={subsidiary.status === 0}
              >
                {subsidiary.name}
              </MenuItem>
            ))}
          </FormSelectInput> */}
          <FormAutoComplete
            {...subsidiariesFilterProps}
            name={"subsidiary_id"}
            options={subsidiaries}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"direction_1"}
            label={t("labels:direction1")}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"external_number"}
            label={t("labels:external_number")}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"internal_number"}
            label={t("labels:internal_number")}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"direction_2"}
            label={t("labels:direction2")}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"postal_code"}
            label={t("labels:postal_code")}
          />
        </Grid>
        <Grid item xs={6}>
          {/* <FormSelectInput name={"country"} label={t("labels:country")}>
            {countries.map((countrie) => (
              <MenuItem key={countrie} value={countrie}>
                {countrie}
              </MenuItem>
            ))}
          </FormSelectInput> */}
          <FormAutoComplete
            {...selfItemFilterProps}
            name={"country"}
            label={t("labels:country")}
            options={countries}
          />
        </Grid>
        <Grid item xs={6}>
          {/* <FormSelectInput name={"state"} label={t("labels:state")}>
            {states.map((state) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </FormSelectInput> */}
          <FormAutoComplete
            {...selfItemFilterProps}
            name={"state"}
            label={t("labels:state")}
            options={states}
          />
        </Grid>
        <Grid item xs={6}>
          {/* <FormSelectInput name={"province"} label={t("labels:province")}>
            {provinces.map((province) => (
              <MenuItem key={province} value={province}>
                {province}
              </MenuItem>
            ))}
          </FormSelectInput> */}
          <FormAutoComplete
            {...selfItemFilterProps}
            name={"province"}
            label={t("labels:province")}
            options={provinces}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
