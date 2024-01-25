import React from "react";

import { DatePicker, DatePickerProps } from "@mui/x-date-pickers";

import { Dayjs } from "dayjs";
import * as dayjs from "dayjs";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

export { FormDateInput };
export type { FormDateProps };

interface FormDateProps extends DatePickerProps<any> {
  name: string;
  label: string;
}

function FormDateInput({
  name,
  label,
  ...props
}: FormDateProps): React.ReactElement {
  const { t } = useTranslation();
  return (
    <Controller
      name={name}
      render={({ field: { onChange, value }, fieldState }) => (
        <DatePicker
          label={t(label)}
          value={value === "" ? null : dayjs(value)}
          onChange={(value: Dayjs) => {
            const isoDate = value.toISOString().substring(0, 10);
            onChange(isoDate);
          }}
          slotProps={{
            textField: {
              fullWidth: true,
              variant: "filled",
              helperText: fieldState.invalid
                ? fieldState.error?.message ?? ""
                : "",
              error: fieldState.invalid,
            },
          }}
          {...props}
        />
      )}
    />
  );
}
