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
  TableHeaderCell,
} from "src/components/common/CustomTable.tsx";
import { getMinDepth } from "src/utils/tire";

export { ReviewHistoryTable };

interface ReviewHistoryTableProps {
  reviewhistory: any[];
}

function ReviewHistoryTable({
  reviewhistory,
}: ReviewHistoryTableProps): React.ReactElement {
  const { t } = useTranslation();
  const formatter = new Intl.NumberFormat("en", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  });
  function formatFecha(fecha: string) {
    const fechaOriginal = new Date(fecha);
    const fechaFormateada = fechaOriginal.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return fechaFormateada;
  }
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>{t("labels:location.label")}</TableHeaderCell>
            <TableHeaderCell>
              {t("labels:vehicle_type_axle_position.label")}
            </TableHeaderCell>
            <TableHeaderCell>{t("labels:number_cycle")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:mileage")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:pressure")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:depth")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:number_patches")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:inspection_date")}</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviewhistory.map((reviewhisto) => (
            <TableRow key={reviewhisto.movement_tire_id}>
              <TableBodyCell>
                {getLocation(t, reviewhisto.movement_tire)}
              </TableBodyCell>
              <TableBodyCell>
                {getPosition(reviewhisto.movement_tire)}
              </TableBodyCell>
              <TableBodyCell>
                {reviewhisto.movement_tire?.tire_cycle?.number_cycle ?? "-"}
              </TableBodyCell>
              <TableBodyCell>
                {`${formatter.format(reviewhisto.accumulated_mileage)} km`}
              </TableBodyCell>
              <TableBodyCell>
                {reviewhisto.pressure ? `${reviewhisto.pressure} psi` : ""}
              </TableBodyCell>
              <TableBodyCell>
                {reviewhisto.tire_review_depth_line
                  ? `${getMinDepth(reviewhisto.tire_review_depth_line)} mm`
                  : ""}
              </TableBodyCell>
              <TableBodyCell>
                {reviewhisto.movement_tire?.tire_cycle?.number_patch ?? "-"}
              </TableBodyCell>
              <TableBodyCell>{formatFecha(reviewhisto.date)}</TableBodyCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function getLocation(t: any, movementTire: any) {
  if (movementTire.vehicle_tire.length > 0) {
    return movementTire.vehicle_tire[0]?.vehicle?.economic_number;
  }

  if (movementTire.all_warehouse_tire.length > 0) {
    return movementTire.all_warehouse_tire[0]?.warehouse?.name;
  }

  if (movementTire.movement == "REVITALIZATION") {
    return t("labels:location.options.revitalization");
  }

  if (movementTire.movement == "REPAIR") {
    return t("labels:location.options.repair");
  }

  if (movementTire.movement == "PILE") {
    return t("labels:location.options.pile");
  }

  return "N/A";
}

function getPosition(movementTire: any) {
  if (movementTire.vehicle_tire.length > 0) {
    return movementTire.vehicle_tire[0]?.vehicle_type_axle_tire?.position;
  }

  return "-";
}
