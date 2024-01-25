import React from "react";

import { Box, Tooltip } from "@mui/material";

import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

import { getMinDepth } from "src/utils/tire";

export { InfoTireTooltip };

interface InfoTireTooltipProps {
  hidden: boolean;
  tire: any;
  placement: "left" | "right";
  children: React.ReactElement;
}

// const useStyles = makeStyles((theme) => ({
//   tooltip: {
//     backgroundColor: "rgba(250,255,250, 0.8)",
//     color: "#333333",
//     fontWeight: "normal",
//     fontSize: "14px",
//     width: 240,
//     borderWidth: "2px",
//     borderStyle: "solid",
//     borderColor: theme.palette.primary.main,
//   },
//   arrow: {
//     color: "rgba(250,255,250, 0.8)",
//   },
// }));

// const useHideStyles = makeStyles(() => ({
//   tooltip: {
//     visibility: "hidden",
//   },
//   arrow: {
//     visibility: "hidden",
//   },
// }));

function InfoTireTooltip({
  hidden,
  tire,
  placement,
  children,
}: InfoTireTooltipProps) {
  const { t } = useTranslation();
  return (
    <Tooltip
      disableHoverListener={!!hidden}
      //   classes={classes}
      sx={{
        fontWeight: "normal",
        fontSize: "14px",
        width: 240,
        borderStyle: "none",
        visibility: hidden ? "hidden" : "visible",
        "& .MuiTooltip-tooltip": {
          backgroundColor: "yellow",
          color: "rgba(0, 0, 0, 0.87)",
        },
      }}
      componentsProps={{
        tooltip: {
          sx: {
            backgroundColor: "rgba(255,255,255, 0.9)",
            color: "rgba(0, 0, 0, 0.87)",
            border: "1.5px solid blue",
            "& span": {
              marginBottom: "4px",
              fontSize: "14px",
              "&:last-child": {
                marginBottom: "0",
              },
            },
          },
        },
      }}
      title={
        <Box
          //   className={classnames(css.info_tire)}
          sx={{
            borderStyle: "none",
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 2,
            // backgroundColor: "yellow",
            // backgroundColor: "rgba(250,255,255, 0.7)",
            // "& span": {
            //   marginBottom: "4px",
            //   "&:last-child": {
            //     marginBottom: "0",
            //   },
            // },
          }}
        >
          {tire.vehicle_tire_id ? (
            <>
              {tire.movement_tire.tire_cycle.tire.code && (
                <span>
                  <b>{t("labels:code")}:</b>{" "}
                  {tire.movement_tire.tire_cycle.tire.code}
                </span>
              )}
              <span>
                <b>{t("labels:dot")}:</b>{" "}
                {tire.movement_tire.tire_cycle.tire.dot || "-"}
              </span>
              {tire.movement_tire.tire_cycle.tire.device_code && (
                <span>
                  <b>{t("labels:device_code")}:</b>{" "}
                  {tire.movement_tire.tire_cycle.tire.device_code}
                </span>
              )}
              <span>
                <b>{t("labels:brand")}:</b>{" "}
                {tire.movement_tire.tire_cycle.variation.tire_model.brand.name}
              </span>
              <span>
                <b>{t("labels:tire_model_field.label")}:</b>{" "}
                {tire.movement_tire.tire_cycle.variation.tire_model.name}
              </span>
              {tire.movement_tire.tire_cycle.revitalized && (
                <>
                  <span>
                    <b>{t("labels:revitalized_brand_field.label")}:</b>{" "}
                    {tire.movement_tire.tire_cycle.revitalized.brand.name}
                  </span>
                  <span>
                    <b>{t("labels:revitalized_tire_model_field.label")}:</b>{" "}
                    {tire.movement_tire.tire_cycle.revitalized.name}
                  </span>
                </>
              )}
              <span>
                <b>{t("labels:size")}:</b>{" "}
                {tire.movement_tire.tire_cycle.variation.tire_size.size}
              </span>
              <span>
                <b>{t("labels:layer")}:</b>{" "}
                {tire.movement_tire.tire_cycle.variation.number_layers}
              </span>
              <span>
                <b>{t("labels:condition")}:</b>{" "}
                {t(
                  `labels:tire_condition.options.${tire.movement_tire.tire_cycle.tire_condition_id.toLowerCase()}`,
                )}
              </span>
              <span>
                <b>{t("labels:number_patches")}:</b>{" "}
                {tire.movement_tire.tire_cycle.number_patch}
              </span>

              {tire.movement_tire.tire_review.length > 0 && (
                <>
                  <br />
                  <span>
                    <b>{t("labels:last_review_data")}</b>
                  </span>
                  <span>
                    <b>{t("labels:review_date")}:</b>
                    {` ${dayjs(
                      tire.movement_tire.tire_review[
                        tire.movement_tire.tire_review.length - 1
                      ].date,
                    ).format("L")}`}
                  </span>
                  <span>
                    <b>{t("labels:mileage")}:</b>
                    {` ${tire.movement_tire.tire_cycle.tire_travel} km`}
                  </span>
                  {tire.movement_tire.tire_review[
                    tire.movement_tire.tire_review.length - 1
                  ].tire_review_depth_line && (
                    <span>
                      <b>{t("labels:depth")}:</b>
                      {` ${getMinDepth(
                        tire.movement_tire.tire_review[
                          tire.movement_tire.tire_review.length - 1
                        ].tire_review_depth_line,
                      )} mm`}
                    </span>
                  )}

                  <span>
                    <b>{t("labels:pressure")}:</b>
                    {` ${
                      tire.movement_tire.tire_review[
                        tire.movement_tire.tire_review.length - 1
                      ].pressure
                    } psi`}
                  </span>
                </>
              )}
            </>
          ) : (
            <>
              {tire.code && (
                <span>
                  <b>{t("labels:code")}:</b> {tire.code}
                </span>
              )}

              <span>
                <b>{t("labels:dot")}:</b> {tire.dot || "-"}
              </span>

              {tire.device_code && (
                <span>
                  <b>{t("labels:device_code")}:</b> {tire.device_code}
                </span>
              )}
              <span>
                <b>{t("labels:brand")}:</b>{" "}
                {tire.cycle.variation.tire_model.brand.name}
              </span>
              <span>
                <b>{t("labels:tire_model_field.label")}:</b>{" "}
                {tire.cycle.variation.tire_model.name}
              </span>
              {tire.cycle.revitalized && (
                <>
                  <span>
                    <b>{t("labels:revitalized_brand_field.label")}:</b>{" "}
                    {tire.cycle.revitalized.brand.name}
                  </span>
                  <span>
                    <b>{t("labels:revitalized_tire_model_field.label")}:</b>{" "}
                    {tire.cycle.revitalized.name}
                  </span>
                </>
              )}
              <span>
                <b>{t("labels:size")}:</b> {tire.cycle.variation.tire_size.size}
              </span>
              <span>
                <b>{t("labels:layer")}:</b> {tire.cycle.variation.number_layers}
              </span>
              <span>
                <b>{t("labels:condition")}:</b>{" "}
                {t(
                  `labels:tire_condition.options.${tire.cycle.tire_condition_id.toLowerCase()}`,
                )}
              </span>

              {tire.cycle.movement_tire.warehouse_tire.length > 0 && (
                <span>
                  <b>{t("labels:warehouse.singular")}:</b>{" "}
                  {tire.cycle.movement_tire.warehouse_tire[0].warehouse.name}
                </span>
              )}
              <span>
                <b>{t("labels:number_patches")}:</b> {tire.cycle.number_patch}
              </span>

              {tire.cycle.movement_tire.tire_review.length > 0 && (
                <>
                  <br />
                  <span>
                    <b>{t("labels:last_review_data")}</b>
                  </span>
                  <span>
                    <b>{t("labels:review_date")}:</b>
                    {` ${dayjs(
                      tire.cycle.movement_tire.tire_review[
                        tire.cycle.movement_tire.tire_review.length - 1
                      ].date,
                    ).format("L")}`}
                  </span>
                  <span>
                    <b>{t("labels:mileage")}:</b>
                    {` ${tire.cycle.tire_travel} km`}
                  </span>
                  {tire.cycle.movement_tire.tire_review[
                    tire.cycle.movement_tire.tire_review.length - 1
                  ].tire_review_depth_line && (
                    <span>
                      <b>{t("labels:depth")}:</b>
                      {` ${getMinDepth(
                        tire.cycle.movement_tire.tire_review[
                          tire.cycle.movement_tire.tire_review.length - 1
                        ].tire_review_depth_line,
                      )} mm`}
                    </span>
                  )}
                  {tire.cycle.movement_tire.movement !== "WAREHOUSE" && (
                    <span>
                      <b>{t("labels:pressure")}:</b>
                      {` ${
                        tire.cycle.movement_tire.tire_review[
                          tire.cycle.movement_tire.tire_review.length - 1
                        ].pressure
                      } psi`}
                    </span>
                  )}
                </>
              )}
            </>
          )}
        </Box>
      }
      placement={placement || "right"}
    >
      {children}
    </Tooltip>
  );
}
