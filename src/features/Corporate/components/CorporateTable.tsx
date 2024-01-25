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

import { CorporateResponse } from "../types/corporateTypes";

export { CorporateTable };

interface CorporateTableProps {
  corporates: CorporateResponse[];
  onUpdate: (damage: CorporateResponse) => void;
  onDelete: (damage: CorporateResponse) => void;
  onStatusChange: (damage: CorporateResponse) => void;
}

function CorporateTable({
  corporates,
  onUpdate,
  onDelete,
  onStatusChange,
}: CorporateTableProps): React.ReactElement {
  const { t } = useTranslation();
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>{t("labels:status")}</TableHeaderCell>
            <TableHeaderCell>{t("common:corporate")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:social_reason")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:rfc")}</TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {corporates.map((corporate) => (
            <TableRow key={corporate.corporate_id}>
              <TableCellIcon component="th" scope="row">
                {corporate.status ? (
                  <IconButton onClick={() => onStatusChange(corporate)}>
                    <CheckIcon color={"primary"} />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => onStatusChange(corporate)}>
                    <CloseIcon color={"primary"} />
                  </IconButton>
                )}
              </TableCellIcon>
              <TableBodyCell>{corporate.name}</TableBodyCell>
              <TableBodyCell>{corporate.social_reason}</TableBodyCell>
              <TableBodyCell>{corporate.rfc}</TableBodyCell>
              <TableBodyCell>
                <Stack direction={"row"} spacing={2} justifyContent={"center"}>
                  <IconButton onClick={() => onUpdate(corporate)}>
                    <EditIcon color={"primary"} />
                  </IconButton>
                  <IconButton onClick={() => onDelete(corporate)}>
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
