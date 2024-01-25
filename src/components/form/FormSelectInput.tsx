import React from "react";



import { FormControl, FormHelperText, InputLabel, Select, SelectProps } from "@mui/material";



import { Controller } from "react-hook-form";


export { FormSelectInput };
export type { FormSelectInputProps };

type FormSelectInputProps = SelectProps & {
  name: string;
  label: string;
};

/**
 * Custom Select Input to be used with react-hook-form
 *
 * Accepts all props from the MUI Select component
 *
 * @param name Name of the field. Will be used as the input id, so it must be unique.
 * @param label Label to be displayed above the input.
 * @param props
 * @see https://mui.com/material-ui/react-select/
 */
function FormSelectInput({
  name,
  label,
  ...props
}: FormSelectInputProps): React.ReactElement {
  return (
    <Controller
      name={name}
      render={({ field: { onChange, onBlur, value, ref }, fieldState }) => (
        <FormControl
          fullWidth
          error={fieldState.invalid && fieldState.isTouched}
          variant="filled"
        >
          <InputLabel>{label}</InputLabel>
          <Select
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            name={name}
            inputRef={ref}
            {...props}
          />
          {fieldState.invalid && fieldState.isTouched && (
            <FormHelperText>{fieldState.error?.message}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}