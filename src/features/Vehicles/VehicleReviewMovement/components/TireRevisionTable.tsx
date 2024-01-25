import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { useTranslation } from "react-i18next";

import {
  TableHeaderCell,
  TableHeaderCellBlack,
} from "src/components/common/CustomTable";

import { TireReview } from "../types/vehicleReviewMovementTypes";
import { TireRevisionTableRow } from "./TireRevisionTableRow";

export { TireRevisionTable };

interface TireRevisionTableProps {
  tireReviews: TireReview[];
  onViewAlertClick: (alerts: TireReview) => void;
}

function TireRevisionTable({
  tireReviews,
  onViewAlertClick,
}: TireRevisionTableProps): React.ReactElement {
  const { t } = useTranslation();
  // const [isHovered, setIsHovered] = useState(false);

  // const handleMouseEnter = () => {
  //   setIsHovered(true);
  // };

  // const handleMouseLeave = () => {
  //   setIsHovered(false);
  // };
  return (
    <TableContainer component={Paper} sx={{ marginTop: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>{t("general:tire_reviews")}</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableHead>
            <TableRow>
              <TableHeaderCellBlack>{t("labels:code")}</TableHeaderCellBlack>
              <TableHeaderCellBlack>{t("labels:rfid")}</TableHeaderCellBlack>
              <TableHeaderCellBlack>
                {t("general:position")}
              </TableHeaderCellBlack>
              <TableHeaderCellBlack>{t("labels:detail")}</TableHeaderCellBlack>
              <TableHeaderCellBlack>{t("common:brand")}</TableHeaderCellBlack>
              <TableHeaderCellBlack>
                {t("general:tire_model")}
              </TableHeaderCellBlack>
              <TableHeaderCellBlack>{t("general:size")}</TableHeaderCellBlack>
              <TableHeaderCellBlack>
                {t("labels:tire_days_service")}
              </TableHeaderCellBlack>
              <TableHeaderCellBlack>{`${t(
                "labels:mileage",
              )} (km)`}</TableHeaderCellBlack>
              <TableHeaderCellBlack>
                {`${t("labels:review_type.options.pressure")} (psi)`}
              </TableHeaderCellBlack>
              <TableHeaderCellBlack>
                {`${t("labels:depth")} (mm)`}
              </TableHeaderCellBlack>
              <TableHeaderCellBlack>
                {`${t("common:wear")} (mm)`}
              </TableHeaderCellBlack>
              <TableHeaderCellBlack>Km/mm</TableHeaderCellBlack>
              <TableHeaderCellBlack>{t("labels:cost_km")}</TableHeaderCellBlack>
              <TableHeaderCellBlack>
                {t("labels:projection")}
              </TableHeaderCellBlack>
            </TableRow>
            {/* <TableBody> */}
            {tireReviews
              .sort((a: TireReview, b: TireReview) => {
                const positionA = a.real_position;
                const positionB = b.real_position;
                return positionA - positionB;
              })
              .map((tireReview, index) => (
                <TireRevisionTableRow
                  key={tireReview.movement_tire.tire_cycle.tire_id}
                  tireReview={tireReview}
                  index={index}
                  onViewAlertClick={onViewAlertClick}
                />
              ))}
            {/* </TableBody> */}
          </TableHead>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
