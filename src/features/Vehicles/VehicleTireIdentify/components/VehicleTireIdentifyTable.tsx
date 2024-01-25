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
import {
  FormRadioInput,
  FormRadioOption,
} from "src/components/form/FormRadioInput";
import { FormTextInput } from "src/components/form/FormTextInput";

import { VehicleTireIdentifySchemaType } from "../validation/vehicleTireIdentify";

interface TireTableProps {
  tires: any;
  form: UseFormReturn<VehicleTireIdentifySchemaType>;
  arrayForm: UseFieldArrayReturn;
  onSubmitForm: () => void;
  hasOdometer: boolean;
}

function VehicleTireIdentifyTable({
  tires,
  form,
  arrayForm,
  onSubmitForm,
  hasOdometer,
}: TireTableProps): React.ReactElement {
  const { t } = useTranslation();
  const [value, setValue] = useState<any>([]);

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
          vehicle_tire_id: value[i].vehicle_tire.vehicle_tire_id,
          vehicle_type_axle_tire_id: value[i].vehicle_type_axle_tire_id,
          status: "",
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
                disabled={hasOdometer}
                inputProps={{ type: "number" }}
              />
            </Grid>
          </Grid>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>{t("general:position")}</TableHeaderCell>
                  <TableHeaderCell>{t("common:model")}</TableHeaderCell>
                  <TableHeaderCell>{t("common:size")}</TableHeaderCell>
                  <TableHeaderCell>{t("labels:code")}</TableHeaderCell>
                  <TableHeaderCell>
                    {t("labels:correct_tire.label")}
                  </TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {value.length > 0 &&
                  arrayForm.fields.length > 0 &&
                  value.map((axleTire: any, index: number) => (
                    <TableRow key={axleTire.vehicle_type_axle_tire_id}>
                      <TableBodyCell>{axleTire.position}</TableBodyCell>
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
                        {axleTire.vehicle_tire.movement_tire.tire_cycle.tire
                          .code ||
                          axleTire.vehicle_tire.movement_tire.tire_cycle.tire
                            .device_code}
                      </TableBodyCell>
                      <TableBodyCell>
                        <FormRadioInput
                          name={`review.${index}.status`}
                          label={""}
                        >
                          <FormRadioOption
                            value={"yes"}
                            label={t("labels:yes")}
                          />
                          <FormRadioOption
                            value={"no"}
                            label={t("labels:no")}
                          />
                        </FormRadioInput>
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

export default VehicleTireIdentifyTable;

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
