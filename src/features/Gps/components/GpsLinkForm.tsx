import React from "react";

import { Grid, MenuItem } from "@mui/material";

import { FormProvider, UseFormReturn } from "react-hook-form";

import { vehiclesFilterProps } from "src/components/filter/formFilterPropsUtils";
import { FormAutoComplete } from "src/components/form/FormAutoComplete";
import { FormSelectInput } from "src/components/form/FormSelectInput";
import { alphabeticalSort } from "src/utils/sort.ts";

import { VehicleLinkResponse } from "../types/gpsTypes";
import { GpsLinkSchemaType } from "../validation/linkGps";

export { GpsLinkForm };

// TODO: Virtualize the list of vehicles

interface GpsLinkFormProps {
  form: UseFormReturn<GpsLinkSchemaType>;
  vehicles: VehicleLinkResponse[];
}

function GpsLinkForm({ form, vehicles }: GpsLinkFormProps): React.ReactElement {
  vehicles = vehicles.sort(alphabeticalSort("economic_number"));
  return (
    <FormProvider {...form}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          {/* <FormSelectInput name={"vehicle_id"} label={"Vehiculo"}>
            {vehicles?.map((vehicle) => (
              <MenuItem
                key={vehicle.vehicle_id}
                value={vehicle.vehicle_id}
                disabled={vehicle.status === 0}
              >
                {vehicle.economic_number}
              </MenuItem>
            ))}
          </FormSelectInput> */}
          <FormAutoComplete
            {...vehiclesFilterProps}
            name={"vehicle_id"}
            options={vehicles}
            multiple={false}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
