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

import { CompanyResponse } from "../types/companyTypes";

export { CompanyTable };

interface CompanyTableProps {
  companies: CompanyResponse[];
  onUpdate: (damage: CompanyResponse) => void;
  onDelete: (damage: CompanyResponse) => void;
  onStatusChange: (damage: CompanyResponse) => void;
}

function CompanyTable({
  companies,
  onUpdate,
  onDelete,
  onStatusChange,
}: CompanyTableProps): React.ReactElement {
  const { t } = useTranslation();
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>{t("labels:status")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:tradename")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:social_reason")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:rfc")}</TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {companies.map((company) => (
            <TableRow key={company.company_id}>
              <TableCellIcon component="th" scope="row">
                {company.status ? (
                  <IconButton onClick={() => onStatusChange(company)}>
                    <CheckIcon color={"primary"} />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => onStatusChange(company)}>
                    <CloseIcon color={"primary"} />
                  </IconButton>
                )}
              </TableCellIcon>
              <TableBodyCell>{company.name}</TableBodyCell>
              <TableBodyCell>{company.social_reason}</TableBodyCell>
              <TableBodyCell>{company.rfc}</TableBodyCell>
              <TableBodyCell>
                <Stack direction={"row"} spacing={2} justifyContent={"center"}>
                  <IconButton onClick={() => onUpdate(company)}>
                    <EditIcon color={"primary"} />
                  </IconButton>
                  <IconButton onClick={() => onDelete(company)}>
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
