import { Box } from "@mui/material";

import TruckTractor from "src/assets/images/vehicle/type/truck_tractor.png";

import { Axle } from "./Axle";
import { RefectionAxle } from "./RefectionAxle";

export { TruckTractorPreview };

interface TruckTractorPreviewProps {
  axles: any;
  size?: "sm" | "md" | "lg";
  onClickTire?: (tire: any) => void;
  onRotateTire?: (origin: any, tire: any) => void;
  //   message?: string;
}

function TruckTractorPreview({
  axles,
  size = "sm",
  onClickTire,
  onRotateTire,
}: TruckTractorPreviewProps) {
  const origin = false;
  return (
    <Box
      //   className={classnames(css.mb64, css.container, {
      //     [css.sm]: size === "sm",
      //   })}
      sx={{ mb: "32px", position: "relative" }}
    >
      <Box component={"img"} src={TruckTractor} sx={{ width: "180px" }} />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
          position: "absolute",
          top: "28px",
        }}
      >
        {axles
          .filter((i) => i.position.toUpperCase() === "FRONTAL")
          .map((i, index) => (
            <Axle
              key={index}
              color={i.color}
              tireQuantity={i.tire_quantity}
              axleTires={i.vehicle_type_axle_tire}
              sx={{ width: "180px" }}
              origin={origin}
              onClickTire={onClickTire}
              onRotateTire={onRotateTire}
            />
          ))}
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
          position: "absolute",
          top: "160px",
        }}
      >
        {axles
          .filter((i) => i.position.toUpperCase() === "CENTRAL")
          .map((i, index) => (
            <Axle
              key={index}
              color={i.color}
              tireQuantity={i.tire_quantity}
              axleTires={i.vehicle_type_axle_tire}
              sx={{ width: "180px" }}
              origin={origin}
              onClickTire={onClickTire}
              onRotateTire={onRotateTire}
            />
          ))}
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
          position: "absolute",
          top: "330px",
        }}
      >
        {axles
          .filter((i) => i.position.toUpperCase() === "REAR")
          .map((i, index) => (
            <Axle
              key={index}
              color={i.color}
              tireQuantity={i.tire_quantity}
              axleTires={i.vehicle_type_axle_tire}
              sx={{ width: "180px" }}
              origin={origin}
              onClickTire={onClickTire}
              onRotateTire={onRotateTire}
            />
          ))}
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
          position: "absolute",
          top: "560px",
        }}
      >
        {axles
          .filter((i) => i.position.toUpperCase() === "REFECTION")
          .map((i, index) => (
            <RefectionAxle
              key={index}
              color={i.color}
              tireQuantity={i.tire_quantity}
              sx={{ width: "180px" }}
              axleTires={i.vehicle_type_axle_tire}
              origin={origin}
              onClickTire={onClickTire}
              onRotateTire={onRotateTire}
            />
          ))}
      </Box>
    </Box>
  );
}
