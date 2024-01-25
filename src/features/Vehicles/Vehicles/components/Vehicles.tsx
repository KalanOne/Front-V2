import { useEffect, useState } from "react";

import FilterListIcon from "@mui/icons-material/FilterList";
import { Box, Container, IconButton, Stack } from "@mui/material";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { AddFab } from "src/components/common/AddFab";
import { BaseContainer } from "src/components/common/BaseContainer";
import { CustomButton } from "src/components/common/CustomButton";
import { CustomPagination } from "src/components/common/CustomPagination";
import { Portal } from "src/components/common/Portal";
import { SearchInput } from "src/components/common/SearchInput";
import { BaseCreateModal } from "src/components/modal/BaseCreateModal";
import { BaseCustomModal } from "src/components/modal/BaseCustomModal";
import { BaseFilterModal } from "src/components/modal/BaseFilterModal";
import { BaseUpdateModal } from "src/components/modal/BaseUpdateModal";
import { useCrud, useCrudMutationF, useCrudQuery } from "src/hooks/crud";
import { useNotification } from "src/stores/general/notification";
import { fileToBlob } from "src/utils/file";

import {
  createVehicles,
  deleteVehicles,
  getVehicles,
  updateVehicles,
  vehiclesMove,
  vehiclesResetOdometer,
  vehiclesStatus,
} from "../api/vehiclesApi";
import { useVehiclesDependencies } from "../hooks/dependencies";
import { VehiclesResponse } from "../types/vehiclesTypes";
import {
  VehiclesUpdateSchemaType,
  vehiclesUpdateDefaultValues,
  vehiclesUpdateSchema,
} from "../validation/UpdateVehicles";
import {
  VehiclesCreateSchemaType,
  vehiclesCreateDefaultValues,
  vehiclesCreateSchema,
} from "../validation/createVehicles";
import {
  vehiclesExcelDefaultValues,
  vehiclesExcelSchema,
} from "../validation/excelVehicles";
import {
  VehiclesFilterSchemaType,
  vehiclesFilterDefaultValues,
  vehiclesFilterSchema,
} from "../validation/filterVehicles";
import {
  vehiclesMoveDefaultValues,
  vehiclesMoveSchema,
} from "../validation/moveVehicles";
import { VehiclesCreateForm } from "./VehiclesCreateForm";
import { VehiclesExcelForm } from "./VehiclesExcelForm";
import { VehiclesFilterForm } from "./VehiclesFilterForm";
import { VehiclesMoveForm } from "./VehiclesMoveForm";
import { VehiclesTable } from "./VehiclesTable";
import { VehiclesUpdateForm } from "./VehiclesUpdateForm";

export { Vehicles };

