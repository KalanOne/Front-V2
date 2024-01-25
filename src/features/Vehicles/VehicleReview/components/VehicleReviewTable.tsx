import BuildIcon from "@mui/icons-material/Build";
import DescriptionIcon from "@mui/icons-material/Description";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import HistoryIcon from "@mui/icons-material/History";
import TireRepairIcon from "@mui/icons-material/TireRepair";
import {
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import {
  TableBodyCell,
  TableHeaderCell,
} from "src/components/common/CustomTable";

import { VehicleReviewResponse } from "../types/vehicleReviewTypes";

export { VehicleReviewTable };

interface VehicleReviewTableProps {
  vehicleReviews: VehicleReviewResponse[];
}

function VehicleReviewTable({ vehicleReviews }: VehicleReviewTableProps) {
  const { t } = useTranslation();
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>{t("common:subsidiary")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:economic_number")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:vehicle_type.label")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:vehicle_brand.label")}</TableHeaderCell>
            <TableHeaderCell>{t("common:driver")}</TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vehicleReviews.map((vehicleReview) => (
            <TableRow key={vehicleReview.economic_number}>
              <TableBodyCell>{vehicleReview.subsidiary.name}</TableBodyCell>
              <TableBodyCell>{vehicleReview.economic_number}</TableBodyCell>
              <TableBodyCell>{vehicleReview.vehicle_type.name}</TableBodyCell>
              <TableBodyCell>{vehicleReview.vehicle_brand.name}</TableBodyCell>
              <TableBodyCell>
                {vehicleReview.driver ? vehicleReview.driver.name : "-"}
              </TableBodyCell>
              <TableBodyCell>
                <Stack direction={"row"} spacing={2} justifyContent={"center"}>
                  <Tooltip title={t("labels:inspection.singular")}>
                    <Link to={`/vehicle/review/${vehicleReview.vehicle_id}`}>
                      <IconButton>
                        <BuildIcon color={"primary"} />
                      </IconButton>
                    </Link>
                  </Tooltip>
                  <Tooltip title={t("labels:review.plural")}>
                    <Link
                      to={`/vehicleReview/${vehicleReview.vehicle_id}/history`}
                    >
                      <IconButton>
                        <HistoryIcon color={"primary"} />
                      </IconButton>
                    </Link>
                  </Tooltip>
                  <Tooltip title={t("labels:movement_sheet")}>
                    <Link
                      to={`/vehicleReview/${vehicleReview.vehicle_id}/movement`}
                      target="_blank"
                    >
                      <IconButton>
                        <DescriptionIcon color={"primary"} />
                      </IconButton>
                    </Link>
                  </Tooltip>
                  {vehicleReview.vehicle_review.some(
                    (item) => item.end_time === null,
                  ) ? (
                    <>
                      <Tooltip title={t("labels:inspection_in_process")}>
                        <IconButton>
                          <TireRepairIcon color="disabled" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={t("labels:inspection_in_process")}>
                        <IconButton>
                          <FactCheckIcon color="disabled" />
                        </IconButton>
                      </Tooltip>
                    </>
                  ) : (
                    <>
                      <Tooltip title={t("labels:pressure")}>
                        <Link
                          to={`/vehicle/${vehicleReview.vehicle_id}/tire/pressure`}
                          target="_blank"
                        >
                          <IconButton>
                            <TireRepairIcon color={"primary"} />
                          </IconButton>
                        </Link>
                      </Tooltip>
                      <Tooltip title={t("labels:review_type.options.identify")}>
                        <Link
                          to={`/vehicle/${vehicleReview.vehicle_id}/tire/identify`}
                          target="_blank"
                        >
                          <IconButton>
                            <FactCheckIcon color={"primary"} />
                          </IconButton>
                        </Link>
                      </Tooltip>
                    </>
                  )}
                </Stack>
              </TableBodyCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
