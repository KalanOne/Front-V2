import React, { useEffect, useState } from "react";

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import {
  TableBodyCell,
  TableHeaderCell,
  TableHeaderCellGray,
} from "src/components/common/CustomTable";
import { percentFormatter } from "src/utils/formatters";
import { filterNonObjects } from "src/utils/object";

export { SemaphoreReportSummary };

interface SemaphoreReportSummaryProps {
  depthTable: any;
  conditionTable: any;
  onRowClick: (division: string, condition: string) => void;
}

function SemaphoreReportSummary({
  depthTable,
  conditionTable,
  onRowClick,
}: SemaphoreReportSummaryProps): React.ReactElement {
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          width: "48%",
          display: "inline-block",
          verticalAlign: "top",
          margin: "0 auto", // Centra horizontalmente el Box
          textAlign: "center", // Centra el texto dentro del Box
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ textAlign: "center" }}>
          {"Condición de Profundidad"}
        </Typography>
        {depthTable.map((depthObjects: any, index: number) =>
          Object.entries(depthObjects).map(
            ([division, depthObject]: [any, any]) => (
              <TableContainer
                component={Paper}
                key={division}
                sx={{
                  width: "45%",
                  display: "inline-block",
                  m: 2,
                  verticalAlign: "top",
                }}
              >
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableHeaderCellGray align="center" colSpan={3}>
                        {division}
                      </TableHeaderCellGray>
                    </TableRow>
                    <TableRow>
                      <TableHeaderCell
                        align="center"
                        colSpan={3}
                      >{`${depthObject.U} Unidades ( ${depthObject.T} Neumáticos)`}</TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.keys(depthObject).map(
                      (prop, index) =>
                        prop !== "U" && (
                          <TableRow
                            key={index}
                            onClick={() => onRowClick(division, prop)}
                          >
                            <TableBodyCell>{depthObject[prop]}</TableBodyCell>
                            <TableBodyCell>
                              {`${percentFormatter.format(
                                (depthObject[prop] / depthObject.T) * 100,
                              )}%`}
                            </TableBodyCell>
                          </TableRow>
                        ),
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            ),
          ),
        )}
      </Box>

      <Box
        sx={{
          width: "48%",
          display: "inline-block",
          verticalAlign: "top",
          margin: "0 auto", // Centra horizontalmente el Box
          textAlign: "center", // Centra el texto dentro del Box
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ textAlign: "center" }}>
          {"Condición de Neumático"}
        </Typography>
        {conditionTable.map((conditionObjects: any, index: number) =>
          Object.entries(conditionObjects).map(
            ([division, conditionObject]: [any, any]) => (
              <TableContainer
                component={Paper}
                key={division}
                sx={{
                  width: "45%",
                  display: "inline-block",
                  m: 2,
                  verticalAlign: "top",
                }}
              >
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableHeaderCellGray align="center" colSpan={3}>
                        {division}
                      </TableHeaderCellGray>
                    </TableRow>
                    <TableRow>
                      <TableHeaderCell
                        align="center"
                        colSpan={3}
                      >{`${conditionObject.U} Unidades ( ${conditionObject.T} Neumáticos)`}</TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.keys(conditionObject).map(
                      (prop, index) =>
                        prop !== "U" && (
                          <TableRow key={index}>
                            <TableBodyCell>
                              {conditionObject[prop]}
                            </TableBodyCell>
                            <TableBodyCell>
                              {`${percentFormatter.format(
                                (conditionObject[prop] / conditionObject.T) *
                                  100,
                              )}%`}
                            </TableBodyCell>
                          </TableRow>
                        ),
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            ),
          ),
        )}
      </Box>
    </Box>
  );
}
