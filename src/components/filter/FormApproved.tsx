import React from "react";

import {
  FormRadioInput,
  FormRadioInputProps,
  FormRadioOption,
} from "../form/FormRadioInput";

function FormApproved(props: Partial<FormRadioInputProps>): React.ReactElement {
  return (
    <FormRadioInput
      name={"approved"}
      label={props.label ?? "Estatus de Aprobación"}
      {...props}
    >
      <FormRadioOption value={"approved"} label={"Aprobados"} />
      <FormRadioOption value={"notApproved"} label={"No Aprobados"} />
    </FormRadioInput>
  );
}

export default FormApproved;
