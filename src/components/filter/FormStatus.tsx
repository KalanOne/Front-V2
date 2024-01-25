import React from "react";

import {
  FormRadioInput,
  FormRadioInputProps,
  FormRadioOption,
} from "../form/FormRadioInput";

function FormStatus(props: Partial<FormRadioInputProps>): React.ReactElement {
  return (
    <FormRadioInput
      name={"status"}
      label={props.label ?? "Estatus"}
      {...props}
    >
      <FormRadioOption value={"enabled"} label={"Habilitados"} />
      <FormRadioOption value={"notEnabled"} label={"Deshabilitados"} />
    </FormRadioInput>
  );
}

export default FormStatus;
