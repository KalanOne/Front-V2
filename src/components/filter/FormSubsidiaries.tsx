import { MenuItem } from "@mui/material";

import { useTranslation } from "react-i18next";

import {
  FormSelectInput,
  FormSelectInputProps,
} from "src/components/form/FormSelectInput.tsx";
import { SubsidiaryInputResponse } from "src/features/Report/Renewability/types/inputsTypes.ts";

interface FormSubsidiariesProps extends Partial<FormSelectInputProps> {
  name: string;
  subsidiaries?: SubsidiaryInputResponse[];
}

function FormSubsidiaries({ name, subsidiaries }: FormSubsidiariesProps) {
  const { t } = useTranslation();
  return (
    <FormSelectInput name={name} label={t("common:subsidiary")}>
      {subsidiaries?.map((subsidiary: SubsidiaryInputResponse) => (
        <MenuItem
          value={subsidiary.subsidiary_id}
          key={subsidiary.subsidiary_id}
        >
          {subsidiary.name}
        </MenuItem>
      ))}
    </FormSelectInput>
  );
}

export default FormSubsidiaries;
