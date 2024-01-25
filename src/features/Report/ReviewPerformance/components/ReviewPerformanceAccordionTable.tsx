import React from "react";

import { Paper, Table, TableBody, TableContainer } from "@mui/material";

import { useTranslation } from "react-i18next";
import { object } from "zod";

import {
  AccordionTableCell,
  AccordionTableHeader,
  AccordionTableRow,
} from "src/components/common/CustomAccordionTable";
import { AccordionTable } from "src/components/report/AccordionTable";
import { formatter } from "src/utils/formatters";
import { filterNonObjects, removeCharacters } from "src/utils/object";

import { ButtonReview } from "./ButtonReview";
import { ReviewPerformanceAccordionRow } from "./ReviewPerformanceAccordionRow";

export { ReviewPerformanceAccordionTable };

interface ReviewPerformanceAccordionTableProps {
  report: any;
  onButtonClick: (params: any) => void;
}

function ReviewPerformanceAccordionTable({
  report,
  onButtonClick,
}: ReviewPerformanceAccordionTableProps): React.ReactElement {
  const { t } = useTranslation();
  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableBody>
            {report &&
              Object.entries(report).map(([subsidiary, subsidiaryObject]) =>
                Object.entries(
                  filterNonObjects(subsidiaryObject as Object),
                ).map(([division, divisionObject]) => (
                  <AccordionTable
                    key={division}
                    render={(children, onClick) => (
                      <>
                        <ReviewPerformanceAccordionRow
                          onClick={onClick}
                          title={division}
                          lvl={"2"}
                          data={divisionObject}
                          children={children}
                          withTitle={true}
                        />
                      </>
                    )}
                  >
                    {Object.entries(filterNonObjects(divisionObject)).map(
                      ([vehicleType, vehicleTypeObject]) => (
                        <AccordionTable
                          key={vehicleType}
                          render={(children, onClick) => (
                            <>
                              <ReviewPerformanceAccordionRow
                                onClick={onClick}
                                title={vehicleType}
                                lvl={"3"}
                                data={vehicleTypeObject}
                                children={children}
                                withTitle={true}
                              />
                            </>
                          )}
                        >
                          {Object.entries(
                            filterNonObjects(vehicleTypeObject),
                          ).map(([brand, brandObject]) => (
                            <AccordionTable
                              key={brand}
                              render={(children, onClick) => (
                                <>
                                  <ReviewPerformanceAccordionRow
                                    onClick={onClick}
                                    title={brand}
                                    lvl={"4"}
                                    data={brandObject}
                                    children={children}
                                    withTitle={true}
                                  />
                                </>
                              )}
                            >
                              {Object.entries(
                                filterNonObjects(brandObject),
                              ).map(([vehicle, vehicleObject]) => (
                                <AccordionTable
                                  key={vehicle}
                                  render={(children, onClick) => (
                                    <>
                                      <AccordionTableRow
                                        level={"7"}
                                        key={vehicle}
                                      >
                                        <ButtonReview
                                          reviewObject={vehicleObject}
                                          onClick={onButtonClick}
                                        ></ButtonReview>
                                      </AccordionTableRow>
                                    </>
                                  )}
                                >
                                  <div>Hola</div>
                                </AccordionTable>
                              ))}
                            </AccordionTable>
                          ))}
                        </AccordionTable>
                      ),
                    )}
                  </AccordionTable>
                )),
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
