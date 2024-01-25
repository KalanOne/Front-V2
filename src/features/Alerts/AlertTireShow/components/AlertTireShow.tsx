import { useEffect } from "react";

import FilterListIcon from "@mui/icons-material/FilterList";
import { Container, IconButton, Stack, Typography } from "@mui/material";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { BaseContainer } from "src/components/common/BaseContainer.tsx";
import { CustomPagination } from "src/components/common/CustomPagination.tsx";
import { Portal } from "src/components/common/Portal.tsx";
import { SearchInput } from "src/components/common/SearchInput.tsx";
import { BaseFilterModal } from "src/components/modal/BaseFilterModal.tsx";
import { BaseUpdateModal } from "src/components/modal/BaseUpdateModal.tsx";
import {
  useCrud,
  useCrudMutationF,
  useCrudQuery,
  useCrudUpdateMutation,
} from "src/hooks/crud.tsx";

import {
  getAlertsTiresShow,
  updateAlertsTiresShow,
} from "../api/AlertTireShowApi.ts";
import { AlertTireShowResponse } from "../types/alertTireShowTypes.ts";
import {
  AlertTireShowFilterSchemaType,
  alertTireShowFilterDefaultValues,
  alertTireShowFilterSchema,
} from "../validation/filterAlertTireShow.ts";
import {
  alertTireShowUpdateDefaultValues,
  alertTireShowUpdateSchema,
} from "../validation/updateAlertTireShow.ts";
import { AlertTireShowFilterForm } from "./AlertTireShowFilterForm.tsx";
import { AlertTireShowTable } from "./AlertTireShowTable.tsx";
import { AlertTireShowUpdateForm } from "./AlertTireShowUpdateForm.tsx";

export { AlertTireShow };
function AlertTireShow() {
  const { id } = useParams();
  const { t } = useTranslation();

  const crud = useCrud<AlertTireShowResponse>();
  const alertTireShowQuery = useCrudQuery({
    apiFunction: getAlertsTiresShow,
    name: "alertsTiresShow",
    page: crud.page,
    search: crud.search,
    filters: crud.filters,
    keepPrevious: true,
    extras: { id: `${id}` },
  });
  const alertTireShow = alertTireShowQuery.data?.data ?? [];

  const alertTireShowUpdateMutation = useCrudMutationF(
    updateAlertsTiresShow,
    "alertsTiresShow",
    "update",
    {
      onSuccess: () => crud.setUpdateModalOpen(false),
    },
  );

  const alertTireShowUpdateForm = useForm({
    defaultValues: alertTireShowUpdateDefaultValues,
    resolver: zodResolver(alertTireShowUpdateSchema),
  });

  function onUpdatePress(alertTireShowResponse: AlertTireShowResponse) {
    crud.setCurrent(alertTireShowResponse);
    crud.setUpdateModalOpen(true);
  }

  const alertTireShowFilterForm = useForm({
    defaultValues: alertTireShowFilterDefaultValues,
    resolver: zodResolver(alertTireShowFilterSchema),
  });

  function onFilter(data: AlertTireShowFilterSchemaType) {
    const searchParams = new URLSearchParams();
    if (data.date_from) {
      searchParams.append("date_from", data.date_from);
    }
    if (data.date_to) {
      searchParams.append("date_to", data.date_to);
    }
    if (data.ranking_alert) {
      searchParams.append("ranking_alert", data.ranking_alert);
    }
    searchParams.append("order", "DESC");
    crud.setFilters(searchParams);
  }

  useEffect(() => {
    if (crud.current !== undefined) {
      const alertTire = crud.current;
      alertTireShowUpdateForm.setValue("alert_id", alertTire.alert_id);
      alertTireShowUpdateForm.setValue("comment", alertTire.comment);
    }
  }, [crud, alertTireShowUpdateForm]);

  useEffect(() => {
    crud.setFilters(new URLSearchParams({ order: "DESC" }));
  }, []);
  return (
    <>
      <BaseFilterModal
        open={crud.filterModalOpen}
        title={t("general:filter")}
        onClose={() => crud.setFilterModalOpen(false)}
        onConfirm={alertTireShowFilterForm.handleSubmit(async (data) => {
          onFilter(data);
        })}
        onClear={() => {
          alertTireShowFilterForm.reset();
          crud.setFilters(new URLSearchParams({ order: "DESC" }));
        }}
      >
        <AlertTireShowFilterForm form={alertTireShowFilterForm} />
      </BaseFilterModal>
      <BaseUpdateModal
        open={crud.updateModalOpen}
        title={t("titles:update.alert")}
        onClose={() => crud.setUpdateModalOpen(false)}
        onConfirm={alertTireShowUpdateForm.handleSubmit(async (data) => {
          alertTireShowUpdateMutation.mutate({
            id: Number(id),
            data: {
              alert_id: data.alert_id,
              comment: data.comment,
            },
            extras: undefined,
          });
        })}
      >
        <AlertTireShowUpdateForm
          form={alertTireShowUpdateForm}
          alertTireShow={crud.current}
        />
      </BaseUpdateModal>
      <BaseContainer title={t("common:alert", { context: "plural" })}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          <Typography variant="h5">
            Neumático :{" "}
            {alertTireShow.length > 0 &&
              alertTireShow[0].movement_tire.tire_cycle.tire.code}
          </Typography>
          <AlertTireShowTable
            alertTireShows={alertTireShow}
            onUpdate={onUpdatePress}
          />
          <CustomPagination
            page={crud.page}
            onChange={(_event, page) => crud.setPage(page)}
            totalPages={alertTireShowQuery.data?.last_page ?? 1}
          />
          <Portal elementId={"navbarPortal"}>
            <Stack direction={"row"} alignItems={"center"}>
              <IconButton
                sx={{ mr: 2 }}
                onClick={() => crud.setFilterModalOpen(true)}
              >
                <FilterListIcon sx={{ color: "white" }} />
              </IconButton>
              <SearchInput search={(v) => crud.setSearch(v)} />
            </Stack>
          </Portal>
        </Container>
      </BaseContainer>
    </>
  );
}
