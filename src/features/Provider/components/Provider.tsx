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
import { getSubsidiaries } from "src/features/Subsidiary/api/subsidiaryApi";
import { SubsidiaryResponse } from "src/features/Subsidiary/types/subsidiaryTypes";
import { useCrud, useCrudMutationF, useCrudQuery } from "src/hooks/crud";
import { useNotification } from "src/stores/general/notification";

import {
  createProvider,
  deleteProvider,
  getProviders,
  providerStatus,
  updateProvider,
} from "../api/providerApi";
import { useDependencies } from "../hooks/dependencies";
import { ProviderResponse } from "../types/providerTypes";
import {
  providerCreateDefaultValues,
  providerCreateSchema,
} from "../validation/createProvider";
import {
  ProviderFilterSchemaType,
  providerFilterDefaultValues,
  providerFilterSchema,
} from "../validation/filterProvider";
import {
  providerUpdateDefaultValues,
  providerUpdateSchema,
} from "../validation/updateProvider";
import { ProviderCreateForm } from "./ProviderCreateForm";
import { ProviderFilterForm } from "./ProviderFilterForm";
import { ProviderTable } from "./ProviderTable";
import { ProviderUpdateForm } from "./ProviderUpdateForm";

export { Provider };

function Provider(): React.ReactElement {
  const { t } = useTranslation();
  const addNotification = useNotification((state) => state.addNotification);
  const crud = useCrud<ProviderResponse>();
  const providerQuery = useCrudQuery({
    apiFunction: getProviders,
    name: "provider",
    page: crud.page,
    search: crud.search,
    filters: crud.filters,
    keepPrevious: true,
    extras: undefined,
  });
  const providers = providerQuery.data?.data ?? [];

  const dependencies = useDependencies();

  const providerCreateMutation = useCrudMutationF(
    createProvider,
    "provider",
    "create",
    {
      onSuccess: () => crud.setCreateModalOpen(false),
    },
  );
  const providerUpdateMutation = useCrudMutationF(
    updateProvider,
    "provider",
    "update",
    {
      onSuccess: () => crud.setUpdateModalOpen(false),
    },
  );
  const providerDeleteMutation = useCrudMutationF(
    deleteProvider,
    "provider",
    "delete",
  );
  const providerStatusMutation = useCrudMutationF(
    providerStatus,
    "provider",
    "custom",
    {
      customName: "status",
    },
  );

  const providerCreateForm = useForm({
    defaultValues: providerCreateDefaultValues,
    resolver: zodResolver(providerCreateSchema),
  });
  const providerUpdateForm = useForm({
    defaultValues: providerUpdateDefaultValues,
    resolver: zodResolver(providerUpdateSchema),
  });
  const providerFilterForm = useForm({
    defaultValues: providerFilterDefaultValues,
    resolver: zodResolver(providerFilterSchema),
  });

  function onUpdatePress(provider: ProviderResponse) {
    crud.setCurrent(provider);
    crud.setUpdateModalOpen(true);
  }
  function onItemChange(provider: ProviderResponse) {
    providerUpdateForm.setValue("name", provider.name);
    providerUpdateForm.setValue("rfc", provider.rfc);
    providerUpdateForm.setValue(
      "observation",
      provider.observation ? provider.observation : "",
    );
    providerUpdateForm.setValue("subsidiary_id", provider.subsidiary_id);
  }
  function onDeletePress(provider: ProviderResponse) {
    addNotification({
      message: t("messages:delete.provider"),
      action: {
        label: "Eliminar",
        onClick: async () => {
          providerDeleteMutation.mutate({
            id: provider.provider_id,
            extras: undefined,
          });
        },
      },
    });
  }
  function onStatusPress(provider: ProviderResponse) {
    addNotification({
      message: provider.status
        ? t("messages:change_status.provider.disable")
        : t("messages:change_status.provider.enable"),
      action: {
        label: "Confirmar",
        onClick: async () => {
          providerStatusMutation.mutate({
            id: provider.provider_id,
            data: {
              status: provider.status === 1 ? 0 : 1,
            },
            extras: undefined,
          });
        },
      },
    });
  }
  function onFilter(data: ProviderFilterSchemaType) {
    const searchParams = new URLSearchParams();
    if (data.status) {
      searchParams.append("status", data.status === "enabled" ? "1" : "0");
    }
    if (data.subsidiary_id.length > 0) {
      searchParams.append("subsidiaries", data.subsidiary_id);
    }
    crud.setFilters(searchParams);
  }

  useEffect(() => {
    if (crud.current !== undefined) {
      const provider = crud.current;
      providerUpdateForm.reset();
      onItemChange(provider);
    }
  }, [crud.current]);
  useEffect(() => {
    if (crud.createModalOpen) {
      providerCreateForm.reset();
    }
  }, [crud.createModalOpen]);

  return (
    <>
      <BaseCreateModal
        open={crud.createModalOpen}
        title={t("titles:new.provider")}
        onClose={() => crud.setCreateModalOpen(false)}
        onConfirm={providerCreateForm.handleSubmit(async (data) => {
          providerCreateMutation.mutate({
            data: {
              rfc: data.rfc,
              observation: data.observation ? data.observation : "",
              name: data.name,
              subsidiary_id: data.subsidiary_id,
            },
            extras: undefined,
          });
        })}
      >
        <ProviderCreateForm
          form={providerCreateForm}
          subsidiaries={dependencies.subsidiaries}
        />
      </BaseCreateModal>
      <BaseUpdateModal
        open={crud.updateModalOpen}
        title={t("titles:update.provider")}
        onClose={() => crud.setUpdateModalOpen(false)}
        onConfirm={providerUpdateForm.handleSubmit(async (data) => {
          providerUpdateMutation.mutate({
            id: crud.current?.provider_id ?? 0,
            data: {
              rfc: data.rfc,
              observation: data.observation,
              name: data.name,
              subsidiary_id: data.subsidiary_id,
            },
            extras: undefined,
          });
        })}
      >
        <ProviderUpdateForm
          form={providerUpdateForm}
          subsidiaries={dependencies.subsidiaries}
        />
      </BaseUpdateModal>
      <BaseFilterModal
        open={crud.filterModalOpen}
        title={t("general:filter")}
        onClose={() => crud.setFilterModalOpen(false)}
        onConfirm={providerFilterForm.handleSubmit(
          async (data) => {
            onFilter(data);
          },
          // (d) => console.log(d),
        )}
        onClear={() => {
          providerFilterForm.reset();
          crud.setFilters(new URLSearchParams());
        }}
      >
        <ProviderFilterForm
          form={providerFilterForm}
          subsidiaries={dependencies.subsidiaries}
        />
      </BaseFilterModal>
      <BaseContainer title={t("common:provider", { context: "plural" })}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          <ProviderTable
            providers={providers}
            onUpdate={onUpdatePress}
            onDelete={onDeletePress}
            onStatusChange={onStatusPress}
          />
          <CustomPagination
            page={crud.page}
            onChange={(_event, page) => crud.setPage(page)}
            totalPages={providerQuery.data?.last_page ?? 1}
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
