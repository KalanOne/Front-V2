import { Box } from "@mui/material";

import { useTranslation } from "react-i18next";

import { CustomButton } from "src/components/common/CustomButton";
import { DashboardBar } from "src/components/common/DashboardBar";
import { DashboardBarItem } from "src/components/common/DashboardBarItem";
import { ReportTitle } from "src/components/report/ReportTitle";

export { KmPileButtons };

interface KmPileButtonsProps {
  setActive: (active: string) => void;
  active: string;
  policyNumberCycle: number;
  setOpenModals: (openModals: any) => void;
}

function KmPileButtons({
  setActive,
  active,
  policyNumberCycle,
  setOpenModals,
}: KmPileButtonsProps) {
  const { t } = useTranslation();

  return (
    <>
      <ReportTitle
        subtitleRed1={`${t("labels:location.label")}: ${t(
          "labels:location.options.pile",
        )}`}
      />
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          mb: 2,
        }}
      >
        <CustomButton
          onClick={() =>
            setOpenModals(
              (prevState: {
                filter: boolean;
                historic: boolean;
                model: boolean;
                responsible: boolean;
              }) => {
                return { ...prevState, historic: true };
              },
            )
          }
          text={t("titles:historic")}
          sx={{ mt: 3 }}
        />
        <CustomButton
          onClick={() => {}}
          text={t("buttons:generate_excel")}
          sx={{ mt: 3 }}
        />
      </Box>
      <DashboardBar sx={{ mb: 3 }}>
        <DashboardBarItem
          title={t("features:reportDynamicCost.tabs.general")}
          isActive={active === "G"}
          onClick={() => setActive("G")}
        />
        <DashboardBarItem
          title={t("features:reportDynamicCost.tabs.revitalized")}
          isActive={active === "R"}
          onClick={() => setActive("R")}
        />
        <DashboardBarItem
          title={t("features:reportDynamicCost.tabs.original")}
          isActive={active === "0"}
          onClick={() => setActive("0")}
        />
        {[...Array(policyNumberCycle).keys()].map((key) => {
          return (
            <DashboardBarItem
              title={`${t("features:reportDynamicCost.tabs.cycle")} ${key + 1}`}
              isActive={active === `${key + 1}`}
              key={key}
              onClick={() => setActive(`${key + 1}`)}
            />
          );
        })}
      </DashboardBar>
    </>
  );
}
