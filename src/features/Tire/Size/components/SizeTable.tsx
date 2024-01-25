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

import {
  TableBodyCell,
  TableCellIcon,
  TableHeaderCell,
} from "src/components/common/CustomTable.tsx";

import { SizeResponse } from "../types/sizeTypes.ts";

export { SizeTable };

interface SizeTableProps {
  sizes: SizeResponse[];
  onUpdate: (size: SizeResponse) => void;
  onDelete: (size: SizeResponse) => void;
  onApprove: (size: SizeResponse) => void;
  onStatusChange: (size: SizeResponse) => void;
}

function SizeTable({
  sizes,
  onUpdate,
  onDelete,
  onApprove,
  onStatusChange,
}: SizeTableProps): React.ReactElement {
  const { t } = useTranslation();
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>{t("labels:status")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:approved")}</TableHeaderCell>
            <TableHeaderCell>{t("common:size")}</TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sizes.map((size) => (
            <TableRow key={size.tire_size_id}>
              <TableCellIcon component="th" scope="row">
                {size.status ? (
                  <IconButton onClick={() => onStatusChange(size)}>
                    <CheckIcon color={"primary"} />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => onStatusChange(size)}>
                    <CloseIcon color={"primary"} />
                  </IconButton>
                )}
              </TableCellIcon>
              <TableBodyCell>
                {size.approved ? "Aprobado" : "No Aprobado"}
              </TableBodyCell>
              <TableBodyCell>{size.size}</TableBodyCell>
              <TableBodyCell>
                <Stack direction={"row"} spacing={2} justifyContent={"center"}>
                  <Button
                    sx={{ width: "180px" }}
                    onClick={() => onApprove(size)}
                  >
                    {size.approved ? "Desaprobar" : "Aprobar"}
                  </Button>
                  <IconButton onClick={() => onUpdate(size)}>
                    <EditIcon color={"primary"} />
                  </IconButton>
                  <IconButton onClick={() => onDelete(size)}>
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
