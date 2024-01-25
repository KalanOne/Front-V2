import React from "react";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { useTranslation } from "react-i18next";

import { getMinDepth } from "src/utils/tire";

export { TireReviewTable };

interface TireReviewTableProps {
  reviewData: any;
}

function TireReviewTable({
  reviewData,
}: TireReviewTableProps): React.ReactElement {
  const { t } = useTranslation();

  const formatter = new Intl.NumberFormat("en", {
    maximumFractionDigits: 3,
    minimumFractionDigits: 0,
  });
  const kmFormatter = new Intl.NumberFormat("en", {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t("labels:code")}</TableCell>
            <TableCell>{t("labels:rfid")}</TableCell>
            <TableCell>
              {t("labels:vehicle_type_axle_position.label")}
            </TableCell>
            <TableCell>{t("labels:detail")}</TableCell>
            <TableCell>
              {t("labels:pressure")}
              {"(psi)"}
            </TableCell>
            <TableCell>
              {t("labels:travel.singular")}
              {"(km)"}
            </TableCell>
            <TableCell>
              {t("labels:mileage")}
              {"(km)"}
            </TableCell>
            <TableCell>
              {t("labels:depth")}
              {"(mm)"}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviewData?.tire_review.map((row: any) => (
            <TableRow key={row.tire_review_id}>
              <TableCell>
                {row?.movement_tire.tire_cycle.tire.code || "-"}
              </TableCell>
              <TableCell>
                {row?.movement_tire.tire_cycle.tire.device_code || "-"}
              </TableCell>
              <TableCell>
                {row?.movement_tire.vehicle_tire.length > 0
                  ? row?.movement_tire.vehicle_tire[0].vehicle_type_axle_tire
                      .position
                  : ""}
              </TableCell>
              <TableCell>{row.comment || ""}</TableCell>
              <TableCell>{formatter.format(row.pressure)}</TableCell>
              <TableCell>{kmFormatter.format(row.last_travel)}</TableCell>
              <TableCell>
                {kmFormatter.format(row.accumulated_mileage)}
              </TableCell>
              <TableCell>{getMinDepth(row.tire_review_depth_line)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
