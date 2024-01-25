import React from "react";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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

import { CommissionedDriverResponse } from "../types/commissionedDriverTypes";

export { CommissionedDriverTable };

interface CommissionedDriverTableProps {
  commissionedDrivers: CommissionedDriverResponse[];
  onUpdate: (commissionedDriver: CommissionedDriverResponse) => void;
  onDelete: (commissionedDriver: CommissionedDriverResponse) => void;
  onStatusChange: (commissionedDriver: CommissionedDriverResponse) => void;
}

function CommissionedDriverTable({
  commissionedDrivers,
  onUpdate,
  onStatusChange,
  onDelete,
}: CommissionedDriverTableProps): React.ReactElement {
  const { t } = useTranslation();
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>{t("labels:status")}</TableHeaderCell>
            <TableHeaderCell>{"Transportista"}</TableHeaderCell>
            <TableHeaderCell>{t("common:name")}</TableHeaderCell>
            <TableHeaderCell>{"Clave"}</TableHeaderCell>
            <TableHeaderCell>{"Licencia"}</TableHeaderCell>
            <TableHeaderCell>{"Curso"}</TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {commissionedDrivers.map((commissionedDriver) => (
            <TableRow key={commissionedDriver.commissioned_driver_id}>
              <TableBodyCell component="th" scope="row">
                {commissionedDriver.status ? (
                  <IconButton
                    onClick={() => onStatusChange(commissionedDriver)}
                  >
                    <CheckIcon color={"primary"} />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() => onStatusChange(commissionedDriver)}
                  >
                    <CloseIcon color={"primary"} />
                  </IconButton>
                )}
              </TableBodyCell>
              <TableBodyCell>
                {commissionedDriver.association.name}
              </TableBodyCell>
              <TableBodyCell>{commissionedDriver.name}</TableBodyCell>
              <TableBodyCell>
                {commissionedDriver.driver_code || "-"}
              </TableBodyCell>
              <TableBodyCell>{""}</TableBodyCell>
              <TableBodyCell>{""}</TableBodyCell>
              <TableBodyCell>
                <Stack direction={"row"} spacing={2} justifyContent={"center"}>
                  <IconButton onClick={() => onUpdate(commissionedDriver)}>
                    <EditIcon color={"primary"} />
                  </IconButton>
                  <IconButton onClick={() => onDelete(commissionedDriver)}>
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
