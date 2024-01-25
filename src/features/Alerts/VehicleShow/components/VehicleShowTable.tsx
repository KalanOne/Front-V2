import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
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

import * as dayjs from "dayjs";
import { useTranslation } from "react-i18next";

import {
  TableBodyCell,
  TableHeaderCell,
} from "src/components/common/CustomTable.tsx";

import { VehicleShowResponse } from "../types/vehicleShowTypes.ts";

export { VehicleShowTable };

interface VehicleShowTableProps {
  vehicleShows: VehicleShowResponse[];
  onUpdate: (vehicleShow: VehicleShowResponse) => void;
  onDelete: (vehicleShow: VehicleShowResponse) => void;
}
function VehicleShowTable({
  vehicleShows,
  onUpdate,
  onDelete,
}: VehicleShowTableProps) {
  const { t } = useTranslation();
  const priority = (vehicleShow: VehicleShowResponse): string => {
    switch (vehicleShow.alert.priority) {
      case "HIGH":
        return t("labels:priority.options.high");
      case "HALF":
        return t("labels:priority.options.half");
      case "MEDIUM":
        return t("labels:priority.options.half");
      case "LOW":
        return t("labels:priority.options.low");
      default:
        return vehicleShow.alert.priority;
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>{t("common:alert")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:priority.label")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:ranking_alert.label")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:alert.suggestion")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:created_at")}</TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vehicleShows.map((vehicleShow) => (
            <TableRow key={vehicleShow.alert_vehicle_tire_id}>
              <TableBodyCell
                sx={{
                  color:
                    vehicleShow.alert.priority === "HIGH"
                      ? "red"
                      : vehicleShow.alert.priority === "HALF"
                      ? "#e9ba00"
                      : "blue",
                  fontWeight: "bold",
                }}
              >
                {t(
                  `alerts:colloquial_name.${vehicleShow.alert.colloquial_name}`,
                )}
              </TableBodyCell>
              <TableBodyCell>{priority(vehicleShow)}</TableBodyCell>
              <TableBodyCell>
                {t(
                  `labels:ranking_alert.options.${vehicleShow.alert.ranking_alert.toLowerCase()}`,
                )}
              </TableBodyCell>
              <TableBodyCell>
                {t(`alerts:suggestion.${vehicleShow.alert.suggestion}`)}
              </TableBodyCell>
              <TableBodyCell>
                {dayjs(vehicleShow.alert.created_at).format("LLL")}
              </TableBodyCell>
              <TableBodyCell>
                <Stack direction={"row"} spacing={2} justifyContent={"center"}>
                  <IconButton onClick={() => onUpdate(vehicleShow)}>
                    <ChatBubbleOutlineIcon color={"primary"} />
                  </IconButton>
                  <IconButton onClick={() => onDelete(vehicleShow)}>
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
