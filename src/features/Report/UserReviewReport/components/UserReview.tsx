import React, { useEffect, useState } from "react";

import FilterListIcon from "@mui/icons-material/FilterList";
import { Box, Card, Container, IconButton, Stack } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { BaseContainer } from "src/components/common/BaseContainer.tsx";
import { Portal } from "src/components/common/Portal";
import { BaseCustomModal } from "src/components/modal/BaseCustomModal";
import { BaseFilterModal } from "src/components/modal/BaseFilterModal";
import { useProgressQuery } from "src/hooks/progress";
import { getRandomHexColor } from "src/utils/color";
import { removeUndefined } from "src/utils/object";

import {
  getReviewVehicle,
  getUserReview,
  getUserReviewSummary,
  getUserVehicle,
} from "../api/userReviewApi";
import { useUserReviewDependencies } from "../hooks/dependencies";
import {
  UserReviewFilterSchemaType,
  userReviewFilterDefaultValues,
  userReviewFilterSchema,
} from "../validation/filterUserReview";
import { TireReviewTable } from "./TireReviewTable";
import { UserReviewAccordionTable } from "./UserReviewAccordionTable";
import { UserReviewFilterForm } from "./UserReviewFilterForm";
import { UserReviewFilteredItem } from "./UserReviewFilteredItem";
import { UserReviewSummaryTable } from "./UserReviewSummaryTable";
import { UserReviewTitle } from "./UserReviewTitle";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export { UserReview };

