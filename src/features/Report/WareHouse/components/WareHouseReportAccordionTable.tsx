import React from "react";

import { Paper, Table, TableBody, TableContainer } from "@mui/material";

import { useTranslation } from "react-i18next";

import {
  AccordionTableHeader,
  AccordionTableRow,
  TableTitleLvl1,
} from "src/components/common/CustomAccordionTable";
import { AccordionTable } from "src/components/report/AccordionTable";
import { filterNonObjects, removeCharacters } from "src/utils/object";

import { AccordionDataRow } from "../../UserReviewReport/components/AccordionDataRow";
import { WareHouseReportResponse } from "../types/wareHouseReportType";
import { WareHouseReportAccordionRow } from "./WareHouseReportAccordionRow";

export { WareHouseReportAccordionTable };

interface WareHouseReportAccordionTableProps {
  report: WareHouseReportResponse;
}

function WareHouseReportAccordionTable({
  report,
}: WareHouseReportAccordionTableProps): React.ReactElement {
  const { t } = useTranslation();
  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableBody>
            {report &&
              Object.entries(report).map(([corporate, corporateObject]) => (
                <AccordionTable
                  key={corporate}
                  render={(children, onClick) => (
                    <>
                      <WareHouseReportAccordionRow
                        onClick={onClick}
                        title={corporate}
                        lvl={"1"}
                        data={corporateObject}
                        children={children}
                      />
                    </>
                  )}
                >
                  {Object.entries(filterNonObjects(corporateObject)).map(
                    ([company, companyObject]) => (
                      <AccordionTable
                        key={company}
                        render={(children, onClick) => (
                          <>
                            <WareHouseReportAccordionRow
                              onClick={onClick}
                              title={company}
                              lvl={"2"}
                              data={companyObject}
                              children={children}
                            />
                          </>
                        )}
                      >
                        {Object.entries(filterNonObjects(companyObject)).map(
                          ([subsidiary, subsidiaryObject]) => (
                            <AccordionTable
                              key={subsidiary}
                              render={(children, onClick) => (
                                <>
                                  <WareHouseReportAccordionRow
                                    onClick={onClick}
                                    title={subsidiary}
                                    lvl={"3"}
                                    data={subsidiaryObject}
                                    children={children}
                                  />
                                </>
                              )}
                            >
                              {Object.entries(
                                filterNonObjects(subsidiaryObject),
                              ).map(([wareHouse, wareHouseObject]) => (
                                <AccordionTable
                                  key={wareHouse}
                                  render={(children, onClick) => (
                                    <>
                                      <WareHouseReportAccordionRow
                                        onClick={onClick}
                                        title={wareHouse}
                                        lvl={"4"}
                                        data={wareHouseObject}
                                        children={children}
                                      />
                                    </>
                                  )}
                                >
                                  {Object.entries(
                                    filterNonObjects(wareHouseObject),
                                  ).map(([condition, conditionObject]) => (
                                    <AccordionTable
                                      key={condition}
                                      render={(children, onClick) => (
                                        <>
                                          <WareHouseReportAccordionRow
                                            onClick={onClick}
                                            title={t(
                                              `features:reportWarehouse.tire_condition.${removeCharacters(
                                                condition,
                                              ).toLowerCase()}`,
                                            )}
                                            lvl={"5"}
                                            data={conditionObject}
                                            children={children}
                                            withTitle={true}
                                          />
                                        </>
                                      )}
                                    >
                                      {Object.entries(
                                        filterNonObjects(conditionObject),
                                      ).map(([policy, policyObject]) => (
                                        <AccordionTable
                                          key={policy}
                                          render={(children, onClick) => (
                                            <>
                                              <WareHouseReportAccordionRow
                                                onClick={onClick}
                                                title={t(
                                                  `features:reportWarehouse.depth_condition.${removeCharacters(
                                                    policy,
                                                    "_",
                                                  ).toLowerCase()}`,
                                                )}
                                                lvl={
                                                  policy.includes("CRITICAL")
                                                    ? "CRITICAL"
                                                    : policy.includes(
                                                        "SCHEDULED",
                                                      )
                                                    ? "SCHEDULED"
                                                    : "GOOD"
                                                }
                                                data={policyObject}
                                                children={children}
                                                withTitle={true}
                                              />
                                            </>
                                          )}
                                        >
                                          {Object.entries(
                                            filterNonObjects(policyObject),
                                          ).map(
                                            ([
                                              tireAplication,
                                              tireAplicationObject,
                                            ]) => (
                                              <AccordionTable
                                                key={tireAplication}
                                                render={(children, onClick) => (
                                                  <>
                                                    <WareHouseReportAccordionRow
                                                      onClick={onClick}
                                                      title={t(
                                                        `features:reportWarehouse.tire_application.${removeCharacters(
                                                          tireAplication,
                                                        ).toLowerCase()}`,
                                                      )}
                                                      lvl={"7"}
                                                      data={
                                                        tireAplicationObject
                                                      }
                                                      children={children}
                                                      withTitle={true}
                                                    />
                                                  </>
                                                )}
                                              >
                                                {Object.entries(
                                                  filterNonObjects(
                                                    tireAplicationObject,
                                                  ),
                                                ).map(([data, dataObject]) => (
                                                  <AccordionTableRow
                                                    level={"7"}
                                                    key={data}
                                                  >
                                                    <AccordionTableHeader
                                                      level={"7"}
                                                    >
                                                      {dataObject["code"]}
                                                    </AccordionTableHeader>
                                                    <TableTitleLvl1
                                                      title={t(
                                                        "features:reportWarehouse.movement_date",
                                                      )}
                                                      value={
                                                        dataObject[
                                                          "movement_date"
                                                        ]
                                                      }
                                                      isDark={true}
                                                    />

                                                    <TableTitleLvl1
                                                      title={t("common:model")}
                                                      value={`${dataObject["model"]} - ${dataObject["size"]}`}
                                                      isDark={true}
                                                    />
                                                    <TableTitleLvl1
                                                      title={t("common:size")}
                                                      value={dataObject["size"]}
                                                      isDark={true}
                                                    />
                                                    <TableTitleLvl1
                                                      title={t(
                                                        "features:reportWarehouse.depth",
                                                      )}
                                                      value={
                                                        dataObject["depth"]
                                                      }
                                                      isDark={true}
                                                    />
                                                  </AccordionTableRow>
                                                ))}
                                              </AccordionTable>
                                            ),
                                          )}
                                        </AccordionTable>
                                      ))}
                                    </AccordionTable>
                                  ))}
                                </AccordionTable>
                              ))}
                            </AccordionTable>
                          ),
                        )}
                      </AccordionTable>
                    ),
                  )}
                </AccordionTable>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
