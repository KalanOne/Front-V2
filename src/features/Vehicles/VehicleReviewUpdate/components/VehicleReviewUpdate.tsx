import { useState } from "react";

import { Container, Typography } from "@mui/material";

import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { BaseContainer } from "src/components/common/BaseContainer";
import { useProgressMutation, useProgressQuery } from "src/hooks/progress";
import { useNotification } from "src/stores/general/notification";
import { formatter } from "src/utils/formatters";

import {
  getVehicleReviewsUpdate,
  vehicleReviewsUpdateOdometer,
} from "../api/vehicleReviewUpdateApi";
import { VehicleReviewUpdateData } from "../types/vehicleReviewUpdateTypes";
import { VehicleReviewUpdateTable } from "./VehicleReviewUpdateTable";

export { VehicleReviewUpdate };

function VehicleReviewUpdate() {
  const { t } = useTranslation();
  const { id } = useParams();
  const addNotification = useNotification((state) => state.addNotification);
  const [updater, setUpdater] = useState(false);

  const vehicleReviewUpdateQuery = useQuery({
    queryKey: ["vehicleReviewUpdate", updater.toString()],
    queryFn: async () => {
      return await getVehicleReviewsUpdate(
        new URLSearchParams({
          without_paginate: "1",
        }),
        `${id}`,
      );
    },
    keepPreviousData: true,
  });
  const vehicleReviewsUpdate = vehicleReviewUpdateQuery.data ?? [];
  useProgressQuery(vehicleReviewUpdateQuery, "vehicleReviewUpdate");

  const vehicleReviewUpdateMutation = useMutation({
    mutationFn: async (data: VehicleReviewUpdateData) => {
      return await vehicleReviewsUpdateOdometer(`${id}`, data);
    },
    onSuccess: () => {
      addNotification({
        message: t("messages:updated.vehicle_review"),
        code: "",
      });
      setUpdater(!updater);
    },
    onError: (error: AxiosError) => {
      const errorData: any = error.response?.data;
      if (errorData.error.message) {
        addNotification({
          message: errorData.error.message,
          code: errorData.error.code,
        });
        return;
      }
      addNotification({
        message: "Error",
        code: "",
      });
    },
  });

  useProgressMutation(vehicleReviewUpdateMutation, "vehicleReviewUpdate");

  function onUpdatePress(vehicleReviewUpdate: VehicleReviewUpdateData) {
    addNotification({
      message: t("messages:update.vehicle_review").replace(
        "{odometer}",
        `${formatter.format(vehicleReviewUpdate.odometer)} km`,
      ),
      action: {
        label: t("buttons:confirm"),
        onClick: async () => {
          vehicleReviewUpdateMutation.mutate(vehicleReviewUpdate);
        },
      },
    });
  }

  return (
    <BaseContainer title={t("general:vehicle_review")}>
      <Container sx={{ p: 3 }} maxWidth={"xl"}>
        <Typography variant="h5" gutterBottom>
          Vehículo {vehicleReviewsUpdate[0]?.vehicle?.economic_number}
        </Typography>
        <VehicleReviewUpdateTable
          vehicleReviewsUpdate={vehicleReviewsUpdate}
          onUpdatePress={onUpdatePress}
        />
      </Container>
    </BaseContainer>
  );
}
