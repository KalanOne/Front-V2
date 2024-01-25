import { Table, TableBody, TableContainer } from "@mui/material";

import { useTranslation } from "react-i18next";

import {
  AccordionTableHeader,
  AccordionTableRow,
  TableTitleLvl1,
} from "src/components/common/CustomAccordionTable";
import { AccordionTable } from "src/components/report/AccordionTable";
import { formatter, percentFormatter } from "src/utils/formatters";
import { filterNonObjects } from "src/utils/object";

import { SummaryAccordionRow } from "./SummaryAccordionRow";
import { SummaryPriorityAccordionRow } from "./SummaryPriorityAccordionRow";

export { SummaryAccordionTable };

interface SummaryAccordionTableProps {
  summaryData: any;
  handleTableClick: (data: any) => void;
  active: "pressure" | "depth" | "alert";
}

function SummaryAccordionTable({
  summaryData,
  handleTableClick,
  active,
}: SummaryAccordionTableProps) {
  const { t } = useTranslation();

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {Object.entries(summaryData).map(
            ([corporate, corporateObject], index1: number) => {
              return (
                <AccordionTable
                  key={index1}
                  render={(children, onClick) => (
                    <>
                      <AccordionTableRow onClick={onClick} level={"1"}>
                        <AccordionTableHeader level={"1"}>
                          {corporate}
                        </AccordionTableHeader>
                        <TableTitleLvl1
                          title={t("common:tire_plural")}
                          value={formatter.format(
                            (corporateObject as any).statistics,
                          )}
                        />
                        <TableTitleLvl1
                          title={t("labels2:summary_report.percent")}
                          value={`${percentFormatter.format(
                            (corporateObject as any).percent,
                          )}%`}
                        />
                      </AccordionTableRow>
                      {children}
                    </>
                  )}
                >
                  {Object.entries(
                    filterNonObjects(corporateObject as object),
                  ).map(([company, companyObject], index2: number) => {
                    if (company === "retirement") return null;
                    return (
                      <>
                        <AccordionTable
                          key={index2}
                          render={(children, onClick) => (
                            <>
                              <SummaryAccordionRow
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
                            (
                              [subsidiary, subsidiaryObject],
                              index3: number,
                            ) => {
                              if (subsidiary === "retirement") return null;
                              return (
                                <>
                                  <AccordionTable
                                    key={index3}
                                    render={(children, onClick) => (
                                      <>
                                        <SummaryAccordionRow
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
                                    ).map(
                                      (
                                        [division, divisionObject],
                                        index4: number,
                                      ) => {
                                        if (division === "retirement")
                                          return null;
                                        return (
                                          <>
                                            <AccordionTable
                                              key={index4}
                                              render={(children, onClick) => (
                                                <>
                                                  <SummaryAccordionRow
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
                                                filterNonObjects(
                                                  divisionObject,
                                                ),
                                              ).map(
                                                (
                                                  [
                                                    application,
                                                    applicationObject,
                                                  ],
                                                  index5: number,
                                                ) => {
                                                  if (
                                                    application === "retirement"
                                                  )
                                                    return null;
                                                  return (
                                                    <>
                                                      <AccordionTable
                                                        key={index5}
                                                        render={(
                                                          children,
                                                          onClick,
                                                        ) => (
                                                          <>
                                                            <SummaryPriorityAccordionRow
                                                              onClick={onClick}
                                                              title={
                                                                application
                                                              }
                                                              //   lvl={"5"}
                                                              data={
                                                                applicationObject
                                                              }
                                                              children={
                                                                children
                                                              }
                                                              type={active}
                                                            />
                                                          </>
                                                        )}
                                                      >
                                                        {Object.entries(
                                                          filterNonObjects(
                                                            applicationObject,
                                                          ),
                                                        ).map(
                                                          (
                                                            [
                                                              modelVariation,
                                                              modelVariationObject,
                                                            ],
                                                            index6: number,
                                                          ) => {
                                                            if (
                                                              modelVariation ===
                                                              "retirement"
                                                            )
                                                              return null;
                                                            return (
                                                              <>
                                                                <AccordionTable
                                                                  key={index6}
                                                                  render={(
                                                                    children,
                                                                    _onClick,
                                                                  ) => (
                                                                    <>
                                                                      <SummaryAccordionRow
                                                                        onClick={(
                                                                          _e,
                                                                        ) => {
                                                                          if (
                                                                            active ===
                                                                            "pressure"
                                                                          ) {
                                                                            handleTableClick(
                                                                              {
                                                                                corporate_name:
                                                                                  corporate,
                                                                                company_name:
                                                                                  company,
                                                                                subsidiary_name:
                                                                                  subsidiary,
                                                                                division_name:
                                                                                  division,
                                                                                pressure_condition:
                                                                                  application,
                                                                                tire_application_id:
                                                                                  modelVariation,
                                                                              },
                                                                            );
                                                                          } else if (
                                                                            active ===
                                                                            "depth"
                                                                          ) {
                                                                            handleTableClick(
                                                                              {
                                                                                corporate_name:
                                                                                  corporate,
                                                                                company_name:
                                                                                  company,
                                                                                subsidiary_name:
                                                                                  subsidiary,
                                                                                division_name:
                                                                                  division,
                                                                                depth_condition:
                                                                                  application,
                                                                                tire_application_id:
                                                                                  modelVariation,
                                                                              },
                                                                            );
                                                                          } else if (
                                                                            active ===
                                                                            "alert"
                                                                          ) {
                                                                            handleTableClick(
                                                                              {
                                                                                corporate_name:
                                                                                  corporate,
                                                                                company_name:
                                                                                  company,
                                                                                subsidiary_name:
                                                                                  subsidiary,
                                                                                division_name:
                                                                                  division,
                                                                                priority:
                                                                                  application,
                                                                                tire_application_id:
                                                                                  modelVariation,
                                                                              },
                                                                            );
                                                                          }
                                                                        }}
                                                                        title={
                                                                          modelVariation
                                                                        }
                                                                        lvl={
                                                                          "6"
                                                                        }
                                                                        data={
                                                                          modelVariationObject
                                                                        }
                                                                        children={
                                                                          children
                                                                        }
                                                                      />
                                                                    </>
                                                                  )}
                                                                >
                                                                  <></>
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
              );
            },
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
