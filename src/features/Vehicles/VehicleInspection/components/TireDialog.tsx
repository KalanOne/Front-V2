import { Box, Button, Grid, Typography } from "@mui/material";

import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { CustomButton } from "src/components/common/CustomButton";
import { LabelAndText } from "src/components/common/LabelAndText";
import { Portal } from "src/components/common/Portal";
import { getMinDepth } from "src/features/Tire/Tire/utils/tire";
import { useProgressQuery } from "src/hooks/progress";
import { arrayJoin } from "src/utils/array";

import { dialogTireInfo } from "../api/vehicleInspectionApi";

export { TireDialog };

interface TireDialogProps {
  onPhysicalDifference: (vehicleItem: any) => void;
  tire?: any;
  review?: any;
  onSend?: (id: string, action: string) => void;
  onUpdateTireReviewPress: (tire: string) => void;
  onRevitalizedPress: (tire: string) => void;
  onWearPress: (tire: string) => void;
  onPathDamagePress: (tire: string) => void;
}

function TireDialog({
  onPhysicalDifference,
  tire,
  review,
  onSend,
  onUpdateTireReviewPress,
  onRevitalizedPress,
  onWearPress,
  onPathDamagePress,
}: TireDialogProps): JSX.Element {
  const { t } = useTranslation();
  const { id } = useParams();

  const tireQuery = useQuery({
    queryKey: ["tireInfo"],
    queryFn: async () => {
      return await dialogTireInfo(
        `${id}`,
        tire.vehicle_tire[0]?.vehicle_tire_id,
      );
    },
  });
  const vehicleTire = tireQuery.data ?? undefined;
  useProgressQuery(tireQuery, "tireInfo");

  // console.log("vehicleTire", vehicleTire);

  const isUpdateReview =
    vehicleTire !== undefined
      ? review.vehicle_review_id ==
        vehicleTire.cycle.movement_tire.tire_review[
          vehicleTire.cycle.movement_tire.tire_review.length - 1
        ].vehicle_review_id
      : false;

  return (
    <>
      {vehicleTire && (
        <>
          <Grid container spacing={1}>
            {/* TireDialogInfo */}

            {vehicleTire.code && (
              <Grid item xs={vehicleTire.device_code ? 6 : 12}>
                <LabelAndText
                  label={t("labels:burn_code")}
                  text={vehicleTire.code}
                />
              </Grid>
            )}

            {vehicleTire.device_code && (
              <Grid item xs={vehicleTire.code ? 6 : 12}>
                <LabelAndText
                  label={t("labels:device_code")}
                  text={vehicleTire.device_code || "-"}
                />
              </Grid>
            )}

            <Grid item xs={4}>
              <LabelAndText
                label={t("general:brand")}
                text={
                  vehicleTire.cycle?.variation.tire_model.brand.name || "- -"
                }
              />
            </Grid>
            <Grid item xs={4}>
              <LabelAndText
                label={t("labels:model")}
                text={vehicleTire.cycle?.variation.tire_model.name || "- -"}
              />
            </Grid>
            <Grid item xs={4}>
              <LabelAndText
                label={t("general:size")}
                text={vehicleTire.cycle?.variation.tire_size.size || "- -"}
              />
            </Grid>

            {vehicleTire.cycle.revitalized && (
              <>
                <Grid item xs={6}>
                  <LabelAndText
                    label={t("labels:revitalized_brand_field.label")}
                    text={vehicleTire.cycle.revitalized.brand.name}
                  />
                </Grid>
                <Grid item xs={6}>
                  <LabelAndText
                    label={t("labels:revitalized_model_field.label")}
                    text={vehicleTire.cycle.revitalized.name || "- -"}
                  />
                </Grid>
              </>
            )}

            <Grid item xs={6}>
              <LabelAndText
                label={t("labels:tire_model.use")}
                text={arrayJoin(
                  vehicleTire.cycle.variation.tire_model_variation_use.map(
                    (use: any) =>
                      t(
                        `labels:tire_use.options.${use.tire_use_id.toLowerCase()}`,
                      ),
                  ),
                  ", ",
                  ` ${t("general:text.and")} `,
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <LabelAndText
                label={t("labels:tire_model.application")}
                text={
                  vehicleTire.cycle.revitalized
                    ? t(
                        `labels:tire_application.options.${vehicleTire.cycle.revitalized.tire_application_id.toLowerCase()}`,
                      )
                    : t(
                        `labels:tire_application.options.${vehicleTire.cycle.variation.tire_application_id.toLowerCase()}`,
                      )
                }
              />
            </Grid>

            <Grid item xs={6}>
              <LabelAndText
                label={t("labels:pressure")}
                text={`${
                  vehicleTire.cycle.movement_tire.tire_review.length > 0
                    ? vehicleTire.cycle.movement_tire.tire_review[
                        vehicleTire.cycle.movement_tire.tire_review.length - 1
                      ].pressure
                    : "-"
                } psi`}
              />
            </Grid>
            <Grid item xs={6}>
              <LabelAndText
                label={t("labels:depth")}
                text={
                  vehicleTire.cycle.movement_tire.tire_review.length > 0 &&
                  vehicleTire.cycle.movement_tire.tire_review[0]
                    .tire_review_depth_line
                    ? `${getMinDepth(
                        vehicleTire.cycle.movement_tire.tire_review[
                          vehicleTire.cycle.movement_tire.tire_review.length - 1
                        ].tire_review_depth_line,
                      )} mm`
                    : ""
                }
              />
            </Grid>

            <Grid item xs={12}>
              <Typography
                variant="overline"
                display="block"
                color="textSecondary"
              >
                {t("labels:axle_information")}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <LabelAndText
                label={t("labels:axle_position")}
                text={vehicleTire.cycle?.movement_tire.vehicle_tire[0].vehicle_type_axle_tire.vehicle_type_axle.axle_number.toString()}
              />
            </Grid>
            <Grid item xs={6}>
              <LabelAndText
                label={t("labels:axle_position")}
                text={vehicleTire.cycle?.movement_tire.vehicle_tire[0].vehicle_type_axle_tire.position.toString()}
              />
            </Grid>

            <Grid item xs={12}>
              <LabelAndText
                label={t("labels:axle_applications")}
                text={arrayJoin(
                  vehicleTire.cycle.movement_tire.vehicle_tire[0].vehicle_type_axle_tire.vehicle_type_axle.tire_application.map(
                    (application: any) =>
                      t(
                        `labels:tire_application.options.${application.tire_application_id.toLowerCase()}`,
                      ),
                  ),
                  ", ",
                  ` ${t("general:text.and")} `,
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography
                display="block"
                variant="overline"
                color="textSecondary"
              >
                {t("labels:tire_actions")}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  gap: "1rem",
                  // mt: 3,
                }}
              >
                {onSend ? (
                  <>
                    {dayjs().diff(dayjs(review.created_at), "hour") < 24 && (
                      <>
                        <CustomButton
                          onClick={() =>
                            onSend(
                              vehicleTire.cycle.movement_tire.movement_tire_id,
                              "REPAIR",
                            )
                          }
                          text={t("buttons:actions.repair")}
                        />
                        <CustomButton
                          onClick={() =>
                            onSend(
                              vehicleTire.cycle.movement_tire.movement_tire_id,
                              "REVITALIZATION",
                            )
                          }
                          text={t("buttons:actions.revitalize")}
                        ></CustomButton>
                        <CustomButton
                          onClick={() =>
                            onSend(
                              vehicleTire.cycle.movement_tire.movement_tire_id,
                              "WAREHOUSE",
                            )
                          }
                          text={t("general:store")}
                        ></CustomButton>
                        <CustomButton
                          onClick={() =>
                            onSend(
                              vehicleTire.cycle.movement_tire.movement_tire_id,
                              "PILE",
                            )
                          }
                          text={t("buttons:actions.discard")}
                        ></CustomButton>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <CustomButton
                      onClick={() => {
                        onUpdateTireReviewPress(vehicleTire);
                      }}
                      text={
                        isUpdateReview
                          ? t("buttons:update_tire_review")
                          : t("buttons:review")
                      }
                    />
                    <CustomButton
                      onClick={() => {
                        onRevitalizedPress(vehicleTire);
                      }}
                      text={t("buttons:damages")}
                    />
                    <CustomButton
                      onClick={() => {
                        onWearPress(vehicleTire);
                      }}
                      text={t("buttons:wear")}
                    />
                    <CustomButton
                      onClick={() => {
                        onPathDamagePress(vehicleTire);
                      }}
                      text={t("buttons:road_damage")}
                    />
                  </>
                )}
              </Box>
            </Grid>
            {!onSend && (
              <Portal elementId={"DialogActionsContainer"}>
                <Button onClick={() => onPhysicalDifference(vehicleTire)}>
                  {t("buttons:actions.tire_mismatch")}
                </Button>
              </Portal>
            )}
          </Grid>
        </>
      )}
    </>
  );
}
