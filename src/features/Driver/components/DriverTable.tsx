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
  TableCellIcon,
  TableHeaderCell,
} from "src/components/common/CustomTable.tsx";

import { DriverResponse } from "../types/driverTypes";

export { DriverTable };

interface DriverTableProps {
  drivers: DriverResponse[];
  onUpdate: (damage: DriverResponse) => void;
  onDelete: (damage: DriverResponse) => void;
  onStatusChange: (damage: DriverResponse) => void;
}

function DriverTable({
  drivers,
  onUpdate,
  onDelete,
  onStatusChange,
}: DriverTableProps): React.ReactElement {
  const { t } = useTranslation();
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>{t("labels:status")}</TableHeaderCell>
            <TableHeaderCell>{t("common:subsidiary")}</TableHeaderCell>
            <TableHeaderCell>{t("common:driver")}</TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {drivers.map((driver) => (
            <TableRow key={driver.driver_id}>
              <TableCellIcon component="th" scope="row">
                {driver.status ? (
                  <IconButton onClick={() => onStatusChange(driver)}>
                    <CheckIcon color={"primary"} />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => onStatusChange(driver)}>
                    <CloseIcon color={"primary"} />
                  </IconButton>
                )}
              </TableCellIcon>
              <TableBodyCell>{driver.subsidiary.name}</TableBodyCell>
              <TableBodyCell>{driver.name}</TableBodyCell>
              <TableBodyCell>
                <Stack direction={"row"} spacing={2} justifyContent={"center"}>
                  <IconButton onClick={() => onUpdate(driver)}>
                    <EditIcon color={"primary"} />
                  </IconButton>
                  <IconButton onClick={() => onDelete(driver)}>
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
