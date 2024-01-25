import { Grid, Typography } from "@mui/material";

import { useQuery } from "@tanstack/react-query";
import { FormProvider, UseFormReturn, useWatch } from "react-hook-form";

import {
  brandFilterProps,
  divisionsFilterProps,
  driversFilterProps,
  routeTypeFilterProps,
  subsidiariesFilterProps,
  vehicleTypeFilterProps,
  wheelRimFilterProps,
} from "src/components/filter/formFilterPropsUtils";
import { FormAutoComplete } from "src/components/form/FormAutoComplete";
import { FormCheckboxInput } from "src/components/form/FormCheckboxInput";
import { FormTextInput } from "src/components/form/FormTextInput";
import { useProgressQuery } from "src/hooks/progress";

import { getDivisions } from "../api/inputsApi";
import { UseVehiclesDependenciesArgsReturn } from "../hooks/dependencies";
import { VehiclesCreateSchemaType } from "../validation/createVehicles";

export { VehiclesCreateForm };

interface VehiclesCreateFormProps {
  form: UseFormReturn<VehiclesCreateSchemaType>;
  dependencies: UseVehiclesDependenciesArgsReturn;
}

function VehiclesCreateForm({
  form,
  dependencies, // odometerError,
}: VehiclesCreateFormProps): React.ReactElement {
  const [subsidiary_id, has_odometer] = useWatch({
    control: form.control,
    name: ["subsidiary_id", "has_odometer"],
  });

  const divisionsQuery = useQuery({
    queryKey: ["divisions", subsidiary_id],
    queryFn: async () => {
      return await getDivisions(
        new URLSearchParams({
          sort_by: "DESC",
          scope: "division_id,name,status,subsidiary.name",
          subsidiaries: subsidiary_id,
        }),
      );
    },
    enabled: subsidiary_id !== "",
  });
  const divisions = divisionsQuery.data ?? [];
  useProgressQuery(divisionsQuery, "divisions");

  return (
    <FormProvider {...form}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormTextInput
            required={true}
            sx={{ width: "100%" }}
            name={"economic_number"}
            label={"Número económico"}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"enrollment"}
            label={"Matricula"}
          />
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={true}>
            <FormAutoComplete
              {...subsidiariesFilterProps}
              name="subsidiary_id"
              options={dependencies.subsidiaries}
              multiple={false}
            />
          </Grid>
          <Grid item xs={true}>
            <FormAutoComplete
              {...divisionsFilterProps}
              name="division_id"
              options={divisions}
              multiple={false}
            />
          </Grid>
          <Grid item xs={true}>
            <FormAutoComplete
              {...driversFilterProps}
              name="driver_id"
              options={dependencies.drivers}
              multiple={false}
            />
          </Grid>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={true}>
            <FormAutoComplete
              {...vehicleTypeFilterProps}
              options={dependencies.vehicleTypes}
              multiple={false}
            />
          </Grid>
          <Grid item xs={true}>
            <FormAutoComplete
              {...brandFilterProps}
              name="vehicle_brand_id"
              options={dependencies.brands.filter(
                (item) =>
                  item.brand_type === "VEHICLE" &&
                  item.status === 1 &&
                  item.approved === 1,
              )}
              multiple={false}
            />
          </Grid>
          <Grid item xs={true}>
            <FormAutoComplete {...routeTypeFilterProps} />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <FormCheckboxInput
            label="Cuenta con odómetro o hubodómetro"
            name="has_odometer"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="body2"
            sx={{ fontSize: "0.75rem", color: "rgba(0, 0, 0, 0.54);" }}
          >
            Revisiones hechas en vehículos sin odómetro/hubodómetro NO se
            consideran para reporte de rendimiento.
          </Typography>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={true}>
            <FormTextInput
              sx={{ width: "100%" }}
              name={"vehicle_model"}
              label={"Modelo del vehículo"}
            />
          </Grid>
          <Grid item xs={true}>
            <FormAutoComplete
              {...brandFilterProps}
              name="vehicle_engine_brand_id"
              options={dependencies.brands.filter(
                (item) =>
                  item.brand_type === "VEHICLE_ENGINE" &&
                  item.status === 1 &&
                  item.approved === 1,
              )}
              multiple={false}
              label="Marca del motor"
            />
          </Grid>
          <Grid item xs={true}>
            <FormTextInput
              sx={{ width: "100%" }}
              name={"vehicle_year"}
              label={"Año del vehículo"}
            />
          </Grid>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={true}>
            <FormAutoComplete
              {...brandFilterProps}
              name="engine_transmission_brand_id"
              options={dependencies.brands.filter(
                (item) =>
                  item.brand_type === "ENGINE_TRANSMISSION" &&
                  item.status === 1 &&
                  item.approved === 1,
              )}
              multiple={false}
            />
          </Grid>
          <Grid item xs={true}>
            <FormTextInput
              sx={{ width: "100%" }}
              name={"transmission_model"}
              label={"Modelo de la transmisión"}
            />
          </Grid>
          <Grid item xs={true}>
            <FormAutoComplete {...wheelRimFilterProps} />
          </Grid>
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
            name={"cylinder_capacity"}
            label={"Cilindraje"}
          />
        </Grid>
        {has_odometer && (
          <Grid item xs={6}>
            <FormTextInput
              sx={{ width: "100%" }}
              name={"odometer"}
              label={"Odómetro"}
            />
          </Grid>
        )}
      </Grid>
    </FormProvider>
  );
}
