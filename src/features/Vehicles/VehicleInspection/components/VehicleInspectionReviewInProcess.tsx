import { Typography } from "@mui/material";

import { useTranslation } from "react-i18next";

import { CustomButton } from "src/components/common/CustomButton";
import { useNotification } from "src/stores/general/notification";

export { VehicleInspectionReviewInProcess };

interface VehicleInspectionReviewInProcessProps {
  review: any;
  onVehicleReviewFinalizePress: () => void;
}

function VehicleInspectionReviewInProcess({
  review,
  onVehicleReviewFinalizePress,
}: VehicleInspectionReviewInProcessProps) {
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
    <>
      <Typography
        variant="subtitle1"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "red",
          "&:hover": { cursor: "pointer", color: "#d02a4f" },
        }}
      >
        {t("labels:inspection_in_process").toUpperCase()}
      </Typography>
      <Typography variant="overline" display="block" sx={{ color: "gray" }}>
        {t("labels:review_type.label")}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {reviewType(review.review_type)}
      </Typography>
      <CustomButton
        onClick={() => {
          addNotification({
            message: t("messages:finalize"),
            code: "",
            action: {
              label: t("buttons:confirm"),
              onClick: async () => {
                // console.log("finalize");
                onVehicleReviewFinalizePress();
              },
            },
          });
        }}
        text={t("buttons:finalize")}
      />
    </>
  );
}
