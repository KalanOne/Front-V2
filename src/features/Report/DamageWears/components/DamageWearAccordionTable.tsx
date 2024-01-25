import React from "react";

import { Paper, Table, TableBody, TableContainer } from "@mui/material";

import { AccordionTable } from "src/components/report/AccordionTable";
import { filterNonObjects } from "src/utils/object";

import { DamageWearAccordionRow } from "./DamageWearAccordionRow";

export { DamageWearAccordionTable };

interface DamageWearAccordionTableProps {
  data: any;
}

function DamageWearAccordionTable({
  data,
}: DamageWearAccordionTableProps): React.ReactElement {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {data &&
            Object.entries(data).map(([corporate, corporateObject]) => (
              <AccordionTable
                key={corporate}
                render={(children, onClick) => (
                  <>
                    <DamageWearAccordionRow
                      onClick={onClick}
                      title={corporate}
                      lvl={"1"}
                      data={corporateObject}
                      children={children}
                    />
                  </>
                )}
              >
                {Object.entries(
                  filterNonObjects(corporateObject as Object),
                ).map(([company, companyObject]) => (
                  <AccordionTable
                    key={company}
                    render={(children, onClick) => (
                      <>
                        <DamageWearAccordionRow
                          onClick={onClick}
                          title={company}
                          lvl={"2"}
                          data={companyObject}
                          children={children}
                        />
                      </>
                    )}
                  >
                    {Object.entries(
                      filterNonObjects(companyObject as Object),
                    ).map(([subsidiary, subsidiaryObject]) => (
                      <AccordionTable
                        key={subsidiary}
                        render={(children, onClick) => (
                          <>
                            <DamageWearAccordionRow
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
                          filterNonObjects(subsidiaryObject as Object),
                        ).map(([wearDamages, wearDamagesObject]) => (
                          <>
                            {Object.entries(
                              filterNonObjects(wearDamagesObject as Object),
                            ).map(([wearDamage, wearDamageObject]) => (
                              <AccordionTable
                                key={wearDamage}
                                render={(children, onClick) => (
                                  <>
                                    <DamageWearAccordionRow
                                      onClick={onClick}
                                      title={
                                        "damage" in wearDamageObject
                                          ? wearDamageObject["damage"]
                                          : wearDamageObject["wear"]
                                      }
                                      lvl={"4"}
                                      data={wearDamageObject}
                                      children={children}
                                    />
                                  </>
                                )}
                              >
                                {Object.entries(
                                  filterNonObjects(
                                    wearDamageObject["models"] as Object,
                                  ),
                                ).map(([model, modelObject]) => (
                                  <AccordionTable
                                    key={model}
                                    render={(children, onClick) => (
                                      <>
                                        <DamageWearAccordionRow
                                          onClick={onClick}
                                          title={modelObject["model"]}
                                          lvl={"5"}
                                          data={modelObject}
                                          children={children}
                                        />
                                      </>
                                    )}
                                  >
                                    {Object.entries(
                                      filterNonObjects(
                                        modelObject["tires"] as Object,
                                      ),
                                    ).map(([tire, tireObject]) => (
                                      <AccordionTable
                                        key={tire}
                                        render={(children, onClick) => (
                                          <>
                                            <DamageWearAccordionRow
                                              onClick={onClick}
                                              title={tireObject["code"]}
                                              lvl={"5"}
                                              data={tireObject}
                                              children={children}
                                            />
                                          </>
                                        )}
                                      >
                                        <div>Hola</div>
                                      </AccordionTable>
                                    ))}
                                  </AccordionTable>
                                ))}
                              </AccordionTable>
                            ))}
                          </>
                        ))}
                      </AccordionTable>
                    ))}
                  </AccordionTable>
                ))}
              </AccordionTable>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
