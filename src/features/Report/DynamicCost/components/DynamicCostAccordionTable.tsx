import React from "react";

import { Paper, Table, TableBody, TableContainer } from "@mui/material";

import { useTranslation } from "react-i18next";

import { AccordionTable } from "src/components/report/AccordionTable";
import { filterNonObjects } from "src/utils/object";

import { DynamicCostResponse } from "../types/dynamicCostTypes";
import { DynamicCostAccordionRow } from "./DynamicCostAccordionRow";

export { DynamicCostAccordionTable };

interface DynamicCostAccordionTableProps {
  report: DynamicCostResponse;
  onModelClick: (params: any) => void;
}

function DynamicCostAccordionTable({
  report,
  onModelClick,
}: DynamicCostAccordionTableProps): React.ReactElement {
  const { t } = useTranslation();
  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableBody>
            {report &&
              Object.entries(report).map(([tab, tabObject]) =>
                Object.entries(filterNonObjects(tabObject)).map(
                  ([corporate, corporateObject]) => (
                    <AccordionTable
                      key={corporate}
                      render={(children, onClick) => (
                        <>
                          <DynamicCostAccordionRow
                            onClick={onClick}
                            title={corporate}
                            lvl={"1"}
                            data={corporateObject}
                            children={children}
                            withTitle={true}
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
                                <DynamicCostAccordionRow
                                  onClick={onClick}
                                  title={company}
                                  lvl={"2"}
                                  data={companyObject}
                                  children={children}
                                  withTitle={true}
                                />
                              </>
                            )}
                          >
                            {Object.entries(
                              filterNonObjects(companyObject),
                            ).map(([subsidiary, subsidiaryObject]) => (
                              <AccordionTable
                                key={subsidiary}
                                render={(children, onClick) => (
                                  <>
                                    <DynamicCostAccordionRow
                                      onClick={onClick}
                                      title={subsidiary}
                                      lvl={"3"}
                                      data={subsidiaryObject}
                                      children={children}
                                      withTitle={true}
                                    />
                                  </>
                                )}
                              >
                                {Object.entries(
                                  filterNonObjects(subsidiaryObject),
                                ).map(([division, divisionObject]) => (
                                  <AccordionTable
                                    key={division}
                                    render={(children, onClick) => (
                                      <>
                                        <DynamicCostAccordionRow
                                          onClick={onClick}
                                          title={division}
                                          lvl={"4"}
                                          data={divisionObject}
                                          children={children}
                                          withTitle={true}
                                        />
                                      </>
                                    )}
                                  >
                                    {Object.entries(
                                      filterNonObjects(
                                        divisionObject["applications"],
                                      ),
                                    ).map(
                                      ([application, applicationObject]) => (
                                        <AccordionTable
                                          key={application}
                                          render={(children, onClick) => (
                                            <>
                                              <DynamicCostAccordionRow
                                                onClick={onClick}
                                                title={
                                                  applicationObject[
                                                    "application"
                                                  ]
                                                }
                                                lvl={"5"}
                                                data={applicationObject}
                                                children={children}
                                                withTitle={true}
                                              />
                                            </>
                                          )}
                                        >
                                          {Object.entries(
                                            filterNonObjects(
                                              applicationObject["sizes"],
                                            ),
                                          ).map(([sizes, sizesObject]) => (
                                            <AccordionTable
                                              key={sizes}
                                              render={(children, onClick) => (
                                                <>
                                                  <DynamicCostAccordionRow
                                                    onClick={onClick}
                                                    title={sizesObject["size"]}
                                                    lvl={"6"}
                                                    data={sizesObject}
                                                    children={children}
                                                    withTitle={true}
                                                  />
                                                </>
                                              )}
                                            >
                                              {Object.entries(
                                                filterNonObjects(
                                                  sizesObject["models"],
                                                ),
                                              ).map(
                                                ([models, modelsObject]) => (
                                                  <DynamicCostAccordionRow
                                                    onClick={() =>
                                                      onModelClick(modelsObject)
                                                    }
                                                    title={
                                                      modelsObject["model"]
                                                    }
                                                    lvl={"7"}
                                                    data={modelsObject}
                                                    withTitle={true}
                                                  />
                                                ),
                                              )}
                                            </AccordionTable>
                                          ))}
                                        </AccordionTable>
                                      ),
                                    )}
                                  </AccordionTable>
                                ))}
                              </AccordionTable>
                            ))}
                          </AccordionTable>
                        ),
                      )}
                    </AccordionTable>
                  ),
                ),
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

/*
Object.entries(report.general).map(
                ([corporate, corporateObject]) => (
                  <AccordionTable
                    key={corporate}
                    render={(children, onClick) => (
                      <>
                        <DynamicCostAccordionRow
                          onClick={onClick}
                          title={corporate}
                          lvl={"1"}
                          data={corporateObject}
                          children={children}
                          withTitle={true}
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
                              <DynamicCostAccordionRow
                                onClick={onClick}
                                title={company}
                                lvl={"2"}
                                data={companyObject}
                                children={children}
                                withTitle={true}
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
                                    <DynamicCostAccordionRow
                                      onClick={onClick}
                                      title={subsidiary}
                                      lvl={"3"}
                                      data={subsidiaryObject}
                                      children={children}
                                      withTitle={true}
                                    />
                                  </>
                                )}
                              >
                                {Object.entries(
                                  filterNonObjects(subsidiaryObject),
                                ).map(([division, divisionObject]) => (
                                  <AccordionTable
                                    key={division}
                                    render={(children, onClick) => (
                                      <>
                                        <DynamicCostAccordionRow
                                          onClick={onClick}
                                          title={division}
                                          lvl={"4"}
                                          data={divisionObject}
                                          children={children}
                                          withTitle={true}
                                        />
                                      </>
                                    )}
                                  >
                                    {Object.entries(
                                      filterNonObjects(
                                        divisionObject["applications"],
                                      ),
                                    ).map(
                                      ([application, applicationObject]) => (
                                        <AccordionTable
                                          key={application}
                                          render={(children, onClick) => (
                                            <>
                                              <DynamicCostAccordionRow
                                                onClick={onClick}
                                                title={
                                                  applicationObject[
                                                    "application"
                                                  ]
                                                }
                                                lvl={"5"}
                                                data={applicationObject}
                                                children={children}
                                                withTitle={true}
                                              />
                                            </>
                                          )}
                                        >
                                          <div>Hola</div>
                                        </AccordionTable>
                                      ),
                                    )}
                                  </AccordionTable>
                                ))}
                              </AccordionTable>
                            ),
                          )}
                        </AccordionTable>
                      ),
                    )}
                  </AccordionTable>
                ),
              )
*/
