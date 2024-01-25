import { Box, Card, CardContent, Typography } from "@mui/material";

import { useTranslation } from "react-i18next";

import { ChassisPreview } from "./ChassisPreview";

export { ChassisCard };

interface ChassisCardProps {
  title?: string;
  structureType: string;
  axles: any;
  onClickTire?: (tire: any) => void;
  onRotateTire?: (origin: any, tire: any) => void;
}

function ChassisCard({
  title,
  structureType,
  axles,
  onClickTire,
  onRotateTire,
}: ChassisCardProps) {
  const { t } = useTranslation();
  // console.log("axles", axles);
  return (
    <Card
      sx={{
        width: "100%",
        marginBottom: "32px",
        marginRight: "16px",
        paddingBottom: "8px",
      }}
      elevation={3}
    >
      <CardContent
        sx={{
          padding: "16px",
          paddingBottom: "0",
          paddingTop: "0",
          position: "relative",
        }}
      >
        <Box sx={{ mt: "10px" }}>
          <Typography variant="h5" color="textPrimary" sx={{ mb: "10px" }}>
            {title ?? t("labels:preview")}
          </Typography>

          <ChassisPreview
            structureType={structureType}
            axles={axles}
            onClickTire={onClickTire}
            onRotateTire={onRotateTire}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
