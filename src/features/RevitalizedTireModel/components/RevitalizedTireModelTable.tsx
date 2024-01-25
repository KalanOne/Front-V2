import React from "react";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
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
  TableCellIcon,
  TableHeaderCell,
} from "src/components/common/CustomTable.tsx";

import { RevitalizedTireModelResponse } from "../types/revitalizedTireModelTypes.ts";

export { RevitalizedTireModelTable };

interface RevitalizedTireModelTableProps {
  revitalizedTireModels: RevitalizedTireModelResponse[];
  onUpdate: (revitalizedTireModel: RevitalizedTireModelResponse) => void;
  onDelete: (revitalizedTireModel: RevitalizedTireModelResponse) => void;
  onApprove: (revitalizedTireModel: RevitalizedTireModelResponse) => void;
  onStatusChange: (revitalizedTireModel: RevitalizedTireModelResponse) => void;
}

function RevitalizedTireModelTable({
  revitalizedTireModels,
  onUpdate,
  onDelete,
  onApprove,
  onStatusChange,
}: RevitalizedTireModelTableProps): React.ReactElement {
  const { t } = useTranslation();
  const tireApplication = (
    revitalizedTireModel: RevitalizedTireModelResponse,
  ) => {
    switch (revitalizedTireModel.tire_application_id) {
      case "ALL_POSITION":
        return t("labels:tire_application.options.all_position");
      case "DIRECTIONAL":
        return t("labels:tire_application.options.directional");
      case "TRACTION":
        return t("labels:tire_application.options.traction");
      case "TRAILER":
        return t("labels:tire_application.options.trailer");
      default:
        return "N/A";
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>{t("labels:status")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:approved")}</TableHeaderCell>
            <TableHeaderCell>Id</TableHeaderCell>
            <TableHeaderCell>{t("common:model")}</TableHeaderCell>
            <TableHeaderCell>{t("common:brand")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:depth")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:application")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:registered_by")}</TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {revitalizedTireModels.map((revitalizedTireModel) => (
            <TableRow key={revitalizedTireModel.revitalized_tire_model_id}>
              <TableBodyCell component="th" scope="row">
                {revitalizedTireModel.status ? (
                  <IconButton
                    onClick={() => onStatusChange(revitalizedTireModel)}
                  >
                    <CheckIcon color={"primary"} />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() => onStatusChange(revitalizedTireModel)}
                  >
                    <CloseIcon color={"primary"} />
                  </IconButton>
                )}
              </TableBodyCell>
              <TableBodyCell>
                {revitalizedTireModel.approved ? "Aprobado" : "No Aprobado"}
              </TableBodyCell>
              <TableBodyCell>
                {revitalizedTireModel.revitalized_tire_model_id}
              </TableBodyCell>
              <TableBodyCell>{revitalizedTireModel.name}</TableBodyCell>
              <TableBodyCell>{revitalizedTireModel.brand.name}</TableBodyCell>
              <TableBodyCell>{revitalizedTireModel.depth} mm</TableBodyCell>
              <TableBodyCell>
                {tireApplication(revitalizedTireModel)}
              </TableBodyCell>
              <TableBodyCell>
                {revitalizedTireModel.created_by.name}{" "}
                {revitalizedTireModel.created_by.last_name_1}{" "}
                {revitalizedTireModel.created_by.last_name_2}
              </TableBodyCell>
              <TableBodyCell>
                <Stack direction={"row"} spacing={2} justifyContent={"center"}>
                  <Button
                    sx={{ width: "180px" }}
                    onClick={() => onApprove(revitalizedTireModel)}
                  >
                    {revitalizedTireModel.approved ? "Desaprobar" : "Aprobar"}
                  </Button>
                  <IconButton onClick={() => onUpdate(revitalizedTireModel)}>
                    <EditIcon color={"primary"} />
                  </IconButton>
                  <IconButton onClick={() => onDelete(revitalizedTireModel)}>
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
