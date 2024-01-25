import { useEffect } from "react";

import FilterListIcon from "@mui/icons-material/FilterList";
import { Container, IconButton, Stack } from "@mui/material";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { BaseContainer } from "src/components/common/BaseContainer.tsx";
import { CustomPagination } from "src/components/common/CustomPagination.tsx";
import { Portal } from "src/components/common/Portal.tsx";
import { BaseFilterModal } from "src/components/modal/BaseFilterModal.tsx";
import { BaseUpdateModal } from "src/components/modal/BaseUpdateModal.tsx";
import { useCrud, useCrudMutationF, useCrudQuery } from "src/hooks/crud.tsx";
import { useNotification } from "src/stores/general/notification.ts";

import {
  deleteVehiclesShow,
  getVehiclesShow,
  updateVehiclesShow,
} from "../api/vehicleShowApi.ts";
import { VehicleShowResponse } from "../types/vehicleShowTypes.ts";
import {
  VehicleShowFilterSchemaType,
  vehicleShowFilterDefaultValues,
  vehicleShowFilterSchema,
} from "../validation/filterVehicleShow.ts";
import {
  vehicleShowUpdateDefaultValues,
  vehicleShowUpdateSchema,
} from "../validation/updateVehicleShow.ts";
import { VehicleShowFilterForm } from "./VehicleShowFilterForm.tsx";
import { VehicleShowTable } from "./VehicleShowTable.tsx";
import { VehicleShowUpdateForm } from "./VehicleShowUpdateForm.tsx";

export { VehicleShow };

function VehicleShow() {
  const { id } = useParams();
  const { t } = useTranslation();
  const addNotification = useNotification((state) => state.addNotification);

  const crud = useCrud<VehicleShowResponse>();
  const vehiclesShowQuery = useCrudQuery({
    apiFunction: getVehiclesShow,
    name: "vehiclesShow",
    page: crud.page,
    search: crud.search,
    filters: crud.filters,
    keepPrevious: true,
    extras: { id: `${id}` },
  });
  const vehiclesShow = vehiclesShowQuery.data?.data ?? [];

  const vehicleShowUpdateMutation = useCrudMutationF(
    updateVehiclesShow,
    "vehiclesShow",
    "update",
    {
      onSuccess: () => crud.setUpdateModalOpen(false),
    },
  );

  const vehicleShowDeleteMutation = useCrudMutationF(
    deleteVehiclesShow,
    "vehiclesShow",
    "delete",
  );

  const vehicleShowUpdateForm = useForm({
    defaultValues: vehicleShowUpdateDefaultValues,
    resolver: zodResolver(vehicleShowUpdateSchema),
  });

  function onUpdatePress(vehicleShowResponse: VehicleShowResponse) {
    crud.setCurrent(vehicleShowResponse);
    crud.setUpdateModalOpen(true);
  }

  const vehicleShowFilterForm = useForm({
    defaultValues: vehicleShowFilterDefaultValues,
    resolver: zodResolver(vehicleShowFilterSchema),
  });

  function onFilter(data: VehicleShowFilterSchemaType) {
    const searchParams = new URLSearchParams();
    // console.log("data", data);
    if (data.date_from) {
      searchParams.append("date_from", data.date_from);
    }
    if (data.date_to) {
      searchParams.append("date_to", data.date_to);
    }
    if (data.ranking_alert) {
      searchParams.append("ranking_alert", data.ranking_alert);
    }
    searchParams.append("order", "DESC");
    crud.setFilters(searchParams);
  }

  function onDeletePress(vehicleShowResponse: VehicleShowResponse) {
    addNotification({
      message: t("messages:delete.alert"),
      action: {
        label: "Eliminar",
        onClick: async () => {
          vehicleShowDeleteMutation.mutate({
            id: `${id}`,
            extras: {
              id: vehicleShowResponse.alert_vehicle_tire_id,
            },
          });
        },
      },
    });
  }

  useEffect(() => {
    if (crud.current !== undefined) {
      const vehicleShowResponse = crud.current;
      vehicleShowUpdateForm.setValue(
        "alert_vehicle_tire_id",
        vehicleShowResponse.alert_vehicle_tire_id,
      );
      vehicleShowUpdateForm.setValue("comment", vehicleShowResponse.comment);
    }
  }, [crud, vehicleShowUpdateForm]);

  useEffect(() => {
    crud.setFilters(new URLSearchParams({ order: "DESC" }));
  }, []);
  return (
    <>
      <BaseFilterModal
        open={crud.filterModalOpen}
        title={t("general:filter")}
        onClose={() => crud.setFilterModalOpen(false)}
        onConfirm={vehicleShowFilterForm.handleSubmit(async (data) => {
          onFilter(data);
        })}
        onClear={() => {
          vehicleShowFilterForm.reset();
          crud.setFilters(new URLSearchParams({ order: "DESC" }));
        }}
      >
        <VehicleShowFilterForm form={vehicleShowFilterForm} />
      </BaseFilterModal>
      <BaseUpdateModal
        open={crud.updateModalOpen}
        title={t("titles:update.alert")}
        onClose={() => crud.setUpdateModalOpen(false)}
        onConfirm={vehicleShowUpdateForm.handleSubmit(async (data) => {
          vehicleShowUpdateMutation.mutate({
            id: Number(id),
            data: {
              alert_vehicle_tire_id: data.alert_vehicle_tire_id,
              comment: data.comment,
            },
            extras: undefined,
          });
        })}
      >
        <VehicleShowUpdateForm
          form={vehicleShowUpdateForm}
          vehicleShow={crud.current}
        />
      </BaseUpdateModal>
      <BaseContainer title={t("common:alert", { context: "plural" })}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          <VehicleShowTable
            vehicleShows={vehiclesShow}
            onUpdate={onUpdatePress}
            onDelete={onDeletePress}
          />
          <CustomPagination
            page={crud.page}
            onChange={(_event, page) => crud.setPage(page)}
            totalPages={vehiclesShowQuery.data?.last_page ?? 1}
          />
          <Portal elementId={"navbarPortal"}>
            <Stack direction={"row"} alignItems={"center"}>
              <IconButton
                sx={{ mr: 2 }}
                onClick={() => crud.setFilterModalOpen(true)}
              >
                <FilterListIcon sx={{ color: "white" }} />
              </IconButton>
            </Stack>
          </Portal>
        </Container>
      </BaseContainer>
    </>
  );
}
