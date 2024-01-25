import React from "react";

import { Table, TableBody, TableContainer, TableRow } from "@mui/material";

import {
  AccordionTableHeader,
  AccordionTableRow,
  TableTitleLvl1,
} from "src/components/common/CustomAccordionTable.tsx";
import { AccordionTable } from "src/components/report/AccordionTable.tsx";
import { BestPerformanceAccordionRow } from "src/features/Report/BestPerformance/components/BestPerformanceAccordionRow.tsx";
import { costKmFormatter, formatter } from "src/utils/formatters.ts";
import { filterNonObjects } from "src/utils/object.ts";

export { BestPerformanceAccordionTable };

interface BestPerformanceAccordionTableProps {
  bestPerformances: any;
}
function BestPerformanceAccordionTable({
  bestPerformances,
}: BestPerformanceAccordionTableProps): React.ReactElement {
  return (
    <TableContainer>
      <Table>
        <TableBody>
          {Object.entries(bestPerformances)
            .filter((e) => e[0] !== "tier_list")
            .map(([corporate, corporateObject]) => {
              return (
                <AccordionTable
                  render={(children, onClick) => (
                    <>
                      <AccordionTableRow onClick={onClick} level={"1"}>
                        <AccordionTableHeader level={"1"}>
                          {corporate}
                        </AccordionTableHeader>
                        <TableTitleLvl1
                          title="Neumáticos"
                          value={formatter.format(corporateObject.statistics)}
                        />
                        <TableTitleLvl1
                          title="Costo actual por Km"
                          value={`$${formatter.format(corporateObject.cpk)}`}
                        />
                        <TableTitleLvl1
                          title="Propuesta"
                          value={`$${formatter.format(
                            corporateObject.potential,
                          )}`}
                        />
                        <TableTitleLvl1
                          title="Ahorro real por Km"
                          value={`$${costKmFormatter.format(
                            corporateObject["km*Real"],
                          )}`}
                        />
                      </AccordionTableRow>
                      {children}
                    </>
                  )}
                >
                  {Object.entries(filterNonObjects(corporateObject)).map(
                    ([company, companyObject]) => {
                      const companyData = corporateObject[company];
                      return (
                        <>
                          <AccordionTable
                            render={(children, onClick) => (
                              <>
                                <BestPerformanceAccordionRow
                                  onClick={onClick}
                                  title={company}
                                  lvl={"2"}
                                  data={companyData}
                                  supObject={corporateObject}
                                  children={children}
                                />
                              </>
                            )}
                          >
                            {Object.entries(
                              filterNonObjects(companyObject),
                            ).map(([subsidiary, subsidiaryObject]) => {
                              const subsidiaryData = companyObject[subsidiary];
                              return (
                                <>
                                  <AccordionTable
                                    render={(children, onClick) => (
                                      <>
                                        <BestPerformanceAccordionRow
                                          onClick={onClick}
                                          title={subsidiary}
                                          lvl={"3"}
                                          data={subsidiaryData}
                                          supObject={companyObject}
                                          children={children}
                                        />
                                      </>
                                    )}
                                  >
                                    {Object.entries(
                                      filterNonObjects(subsidiaryObject),
                                    ).map(([divison, divisonObject]) => {
                                      const divisonData =
                                        subsidiaryObject[divison];
                                      return (
                                        <>
                                          <AccordionTable
                                            render={(children, onClick) => (
                                              <>
                                                <BestPerformanceAccordionRow
                                                  onClick={onClick}
                                                  title={divison}
                                                  lvl={"4"}
                                                  data={divisonData}
                                                  supObject={subsidiaryObject}
                                                  children={children}
                                                />
                                              </>
                                            )}
                                          >
                                            {Object.entries(
                                              filterNonObjects(divisonObject),
                                            ).map(
                                              ([
                                                application,
                                                applicationObject,
                                              ]) => {
                                                const applicationData =
                                                  divisonObject[application];
                                                return (
                                                  <>
                                                    <AccordionTable
                                                      render={(
                                                        children,
                                                        onClick,
                                                      ) => (
                                                        <>
                                                          <BestPerformanceAccordionRow
                                                            onClick={onClick}
                                                            title={application}
                                                            lvl={"5"}
                                                            data={
                                                              applicationData
                                                            }
                                                            supObject={
                                                              divisonObject
                                                            }
                                                            children={children}
                                                          />
                                                        </>
                                                      )}
                                                    >
                                                      {Object.entries(
                                                        filterNonObjects(
                                                          applicationObject,
                                                        ),
                                                      ).map(
                                                        ([
                                                          size,
                                                          sizeObject,
                                                        ]) => {
                                                          const sizeData =
                                                            applicationObject[
                                                              size
                                                            ];
                                                          return (
                                                            <>
                                                              <AccordionTable
                                                                render={(
                                                                  children,
                                                                  onClick,
                                                                ) => (
                                                                  <>
                                                                    <BestPerformanceAccordionRow
                                                                      onClick={
                                                                        onClick
                                                                      }
                                                                      title={
                                                                        size
                                                                      }
                                                                      lvl={"6"}
                                                                      data={
                                                                        sizeData
                                                                      }
                                                                      supObject={
                                                                        applicationObject
                                                                      }
                                                                      children={
                                                                        children
                                                                      }
                                                                    />
                                                                  </>
                                                                )}
                                                              >
                                                                <Table>
                                                                  <TableBody>
                                                                    {Object.entries(
                                                                      filterNonObjects(
                                                                        sizeObject,
                                                                      ),
                                                                    ).map(
                                                                      (
                                                                        [
                                                                          tire,
                                                                          tireObject,
                                                                        ],
                                                                        index,
                                                                      ) => {
                                                                        const tireData =
                                                                          sizeObject[
                                                                            tire
                                                                          ];
                                                                        return (
                                                                          <TableRow
                                                                            key={
                                                                              index
                                                                            }
                                                                          >
                                                                            <AccordionTableHeader
                                                                              level={
                                                                                "7"
                                                                              }
                                                                              isDark={
                                                                                true
                                                                              }
                                                                            >
                                                                              {
                                                                                tire
                                                                              }
                                                                            </AccordionTableHeader>
                                                                            <TableTitleLvl1
                                                                              title="KM"
                                                                              value={`${formatter.format(
                                                                                tireData[
                                                                                  "travel_summary"
                                                                                ],
                                                                              )}`}
                                                                              isDark={
                                                                                true
                                                                              }
                                                                            />
                                                                            <TableTitleLvl1
                                                                              title="Neumáticos"
                                                                              value={formatter.format(
                                                                                tireData.statistics,
                                                                              )}
                                                                              isDark={
                                                                                true
                                                                              }
                                                                            />
                                                                            <TableTitleLvl1
                                                                              title="$KM"
                                                                              value={`$${formatter.format(
                                                                                tireData.cpk,
                                                                              )}`}
                                                                              isDark={
                                                                                true
                                                                              }
                                                                            />
                                                                            <TableTitleLvl1
                                                                              title={`1vs${
                                                                                index +
                                                                                1
                                                                              }`}
                                                                              value={`$${formatter.format(
                                                                                tireData.vs,
                                                                              )}`}
                                                                              isDark={
                                                                                true
                                                                              }
                                                                            />
                                                                            <TableTitleLvl1
                                                                              title="Costo Km"
                                                                              value={`$${costKmFormatter.format(
                                                                                tireData[
                                                                                  "costKm"
                                                                                ],
                                                                              )}`}
                                                                              isDark={
                                                                                true
                                                                              }
                                                                            />
                                                                          </TableRow>
                                                                        );
                                                                      },
                                                                    )}
                                                                  </TableBody>
                                                                </Table>
                                                              </AccordionTable>
                                                            </>
                                                          );
                                                        },
                                                      )}
                                                    </AccordionTable>
                                                  </>
                                                );
                                              },
                                            )}
                                          </AccordionTable>
                                        </>
                                      );
                                    })}
                                  </AccordionTable>
                                </>
                              );
                            })}
                          </AccordionTable>
                        </>
                      );
                    },
                  )}
                </AccordionTable>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
