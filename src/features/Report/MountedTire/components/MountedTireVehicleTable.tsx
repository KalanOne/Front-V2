import {
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { useTranslation } from "react-i18next";

import { CardHeaderGradient } from "src/components/common/CustomCard";
import {
  TableBodyCell,
  TableHeaderCellBlack,
} from "src/components/common/CustomTable";
import { TableTitle } from "src/components/common/TableTitle";

import { MountedTireTableResponse } from "../types/mountedTireTypes";

export { MountedTireVehicleTable };

interface MountedTireVehicleTableProps {
  title: string;
  tires: MountedTireTableResponse[];
}

function MountedTireVehicleTable({
  title,
  tires,
}: MountedTireVehicleTableProps) {
  const { t } = useTranslation();
  return (
    <Card>
      <CardHeaderGradient title={t("general:tires")} />
      <CardContent>
        <TableContainer component={Paper} sx={{ maxHeight: "400px" }}>
          <TableTitle
            title={title}
            typoSx={{
              fontSize: 15,
              fontWeight: "bold",
            }}
            sx={{ marginTop: 0, paddingBottom: 2, paddingTop: 2 }}
          />
          <Table stickyHeader>
            {/* <Table> */}
            <TableHead>
              <TableRow>
                <TableHeaderCellBlack>
                  {t("labels:economic_number")}
                </TableHeaderCellBlack>
                <TableHeaderCellBlack>
                  {t("general:position")}
                </TableHeaderCellBlack>
                <TableHeaderCellBlack>{t("labels:code")}</TableHeaderCellBlack>
                <TableHeaderCellBlack>
                  {t("common:subsidiary")}
                </TableHeaderCellBlack>
              </TableRow>
            </TableHead>
            <TableBody>
              {tires.map((tire) => (
                <TableRow key={tire.code}>
                  <TableBodyCell>{tire.economic_number}</TableBodyCell>
                  <TableBodyCell>{tire.real_position}</TableBodyCell>
                  <TableBodyCell>{tire.code}</TableBodyCell>
                  <TableBodyCell>{tire.subsidiary_name}</TableBodyCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
