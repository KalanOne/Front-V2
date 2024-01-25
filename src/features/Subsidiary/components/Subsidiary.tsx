import React, { useEffect } from "react";

import FilterListIcon from "@mui/icons-material/FilterList";
import { Container, IconButton, Stack } from "@mui/material";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { AddFab } from "src/components/common/AddFab";
import { BaseContainer } from "src/components/common/BaseContainer.tsx";
import { CustomPagination } from "src/components/common/CustomPagination";
import { Portal } from "src/components/common/Portal";
import { SearchInput } from "src/components/common/SearchInput";
import { BaseCreateModal } from "src/components/modal/BaseCreateModal";
import { BaseFilterModal } from "src/components/modal/BaseFilterModal";
import { BaseUpdateModal } from "src/components/modal/BaseUpdateModal";
import { SubsidiaryResponse } from "src/features/Subsidiary/types/subsidiaryTypes";
import { useCrud, useCrudMutationF, useCrudQuery } from "src/hooks/crud";
import { useNotification } from "src/stores/general/notification";

import {
  createSubsidiary,
  deleteSubsidiary,
  getSubsidiaries,
  subsidiaryStatus,
  updateSubsidiary,
} from "../api/subsidiaryApi";
import { useDependencies } from "../hooks/dependencies";
import {
  subsidiaryCreateDefaultValues,
  subsidiaryCreateSchema,
} from "../validation/createSubsidiary";
import {
  SubsidiaryFilterSchemaType,
  subsidiaryFilterDefaultValues,
  subsidiaryFilterSchema,
} from "../validation/filterSubsidiary";
import {
  subsidiaryUpdateDefaultValues,
  subsidiaryUpdateSchema,
} from "../validation/updateSubsidiary";
import { SubsidiaryCreateForm } from "./SubsidiaryCreateForm";
import { SubsidiaryFilterForm } from "./SubsidiaryFilterForm";
import { SubsidiaryTable } from "./SubsidiaryTable";
import { SubsidiaryUpdateForm } from "./SubsidiaryUpdateForm";

export { Subsidiary };

