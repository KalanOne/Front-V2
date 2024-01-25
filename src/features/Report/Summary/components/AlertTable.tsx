import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { useTranslation } from "react-i18next";

import { CustomButton } from "src/components/common/CustomButton";
import {
  TableBodyCell,
  TableHeaderCellLightGray,
} from "src/components/common/CustomTable";

import { Alert, SummaryAlertTableResponse } from "../types/summaryTypes";

export { AlertTable };

interface AlertTableProps {
  data: SummaryAlertTableResponse;
  handleAlertClick: (id: string) => void;
}

function AlertTable({ data, handleAlertClick }: AlertTableProps) {
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
              {t("common:model")}
            </TableHeaderCellLightGray>
            <TableHeaderCellLightGray>
              {t("common:size")}
            </TableHeaderCellLightGray>
            <TableHeaderCellLightGray>
              {t("labels:location.label")}
            </TableHeaderCellLightGray>
            <TableHeaderCellLightGray>
              {t("general:position")}
            </TableHeaderCellLightGray>
            <TableHeaderCellLightGray>
              {t("labels:spare")}
            </TableHeaderCellLightGray>
            <TableHeaderCellLightGray>
              {t("labels2:see_alerts")}
            </TableHeaderCellLightGray>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(data).map(([key, value]) => {
            return value.map((alert: Alert, index: number) => {
              return (
                <TableRow key={index}>
                  <TableBodyCell>{alert.code}</TableBodyCell>
                  <TableBodyCell>{alert.model}</TableBodyCell>
                  <TableBodyCell>{alert.size}</TableBodyCell>
                  <TableBodyCell>{alert.location}</TableBodyCell>
                  <TableBodyCell>{alert.real_position}</TableBodyCell>
                  <TableBodyCell>
                    {t("labels:no")}
                    {/* TODO: {alert.is_refection == 1 ? t("labels:yes") : t("labels:no") */}
                  </TableBodyCell>
                  <TableBodyCell>
                    <CustomButton
                      onClick={() => {
                        handleAlertClick(key);
                      }}
                      text={value.length.toString()}
                      sx={{
                        backgroundColor: "#28a745",
                        borderColor: "#28a745",
                        width: "100%",
                        "&:hover": {
                          backgroundColor: "#218838",
                          borderColor: "#218838",
                        },
                      }}
                      icon={<VisibilityIcon sx={{ marginRight: 1 }} />}
                    />
                  </TableBodyCell>
                </TableRow>
              );
            });
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
