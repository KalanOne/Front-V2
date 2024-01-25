import { useEffect } from "react";

import FilterListIcon from "@mui/icons-material/FilterList";
import { Container, IconButton, Stack } from "@mui/material";

import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "i18next";
import { useForm } from "react-hook-form";

import { BaseContainer } from "src/components/common/BaseContainer.tsx";
import { CustomPagination } from "src/components/common/CustomPagination.tsx";
import { Portal } from "src/components/common/Portal.tsx";
import { BaseFilterModal } from "src/components/modal/BaseFilterModal.tsx";
import { useCrud, useCrudQuery } from "src/hooks/crud.tsx";

import { getAlertsVehicles } from "../api/vehicleApi.ts";
import { useAlertVehicleDependencies } from "../hooks/dependencies.ts";
import { AlertVehicleResponse } from "../types/alertsVehiclesTypes.ts";
import {
  VehicleFilterSchemaType,
  vehicleFilterDefaultValues,
  vehicleFilterSchema,
} from "../validation/filterVehicle.ts";
import { VehicleTable } from "./VechicleTable.tsx";
import { VehicleFilterForm } from "./VehicleFilterForm.tsx";

export { Vehicle };
function Vehicle() {
  const crud = useCrud<AlertVehicleResponse>();
  const vehicleQuery = useCrudQuery({
    apiFunction: getAlertsVehicles,
    name: "alertsVehicles",
    page: crud.page,
    search: crud.search,
    filters: crud.filters,
    keepPrevious: true,
    extras: undefined,
  });
  const vehicles = vehicleQuery.data?.data ?? [];

  const vehicleFilterForm = useForm({
    defaultValues: vehicleFilterDefaultValues,
    resolver: zodResolver(vehicleFilterSchema),
  });

  function onFilter(data: VehicleFilterSchemaType) {
    const searchParams = new URLSearchParams();
    if (data.vehicle_brand_id.length > 0) {
      searchParams.append("vehicle_brand_id", data.vehicle_brand_id.join(","));
    }
    if (data.vehicle_type_id) {
      searchParams.append("vehicle_type_id", data.vehicle_type_id);
    }
    if (data.vehicle_id) {
      searchParams.append("vehicle_id", data.vehicle_id);
    }
    if (data.driver_id) {
      searchParams.append("driver_id", data.driver_id);
    }
    searchParams.append("order", "DESC");
    crud.setFilters(searchParams);
  }

  const dependencies = useAlertVehicleDependencies();

  useEffect(() => {
    crud.setFilters(new URLSearchParams({ order: "DESC" }));
  }, []);

  return (
    <>
      <BaseFilterModal
        open={crud.filterModalOpen}
        title={t("general:filter")}
        onClose={() => crud.setFilterModalOpen(false)}
        onConfirm={vehicleFilterForm.handleSubmit(async (data) => {
          onFilter(data);
        })}
        onClear={() => {
          vehicleFilterForm.reset();
          crud.setFilters(new URLSearchParams({ order: "DESC" }));
        }}
      >
        <VehicleFilterForm
          form={vehicleFilterForm}
          dependencies={dependencies}
        />
      </BaseFilterModal>
      <BaseContainer title={t("common:vehicle", { context: "plural" })}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          <VehicleTable alertsVehicles={vehicles} />
          <CustomPagination
            page={crud.page}
            onChange={(_event, page) => crud.setPage(page)}
            totalPages={vehicleQuery.data?.last_page ?? 1}
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
