import React from "react";

import { FormHelperText, MenuItem } from "@mui/material";

import { useTranslation } from "react-i18next";

import { FormSelectInput, FormSelectInputProps } from "../form/FormSelectInput";

function FormBrandType(
  props: Partial<FormSelectInputProps>,
): React.ReactElement {
  const { t } = useTranslation();
  return (
    <>
      <FormSelectInput name={"brandType"} label={"Tipos de Marca"} {...props}>
        <MenuItem value="VEHICLE">
          {t("labels:brand_type.options.vehicle")}
        </MenuItem>
        <MenuItem value="TIRE">{t("labels:brand_type.options.tire")}</MenuItem>
        <MenuItem value="ENGINE_TRANSMISSION">
          {t("labels:brand_type.options.engine_transmission")}
        </MenuItem>
        <MenuItem value="VEHICLE_ENGINE">
          {t("labels:brand_type.options.vehicle_engine")}
        </MenuItem>
        <MenuItem value="RETREAD">
          {t("labels:brand_type.options.retread")}
        </MenuItem>
      </FormSelectInput>
      {props.multiple && (
        <FormHelperText>
          Se pueden seleccionar varios tipos de marcas
        </FormHelperText>
      )}
    </>
  );
}

export default FormBrandType;
