import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { useTranslation } from "react-i18next";

import { TableHeaderCell } from "src/components/common/CustomTable";

import {
  VehicleReviewUpdateData,
  VehicleReviewUpdateResponse,
} from "../types/vehicleReviewUpdateTypes";
import { VehicleReviewUpdateTableRow } from "./VehicleReviewUpdateTableRow";

export { VehicleReviewUpdateTable };

interface VehicleReviewUpdateTableProps {
  vehicleReviewsUpdate: VehicleReviewUpdateResponse[];
  onUpdatePress: (vehicleReviewUpdate: VehicleReviewUpdateData) => void;
}

function VehicleReviewUpdateTable({
  vehicleReviewsUpdate,
  onUpdatePress,
}: VehicleReviewUpdateTableProps): React.ReactElement {
  const { t } = useTranslation();
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>{t("common:review")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:date.label")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:mileage")}</TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vehicleReviewsUpdate.map((vehicleReviewUpdate, index) => {
            return (
              <VehicleReviewUpdateTableRow
                vehicleReviewUpdate={vehicleReviewUpdate}
                review={vehicleReviewsUpdate.length - index}
                index={index}
                onUpdatePress={onUpdatePress}
              />
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
