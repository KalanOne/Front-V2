import { useTranslation } from "react-i18next";

import { DashboardBar } from "src/components/common/DashboardBar";
import { DashboardBarItem } from "src/components/common/DashboardBarItem";

import { AlertsPanelResponse } from "../types/alertspanelTypes";

export { AlertsPanelButtons };

interface AlertsPanelButtonsProps {
  setActive: (active: string) => void;
  active: string;
  alertsPanel: AlertsPanelResponse;
}

function AlertsPanelButtons({
  setActive,
  active,
  alertsPanel,
}: AlertsPanelButtonsProps) {
  const { t } = useTranslation();
  return (
    <DashboardBar sx={{ mb: 3 }}>
      <DashboardBarItem
        title={t("general:tires")}
        isActive={active === "Tires"}
        onClick={() => setActive("Tires")}
        pill={
          alertsPanel
            ? Object.values(alertsPanel.Tires).reduce(
                (accumulator: number, tireData) => {
                  return accumulator + tireData.statistics;
                },
                0,
              )
            : 0
        }
      />
      <DashboardBarItem
        title={t("general:vehicles")}
        isActive={active === "Vehicle"}
        onClick={() => setActive("Vehicle")}
        pill={
          alertsPanel
            ? Object.values(alertsPanel.Vehicle).reduce(
                (accumulator, vehicle) => accumulator + vehicle.statistics,
                0,
              )
            : 0
        }
      />
      <DashboardBarItem
        title={t("general:mounting")}
        isActive={active === "Mounts"}
        onClick={() => setActive("Mounts")}
        pill={
          alertsPanel
            ? Object.values(alertsPanel.Mounts).reduce(
                (accumulator, mount) => accumulator + mount.statistics,
                0,
              )
            : 0
        }
      />
      <DashboardBarItem
        title={t("common:damage_plural")}
        isActive={active === "Damages"}
        onClick={() => setActive("Damages")}
        pill={
          alertsPanel
            ? Object.values(alertsPanel.Damages).reduce(
                (accumulator, damage) => accumulator + damage.statistics,
                0,
              )
            : 0
        }
      />
      <DashboardBarItem
        title={t("general:wears")}
        isActive={active === "Wear"}
        onClick={() => setActive("Wear")}
        pill={
          alertsPanel
            ? Object.values(alertsPanel.Wear).reduce(
                (accumulator, wear) => accumulator + wear.statistics,
                0,
              )
            : 0
        }
      />
    </DashboardBar>
  );
}
