import React from "react";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
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
import { Link } from "react-router-dom";

import {
  TableBodyCell,
  TableHeaderCell,
} from "src/components/common/CustomTable.tsx";

import { SubsidiaryResponse } from "../types/subsidiaryTypes";

export { SubsidiaryTable };

interface SubsidiaryTableProps {
  subsidiaries: SubsidiaryResponse[];
  onUpdate: (subsidiary: SubsidiaryResponse) => void;
  onDelete: (subsidiary: SubsidiaryResponse) => void;
  onStatusChange: (subsidiary: SubsidiaryResponse) => void;
}

function SubsidiaryTable({
  subsidiaries,
  onUpdate,
  onDelete,
  onStatusChange,
}: SubsidiaryTableProps): React.ReactElement {
  const { t } = useTranslation();
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>{t("labels:status")}</TableHeaderCell>
            <TableHeaderCell>{t("common:subsidiary")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:address")}</TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subsidiaries.map((subsidiary) => (
            <TableRow key={subsidiary.subsidiary_id}>
              <TableBodyCell component="th" scope="row">
                {subsidiary.status ? (
                  <IconButton onClick={() => onStatusChange(subsidiary)}>
                    <CheckIcon color={"primary"} />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => onStatusChange(subsidiary)}>
                    <CloseIcon color={"primary"} />
                  </IconButton>
                )}
              </TableBodyCell>
              <TableBodyCell>{subsidiary.name}</TableBodyCell>
              <TableBodyCell>{`${subsidiary.direction_1} #${
                subsidiary.external_number
              }${
                subsidiary.internal_number
                  ? ` #${subsidiary.internal_number}`
                  : ""
              }${subsidiary.direction_2 ? ` ${subsidiary.direction_2}` : ""}, ${
                subsidiary.province
              }, ${subsidiary.state}, ${subsidiary.country}`}</TableBodyCell>
              <TableBodyCell>
                <Stack direction={"row"} spacing={2} justifyContent={"center"}>
                  <Link
                    to={`/subsidiary/${subsidiary.subsidiary_id}/policy`}
                  >
                    <Button>{t("general:policies")}</Button>
                  </Link>
                  <IconButton onClick={() => onUpdate(subsidiary)}>
                    <EditIcon color={"primary"} />
                  </IconButton>
                  <IconButton onClick={() => onDelete(subsidiary)}>
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
