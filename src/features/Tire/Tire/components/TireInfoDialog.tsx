import React from "react";

import { Box, Grid } from "@mui/material";

import * as dayjs from "dayjs";
import "dayjs/locale/es-mx.js";
import { useTranslation } from "react-i18next";

import { CustomButton } from "src/components/common/CustomButton";
import { LabelAndText } from "src/components/common/LabelAndText";
import { getMinDepth } from "src/utils/tire";

import { TireResponse } from "../types/tireTypes";
import { getHelmetValue } from "../utils/tire";

export { TireInfoDialog, renderLocation };

interface TireInfoDialogProps {
  tire?: TireResponse;
  onRevitalized: () => void;
  onRepair: () => void;
  onDiscard: () => void;
  onDamage: () => void;
  onSendToWareHouse: () => void;
  onSendToWareHouseRepair: () => void;
  onUpdateTireReview: () => void;
  onCancelMovement: () => void;
}

function TireInfoDialog({
  tire,
  onRevitalized,
  onRepair,
  onDiscard,
  onDamage,
  onSendToWareHouse,
  onSendToWareHouseRepair,
  onUpdateTireReview,
  onCancelMovement,
}: TireInfoDialogProps): React.ReactElement {
  const { t } = useTranslation();
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
  return (
    <>
      {tire && (
        <>
          <Grid container spacing={1}>
            {/* TireDialogInfo */}
            <Grid item xs={4}>
              <LabelAndText
                label={t("labels:code")}
                text={tire.code || "-"}
              ></LabelAndText>
            </Grid>
            <Grid item xs={4}>
              <LabelAndText
                label={t("labels:rfid")}
                text={tire.device_code || "-"}
              ></LabelAndText>
            </Grid>
            <Grid item xs={4}>
              <LabelAndText
                label={t("common:subsidiary")}
                text={tire.subsidiary.name}
              ></LabelAndText>
            </Grid>

            <Grid item xs={6}>
              <LabelAndText
                label={t("labels:spare")}
                text={
                  tire.cycle.is_refection ? t("labels:yes") : t("labels:no")
                }
              ></LabelAndText>
            </Grid>
            <Grid item xs={6}>
              <LabelAndText
                label={t("labels:cap_and_casing")}
                text={tire.cap_and_casing ? t("labels:yes") : t("labels:no")}
              ></LabelAndText>
            </Grid>

            <Grid item xs={6}>
              <LabelAndText
                label={t("labels:price")}
                text={
                  tire.cycle.tire_condition_id.includes("RETREAD")
                    ? tire.cycle.price_revitalized.toString()
                    : tire.cycle.price.toString()
                }
              ></LabelAndText>
            </Grid>
            <Grid item xs={6}>
              <LabelAndText
                label={t("common:provider")}
                text={tire.cycle.provider.name}
              ></LabelAndText>
            </Grid>

            <Grid item xs={4}>
              <LabelAndText
                label={t("common:brand")}
                text={tire.cycle.variation.tire_model.brand.name}
              ></LabelAndText>
            </Grid>
            <Grid item xs={4}>
              <LabelAndText
                label={t("common:model")}
                text={tire.cycle.variation.tire_model.name}
              ></LabelAndText>
            </Grid>
            <Grid item xs={4}>
              <LabelAndText
                label={t("labels:tire_model_variation_field.label")}
                text={`${tire.cycle.variation.tire_size.size} - ${tire.cycle.variation.number_layers}`}
              ></LabelAndText>
            </Grid>

            {tire.cycle.revitalized && (
              <>
                <Grid item xs={6}>
                  <LabelAndText
                    label={t("labels:revitalized_brand_field.label")}
                    text={tire.cycle.revitalized?.brand.name}
                  ></LabelAndText>
                </Grid>
                <Grid item xs={6}>
                  <LabelAndText
                    label={t("labels:revitalized_tire_model_field.label")}
                    text={tire.cycle.revitalized?.name || "-"}
                  ></LabelAndText>
                </Grid>
              </>
            )}

            <Grid item xs={6}>
              <LabelAndText
                label={t("labels:invoice_date")}
                text={
                  tire.cycle.invoice_date
                    ? dayjs(tire.cycle.invoice_date).format("LL")
                    : "-"
                }
              ></LabelAndText>
            </Grid>
            <Grid item xs={6}>
              <LabelAndText
                label={t("labels:invoice_folio")}
                text={tire.cycle.invoice_folio || "-"}
              ></LabelAndText>
            </Grid>

            <Grid item xs={4}>
              <LabelAndText
                label={t("labels:mileage")}
                text={tire.cycle.tire_travel.toString()}
              ></LabelAndText>
            </Grid>
            <Grid item xs={4}>
              <LabelAndText
                label={t("labels:review_date")}
                text={`${
                  tire.cycle.movement_tire.tire_review.length > 0
                    ? dayjs(
                        tire.cycle.movement_tire.tire_review[0].date,
                      ).format("LL")
                    : "-"
                }`}
              ></LabelAndText>
            </Grid>
            <Grid item xs={4}>
              <LabelAndText
                label={t("labels:number_cycle")}
                text={tire.cycle.number_cycle.toString()}
              ></LabelAndText>
            </Grid>

            <Grid item xs={3}>
              <LabelAndText
                label={t("labels:helmet_value")}
                text={getHelmetValue(tire)}
              ></LabelAndText>
            </Grid>
            <Grid item xs={3}>
              <LabelAndText
                label={t("labels:depth")}
                text={
                  tire.cycle.movement_tire.tire_review.length > 0 &&
                  tire.cycle.movement_tire.tire_review[0].tire_review_depth_line
                    ? `${getMinDepth(
                        tire.cycle.movement_tire.tire_review[
                          tire.cycle.movement_tire.tire_review.length - 1
                        ].tire_review_depth_line,
                      )} mm`
                    : ""
                }
              ></LabelAndText>
            </Grid>
            <Grid item xs={3}>
              <LabelAndText
                label={t("labels:dot")}
                text={tire.dot}
              ></LabelAndText>
            </Grid>
            <Grid item xs={3}>
              <LabelAndText
                label={t("labels:pressure")}
                text={`${
                  tire.cycle.movement_tire.tire_review.length > 0
                    ? tire.cycle.movement_tire.tire_review[
                        tire.cycle.movement_tire.tire_review.length - 1
                      ].pressure
                    : "-"
                } psi`}
              ></LabelAndText>
            </Grid>

            <Grid item xs={4}>
              <LabelAndText
                label={t("labels:location.label")}
                text={t(
                  `labels:location.options.${tire.cycle.movement_tire.movement.toLowerCase()}`,
                )}
              ></LabelAndText>
            </Grid>
            {["WAREHOUSE", "MOUNT"].includes(
              tire.cycle.movement_tire.movement,
            ) && renderLocation(t, tire, tire.cycle.movement_tire.movement)}

            <Grid item xs={12}>
              <LabelAndText
                label={t("labels:created_by")}
                text={
                  (tire.created_by.name ? tire.created_by.name : "-") +
                  " " +
                  (tire.created_by.last_name_1
                    ? tire.created_by.last_name_1
                    : "-") +
                  " " +
                  (tire.created_by.last_name_2
                    ? tire.created_by.last_name_2
                    : "-") +
                  " " +
                  formatFecha(tire.created_at)
                }
              ></LabelAndText>
            </Grid>

            {tire.updated_by && (
              <Grid item xs={12}>
                <LabelAndText
                  label={t("labels:updated_by")}
                  text={
                    (tire.updated_by.name ? tire.updated_by.name : "-") +
                    " " +
                    (tire.updated_by.last_name_1
                      ? tire.updated_by.last_name_1
                      : "-") +
                    " " +
                    (tire.updated_by.last_name_2
                      ? tire.updated_by.last_name_2
                      : "-") +
                    " " +
                    formatFecha(tire.updated_at)
                  }
                ></LabelAndText>
              </Grid>
            )}

            {/* TireDialogButton */}
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
                mt: 3,
              }}
            >
              {tire.cycle.movement_tire.movement === "WAREHOUSE" && (
                <>
                  <CustomButton
                    onClick={() => onRevitalized()}
                    text={t("buttons:actions.revitalize")}
                  />
                  <CustomButton
                    onClick={() => onRepair()}
                    text={t("buttons:actions.repair")}
                  />
                  <CustomButton
                    onClick={() => onDiscard()}
                    text={t("buttons:actions.discard")}
                  />
                  <CustomButton
                    onClick={() => onDamage()}
                    text={t("buttons:damages")}
                  />
                </>
              )}
              {tire.cycle.movement_tire.movement === "REVITALIZATION" && (
                <>
                  <CustomButton
                    onClick={() => onSendToWareHouse()}
                    text={t("buttons:send_to_warehouse")}
                  />
                  <CustomButton
                    onClick={() => onDiscard()}
                    text={t("buttons:send_to_pile")}
                  />
                </>
              )}
              {tire.cycle.movement_tire.movement === "REPAIR" && (
                <>
                  <CustomButton
                    onClick={() => onSendToWareHouseRepair()}
                    text={t("buttons:send_to_warehouse")}
                  />
                  <CustomButton
                    onClick={() => onDiscard()}
                    text={t("buttons:send_to_pile")}
                  />
                </>
              )}
              {tire.cycle.movement_tire.movement === "MOUNT" && (
                <>
                  <CustomButton
                    onClick={() => onUpdateTireReview()}
                    text={t("buttons:update_tire_review")}
                  />
                </>
              )}
              {["PILE", "REVITALIZATION", "REPAIR"].includes(
                tire.cycle.movement_tire.movement,
              ) && (
                <>
                  <CustomButton
                    onClick={() => onCancelMovement()}
                    text={t("buttons:cancel_movement")}
                  />
                </>
              )}
            </Box>
          </Grid>
        </>
      )}
    </>
  );
}

function renderLocation(t: any, tire: any, location: any) {
  switch (location) {
    case "WAREHOUSE":
      return (
        <Grid item xs={8}>
          <LabelAndText
            label={t("common:warehouse")}
            text={
              tire.cycle.movement_tire.warehouse_tire.length > 0
                ? tire.cycle.movement_tire.warehouse_tire[0].warehouse.name
                : t("labels:not_warehouse")
            }
          />
        </Grid>
      );

    case "MOUNT":
      return (
        <>
          <Grid item xs={4}>
            <LabelAndText
              label={t("common:vehicle")}
              text={
                tire.cycle.movement_tire.vehicle_tire.length > 0
                  ? tire.cycle.movement_tire.vehicle_tire[0].vehicle
                      .economic_number
                  : t("labels:not_vehicle")
              }
            />
          </Grid>
          <Grid item xs={4}>
            <LabelAndText
              label={t("labels:vehicle_type_axle_position.label")}
              text={
                tire.cycle.movement_tire.vehicle_tire.length > 0
                  ? tire.cycle.movement_tire.vehicle_tire[0].vehicle_type_axle_tire.position.toString()
                  : t("labels:not_vehicle")
              }
            />
          </Grid>
        </>
      );

    default:
      return;
  }
}
