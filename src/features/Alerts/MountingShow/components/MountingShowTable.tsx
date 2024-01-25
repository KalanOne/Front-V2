import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
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

import { MountingShowResponse } from "../types/mountingShowTypes.ts";

export { MountingShowTable };

interface MountingShowTableProps {
  mountingShows: MountingShowResponse[];
  onUpdate: (mountingShow: MountingShowResponse) => void;
}
function MountingShowTable({
  mountingShows,
  onUpdate,
}: MountingShowTableProps) {
  const { t } = useTranslation();
  const priority = (mountingShow: MountingShowResponse): string => {
    switch (mountingShow.alert.priority) {
      case "HIGH":
        return t("labels:priority.options.high");
      case "HALF":
        return t("labels:priority.options.half");
      case "MEDIUM":
        return t("labels:priority.options.half");
      case "LOW":
        return t("labels:priority.options.low");
      default:
        return mountingShow.alert.priority;
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>{t("common:alert")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:code")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:priority.label")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:ranking_alert.label")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:alert.suggestion")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:date.label")}</TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mountingShows.map((mountingShows) => (
            <TableRow key={mountingShows.alert_vehicle_tire_id}>
              <TableBodyCell
                sx={{
                  color:
                    mountingShows.alert.priority === "HIGH"
                      ? "red"
                      : mountingShows.alert.priority === "HALF"
                      ? "#e9ba00"
                      : "blue",
                  fontWeight: "bold",
                }}
              >
                {t(
                  `alerts:colloquial_name.${mountingShows.alert.colloquial_name}`,
                )}
              </TableBodyCell>
              <TableBodyCell>
                {mountingShows.tire_review.movement_tire.tire_cycle.tire.code}
              </TableBodyCell>
              <TableBodyCell>{priority(mountingShows)}</TableBodyCell>
              <TableBodyCell>
                {t(
                  `labels:ranking_alert.options.${mountingShows.alert.ranking_alert.toLowerCase()}`,
                )}
              </TableBodyCell>
              <TableBodyCell>
                {t(`alerts:suggestion.${mountingShows.alert.suggestion}`)}
              </TableBodyCell>
              <TableBodyCell>
                {dayjs(mountingShows.created_at).format("LLL")}
              </TableBodyCell>
              <TableBodyCell>
                <Stack direction={"row"} spacing={2} justifyContent={"center"}>
                  <IconButton onClick={() => onUpdate(mountingShows)}>
                    <ChatBubbleOutlineIcon color={"primary"} />
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
