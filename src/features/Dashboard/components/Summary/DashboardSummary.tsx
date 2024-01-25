import React from "react";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Box, Card, CardContent, CardHeader } from "@mui/material";

import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { useProgressQuery } from "src/hooks/progress.tsx";

import { getDashboardSummary } from "../../api/dashboardApi.ts";
import { SummaryResponse } from "../../types/dashboardTypes.ts";
import { InfoBox } from "./InfoBox.tsx";
import { InfoContainer } from "./InfoContainer.tsx";
import { VerticalContainer } from "./VerticalContainer.tsx";

export { DashboardSummary };

const percentFormatter = new Intl.NumberFormat("en", {
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
});

function getDepthPercentage(summaryData: SummaryResponse, relative: number) {
  const total =
    summaryData.good_depth +
    summaryData.schedule_depth +
    summaryData.critical_depth;
  return percentFormatter.format((relative / total) * 100);
}

function getPressurePercentage(summaryData: SummaryResponse, relative: number) {
  const total =
    summaryData.good_pressure +
    summaryData.low_pressure +
    summaryData.high_pressure;
  return percentFormatter.format((relative / total) * 100);
}

function DashboardSummary(): React.ReactElement {
  const { t } = useTranslation();

  const summaryQuery = useQuery({
    queryKey: ["dashboard", "summary"],
    queryFn: async () => {
      return await getDashboardSummary();
    },
  });

  const summaryData = summaryQuery.data;

  useProgressQuery(summaryQuery, "summary");

  if (!summaryData) {
    return <></>;
  }

  return (
    <>
      {Object.keys(summaryData).length > 0 && (
        <Card variant={"outlined"} sx={{ mt: 3, width: "100%" }}>
          <CardHeader
            title={t("features:dashboard.summary")}
            sx={{
              color: "white",
              background:
                "linear-gradient(130deg,rgba(45, 104, 255, 1) 0%,rgba(24, 34, 59, 1) 100%)",
              textAlign: "center",
            }}
          />
          <CardContent>
            <InfoContainer>
              <VerticalContainer>
                <b>{t("features:dashboard.depth_semaphore")}</b>
                <InfoBox color={"#7db05a"}>
                  <CheckIcon fontSize={"large"} />
                  <span>
                    {getDepthPercentage(summaryData, summaryData.good_depth)}%
                  </span>
                </InfoBox>
                <InfoBox color={"#e1bf00"}>
                  <FiberManualRecordIcon fontSize={"large"} />
                  <span>
                    {getDepthPercentage(
                      summaryData,
                      summaryData.schedule_depth,
                    )}
                    %
                  </span>
                </InfoBox>
                <InfoBox color={"#d0354c"}>
                  <CloseIcon fontSize={"large"} />
                  <span>
                    {getDepthPercentage(
                      summaryData,
                      summaryData.critical_depth,
                    )}
                    %
                  </span>
                </InfoBox>
              </VerticalContainer>
              <VerticalContainer>
                <b>{t("features:dashboard.tires_by_application")}</b>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "1rem",
                    height: "100%",
                  }}
                >
                  <InfoBox
                    color={"#0989fa"}
                    direction={"column"}
                    sx={{ height: "auto" }}
                  >
                    <Box component={"span"} sx={{ fontSize: "1.25rem" }}>
                      {summaryData.all_position}
                    </Box>
                    <span>
                      {t(
                        "features:dashboard.tire_application.options.all_position",
                      )}
                    </span>
                  </InfoBox>
                  <InfoBox
                    color={"#0989fa"}
                    direction={"column"}
                    sx={{ height: "auto" }}
                  >
                    <Box component={"span"} sx={{ fontSize: "1.25rem" }}>
                      {summaryData.traction}
                    </Box>
                    <span>
                      {t(
                        "features:dashboard.tire_application.options.traction",
                      )}
                    </span>
                  </InfoBox>
                  <InfoBox
                    color={"#0989fa"}
                    direction={"column"}
                    sx={{ height: "auto" }}
                  >
                    <Box component={"span"} sx={{ fontSize: "1.25rem" }}>
                      {summaryData.trailer}
                    </Box>
                    <span>
                      {t("features:dashboard.tire_application.options.trailer")}
                    </span>
                  </InfoBox>
                  <InfoBox
                    color={"#0989fa"}
                    direction={"column"}
                    sx={{ height: "auto" }}
                  >
                    <Box component={"span"} sx={{ fontSize: "1.25rem" }}>
                      {summaryData.directional}
                    </Box>
                    <span>
                      {t(
                        "features:dashboard.tire_application.options.directional",
                      )}
                    </span>
                  </InfoBox>
                </Box>
              </VerticalContainer>
              <VerticalContainer>
                <b>{t("features:dashboard.tires_by_condition")}</b>
                <InfoBox color={"#0989fa"} direction={"column"}>
                  <Box component={"span"} sx={{ fontSize: "1.25rem" }}>
                    {summaryData.tires_fleet}
                  </Box>
                  <span>{t("features:dashboard.total")}</span>
                </InfoBox>
                <InfoBox color={"#0989fa"} direction={"column"}>
                  <Box component={"span"} sx={{ fontSize: "1.25rem" }}>
                    {summaryData.original_tires}
                  </Box>
                  <span>{t("features:dashboard.original_tires")}</span>
                </InfoBox>
                <InfoBox color={"#0989fa"} direction={"column"}>
                  <Box component={"span"} sx={{ fontSize: "1.25rem" }}>
                    {summaryData.revitalized_tires}
                  </Box>
                  <span>{t("features:dashboard.revitalized_tires")}</span>
                </InfoBox>
              </VerticalContainer>
              <VerticalContainer>
                <b>{t("features:dashboard.pressure_semaphore")}</b>
                <InfoBox color={"#7db05a"}>
                  <CheckIcon fontSize={"large"} />
                  <span>
                    {getPressurePercentage(
                      summaryData,
                      summaryData.good_pressure,
                    )}
                    %
                  </span>
                </InfoBox>
                <InfoBox color={"#d0354c"}>
                  <ArrowUpwardIcon fontSize={"large"} />
                  <span>
                    {getPressurePercentage(
                      summaryData,
                      summaryData.high_pressure,
                    )}
                    %
                  </span>
                </InfoBox>
                <InfoBox color={"#d0354c"}>
                  <ArrowDownwardIcon fontSize={"large"} />
                  <span>
                    {getPressurePercentage(
                      summaryData,
                      summaryData.low_pressure,
                    )}
                    %
                  </span>
                </InfoBox>
              </VerticalContainer>
            </InfoContainer>
          </CardContent>
        </Card>
      )}
    </>
  );
}
