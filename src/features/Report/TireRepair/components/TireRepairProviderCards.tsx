import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { Card, CardContent } from "@mui/material";

import { useTranslation } from "react-i18next";

import { CardHeaderGray } from "src/components/report/CardHeaderGray";
import { CardReportItem } from "src/components/report/CardReportItem";
import { IconPill } from "src/components/report/IconPill";
import { formatter, percentFormatter } from "src/utils/formatters";

import { TireRepairResponse } from "../types/tireRepairTypes";

export { TireRepairProviderCards };

interface TireRepairProviderCardsProps {
  tireRepairs: TireRepairResponse;
  handleProviderChange: (providerId: number) => void;
}

function TireRepairProviderCards({
  tireRepairs,
  handleProviderChange,
}: TireRepairProviderCardsProps) {
  const { t } = useTranslation();
  return (
    <>
      {Object.keys(tireRepairs).map((subsidiary) => (
        <Card sx={{ marginBottom: 2 }} key={subsidiary}>
          <CardHeaderGray title={subsidiary}>
            <IconPill
              text1={formatter.format(
                Object.values(tireRepairs[subsidiary]).reduce(
                  (accumulator, provider) => accumulator + provider.statistics,
                  0,
                ),
              )}
              text2={`${formatter.format(100)}%`}
            />
            <IconPill
              text1={`${t("labels:tire_repair_report.time")}`}
              text2={`${formatter.format(
                Object.values(tireRepairs[subsidiary]).reduce(
                  (accumulator, provider) =>
                    accumulator + provider.average_days_revitalized,
                  0,
                ),
              )} ${t("labels:days")}`}
              icon={<AccessTimeFilledIcon sx={{ color: "white" }} />}
            />
          </CardHeaderGray>
          <CardContent
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              marginTop: "8px",
              marginBottom: "10px",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            {Object.keys(tireRepairs[subsidiary]).map((vehicleType) => {
              const providerData = tireRepairs[subsidiary][vehicleType];
              return (
                <CardReportItem
                  title={vehicleType}
                  key={vehicleType}
                  onClick={() => handleProviderChange(providerData.provider_id)}
                >
                  <IconPill
                    text1={`${formatter.format(providerData.statistics)}`}
                    text2={`${percentFormatter.format(providerData.percent)}%`}
                  />
                  <IconPill
                    text1={`${t("labels:tire_repair_report.time")}`}
                    text2={`${providerData.average_days_revitalized} ${t(
                      "labels:days",
                    )}`}
                    icon={<AccessTimeFilledIcon sx={{ color: "white" }} />}
                  />
                </CardReportItem>
              );
            })}
          </CardContent>
        </Card>
      ))}
    </>
  );
}
