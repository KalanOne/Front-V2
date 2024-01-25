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

import { BrandResponse } from "../types/brandTypes.ts";

export { BrandTable };

interface BrandTableProps {
  brands: BrandResponse[];
  onUpdate: (brand: BrandResponse) => void;
  onDelete: (brand: BrandResponse) => void;
  onApprove: (brand: BrandResponse) => void;
  onStatusChange: (brand: BrandResponse) => void;
}

function BrandTable({
  brands,
  onUpdate,
  onDelete,
  onApprove,
  onStatusChange,
}: BrandTableProps): React.ReactElement {
  const { t } = useTranslation();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>{t("labels:status")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:approved")}</TableHeaderCell>
            <TableHeaderCell>{t("common:name")}</TableHeaderCell>
            <TableHeaderCell>
              {t("labels:brand_type.label.singular")}
            </TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {brands.map((brand) => (
            <TableRow key={brand.brand_id}>
              <TableCellIcon component="th" scope="row">
                {brand.status ? (
                  <IconButton onClick={() => onStatusChange(brand)}>
                    <CheckIcon color={"primary"} />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => onStatusChange(brand)}>
                    <CloseIcon color={"primary"} />
                  </IconButton>
                )}
              </TableCellIcon>
              <TableBodyCell>
                {brand.approved ? "Aprobado" : "No Aprobado"}
              </TableBodyCell>
              <TableBodyCell>{brand.name}</TableBodyCell>
              <TableBodyCell>
                {t(
                  `labels:brand_type.options.${brand.brand_type.toLowerCase()}`,
                )}
              </TableBodyCell>
              <TableBodyCell>
                <Stack direction={"row"} spacing={2} justifyContent={"center"}>
                  <Button
                    sx={{ width: "180px" }}
                    onClick={() => onApprove(brand)}
                  >
                    {brand.approved ? "Desaprobar" : "Aprobar"}
                  </Button>
                  <IconButton onClick={() => onUpdate(brand)}>
                    <EditIcon color={"primary"} />
                  </IconButton>
                  <IconButton onClick={() => onDelete(brand)}>
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
