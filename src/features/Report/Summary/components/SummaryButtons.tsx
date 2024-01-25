import { Box } from "@mui/material";

import { useTranslation } from "react-i18next";

import { CustomButton } from "src/components/common/CustomButton";
import { DashboardBar } from "src/components/common/DashboardBar";
import { DashboardBarItem } from "src/components/common/DashboardBarItem";

export { SummaryButtons };

interface SummaryButtonsProps {
  active: "pressure" | "depth" | "alert";
  setActive: (active: "pressure" | "depth" | "alert") => void;
}

function SummaryButtons({ active, setActive }: SummaryButtonsProps) {
  const { t } = useTranslation();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          mb: 2,
        }}
      >
        <CustomButton
          onClick={() => {}}
          text={t("buttons:generate_excel")}
          sx={{ mt: 3 }}
        />
      </Box>
      <DashboardBar sx={{ mb: 3 }}>
        <DashboardBarItem
          title={t("labels:pressure")}
          isActive={active === "pressure"}
          onClick={() => setActive("pressure")}
        />
        <DashboardBarItem
          title={t("labels:depth")}
          isActive={active === "depth"}
          onClick={() => setActive("depth")}
        />
        <DashboardBarItem
          title={t("common:alert_plural")}
          isActive={active === "alert"}
          onClick={() => setActive("alert")}
        />
      </DashboardBar>
    </>
  );
}
