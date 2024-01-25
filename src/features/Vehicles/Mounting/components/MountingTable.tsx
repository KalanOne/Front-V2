import BuildIcon from "@mui/icons-material/Build";
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

import { VehicleReviewResponse } from "../../VehicleReview/types/vehicleReviewTypes";

export { MountingTable };

interface MountingTableProps {
  mountings: VehicleReviewResponse[];
}

function MountingTable({ mountings }: MountingTableProps) {
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
          {mountings.map((mounting) => (
            <TableRow key={mounting.economic_number}>
              <TableBodyCell>{mounting.subsidiary.name}</TableBodyCell>
              <TableBodyCell>{mounting.economic_number}</TableBodyCell>
              <TableBodyCell>{mounting.vehicle_type.name}</TableBodyCell>
              <TableBodyCell>{mounting.vehicle_brand.name}</TableBodyCell>
              <TableBodyCell>
                {mounting.driver ? mounting.driver.name : "-"}
              </TableBodyCell>
              <TableBodyCell>
                <Stack direction={"row"} spacing={2} justifyContent={"center"}>
                  {mounting.vehicle_review.some(
                    (item) => item.end_time === null,
                  ) ? (
                    <Tooltip title={t("labels:inspection_in_process")}>
                      <IconButton>
                        <BuildIcon />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title={t("labels:inspection.singular")}>
                      <Link to={`/vehicle/${mounting.vehicle_id}/mount`}>
                        <IconButton>
                          <BuildIcon color={"primary"} />
                        </IconButton>
                      </Link>
                    </Tooltip>
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
