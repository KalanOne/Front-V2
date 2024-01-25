import { useEffect } from "react";

import FilterListIcon from "@mui/icons-material/FilterList";
import { Container, IconButton, Stack } from "@mui/material";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { BaseContainer } from "src/components/common/BaseContainer.tsx";
import { CustomPagination } from "src/components/common/CustomPagination.tsx";
import { Portal } from "src/components/common/Portal.tsx";
import { SearchInput } from "src/components/common/SearchInput.tsx";
import { BaseFilterModal } from "src/components/modal/BaseFilterModal.tsx";
import {
  useCrud,
  useCrudCustomMutation,
  useCrudQuery,
} from "src/hooks/crud.tsx";
import { useNotification } from "src/stores/general/notification.ts";

import { alertTireStatus, getAlertsTires } from "../api/alertTireApi.ts";
import { useAlertTireDependencies } from "../hooks/dependencies.ts";
import { AlertTireResponse } from "../types/alertTireTypes.ts";
import {
  AlertTireFilterSchemaType,
  alertTireFilterDefaultValues,
  alertTireFilterSchema,
} from "../validation/filterAlertTire.ts";
import { AlertTireFilterForm } from "./AlertTireFilterForm.tsx";
import { AlertTireTable } from "./AlertTireTable.tsx";

export { AlertTire };

function AlertTire() {
  const { t } = useTranslation();
  const addNotification = useNotification((state) => state.addNotification);
  const crud = useCrud<AlertTireResponse>();
  const alertTireQuery = useCrudQuery({
    apiFunction: getAlertsTires,
    name: "alertsTires",
    page: crud.page,
    search: crud.search,
    filters: crud.filters,
    keepPrevious: true,
    extras: undefined,
  });
  const alertTire = alertTireQuery.data?.data ?? [];

  const alertTireStatusMutation = useCrudCustomMutation(
    alertTireStatus,
    "alertsTires",
    "status",
  );

  function onStatusPress(alertTire: AlertTireResponse) {
    addNotification({
      message: alertTire.status
        ? t("messages:change_status.alert.disable")
        : t("messages:change_status.alert.enable"),
      action: {
        label: "Confirmar",
        onClick: async () => {
          alertTireStatusMutation.mutate({
            id: alertTire.movement_tire_id,
            status: alertTire.status === 1 ? 0 : 1,
          });
        },
      },
    });
  }

  const alertTireFilterForm = useForm({
    defaultValues: alertTireFilterDefaultValues,
    resolver: zodResolver(alertTireFilterSchema),
  });

  function onFilter(data: AlertTireFilterSchemaType) {
    const searchParams = new URLSearchParams();
    if (data.status) {
      searchParams.append("status", data.status === "enabled" ? "1" : "0");
    }
    if (data.brands.length > 0) {
      searchParams.append("brands", data.brands.join(","));
    }
    if (data.subsidiaries) {
      searchParams.append("subsidiaries", data.subsidiaries);
    }
    if (data.warehouses) {
      searchParams.append("warehouses", data.warehouses);
    }
    if (data.providers) {
      searchParams.append("providers", data.providers);
    }
    if (data.tire_size) {
      searchParams.append("tire_size", data.tire_size);
    }
    if (data.condition) {
      searchParams.append("condition", data.condition);
    }
    if (data.DOT_initial) {
      searchParams.append("DOT_initial", data.DOT_initial);
    }
    if (data.DOT_final) {
      searchParams.append("DOT_final", data.DOT_final);
    }
    if (data.date_from) {
      searchParams.append("date_from", data.date_from);
    }
    if (data.date_to) {
      searchParams.append("date_to", data.date_to);
    }
    if (data.invoice_folio) {
      searchParams.append("invoice_folio", data.invoice_folio);
    }
    if (data.models) {
      searchParams.append("models", data.models);
    }
    searchParams.append("order", "DESC");
    crud.setFilters(searchParams);
  }

  const [brands, brandsRevitalized] = useWatch({
    control: alertTireFilterForm.control,
    name: ["brands", "brandsRevitalized"],
  });

  const dependencies = useAlertTireDependencies({
    brand: brands,
    brandRetread: brandsRevitalized,
  });

  useEffect(() => {
    crud.setFilters(new URLSearchParams({ order: "DESC" }));
  }, []);

  return (
    <>
      <BaseFilterModal
        open={crud.filterModalOpen}
        title={t("general:filter")}
        onClose={() => crud.setFilterModalOpen(false)}
        onConfirm={alertTireFilterForm.handleSubmit(async (data) => {
          onFilter(data);
        })}
        onClear={() => {
          alertTireFilterForm.reset();
          crud.setFilters(new URLSearchParams({ order: "DESC" }));
        }}
      >
        <AlertTireFilterForm
          form={alertTireFilterForm}
          dependencies={dependencies}
        />
      </BaseFilterModal>
      <BaseContainer title={t("common:tire", { context: "plural" })}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          <AlertTireTable
            alertsTires={alertTire}
            onStatusChange={onStatusPress}
          />
          <CustomPagination
            page={crud.page}
            onChange={(_event, page) => crud.setPage(page)}
            totalPages={alertTireQuery.data?.last_page ?? 1}
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
