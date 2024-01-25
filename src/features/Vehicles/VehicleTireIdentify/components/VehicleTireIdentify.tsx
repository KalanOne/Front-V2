import React, { useEffect, useState } from "react";

import { Container, Grid, Typography } from "@mui/material";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { BaseContainer } from "src/components/common/BaseContainer";
import { useCrudMutationF, useCrudUpdateMutation } from "src/hooks/crud";
import { useProgressQuery } from "src/hooks/progress";

import {
  getAxle,
  getReviewVehicle,
  postReviewVehicle,
} from "../../VehicleTirePressure/api/vehicleTirePressureApi";
import { postIdentify } from "../api/vehicleTireIdentifyApi";
import {
  vehicleTireIdentifyDefaultValues,
  vehicleTireIdentifySchema,
} from "../validation/vehicleTireIdentify";
import VehicleTireIdentifyTable from "./VehicleTireIdentifyTable";

function VehicleTireIdentify(): React.ReactElement {
  const { t } = useTranslation();
  const { id } = useParams();
  const [idVehicle, setIdVehicle] = useState("");
  const [hasOdometer, setHasOdometer] = useState(false);

  const reviewQuery = useQuery({
    queryKey: ["review"],
    queryFn: async () => {
      return await getReviewVehicle({ params: {}, extras: { id: `${id}` } });
    },
  });
  const review = reviewQuery.data ?? undefined;
  useProgressQuery(reviewQuery, "review");

  const axlesQuery = useQuery({
    queryKey: ["axles"],
    queryFn: async () => {
      return await getAxle({ params: {}, extras: { id: `${id}` } });
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
  const identifyMutation = useCrudMutationF(
    postIdentify,
    "axles",
    "update",
    {},
  );

  const identifyForm = useForm({
    defaultValues: vehicleTireIdentifyDefaultValues,
    resolver: zodResolver(vehicleTireIdentifySchema),
  });
  const identifyArrayForm = useFieldArray({
    control: identifyForm.control,
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
        identifyForm.setValue("odometer", review.odometer);
        setHasOdometer(true);
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
          <VehicleTireIdentifyTable
            tires={axles}
            form={identifyForm}
            arrayForm={identifyArrayForm}
            onSubmitForm={identifyForm.handleSubmit(
              async (data) => {
                const payload = data.review.filter(
                  (item) => item.status === "no",
                );
                reviewMutation.mutate({
                  id: parseInt(idVehicle),
                  data: {
                    date: data.date,
                    odometer: data.odometer,
                    review_type: "IDENTIFY",
                  },
                  extras: undefined,
                });
                payload.forEach((item) => {
                  identifyMutation.mutate({
                    id: parseInt(item.vehicle_tire_id),
                    data: {
                      vehicle_type_axle_tire_id: item.vehicle_type_axle_tire_id,
                    },
                    extras: undefined,
                  });
                });
              },
              (_e) => {
                // console.log(e);
              },
            )}
            hasOdometer={hasOdometer}
          />
        </Container>
      </BaseContainer>
    </>
  );
}

export default VehicleTireIdentify;

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
