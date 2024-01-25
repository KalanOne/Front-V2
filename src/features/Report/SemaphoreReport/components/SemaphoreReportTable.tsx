import React, { useEffect, useState } from "react";

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import {
  TableBodyCell,
  TableHeaderCell,
  TableHeaderCellGray,
} from "src/components/common/CustomTable";
import { percentFormatter } from "src/utils/formatters";
import { filterNonObjects } from "src/utils/object";

import { TireObject } from "../types/semaphoreTypes";

export { SemaphoreReportTable };

interface SemaphoreReportTableProps {
  data: any;
  currentTab: string;
}

function SemaphoreReportTable({
  data,
  currentTab,
}: SemaphoreReportTableProps): React.ReactElement {
  const [tableData2, setTableData2] = useState<any>([]);
  const [totalOR, setTotalOR] = useState({
    TotalO: 0,
    TotalR: 0,
  });
  const [totalCondition, setTotalCondition] = useState<any>({
    TotalGood: 0,
    TotalSchedule: 0,
    TotalBad: 0,
    Total: 0,
  });
  const tableSize =
    currentTab === "TRUCK_TRACTOR" ? 11 : currentTab === "BOX" ? 13 : 0;

  function getTableData() {
    let TO = 0;
    let TR = 0;
    let TG = 0;
    let TS = 0;
    let TB = 0;
    if (data) {
      setTableData2([]);
      const updatedTableData = Object.entries(filterNonObjects(data)).map(
        ([_, vehicleObject]) => {
          const objTable = {
            O: 0,
            R: 0,
            T: 0,
          };

          Object.entries(filterNonObjects(vehicleObject)).forEach(
            ([_, tire]: [any, any]) => {
              if (tire.tire_condition_id) {
                if (tire.tire_condition_id.includes("ORIGINAL")) {
                  objTable.O += 1;
                  TO += 1;
                } else {
                  objTable.R += 1;
                  TR += 1;
                }
                objTable.T += 1;
              }
              if (tire.depth_condition) {
                if (tire.depth_condition.includes("GOOD")) {
                  TG += 1;
                } else if (tire.depth_condition.includes("SCHEDULE")) {
                  TS += 1;
                } else {
                  TB += 1;
                }
              }
            },
          );

          return objTable;
        },
      );

      setTableData2(updatedTableData);
      setTotalOR({
        TotalO: TO,
        TotalR: TR,
      });
      setTotalCondition({
        TotalGood: TG,
        TotalSchedule: TS,
        TotalBad: TB,
        Total: TG + TS + TB,
      });
    }
  }

  useEffect(() => {
    getTableData();
  }, [data]);

  return (
    <>
      <Box
        sx={{
          alignContent: "center",
          margin: "auto",
          textAlign: "center",
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            width: "20%",
            display: "inline-block",
            verticalAlign: "top",
            mr: 5,
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableHeaderCell>{"Suma Total Originales"}</TableHeaderCell>
                <TableHeaderCell>{"Suma Total Revitalizados"}</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableBodyCell>{totalOR.TotalO}</TableBodyCell>
                <TableBodyCell>{totalOR.TotalR}</TableBodyCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer
          component={Paper}
          sx={{
            width: "20%",
            display: "inline-block",
            verticalAlign: "top",
            ml: 5,
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableHeaderCell>{"Total"}</TableHeaderCell>
                <TableHeaderCell>{"%"}</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(totalCondition).map((prop, index) => (
                <TableRow key={index}>
                  <TableBodyCell
                    sx={{
                      backgroundColor:
                        prop === "TotalGood"
                          ? "green"
                          : prop === "TotalSchedule"
                          ? "yellow"
                          : prop === "TotalBad"
                          ? "red"
                          : "white",
                    }}
                  >
                    {totalCondition[prop]}
                  </TableBodyCell>
                  <TableBodyCell>
                    {`${percentFormatter.format(
                      (totalCondition[prop] / totalCondition.Total) * 100,
                    )}%`}
                  </TableBodyCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box sx={{ mt: 3 }}>
        <TableContainer
          component={Paper}
          sx={{ width: "75%", display: "inline-block", verticalAlign: "top" }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableHeaderCellGray
                  align="center"
                  colSpan={1}
                ></TableHeaderCellGray>
                {Array.from({ length: tableSize }).map((_, index) => (
                  <React.Fragment key={index}>
                    <TableHeaderCellGray align="center" colSpan={2}>
                      {`#${index + 1}`}
                    </TableHeaderCellGray>
                  </React.Fragment>
                ))}
              </TableRow>
              <TableRow>
                <TableHeaderCellGray>{"Unidad"}</TableHeaderCellGray>
                {Array.from({ length: tableSize }).map((_, index) => (
                  <React.Fragment key={index}>
                    <TableHeaderCell>{"MM"}</TableHeaderCell>
                    <TableHeaderCell>{"O/R"}</TableHeaderCell>
                  </React.Fragment>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                Object.entries(filterNonObjects(data)).map(
                  ([vehicle, vehicleObject]) => (
                    <TableRow
                      key={vehicle}
                      sx={{ "& td": { border: "1px solid black" } }}
                    >
                      <TableBodyCell>{vehicle}</TableBodyCell>
                      {Object.entries(filterNonObjects(vehicleObject)).map(
                        ([t, tire]: [any, any]) => (
                          <React.Fragment key={t}>
                            <TableBodyCell
                              sx={{
                                backgroundColor: getColor(tire as TireObject),
                                color: "white",
                              }}
                            >
                              {tire.code}
                            </TableBodyCell>
                            <TableBodyCell>
                              {getTireCondition(tire as TireObject)}
                            </TableBodyCell>
                          </React.Fragment>
                        ),
                      )}
                    </TableRow>
                  ),
                )}
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer
          component={Paper}
          sx={{
            width: "20%",
            display: "inline-block",
            ml: 2,
            verticalAlign: "top",
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableHeaderCellGray align="center" colSpan={3}>
                  {"Tabla"}
                </TableHeaderCellGray>
              </TableRow>
              <TableRow>
                <TableHeaderCell>{"Total O"}</TableHeaderCell>
                <TableHeaderCell>{"Total R"}</TableHeaderCell>
                <TableHeaderCell>{"Total"}</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                Object.entries(filterNonObjects(tableData2)).map(
                  ([data, dataObject]: [any, any]) => (
                    <TableRow
                      key={data}
                      sx={{ "& td": { border: "1px solid black" } }}
                    >
                      <TableBodyCell>{dataObject.O}</TableBodyCell>
                      <TableBodyCell>{dataObject.R}</TableBodyCell>
                      <TableBodyCell>{dataObject.T}</TableBodyCell>
                    </TableRow>
                  ),
                )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

function getTireCondition(tire: TireObject): string {
  if (tire.tire_condition_id) {
    if (tire.tire_condition_id.includes("ORIGINAL")) {
      return "O";
    } else {
      return "R";
    }
  } else {
    return "";
  }
}

function getColor(tire: TireObject): string {
  if (tire.depth_condition) {
    if (tire.depth_condition.includes("GOOD")) {
      return "green";
    } else if (tire.depth_condition.includes("SCHEDULE")) {
      return "yellow";
    } else {
      return "red";
    }
  } else {
    return "white";
  }
}
