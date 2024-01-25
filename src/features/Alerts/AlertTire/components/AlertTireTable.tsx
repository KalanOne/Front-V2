import React from "react";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
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
import { useNavigate } from "react-router-dom";

import {
  TableBodyCell,
  TableCellIcon,
  TableHeaderCell,
} from "src/components/common/CustomTable.tsx";

import { AlertTireResponse } from "../types/alertTireTypes.ts";

export { AlertTireTable };

interface AlertTireTableProps {
  alertsTires: AlertTireResponse[];
  onStatusChange: (alertTire: AlertTireResponse) => void;
}

function AlertTireTable({
  alertsTires,
  onStatusChange,
}: AlertTireTableProps): React.ReactElement {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const tireCondition = (alertTire: AlertTireResponse) => {
    switch (alertTire.tire_condition_id) {
      case "ORIGINAL_NEW":
        return t("labels:tire_condition.options.original_new");
      case "ORIGINAL_USED":
        return t("labels:tire_condition.options.original_used");
      case "RETREAD_NEW":
        return t("labels:tire_condition.options.retread_new");
      case "RETREAD_USED":
        return t("labels:tire_condition.options.retread_used");
      default:
        return "N/A";
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>{t("common:subsidiary")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:code")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:rfid")}</TableHeaderCell>
            <TableHeaderCell>{t("common:brand")}</TableHeaderCell>
            <TableHeaderCell>{t("common:model")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:location.label")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:condition")}</TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {alertsTires.map((alertTire: AlertTireResponse) => (
            <TableRow key={alertTire.movement_tire_id}>
              <TableBodyCell>{alertTire.subsidiary_name}</TableBodyCell>
              <TableBodyCell>{alertTire.code}</TableBodyCell>
              <TableBodyCell>
                {alertTire.rfid_id ? alertTire.rfid_id : "-"}
              </TableBodyCell>
              <TableBodyCell>{alertTire.brand_name}</TableBodyCell>
              <TableBodyCell>{alertTire.model_name}</TableBodyCell>
              <TableBodyCell>{alertTire.location}</TableBodyCell>
              <TableBodyCell>{tireCondition(alertTire)}</TableBodyCell>
              <TableBodyCell>
                <Stack direction={"row"} spacing={2} justifyContent={"center"}>
                  <IconButton
                    onClick={() =>
                      navigate(`/tire/${alertTire.movement_tire_id}/alerts`)
                    }
                  >
                    <VisibilityIcon color={"primary"} />
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
