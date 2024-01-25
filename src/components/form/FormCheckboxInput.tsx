import React from "react";

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";

import { Controller } from "react-hook-form";

export { FormCheckboxInput };

interface FormCheckboxInputProps {
  name: string;
  label: string;
}

function FormCheckboxInput({
  name,
  label,
}: FormCheckboxInputProps): React.ReactElement {
  return (
    <Controller
      name={name}
      render={({ field: { onChange, value }, fieldState }) => (
        <FormControl error={fieldState.invalid && fieldState.isTouched}>
          <FormControlLabel
            control={
              <Checkbox name={name} checked={value} onChange={onChange} />
            }
            label={label}
          />
          {fieldState.invalid && fieldState.isTouched && (
            <FormHelperText>fieldState.error?.message</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
