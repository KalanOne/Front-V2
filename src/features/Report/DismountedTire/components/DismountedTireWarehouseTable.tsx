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

import { DismountedTireTableResponse } from "../types/dismountedTireTypes";

export { DismountedTireWarehouseTable };

interface DismountedTireWarehouseTableProps {
  title: string;
  tires: DismountedTireTableResponse[];
}

function DismountedTireWarehouseTable({
  title,
  tires,
}: DismountedTireWarehouseTableProps) {
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
                <TableHeaderCellBlack>{t("labels:code")}</TableHeaderCellBlack>
                <TableHeaderCellBlack>
                  {t("common:subsidiary")}
                </TableHeaderCellBlack>
              </TableRow>
            </TableHead>
            <TableBody>
              {tires.map((tire) => (
                <TableRow key={tire.code}>
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
