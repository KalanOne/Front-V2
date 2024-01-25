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

import { KmPileAccordionRow } from "./KmPileAccordionRow";
import { KmPileAccordionTableResponsible } from "./KmPileAccordionTableResponsible";

export { KmPileAccordionTable };

interface KmPileAccordionTableProps {
  kmPileData: any;
  handleResponsibleClick: (data: any) => void;
  handleModelClick: (data: any) => void;
}

function KmPileAccordionTable({
  kmPileData,
  handleResponsibleClick,
  handleModelClick,
}: KmPileAccordionTableProps) {
  const { t } = useTranslation();

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {Object.entries(kmPileData).map(
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
                          title={t("labels2:report_pile.tires")}
                          value={formatter.format(
                            (corporateObject as any).statistics,
                          )}
                        />
                        <TableTitleLvl1
                          title={t("labels2:km_pile_report.average")}
                          value={`${percentFormatter.format(
                            (corporateObject as any).travel_average,
                          )}`}
                        />
                        <TableTitleLvl1
                          title={t("labels2:km_pile_report.summary")}
                          value={`${percentFormatter.format(
                            (corporateObject as any).travel_summary,
                          )}`}
                        />
                        <TableTitleLvl1
                          title={t("labels2:km_pile_report.cost_km")}
                          value={`$${percentFormatter.format(
                            (corporateObject as any).cpk,
                          )}`}
                        />
                      </AccordionTableRow>
                      {children}
                    </>
                  )}
                >
                  <KmPileAccordionTableResponsible
                    extra={{ corporate_name: corporate }}
                    dataObject={corporateObject}
                    handleResponsibleClick={handleResponsibleClick}
                  />
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
                              <KmPileAccordionRow
                                onClick={onClick}
                                title={company}
                                lvl={"2"}
                                data={companyObject}
                                children={children}
                              />
                            </>
                          )}
                        >
                          <KmPileAccordionTableResponsible
                            extra={{
                              corporate_name: corporate,
                              company_name: company,
                            }}
                            dataObject={companyObject}
                            handleResponsibleClick={handleResponsibleClick}
                          />
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
                                        <KmPileAccordionRow
                                          onClick={onClick}
                                          title={subsidiary}
                                          lvl={"3"}
                                          data={subsidiaryObject}
                                          children={children}
                                        />
                                      </>
                                    )}
                                  >
                                    <KmPileAccordionTableResponsible
                                      extra={{
                                        corporate_name: corporate,
                                        company_name: company,
                                        subsidiary_name: subsidiary,
                                      }}
                                      dataObject={subsidiaryObject}
                                      handleResponsibleClick={
                                        handleResponsibleClick
                                      }
                                    />
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
                                                  <KmPileAccordionRow
                                                    onClick={onClick}
                                                    title={division}
                                                    lvl={"4"}
                                                    data={divisionObject}
                                                    children={children}
                                                  />
                                                </>
                                              )}
                                            >
                                              <KmPileAccordionTableResponsible
                                                extra={{
                                                  corporate_name: corporate,
                                                  company_name: company,
                                                  subsidiary_name: subsidiary,
                                                  division_name: division,
                                                }}
                                                dataObject={divisionObject}
                                                handleResponsibleClick={
                                                  handleResponsibleClick
                                                }
                                              />
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
                                                            <KmPileAccordionRow
                                                              onClick={onClick}
                                                              title={t(
                                                                `labels:tire_application.options.${application.toLowerCase()}`,
                                                              )}
                                                              lvl={"5"}
                                                              data={
                                                                applicationObject
                                                              }
                                                              children={
                                                                children
                                                              }
                                                            />
                                                          </>
                                                        )}
                                                      >
                                                        <KmPileAccordionTableResponsible
                                                          extra={{
                                                            corporate_name:
                                                              corporate,
                                                            company_name:
                                                              company,
                                                            subsidiary_name:
                                                              subsidiary,
                                                            division_name:
                                                              division,
                                                            tire_application_id:
                                                              application,
                                                          }}
                                                          dataObject={
                                                            applicationObject
                                                          }
                                                          handleResponsibleClick={
                                                            handleResponsibleClick
                                                          }
                                                        />
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
                                                                      <KmPileAccordionRow
                                                                        onClick={(
                                                                          _e,
                                                                        ) => {
                                                                          handleModelClick(
                                                                            {
                                                                              corporate_name:
                                                                                corporate,
                                                                              company_name:
                                                                                company,
                                                                              subsidiary_name:
                                                                                subsidiary,
                                                                              division_name:
                                                                                division,
                                                                              tire_application_id:
                                                                                application,
                                                                              model:
                                                                                modelVariation,
                                                                            },
                                                                          );
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
