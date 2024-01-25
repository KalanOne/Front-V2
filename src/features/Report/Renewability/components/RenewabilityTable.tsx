import { useState } from "react";

import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { useTranslation } from "react-i18next";

import {
  TableBodyCell,
  TableHeaderCellGray,
} from "src/components/common/CustomTable";
import { OrderedTableCell } from "src/components/common/OrderedTableCell";
import { TableTitle } from "src/components/common/TableTitle";

import { RenewabilityResponse } from "../types/renewabilityTypes";

export { RenewabilityTable };

interface RenewabilityTableProps {
  renewability: RenewabilityResponse[];
  handleOrderChange: (sort_by: string, order: string) => void;
}

function RenewabilityTable({
  renewability,
  handleOrderChange,
}: RenewabilityTableProps) {
  const { t } = useTranslation();

  const [sortState, setSortState] = useState({
    key: "index",
    direction: "DESC",
  });

  const handleHeaderClick = (key: string) => {
    const newSortState = { ...sortState };
    if (key === sortState.key) {
      newSortState.direction = sortState.direction === "ASC" ? "DESC" : "ASC";
    } else {
      newSortState.key = key;
      newSortState.direction = "DESC";
    }
    setSortState(newSortState);
    handleOrderChange(newSortState.key, newSortState.direction);
  };

  return (
    <>
      <TableTitle title={"Índice de renovabilidad por modelo"} />
      <TableContainer component={Paper} sx={{ mt: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCellGray>{t("common:brand")}</TableHeaderCellGray>
              <TableHeaderCellGray>{t("common:model")}</TableHeaderCellGray>
              <TableHeaderCellGray>{t("common:size")}</TableHeaderCellGray>
              <TableHeaderCellGray>
                <OrderedTableCell
                  label={t("labels:report_pile.number_of_tires")}
                  arrowState={
                    sortState.key === "original" ? sortState.direction : "none"
                  }
                  onClick={() => handleHeaderClick("original")}
                />
              </TableHeaderCellGray>
              <TableHeaderCellGray>
                <OrderedTableCell
                  label={"Número de revitalizados"}
                  arrowState={
                    sortState.key === "revitalized"
                      ? sortState.direction
                      : "none"
                  }
                  onClick={() => handleHeaderClick("revitalized")}
                />
              </TableHeaderCellGray>
              <TableHeaderCellGray>
                <OrderedTableCell
                  label={t("titles:renewability_index_report")}
                  arrowState={
                    sortState.key === "index" ? sortState.direction : "none"
                  }
                  onClick={() => handleHeaderClick("index")}
                />
              </TableHeaderCellGray>
            </TableRow>
          </TableHead>
          <TableBody>
            {renewability.map((renewability, index) => (
              <TableRow key={index}>
                <TableBodyCell>{renewability.brand}</TableBodyCell>
                <TableBodyCell>{renewability.model}</TableBodyCell>
                <TableBodyCell>{renewability.size}</TableBodyCell>
                <TableBodyCell>{renewability.original}</TableBodyCell>
                <TableBodyCell>{renewability.revitalized}</TableBodyCell>
                <TableBodyCell>{renewability.index.toFixed(2)}</TableBodyCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
