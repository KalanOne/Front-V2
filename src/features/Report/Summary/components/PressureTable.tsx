import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { CustomButton } from "src/components/common/CustomButton";
import {
  TableBodyCell,
  TableHeaderCellLightGray,
} from "src/components/common/CustomTable";

import { SummaryPressureTableResponse } from "../types/summaryTypes";

export { PressureTable };

interface PressureTableProps {
  data: SummaryPressureTableResponse[];
}

function PressureTable({ data }: PressureTableProps) {
  const { t } = useTranslation();
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCellLightGray>
              {t("labels:code")}
            </TableHeaderCellLightGray>
            <TableHeaderCellLightGray>
              {t("common:model")}
            </TableHeaderCellLightGray>
            <TableHeaderCellLightGray>
              {t("common:size")}
            </TableHeaderCellLightGray>
            <TableHeaderCellLightGray>
              {t("labels:location.label")}
            </TableHeaderCellLightGray>
            <TableHeaderCellLightGray>
              {t("general:position")}
            </TableHeaderCellLightGray>
            <TableHeaderCellLightGray>
              {t("labels:spare")}
            </TableHeaderCellLightGray>
            <TableHeaderCellLightGray>
              {t("labels2:pressures")}
            </TableHeaderCellLightGray>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            // .sort((a, b) => b.utils_mm - a.utils_mm)
            .map((tire: SummaryPressureTableResponse) => (
              <TableRow key={tire.code}>
                <TableBodyCell>
                  <Link to={`/tire/${tire.tire_id}/history`} target="_blank">
                    <CustomButton
                      onClick={() => {}}
                      text={tire.code}
                      sx={{
                        backgroundColor: "#28a745",
                        borderColor: "#28a745",
                        width: "100%",
                        "&:hover": {
                          backgroundColor: "#218838",
                          borderColor: "#218838",
                        },
                      }}
                      icon={<VisibilityIcon sx={{ marginRight: 1 }} />}
                    />
                  </Link>
                </TableBodyCell>
                <TableBodyCell>{tire.model}</TableBodyCell>
                <TableBodyCell>{tire.size}</TableBodyCell>
                <TableBodyCell>{tire.location}</TableBodyCell>
                <TableBodyCell>{tire.real_position}</TableBodyCell>
                <TableBodyCell>
                  {tire.is_refection == 1 ? t("labels:yes") : t("labels:no")}
                </TableBodyCell>
                <TableBodyCell>{`${tire.pressure} psi`}</TableBodyCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
