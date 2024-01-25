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
  createWareHouse,
  deleteWareHouse,
  getWareHouses,
  updateWareHouse,
  wareHouseStatus,
} from "../api/wareHouseApi";
import { useDependencies } from "../hooks/dependencies";
import { WareHouseResponse } from "../types/wareHouseTypes";
import {
  wareHouseCreateDefaultValues,
  wareHouseCreateSchema,
} from "../validation/createWareHouse";
import {
  WareHouseFilterSchemaType,
  wareHouseFilterDefaultValues,
  wareHouseFilterSchema,
} from "../validation/filterWareHouse";
import {
  wareHouseUpdateDefaultValues,
  wareHouseUpdateSchema,
} from "../validation/updateWareHouse";
import { WareHouseCreateForm } from "./WareHouseCreateForm";
import { WareHouseFilterForm } from "./WareHouseFilterForm";
import { WareHouseTable } from "./WareHouseTable";
import { WareHouseUpdateForm } from "./WareHouseUpdateForm";

export { WareHouse };

function WareHouse(): React.ReactElement {
  const { t } = useTranslation();
  const addNotification = useNotification((state) => state.addNotification);

  const crud = useCrud<any>();
  const wareHouseQuery = useCrudQuery({
    apiFunction: getWareHouses,
    name: "wareHouse",
    page: crud.page,
    search: crud.search,
    filters: crud.filters,
    keepPrevious: true,
    extras: undefined,
  });
  const wareHouses = wareHouseQuery.data?.data ?? [];

  //dependencies
  const dependencies = useDependencies();

  const wareHouseCreateMutation = useCrudMutationF(
    createWareHouse,
    "wareHouse",
    "create",
    {
      onSuccess: () => crud.setCreateModalOpen(false),
    },
  );
  const wareHouseUpdateMutation = useCrudMutationF(
    updateWareHouse,
    "wareHouse",
    "update",
    {
      onSuccess: () => crud.setUpdateModalOpen(false),
    },
  );
  const wareHouseDeleteMutation = useCrudMutationF(
    deleteWareHouse,
    "wareHouse",
    "delete",
  );
  const wareHouseStatusMutation = useCrudMutationF(
    wareHouseStatus,
    "wareHouse",
    "custom",
    {
      customName: "status",
    },
  );

  const wareHouseCreateForm = useForm({
    defaultValues: wareHouseCreateDefaultValues,
    resolver: zodResolver(wareHouseCreateSchema),
  });
  const wareHouseUpdateForm = useForm({
    defaultValues: wareHouseUpdateDefaultValues,
    resolver: zodResolver(wareHouseUpdateSchema),
  });
  const wareHouseFilterForm = useForm({
    defaultValues: wareHouseFilterDefaultValues,
    resolver: zodResolver(wareHouseFilterSchema),
  });

  function onUpdatePress(wareHouse: WareHouseResponse) {
    crud.setCurrent(wareHouse);
    crud.setUpdateModalOpen(true);
  }
  function onItemChange(wareHouse: WareHouseResponse) {
    wareHouseUpdateForm.setValue("name", wareHouse.name);
    wareHouseUpdateForm.setValue("subsidiary_id", wareHouse.subsidiary_id);
    wareHouseUpdateForm.setValue("direction_1", wareHouse.direction_1);
    wareHouseUpdateForm.setValue("external_number", wareHouse.external_number);
    wareHouseUpdateForm.setValue(
      "internal_number",
      wareHouse.internal_number ? wareHouse.internal_number : "",
    );
    wareHouseUpdateForm.setValue("direction_2", wareHouse.direction_2);
    wareHouseUpdateForm.setValue("postal_code", wareHouse.postal_code);
    wareHouseUpdateForm.setValue("country", wareHouse.country);
    wareHouseUpdateForm.setValue("state", wareHouse.state);
    wareHouseUpdateForm.setValue("province", wareHouse.province);
  }
  function onDeletePress(wareHouse: WareHouseResponse) {
    addNotification({
      message: t("messages:delete.warehouse"),
      action: {
        label: "Eliminar",
        onClick: async () => {
          wareHouseDeleteMutation.mutate({
            id: wareHouse.warehouse_id,
            extras: undefined,
          });
        },
      },
    });
  }
  function onStatusPress(wareHouse: WareHouseResponse) {
    addNotification({
      message: wareHouse.status
        ? t("messages:change_status.warehouse.disable")
        : t("messages:change_status.warehouse.enable"),
      action: {
        label: "Confirmar",
        onClick: async () => {
          wareHouseStatusMutation.mutate({
            id: wareHouse.warehouse_id,
            data: {
              status: wareHouse.status === 1 ? 0 : 1,
            },
            extras: undefined,
          });
        },
      },
    });
  }
  function onFilter(data: WareHouseFilterSchemaType) {
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
      const wareHouse = crud.current;
      wareHouseUpdateForm.reset();
      onItemChange(wareHouse);
    }
  }, [crud.current]);
  useEffect(() => {
    if (crud.createModalOpen) {
      wareHouseCreateForm.reset();
    }
  }, [crud.createModalOpen]);

  return (
    <>
      <BaseCreateModal
        open={crud.createModalOpen}
        title={t("titles:new.warehouse")}
        onClose={() => crud.setCreateModalOpen(false)}
        onConfirm={wareHouseCreateForm.handleSubmit(async (data) => {
          // console.log(data);
          wareHouseCreateMutation.mutate({
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
        <WareHouseCreateForm
          form={wareHouseCreateForm}
          subsidiaries={dependencies.subsidiaries}
        />
      </BaseCreateModal>
      <BaseUpdateModal
        open={crud.updateModalOpen}
        title={t("titles:update.warehouse")}
        onClose={() => crud.setUpdateModalOpen(false)}
        onConfirm={wareHouseUpdateForm.handleSubmit(async (data) => {
          wareHouseUpdateMutation.mutate({
            id: crud.current?.warehouse_id,
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
        <WareHouseUpdateForm
          form={wareHouseUpdateForm}
          subsidiaries={dependencies.subsidiaries}
        />
      </BaseUpdateModal>
      <BaseFilterModal
        open={crud.filterModalOpen}
        title={t("general:filter")}
        onClose={() => crud.setFilterModalOpen(false)}
        onConfirm={wareHouseFilterForm.handleSubmit(
          async (data) => {
            onFilter(data);
          },
          // (d) => console.log(d),
        )}
        onClear={() => {
          wareHouseFilterForm.reset();
          crud.setFilters(new URLSearchParams());
        }}
      >
        <WareHouseFilterForm
          form={wareHouseFilterForm}
          subsidiaries={dependencies.subsidiaries}
        />
      </BaseFilterModal>
      <BaseContainer title={t("common:warehouse", { context: "plural" })}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          <WareHouseTable
            wareHouses={wareHouses}
            onUpdate={onUpdatePress}
            onDelete={onDeletePress}
            onStatusChange={onStatusPress}
          />
          <CustomPagination
            page={crud.page}
            onChange={(_event, page) => crud.setPage(page)}
            totalPages={wareHouseQuery.data?.last_page ?? 1}
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
