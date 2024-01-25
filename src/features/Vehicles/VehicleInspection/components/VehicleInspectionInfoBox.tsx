/* eslint-disable @typescript-eslint/no-explicit-any */
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";

import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

import { useNotification } from "src/stores/general/notification";
import { formatter } from "src/utils/formatters";

import { StartReviewData } from "../types/vehicleInspectionTypes";
import { VehicleInspectionNewInspectionForm } from "./VehicleInspectionNewInspectionForm";
import { VehicleInspectionReviewInProcess } from "./VehicleInspectionReviewInProcess";

export { VehicleInspectionInfoBox };

interface VehicleInspectionInfoBoxProps {
  review: any;
  onStartVehicleReviewPress: (data: StartReviewData) => void;
  onVehicleReviewDeletePress: () => void;
  onVehicleReviewUpdatePress: () => void;
  onVehicleReviewFinalizePress: () => void;
}

function VehicleInspectionInfoBox({
  review,
  onStartVehicleReviewPress,
  onVehicleReviewDeletePress,
  onVehicleReviewUpdatePress,
  onVehicleReviewFinalizePress,
}: VehicleInspectionInfoBoxProps) {
  const { t } = useTranslation();
  const addNotification = useNotification((state) => state.addNotification);

  const reviewType = (type: string) => {
    switch (type.toLowerCase()) {
      case "reset":
        return t("labels:review_type.options.reset");
      case "complete":
        return t("labels:review_type.options.complete");
      case "damage and wear":
        return t("labels:review_type.options.damage_and_wear");
      case "rotation":
        return t("labels:review_type.options.rotation");
      case "mount_dismount":
        return t("labels:review_type.options.mount_dismount");
      case "pressure":
        return t("labels:review_type.options.pressure");
      case "identify":
        return t("labels:review_type.options.identify");
      case "initial":
        return t("labels:review_type.options.initial");
      case "partial":
        return t("labels:review_type.options.partial");
      default:
        return type;
    }
  };

  return (
    // <Grid container spacing={2}>
    <Grid item xs={6}>
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "4px",
          boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
          p: 2,
        }}
      >
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          {t("labels:inspection.singular")}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={!review.end_time ? 8 : 10}>
            <Typography
              variant="overline"
              gutterBottom
              display="block"
              sx={{ color: "gray" }}
            >
              {t("labels:last_review")}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Tooltip title={t("buttons:edit")}>
              <IconButton onClick={onVehicleReviewUpdatePress}>
                <EditIcon color={"primary"} />
              </IconButton>
            </Tooltip>
          </Grid>
          {!review.end_time && (
            <Grid item xs={2}>
              <Tooltip title={t("buttons:delete")}>
                <IconButton
                  onClick={() => {
                    addNotification({
                      message: t("messages:delete.vehicle_review"),
                      code: "",
                      action: {
                        label: t("buttons:confirm"),
                        onClick: () => {
                          onVehicleReviewDeletePress();
                        },
                      },
                    });
                  }}
                >
                  <DeleteIcon color={"primary"} />
                </IconButton>
              </Tooltip>
            </Grid>
          )}
        </Grid>
        <Typography variant="body1" gutterBottom display="block">
          {t("labels:inspection_date")} {dayjs(review.date).format("LL")}
        </Typography>
        <Typography variant="body1" gutterBottom display="block">
          {t("labels:captured_by")}{" "}
          {t("labels:actioned_by")
            .replace(
              "{person}",
              `${review.created_by.name} ${" "}
${review.created_by.last_name_1} ${" "}
${review.created_by.last_name_2 ?? ""}`,
            )
            .replace("{date}", dayjs(review.created_at).format("LL"))
            .replace("{time}", dayjs(review.created_at).format("LT"))}
        </Typography>
        {review.updated_by && (
          <Typography variant="body1" gutterBottom display="block">
            {t("labels:edited_by")}{" "}
            {t("labels:actioned_by")
              .replace(
                "{person}",
                `${review.updated_by.name} ${" "}
                ${review.updated_by.last_name_1} ${" "}
                ${review.updated_by.last_name_2 ?? ""}`,
              )
              .replace("{date}", dayjs(review.updated_at).format("LL"))
              .replace("{time}", dayjs(review.updated_at).format("LT"))}
          </Typography>
        )}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography
              variant="overline"
              display="block"
              sx={{ color: "gray" }}
            >
              {t("labels:odometer")}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {formatter.format(review.odometer)} km
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="overline"
              display="block"
              sx={{ color: "gray" }}
            >
              {t("labels:review_type.label")}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {reviewType(review.review_type)}
            </Typography>
          </Grid>
        </Grid>
        {review.end_time && (
          <VehicleInspectionNewInspectionForm
            review={review}
            onStartVehicleReviewPress={onStartVehicleReviewPress}
          />
        )}
        {!review.end_time && (
          <VehicleInspectionReviewInProcess
            review={review}
            onVehicleReviewFinalizePress={onVehicleReviewFinalizePress}
          />
        )}
      </Box>
    </Grid>
    // </Grid>
  );
}
