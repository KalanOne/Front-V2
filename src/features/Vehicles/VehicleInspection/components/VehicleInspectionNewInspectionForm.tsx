import { useEffect } from "react";

import { Box, Grid, Typography } from "@mui/material";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { CustomButton } from "src/components/common/CustomButton";
import { FormDateInput } from "src/components/form/FormDateInput";
import { FormTextInput } from "src/components/form/FormTextInput";
import { useNotification } from "src/stores/general/notification";

import { StartReviewData } from "../types/vehicleInspectionTypes";
import {
  startVehicleReviewDefaultValues,
  startVehicleReviewSchema,
} from "../validation/startVehicleReview";

export { VehicleInspectionNewInspectionForm };

interface VehicleInspectionNewInspectionFormProps {
  review: any;
  onStartVehicleReviewPress: (data: StartReviewData) => void;
}

function VehicleInspectionNewInspectionForm({
  review,
  onStartVehicleReviewPress,
}: VehicleInspectionNewInspectionFormProps) {
  const { t } = useTranslation();
  const addNotification = useNotification((state) => state.addNotification);

  const startVehicleReviewForm = useForm({
    defaultValues: startVehicleReviewDefaultValues,
    resolver: zodResolver(startVehicleReviewSchema),
  });

  useEffect(() => {
    startVehicleReviewForm.setValue("odometer", review.odometer);
  }, []);

  return (
    <FormProvider {...startVehicleReviewForm}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="overline" display="block" sx={{ color: "gray" }}>
            {t("labels:new_review")}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <FormDateInput name={"date"} label={t("labels:date.label")} />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            name={"odometer"}
            label={t("labels:odometer")}
            inputProps={{ type: "number" }}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormTextInput
            name={"observation"}
            label={t("labels:observation")}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="overline" display="block" sx={{ color: "gray" }}>
            {t("labels:start_inspection")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              mb: 3,
              justifyContent: "flex-end",
            }}
          >
            <CustomButton
              onClick={() => {
                startVehicleReviewForm.setValue("review_type", "COMPLETE");
                startVehicleReviewForm.handleSubmit(async (data) => {
                  addNotification({
                    message: t("messages:travel_confirm").replace(
                      "{value}",
                      `${Number(data.odometer) - review.odometer}`,
                    ),
                    code: "",
                    action: {
                      label: t("buttons:confirm"),
                      onClick: async () => {
                        onStartVehicleReviewPress({
                          date: data.date,
                          observation: data.observation,
                          odometer: Number(data.odometer),
                          review_type: data.review_type,
                        });
                      },
                    },
                  });
                })();
              }}
              text={t("buttons:complete")}
            />
            <CustomButton
              onClick={() => {
                startVehicleReviewForm.setValue(
                  "review_type",
                  "DAMAGE AND WEAR",
                );
                startVehicleReviewForm.handleSubmit(async (data) => {
                  addNotification({
                    message: t("messages:travel_confirm").replace(
                      "{value}",
                      `${Number(data.odometer) - review.odometer}`,
                    ),
                    code: "",
                    action: {
                      label: t("buttons:confirm"),
                      onClick: async () => {
                        onStartVehicleReviewPress({
                          date: data.date,
                          observation: data.observation,
                          odometer: Number(data.odometer),
                          review_type: data.review_type,
                        });
                      },
                    },
                  });
                })();
              }}
              text={t("buttons:damages_and_wear")}
            />
          </Box>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

// DAMAGE AND WEAR
