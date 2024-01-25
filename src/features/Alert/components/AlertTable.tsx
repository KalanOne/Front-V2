import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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

import { useTranslation } from "react-i18next";

import {
  TableBodyCell,
  TableHeaderCell,
} from "src/components/common/CustomTable.tsx";

import { AlertResponse } from "../types/alertTypes.ts";

export { AlertTable };

interface AlertTableProps {
  alerts: AlertResponse[];
  onUpdate: (alert: AlertResponse) => void;
  onDelete: (alert: AlertResponse) => void;
  onStatusChange: (alert: AlertResponse) => void;
}

function AlertTable({
  alerts,
  onUpdate,
  onDelete,
  onStatusChange,
}: AlertTableProps): React.ReactElement {
  const { t } = useTranslation();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>{t("labels:status")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:code")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:priority.label")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:alert.details")}</TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {alerts.map((alert) => (
            <TableRow key={alert.alert_id}>
              <TableBodyCell component="th" scope="row">
                {alert.status ? (
                  <IconButton onClick={() => onStatusChange(alert)}>
                    <CheckIcon color={"primary"} />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => onStatusChange(alert)}>
                    <CloseIcon color={"primary"} />
                  </IconButton>
                )}
              </TableBodyCell>
              <TableBodyCell>{alert.code}</TableBodyCell>
              <TableBodyCell>
                {t("labels:priority.options." + alert.priority.toLowerCase())}
              </TableBodyCell>
              <TableBodyCell>
                {t("alerts:details." + alert.details)}
              </TableBodyCell>
              <TableBodyCell>
                <Stack direction={"row"} spacing={2} justifyContent={"center"}>
                  <IconButton onClick={() => onUpdate(alert)}>
                    <EditIcon color={"primary"} />
                  </IconButton>
                  <IconButton onClick={() => onDelete(alert)}>
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
