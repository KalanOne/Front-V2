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

export { WearTable };

interface WearTableProps {
  wears: any[];
  onImage: (wear: any) => void;
}

function WearTable({ wears, onImage }: WearTableProps): React.ReactElement {
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
          {wears.map((wear) => (
            <TableRow key={wear.tire_wear_id}>
              <TableBodyCell>{t(`wear:wear.${wear.wear.name}`)}</TableBodyCell>
              <TableBodyCell>{wear.comment || "-"}</TableBodyCell>
              <TableBodyCell>
                {`${wear.created_by.name} ${wear.created_by.last_name_1} ${
                  wear.created_by.last_name_2 || ""
                }`}{" "}
                {formatFecha(wear.created_at)}
              </TableBodyCell>
              <TableBodyCell>
                <IconButton
                  onClick={() => onImage(wear)}
                  disabled={!wear.image}
                >
                  <ImageIcon color={!wear.image ? "inherit" : "primary"} />
                </IconButton>
              </TableBodyCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
