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

import { RetirementCauseResponse } from "../types/retirementsCauseTypre.ts";

export { RetirementCauseTable };

interface RetirementCauseTableProps {
  causes: RetirementCauseResponse[];
  onUpdate: (cause: RetirementCauseResponse) => void;
  onDelete: (cause: RetirementCauseResponse) => void;
  onStatusChange: (cause: RetirementCauseResponse) => void;
}

function RetirementCauseTable({
  causes,
  onUpdate,
  onDelete,
  onStatusChange,
}: RetirementCauseTableProps): React.ReactElement {
  const { t } = useTranslation();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>{t("labels:status")}</TableHeaderCell>
            <TableHeaderCell>{t("common:name")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:description")}</TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {causes.map((cause) => (
            <TableRow key={cause.retirement_cause_id}>
              <TableBodyCell component="th" scope="row">
                {cause.status ? (
                  <IconButton onClick={() => onStatusChange(cause)}>
                    <CheckIcon color={"primary"} />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => onStatusChange(cause)}>
                    <CloseIcon color={"primary"} />
                  </IconButton>
                )}
              </TableBodyCell>
              <TableBodyCell>
                {t("features:cause.name." + cause.name)}
              </TableBodyCell>
              <TableBodyCell>
                {t("features:cause.description." + cause.description)}
              </TableBodyCell>
              <TableBodyCell>
                <Stack direction={"row"} spacing={2} justifyContent={"center"}>
                  <IconButton onClick={() => onUpdate(cause)}>
                    <EditIcon color={"primary"} />
                  </IconButton>
                  <IconButton onClick={() => onDelete(cause)}>
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
