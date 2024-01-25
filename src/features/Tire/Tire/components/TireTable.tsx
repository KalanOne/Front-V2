import React from "react";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LaunchIcon from "@mui/icons-material/Launch";
import MoreVertIcon from "@mui/icons-material/MoreVert";
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
import { useNavigate } from "react-router-dom";

import {
  TableBodyCell,
  TableHeaderCell,
} from "src/components/common/CustomTable.tsx";

import { TireResponse } from "../types/tireTypes";
import { getMinDepth } from "../utils/tire";

export { TireTable };

interface TireTableProps {
  tires: TireResponse[];
  onUpdate: (tire: TireResponse) => void;
  onDelete: (tire: TireResponse) => void;
  onSend: (tire: TireResponse) => void;
  onInfoDialog: (tire: TireResponse) => void;
}

function TireTable({
  tires,
  onUpdate,
  onDelete,
  onSend,
  onInfoDialog,
}: TireTableProps): React.ReactElement {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const formatter = new Intl.NumberFormat("en", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  });
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>{t("labels:status")}</TableHeaderCell>
            <TableHeaderCell>{t("common:subsidiary")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:code")}</TableHeaderCell>
            <TableHeaderCell>{t("general:rfid")}</TableHeaderCell>
            <TableHeaderCell>{t("common:brand")}</TableHeaderCell>
            <TableHeaderCell>{t("common:model")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:location.label")}</TableHeaderCell>
            <TableHeaderCell>
              {t("labels:vehicle_type_axle_position.label")}
            </TableHeaderCell>
            <TableHeaderCell>{t("labels:depth")}</TableHeaderCell>
            <TableHeaderCell>{"km"}</TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tires.map((tire) => (
            <TableRow key={tire.tire_id}>
              <TableBodyCell component="th" scope="row">
                {tire.status ? (
                  <IconButton>
                    <CheckIcon color={"primary"} />
                  </IconButton>
                ) : (
                  <IconButton>
                    <CloseIcon color={"primary"} />
                  </IconButton>
                )}
              </TableBodyCell>
              <TableBodyCell>{tire.subsidiary.name}</TableBodyCell>
              <TableBodyCell>{tire.code || "-"}</TableBodyCell>
              <TableBodyCell>{tire.device_code || "-"}</TableBodyCell>
              <TableBodyCell>
                {tire.cycle.revitalized?.brand.name ||
                  tire.cycle.variation.tire_model.brand.name}
              </TableBodyCell>
              <TableBodyCell>
                {tire.cycle.revitalized?.name ||
                  tire.cycle.variation.tire_model.name}
              </TableBodyCell>
              <TableBodyCell>
                {tire.cycle.movement_tire.warehouse_tire.length > 0
                  ? tire.cycle.movement_tire.warehouse_tire[0].warehouse.name
                  : tire.cycle.movement_tire.vehicle_tire.length > 0
                  ? tire.cycle.movement_tire.vehicle_tire[0].vehicle
                      .economic_number
                  : t(
                      `labels:location.options.${tire.cycle.movement_tire.movement.toLowerCase()}`,
                    )}
              </TableBodyCell>
              <TableBodyCell>
                {tire.cycle.movement_tire.movement === "MOUNT"
                  ? tire.cycle.movement_tire.vehicle_tire[0]
                      .vehicle_type_axle_tire.position
                  : "-"}
              </TableBodyCell>
              <TableBodyCell>
                {tire.cycle.movement_tire.tire_review.length > 0
                  ? `${getMinDepth(
                      tire.cycle.movement_tire.tire_review[
                        tire.cycle.movement_tire.tire_review.length - 1
                      ].tire_review_depth_line,
                    )} mm`
                  : ""}
              </TableBodyCell>
              <TableBodyCell>{`${formatter.format(
                tire.cycle.tire_travel,
              )}`}</TableBodyCell>
              <TableBodyCell>
                <Stack direction={"row"} spacing={2} justifyContent={"center"}>
                  <IconButton onClick={() => onInfoDialog(tire)}>
                    <MoreVertIcon color={"primary"} />
                  </IconButton>
                  <Button
                    sx={{
                      alignSelf: "center",
                      backgroundColor: "white",
                      border: "none",
                      color: "#1976D2",
                      fontSize: "0.875rem",
                      fontWeight: "bold",
                    }}
                    onClick={() => navigate(`/tire/${tire.tire_id}/history`)}
                  >
                    {"Historial"}
                  </Button>
                  <IconButton onClick={() => onUpdate(tire)}>
                    <EditIcon color={"primary"} />
                  </IconButton>
                  <IconButton onClick={() => onDelete(tire)}>
                    <DeleteIcon color={"primary"} />
                  </IconButton>
                  <IconButton
                    onClick={() => onSend(tire)}
                    disabled={tire.cycle.movement_tire.movement !== "WAREHOUSE"}
                  >
                    <LaunchIcon
                      color={
                        tire.cycle.movement_tire.movement !== "WAREHOUSE"
                          ? "inherit"
                          : "primary"
                      }
                    />
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
