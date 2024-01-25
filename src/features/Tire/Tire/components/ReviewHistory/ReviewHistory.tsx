import React from "react";

import FilterListIcon from "@mui/icons-material/FilterList";
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { BaseContainer } from "src/components/common/BaseContainer";
import { CustomPagination } from "src/components/common/CustomPagination";
import { Portal } from "src/components/common/Portal";
import { BaseFilterModal } from "src/components/modal/BaseFilterModal";
import { useCrud, useCrudQuery } from "src/hooks/crud";
import { useProgressQuery } from "src/hooks/progress";

import { getReviewHistory } from "../../api/historyApi";
import { getTire } from "../../api/tireApi";
import { useFilterHistoryDependencies } from "../../hooks/dependenciesFilterHistory";
import {
  HistoryFilterSchemaType,
  historyFilterDefaultValues,
  historyFilterSchema,
} from "../../validation/filterHistory";
import { HistoryFilterForm } from "../History/HistoryFilter";
import TabMenuHistory from "../TabMenuHistory";
import { ReviewHistoryTable } from "./ReviewHistoryTable";

export { ReviewHistory };

function ReviewHistory(): React.ReactElement {
  const { t } = useTranslation();
  const { id } = useParams();

  const tireQuery = useQuery({
    queryKey: ["tire"],
    queryFn: async () => {
      return await getTire({ id: `${id}` });
    },
  });
  const tire = tireQuery.data ?? undefined;
  useProgressQuery(tireQuery, "tire");
  const crud = useCrud<any>();
  const historyQuery = useCrudQuery({
    apiFunction: getReviewHistory,
    name: "reviewHistory",
    page: crud.page,
    search: crud.search,
    filters: crud.filters,
    keepPrevious: true,
    extras: { id: `${id}` },
  });
  const reviewHistory = historyQuery.data ?? [];

  const dependencies = useFilterHistoryDependencies();

  const historyFilterForm = useForm({
    defaultValues: historyFilterDefaultValues,
    resolver: zodResolver(historyFilterSchema),
  });

  function onFilter(data: HistoryFilterSchemaType) {
    const searchParams = new URLSearchParams();
    if (data.dateFrom) {
      searchParams.append("date_from", data.dateFrom);
    }
    if (data.dateTo) {
      searchParams.append("date_to", data.dateTo);
    }
    if (data.movement) {
      searchParams.append("movement", data.movement);
    }
    if (data.number_cycle) {
      searchParams.append("number_cycle", data.number_cycle.toString());
    }
    if (data.tire_condition_id) {
      searchParams.append("tire_condition_id", data.tire_condition_id);
    }
    if (data.warehouses) {
      searchParams.append("warehouses", data.warehouses);
    }
    if (data.providers) {
      searchParams.append("providers", data.providers);
    }
    if (data.vehicles) {
      searchParams.append("vehicles", data.vehicles);
    }

    crud.setFilters(searchParams);
  }

  return (
    <>
      <BaseFilterModal
        open={crud.filterModalOpen}
        title={"Filtro"}
        onClose={() => crud.setFilterModalOpen(false)}
        onConfirm={historyFilterForm.handleSubmit(
          async (data) => {
            onFilter(data);
          },
          // (d) => console.log(d),
        )}
        onClear={() => {
          historyFilterForm.reset();
          crud.setFilters(new URLSearchParams());
        }}
      >
        <HistoryFilterForm
          form={historyFilterForm}
          dependencies={dependencies}
        />
      </BaseFilterModal>
      <BaseContainer title={tire ? tire.code : ""}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          {tire && (
            <>
              <Box component={"div"}>
                <Typography noWrap variant="h6">
                  {`${t("labels:code")}: ${tire.code}`}
                </Typography>
                {tire.device_code && (
                  <Typography noWrap variant="h6">
                    {`${t("general:rfid")}: ${tire.device_code}`}
                  </Typography>
                )}
              </Box>
              <Box>
                <Typography noWrap variant="overline">
                  {t("labels:original_info")}
                </Typography>
              </Box>
              <Box>
                <Typography noWrap variant="h6">
                  {tire.cycle.variation.tire_model.brand.name}{" "}
                  {tire.cycle.variation.tire_model.name}
                </Typography>
              </Box>
            </>
          )}
          <ReviewHistoryTable reviewhistory={reviewHistory} />
          <CustomPagination
            page={crud.page}
            onChange={(_event, page) => crud.setPage(page)}
            totalPages={historyQuery.data?.last_page ?? 1}
          />
          <Portal elementId={"navbarPortal"}>
            <Stack direction={"row"} alignItems={"center"}>
              <IconButton
                sx={{ mr: 2 }}
                onClick={() => crud.setFilterModalOpen(true)}
              >
                <FilterListIcon sx={{ color: "white" }} />
              </IconButton>
            </Stack>
          </Portal>
          <Portal elementId={"navTabs"}>
            <TabMenuHistory pageId={1} id={id} />
          </Portal>
        </Container>
      </BaseContainer>
    </>
  );
}
