import { useEffect, useState } from "react";

import { Box, Typography } from "@mui/material";

import { useTranslation } from "react-i18next";

import tire180 from "src/assets/images/vehicle/tire180.svg";

import { TruckTractorPreview } from "./TruckTractorPreview";

export { ChassisPreview };

interface ChassisPreviewProps {
  structureType: string;
  axles: any;
  //   size?: "sm" | "md" | "lg";
  onClickTire?: (tire: any) => void;
  onRotateTire?: (origin: any, tire: any) => void;
  //   message?: string;
}

function ChassisPreview({
  structureType,
  axles,
  onClickTire,
  onRotateTire,
}: ChassisPreviewProps) {
  const { t } = useTranslation();
  const [compSize, setCompSize] = useState("sm");
  const [structureComponent, setStructureComponent] =
    useState<React.ReactElement | null>(null);

  //   useEffect(() => {
  //     if (!size) {
  //       setCompSize("sm");
  //       return;
  //     }

  //     setCompSize(size);
  //   }, [size]);

  useEffect(() => {
    if (!structureType) return;
    switch (structureType) {
      //   case "TRUCK_TRACTOR":
      //     setStructureComponent(
      //       <TruckTractorPreview
      //         axles={axles ? axles : []}
      //         size={compSize}
      //         onClickTire={onClickTire}
      //         onRotateTire={onRotateTire}
      //       />,
      //     );
      //     break;
      //   case "TRUCK":
      //     setStructureComponent(
      //       <TruckPreview
      //         axles={axles ? axles : []}
      //         size={compSize}
      //         onClickTire={onClickTire}
      //         onRotateTire={onRotateTire}
      //       />,
      //     );
      //     break;
      //   case "BOX":
      //     setStructureComponent(
      //       <BoxPreview
      //         axles={axles ? axles : []}
      //         size={compSize}
      //         onClickTire={onClickTire}
      //         onRotateTire={onRotateTire}
      //       />,
      //     );
      //     break;
      //   case "DOLLY":
      //     setStructureComponent(
      //       <DollyPreview
      //         axles={axles ? axles : []}
      //         size={compSize}
      //         onClickTire={onClickTire}
      //         onRotateTire={onRotateTire}
      //       />,
      //     );
      //     break;
      //   case "VAN":
      //     setStructureComponent(
      //       <VanPreview
      //         axles={axles ? axles : []}
      //         size={compSize}
      //         onClickTire={onClickTire}
      //         onRotateTire={onRotateTire}
      //       />,
      //     );
      //     break;
      default:
        // setStructureComponent(null);
        // setStructure(null);
        setStructureComponent(
          <TruckTractorPreview
            axles={axles ? axles : []}
            size={"sm"}
            onClickTire={onClickTire}
            onRotateTire={onRotateTire}
          />,
        );
        break;
    }
  }, [structureType]);

  if (!structureType) {
    return (
      <Box sx={{ textAlign: "center", position: "relative" }}>
        <img src={tire180} />
        <Typography
          variant="h6"
          color="textSecondary"
          sx={{ marginTop: "16px", color: "#ababab" }}
        >
          {/* {message || t("no_structure")} */}
          {t("labels:no_structure")}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ textAlign: "center", position: "relative" }}>
      {structureComponent}
    </Box>
  );
}
