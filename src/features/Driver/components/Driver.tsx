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
  createDriver,
  deleteDriver,
  driverStatus,
  getDrivers,
  updateDriver,
} from "../api/driverApi";
import { useDependencies } from "../hooks/dependencies";
import { DriverResponse } from "../types/driverTypes";
import {
  driverCreateDefaultValues,
  driverCreateSchema,
} from "../validation/createDriver";
import {
  DriverFilterSchemaType,
  driverFilterDefaultValues,
  driverFilterSchema,
} from "../validation/filterDriver";
import {
  driverUpdateDefaultValues,
  driverUpdateSchema,
} from "../validation/updateDriver";
import { DriverCreateForm } from "./DriverCreateForm";
import { DriverFilterForm } from "./DriverFilterForm";
import { DriverTable } from "./DriverTable";
import { DriverUpdateForm } from "./DriverUpdateForm";

export { Driver };

function Driver(): React.ReactElement {
  const { t } = useTranslation();
  const addNotification = useNotification((state) => state.addNotification);
  const crud = useCrud<DriverResponse>();
  const driversQuery = useCrudQuery({
    apiFunction: getDrivers,
    name: "drivers",
    page: crud.page,
    search: crud.search,
    filters: crud.filters,
    keepPrevious: true,
    extras: undefined,
  });
  const drivers = driversQuery.data?.data ?? [];

  const dependencies = useDependencies();

  const driverCreateMutation = useCrudMutationF(
    createDriver,
    "drivers",
    "create",
    {
      onSuccess: () => crud.setCreateModalOpen(false),
    },
  );
  const driverUpdateMutation = useCrudMutationF(
    updateDriver,
    "drivers",
    "update",
    {
      onSuccess: () => crud.setUpdateModalOpen(false),
    },
  );
  const driverDeleteMutation = useCrudMutationF(
    deleteDriver,
    "drivers",
    "delete",
  );
  const driverStatusMutation = useCrudMutationF(
    driverStatus,
    "drivers",
    "custom",
    {
      customName: "status",
    },
  );

  const driverCreateForm = useForm({
    defaultValues: driverCreateDefaultValues,
    resolver: zodResolver(driverCreateSchema),
  });
  const driverUpdateForm = useForm({
    defaultValues: driverUpdateDefaultValues,
    resolver: zodResolver(driverUpdateSchema),
  });
  const driverFilterForm = useForm({
    defaultValues: driverFilterDefaultValues,
    resolver: zodResolver(driverFilterSchema),
  });

  function onUpdatePress(driver: DriverResponse) {
    crud.setCurrent(driver);
    crud.setUpdateModalOpen(true);
  }
  function onDeletePress(driver: DriverResponse) {
    addNotification({
      message: t("messages:delete.driver"),
      action: {
        label: "Eliminar",
        onClick: async () => {
          driverDeleteMutation.mutate({
            id: driver.driver_id,
            extras: undefined,
          });
        },
      },
    });
  }
  function onStatusPress(driver: DriverResponse) {
    addNotification({
      message: driver.status
        ? t("messages:change_status.driver.disable")
        : t("messages:change_status.driver.enable"),
      action: {
        label: "Confirmar",
        onClick: async () => {
          driverStatusMutation.mutate({
            id: driver.driver_id,
            data: {
              status: driver.status === 1 ? 0 : 1,
            },
            extras: undefined,
          });
        },
      },
    });
  }
  function onFilter(data: DriverFilterSchemaType) {
    const searchParams = new URLSearchParams();
    if (data.status) {
      searchParams.append("status", data.status === "enabled" ? "1" : "0");
    }
    if (data.subsidiary_id.length > 0) {
      searchParams.append("subsidiaries", data.subsidiary_id);
    }
    crud.setFilters(searchParams);
  }
  function onItemChange(driver: DriverResponse) {
    driverUpdateForm.setValue("name", driver.name);
    driverUpdateForm.setValue("subsidiary_id", driver.subsidiary_id);
  }

  useEffect(() => {
    if (crud.current !== undefined) {
      const driver = crud.current;
      onItemChange(driver);
    }
  }, [crud.current]);
  useEffect(() => {
    if (crud.createModalOpen) {
      driverCreateForm.reset();
    }
  }, [crud.createModalOpen]);

  return (
    <>
      <BaseCreateModal
        open={crud.createModalOpen}
        title={t("titles:new.driver")}
        onClose={() => crud.setCreateModalOpen(false)}
        onConfirm={driverCreateForm.handleSubmit(async (data) => {
          driverCreateMutation.mutate({
            data: {
              name: data.name,
              subsidiary_id: data.subsidiary_id,
            },
            extras: undefined,
          });
        })}
      >
        <DriverCreateForm
          form={driverCreateForm}
          subsidiaries={dependencies.subsidiaries}
        />
      </BaseCreateModal>
      <BaseUpdateModal
        open={crud.updateModalOpen}
        title={t("titles:update.driver")}
        onClose={() => crud.setUpdateModalOpen(false)}
        onConfirm={driverUpdateForm.handleSubmit(async (data) => {
          driverUpdateMutation.mutate({
            id: crud.current?.driver_id ?? 0,
            data: {
              name: data.name,
              subsidiary_id: data.subsidiary_id,
            },
            extras: undefined,
          });
        })}
      >
        <DriverUpdateForm
          form={driverUpdateForm}
          subsidiaries={dependencies.subsidiaries}
        />
      </BaseUpdateModal>
      <BaseFilterModal
        open={crud.filterModalOpen}
        title={t("general:filter")}
        onClose={() => crud.setFilterModalOpen(false)}
        onConfirm={driverFilterForm.handleSubmit(
          async (data) => {
            onFilter(data);
          },
          // (d) => console.log(d),
        )}
        onClear={() => {
          driverFilterForm.reset();
          crud.setFilters(new URLSearchParams());
        }}
      >
        <DriverFilterForm
          form={driverFilterForm}
          subsidiaries={dependencies.subsidiaries}
        />
      </BaseFilterModal>
      <BaseContainer title={t("common:driver", { context: "plural" })}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          <DriverTable
            drivers={drivers}
            onUpdate={onUpdatePress}
            onDelete={onDeletePress}
            onStatusChange={onStatusPress}
          />
          <CustomPagination
            page={crud.page}
            onChange={(_event, page) => crud.setPage(page)}
            totalPages={driversQuery.data?.last_page ?? 1}
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
