import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

import {
  TableBodyCell,
  TableHeaderCellBlack,
} from "src/components/common/CustomTable";

import { TireReview } from "../types/vehicleReviewMovementTypes";

interface AlertsTableProps {
  tireReview?: TireReview;
}

export { AlertsTable };

function AlertsTable({ tireReview }: AlertsTableProps) {
  const { t } = useTranslation();
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCellBlack>
              {t("labels:alert.label")}
            </TableHeaderCellBlack>
            <TableHeaderCellBlack>
              {t("labels:date.label")}
            </TableHeaderCellBlack>
          </TableRow>
        </TableHead>
        <TableBody>
          {tireReview &&
            tireReview.alert_tire.map((alert) => (
              <TableRow key={alert.alert_id}>
                <TableBodyCell
                  sx={{
                    textAlign: "start",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  {alert.alert_cause}
                </TableBodyCell>
                <TableBodyCell
                  sx={{
                    textAlign: "start",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  {dayjs(alert.created_at).format("LLL")}
                </TableBodyCell>
              </TableRow>
            ))}
          {tireReview &&
            tireReview.alert_vehicle_tire.map((alert) => (
              <TableRow key={alert.alert_id}>
                <TableBodyCell
                  sx={{
                    textAlign: "start",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  {alert.alert_cause}
                </TableBodyCell>
                <TableBodyCell
                  sx={{
                    textAlign: "start",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  {dayjs(alert.created_at).format("LLL")}
                </TableBodyCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
