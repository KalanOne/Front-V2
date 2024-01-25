import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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

import {
  TableBodyCell,
  TableHeaderCell,
} from "src/components/common/CustomTable";

import { SubsidiaryHelmetValueResponse } from "../types/subsidiaryHelmetValueTypes";

export { SubsidiaryHelmetValueTable };

interface SubsidiaryHelmetValueTableProps {
  subsidiaryHelmetValues: SubsidiaryHelmetValueResponse[];
  onUpdate: (subsidiaryHelmetValue: SubsidiaryHelmetValueResponse) => void;
  onDelete: (subsidiaryHelmetValue: SubsidiaryHelmetValueResponse) => void;
}

function SubsidiaryHelmetValueTable({
  subsidiaryHelmetValues,
  onUpdate,
  onDelete,
}: SubsidiaryHelmetValueTableProps): React.ReactElement {
  const { t } = useTranslation();
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>{t("common:model")}</TableHeaderCell>
            <TableHeaderCell>{t("common:size")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:layer")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:depth")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:helmet_value")}</TableHeaderCell>
            <TableHeaderCell>
              {t("labels:helmet_value_revitalized")}
            </TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subsidiaryHelmetValues.map((subsidiaryHelmetValue) => (
            <TableRow
              key={subsidiaryHelmetValue.tire_model_variation_helmet_id}
            >
              <TableBodyCell>
                {subsidiaryHelmetValue.tire_model_variation.tire_model.name}
              </TableBodyCell>
              <TableBodyCell>
                {subsidiaryHelmetValue.tire_model_variation.tire_size.size}
              </TableBodyCell>
              <TableBodyCell>
                {subsidiaryHelmetValue.tire_model_variation.number_layers}
              </TableBodyCell>
              <TableBodyCell>
                {subsidiaryHelmetValue.tire_model_variation.depth} mm
              </TableBodyCell>
              <TableBodyCell>
                ${subsidiaryHelmetValue.helmet_value_original}
              </TableBodyCell>
              <TableBodyCell>
                ${subsidiaryHelmetValue.helmet_value_revitalized}
              </TableBodyCell>
              <TableBodyCell>
                <Stack direction={"row"} spacing={2} justifyContent={"center"}>
                  <IconButton onClick={() => onUpdate(subsidiaryHelmetValue)}>
                    <EditIcon color={"primary"} />
                  </IconButton>
                  <IconButton onClick={() => onDelete(subsidiaryHelmetValue)}>
                    <DeleteIcon color={"primary"} />
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
