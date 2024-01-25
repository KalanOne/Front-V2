import PhotoIcon from "@mui/icons-material/Photo";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  IconButton,
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
import { SERVER_URL } from "src/utils/constants";

import { KmPileResponsibleTableResponse } from "../types/kmPileTypes";

export { ResponsibleTable };

interface ResponsibleTableProps {
  data: KmPileResponsibleTableResponse[];
}

function ResponsibleTable({ data }: ResponsibleTableProps) {
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
              {t("labels2:report_pile.retirement_cause_field.label")}
            </TableHeaderCellLightGray>
            <TableHeaderCellLightGray>
              {t("labels2:evidence")}
            </TableHeaderCellLightGray>
            <TableHeaderCellLightGray>
              {t("labels2:image")}
            </TableHeaderCellLightGray>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((tire: KmPileResponsibleTableResponse) => (
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
              <TableBodyCell>
                {t(`features:cause.name.${tire.retirement_cause_name}`)}
              </TableBodyCell>
              <TableBodyCell>
                <PhotoIcon sx={{ color: "rgba(0, 0, 0, 0.26)" }} />
              </TableBodyCell>
              <TableBodyCell>
                <Link
                  to={`${SERVER_URL}${tire.retirement_cause_image}`}
                  target="_blank"
                >
                  <IconButton onClick={() => {}}>
                    <PhotoIcon sx={{ color: "#536DFE" }} />
                  </IconButton>
                </Link>
              </TableBodyCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
