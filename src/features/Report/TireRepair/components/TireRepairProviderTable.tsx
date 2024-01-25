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

import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

import { CardHeaderGradient } from "src/components/common/CustomCard";
import {
  TableBodyCell,
  TableHeaderCellBlack,
} from "src/components/common/CustomTable";
import { TableTitle } from "src/components/common/TableTitle";

import { TireRepairTableResponse } from "../types/tireRepairTypes";

export { TireRepairProviderTable };

interface TireRepairProviderTableProps {
  title: string;
  tires: TireRepairTableResponse[];
}

function TireRepairProviderTable({
  title,
  tires,
}: TireRepairProviderTableProps) {
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
                  {t("labels:date_send")}
                </TableHeaderCellBlack>
                <TableHeaderCellBlack>{t("general:days")}</TableHeaderCellBlack>
                <TableHeaderCellBlack>{t("labels:code")}</TableHeaderCellBlack>
                <TableHeaderCellBlack>
                  {t("common:subsidiary")}
                </TableHeaderCellBlack>
              </TableRow>
            </TableHead>
            <TableBody>
              {tires.map((tire) => (
                <TableRow key={tire.code}>
                  <TableBodyCell>{`${dayjs(tire.date_send).format(
                    "LL",
                  )}`}</TableBodyCell>
                  <TableBodyCell>{`${dayjs().diff(
                    dayjs(tire["date_send"]).format("YYYY-MM-DD"),
                    "days",
                  )}`}</TableBodyCell>
                  <TableBodyCell>{tire.code}</TableBodyCell>
                  <TableBodyCell>{tire.subsidiary_tire_name}</TableBodyCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
