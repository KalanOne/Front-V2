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
  createDivision,
  deleteDivision,
  divisionStatus,
  getDivisions,
  updateDivision,
} from "../api/divisionApi";
import { useDependencies } from "../hooks/dependencies";
import { DivisionResponse } from "../types/divisionTypes";
import {
  divisionCreateDefaultValues,
  divisionCreateSchema,
} from "../validation/createDivision";
import {
  DivisionFilterSchemaType,
  divisionFilterDefaultValues,
  divisionFilterSchema,
} from "../validation/filterDivision";
import {
  divisionUpdateDefaultValues,
  divisionUpdateSchema,
} from "../validation/updateDivision";
import { DivisionCreateForm } from "./DivisionCreateForm";
import { DivisionFilterForm } from "./DivisionFilterForm";
import { DivisionTable } from "./DivisionTable";
import { DivisionUpdateForm } from "./DivisionUpdateForm";

export { Division };

function Division(): React.ReactElement {
  const { t } = useTranslation();
  const addNotification = useNotification((state) => state.addNotification);
  const crud = useCrud<DivisionResponse>();
  const divisionsQuery = useCrudQuery({
    apiFunction: getDivisions,
    name: "divisions",
    page: crud.page,
    search: crud.search,
    filters: crud.filters,
    keepPrevious: true,
    extras: undefined,
  });
  const divisions = divisionsQuery.data?.data ?? [];

  const dependencies = useDependencies();

  const divisionCreateMutation = useCrudMutationF(
    createDivision,
    "divisions",
    "create",
    {
      onSuccess: () => crud.setCreateModalOpen(false),
    },
  );
  const divisionUpdateMutation = useCrudMutationF(
    updateDivision,
    "divisions",
    "update",
    {
      onSuccess: () => crud.setUpdateModalOpen(false),
    },
  );
  const divisionDeleteMutation = useCrudMutationF(
    deleteDivision,
    "divisions",
    "delete",
  );
  const divisionStatusMutation = useCrudMutationF(
    divisionStatus,
    "divisions",
    "custom",
  );

  const divisionCreateForm = useForm({
    defaultValues: divisionCreateDefaultValues,
    resolver: zodResolver(divisionCreateSchema),
  });
  const divisionUpdateForm = useForm({
    defaultValues: divisionUpdateDefaultValues,
    resolver: zodResolver(divisionUpdateSchema),
  });
  const divisionFilterForm = useForm({
    defaultValues: divisionFilterDefaultValues,
    resolver: zodResolver(divisionFilterSchema),
  });

  function onUpdatePress(division: DivisionResponse) {
    crud.setCurrent(division);
    crud.setUpdateModalOpen(true);
  }
  function onDeletePress(division: DivisionResponse) {
    addNotification({
      message: t("messages:delete.division"),
      action: {
        label: "Eliminar",
        onClick: async () => {
          divisionDeleteMutation.mutate({
            id: division.division_id,
            extras: undefined,
          });
        },
      },
    });
  }
  function onStatusPress(division: DivisionResponse) {
    addNotification({
      message: division.status
        ? t("messages:change_status.division.disable")
        : t("messages:change_status.division.enable"),
      action: {
        label: "Confirmar",
        onClick: async () => {
          divisionStatusMutation.mutate({
            id: division.division_id,
            data: {
              status: division.status === 1 ? 0 : 1,
            },
            extras: undefined,
          });
        },
      },
    });
  }
  function onFilter(data: DivisionFilterSchemaType) {
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
    if (data.subsidiary_id.length > 0) {
      searchParams.append("subsidiaries", data.subsidiary_id);
    }
    crud.setFilters(searchParams);
  }
  function onItemChange(division: DivisionResponse) {
    divisionUpdateForm.setValue("name", division.name);
    divisionUpdateForm.setValue("subsidiary_id", division.subsidiary_id);
  }

  useEffect(() => {
    if (crud.current !== undefined) {
      const division = crud.current;
      onItemChange(division);
    }
  }, [crud.current]);
  useEffect(() => {
    if (crud.createModalOpen) {
      divisionCreateForm.reset();
    }
  }, [crud.createModalOpen]);

  return (
    <>
      <BaseFilterModal
        open={crud.filterModalOpen}
        title={t("general:filter")}
        onClose={() => crud.setFilterModalOpen(false)}
        onConfirm={divisionFilterForm.handleSubmit(
          async (data) => {
            onFilter(data);
          },
          // (d) => console.log(d),
        )}
        onClear={() => {
          divisionFilterForm.reset();
          crud.setFilters(new URLSearchParams());
        }}
      >
        <DivisionFilterForm
          form={divisionFilterForm}
          subsidiaries={dependencies.subsidiaries}
        />
      </BaseFilterModal>
      <BaseCreateModal
        open={crud.createModalOpen}
        title={t("titles:new.division")}
        onClose={() => crud.setCreateModalOpen(false)}
        onConfirm={divisionCreateForm.handleSubmit(async (data) => {
          divisionCreateMutation.mutate({
            data: {
              name: data.name,
              subsidiary_id: data.subsidiary_id,
            },
            extras: undefined,
          });
        })}
      >
        <DivisionCreateForm
          form={divisionCreateForm}
          subsidiaries={dependencies.subsidiaries}
        />
      </BaseCreateModal>
      <BaseUpdateModal
        open={crud.updateModalOpen}
        title={t("titles:update.division")}
        onClose={() => crud.setUpdateModalOpen(false)}
        onConfirm={divisionUpdateForm.handleSubmit(async (data) => {
          divisionUpdateMutation.mutate({
            id: crud.current?.division_id ?? 0,
            data: {
              name: data.name,
              subsidiary_id: data.subsidiary_id,
            },
            extras: undefined,
          });
        })}
      >
        <DivisionUpdateForm
          form={divisionUpdateForm}
          subsidiaries={dependencies.subsidiaries}
        />
      </BaseUpdateModal>
      <BaseContainer title={t("general:divisions")}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          <DivisionTable
            divisions={divisions}
            onUpdate={onUpdatePress}
            onDelete={onDeletePress}
            onStatusChange={onStatusPress}
          />
          <CustomPagination
            page={crud.page}
            onChange={(_event, page) => crud.setPage(page)}
            totalPages={divisionsQuery.data?.last_page ?? 1}
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