function UserReview(): React.ReactElement {
  const { t } = useTranslation();
  const [currentReview, setCurrentReview] = useState();
  const [params, setParams] = useState({});
  const [reviewData, setReviewData] = useState();
  const [userReviewData, setUserReviewData] = useState<ReviewResponse>();
  const [chartData, setChartData] = useState<ReviewResponse>();
  const [custom, setCustom] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<
    Partial<UserReviewFilterSchemaType>
  >({
    corporate_id: "",
    companies: [],
    subsidiaries: [],
    users: [],
    divisions: [],
  });

  const userReviewSummaryQuery = useQuery({
    queryKey: ["userReviewSummary", params.toString()],
    queryFn: async () => {
      return await getUserReviewSummary(params);
    },
    enabled: true,
  });

  const userReviewSummaryData = userReviewSummaryQuery.data;

  const userReviewQuery = useQuery({
    queryKey: ["userReview", params.toString()],
    queryFn: async () => {
      return await getUserReview(params);
    },
    enabled: true,
  });

  const tableUserDataMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await getUserVehicle({
        corporate_name: data.corporate,
        company_name: data.company,
        subsidiary_name: data.subsidiary,
        division_name: data.division,
        user_name: data.user,
        vehicle_type_name: data.vehicleType,
      });
      return {
        data: response,
        params: data,
      };
    },
    onSuccess: async (response: any) => {
      const { data, params } = response;
      setUserReviewData((prev: any) => {
        const newData = { ...prev };
        newData["review"][params.corporate][params.company][params.subsidiary][
          params.division
        ][params.user][params.vehicleType] = data;
        return newData;
      });
    },
    onError: (_error: AxiosError) => {
      // console.log(error);
    },
  });

  const tableReviewDataMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await getReviewVehicle({
        id: data["vehicle_review_id"],
      });
      return {
        data: response,
      };
    },
    onSuccess: async (response: any) => {
      const { data } = response;
      setReviewData(data[0]);
    },
    onError: (_error: AxiosError) => {
      // console.log(error);
    },
  });

  const userReviewFilterForm = useForm({
    defaultValues: userReviewFilterDefaultValues,
    resolver: zodResolver(userReviewFilterSchema),
  });

  const [corporate_id, companies, subsidiaries, users, divisions] = useWatch({
    control: userReviewFilterForm.control,
    name: ["corporate_id", "companies", "subsidiaries", "users", "divisions"],
  });

  const dependencies = useUserReviewDependencies({
    corporate_id: corporate_id,
    company: companies,
  });

  useProgressQuery(userReviewSummaryQuery, "userReviewSummary");
  useProgressQuery(userReviewQuery, "userReview");

  function onReviewClick(review: any) {
    setCurrentReview(review);
    setCustom(true);
  }
  function onFilter(data: UserReviewFilterSchemaType) {
    const searchParams = new URLSearchParams();
    const newSelectedFilters: Partial<UserReviewFilterSchemaType> = {};
    if (data.dateFrom) {
      searchParams.append("dateTo", data.dateTo);
    }
    if (data.dateTo) {
      searchParams.append("dateFrom", data.dateFrom);
    }
    if (data.subsidiaries.length > 0) {
      searchParams.append("subsidiaries", data.subsidiaries.toString());
      const elementosIguales = dependencies.subsidiaries.filter((subsidiary) =>
        subsidiaries.toString().includes(`${subsidiary.subsidiary_id}`),
      );
      newSelectedFilters["subsidiaries"] = elementosIguales.map(
        (subsidiary) => `${subsidiary.name}`,
      );
    }
    if (data.companies.length > 0) {
      searchParams.append("companies", data.companies.toString());
      const elementosIguales = dependencies.companies.filter((company) =>
        companies.toString().includes(`${company.company_id}`),
      );
      newSelectedFilters["companies"] = elementosIguales.map(
        (company) => `${company.name}`,
      );
    }
    if (data.corporate_id) {
      searchParams.append("corporate_id", data.corporate_id);
      const corporate = dependencies.corporates.find(
        (c) => `${c.corporate_id}` === `${corporate_id}`,
      );
      newSelectedFilters["corporate_id"] = corporate?.name;
    }
    if (data.divisions.length > 0) {
      searchParams.append("divisions", data.divisions.toString());
      const elementosIguales = dependencies.divisions.filter((division) =>
        divisions.toString().includes(`${division.division_id}`),
      );
      newSelectedFilters["divisions"] = elementosIguales.map(
        (division) => `${division.name}`,
      );
    }
    if (data.users.length > 0) {
      searchParams.append("users", data.users.toString());
      const elementosIguales = dependencies.users.filter((user) =>
        users.toString().includes(`${user.user_id}`),
      );
      newSelectedFilters["users"] = elementosIguales.map(
        (user) => `${user.name} ${user.last_name_1} ${user.last_name_2}`,
      );
    }
    if (data.activity && data.activity != "default") {
      searchParams.append("activity", data.activity);
    }
    if (data.review_type) {
      searchParams.append("review_type", data.review_type);
    }
    removeUndefined(newSelectedFilters);
    setSelectedFilters(newSelectedFilters);
    setParams(searchParams);
  }

  useEffect(() => {
    if (userReviewQuery.data) {
      setUserReviewData(userReviewQuery.data);
    }
  }, [userReviewQuery.data]);

  useEffect(() => {
    const review = currentReview;
    if (review) {
      tableReviewDataMutation.mutate(review);
    }
  }, [currentReview]);

  useEffect(() => {
    if (userReviewData) {
      setChartData(getChartData(userReviewData));
    }
  }, [userReviewData]);

  return (
    <>
      <BaseFilterModal
        open={filterOpen}
        title={"Filtro"}
        onClose={() => setFilterOpen(false)}
        onConfirm={userReviewFilterForm.handleSubmit(async (data) => {
          onFilter(data);
        })}
        onClear={() => {
          setParams({});
          userReviewFilterForm.reset();
          setFilterOpen(false);
        }}
      >
        <UserReviewFilterForm
          form={userReviewFilterForm}
          dependencies={dependencies}
        />
      </BaseFilterModal>
      <BaseCustomModal
        open={custom}
        size="lg"
        title={
          t("general:tires") +
          ": " +
          (reviewData ? reviewData.tire_review.length : "")
        }
        onClose={() => {
          setCustom(false);
          setReviewData(undefined);
        }}
      >
        <TireReviewTable reviewData={reviewData} />
      </BaseCustomModal>
      <BaseContainer title={t("titles:user_review_report")}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          {Object.keys(selectedFilters).length > 0 && (
            <Container maxWidth="xl" sx={{ mt: 3 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Grid2 container spacing={2}>
                  <Grid2 xs={12} md={6}>
                    {selectedFilters.corporate_id &&
                      selectedFilters.corporate_id !== "" && (
                        <UserReviewFilteredItem
                          title={t("common:corporate")}
                          value={selectedFilters.corporate_id}
                        />
                      )}
                    {selectedFilters.companies &&
                      selectedFilters.companies.length > 0 && (
                        <UserReviewFilteredItem
                          title={t("labels:company.plural")}
                          value={selectedFilters.companies.join(", ")}
                        />
                      )}
                    {selectedFilters.subsidiaries &&
                      selectedFilters.subsidiaries.length > 0 && (
                        <UserReviewFilteredItem
                          title={t("labels:subsidiary.plural")}
                          value={selectedFilters.subsidiaries.join(", ")}
                        />
                      )}
                  </Grid2>
                  <Grid2 xs={12} md={6}>
                    {selectedFilters.users &&
                      selectedFilters.users.length > 0 && (
                        <UserReviewFilteredItem
                          title={t("labels:user.plural")}
                          value={selectedFilters.users.join(", ")}
                        />
                      )}
                    {selectedFilters.divisions &&
                      selectedFilters.divisions.length > 0 && (
                        <UserReviewFilteredItem
                          title={t("common:division")}
                          value={selectedFilters.divisions.join(", ")}
                        />
                      )}
                  </Grid2>
                </Grid2>
              </Box>
            </Container>
          )}
          <UserReviewTitle />
          {userReviewSummaryData && (
            <UserReviewSummaryTable summary={userReviewSummaryData} />
          )}
          {userReviewData && (
            <UserReviewAccordionTable
              review={userReviewData}
              onVehicleTypeClick={(params) => {
                tableUserDataMutation.mutate(params);
              }}
              onReviewClick={onReviewClick}
            />
          )}
          {chartData && (
            <Card
              variant={"outlined"}
              sx={{
                mt: 2,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                padding: 3,
              }}
            >
              {Object.entries(chartData).map(([corporate, corporateObject]) => {
                return (
                  <React.Fragment key={corporate}>
                    {/* <span>{corporate}</span> */}
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifContent: "center",
                      }}
                    >
                      {Object.entries(corporateObject).map(
                        ([subsidiary, subsidiaryObject]) => {
                          return (
                            <Box
                              key={subsidiary}
                              sx={{
                                display: "flex",
                                width: "400px",
                                height: "350px",
                              }}
                            >
                              <Doughnut
                                data={subsidiaryObject}
                                options={{
                                  plugins: {
                                    legend: {
                                      position: "bottom" as const,
                                    },
                                    title: {
                                      display: true,
                                      text: subsidiary,
                                    },
                                    tooltip: {
                                      callbacks: {
                                        label: function (context) {
                                          if (context.formattedValue) {
                                            return `${context.formattedValue}%`;
                                          }
                                          return "";
                                        },
                                      },
                                    },
                                  },
                                }}
                              />
                            </Box>
                          );
                        },
                      )}
                    </Box>
                  </React.Fragment>
                );
              })}
            </Card>
          )}

          <Portal elementId={"navbarPortal"}>
            <Stack direction={"row"} alignItems={"center"}>
              <IconButton sx={{ mr: 2 }} onClick={() => setFilterOpen(true)}>
                <FilterListIcon sx={{ color: "white" }} />
              </IconButton>
            </Stack>
          </Portal>
        </Container>
      </BaseContainer>
    </>
  );
}

