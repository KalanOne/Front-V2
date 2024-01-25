import React, { useEffect, useState } from "react";

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
import { BaseCustomModal } from "src/components/modal/BaseCustomModal";
import { BaseFilterModal } from "src/components/modal/BaseFilterModal";
import { BaseUpdateModal } from "src/components/modal/BaseUpdateModal";
import { useCrud, useCrudMutationF, useCrudQuery } from "src/hooks/crud";
import { useNotification } from "src/stores/general/notification";

import {
  createGps,
  deleteGps,
  getGps,
  gpsStatus,
  linkGps,
  unLinkGps,
  updateGps,
} from "../api/gpsApi";
import { useDependencies } from "../hooks/dependencies";
import { GpsResponse } from "../types/gpsTypes";
import {
  gpsCreateDefaultValues,
  gpsCreateSchema,
} from "../validation/createGps";
import {
  GpsFilterSchemaType,
  gpsFilterDefaultValues,
  gpsFilterSchema,
} from "../validation/filterGps";
import { gpsLinkDefaultValues, gpsLinkSchema } from "../validation/linkGps";
import {
  gpsUpdateDefaultValues,
  gpsUpdateSchema,
} from "../validation/updateGps";
import { GpsCreateForm } from "./GpsCreateForm";
import { GpsFilterForm } from "./GpsFilterForm";
import { GpsLinkForm } from "./GpsLinkForm";
import { GpsTable } from "./GpsTable";
import { GpsUpdateForm } from "./GpsUpdateForm";

export { Gps };

