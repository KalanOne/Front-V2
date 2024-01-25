import { Card, CardContent } from "@mui/material";

import { CardHeaderGray } from "src/components/report/CardHeaderGray";
import { CardReportItem } from "src/components/report/CardReportItem";
import { IconPill } from "src/components/report/IconPill";
import { formatter, percentFormatter } from "src/utils/formatters";

import { DismountedTireResponse } from "../types/dismountedTireTypes";

export { DismountedTireWarehouseCards };

interface DismountedTireWarehouseCardsProps {
  dismountedTires: DismountedTireResponse;
  handleWarehouseChange: (warehouseId: number) => void;
}

function DismountedTireWarehouseCards({
  dismountedTires,
  handleWarehouseChange,
}: DismountedTireWarehouseCardsProps) {
  return (
    <>
      {Object.keys(dismountedTires).map((subsidiary) => (
        <Card sx={{ marginBottom: 2 }} key={subsidiary}>
          <CardHeaderGray title={subsidiary}>
            <IconPill
              text1={formatter.format(
                Object.values(dismountedTires[subsidiary]).reduce(
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
            {Object.keys(dismountedTires[subsidiary]).map((warehouse) => {
              const warehouseData = dismountedTires[subsidiary][warehouse];
              return (
                <CardReportItem
                  title={warehouse}
                  key={warehouse}
                  onClick={() =>
                    handleWarehouseChange(warehouseData.warehouse_id)
                  }
                >
                  <IconPill
                    text1={`${formatter.format(warehouseData.statistics)}`}
                    text2={`${percentFormatter.format(warehouseData.percent)}%`}
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
