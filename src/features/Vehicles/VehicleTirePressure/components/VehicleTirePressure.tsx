import React, { useEffect, useState } from "react";

import { Container, Grid, Typography } from "@mui/material";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { BaseContainer } from "src/components/common/BaseContainer";
import { useCrudMutationF } from "src/hooks/crud";
import { useProgressQuery } from "src/hooks/progress";

import {
  getAxle,
  getReviewVehicle,
  postPressure,
  postReviewVehicle,
} from "../api/vehicleTirePressureApi";
import {
  vehicleTirePressureDefaultValues,
  vehicleTirePressureSchema,
} from "../validation/vehicleTirePressure";
import VehicleTirePressureTable from "./VehicleTirePressureTable";

function VehicleTirePressure(): React.ReactElement {
  const { t } = useTranslation();
  const { id } = useParams();
  const [idVehicle, setIdVehicle] = useState("");

  const reviewQuery = useQuery({
    queryKey: ["review"],
    queryFn: async () => {
      return await getReviewVehicle({
        params: {},
        extras: {
          id: `${id}`,
        },
      });
    },
  });
  const review = reviewQuery.data ?? undefined;
  useProgressQuery(reviewQuery, "review");

  const axlesQuery = useQuery({
    queryKey: ["axles"],
    queryFn: async () => {
      return await getAxle({
        params: {},
        extras: {
          id: `${id}`,
        },
      });
    },
  });
  const axles = axlesQuery.data ?? undefined;
  useProgressQuery(axlesQuery, "axles");

  const reviewMutation = useCrudMutationF(
    postReviewVehicle,
    "axles",
    "update",
    {},
  );
  const pressureMutation = useCrudMutationF(
    postPressure,
    "axles",
    "update",
    {},
  );

  const pressureForm = useForm({
    defaultValues: vehicleTirePressureDefaultValues,
    resolver: zodResolver(vehicleTirePressureSchema),
  });
  const pressureArrayForm = useFieldArray({
    control: pressureForm.control,
    name: "review",
  });

  useEffect(() => {
    if (id) {
      setIdVehicle(id);
    }
  }, [id]);
  useEffect(() => {
    if (review) {
      if (review.odometer) {
        pressureForm.setValue("odometer", review.odometer);
      }
    }
  }, [review]);

  return (
    <>
      <BaseContainer title={t("general:vehicle_review")}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          {review && (
            <Grid sx={{ mb: 2 }} container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="h6" display="block">
                  {t("titles:show.inspection")}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  display="block"
                >
                  {t("labels:last_review")}
                </Typography>
                <Typography variant="body1">{`${t(
                  "labels:done_by",
                )} ${created_by(review.created_by)} ${formatFecha(
                  review.created_at,
                )}`}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  display="block"
                >
                  {t("labels:odometer")}
                </Typography>
                <Typography variant="body1">
                  {`${review.odometer} km`}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  display="block"
                >
                  {t("labels:review_type.label")}
                </Typography>
                <Typography variant="body1">
                  {t(
                    `labels:review_type.options.${review.review_type
                      .toLowerCase()
                      .replace(/\s|\//g, "_")}`,
                  )}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  display="block"
                >
                  {t("labels:new_review")}
                </Typography>
              </Grid>
            </Grid>
          )}
          <VehicleTirePressureTable
            tires={axles}
            form={pressureForm}
            arrayForm={pressureArrayForm}
            onSubmitForm={pressureForm.handleSubmit(async (data) => {
              const payload = data.review.filter((item) => item.pressure > 0);
              reviewMutation.mutate({
                id: parseInt(idVehicle),
                data: {
                  date: data.date,
                  odometer: data.odometer,
                  review_type: "PRESSURE",
                },
                extras: undefined,
              });
              pressureMutation.mutate({
                id: parseInt(idVehicle),
                data: {
                  review: payload,
                },
                extras: undefined,
              });
            })}
          />
        </Container>
      </BaseContainer>
    </>
  );
}

export default VehicleTirePressure;

function formatFecha(fecha: string) {
  const fechaOriginal = new Date(fecha);
  const fechaFormateada = fechaOriginal.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return fechaFormateada;
}

function created_by(created: any) {
  return `${created.name} ${created.last_name_1 || ""} ${
    created.last_name_2 || ""
  }`;
}
