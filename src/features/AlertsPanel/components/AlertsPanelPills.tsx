import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Box, Typography } from "@mui/material";

import { useTranslation } from "react-i18next";

import { IconPill } from "src/components/report/IconPill";
import { PriorityPillContainer } from "src/components/report/PriorityPillContainer";
import { formatter } from "src/utils/formatters";

import { Alert, TypesAlerts } from "../types/alertspanelTypes";

export { AlertsPanelPills };

interface AlertsPanelPillsProps {
  data: TypesAlerts;
  setSelectedPill: (id: number, title: string, priority: string) => void;
}

function AlertsPanelPills({ data, setSelectedPill }: AlertsPanelPillsProps) {
  const { t } = useTranslation();
  const uniqueRankingAlerts = Array.from(
    new Set(Object.values(data).map((item) => item.ranking_alert)),
  ).sort();

  const groupedInfo: React.ReactNode[] = [];

  uniqueRankingAlerts.forEach((rankingAlert, index: number) => {
    const objectsWithSameRankingAlert = Object.values(data).filter(
      (item) => item.ranking_alert === rankingAlert,
    );

    const groupInfo: React.ReactNode[] = [];

    objectsWithSameRankingAlert.forEach((item: Alert, index2: number) => {
      groupInfo.push(
        <PriorityPillContainer
          priority={item.priority}
          key={index2}
          onClick={() =>
            setSelectedPill(
              item.alert_id,
              t(`alerts:colloquial_name.${item.colloquial_name}`),
              item.priority,
            )
          }
        >
          <IconPill
            text1={formatter.format(item.statistics)}
            text2={`${formatter.format(item.percent)}%`}
            title={t(`alerts:colloquial_name.${item.colloquial_name}`)}
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
    });

    groupedInfo.push(
      <Box key={index}>
        <Typography variant="subtitle1" gutterBottom fontWeight={500}>
          {t(`labels:ranking_alert.options.${rankingAlert.toLowerCase()}`)}
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
