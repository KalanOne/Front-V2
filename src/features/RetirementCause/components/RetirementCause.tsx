import React, { useEffect } from "react";

import FilterListIcon from "@mui/icons-material/FilterList";
import { Container, IconButton, Stack } from "@mui/material";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { AddFab } from "src/components/common/AddFab.tsx";
import { BaseContainer } from "src/components/common/BaseContainer.tsx";
import { CustomPagination } from "src/components/common/CustomPagination.tsx";
import { Portal } from "src/components/common/Portal.tsx";
import { SearchInput } from "src/components/common/SearchInput.tsx";
import { BaseCreateModal } from "src/components/modal/BaseCreateModal.tsx";
import { BaseFilterModal } from "src/components/modal/BaseFilterModal.tsx";
import { BaseUpdateModal } from "src/components/modal/BaseUpdateModal.tsx";
import { useCrud, useCrudMutationF, useCrudQuery } from "src/hooks/crud.tsx";
import { useNotification } from "src/stores/general/notification.ts";

import {
  causeStatus,
  createCause,
  deleteCause,
  getCauses,
  updateCause,
} from "../api/retirementCauseApi";
import { RetirementCauseResponse } from "../types/retirementsCauseTypre";
import {
  causeCreateDefaultValues,
  causeCreateSchema,
} from "../validation/createRetirementCause";
import {
  CauseFilterSchemaType,
  causeFilterDefaultValues,
  causeFilterSchema,
} from "../validation/filterRetirementCause";
import {
  causeUpdateDefaultValues,
  causeUpdateSchema,
} from "../validation/updateRetirementCause";
import { RetirementCauseCreateForm } from "./RetirementCauseCreateForm";
import { RetirementCauseFilterForm } from "./RetirementCauseFilterForm";
import { RetirementCauseTable } from "./RetirementCauseTable";
import { RetirementCauseUpdateForm } from "./RetirementCauseUpdateForm";

export { RetirementCause };

function RetirementCause(): React.ReactElement {
  const { t } = useTranslation();
  const addNotification = useNotification((state) => state.addNotification);
  const crud = useCrud<RetirementCauseResponse>();
  const causesQuery = useCrudQuery({
    apiFunction: getCauses,
    name: "causes",
    page: crud.page,
    search: crud.search,
    filters: crud.filters,
    keepPrevious: true,
    extras: undefined,
  });
  const causes = causesQuery.data?.data ?? [];
  const causeCreateMutation = useCrudMutationF(
    createCause,
    "causes",
    "create",
    {
      onSuccess: () => crud.setCreateModalOpen(false),
    },
  );
  const causeUpdateMutation = useCrudMutationF(
    updateCause,
    "causes",
    "update",
    {
      onSuccess: () => crud.setUpdateModalOpen(false),
    },
  );
  const causeDeleteMutation = useCrudMutationF(deleteCause, "causes", "delete");
  const causeStatusMutation = useCrudMutationF(
    causeStatus,
    "causes",
    "custom",
    {
      customName: "status",
    },
  );

  const causeCreateForm = useForm({
    defaultValues: causeCreateDefaultValues,
    resolver: zodResolver(causeCreateSchema),
  });
  const causeUpdateForm = useForm({
    defaultValues: causeUpdateDefaultValues,
    resolver: zodResolver(causeUpdateSchema),
  });
  const causeFilterForm = useForm({
    defaultValues: causeFilterDefaultValues,
    resolver: zodResolver(causeFilterSchema),
  });

  function onCreateModalOpen() {
    causeCreateForm.reset();
  }
  function onItemChange(cause: RetirementCauseResponse) {
    causeUpdateForm.setValue("name", cause.name);
    causeUpdateForm.setValue("description", cause.description);
  }
  function onUpdatePress(brand: RetirementCauseResponse) {
    crud.setCurrent(brand);
    crud.setUpdateModalOpen(true);
  }
  function onDeletePress(cause: RetirementCauseResponse) {
    addNotification({
      message: t("messages:delete.retirement_cause"),
      action: {
        label: "Eliminar",
        onClick: async () => {
          causeDeleteMutation.mutate({
            id: cause.retirement_cause_id,
            extras: undefined,
          });
        },
      },
    });
  }
  function onStatusPress(cause: RetirementCauseResponse) {
    addNotification({
      message: cause.status
        ? t("messages:change_status.retirement_cause.disable")
        : t("messages:change_status.retirement_cause.enable"),
      action: {
        label: "Confirmar",
        onClick: async () => {
          causeStatusMutation.mutate({
            id: cause.retirement_cause_id,
            data: {
              status: cause.status === 1 ? 0 : 1,
            },
            extras: undefined,
          });
        },
      },
    });
  }
  function onFilter(data: CauseFilterSchemaType) {
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

  useEffect(() => {
    if (crud.current !== undefined) {
      const cause = crud.current;
      onItemChange(cause);
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
        title={t("titles:new.retirement_cause")}
        onClose={() => crud.setCreateModalOpen(false)}
        onConfirm={causeCreateForm.handleSubmit(async (data) => {
          causeCreateMutation.mutate({
            data: {
              name: data.name,
              description: data.description,
            },
            extras: undefined,
          });
        })}
      >
        <RetirementCauseCreateForm form={causeCreateForm} />
      </BaseCreateModal>
      <BaseUpdateModal
        open={crud.updateModalOpen}
        title={t("titles:update.retirement_cause")}
        onClose={() => crud.setUpdateModalOpen(false)}
        onConfirm={causeUpdateForm.handleSubmit(async (data) => {
          causeUpdateMutation.mutate({
            id: crud.current?.retirement_cause_id ?? 0,
            data: {
              name: data.name,
              description: data.description,
            },
            extras: undefined,
          });
        })}
      >
        <RetirementCauseUpdateForm form={causeUpdateForm} />
      </BaseUpdateModal>
      <BaseFilterModal
        open={crud.filterModalOpen}
        title={t("general:filter")}
        onClose={() => crud.setFilterModalOpen(false)}
        onConfirm={causeFilterForm.handleSubmit(
          async (data) => {
            onFilter(data);
          },
          // (d) => console.log(d),
        )}
        onClear={() => {
          causeFilterForm.reset();
          crud.setFilters(new URLSearchParams());
        }}
      >
        <RetirementCauseFilterForm form={causeFilterForm} />
      </BaseFilterModal>
      <BaseContainer title={t("general:retirement_causes")}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          <RetirementCauseTable
            causes={causes}
            onUpdate={onUpdatePress}
            onDelete={onDeletePress}
            onStatusChange={onStatusPress}
          />
          <CustomPagination
            page={crud.page}
            onChange={(_event, page) => crud.setPage(page)}
            totalPages={causesQuery.data?.last_page ?? 1}
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