function Subsidiary(): React.ReactElement {
  const { t } = useTranslation();
  const addNotification = useNotification((state) => state.addNotification);

  const crud = useCrud<any>();
  const subsidiariesQuery = useCrudQuery({
    apiFunction: getSubsidiaries,
    name: "subsidiaries",
    page: crud.page,
    search: crud.search,
    filters: crud.filters,
    keepPrevious: true,
    extras: undefined,
  });
  const subsidiaries = subsidiariesQuery.data?.data ?? [];

  //dependencies
  const dependencies = useDependencies();

  const subsidiaryCreateMutation = useCrudMutationF(
    createSubsidiary,
    "subsidiaries",
    "create",
    {
      onSuccess: () => crud.setCreateModalOpen(false),
    },
  );
  const subsidiaryUpdateMutation = useCrudMutationF(
    updateSubsidiary,
    "subsidiaries",
    "update",
    {
      onSuccess: () => crud.setUpdateModalOpen(false),
    },
  );
  const subsidiaryDeleteMutation = useCrudMutationF(
    deleteSubsidiary,
    "subsidiaries",
    "delete",
  );
  const subsidiaryStatusMutation = useCrudMutationF(
    subsidiaryStatus,
    "subsidiaries",
    "custom",
  );

  const subsidiaryCreateForm = useForm({
    defaultValues: subsidiaryCreateDefaultValues,
    resolver: zodResolver(subsidiaryCreateSchema),
  });
  const subsidiaryUpdateForm = useForm({
    defaultValues: subsidiaryUpdateDefaultValues,
    resolver: zodResolver(subsidiaryUpdateSchema),
  });
  const subsidiaryFilterForm = useForm({
    defaultValues: subsidiaryFilterDefaultValues,
    resolver: zodResolver(subsidiaryFilterSchema),
  });

  function onUpdatePress(subsidiary: SubsidiaryResponse) {
    crud.setCurrent(subsidiary);
    crud.setUpdateModalOpen(true);
  }
  function onItemChange(subsidiary: SubsidiaryResponse) {
    subsidiaryUpdateForm.setValue("name", subsidiary.name);
    subsidiaryUpdateForm.setValue("company_id", subsidiary.company_id);
    subsidiaryUpdateForm.setValue("direction_1", subsidiary.direction_1);
    subsidiaryUpdateForm.setValue(
      "external_number",
      subsidiary.external_number,
    );
    subsidiaryUpdateForm.setValue(
      "internal_number",
      subsidiary.internal_number ? subsidiary.internal_number : "",
    );
    subsidiaryUpdateForm.setValue(
      "direction_2",
      subsidiary.direction_2 ? subsidiary.direction_2 : "",
    );
    subsidiaryUpdateForm.setValue("postal_code", subsidiary.postal_code);
    subsidiaryUpdateForm.setValue("country", subsidiary.country);
    subsidiaryUpdateForm.setValue("state", subsidiary.state);
    subsidiaryUpdateForm.setValue("province", subsidiary.province);
  }
  function onDeletePress(subsidiary: SubsidiaryResponse) {
    addNotification({
      message: t("messages:delete.subsidiary"),
      action: {
        label: "Eliminar",
        onClick: async () => {
          subsidiaryDeleteMutation.mutate({
            id: subsidiary.subsidiary_id,
            extras: undefined,
          });
        },
      },
    });
  }
  function onStatusPress(subsidiary: SubsidiaryResponse) {
    addNotification({
      message: subsidiary.status
        ? t("messages:change_status.subsidiary.disable")
        : t("messages:change_status.subsidiary.enable"),
      action: {
        label: "Confirmar",
        onClick: async () => {
          subsidiaryStatusMutation.mutate({
            id: subsidiary.subsidiary_id,
            data: {
              status: subsidiary.status === 1 ? 0 : 1,
            },
            extras: undefined,
          });
        },
      },
    });
  }
  function onFilter(data: SubsidiaryFilterSchemaType) {
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
    if (data.company_id.length > 0) {
      searchParams.append("companies", data.company_id.toString());
    }
    crud.setFilters(searchParams);
  }

  useEffect(() => {
    if (crud.current !== undefined) {
      const subsidiary = crud.current;
      subsidiaryUpdateForm.reset();
      onItemChange(subsidiary);
    }
  }, [crud.current]);
  useEffect(() => {
    if (crud.createModalOpen) {
      subsidiaryCreateForm.reset();
    }
  }, [crud.createModalOpen]);

  return (
    <>
      <BaseCreateModal
        open={crud.createModalOpen}
        title={t("titles:new.subsidiary")}
        onClose={() => crud.setCreateModalOpen(false)}
        onConfirm={subsidiaryCreateForm.handleSubmit(async (data) => {
          subsidiaryCreateMutation.mutate({
            data: {
              name: data.name,
              company_id: data.company_id,
              direction_1: data.direction_1,
              external_number: data.external_number,
              internal_number: data.internal_number,
              direction_2: data.direction_2,
              postal_code: data.postal_code,
              country: data.country,
              state: data.state,
              province: data.province,
            },
            extras: undefined,
          });
        })}
      >
        <SubsidiaryCreateForm
          form={subsidiaryCreateForm}
          companies={dependencies.companies}
        />
      </BaseCreateModal>
      <BaseUpdateModal
        open={crud.updateModalOpen}
        title={t("titles:update.subsidiary")}
        onClose={() => crud.setUpdateModalOpen(false)}
        onConfirm={subsidiaryUpdateForm.handleSubmit(async (data) => {
          subsidiaryUpdateMutation.mutate({
            id: crud.current?.subsidiary_id ?? 0,
            data: {
              name: data.name,
              company_id: data.company_id,
              direction_1: data.direction_1,
              external_number: data.external_number,
              internal_number: data.internal_number,
              direction_2: data.direction_2,
              postal_code: data.postal_code,
              country: data.country,
              state: data.state,
              province: data.province,
            },
            extras: undefined,
          });
        })}
      >
        <SubsidiaryUpdateForm
          form={subsidiaryUpdateForm}
          companies={dependencies.companies}
        />
      </BaseUpdateModal>
      <BaseFilterModal
        open={crud.filterModalOpen}
        title={t("general:filter")}
        onClose={() => crud.setFilterModalOpen(false)}
        onConfirm={subsidiaryFilterForm.handleSubmit(
          async (data) => {
            onFilter(data);
          },
          // (d) => console.log(d),
        )}
        onClear={() => {
          subsidiaryFilterForm.reset();
          crud.setFilters(new URLSearchParams());
        }}
      >
        <SubsidiaryFilterForm
          form={subsidiaryFilterForm}
          companies={dependencies.companies}
        />
      </BaseFilterModal>
      <BaseContainer title={t("common:subsidiary", { context: "plural" })}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          <SubsidiaryTable
            subsidiaries={subsidiaries}
            onUpdate={onUpdatePress}
            onDelete={onDeletePress}
            onStatusChange={onStatusPress}
          />
          <CustomPagination
            page={crud.page}
            onChange={(_event, page) => crud.setPage(page)}
            totalPages={subsidiariesQuery.data?.last_page ?? 1}
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
