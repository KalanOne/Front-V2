import React, { useEffect } from "react";

import FilterListIcon from "@mui/icons-material/FilterList";
import { Container, IconButton, Stack } from "@mui/material";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { AddFab } from "src/components/common/AddFab";
import { BaseContainer } from "src/components/common/BaseContainer";
import { CustomPagination } from "src/components/common/CustomPagination";
import { Portal } from "src/components/common/Portal";
import { SearchInput } from "src/components/common/SearchInput";
import { BaseCreateModal } from "src/components/modal/BaseCreateModal";
import { BaseFilterModal } from "src/components/modal/BaseFilterModal";
import { BaseUpdateModal } from "src/components/modal/BaseUpdateModal";
import { useCrud, useCrudMutationF, useCrudQuery } from "src/hooks/crud";
import { useNotification } from "src/stores/general/notification";

import {
  alertStatus,
  createAlert,
  deleteAlert,
  getAlerts,
  updateAlert,
} from "../api/alertApi";
import { AlertResponse } from "../types/alertTypes";
import {
  alertCreateDefaultValues,
  alertCreateSchema,
} from "../validation/createAlert";
import {
  AlertFilterSchemaType,
  alertFilterDefaultValues,
  alertFilterSchema,
} from "../validation/filterAlert";
import {
  alertUpdateDefaultValues,
  alertUpdateSchema,
} from "../validation/updateAlert";
import { AlertCreateForm } from "./AlertCreateForm";
import { AlertFilterForm } from "./AlertFilterForm";
import { AlertTable } from "./AlertTable";
import { AlertUpdateForm } from "./AlertUpdateForm";

export { Alert };

