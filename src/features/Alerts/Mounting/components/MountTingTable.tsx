import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import {
  TableBodyCell,
  TableHeaderCell,
} from "src/components/common/CustomTable";

import { MountingResponse } from "../types/mountingTypes";

export { MountTingTable };

interface MountTingTableProps {
  mountings: MountingResponse[];
}

function MountTingTable({
  mountings,
}: MountTingTableProps): React.ReactElement {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>{t("labels:economic_number")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:vehicle_brand.label")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:vehicle_type.label")}</TableHeaderCell>
            <TableHeaderCell>{t("common:driver")}</TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mountings.map((mounting: MountingResponse) => (
            <TableRow key={mounting.economic_number}>
              <TableBodyCell>{mounting.economic_number}</TableBodyCell>
              <TableBodyCell>{mounting.vehicle_brand}</TableBodyCell>
              <TableBodyCell>{mounting.vehicle_type}</TableBodyCell>
              <TableBodyCell>{mounting.driver_name}</TableBodyCell>
              <TableBodyCell>
                <Stack direction={"row"} spacing={2} justifyContent={"center"}>
                  <IconButton
                    onClick={() =>
                      navigate(`/mount/${mounting.vehicle_id}/alerts`)
                    }
                  >
                    <VisibilityIcon color={"primary"} />
                  </IconButton>
                </Stack>
              </TableBodyCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
