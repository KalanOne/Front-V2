import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { useTranslation } from "react-i18next";

import {
  AccordionTableCellBlack, // TableReportHeaderCell,
} from "src/components/common/CustomAccordionTable";
import { TableHeaderCell } from "src/components/common/CustomTable.tsx";

export { UserReviewSummaryTable };

interface UserReviewSummaryTableProps {
  summary: any;
}

function UserReviewSummaryTable({
  summary,
}: UserReviewSummaryTableProps): React.ReactElement {
  const { t } = useTranslation();
  const formatter = new Intl.NumberFormat("en", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  });

  const percentFormatter = new Intl.NumberFormat("en", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  });

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow
            sx={{
              background:
                "linear-gradient(130deg,rgba(45, 104, 255, 1) 0%,rgba(24, 34, 59, 1) 100%)",
            }}
          >
            <TableHeaderCell>{"Usuario"}</TableHeaderCell>
            <TableHeaderCell>{"Revisiones de Vehículo"}</TableHeaderCell>
            <TableHeaderCell>{"Revisiones de Neumáticos"}</TableHeaderCell>
            <TableHeaderCell>{"Porcentaje"}</TableHeaderCell>
            <TableHeaderCell>{"Vehículos Revisados"}</TableHeaderCell>
            <TableHeaderCell>{"Flota"}</TableHeaderCell>
            <TableHeaderCell>
              {"Porcentaje de Revisión de Flota"}
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {summary &&
            Object.entries(summary["review"]).map(([user, userData]) => (
              <TableRow key={user}>
                <AccordionTableCellBlack>{user}</AccordionTableCellBlack>
                <AccordionTableCellBlack>
                  {formatter.format(userData.vehicle_review)}
                </AccordionTableCellBlack>
                <AccordionTableCellBlack>
                  {formatter.format(userData.tire_review)}
                </AccordionTableCellBlack>
                <AccordionTableCellBlack>
                  {formatter.format(userData.percent)}
                </AccordionTableCellBlack>
                <AccordionTableCellBlack>
                  {formatter.format(userData.number_vehicles_review)}
                </AccordionTableCellBlack>
                <AccordionTableCellBlack>
                  {formatter.format(userData.fleet)}
                </AccordionTableCellBlack>
                <AccordionTableCellBlack>
                  {formatter.format(userData.fleet_percentage)}
                </AccordionTableCellBlack>
              </TableRow>
            ))}
          {summary && (
            <TableRow sx={{ background: "#ECECEC" }}>
              <AccordionTableCellBlack sx={{ fontWeight: "bold" }}>
                {"Total"}
              </AccordionTableCellBlack>
              <AccordionTableCellBlack sx={{ fontWeight: "bold" }}>
                {formatter.format(
                  Object.values(summary["review"])
                    .map((e) => e.vehicle_review)
                    .reduce((a, b) => a + b, 0),
                )}
              </AccordionTableCellBlack>
              <AccordionTableCellBlack sx={{ fontWeight: "bold" }}>
                {formatter.format(
                  Object.values(summary["review"])
                    .map((e) => e.tire_review)
                    .reduce((a, b) => a + b, 0),
                )}
              </AccordionTableCellBlack>
              <AccordionTableCellBlack sx={{ fontWeight: "bold" }}>
                {"100%"}
              </AccordionTableCellBlack>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
