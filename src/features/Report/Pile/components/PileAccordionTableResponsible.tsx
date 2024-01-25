import { useTranslation } from "react-i18next";

import {
  AccordionTableHeader,
  AccordionTableRow,
} from "src/components/common/CustomAccordionTable";
import { AccordionTable } from "src/components/report/AccordionTable";
import { filterNonObjects } from "src/utils/object";
import { capitalizeSentences } from "src/utils/text";

import { PileResponsibleAccordionRow } from "./PileResponsibleAccordionRow";

export { PileAccordionTableResponsible };

interface PileAccordionTableResponsibleProps {
  extra: any;
  dataObject: any;
  handleResponsibleClick: (data: any) => void;
}

function PileAccordionTableResponsible({
  extra,
  dataObject,
  handleResponsibleClick,
}: PileAccordionTableResponsibleProps) {
  const { t } = useTranslation();
  const resp = t("general:responsibles");
  const avoid = t("labels:category.options.avoidable");
  const notAvoid = t("labels:category.options.not_avoidable");

  return (
    <AccordionTable
      render={(children, onClick) => (
        <>
          <AccordionTableRow onClick={onClick} level={"RESPONSIBLE"}>
            <AccordionTableHeader level={"RESPONSIBLE"}>
              {resp}
            </AccordionTableHeader>
          </AccordionTableRow>
          {children}
        </>
      )}
    >
      {Object.entries(filterNonObjects(dataObject.retirement)).map(
        ([retirementName, retirementObject]) => {
          return (
            <AccordionTable
              render={(children, onClick) => (
                <>
                  <PileResponsibleAccordionRow
                    title={retirementName == "YES" ? avoid : notAvoid}
                    lvl={"5"}
                    data={retirementObject}
                    onClick={onClick}
                    children={children}
                  />
                </>
              )}
            >
              {Object.entries(filterNonObjects(retirementObject)).map(
                ([no1Name, no1Object]) => {
                  return (
                    <AccordionTable
                      render={(children, onClick) => (
                        <PileResponsibleAccordionRow
                          title={capitalizeSentences(no1Name)}
                          lvl={"6"}
                          data={no1Object}
                          onClick={onClick}
                          children={children}
                        />
                      )}
                    >
                      {Object.entries(
                        filterNonObjects((no1Object as { data: any }).data),
                      ).map(([_no1ChildName, no1ChildObject]) => {
                        return (
                          <AccordionTable
                            render={(children, _onClick) => (
                              <PileResponsibleAccordionRow
                                title={t(
                                  `features:cause.name.${
                                    (no1ChildObject as { key: string }).key
                                  }`,
                                )}
                                lvl={"8"}
                                data={no1ChildObject}
                                onClick={(_e) => {
                                  handleResponsibleClick({
                                    attribution: no1Name,
                                    retirement_cause_name: (
                                      no1ChildObject as { key: string }
                                    ).key,
                                    ...extra,
                                  });
                                }}
                                children={children}
                              />
                            )}
                          >
                            <></>
                          </AccordionTable>
                        );
                      })}
                    </AccordionTable>
                  );
                },
              )}
            </AccordionTable>
          );
        },
      )}
    </AccordionTable>
  );
}
