import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LaunchIcon from "@mui/icons-material/Launch";
import SpeedIcon from "@mui/icons-material/Speed";
import {
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";

import { useTranslation } from "react-i18next";

import {
  TableBodyCell,
  TableCellIcon,
  TableHeaderCell,
} from "src/components/common/CustomTable";

import { VehiclesResponse } from "../types/vehiclesTypes";

export { VehiclesTable };

interface VehiclesTableProps {
  vehicles: VehiclesResponse[];
  onUpdate: (vehicle: VehiclesResponse) => void;
  onDelete: (vehicle: VehiclesResponse) => void;
  onStatusChange: (vehicle: VehiclesResponse) => void;
  onResetOdometer: (vehicle: VehiclesResponse) => void;
  onMove: (vehicle: VehiclesResponse) => void;
}

function VehiclesTable({
  vehicles,
  onUpdate,
  onDelete,
  onStatusChange,
  onResetOdometer,
  onMove,
}: VehiclesTableProps): React.ReactElement {
  const { t } = useTranslation();
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Estatus</TableHeaderCell>
              <TableHeaderCell>Sucursal</TableHeaderCell>
              <TableHeaderCell>División</TableHeaderCell>
              <TableHeaderCell>Número económico</TableHeaderCell>
              <TableHeaderCell>Tipo de vehículo</TableHeaderCell>
              <TableHeaderCell>Marca del vehículo</TableHeaderCell>
              <TableHeaderCell>Año del vehículo</TableHeaderCell>
              <TableHeaderCell>Tipo de ruta</TableHeaderCell>
              <TableHeaderCell>Tiene odómetro</TableHeaderCell>
              <TableHeaderCell>Conductor</TableHeaderCell>
              <TableHeaderCell></TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles.map((vehicle) => (
              <TableRow key={vehicle.economic_number}>
                <TableCellIcon component="th" scope="row">
                  {vehicle.status ? (
                    <IconButton onClick={() => onStatusChange(vehicle)}>
                      <CheckIcon color={"primary"} />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => onStatusChange(vehicle)}>
                      <CloseIcon color={"primary"} />
                    </IconButton>
                  )}
                </TableCellIcon>
                <TableBodyCell>{vehicle.subsidiary.name}</TableBodyCell>
                <TableBodyCell>
                  {vehicle.division[0]
                    ? vehicle.division[0].division.name
                    : "-"}
                </TableBodyCell>
                <TableBodyCell>{vehicle.economic_number}</TableBodyCell>
                <TableBodyCell>{vehicle.vehicle_type.name}</TableBodyCell>
                <TableBodyCell>{vehicle.vehicle_brand.name}</TableBodyCell>
                <TableBodyCell>{vehicle.vehicle_year ?? "-"}</TableBodyCell>
                <TableBodyCell>
                  {t(
                    `labels:type_of_route.options.${vehicle.type_of_route.toLowerCase()}`,
                  )}
                </TableBodyCell>
                <TableBodyCell>
                  {vehicle.has_odometer == 1 ? t(`labels:yes`) : t(`labels:no`)}
                </TableBodyCell>
                <TableBodyCell>
                  {vehicle.driver ? vehicle.driver.name : "-"}
                </TableBodyCell>
                <TableBodyCell>
                  <Stack
                    direction={"row"}
                    spacing={2}
                    justifyContent={"center"}
                  >
                    <Tooltip title={t("buttons:edit")}>
                      <IconButton onClick={() => onUpdate(vehicle)}>
                        <EditIcon color={"primary"} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={t("buttons:delete")}>
                      <IconButton onClick={() => onDelete(vehicle)}>
                        <DeleteIcon color={"primary"} />
                      </IconButton>
                    </Tooltip>
                    {vehicle.has_odometer == 1 && (
                      <Tooltip title={t("buttons:reset_odometer")}>
                        <IconButton onClick={() => onResetOdometer(vehicle)}>
                          <SpeedIcon color={"primary"} />
                        </IconButton>
                      </Tooltip>
                    )}
                    <Tooltip title={t("buttons:move")}>
                      <IconButton onClick={() => onMove(vehicle)}>
                        <LaunchIcon color={"primary"} />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableBodyCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
