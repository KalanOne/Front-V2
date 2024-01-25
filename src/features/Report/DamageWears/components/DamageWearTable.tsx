import React from "react";

import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { useTranslation } from "react-i18next";

import {
  TableBodyCell,
  TableHeaderCell,
} from "src/components/common/CustomTable";
import { getRandomHexColor } from "src/utils/color";
import { percentFormatter } from "src/utils/formatters";

import { DamageStatistic, WearStatistic } from "../types/damageWearsTypes";
import { DamageWearAccordionTable } from "./DamageWearAccordionTable";
import { DamageWearDoughnut } from "./DamageWearDoughnut";

export { DamageWearTable };

interface DamageWearTableProps {
  data: any;
}

function DamageWearTable({ data }: DamageWearTableProps): React.ReactElement {
  const { t } = useTranslation();
  return (
    <>
      {/* Damage Table */}
      {data.damageStatistics.length > 0 && (
        <>
          <Typography variant="h5" gutterBottom sx={{ textAlign: "center" }}>
            {"CONTADORES DE DAÑOS"}
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>
                    {t("common:damage", { context: "plural" }).toUpperCase()}
                  </TableHeaderCell>
                  <TableHeaderCell>{"INCIDENCIAS"}</TableHeaderCell>
                  {data.providers &&
                    data.providers.map((provider: string, index: number) => (
                      <TableHeaderCell key={index}>{provider}</TableHeaderCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.damageStatistics.map((damage: DamageStatistic) => (
                  <TableRow key={damage.damage}>
                    <TableBodyCell>
                      {t(`damage:damage.name.${damage.damage}`).toUpperCase()}
                    </TableBodyCell>
                    <TableBodyCell>
                      {`${damage.statistics}(
                  ${percentFormatter.format(damage.percent)}%)`}
                    </TableBodyCell>
                    {data.providers.map((provider: string) => {
                      const foundProvider = damage.providers.find(
                        (p) => p.provider == provider,
                      );

                      return foundProvider ? (
                        <TableBodyCell key={provider}>
                          {`${foundProvider.statistics} (
                      ${percentFormatter.format(foundProvider.percent)}
                      %)`}
                        </TableBodyCell>
                      ) : (
                        <TableBodyCell key={provider}>-</TableBodyCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {/* Damage Table Doughnut */}
      {data.damageStatistics.length > 0 && (
        <DamageWearDoughnut
          data={getChartData(data.damageStatistics)}
        ></DamageWearDoughnut>
      )}

      {/* Wear Table */}
      {data.wearStatistics.length > 0 && (
        <>
          <Typography variant="h5" gutterBottom sx={{ textAlign: "center" }}>
            {"CONTADORES DE DESGASTES"}
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>
                    {t("common:wear", { context: "plural" }).toUpperCase()}
                  </TableHeaderCell>
                  <TableHeaderCell>{"INCIDENCIAS"}</TableHeaderCell>
                  {data.providers &&
                    data.providers.map((provider: string, index: number) => (
                      <TableHeaderCell key={index}>{provider}</TableHeaderCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.wearStatistics.map((wear: WearStatistic) => (
                  <TableRow key={wear.wear}>
                    <TableBodyCell>
                      {t(`wear:wear.${wear.wear}`).toUpperCase()}
                    </TableBodyCell>
                    <TableBodyCell>
                      {`${wear.statistics}(
                  ${percentFormatter.format(wear.percent)}%)`}
                    </TableBodyCell>
                    {data.providers.map((provider: string) => {
                      const foundProvider = wear.providers.find(
                        (p) => p.provider == provider,
                      );

                      return foundProvider ? (
                        <TableBodyCell key={provider}>
                          {`${foundProvider.statistics} (
                      ${percentFormatter.format(foundProvider.percent)}
                      %)`}
                        </TableBodyCell>
                      ) : (
                        <TableBodyCell key={provider}>-</TableBodyCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {/* Wear Table Doughnut */}
      {data.wearStatistics.length > 0 && (
        <DamageWearDoughnut
          data={getChartData(data.wearStatistics)}
        ></DamageWearDoughnut>
      )}

      {/* Damage Accordion Table */}
      {data.damage && (
        <>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ textAlign: "center", mt: 3 }}
          >
            {"DAÑOS"}
          </Typography>
          <DamageWearAccordionTable
            data={data.damage}
          ></DamageWearAccordionTable>
        </>
      )}

      {/* Damage Subsidiaries Doghnut */}
      {data.damage &&
        Object.entries(getCharDataSubsidiaries(data.damage)).map(
          ([subsidiary, subsidiaryObject]) => (
            <DamageWearDoughnut
              data={subsidiaryObject}
              title={subsidiary}
            ></DamageWearDoughnut>
          ),
        )}

      {/* Wear Accordion Table */}
      {data.wear && (
        <>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ textAlign: "center", mt: 3 }}
          >
            {"DESGASTES"}
          </Typography>
          <DamageWearAccordionTable data={data.wear}></DamageWearAccordionTable>
        </>
      )}

      {/* Damage Subsidiaries Doghnut */}
      {data.wear &&
        Object.entries(getCharDataSubsidiaries(data.wear)).map(
          ([subsidiary, subsidiaryObject]) => (
            <DamageWearDoughnut
              data={subsidiaryObject}
              title={subsidiary}
            ></DamageWearDoughnut>
          ),
        )}
    </>
  );
}

function getChartData(data: DamageStatistic[] | WearStatistic[]) {
  const { t } = useTranslation();
  const chartData: any = {
    labels: [],
    datasets: [
      {
        backgroundColor: [],
        borderColor: [],
        data: [],
        borderWidth: 1,
      },
    ],
  };
  data.forEach((item: any) => {
    if ("damage" in item) {
      chartData.labels.push(
        t(`damage:damage.name.${item.damage}`).toUpperCase(),
      );
    } else if ("wear" in item) {
      chartData.labels.push(t(`wear:wear.${item.wear}`).toUpperCase());
    } else {
      chartData.labels.push("");
    }
    chartData.datasets[0].data.push(item.statistics);
    chartData.datasets[0].backgroundColor.push(getRandomHexColor());
    chartData.datasets[0].borderColor.push("#000000");
  });
  return chartData;
}

function getCharDataSubsidiaries(data: any) {
  const chartData: any = {};
  for (const [corporate, corporateObject] of Object.entries(data)) {
    if (["statistics", "percent"].includes(corporate)) {
      continue;
    }
    for (const [company, companyObject] of Object.entries(
      corporateObject as Object,
    )) {
      if (["statistics", "percent"].includes(company)) {
        continue;
      }
      for (const [subsidiary, subsidiaryObject] of Object.entries(
        companyObject as Object,
      )) {
        if (["statistics", "percent"].includes(subsidiary)) {
          continue;
        }
        if (!chartData[subsidiary]) {
          chartData[subsidiary] = {
            labels: [],
            datasets: [
              {
                backgroundColor: [],
                borderColor: [],
                data: [],
                borderWidth: 1,
              },
            ],
          };
        }
        for (const [wearDamages, wearDamagesObject] of Object.entries(
          subsidiaryObject as Object,
        )) {
          for (const [wearDamage, wearDamageObject] of Object.entries(
            wearDamagesObject as Object,
          )) {
            if (["statistics", "percent"].includes(wearDamage)) {
              continue;
            }
            for (const [model, modelObject] of Object.entries(
              wearDamageObject["models"] as Object,
            )) {
              if (
                !chartData[subsidiary].labels.includes(modelObject["model"])
              ) {
                chartData[subsidiary].labels.push(modelObject["model"]);
              }

              chartData[subsidiary].datasets[0].data.push(
                modelObject["statistics"],
              );
              chartData[subsidiary].datasets[0].backgroundColor.push(
                getRandomHexColor(),
              );
              chartData[subsidiary].datasets[0].borderColor.push("#000000");
            }
          }
        }
      }
    }
  }
  return chartData;
}
