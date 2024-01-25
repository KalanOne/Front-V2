import React from "react";

import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

import { Controller } from "react-hook-form";

export { FormRadioInput, FormRadioOption };
export type { FormRadioInputProps };

interface FormRadioOptionProps {
  value: string;
  label: string;
}

/**
 * Custom Radio button to be used with FormRadioInput.
 *
 * @param value Value of the radio button.
 * @param label Label to be displayed next to the radio button.
 */
function FormRadioOption({
  value,
  label,
}: FormRadioOptionProps): React.ReactElement {
  return <FormControlLabel label={label} value={value} control={<Radio />} />;
}

interface FormRadioInputProps {
  name: string;
  label: string;
  children: React.ReactNode;
}

/**
 * Custom Radio Button Group to be used with react-hook-form.
 *
 * @param name Name of the field. Will be used as the input id, so it must be unique.
 * @param label Label to be displayed above the input.
 * @param children FormRadioOption components to be used as the radio buttons.
 */
function FormRadioInput({
  name,
  label,
  children,
}: FormRadioInputProps): React.ReactElement {
  return (
    <Controller
      name={name}
      render={({ field: { onChange, value }, fieldState }) => (
        <FormControl error={fieldState.invalid && fieldState.isTouched}>
          <FormLabel>{label}</FormLabel>
          <RadioGroup name={name} value={value} onChange={onChange} row={true}>
            {children}
          </RadioGroup>
          {fieldState.invalid && fieldState.isTouched && (
            <FormHelperText>fieldState.error?.message</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
