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
import { useCrud, useCrudMutationF, useCrudQuery } from "src/hooks/crud";
import { useNotification } from "src/stores/general/notification";

import {
  associationStatus,
  createAssociation,
  deleteAssociation,
  getAssociations,
  updateAssociation,
} from "../api/associationApi";
import { useDependencies } from "../hooks/dependencies";
import { AssociationResponse } from "../types/associationTypes";
import {
  associationCreateDefaultValues,
  associationCreateSchema,
} from "../validation/createAssociation";
import {
  AssociationFilterSchemaType,
  associationFilterDefaultValues,
  associationFilterSchema,
} from "../validation/filterAssociation";
import {
  associationUpdateDefaultValues,
  associationUpdateSchema,
} from "../validation/updateAssociation";
import { AssociationCreateForm } from "./AssociationCreateForm";
import { AssociationFilterForm } from "./AssociationFilterForm";
import { AssociationTable } from "./AssociationTable";
import { AssociationUpdateForm } from "./AssociationUpdateForm";

export { Association };

function Association(): React.ReactElement {
  const { t } = useTranslation();
  const addNotification = useNotification((state) => state.addNotification);

  const crud = useCrud<AssociationResponse>();
  const associationQuery = useCrudQuery({
    apiFunction: getAssociations,
    name: "association",
    page: crud.page,
    search: crud.search,
    filters: crud.filters,
    keepPrevious: true,
    extras: undefined,
  });
  const associations = associationQuery.data?.data ?? [];

  //dependencies
  const dependencies = useDependencies();

  const associationCreateMutation = useCrudMutationF(
    createAssociation,
    "association",
    "create",
    {
      onSuccess: () => crud.setCreateModalOpen(false),
    },
  );
  const associationUpdateMutation = useCrudMutationF(
    updateAssociation,
    "association",
    "update",
    {
      onSuccess: () => crud.setUpdateModalOpen(false),
    },
  );
  const associationDeleteMutation = useCrudMutationF(
    deleteAssociation,
    "association",
    "delete",
  );
  const associationStatusMutation = useCrudMutationF(
    associationStatus,
    "association",
    "custom",
    {
      customName: "status",
    },
  );

  const associationCreateForm = useForm({
    defaultValues: associationCreateDefaultValues,
    resolver: zodResolver(associationCreateSchema),
  });
  const associationUpdateForm = useForm({
    defaultValues: associationUpdateDefaultValues,
    resolver: zodResolver(associationUpdateSchema),
  });
  const associationFilterForm = useForm({
    defaultValues: associationFilterDefaultValues,
    resolver: zodResolver(associationFilterSchema),
  });

  function onUpdatePress(association: AssociationResponse) {
    crud.setCurrent(association);
    crud.setUpdateModalOpen(true);
  }
  function onItemChange(association: AssociationResponse) {
    associationUpdateForm.setValue("name", association.name);
    associationUpdateForm.setValue("subsidiary_id", association.subsidiary_id);
    associationUpdateForm.setValue(
      "direction_1",
      association.direction_1 ? association.direction_1 : "",
    );
    associationUpdateForm.setValue(
      "external_number",
      association.external_number,
    );
    associationUpdateForm.setValue(
      "internal_number",
      association.internal_number ? association.internal_number : "",
    );
    associationUpdateForm.setValue(
      "direction_2",
      association.direction_2 ? association.direction_2 : "",
    );
    associationUpdateForm.setValue("postal_code", association.postal_code);
    associationUpdateForm.setValue("country", association.country);
    associationUpdateForm.setValue("state", association.state);
    associationUpdateForm.setValue("province", association.province);
  }
  function onDeletePress(association: AssociationResponse) {
    addNotification({
      message: t("messages:delete.association"),
      action: {
        label: "Eliminar",
        onClick: async () => {
          associationDeleteMutation.mutate({
            id: association.association_id,
            extras: undefined,
          });
        },
      },
    });
  }
  function onStatusPress(association: AssociationResponse) {
    addNotification({
      message: association.status
        ? t("messages:change_status.association.disable")
        : t("messages:change_status.association.enable"),
      action: {
        label: "Confirmar",
        onClick: async () => {
          associationStatusMutation.mutate({
            id: association.association_id,
            data: {
              status: association.status === 1 ? 0 : 1,
            },
            extras: undefined,
          });
        },
      },
    });
  }
  function onFilter(data: AssociationFilterSchemaType) {
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
      searchParams.append("subsidiaries", data.subsidiary_id.toString());
    }
    crud.setFilters(searchParams);
  }

  useEffect(() => {
    if (crud.current !== undefined) {
      const association = crud.current;
      associationUpdateForm.reset();
      onItemChange(association);
    }
  }, [crud.current]);
  useEffect(() => {
    if (crud.createModalOpen) {
      associationCreateForm.reset();
    }
  }, [crud.createModalOpen]);

  return (
    <>
      <BaseCreateModal
        open={crud.createModalOpen}
        title={t("titles:new.association")}
        onClose={() => crud.setCreateModalOpen(false)}
        onConfirm={associationCreateForm.handleSubmit(async (data) => {
          associationCreateMutation.mutate({
            data: {
              name: data.name,
              subsidiary_id: data.subsidiary_id,
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
        <AssociationCreateForm
          form={associationCreateForm}
          subsidiaries={dependencies.subsidiaries}
        />
      </BaseCreateModal>
      <BaseUpdateModal
        open={crud.updateModalOpen}
        title={t("titles:update.association")}
        onClose={() => crud.setUpdateModalOpen(false)}
        onConfirm={associationUpdateForm.handleSubmit(async (data) => {
          associationUpdateMutation.mutate({
            id: crud.current?.association_id ?? 0,
            data: {
              name: data.name,
              subsidiary_id: data.subsidiary_id,
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
        <AssociationUpdateForm
          form={associationUpdateForm}
          subsidiaries={dependencies.subsidiaries}
        />
      </BaseUpdateModal>
      <BaseFilterModal
        open={crud.filterModalOpen}
        title={t("general:filter")}
        onClose={() => crud.setFilterModalOpen(false)}
        onConfirm={associationFilterForm.handleSubmit(
          async (data) => {
            onFilter(data);
          },
          // (d) => console.log(d),
        )}
        onClear={() => {
          associationFilterForm.reset();
          crud.setFilters(new URLSearchParams());
        }}
      >
        <AssociationFilterForm
          form={associationFilterForm}
          subsidiaries={dependencies.subsidiaries}
        />
      </BaseFilterModal>
      <BaseContainer title={t("common:association", { context: "plural" })}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          <AssociationTable
            associations={associations}
            onUpdate={onUpdatePress}
            onDelete={onDeletePress}
            onStatusChange={onStatusPress}
          />
          <CustomPagination
            page={crud.page}
            onChange={(_event, page) => crud.setPage(page)}
            totalPages={associationQuery.data?.last_page ?? 1}
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
