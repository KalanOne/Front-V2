import { useState } from "react";

import FilterListIcon from "@mui/icons-material/FilterList";
import { Container, IconButton, Stack } from "@mui/material";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { BaseContainer } from "src/components/common/BaseContainer";
import { CustomPagination } from "src/components/common/CustomPagination";
import { Portal } from "src/components/common/Portal";
import { BaseCustomModal } from "src/components/modal/BaseCustomModal";
import { BaseFilterModal } from "src/components/modal/BaseFilterModal";
import { useCrud, useCrudQuery } from "src/hooks/crud";

import { getVehicleReviewMovements } from "../api/vehicleReviewMovementApi";
import {
  TireReview,
  VehicleReviewHistoryResponse,
} from "../types/vehicleReviewMovementTypes";
import {
  VehicleReviewMovementFilterSchemaType,
  vehicleReviewMovementFilterDefaultValues,
  vehicleReviewMovementFilterSchema,
} from "../validation/filterVehicleReviewMovement";
import { AlertsTable } from "./AlertsTable";
import { TireRevisionTable } from "./TireRevisionTable";
import { VehicleReviewMovementFilterForm } from "./VehicleReviewMovementFilterForm";
import { VehicleReviewMovementTable } from "./VehicleReviewMovementTable";

export { VehicleReviewMovement };

function VehicleReviewMovement() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [currentAlerts, setCurrentAlerts] = useState<TireReview>();
  const [openAlertsModal, setOpenAlertsModal] = useState(false);

  const crud = useCrud<VehicleReviewHistoryResponse>();
  const vehicleReviewMovementQuery = useCrudQuery({
    apiFunction: getVehicleReviewMovements,
    name: "vehicleReviewMovements",
    page: crud.page,
    search: crud.search,
    filters: crud.filters,
    keepPrevious: true,
    extras: { id: `${id}` },
  });
  const vehicleReviewMovements = vehicleReviewMovementQuery.data?.data ?? [];

  const vehicleReviewMovementFilterForm = useForm({
    defaultValues: vehicleReviewMovementFilterDefaultValues,
    resolver: zodResolver(vehicleReviewMovementFilterSchema),
  });

  function onFilter(data: VehicleReviewMovementFilterSchemaType) {
    const searchParams = new URLSearchParams();
    if (data.date_from) {
      searchParams.append("date_from", data.date_from);
    }
    if (data.date_to) {
      searchParams.append("date_to", data.date_to);
    }
    if (data.review_type.length > 0) {
      searchParams.append("review_type", data.review_type.join(","));
    }
    crud.setFilters(searchParams);
  }

  function onViewAlertClick(alerts: TireReview) {
    setCurrentAlerts(alerts);
    setOpenAlertsModal(true);
  }

  return (
    <>
      <BaseFilterModal
        open={crud.filterModalOpen}
        title={"Filtro"}
        onClose={() => crud.setFilterModalOpen(false)}
        onConfirm={vehicleReviewMovementFilterForm.handleSubmit(
          async (data) => {
            onFilter(data);
          },
        )}
        onClear={() => {
          vehicleReviewMovementFilterForm.reset();
          const searchParams = new URLSearchParams();
          crud.setFilters(searchParams);
        }}
      >
        <VehicleReviewMovementFilterForm
          form={vehicleReviewMovementFilterForm}
        />
      </BaseFilterModal>
      <BaseCustomModal
        open={openAlertsModal}
        title={`${t("general:alerts")} ${
          currentAlerts &&
          currentAlerts.alert_tire.length +
            currentAlerts.alert_vehicle_tire.length
        }`}
        onClose={() => setOpenAlertsModal(false)}
        size={"lg"}
      >
        <AlertsTable tireReview={currentAlerts} />
      </BaseCustomModal>
      <BaseContainer title={t("labels:movement_sheet")}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          <VehicleReviewMovementTable
            vehicleReviewMovements={vehicleReviewMovements}
          />
          {vehicleReviewMovements.map((vehicleReviewMovement) => (
            <TireRevisionTable
              tireReviews={vehicleReviewMovement.tire_review}
              onViewAlertClick={onViewAlertClick}
            />
          ))}
          <CustomPagination
            page={crud.page}
            onChange={(_event, page) => crud.setPage(page)}
            totalPages={vehicleReviewMovementQuery.data?.last_page ?? 1}
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