function getChartData(data: ReviewResponse): any {
  if (!data.review) {
    return undefined;
  }
  const chartData: any = {};
  for (const [corporate, corporateObject] of Object.entries(data.review)) {
    if (["statistics", "percent"].includes(corporate)) {
      continue;
    }
    if (!chartData[corporate]) {
      chartData[corporate] = {};
    }
    for (const [company, companyObject] of Object.entries(corporateObject)) {
      if (["statistics", "percent"].includes(company)) {
        continue;
      }
      for (const [subsidiary, subsidiaryObject] of Object.entries(
        companyObject,
      )) {
        if (["statistics", "percent"].includes(subsidiary)) {
          continue;
        }
        if (!chartData[corporate][subsidiary]) {
          chartData[corporate][subsidiary] = {
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
        const userTotals: any = {};
        let subsidiaryTotal = 0;
        for (const [division, divisionOjbect] of Object.entries(
          subsidiaryObject,
        )) {
          if (["statistics", "percent"].includes(division)) {
            continue;
          }
          for (const [user, userObject] of Object.entries(divisionOjbect)) {
            if (["statistics", "percent"].includes(user)) {
              continue;
            }
            if (!chartData[corporate][subsidiary].labels.includes(user)) {
              chartData[corporate][subsidiary].labels.push(user);
            }
            if (!userTotals[user]) {
              userTotals[user] = 0;
            }
            subsidiaryTotal += userObject.statistics;
            userTotals[user] += userObject.statistics;
          }
        }
        for (const [user, userTotal] of Object.entries(userTotals)) {
          chartData[corporate][subsidiary].datasets[0].data.push(
            (userTotal / subsidiaryTotal) * 100,
          );
          chartData[corporate][subsidiary].datasets[0].backgroundColor.push(
            getRandomHexColor(),
          );
          chartData[corporate][subsidiary].datasets[0].borderColor.push(
            "#000000",
          );
        }
      }
    }
  }
  return chartData;
}