function Gps(): React.ReactElement {
  const { t } = useTranslation();
  const [custom, setCustom] = useState(false);
  const addNotification = useNotification((state) => state.addNotification);
  const crud = useCrud<GpsResponse>();
  const gpsQuery = useCrudQuery({
    apiFunction: getGps,
    name: "gps",
    page: crud.page,
    search: crud.search,
    filters: crud.filters,
    keepPrevious: true,
    extras: undefined,
  });
  const gps = gpsQuery.data?.data ?? [];

  //dependencies
  const dependencies = useDependencies();

  const gpsCreateMutation = useCrudMutationF(createGps, "gps", "create", {
    onSuccess: () => crud.setCreateModalOpen(false),
  });
  const gpsUpdateMutation = useCrudMutationF(updateGps, "gps", "update", {
    onSuccess: () => crud.setUpdateModalOpen(false),
  });
  const gpsDeleteMutation = useCrudMutationF(deleteGps, "gps", "delete");
  const gpsStatusMutation = useCrudMutationF(gpsStatus, "gps", "custom", {
    customName: "status",
  });
  const gpsLinkMutation = useCrudMutationF(linkGps, "gps", "custom", {
    onSuccess: () => setCustom(false),
    customName: "link",
  });
  const gpsUnLinkMutation = useCrudMutationF(unLinkGps, "gps", "custom", {
    customName: "unlink",
  });

  const gpsCreateForm = useForm({
    defaultValues: gpsCreateDefaultValues,
    resolver: zodResolver(gpsCreateSchema),
  });
  const gpsUpdateForm = useForm({
    defaultValues: gpsUpdateDefaultValues,
    resolver: zodResolver(gpsUpdateSchema),
  });
  const gpsFilterForm = useForm({
    defaultValues: gpsFilterDefaultValues,
    resolver: zodResolver(gpsFilterSchema),
  });
  const gpsLinkForm = useForm({
    defaultValues: gpsLinkDefaultValues,
    resolver: zodResolver(gpsLinkSchema),
  });

  function onUpdatePress(gps: GpsResponse) {
    crud.setCurrent(gps);
    crud.setUpdateModalOpen(true);
  }
  function onItemChange(gps: GpsResponse) {
    gpsUpdateForm.setValue("device_name", gps.device_name);
    gpsUpdateForm.setValue("imei", gps.imei);
    gpsUpdateForm.setValue("subsidiary_id", gps.subsidiary_id);
  }
  function onDeletePress(gps: GpsResponse) {
    addNotification({
      message: t("messages:delete.gps"),
      action: {
        label: "Eliminar",
        onClick: async () => {
          gpsDeleteMutation.mutate({
            id: gps.gps_id,
            extras: undefined,
          });
        },
      },
    });
  }
  function onStatusPress(gps: GpsResponse) {
    addNotification({
      message: gps.status
        ? t("messages:change_status.gps.disable")
        : t("messages:change_status.gps.enable"),
      action: {
        label: "Confirmar",
        onClick: async () => {
          gpsStatusMutation.mutate({
            id: gps.gps_id,
            data: {
              status: gps.status === 1 ? 0 : 1,
            },
            extras: undefined,
          });
        },
      },
    });
  }
  function onFilter(data: GpsFilterSchemaType) {
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
  function onCustomLink(gps: GpsResponse) {
    gpsLinkForm.reset();
    if (gps.vehicle.length > 0) {
      gpsLinkForm.setValue(
        "vehicle_id",
        gps.vehicle[0].vehicle.vehicle_id.toString(),
      );
    }
    setCustom(true);
    crud.setCurrent(gps);
  }
  function onCustomUnLink(gps: GpsResponse) {
    addNotification({
      message: "¿Eliminar vinculo?",
      action: {
        label: "Eliminar",
        onClick: async () => {
          gpsUnLinkMutation.mutate({
            data: {
              gps_id: gps.gps_id,
              vehicle_id: gps.vehicle[0].vehicle.vehicle_id,
            },
            extras: undefined,
          });
        },
      },
    });
  }

  useEffect(() => {
    if (crud.current !== undefined) {
      const gps = crud.current;
      gpsUpdateForm.reset();
      onItemChange(gps);
    }
  }, [crud.current]);
  useEffect(() => {
    if (crud.createModalOpen) {
      gpsCreateForm.reset();
    }
  }, [crud.createModalOpen]);

  return (
    <>
      <BaseCreateModal
        open={crud.createModalOpen}
        title={t("titles:new.gps")}
        onClose={() => crud.setCreateModalOpen(false)}
        onConfirm={gpsCreateForm.handleSubmit(async (data) => {
          gpsCreateMutation.mutate({
            data: {
              device_name: data.device_name,
              imei: data.imei,
              subsidiary_id: data.subsidiary_id,
            },
            extras: undefined,
          });
        })}
      >
        <GpsCreateForm
          form={gpsCreateForm}
          subsidiaries={dependencies.subsidiaries}
        />
      </BaseCreateModal>
      <BaseUpdateModal
        open={crud.updateModalOpen}
        title={t("titles:update.gps")}
        onClose={() => crud.setUpdateModalOpen(false)}
        onConfirm={gpsUpdateForm.handleSubmit(async (data) => {
          gpsUpdateMutation.mutate({
            id: crud.current?.gps_id ?? 0,
            data: {
              imei: data.imei,
              device_name: data.device_name,
              subsidiary_id: data.subsidiary_id,
            },
            extras: undefined,
          });
        })}
      >
        <GpsUpdateForm
          form={gpsUpdateForm}
          subsidiaries={dependencies.subsidiaries}
        />
      </BaseUpdateModal>
      <BaseFilterModal
        open={crud.filterModalOpen}
        title={t("general:filter")}
        onClose={() => crud.setFilterModalOpen(false)}
        onConfirm={gpsFilterForm.handleSubmit(
          async (data) => {
            onFilter(data);
          },
          // (d) => console.log(d),
        )}
        onClear={() => {
          gpsFilterForm.reset();
          crud.setFilters(new URLSearchParams());
        }}
      >
        <GpsFilterForm
          form={gpsFilterForm}
          subsidiaries={dependencies.subsidiaries}
        />
      </BaseFilterModal>
      <BaseCustomModal
        open={custom}
        title={t("titles:new.gps")}
        onClose={() => setCustom(false)}
        onConfirm={gpsLinkForm.handleSubmit(async (data) => {
          gpsLinkMutation.mutate({
            data: {
              gps_id: crud.current?.gps_id ?? 0,
              vehicle_id: parseInt(data.vehicle_id),
            },
            extras: undefined,
          });
        })}
      >
        <GpsLinkForm form={gpsLinkForm} vehicles={dependencies.vehicles} />
      </BaseCustomModal>
      <BaseContainer title={t("general:gps")}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          <GpsTable
            Gps={gps}
            onUpdate={onUpdatePress}
            onDelete={onDeletePress}
            onStatusChange={onStatusPress}
            onLink={onCustomLink}
            onUnLink={onCustomUnLink}
          />
          <CustomPagination
            page={crud.page}
            onChange={(_event, page) => crud.setPage(page)}
            totalPages={gpsQuery.data?.last_page ?? 1}
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