function Alert(): React.ReactElement {
  const { t } = useTranslation();
  const addNotification = useNotification((state) => state.addNotification);
  const crud = useCrud<AlertResponse>();
  const alertsQuery = useCrudQuery({
    apiFunction: getAlerts,
    name: "alerts",
    page: crud.page,
    search: crud.search,
    filters: crud.filters,
    keepPrevious: true,
    extras: undefined,
  });

  const alerts = alertsQuery.data?.data ?? [];
  const alertCreateMutation = useCrudMutationF(
    createAlert,
    "alerts",
    "create",
    {
      onSuccess: () => crud.setCreateModalOpen(false),
    },
  );
  const alertUpdateMutation = useCrudMutationF(
    updateAlert,
    "alerts",
    "update",
    {
      onSuccess: () => crud.setUpdateModalOpen(false),
    },
  );
  const alertDeleteMutation = useCrudMutationF(deleteAlert, "alerts", "delete");
  const alertStatusMutation = useCrudMutationF(
    alertStatus,
    "alerts",
    "custom",
    {
      customName: "status",
    },
  );

  const alertCreateForm = useForm({
    defaultValues: alertCreateDefaultValues,
    resolver: zodResolver(alertCreateSchema),
  });
  const alertUpdateForm = useForm({
    defaultValues: alertUpdateDefaultValues,
    resolver: zodResolver(alertUpdateSchema),
  });
  const alertFilterForm = useForm({
    defaultValues: alertFilterDefaultValues,
    resolver: zodResolver(alertFilterSchema),
  });

  function onFilter(data: AlertFilterSchemaType) {
    const searchParams = new URLSearchParams();
    if (data.status) {
      searchParams.append("status", data.status === "enabled" ? "1" : "0");
    }
    if (data.dateFrom) {
      searchParams.append("date_from", data.dateFrom);
    }
    if (data.dateTo) {
      searchParams.append("date_to", data.dateTo);
    }
    crud.setFilters(searchParams);
  }

  function onUpdatePress(alert: AlertResponse) {
    crud.setCurrent(alert);
    crud.setUpdateModalOpen(true);
  }

  function onDeletePress(alert: AlertResponse) {
    addNotification({
      message: t("messages:delete.alert"),
      action: {
        label: "Eliminar",
        onClick: async () => {
          alertDeleteMutation.mutate({
            id: alert.alert_id,
            extras: undefined,
          });
        },
      },
    });
  }

  function onStatusPress(alert: AlertResponse) {
    addNotification({
      message: alert.status
        ? t("messages:change_status.alert.disable")
        : t("messages:change_status.alert.enable"),
      action: {
        label: "Confirmar",
        onClick: async () => {
          alertStatusMutation.mutate({
            id: alert.alert_id,
            data: {
              status: alert.status === 1 ? 0 : 1,
            },
            extras: undefined,
          });
        },
      },
    });
  }

  function onCreateModalOpen() {
    alertCreateForm.reset();
  }

  function onItemChange(alert: AlertResponse) {
    alertUpdateForm.setValue("code", alert.code ? alert.code : "");
    alertUpdateForm.setValue(
      "alert_type",
      alert.alert_type ? alert.alert_type : "",
    );
    alertUpdateForm.setValue(
      "ranking_alert",
      alert.ranking_alert ? alert.ranking_alert : "",
    );
    alertUpdateForm.setValue("priority", alert.priority ? alert.priority : "");
    alertUpdateForm.setValue("details", alert.details ? alert.details : "");
    alertUpdateForm.setValue(
      "suggestion",
      alert.suggestion ? alert.suggestion : "",
    );
  }

  useEffect(() => {
    if (crud.current !== undefined) {
      const alert = crud.current;
      onItemChange(alert);
    }
  }, [crud.current]);

  useEffect(() => {
    if (crud.createModalOpen) {
      onCreateModalOpen();
    }
  }, [crud.createModalOpen]);

  return (
    <>
      <BaseCreateModal
        open={crud.createModalOpen}
        title={t("titles:new.alert")}
        onClose={() => crud.setCreateModalOpen(false)}
        onConfirm={alertCreateForm.handleSubmit(async (data) => {
          alertCreateMutation.mutate({
            data: {
              code: data.code,
              alert_type: data.alert_type,
              ranking_alert: data.ranking_alert,
              priority: data.priority,
              details: data.details,
              suggestion: data.suggestion,
            },
            extras: undefined,
          });
        })}
      >
        <AlertCreateForm form={alertCreateForm} />
      </BaseCreateModal>
      <BaseUpdateModal
        open={crud.updateModalOpen}
        title={t("titles:update.alert")}
        onClose={() => crud.setUpdateModalOpen(false)}
        onConfirm={alertUpdateForm.handleSubmit(async (data) => {
          alertUpdateMutation.mutate({
            id: crud.current?.alert_id ?? 0,
            data: {
              code: data.code,
              alert_type: data.alert_type,
              ranking_alert: data.ranking_alert,
              priority: data.priority,
              details: data.details,
              suggestion: data.suggestion,
            },
            extras: undefined,
          });
        })}
      >
        <AlertUpdateForm form={alertUpdateForm} />
      </BaseUpdateModal>
      <BaseFilterModal
        open={crud.filterModalOpen}
        title={t("general:filter")}
        onClose={() => crud.setFilterModalOpen(false)}
        onConfirm={alertFilterForm.handleSubmit(
          async (data) => {
            onFilter(data);
          },
          // (d) => console.log(d),
        )}
        onClear={() => {
          alertFilterForm.reset();
          crud.setFilters(new URLSearchParams());
        }}
      >
        <AlertFilterForm form={alertFilterForm} />
      </BaseFilterModal>
      <BaseContainer title={t("common:alert", { context: "plural" })}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          <AlertTable
            alerts={alerts}
            onUpdate={onUpdatePress}
            onDelete={onDeletePress}
            onStatusChange={onStatusPress}
          ></AlertTable>
          <CustomPagination
            page={crud.page}
            onChange={(_event, page) => crud.setPage(page)}
            totalPages={alertsQuery.data?.last_page ?? 1}
          />
          <AddFab onClick={() => crud.setCreateModalOpen(true)} />
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
