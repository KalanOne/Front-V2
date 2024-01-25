import React from "react";

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
import "dayjs/locale/es-mx.js";
import { useTranslation } from "react-i18next";

import {
  TableBodyCell,
  TableHeaderCell,
} from "src/components/common/CustomTable.tsx";

import { AlertTireShowResponse } from "../types/alertTireShowTypes.ts";

export { AlertTireShowTable };

interface AlertTireShowTableProps {
  alertTireShows: AlertTireShowResponse[];
  onUpdate: (alertTireShow: AlertTireShowResponse) => void;
}

function AlertTireShowTable({
  alertTireShows,
  onUpdate,
}: AlertTireShowTableProps): React.ReactElement {
  const { t } = useTranslation();

  const priority = (alertTireShow: AlertTireShowResponse): string => {
    switch (alertTireShow.alert.priority) {
      case "HIGH":
        return t("labels:priority.options.high");
      case "HALF":
        return t("labels:priority.options.half");
      case "MEDIUM":
        return t("labels:priority.options.half");
      case "LOW":
        return t("labels:priority.options.low");
      default:
        return alertTireShow.alert.priority;
    }
  };

  // const rankingAlert = (alertTireShow: AlertTireShowResponse):string =>{
  //   switch (alertTireShow.alert.ranking_alert) {
  //     case
  //
  //   }
  // }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>{t("common:alert")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:priority.label")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:ranking_alert.label")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:alert.suggestion")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:date.label")}</TableHeaderCell>
            <TableHeaderCell>{t("common:comment")}</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {alertTireShows.map((alertTireShow) => (
            <TableRow key={alertTireShow.alert_id}>
              <TableBodyCell
                sx={{
                  color:
                    alertTireShow.alert.priority === "HIGH"
                      ? "red"
                      : alertTireShow.alert.priority === "HALF"
                      ? "#e9ba00"
                      : "blue",
                  fontWeight: "bold",
                }}
              >
                {t(
                  `alerts:colloquial_name.${alertTireShow.alert.colloquial_name}`,
                )}
              </TableBodyCell>
              <TableBodyCell>{priority(alertTireShow)}</TableBodyCell>
              <TableBodyCell>
                {t(
                  `labels:ranking_alert.options.${alertTireShow.alert.ranking_alert.toLowerCase()}`,
                )}
              </TableBodyCell>
              <TableBodyCell>
                {t(`alerts:suggestion.${alertTireShow.alert.suggestion}`)}
              </TableBodyCell>
              <TableBodyCell>
                {dayjs(alertTireShow.created_at).format("LLL")}
              </TableBodyCell>
              <TableBodyCell>
                <Stack direction={"row"} spacing={2} justifyContent={"center"}>
                  <IconButton onClick={() => onUpdate(alertTireShow)}>
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
