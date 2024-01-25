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

export { HistoryTable };

interface HistoryTableProps {
  history: any[];
}

function HistoryTable({ history }: HistoryTableProps): React.ReactElement {
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
            <TableHeaderCell>
              {t("labels:revitalized_brand_field.label")}
            </TableHeaderCell>
            <TableHeaderCell>
              {t("labels:revitalized_tire_model_field.label")}
            </TableHeaderCell>
            <TableHeaderCell>
              {t("labels:tire_model_variation_field.label")}
            </TableHeaderCell>
            <TableHeaderCell>
              {t("labels:tire_application.label.singular")}
            </TableHeaderCell>
            <TableHeaderCell>{t("labels:condition")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:location.label")}</TableHeaderCell>
            <TableHeaderCell>
              {t("labels:vehicle_type_axle_position.label")}
            </TableHeaderCell>
            <TableHeaderCell>{t("labels:number_cycle")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:price")}</TableHeaderCell>
            <TableHeaderCell>{t("common:provider")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:created_at")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:registered_by")}</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.map((histo) => (
            <TableRow key={histo.movement_tire_id}>
              <TableBodyCell>
                {histo.tire_cycle.revitalized?.brand.name || "-"}
              </TableBodyCell>
              <TableBodyCell>
                {histo.tire_cycle.revitalized
                  ? histo.tire_cycle.revitalized?.name
                  : "-"}
              </TableBodyCell>
              <TableBodyCell>
                {histo.tire_cycle.variation.tire_size.size}{" "}
                {histo.tire_cycle.variation.number_layers}
              </TableBodyCell>
              <TableBodyCell>
                {histo.tire_cycle.revitalized
                  ? t(
                      `labels:tire_application.options.${histo.tire_cycle.revitalized.tire_application_id.toLowerCase()}`,
                    )
                  : t(
                      `labels:tire_application.options.${histo.tire_cycle.variation.tire_application_id.toLowerCase()}`,
                    )}
              </TableBodyCell>
              <TableBodyCell>
                {t(
                  `labels:tire_condition.options.${histo.tire_cycle.condition.tire_condition_id.toLowerCase()}`,
                )}
              </TableBodyCell>
              <TableBodyCell>
                {histo.warehouse_tire.length > 0
                  ? histo.warehouse_tire[0].warehouse.name
                  : histo.vehicle_tire.length > 0
                  ? histo.vehicle_tire[0].vehicle.economic_number
                  : t(
                      `labels:location.options.${histo.movement.toLowerCase()}`,
                    )}
              </TableBodyCell>
              <TableBodyCell>
                {histo.vehicle_tire.length > 0
                  ? histo.vehicle_tire[0].vehicle_type_axle_tire.position
                  : ""}
              </TableBodyCell>
              <TableBodyCell>{histo.tire_cycle.number_cycle}</TableBodyCell>
              <TableBodyCell>
                {histo.tire_cycle.number_cycle > 0
                  ? `$${formatter.format(histo.tire_cycle.price_revitalized)}`
                  : `$${formatter.format(histo.tire_cycle.price)}`}
              </TableBodyCell>
              <TableBodyCell>{histo.tire_cycle.provider.name}</TableBodyCell>
              <TableBodyCell>{formatFecha(histo.created_at)}</TableBodyCell>
              <TableBodyCell>{`${histo.created_by.name} ${
                histo.created_by.last_name_1
              } ${histo.created_by.last_name_2 || ""}`}</TableBodyCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
