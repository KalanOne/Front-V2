import {
  Paper,
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
  TableHeaderCell,
} from "src/components/common/CustomTable";
import { formatter } from "src/utils/formatters";

import { VehicleReviewHistoryResponse } from "../types/vehicleReviewMovementTypes";

export { VehicleReviewMovementTable };

interface VehicleReviewMovementTableProps {
  vehicleReviewMovements: VehicleReviewHistoryResponse[];
}

function VehicleReviewMovementTable({
  vehicleReviewMovements,
}: VehicleReviewMovementTableProps) {
  // review_type: {
  //     label: "Tipo de revisión",
  //     options: {
  //       reset: "Reinicio de odómetro",
  //       complete: "Completa",
  //       damage_and_wear: "Daños y desgastes",
  //       rotation: "Rotaciones",
  //       mount_dismount: "Movimientos",
  //       pressure: "Presión",
  //       identify: "Identificación",
  //       initial: "Inicial",
  //       partial: "Parcial",
  //     },
  //   },

  const reviewType = (option: string) => {
    switch (option) {
      case "COMPLETE":
        return t("labels:review_type.options.complete");
      case "PRESSURE":
        return t("labels:review_type.options.pressure");
      case "IDENTIFY":
        return t("labels:review_type.options.identify");
      case "DAMAGE AND WEAR":
        return t("labels:review_type.options.damage_and_wear");
      case "MOUNT/DISMOUNT":
        return t("labels:review_type.options.mount_dismount");
      case "ROTATION":
        return t("labels:review_type.options.rotation");
      case "INITIAL":
        return t("labels:review_type.options.initial");
      default:
        return option;
    }
  };

  const { t } = useTranslation();
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>
              {t("common:vehicle")}{" "}
              {vehicleReviewMovements[0]?.vehicle.economic_number}
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>
                    {t("labels:review_type.label")}
                  </TableHeaderCell>
                  <TableHeaderCell>{t("labels:status")}</TableHeaderCell>
                  <TableHeaderCell>{t("labels:date.label")}</TableHeaderCell>
                  <TableHeaderCell>{t("general:vehicle_km")}</TableHeaderCell>
                  <TableHeaderCell>{t("common:user")}</TableHeaderCell>
                  <TableHeaderCell>{t("common:comment")}</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vehicleReviewMovements.map((vehicleReviewMovement) => (
                  <TableRow sx={{ verticalAlign: "top" }}>
                    <TableBodyCell>
                      {reviewType(vehicleReviewMovement.review_type)}
                    </TableBodyCell>
                    <TableBodyCell>
                      {vehicleReviewMovement.end_time
                        ? t("labels:finalized")
                        : t("labels:inspection_in_process")}
                    </TableBodyCell>
                    <TableBodyCell>
                      {dayjs(vehicleReviewMovement.date).format("LLL")}
                    </TableBodyCell>
                    <TableBodyCell>
                      {`${formatter.format(vehicleReviewMovement.odometer)}`} km
                    </TableBodyCell>
                    <TableBodyCell>{`${vehicleReviewMovement.created_by.name} ${
                      vehicleReviewMovement.created_by.last_name_1
                    } ${
                      vehicleReviewMovement.created_by.last_name_2 ?? ""
                    }`}</TableBodyCell>
                    <TableBodyCell>
                      {vehicleReviewMovement.observation ?? "-"}
                    </TableBodyCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
