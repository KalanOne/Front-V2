import React from "react";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LinkIcon from "@mui/icons-material/Link";
import LinkOffIcon from "@mui/icons-material/LinkOff";
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

import {
  TableBodyCell,
  TableHeaderCell,
} from "src/components/common/CustomTable.tsx";

import { GpsResponse } from "../types/gpsTypes";

export { GpsTable };

interface GpsTableProps {
  Gps: GpsResponse[];
  onUpdate: (Gp: GpsResponse) => void;
  onDelete: (Gp: GpsResponse) => void;
  onStatusChange: (Gp: GpsResponse) => void;
  onLink: (Gp: GpsResponse) => void;
  onUnLink: (Gp: GpsResponse) => void;
}

function GpsTable({
  Gps,
  onUpdate,
  onDelete,
  onStatusChange,
  onLink,
  onUnLink,
}: GpsTableProps): React.ReactElement {
  const { t } = useTranslation();
  function formatFecha(fecha: string) {
    const fechaOriginal = new Date(fecha);
    const fechaFormateada = fechaOriginal.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return fechaFormateada;
  }
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>{t("labels:status")}</TableHeaderCell>
            <TableHeaderCell>{t("common:subsidiary")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:imei")}</TableHeaderCell>
            <TableHeaderCell>{t("common:vehicle")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:created_at")}</TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Gps.map((Gp) => (
            <TableRow key={Gp.gps_id}>
              <TableBodyCell component="th" scope="row">
                {Gp.status ? (
                  <IconButton onClick={() => onStatusChange(Gp)}>
                    <CheckIcon color={"primary"} />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => onStatusChange(Gp)}>
                    <CloseIcon color={"primary"} />
                  </IconButton>
                )}
              </TableBodyCell>
              <TableBodyCell>{Gp.subsidiary.name}</TableBodyCell>
              <TableBodyCell>{Gp.imei}</TableBodyCell>
              <TableBodyCell>
                {Gp.vehicle.length > 0
                  ? Gp.vehicle[0].vehicle.economic_number
                  : "-"}
              </TableBodyCell>
              <TableBodyCell>{formatFecha(Gp.created_at)}</TableBodyCell>
              <TableBodyCell>
                <Stack direction={"row"} spacing={2} justifyContent={"center"}>
                  {Gp.vehicle.length > 0 ? (
                    <IconButton onClick={() => onUnLink(Gp)}>
                      <LinkOffIcon color={"primary"} />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => onLink(Gp)}>
                      <LinkIcon color={"primary"} />
                    </IconButton>
                  )}
                  <IconButton onClick={() => onUpdate(Gp)}>
                    <EditIcon color={"primary"} />
                  </IconButton>
                  <IconButton onClick={() => onDelete(Gp)}>
                    <DeleteIcon color={"primary"} />
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
