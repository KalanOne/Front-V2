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

import { WareHouseResponse } from "../types/wareHouseTypes";

export { WareHouseTable };

interface WareHouseTableProps {
  wareHouses: WareHouseResponse[];
  onUpdate: (wareHouse: WareHouseResponse) => void;
  onDelete: (wareHouse: WareHouseResponse) => void;
  onStatusChange: (wareHouse: WareHouseResponse) => void;
}

function WareHouseTable({
  wareHouses,
  onUpdate,
  onDelete,
  onStatusChange,
}: WareHouseTableProps): React.ReactElement {
  const { t } = useTranslation();
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>{t("labels:status")}</TableHeaderCell>
            <TableHeaderCell>{t("common:subsidiary")}</TableHeaderCell>
            <TableHeaderCell>{t("common:name")}</TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {wareHouses.map((wareHouse) => (
            <TableRow key={wareHouse.warehouse_id}>
              <TableBodyCell component="th" scope="row">
                {wareHouse.status ? (
                  <IconButton onClick={() => onStatusChange(wareHouse)}>
                    <CheckIcon color={"primary"} />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => onStatusChange(wareHouse)}>
                    <CloseIcon color={"primary"} />
                  </IconButton>
                )}
              </TableBodyCell>
              <TableBodyCell>{wareHouse.subsidiary.name}</TableBodyCell>
              <TableBodyCell>{wareHouse.name}</TableBodyCell>
              <TableBodyCell>
                <Stack direction={"row"} spacing={2} justifyContent={"center"}>
                  <IconButton onClick={() => onUpdate(wareHouse)}>
                    <EditIcon color={"primary"} />
                  </IconButton>
                  <IconButton onClick={() => onDelete(wareHouse)}>
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
