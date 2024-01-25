import React from "react";

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
} from "src/components/common/CustomTable.tsx";
import { formatter } from "src/utils/formatters.ts";

export { BestPerformanceTable };

interface BestPerformanceTableProps {
  bestPerformances: any;
}
function BestPerformanceTable({
  bestPerformances,
}: BestPerformanceTableProps): React.ReactElement {
  const { t } = useTranslation();
  return (
    <TableContainer component={Paper} sx={{ mt: 1 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCellGray>{t("common:division")}</TableHeaderCellGray>
            <TableHeaderCellGray>{t("labels:application")}</TableHeaderCellGray>
            <TableHeaderCellGray>{t("common:size")}</TableHeaderCellGray>
            <TableHeaderCellGray>{t("common:model")}</TableHeaderCellGray>
            <TableHeaderCellGray>{"KM"}</TableHeaderCellGray>
            <TableHeaderCellGray>{"$KM"}</TableHeaderCellGray>
            <TableHeaderCellGray>{"$KMx10,000"}</TableHeaderCellGray>
          </TableRow>
        </TableHead>
        <TableBody>
          {bestPerformances["tier_list"].map((tire: any) => {
            return (
              <TableRow>
                <TableBodyCell>{tire.division_name}</TableBodyCell>
                <TableBodyCell>{tire.tire_application_id}</TableBodyCell>
                <TableBodyCell>{tire.size}</TableBodyCell>
                <TableBodyCell>{`${tire.model} ${tire.size} (${tire.number_layers} capas | ${tire.depth_variation}mm)`}</TableBodyCell>

                <TableBodyCell>
                  {`${formatter.format(tire.travel_summary)}`}
                </TableBodyCell>
                <TableBodyCell>{`$${formatter.format(
                  tire.cpk,
                )}`}</TableBodyCell>
                <TableBodyCell>
                  {`$${formatter.format(tire.cpk * 10000)}`}
                </TableBodyCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
