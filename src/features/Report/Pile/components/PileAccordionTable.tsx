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

import { PileAccordionRow } from "./PileAccordionRow";
import { PileAccordionTableResponsible } from "./PileAccordionTableResponsible";

export { PileAccordionTable };

interface PileAccordionTableProps {
  pileData: any;
  handleResponsibleClick: (data: any) => void;
  handleModelClick: (data: any) => void;
}

function PileAccordionTable({
  pileData,
  handleResponsibleClick,
  handleModelClick,
}: PileAccordionTableProps) {
  const { t } = useTranslation();

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {Object.entries(pileData).map(
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
                          title={t("labels2:report_pile.average")}
                          value={`${percentFormatter.format(
                            (corporateObject as any).depth_average,
                          )}`}
                        />
                        <TableTitleLvl1
                          title={t("labels2:report_pile.utils_mm")}
                          value={`${percentFormatter.format(
                            (corporateObject as any).remainder_depth,
                          )}`}
                        />
                        <TableTitleLvl1
                          title={t("labels2:report_pile.cost_mm")}
                          value={`$${percentFormatter.format(
                            (corporateObject as any).cpd,
                          )}`}
                        />
                        <TableTitleLvl1
                          title={t("labels2:report_pile.cost_useful")}
                          value={`$${percentFormatter.format(
                            (corporateObject as any).average_cost_utils_mm,
                          )}`}
                        />
                        <TableTitleLvl1
                          title={t("labels2:report_pile.summary_cost_mm")}
                          value={`$${percentFormatter.format(
                            (corporateObject as any).depth_average,
                          )}`}
                        />
                      </AccordionTableRow>
                      {children}
                    </>
                  )}
                >
                  <PileAccordionTableResponsible
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
                              <PileAccordionRow
                                onClick={onClick}
                                title={company}
                                lvl={"2"}
                                data={companyObject}
                                children={children}
                              />
                            </>
                          )}
                        >
                          <PileAccordionTableResponsible
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
                                        <PileAccordionRow
                                          onClick={onClick}
                                          title={subsidiary}
                                          lvl={"3"}
                                          data={subsidiaryObject}
                                          children={children}
                                        />
                                      </>
                                    )}
                                  >
                                    <PileAccordionTableResponsible
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
                                                  <PileAccordionRow
                                                    onClick={onClick}
                                                    title={division}
                                                    lvl={"4"}
                                                    data={divisionObject}
                                                    children={children}
                                                  />
                                                </>
                                              )}
                                            >
                                              <PileAccordionTableResponsible
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
                                                            <PileAccordionRow
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
                                                        <PileAccordionTableResponsible
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
                                                                      <PileAccordionRow
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
