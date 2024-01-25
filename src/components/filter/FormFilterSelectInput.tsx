import React from "react";

import { FormHelperText, MenuItem } from "@mui/material";

import { useTranslation } from "react-i18next";

import { FormSelectInput } from "../form/FormSelectInput";

export { FormFilterSelectInput };
export type { FormFilterSelectInputProps };

interface FormFilterSelectInputProps<T> {
  name: string;
  label: string;
  items: T[];
  keyExtractor: (item: T) => React.Key;
  valueExtractor: (item: T) => string | number;
  renderExtractor: (item: T) => React.ReactNode;
  multiple: boolean;
  disabled?: boolean;
}

function FormFilterSelectInput<T>({
  name,
  label,
  items,
  keyExtractor,
  valueExtractor,
  renderExtractor,
  multiple,
  disabled = false,
}: FormFilterSelectInputProps<T>): React.ReactElement {
  const { t } = useTranslation();
  return (
    <>
      <FormSelectInput
        name={name}
        label={t(label)}
        multiple={multiple}
        disabled={disabled}
      >
        {items?.map((item) => (
          <MenuItem key={keyExtractor(item)} value={valueExtractor(item)}>
            {t(`${renderExtractor(item)}`)}
          </MenuItem>
        ))}
      </FormSelectInput>
      {multiple && (
        <FormHelperText>
          Se pueden seleccionar múltiples opciones
        </FormHelperText>
      )}
    </>
  );
}
