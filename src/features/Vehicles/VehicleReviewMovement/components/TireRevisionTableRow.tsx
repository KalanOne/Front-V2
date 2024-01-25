import { useState } from "react";

import { TableRow } from "@mui/material";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { CustomButton } from "src/components/common/CustomButton";
import { TableBodyCell } from "src/components/common/CustomTable";
import { formatter } from "src/utils/formatters";
import { getMinDepth } from "src/utils/tire";

import { TireReview } from "../types/vehicleReviewMovementTypes";

export { TireRevisionTableRow };

interface TireRevisionTableRowProps {
  tireReview: TireReview;
  index: number;
  onViewAlertClick: (alerts: TireReview) => void;
}

function TireRevisionTableRow({
  tireReview,
  index,
  onViewAlertClick,
}: TireRevisionTableRowProps): React.ReactElement {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // ededed

  return (
    <TableRow>
      <TableBodyCell
        sx={[index % 2 == 0 ? { backgroundColor: "#ededed" } : null]}
      >
        <Link
          to={`/tire/${tireReview.movement_tire.tire_cycle.tire_id}/history`}
          style={{
            color: "#0288D1",
            textDecoration: isHovered ? "underline" : "none",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          target="_blank"
        >
          {tireReview.movement_tire.tire_cycle.tire.code}
        </Link>
        {(tireReview.alert_tire.length > 0 ||
          tireReview.alert_vehicle_tire.length > 0) && (
          <CustomButton
            text={t("general:alerts")}
            sx={{
              backgroundColor: "#ffc107",
              "&:hover": {
                backgroundColor: "#e0a800",
              },
            }}
            onClick={() => onViewAlertClick(tireReview)}
          />
        )}
      </TableBodyCell>
      <TableBodyCell
        sx={[index % 2 == 0 ? { backgroundColor: "#ededed" } : null]}
      >
        {tireReview.movement_tire.tire_cycle.tire.device_code ?? "-"}
      </TableBodyCell>
      <TableBodyCell
        sx={[index % 2 == 0 ? { backgroundColor: "#ededed" } : null]}
      >
        {/* {tireReview.movement_tire.vehicle_tire.length > 0
          ? tireReview.movement_tire.vehicle_tire[0].vehicle_type_axle_tire
              ?.position
          : "-"} */}
        {tireReview.real_position ?? "-"}
      </TableBodyCell>
      <TableBodyCell
        sx={[index % 2 == 0 ? { backgroundColor: "#ededed" } : null]}
      >
        {tireReview.comment}
      </TableBodyCell>
      <TableBodyCell
        sx={[index % 2 == 0 ? { backgroundColor: "#ededed" } : null]}
      >
        {tireReview.movement_tire.brand_name ?? "-"}
      </TableBodyCell>
      <TableBodyCell
        sx={[index % 2 == 0 ? { backgroundColor: "#ededed" } : null]}
      >
        {tireReview.movement_tire.tire_model ?? "-"}
      </TableBodyCell>
      <TableBodyCell
        sx={[index % 2 == 0 ? { backgroundColor: "#ededed" } : null]}
      >
        {tireReview.movement_tire.tire_size ?? "-"}
      </TableBodyCell>
      <TableBodyCell
        sx={[index % 2 == 0 ? { backgroundColor: "#ededed" } : null]}
      >
        {tireReview.days_in_service ?? "-"}
      </TableBodyCell>
      <TableBodyCell
        sx={[index % 2 == 0 ? { backgroundColor: "#ededed" } : null]}
      >
        {`${formatter.format(tireReview.accumulated_mileage)}`}
      </TableBodyCell>
      <TableBodyCell
        sx={[
          tireReview.pressure_condition.includes("LOW") ||
          tireReview.pressure_condition.includes("HIGH")
            ? { backgroundColor: "#650000", color: "white", fontWeight: "600" }
            : tireReview.pressure_condition.includes("NORMAL")
            ? {
                backgroundColor: "#005b00",
                color: "white",
                fontWeight: "600",
              }
            : index % 2 == 0
            ? { backgroundColor: "#ededed" }
            : null,
        ]}
      >
        {tireReview.pressure ?? "-"}
      </TableBodyCell>
      <TableBodyCell
        sx={[
          tireReview.tire_review_depth_line.depth_condition ==
          "CRITICAL WITHDRAWAL"
            ? { backgroundColor: "#650000", color: "white", fontWeight: "600" }
            : tireReview.tire_review_depth_line.depth_condition ==
              "SCHEDULED WITHDRAWAL"
            ? { backgroundColor: "#736500", color: "white", fontWeight: "600" }
            : tireReview.tire_review_depth_line.depth_condition ==
              "GOOD CONDITION"
            ? { backgroundColor: "#005b00", color: "white", fontWeight: "600" }
            : index % 2 == 0
            ? { backgroundColor: "#ededed" }
            : null,
        ]}
      >
        {`${formatter.format(getMinDepth(tireReview.tire_review_depth_line))}`}
      </TableBodyCell>
      <TableBodyCell
        sx={[index % 2 == 0 ? { backgroundColor: "#ededed" } : null]}
      >
        {`${formatter.format(tireReview.tire_review_depth_line.wear)}`}
      </TableBodyCell>
      <TableBodyCell
        sx={[index % 2 == 0 ? { backgroundColor: "#ededed" } : null]}
      >
        {`${formatter.format(tireReview.tire_review_depth_line.km_mm)}`}
      </TableBodyCell>
      <TableBodyCell
        sx={[index % 2 == 0 ? { backgroundColor: "#ededed" } : null]}
      >
        {`${formatter.format(tireReview.tire_review_depth_line.cpk)}`}
      </TableBodyCell>
      <TableBodyCell
        sx={[index % 2 == 0 ? { backgroundColor: "#ededed" } : null]}
      >
        {`${formatter.format(tireReview.tire_review_depth_line.projection)}`}
        {/* TODO: Revisar los formatters */}
      </TableBodyCell>
    </TableRow>
  );
}
