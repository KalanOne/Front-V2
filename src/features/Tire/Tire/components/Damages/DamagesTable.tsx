import React from "react";

import ImageIcon from "@mui/icons-material/Image";
import {
  IconButton,
  Paper,
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

export { DamagesTable };

interface DamagesTableProps {
  damages: any[];
  onImage: (damage: any) => void;
}

function DamagesTable({
  damages,
  onImage,
}: DamagesTableProps): React.ReactElement {
  const { t } = useTranslation();
  function formatFecha(fecha: string) {
    const fechaOriginal = new Date(fecha);
    const fechaFormateada = fechaOriginal.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return fechaFormateada;
  }
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>{t("common:name")}</TableHeaderCell>
            <TableHeaderCell>{t("common:comment")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:registered_by")}</TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {damages.map((damage) => (
            <TableRow key={damage.tire_damage_id}>
              <TableBodyCell>
                {t(`damage:damage.name.${damage.damage.name}`)}
              </TableBodyCell>
              <TableBodyCell>{damage.comment || "-"}</TableBodyCell>
              <TableBodyCell>
                {`${damage.created_by.name} ${damage.created_by.last_name_1} ${
                  damage.created_by.last_name_2 || ""
                }`}{" "}
                {formatFecha(damage.created_at)}
              </TableBodyCell>
              <TableBodyCell>
                <IconButton
                  onClick={() => onImage(damage)}
                  disabled={!damage.image}
                >
                  <ImageIcon color={!damage.image ? "inherit" : "primary"} />
                </IconButton>
              </TableBodyCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
