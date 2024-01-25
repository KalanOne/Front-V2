import React, { useEffect, useState } from "react";

import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import {
  FormProvider,
  UseFieldArrayReturn,
  UseFormReturn,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
  TableBodyCell,
  TableHeaderCell,
} from "src/components/common/CustomTable";
import { FormDateInput } from "src/components/form/FormDateInput";
import { FormTextInput } from "src/components/form/FormTextInput";

import { VehicleTirePressureSchemaType } from "../validation/vehicleTirePressure";

interface TireTableProps {
  tires: any;
  form: UseFormReturn<VehicleTirePressureSchemaType>;
  arrayForm: UseFieldArrayReturn;
  onSubmitForm: () => void;
}

function VehicleTirePressureTable({
  tires,
  form,
  arrayForm,
  onSubmitForm,
}: TireTableProps): React.ReactElement {
  const { t } = useTranslation();
  const [value, setValue] = useState<any>([]);
  const vehicleTypeAxle = tires?.vehicle_type_axle ?? "";

  useEffect(() => {
    if (tires) {
      setValue(mapVehicleAxleTires(tires));
    }
  }, [tires]);
  useEffect(() => {
    arrayForm.replace([]);
    if (value.length > 0) {
      for (let i = 0; i < value.length; i++) {
        arrayForm.append({
          movement_tire_id: value[i].vehicle_tire.movement_tire_id.toString(),
          pressure: 0,
        });
      }
    }
  }, [value]);
  return (
    <>
      <FormProvider {...form}>
        <Grid container spacing={1}>
          <Grid sx={{ mb: 2 }} container spacing={1}>
            <Grid item xs={6}>
              <FormDateInput name={"date"} label={"Fecha"} />
            </Grid>
            <Grid item xs={6}>
              <FormTextInput
                sx={{ width: "100%" }}
                name={"odometer"}
                label={t("labels:odometer")}
                inputProps={{ type: "number" }}
              />
            </Grid>
          </Grid>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>{t("general:position")}</TableHeaderCell>
                  <TableHeaderCell>{t("labels:code")}</TableHeaderCell>
                  <TableHeaderCell>{t("common:model")}</TableHeaderCell>
                  <TableHeaderCell>{t("common:size")}</TableHeaderCell>
                  <TableHeaderCell>{t("labels:pressure")}</TableHeaderCell>
                  <TableHeaderCell>
                    {t("labels:tire_model_variation.recommended_pressure")}
                  </TableHeaderCell>
                  <TableHeaderCell></TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {value.length > 0 &&
                  arrayForm.fields.length > 0 &&
                  value.map((axleTire: any, index: number) => (
                    <TableRow key={axleTire.vehicle_type_axle_tire_id}>
                      <TableBodyCell>{axleTire.position}</TableBodyCell>
                      <TableBodyCell>
                        {axleTire.vehicle_tire.movement_tire.tire_cycle.tire
                          .code ||
                          axleTire.vehicle_tire.movement_tire.tire_cycle.tire
                            .device_code}
                      </TableBodyCell>
                      <TableBodyCell>
                        {axleTire.vehicle_tire.movement_tire.tire_cycle
                          .revitalized?.name ||
                          axleTire.vehicle_tire.movement_tire.tire_cycle
                            .variation?.tire_model.name}
                      </TableBodyCell>
                      <TableBodyCell>
                        {
                          axleTire.vehicle_tire.movement_tire.tire_cycle
                            .variation.tire_size.size
                        }
                      </TableBodyCell>
                      <TableBodyCell>
                        {`${
                          axleTire.vehicle_tire.movement_tire.tire_review[
                            axleTire.vehicle_tire.movement_tire.tire_review
                              .length - 1
                          ].pressure
                        } psi`}
                      </TableBodyCell>
                      <TableBodyCell>
                        {`${getRecommendedPressure(
                          vehicleTypeAxle,
                          axleTire,
                        ).toFixed(2)} psi`}
                      </TableBodyCell>
                      <TableBodyCell>
                        <FormTextInput
                          sx={{ width: "100%" }}
                          name={`review.${index}.pressure`}
                          label={t("labels:pressure")}
                          inputProps={{ type: "number" }}
                        />
                      </TableBodyCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button onClick={onSubmitForm}>Guardar</Button>
        </Grid>
      </FormProvider>
    </>
  );
}

export default VehicleTirePressureTable;

function mapVehicleAxleTires(vehicle: any) {
  let tires = [];
  if (vehicle.vehicle_type_axle?.length > 0) {
    tires = vehicle.vehicle_type_axle.flatMap((axle: any) => {
      return axle.vehicle_type_axle_tire
        .filter((axleTire: any) => axleTire.vehicle_tire.length > 0)
        .map((axleTire: any) => ({
          ...axleTire,
          vehicle_tire: axleTire.vehicle_tire[0],
        }));
    });
  }
  return tires;
}

function getRecommendedPressure(vehicleTypeAxle: any, axleTire: any) {
  const { axle_type: axleType } = vehicleTypeAxle.find(
    (axle: any) => axle.vehicle_type_axle_id === axleTire.vehicle_type_axle_id,
  );

  if (
    axleType &&
    axleTire.vehicle_tire.vehicle?.vehicle_pressure_policy &&
    axleTire.vehicle_tire.vehicle.vehicle_pressure_policy.find(
      (policy: any) => policy.axle_type === axleType,
    )
  ) {
    const pressure = axleTire.vehicle_tire.vehicle.vehicle_pressure_policy.find(
      (policy: any) => policy.axle_type === axleType,
    ).recommended_pressure;
    return pressure;
  }

  if (
    axleTire.vehicle_tire.movement_tire.tire_cycle.variation
      .tire_model_variation_policy
  ) {
    return axleTire.vehicle_tire.movement_tire.tire_cycle.variation
      .tire_model_variation_policy.recommended_pressure;
  }

  return axleTire.vehicle_tire.movement_tire.tire_cycle.variation
    .recommended_pressure;
}
