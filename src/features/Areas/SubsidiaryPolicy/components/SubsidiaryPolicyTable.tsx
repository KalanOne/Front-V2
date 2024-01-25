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

import { SubsidiaryPolicyResponse } from "../types/subsidiaryPolicyTypes";

export { SubsidiaryPolicyTable };

interface SubsidiaryPolicyTableProps {
  subsidiaryPolicy: SubsidiaryPolicyResponse;
  onUpdate: () => void;
}

function SubsidiaryPolicyTable({
  subsidiaryPolicy,
  onUpdate,
}: SubsidiaryPolicyTableProps) {
  const { t } = useTranslation();
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>
              {t("labels:company_policies.number_cycle")}
            </TableHeaderCell>
            <TableHeaderCell>
              {t("labels:company_policies.inspection")}
            </TableHeaderCell>
            <TableHeaderCell>
              {t("labels:company_policies.pressure_type_axle")}
            </TableHeaderCell>
            <TableHeaderCell>
              {t("labels:company_policies.tolerance_inflation_pressure")}
            </TableHeaderCell>
            <TableHeaderCell>
              {t("labels:company_policies.tolerance_mating_pressure")}
            </TableHeaderCell>
            <TableHeaderCell>
              {t(
                "labels:company_policies.mating_tolerance_directional_mating_depth",
              )}
            </TableHeaderCell>
            <TableHeaderCell>
              {t("labels:company_policies.mating_tolerance_mating_depth")}
            </TableHeaderCell>
            <TableHeaderCell>
              {t("labels:company_policies.helmet_policy")}
            </TableHeaderCell>
            <TableHeaderCell>
              {t("labels:company_policies.tire_rotation")}
            </TableHeaderCell>
            <TableHeaderCell>
              {t("labels:company_policies.directional_tire_rotation")}
            </TableHeaderCell>
            <TableHeaderCell>
              {t("labels:company_policies.tire_condition_axle_type")}
            </TableHeaderCell>
            <TableHeaderCell>
              {t("labels:company_policies.show_alerts_different_assignment")}
            </TableHeaderCell>
            <TableHeaderCell>
              {t("labels:company_policies.send_pressure_setting")}
            </TableHeaderCell>
            <TableHeaderCell>
              {t("labels:company_policies.operator_edit")}
            </TableHeaderCell>
            <TableHeaderCell>
              {t("labels:company_policies.refection_review")}
            </TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableBodyCell>{subsidiaryPolicy.number_cycle}</TableBodyCell>
            <TableBodyCell>
              {`${subsidiaryPolicy.inspection} 
          ${t("labels:company_policies.days")}`}
            </TableBodyCell>
            <TableBodyCell>
              {subsidiaryPolicy.pressure_type_axle == 1
                ? t("labels:yes")
                : t("labels:no")}
            </TableBodyCell>
            <TableBodyCell>
              {subsidiaryPolicy.tolerance_inflation_pressure} %
            </TableBodyCell>
            <TableBodyCell>
              {subsidiaryPolicy.tolerance_mating_pressure} psi
            </TableBodyCell>
            <TableBodyCell>
              {subsidiaryPolicy.tolerance_directional_mating_depth} psi
            </TableBodyCell>
            <TableBodyCell>
              {subsidiaryPolicy.tolerance_mating_depth} mm
            </TableBodyCell>
            <TableBodyCell>
              {subsidiaryPolicy.helmet_policy == 1
                ? t("labels:yes")
                : t("labels:no")}
            </TableBodyCell>
            <TableBodyCell>{subsidiaryPolicy.tire_rotation} km</TableBodyCell>
            <TableBodyCell>
              {subsidiaryPolicy.directional_tire_rotation} km
            </TableBodyCell>
            <TableBodyCell>
              {subsidiaryPolicy.tire_condition_axle_type == 1
                ? t("labels:yes")
                : t("labels:no")}
            </TableBodyCell>
            <TableBodyCell>
              {subsidiaryPolicy.show_alerts_different_assignment == 1
                ? t("labels:yes")
                : t("labels:no")}
            </TableBodyCell>
            <TableBodyCell>
              {subsidiaryPolicy.send_pressure_setting == 1
                ? t("labels:yes")
                : t("labels:no")}
            </TableBodyCell>
            <TableBodyCell>
              {subsidiaryPolicy.operator_edit == 1
                ? t("labels:yes")
                : t("labels:no")}
            </TableBodyCell>
            <TableBodyCell>
              {subsidiaryPolicy.refection_review == 1
                ? t("labels:yes")
                : t("labels:no")}
            </TableBodyCell>
            <TableBodyCell>
              <Stack direction={"row"} spacing={2} justifyContent={"center"}>
                <IconButton onClick={onUpdate}>
                  <EditIcon color={"primary"} />
                </IconButton>
              </Stack>
            </TableBodyCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
