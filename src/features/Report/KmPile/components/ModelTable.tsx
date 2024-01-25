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
import { formatterExtra, percentFormatter } from "src/utils/formatters";

import { KmPileModelTableResponse } from "../types/kmPileTypes";

export { ModelTable };

interface ModelTableProps {
  data: KmPileModelTableResponse[];
}

function ModelTable({ data }: ModelTableProps) {
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
              {t("labels2:report_pile.cost")}
            </TableHeaderCellLightGray>
            <TableHeaderCellLightGray>
              {t("labels2:report_pile.cost_km")}
            </TableHeaderCellLightGray>
            <TableHeaderCellLightGray>
              {t("labels:mileage")}
            </TableHeaderCellLightGray>
            <TableHeaderCellLightGray>
              {t("labels2:duration")}
            </TableHeaderCellLightGray>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .sort((a, b) => a.cpk - b.cpk)
            .map((tire: KmPileModelTableResponse) => (
              <TableRow key={tire.tire_id}>
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
                <TableBodyCell>{`$${percentFormatter.format(
                  tire.cost,
                )}`}</TableBodyCell>
                <TableBodyCell>{`$${formatterExtra.format(
                  tire.cpk,
                )}`}</TableBodyCell>
                <TableBodyCell>{`${percentFormatter.format(
                  tire.tire_travel,
                )}`}</TableBodyCell>
                <TableBodyCell>{tire.days_in_service}</TableBodyCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
