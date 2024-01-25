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

import { DivisionResponse } from "../types/divisionTypes";

export { DivisionTable };

interface DivisionTableProps {
  divisions: DivisionResponse[];
  onUpdate: (damage: DivisionResponse) => void;
  onDelete: (damage: DivisionResponse) => void;
  onStatusChange: (damage: DivisionResponse) => void;
}

function DivisionTable({
  divisions,
  onUpdate,
  onDelete,
  onStatusChange,
}: DivisionTableProps): React.ReactElement {
  const { t } = useTranslation();
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>{t("labels:status")}</TableHeaderCell>
            <TableHeaderCell>{t("common:name")}</TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {divisions.map((division) => (
            <TableRow key={division.division_id}>
              <TableCellIcon component="th" scope="row">
                {division.status ? (
                  <IconButton onClick={() => onStatusChange(division)}>
                    <CheckIcon color={"primary"} />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => onStatusChange(division)}>
                    <CloseIcon color={"primary"} />
                  </IconButton>
                )}
              </TableCellIcon>
              <TableBodyCell>{division.name}</TableBodyCell>
              <TableBodyCell>
                <Stack direction={"row"} spacing={2} justifyContent={"center"}>
                  <IconButton onClick={() => onUpdate(division)}>
                    <EditIcon color={"primary"} />
                  </IconButton>
                  <IconButton onClick={() => onDelete(division)}>
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
