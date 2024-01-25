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
  commissionedDriverStatus,
  createCommissionedDriver,
  deleteCommissionedDriver,
  getAssociations,
  getCommissionedDrivers,
  updateCommissionedDriver,
} from "../api/commissionedDriverApi";
import { useDependencies } from "../hooks/dependencies";
import {
  AssociationResponse,
  CommissionedDriverResponse,
} from "../types/commissionedDriverTypes";
import {
  commissionedDriverCreateDefaultValues,
  commissionedDriverCreateSchema,
} from "../validation/createCommissionedDriver";
import {
  CommissionedDriverFilterSchemaType,
  commissionedDriverFilterDefaultValues,
  commissionedDriverFilterSchema,
} from "../validation/filterCommissionedDriver";
import {
  commissionedDriverUpdateDefaultValues,
  commissionedDriverUpdateSchema,
} from "../validation/updateCommissionedDriver";
import { CommissionedDriverCreateForm } from "./CommissionedDriverCreateForm";
import { CommissionedDriverFilterForm } from "./CommissionedDriverFilterForm";
import { CommissionedDriverTable } from "./CommissionedDriverTable";
import { CommissionedDriverUpdateForm } from "./CommissionedDriverUpdateForm";

export { CommissionedDriver };

function CommissionedDriver(): React.ReactElement {
  const { t } = useTranslation();
  const addNotification = useNotification((state) => state.addNotification);

  const crud = useCrud<CommissionedDriverResponse>();
  const commissionedDriverQuery = useCrudQuery({
    apiFunction: getCommissionedDrivers,
    name: "commissionedDriver",
    page: crud.page,
    search: crud.search,
    filters: crud.filters,
    keepPrevious: true,
    extras: undefined,
  });
  const commissionedDrivers = commissionedDriverQuery.data?.data ?? [];

  //dependencies
  const dependencies = useDependencies();

  const commissionedDriverCreateMutation = useCrudMutationF(
    createCommissionedDriver,
    "commissionedDriver",
    "create",
    {
      onSuccess: () => crud.setCreateModalOpen(false),
    },
  );
  const commissionedDriverUpdateMutation = useCrudMutationF(
    updateCommissionedDriver,
    "commissionedDriver",
    "update",
    {
      onSuccess: () => crud.setUpdateModalOpen(false),
    },
  );
  const commissionedDriverDeleteMutation = useCrudMutationF(
    deleteCommissionedDriver,
    "commissionedDriver",
    "delete",
  );
  const commissionedDriverStatusMutation = useCrudMutationF(
    commissionedDriverStatus,
    "commissionedDriver",
    "custom",
    {
      customName: "status",
    },
  );

  const commissionedDriverCreateForm = useForm({
    defaultValues: commissionedDriverCreateDefaultValues,
    resolver: zodResolver(commissionedDriverCreateSchema),
  });
  const commissionedDriverUpdateForm = useForm({
    defaultValues: commissionedDriverUpdateDefaultValues,
    resolver: zodResolver(commissionedDriverUpdateSchema),
  });
  const commissionedDriverFilterForm = useForm({
    defaultValues: commissionedDriverFilterDefaultValues,
    resolver: zodResolver(commissionedDriverFilterSchema),
  });

  function onUpdatePress(commissionedDriver: CommissionedDriverResponse) {
    crud.setCurrent(commissionedDriver);
    crud.setUpdateModalOpen(true);
  }
  function onItemChange(commissionedDriver: CommissionedDriverResponse) {
    commissionedDriverUpdateForm.setValue("name", commissionedDriver.name);
    commissionedDriverUpdateForm.setValue(
      "driver_code",
      commissionedDriver.driver_code,
    );
    commissionedDriverUpdateForm.setValue(
      "association_id",
      commissionedDriver.association_id,
    );
  }
  function onDeletePress(commissionedDriver: CommissionedDriverResponse) {
    addNotification({
      message: "¿Eliminar Conductor?",
      action: {
        label: "Eliminar",
        onClick: async () => {
          commissionedDriverDeleteMutation.mutate({
            id: commissionedDriver.commissioned_driver_id,
            extras: undefined,
          });
        },
      },
    });
  }
  function onStatusPress(commissionedDriver: CommissionedDriverResponse) {
    addNotification({
      message: commissionedDriver.status
        ? "¿Estas seguro de deshabilitar al Conductor?"
        : "¿Estas seguro de habilitar al Conductor?",
      action: {
        label: "Confirmar",
        onClick: async () => {
          commissionedDriverStatusMutation.mutate({
            id: commissionedDriver.commissioned_driver_id,
            data: {
              status: commissionedDriver.status === 1 ? 0 : 1,
            },
            extras: undefined,
          });
        },
      },
    });
  }
  function onFilter(data: CommissionedDriverFilterSchemaType) {
    const searchParams = new URLSearchParams();
    if (data.status) {
      searchParams.append("status", data.status === "enabled" ? "1" : "0");
    }
    if (data.association_id.length > 0) {
      searchParams.append("association_id", data.association_id);
    }
    crud.setFilters(searchParams);
  }

  useEffect(() => {
    if (crud.current !== undefined) {
      const commissionedDriver = crud.current;
      commissionedDriverUpdateForm.reset();
      onItemChange(commissionedDriver);
    }
  }, [crud.current]);
  useEffect(() => {
    if (crud.createModalOpen) {
      commissionedDriverCreateForm.reset();
    }
  }, [crud.createModalOpen]);

  return (
    <>
      <BaseCreateModal
        open={crud.createModalOpen}
        title={t("titles:new.driver")}
        onClose={() => crud.setCreateModalOpen(false)}
        onConfirm={commissionedDriverCreateForm.handleSubmit(async (data) => {
          commissionedDriverCreateMutation.mutate({
            data: {
              name: data.name,
              driver_code: data.driver_code,
              association_id: data.association_id,
            },
            extras: undefined,
          });
        })}
      >
        <CommissionedDriverCreateForm
          form={commissionedDriverCreateForm}
          associations={dependencies.associations}
        />
      </BaseCreateModal>
      <BaseUpdateModal
        open={crud.updateModalOpen}
        title={t("titles:update.driver")}
        onClose={() => crud.setUpdateModalOpen(false)}
        onConfirm={commissionedDriverUpdateForm.handleSubmit(async (data) => {
          commissionedDriverUpdateMutation.mutate({
            id: crud.current?.commissioned_driver_id ?? 0,
            data: {
              name: data.name,
              driver_code: data.driver_code,
              association_id: data.association_id,
            },
            extras: undefined,
          });
        })}
      >
        <CommissionedDriverUpdateForm
          form={commissionedDriverUpdateForm}
          associations={dependencies.associations}
        />
      </BaseUpdateModal>
      <BaseFilterModal
        open={crud.filterModalOpen}
        title={"Filtro"}
        onClose={() => crud.setFilterModalOpen(false)}
        onConfirm={commissionedDriverFilterForm.handleSubmit(
          async (data) => {
            onFilter(data);
          },
          // (d) => console.log(d),
        )}
        onClear={() => {
          commissionedDriverFilterForm.reset();
          crud.setFilters(new URLSearchParams());
        }}
      >
        <CommissionedDriverFilterForm
          form={commissionedDriverFilterForm}
          associations={dependencies.associations}
        />
      </BaseFilterModal>
      <BaseContainer title={"Conductores del transportista"}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          <CommissionedDriverTable
            commissionedDrivers={commissionedDrivers}
            onUpdate={onUpdatePress}
            onDelete={onDeletePress}
            onStatusChange={onStatusPress}
          />
          <CustomPagination
            page={crud.page}
            onChange={(_event, page) => crud.setPage(page)}
            totalPages={commissionedDriverQuery.data?.last_page ?? 1}
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
