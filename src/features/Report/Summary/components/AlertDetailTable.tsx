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
  TableHeaderCellLightGray,
} from "src/components/common/CustomTable";

import { Alert } from "../types/summaryTypes";

export { AlertDetailTable };

interface AlertDetailTableProps {
  data: Alert[];
}

function AlertDetailTable({ data }: AlertDetailTableProps) {
  const { t } = useTranslation();
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCellLightGray>
              {t("labels:code")}
            </TableHeaderCellLightGray>
            <TableHeaderCellLightGray>
              {t("labels:description")}
            </TableHeaderCellLightGray>
            <TableHeaderCellLightGray>
              {t("labels:date.label")}
            </TableHeaderCellLightGray>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((alert: Alert, index: number) => {
            return (
              <TableRow key={index}>
                <TableBodyCell>{alert.code}</TableBodyCell>
                <TableBodyCell>
                  {alert.alert_cause}
                  {/* TODO: add the translation for alert_cause */}
                </TableBodyCell>
                <TableBodyCell>
                  {dayjs(alert.created_date).format("LLL")}
                </TableBodyCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
