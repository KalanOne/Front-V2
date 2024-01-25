import { Grid } from "@mui/material";

import { FormProvider, UseFormReturn } from "react-hook-form";

import FormStatus from "src/components/filter/FormStatus";
import {
  brandFilterProps,
  dateFromFilterProps,
  dateToFilterProps,
  divisionsFilterProps,
  driversFilterProps,
  routeTypeFilterProps,
  subsidiariesFilterProps,
  vehicleTypeFilterProps,
} from "src/components/filter/formFilterPropsUtils";
import { FormAutoComplete } from "src/components/form/FormAutoComplete.tsx";
import { FormCheckboxInput } from "src/components/form/FormCheckboxInput";
import { FormDateInput } from "src/components/form/FormDateInput";
import {
  FormRadioInput,
  FormRadioOption,
} from "src/components/form/FormRadioInput";
import { FormTextInput } from "src/components/form/FormTextInput";

import { UseVehiclesDependenciesArgsReturn } from "../hooks/dependencies";
import { VehiclesFilterSchemaType } from "../validation/filterVehicles";

export { VehiclesFilterForm };

interface VehiclesFilterFormProps {
  form: UseFormReturn<VehiclesFilterSchemaType>;
  dependencies: UseVehiclesDependenciesArgsReturn;
}

function VehiclesFilterForm({
  form,
  dependencies,
}: VehiclesFilterFormProps): React.ReactElement {
  return (
    <FormProvider {...form}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormStatus label={"ESTATUS DE LA VEHÍCULO"} />
        </Grid>
        <Grid item xs={6}>
          <FormDateInput {...dateFromFilterProps} />
        </Grid>
        <Grid item xs={6}>
          <FormDateInput {...dateToFilterProps} />
        </Grid>
        <Grid item xs={12}>
          <FormAutoComplete
            {...subsidiariesFilterProps}
            options={dependencies.subsidiaries}
          />
        </Grid>
        <Grid item xs={12}>
          <FormAutoComplete
            {...divisionsFilterProps}
            options={dependencies.divisions}
          />
        </Grid>
        <Grid item xs={6}>
          <FormAutoComplete
            {...vehicleTypeFilterProps}
            options={dependencies.vehicleTypes}
            multiple={false}
          />
        </Grid>
        <Grid item xs={6}>
          <FormAutoComplete
            {...brandFilterProps}
            name="vehicle_brand_id"
            options={dependencies.brands.filter(
              (item) => item.brand_type === "VEHICLE",
            )}
            multiple={false}
          />
        </Grid>
        <Grid item xs={6}>
          <FormAutoComplete {...routeTypeFilterProps} />
        </Grid>
        <Grid item xs={12}>
          <FormRadioInput name={"has_odometer"} label={"ODÓMETRO"}>
            <FormRadioOption value={"enabled"} label={"Con odómetro"} />
            <FormRadioOption value={"notEnabled"} label={"Sin odómetro"} />
          </FormRadioInput>
        </Grid>
        <Grid item xs={12}>
          <FormCheckboxInput
            label="Mostrar vehículos sin conductor"
            name="with_link_driver"
          />
        </Grid>
        <Grid item xs={6}>
          <FormAutoComplete
            {...driversFilterProps}
            name="drivers"
            options={dependencies.drivers}
            multiple={false}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"enrollment"}
            label={"Matrícula del vehículo"}
          />
        </Grid>
        <Grid item xs={6}>
          <FormAutoComplete
            {...brandFilterProps}
            name="vehicle_engine_brand_id"
            options={dependencies.brands.filter(
              (item) => item.brand_type === "VEHICLE_ENGINE",
            )}
            multiple={false}
          />
        </Grid>
        <Grid item xs={6}>
          <FormAutoComplete
            {...brandFilterProps}
            name="engine_transmission_brand_id"
            options={dependencies.brands.filter(
              (item) => item.brand_type === "ENGINE_TRANSMISSION",
            )}
            multiple={false}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"cylinder_capacity"}
            label={"Cilindraje"}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"transmission_model"}
            label={"Modelo de la transmisión"}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"transmission_speeds"}
            label={"Velocidades de la transmisión"}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"vehicle_model"}
            label={"Modelo del vehículo"}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"vehicle_year"}
            label={"Año del vehículo"}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
