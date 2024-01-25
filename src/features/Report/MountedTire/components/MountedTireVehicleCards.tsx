import { Card, CardContent } from "@mui/material";

import { CardHeaderGray } from "src/components/report/CardHeaderGray";
import { CardReportItem } from "src/components/report/CardReportItem";
import { IconPill } from "src/components/report/IconPill";
import { formatter, percentFormatter } from "src/utils/formatters";

import { MountedTireResponse } from "../types/mountedTireTypes";

export { MountedTireVehicleCards };

interface MountedTireWarehouseCardsProps {
  mountedTires: MountedTireResponse;
  handleVehicleChange: (vehicleId: number) => void;
}

function MountedTireVehicleCards({
  mountedTires,
  handleVehicleChange,
}: MountedTireWarehouseCardsProps) {
  return (
    <>
      {Object.keys(mountedTires).map((subsidiary) => (
        <Card sx={{ marginBottom: 2 }} key={subsidiary}>
          <CardHeaderGray title={subsidiary}>
            <IconPill
              text1={formatter.format(
                Object.values(mountedTires[subsidiary]).reduce(
                  (accumulator, warehouse) =>
                    accumulator + warehouse.statistics,
                  0,
                ),
              )}
              text2={`${formatter.format(100)}%`}
            />
          </CardHeaderGray>
          <CardContent
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              marginTop: "8px",
              marginBottom: "10px",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            {Object.keys(mountedTires[subsidiary]).map((vehicleType) => {
              const vehicleTypeData = mountedTires[subsidiary][vehicleType];
              return (
                <CardReportItem
                  title={vehicleType}
                  key={vehicleType}
                  onClick={() =>
                    handleVehicleChange(vehicleTypeData.vehicle_type_id)
                  }
                >
                  <IconPill
                    text1={`${formatter.format(vehicleTypeData.statistics)}`}
                    text2={`${percentFormatter.format(
                      vehicleTypeData.percent,
                    )}%`}
                  ></IconPill>
                </CardReportItem>
              );
            })}
          </CardContent>
        </Card>
      ))}
    </>
  );
}
