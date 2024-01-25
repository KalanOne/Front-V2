import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Box, Typography } from "@mui/material";

import { useTranslation } from "react-i18next";

import { IconPill } from "src/components/report/IconPill";
import { PriorityPillContainer } from "src/components/report/PriorityPillContainer";
import { formatter } from "src/utils/formatters";

import {
  AlertDamages,
  AlertWears,
  TypesAlertsDamages,
  TypesAlertsWears,
} from "../types/alertspanelTypes";

export { AlertsPanelPillsDamageWear };

interface AlertsPanelPillsDamageWearProps {
  data: TypesAlertsDamages | TypesAlertsWears;
  setSelectedPill: (id: number, title: string, priority: string) => void;
}

function AlertsPanelPillsDamageWear({
  data,
  setSelectedPill,
}: AlertsPanelPillsDamageWearProps) {
  const { t } = useTranslation();
  const uniqueRankingAlerts = Array.from(
    new Set(Object.values(data).map((item) => item.attribution)),
  ).sort();

  const groupedInfo: React.ReactNode[] = [];

  uniqueRankingAlerts.forEach((rankingAlert, index: number) => {
    const objectsWithSameRankingAlert = Object.values(data).filter(
      (item) => item.attribution === rankingAlert,
    );

    const groupInfo: React.ReactNode[] = [];

    objectsWithSameRankingAlert.forEach(
      (item: AlertWears | AlertDamages, index2: number) => {
        groupInfo.push(
          <PriorityPillContainer
            priority={"HALF"}
            key={index2}
            onClick={() =>
              setSelectedPill(
                "damage_id" in item ? item.damage_id : item.wear_id,
                t(`damage:damage.name.${item.name.toLowerCase()}`),
                "HALF",
              )
            }
          >
            <IconPill
              text1={formatter.format(item.statistics)}
              text2={`${formatter.format(item.percent)}%`}
              title={t(`damage:damage.name.${item.name.toLowerCase()}`)}
              icon={
                <RemoveRedEyeIcon
                  sx={{
                    filter: "drop-shadow(0.12em 0.12em 0.15em rgb(21, 21, 24))",
                  }}
                />
              }
            />
          </PriorityPillContainer>,
        );
      },
    );

    groupedInfo.push(
      <Box key={index}>
        <Typography variant="subtitle1" gutterBottom fontWeight={500}>
          {t(`labels2:attribution.options.${rankingAlert.toLowerCase()}`)}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          {groupInfo}
        </Box>
      </Box>,
    );
  });

  return <>{groupedInfo}</>;
}
