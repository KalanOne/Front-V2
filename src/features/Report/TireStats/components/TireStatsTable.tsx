import React from "react";

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import {
  TableBodyCell,
  TableHeaderCell,
} from "src/components/common/CustomTable";

import { TireStatsItem } from "../types/tireStatsTypes";

export { TireStatsTable };

interface TireStatsTableProps {
  data: any;
}

function TireStatsTable({ data }: TireStatsTableProps): React.ReactElement {
  return (
    <Box sx={{ display: "flex", gap: 4, mt: 3 }}>
      {Object.entries(data).map(
        ([_, vehicleObject]: [string, any]) =>
          vehicleObject.length > 0 && (
            <TableContainer component={Paper}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        backgroundColor: "#4eacdf",
                        color: "white",
                        fontSize: "0.95rem",
                        textAlign: "left",
                      }}
                    >
                      {"MARCA"}
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#4eacdf",
                        color: "white",
                        fontSize: "0.95rem",
                        textAlign: "right",
                      }}
                    >
                      {"NO. NEUMÁTICOS"}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {vehicleObject.map((tire: any, index: any) => (
                    <TableRow key={index}>
                      <TableBodyCell
                        sx={{
                          textAlign: "left",
                        }}
                      >
                        {tire[0]}
                      </TableBodyCell>
                      <TableBodyCell
                        sx={{
                          textAlign: "right",
                        }}
                      >
                        {tire[1]}
                      </TableBodyCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ),
      )}
    </Box>
  );
}
