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

import { RfidResponse } from "../types/rfidTypes";

export { RfidTable };

interface RfidTableProps {
  Rfid: RfidResponse[];
  onUpdate: (rfid: RfidResponse) => void;
  onDelete: (rfid: RfidResponse) => void;
  onStatusChange: (rfid: RfidResponse) => void;
  onLink: (rfid: RfidResponse) => void;
  onUnLink: (rfid: RfidResponse) => void;
}

function RfidTable({
  Rfid,
  onUpdate,
  onDelete,
  onStatusChange,
  onLink,
  onUnLink,
}: RfidTableProps): React.ReactElement {
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
            <TableHeaderCell>{t("labels:device_code")}</TableHeaderCell>
            <TableHeaderCell>{t("general:tire")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:created_at")}</TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Rfid.map((Rfi) => (
            <TableRow key={Rfi.rfid_id}>
              <TableBodyCell component="th" scope="row">
                {Rfi.status ? (
                  <IconButton onClick={() => onStatusChange(Rfi)}>
                    <CheckIcon color={"primary"} />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => onStatusChange(Rfi)}>
                    <CloseIcon color={"primary"} />
                  </IconButton>
                )}
              </TableBodyCell>
              <TableBodyCell>{Rfi.subsidiary.name}</TableBodyCell>
              <TableBodyCell>{Rfi.device_code}</TableBodyCell>
              <TableBodyCell>
                {Rfi.tire.length > 0 ? Rfi.tire[0].tire.code : "-"}
              </TableBodyCell>
              <TableBodyCell>{formatFecha(Rfi.created_at)}</TableBodyCell>
              <TableBodyCell>
                <Stack direction={"row"} spacing={2} justifyContent={"center"}>
                  {Rfi.tire.length > 0 ? (
                    <IconButton onClick={() => onUnLink(Rfi)}>
                      <LinkOffIcon color={"primary"} />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => onLink(Rfi)}>
                      <LinkIcon color={"primary"} />
                    </IconButton>
                  )}
                  <IconButton onClick={() => onUpdate(Rfi)}>
                    <EditIcon color={"primary"} />
                  </IconButton>
                  <IconButton onClick={() => onDelete(Rfi)}>
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
