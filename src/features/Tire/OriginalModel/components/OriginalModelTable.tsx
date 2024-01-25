import React from "react";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
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
  TableHeaderCell,
} from "src/components/common/CustomTable.tsx";

import { OriginaModelResponse } from "../types/originalModelTypes.ts";

export { OriginalModelTable };

interface OriginalModelTableProps {
  originalModels: OriginaModelResponse[];
  onUpdate: (originalModel: OriginaModelResponse) => void;
  onDelete: (originalModel: OriginaModelResponse) => void;
  onApprove: (originalModel: OriginaModelResponse) => void;
  onStatusChange: (originalModel: OriginaModelResponse) => void;
}

function OriginalModelTable({
  originalModels,
  onUpdate,
  onDelete,
  onApprove,
  onStatusChange,
}: OriginalModelTableProps): React.ReactElement {
  const { t } = useTranslation();

  const tireApplication = (originalModel: OriginaModelResponse) => {
    switch (originalModel.tire_application_id) {
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
            <TableHeaderCell>{t("labels:id")}</TableHeaderCell>
            <TableHeaderCell>{t("common:name")}</TableHeaderCell>
            <TableHeaderCell>{t("common:brand")}</TableHeaderCell>
            <TableHeaderCell>{t("common:size")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:registered_by")} por</TableHeaderCell>
            <TableHeaderCell>
              {t("labels:tire_model.application")}
            </TableHeaderCell>
            <TableHeaderCell>{t("labels:depth")}</TableHeaderCell>
            <TableHeaderCell>
              {t("labels:tire_model_variation.maximum_pressure")}
            </TableHeaderCell>
            <TableHeaderCell>
              {t("labels:tire_model_variation.recommended_pressure")}
            </TableHeaderCell>
            <TableHeaderCell>
              {t("labels:tire_model_variation.tolerance")}
            </TableHeaderCell>
            <TableHeaderCell>
              {t("labels:tire_model_variation.number_layers")}
            </TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {originalModels.map((originalModel) => (
            <TableRow key={originalModel.tire_model_variation_id}>
              <TableBodyCell>
                {originalModel.status ? (
                  <IconButton onClick={() => onStatusChange(originalModel)}>
                    <CheckIcon color={"primary"} />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => onStatusChange(originalModel)}>
                    <CloseIcon color={"primary"} />
                  </IconButton>
                )}
              </TableBodyCell>
              <TableBodyCell>
                {originalModel.approved ? "Aprobado" : "No Aprobado"}
              </TableBodyCell>
              <TableBodyCell>
                {originalModel.tire_model_variation_id}
              </TableBodyCell>
              <TableBodyCell>{originalModel.tire_model.name}</TableBodyCell>
              <TableBodyCell>
                {originalModel.tire_model.brand.name}
              </TableBodyCell>
              <TableBodyCell>{originalModel.tire_size.size}</TableBodyCell>
              <TableBodyCell>
                {originalModel.created_by.name}{" "}
                {originalModel.created_by.last_name_1}{" "}
                {originalModel.created_by.last_name_2}
              </TableBodyCell>
              <TableBodyCell>{tireApplication(originalModel)}</TableBodyCell>
              <TableBodyCell>{originalModel.depth} mm</TableBodyCell>
              <TableBodyCell>
                {originalModel.maximum_pressure} PSI
              </TableBodyCell>
              <TableBodyCell>
                {originalModel.recommended_pressure} PSI
              </TableBodyCell>
              <TableBodyCell>{originalModel.tolerance} %</TableBodyCell>
              <TableBodyCell>{originalModel.number_layers}</TableBodyCell>
              <TableBodyCell>
                <Stack direction={"row"} spacing={2} justifyContent={"center"}>
                  <Button
                    sx={{ width: "180px" }}
                    onClick={() => onApprove(originalModel)}
                  >
                    {originalModel.approved
                      ? t("general:disapprove")
                      : t("general:approve")}
                  </Button>
                  <IconButton>
                    <a
                      href={
                        "http://localhost" + originalModel.tire_model.data_sheet
                      }
                      target="_blank"
                    >
                      <VisibilityIcon color={"primary"} />
                    </a>
                  </IconButton>
                  <IconButton onClick={() => onUpdate(originalModel)}>
                    <EditIcon color={"primary"} />
                  </IconButton>
                  <IconButton onClick={() => onDelete(originalModel)}>
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
