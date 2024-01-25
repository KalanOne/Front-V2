import React from "react";

import { Paper, Table, TableBody, TableContainer } from "@mui/material";

import { useTranslation } from "react-i18next";

import {
  AccordionTableCell,
  AccordionTableHeader,
  AccordionTableRow,
  TableTitleLvl1,
} from "src/components/common/CustomAccordionTable";
import { AccordionTable } from "src/components/report/AccordionTable";
import { formatter } from "src/utils/formatters";
import { filterNonObjects, removeCharacters } from "src/utils/object";

import { KmProjectionResponse } from "../types/kmProjectionTypes";
import { ButtonReview } from "./ButtonReview";
import { KmProjectionAccordionRow } from "./KmProjectionAccordionRow";

export { KmProjectionAccordionTable };

interface KmProjectionAccordionTableProps {
  report: KmProjectionResponse;
  onTireAplicationClick: (params: any) => void;
  onButtonClick: (params: any) => void;
}

function KmProjectionAccordionTable({
  report,
  onTireAplicationClick,
  onButtonClick,
}: KmProjectionAccordionTableProps): React.ReactElement {
  const { t } = useTranslation();
  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableBody>
            {report &&
              Object.entries(report.general).map(
                ([corporate, corporateObject]) => (
                  <AccordionTable
                    key={corporate}
                    render={(children, onClick) => (
                      <>
                        <KmProjectionAccordionRow
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
                              <KmProjectionAccordionRow
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
                                    <KmProjectionAccordionRow
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
                                ).map(([division, divisionObject]) => (
                                  <AccordionTable
                                    key={division}
                                    render={(children, onClick) => (
                                      <>
                                        <KmProjectionAccordionRow
                                          onClick={onClick}
                                          title={division}
                                          lvl={"4"}
                                          data={divisionObject}
                                          children={children}
                                        />
                                      </>
                                    )}
                                  >
                                    {Object.entries(
                                      filterNonObjects(divisionObject),
                                    ).map(
                                      ([
                                        tireAplication,
                                        tireAplicationObject,
                                      ]) => (
                                        <AccordionTable
                                          key={tireAplication}
                                          render={(children, onClick) => (
                                            <>
                                              <KmProjectionAccordionRow
                                                onClick={(e) => {
                                                  onClick(e);
                                                  onTireAplicationClick({
                                                    corporate,
                                                    company,
                                                    subsidiary,
                                                    division,
                                                    tireAplication,
                                                  });
                                                }}
                                                title={t(
                                                  `features:reportWarehouse.tire_application.${removeCharacters(
                                                    tireAplication,
                                                  ).toLowerCase()}`,
                                                )}
                                                lvl={"5"}
                                                data={tireAplicationObject}
                                                children={children}
                                              />
                                            </>
                                          )}
                                        >
                                          {Object.entries(
                                            filterNonObjects(
                                              tireAplicationObject,
                                            ),
                                          ).map(([model, modelObject]) => (
                                            <AccordionTable
                                              key={model}
                                              render={(children, onClick) => (
                                                <>
                                                  <KmProjectionAccordionRow
                                                    onClick={onClick}
                                                    title={model}
                                                    lvl={"6"}
                                                    data={modelObject}
                                                    children={children}
                                                  />
                                                </>
                                              )}
                                            >
                                              {Object.entries(
                                                filterNonObjects(modelObject),
                                              ).map(([tire, tireObject]) => (
                                                <AccordionTableRow
                                                  level={"7"}
                                                  key={tire}
                                                >
                                                  <AccordionTableHeader
                                                    level={"7"}
                                                  >
                                                    <ButtonReview
                                                      tireObject={tireObject}
                                                      onClick={onButtonClick}
                                                    ></ButtonReview>
                                                  </AccordionTableHeader>
                                                  <AccordionTableCell>
                                                    {formatter.format(
                                                      tireObject["km/mm"],
                                                    )}
                                                  </AccordionTableCell>
                                                  <AccordionTableCell>
                                                    {formatter.format(
                                                      tireObject["projection"],
                                                    )}
                                                  </AccordionTableCell>
                                                  <AccordionTableCell>
                                                    {`$${formatter.format(
                                                      tireObject["cpk"],
                                                    )}`}
                                                  </AccordionTableCell>
                                                </AccordionTableRow>
                                              ))}
                                            </AccordionTable>
                                          ))}
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
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
