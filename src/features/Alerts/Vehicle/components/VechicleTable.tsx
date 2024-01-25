import React from "react";

import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import {
  TableBodyCell,
  TableHeaderCell,
} from "src/components/common/CustomTable.tsx";

import { AlertVehicleResponse } from "../types/alertsVehiclesTypes.ts";

export { VehicleTable };

interface VehicleTableProps {
  alertsVehicles: AlertVehicleResponse[];
}

function VehicleTable({
  alertsVehicles,
}: VehicleTableProps): React.ReactElement {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>{t("labels:economic_number")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:vehicle_brand.label")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:vehicle_type.label")}</TableHeaderCell>
            <TableHeaderCell>{t("common:driver")}</TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {alertsVehicles.map((alertVehicle: AlertVehicleResponse) => (
            <TableRow key={alertVehicle.vehicle_id}>
              <TableBodyCell>{alertVehicle.economic_number}</TableBodyCell>
              <TableBodyCell>{alertVehicle.vehicle_brand}</TableBodyCell>
              <TableBodyCell>{alertVehicle.vehicle_type}</TableBodyCell>
              <TableBodyCell>{alertVehicle.driver_name}</TableBodyCell>
              <TableBodyCell>
                <Stack direction={"row"} spacing={2} justifyContent={"center"}>
                  <IconButton
                    onClick={() =>
                      navigate(`/vehicle/${alertVehicle.vehicle_id}/alerts`)
                    }
                  >
                    <VisibilityIcon color={"primary"} />
                  </IconButton>
                </Stack>
              </TableBodyCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
