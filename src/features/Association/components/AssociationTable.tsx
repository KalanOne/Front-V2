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

import { AssociationResponse } from "../types/associationTypes";

export { AssociationTable };

interface AssociationTableProps {
  associations: AssociationResponse[];
  onUpdate: (association: AssociationResponse) => void;
  onDelete: (association: AssociationResponse) => void;
  onStatusChange: (association: AssociationResponse) => void;
}

function AssociationTable({
  associations,
  onUpdate,
  onDelete,
  onStatusChange,
}: AssociationTableProps): React.ReactElement {
  const { t } = useTranslation();
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>{t("labels:status")}</TableHeaderCell>
            <TableHeaderCell>{"Nombre del transportista"}</TableHeaderCell>
            <TableHeaderCell>{t("labels:address")}</TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {associations.map((association) => (
            <TableRow key={association.association_id}>
              <TableBodyCell component="th" scope="row">
                {association.status ? (
                  <IconButton onClick={() => onStatusChange(association)}>
                    <CheckIcon color={"primary"} />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => onStatusChange(association)}>
                    <CloseIcon color={"primary"} />
                  </IconButton>
                )}
              </TableBodyCell>
              <TableBodyCell>{association.name}</TableBodyCell>
              <TableBodyCell>{`${association.direction_1} #${
                association.external_number
              }${
                association.internal_number
                  ? ` #${association.internal_number}`
                  : ""
              }${
                association.direction_2 ? ` ${association.direction_2}` : ""
              }, ${association.province}, ${association.state}, ${
                association.country
              }`}</TableBodyCell>
              <TableBodyCell>
                <Stack direction={"row"} spacing={2} justifyContent={"center"}>
                  <IconButton onClick={() => onUpdate(association)}>
                    <EditIcon color={"primary"} />
                  </IconButton>
                  <IconButton onClick={() => onDelete(association)}>
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