function Vehicles() {
  const { t } = useTranslation();
  const addNotification = useNotification((state) => state.addNotification);
  const [moveModal, setMoveModal] = useState(false);
  const [excelOpen, setExcelOpen] = useState(false);

  const crud = useCrud<VehiclesResponse>();
  const vehiclesQuery = useCrudQuery({
    apiFunction: getVehicles,
    name: "vehicles",
    page: crud.page,
    search: crud.search,
    filters: crud.filters,
    keepPrevious: true,
    extras: undefined,
  });
  const vehicles = vehiclesQuery.data?.data ?? [];

  const vehiclesFilterForm = useForm({
    defaultValues: vehiclesFilterDefaultValues,
    resolver: zodResolver(vehiclesFilterSchema),
  });

  const vehiclesCreateForm = useForm({
    defaultValues:
      vehiclesCreateDefaultValues as unknown as VehiclesCreateSchemaType,
    resolver: zodResolver(vehiclesCreateSchema),
  });

  const vehiclesCreateMutation = useCrudMutationF(
    createVehicles,
    "vehicles",
    "create",
    {
      onSuccess: () => {
        crud.setCreateModalOpen(false);
        vehiclesCreateForm.reset();
      },
    },
  );

  const [subsidiaries] = useWatch({
    control: vehiclesFilterForm.control,
    name: ["subsidiaries"],
  });

  const dependencies = useVehiclesDependencies({
    subsidiary: subsidiaries,
  });

  const vehiclesStatusMutation = useCrudMutationF(
    vehiclesStatus,
    "vehicles",
    "custom",
    {
      customName: "status",
    },
  );

  function onStatusPress(vehicle: VehiclesResponse) {
    addNotification({
      message: vehicle.status
        ? "¿Estas seguro de deshabilitar el vehículo?"
        : "¿Estas seguro de habilitar el vehículo?",
      action: {
        label: "Confirmar",
        onClick: async () => {
          vehiclesStatusMutation.mutate({
            id: vehicle.vehicle_id,
            data: {
              status: vehicle.status === 1 ? 0 : 1,
            },
            extras: undefined,
          });
        },
      },
    });
  }

  const vehiclesResetOdometerMutation = useCrudMutationF(
    vehiclesResetOdometer,
    "vehicles",
    "custom",
    {
      customName: "resetOdometer",
    },
  );

  function onResetOdometerPress(vehicle: VehiclesResponse) {
    addNotification({
      message: "¿Estas seguro de reiniciar el odómetro?",
      action: {
        label: "Confirmar",
        onClick: async () => {
          vehiclesResetOdometerMutation.mutate({
            data: {
              id: vehicle.vehicle_id,
            },
            extras: undefined,
          });
        },
      },
    });
  }
  const vehiclesDeleteMutation = useCrudMutationF(
    deleteVehicles,
    "vehicles",
    "delete",
  );
  function onDeletePress(vehicle: VehiclesResponse) {
    addNotification({
      message: "¿Estas seguro de eliminar el vehículo?",
      action: {
        label: "Eliminar",
        onClick: async () => {
          vehiclesDeleteMutation.mutate({
            id: vehicle.vehicle_id,
            extras: undefined,
          });
        },
      },
    });
  }

  const vehiclesMoveForm = useForm({
    defaultValues: vehiclesMoveDefaultValues,
    resolver: zodResolver(vehiclesMoveSchema),
  });

  const vehiclesMoveMutation = useCrudMutationF(
    vehiclesMove,
    "vehicles",
    "custom",
    {
      customName: "move",
    },
  );

  function onMovePress(vehicle: VehiclesResponse) {
    crud.setCurrent(vehicle);
    setMoveModal(true);
  }

  const vehiclesUpdateMutation = useCrudMutationF(
    updateVehicles,
    "vehicles",
    "update",
    {
      onSuccess: () => crud.setUpdateModalOpen(false),
    },
  );

  const vehiclesUpdateForm = useForm({
    defaultValues:
      vehiclesUpdateDefaultValues as unknown as VehiclesUpdateSchemaType,
    resolver: zodResolver(vehiclesUpdateSchema),
  });

  function onUpdatePress(vehicle: VehiclesResponse) {
    crud.setCurrent(vehicle);
    crud.setUpdateModalOpen(true);
  }

  const vehiclesExcelForm = useForm({
    defaultValues: vehiclesExcelDefaultValues,
    resolver: zodResolver(vehiclesExcelSchema),
  });

  function onFilter(data: VehiclesFilterSchemaType) {
    const searchParams = new URLSearchParams();
    if (data.status) {
      searchParams.append("status", data.status === "enabled" ? "1" : "0");
    }
    if (data.subsidiaries.length > 0) {
      searchParams.append("subsidiaries", data.subsidiaries.join(","));
    }
    if (data.vehicle_type_id) {
      searchParams.append("vehicle_type_id", data.vehicle_type_id);
    }
    if (data.vehicle_brand_id) {
      searchParams.append("vehicle_brand_id", data.vehicle_brand_id);
    }
    if (data.type_of_route) {
      searchParams.append("type_of_route", data.type_of_route);
    }
    if (data.drivers) {
      searchParams.append("drivers", data.drivers);
    }
    if (data.has_odometer) {
      searchParams.append(
        "has_odometer",
        data.has_odometer === "enabled" ? "1" : "0",
      );
    }
    searchParams.append("with_link_driver", data.with_link_driver ? "0" : "1");
    if (data.enrollment) {
      searchParams.append("enrollment", data.enrollment);
    }
    if (data.vehicle_engine_brand_id) {
      searchParams.append(
        "vehicle_engine_brand_id",
        data.vehicle_engine_brand_id,
      );
    }
    if (data.engine_transmission_brand_id) {
      searchParams.append(
        "engine_transmission_brand_id",
        data.engine_transmission_brand_id,
      );
    }
    if (data.cylinder_capacity) {
      searchParams.append("cylinder_capacity", data.cylinder_capacity);
    }
    if (data.transmission_model) {
      searchParams.append("transmission_model", data.transmission_model);
    }
    if (data.transmission_speeds) {
      searchParams.append("transmission_speeds", data.transmission_speeds);
    }
    if (data.vehicle_model) {
      searchParams.append("vehicle_model", data.vehicle_model);
    }
    if (data.vehicle_year) {
      searchParams.append("vehicle_year", data.vehicle_year);
    }
    if (data.date_from) {
      searchParams.append("date_from", data.date_from);
    }
    if (data.date_to) {
      searchParams.append("date_to", data.date_to);
    }
    if (data.divisions.length > 0) {
      searchParams.append("divisions", data.divisions.join(","));
    }
    searchParams.append("order", "DESC");
    crud.setFilters(searchParams);
  }

  useEffect(() => {
    if (crud.current !== undefined) {
      const vehicle = crud.current;
      vehiclesUpdateForm.setValue("economic_number", vehicle.economic_number);
      vehiclesUpdateForm.setValue("enrollment", vehicle.enrollment);
      vehiclesUpdateForm.setValue("subsidiary_id", `${vehicle.subsidiary_id}`);
      vehiclesUpdateForm.setValue(
        "division_id",
        vehicle.division[0]?.division_id,
      );
      vehiclesUpdateForm.setValue(
        "driver_id",
        `${vehicle.driver ? vehicle.driver.driver_id : ""}`,
      );
      vehiclesUpdateForm.setValue(
        "vehicle_type_id",
        `${vehicle.vehicle_type_id}`,
      );
      vehiclesUpdateForm.setValue(
        "vehicle_brand_id",
        `${vehicle.vehicle_brand_id}`,
      );
      vehiclesUpdateForm.setValue("type_of_route", vehicle.type_of_route);
      vehiclesUpdateForm.setValue(
        "has_odometer",
        vehicle.has_odometer == 1 ? true : false,
      );
      vehiclesUpdateForm.setValue("vehicle_model", vehicle.vehicle_model);
      vehiclesUpdateForm.setValue(
        "vehicle_engine_brand_id",
        `${vehicle.vehicle_engine_brand_id ?? ""}`,
      );
      vehiclesUpdateForm.setValue(
        "engine_transmission_brand_id",
        `${vehicle.engine_transmission_brand_id ?? ""}`,
      );
      vehiclesUpdateForm.setValue("vehicle_year", vehicle.vehicle_year ?? "");
      vehiclesUpdateForm.setValue(
        "transmission_model",
        `${vehicle.transmission_model ?? ""}`,
      );
      vehiclesUpdateForm.setValue("wheel", vehicle.wheel);
      vehiclesUpdateForm.setValue(
        "transmission_speeds",
        vehicle.transmission_speeds ?? "",
      );
      vehiclesUpdateForm.setValue(
        "cylinder_capacity",
        vehicle.cylinder_capacity ?? "",
      );
    }
  }, [crud.current]);

  useEffect(() => {
    if (excelOpen) {
      vehiclesExcelForm.reset();
    }
  }, [excelOpen]);

  return (
    <>
      <BaseCustomModal
        open={excelOpen}
        size="md"
        title={t("titles:register.vehicles")}
        onClose={() => {
          setExcelOpen(false);
        }}
        onConfirm={() => {
          vehiclesExcelForm.handleSubmit(async (data) => {
            if (!data.excel) {
              return;
            } else {
              const _blob = await fileToBlob(data.excel);
              // console.log(blob);
            }
          })();
          setExcelOpen(false);
        }}
      >
        <VehiclesExcelForm form={vehiclesExcelForm} />
      </BaseCustomModal>
      <BaseUpdateModal
        open={crud.updateModalOpen}
        title={t("titles:update.vehicle")}
        onClose={() => crud.setUpdateModalOpen(false)}
        onConfirm={vehiclesUpdateForm.handleSubmit(async (data) => {
          vehiclesUpdateMutation.mutate({
            id: crud.current?.vehicle_id ?? 0,
            data: {
              economic_number: data.economic_number,
              enrollment: data.enrollment,
              subsidiary_id: data.subsidiary_id,
              division_id: data.division_id,
              driver_id: data.driver_id,
              vehicle_type_id: data.vehicle_type_id,
              vehicle_brand_id: data.vehicle_brand_id,
              type_of_route: data.type_of_route,
              has_odometer: data.has_odometer,
              vehicle_model: data.vehicle_model,
              vehicle_engine_brand_id: data.vehicle_engine_brand_id,
              engine_transmission_brand_id: data.engine_transmission_brand_id,
              vehicle_year: data.vehicle_year,
              transmission_model: data.transmission_model,
              wheel: data.wheel,
              transmission_speeds: data.transmission_speeds,
              cylinder_capacity: data.cylinder_capacity,
            },
            extras: undefined,
          });
        })}
      >
        <VehiclesUpdateForm
          form={vehiclesUpdateForm}
          dependencies={dependencies}
        />
      </BaseUpdateModal>
      <BaseCustomModal
        open={moveModal}
        title={"Trasladar vehículo"}
        onClose={() => {
          setMoveModal(false);
          vehiclesMoveForm.reset();
        }}
        onConfirm={vehiclesMoveForm.handleSubmit(async (data) => {
          vehiclesMoveMutation.mutate({
            id: crud.current?.vehicle_id,
            data: {
              company_id: data.company_id,
              subsidiary_id: data.subsidiary_id,
            },
            extras: undefined,
          });
        })}
      >
        <VehiclesMoveForm form={vehiclesMoveForm} />
      </BaseCustomModal>
      <BaseCreateModal
        open={crud.createModalOpen}
        title={t("titles:new.vehicle")}
        onClose={() => crud.setCreateModalOpen(false)}
        onConfirm={vehiclesCreateForm.handleSubmit(async (data) => {
          // console.log("data", JSON.stringify(data));
          vehiclesCreateMutation.mutate({
            data: {
              economic_number: data.economic_number,
              enrollment: data.enrollment,
              subsidiary_id: data.subsidiary_id,
              division_id: data.division_id,
              driver_id: data.driver_id,
              vehicle_type_id: data.vehicle_type_id,
              vehicle_brand_id: data.vehicle_brand_id,
              type_of_route: data.type_of_route,
              has_odometer: data.has_odometer,
              vehicle_model: data.vehicle_model,
              vehicle_engine_brand_id: data.vehicle_engine_brand_id,
              engine_transmission_brand_id: data.engine_transmission_brand_id,
              vehicle_year: data.vehicle_year,
              transmission_model: data.transmission_model,
              wheel: data.wheel,
              transmission_speeds: data.transmission_speeds,
              cylinder_capacity: data.cylinder_capacity,
              odometer: data.odometer,
            },
            extras: undefined,
          });
        })}
      >
        <VehiclesCreateForm
          form={vehiclesCreateForm}
          dependencies={dependencies}
        />
      </BaseCreateModal>
      <BaseFilterModal
        open={crud.filterModalOpen}
        title={t("general:filter")}
        onClose={() => crud.setFilterModalOpen(false)}
        onConfirm={vehiclesFilterForm.handleSubmit(async (data) => {
          onFilter(data);
        })}
        onClear={() => {
          vehiclesFilterForm.reset();
          crud.setFilters(new URLSearchParams({ order: "DESC" }));
        }}
      >
        <VehiclesFilterForm
          form={vehiclesFilterForm}
          dependencies={dependencies}
        />
      </BaseFilterModal>
      <BaseContainer title={t("common:vehicle", { context: "plural" })}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              mb: 3,
            }}
          >
            <CustomButton
              onClick={() => setExcelOpen(true)}
              text={"REGISTRO POR EXCEL"}
            />
          </Box>
          <VehiclesTable
            vehicles={vehicles}
            onUpdate={onUpdatePress}
            onDelete={onDeletePress}
            onStatusChange={onStatusPress}
            onResetOdometer={onResetOdometerPress}
            onMove={onMovePress}
          />
          <CustomPagination
            page={crud.page}
            onChange={(_event, page) => crud.setPage(page)}
            totalPages={vehiclesQuery.data?.last_page ?? 1}
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
