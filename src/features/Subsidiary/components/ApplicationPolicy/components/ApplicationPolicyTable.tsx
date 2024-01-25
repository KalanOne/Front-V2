import React, { useEffect } from "react";

import EditIcon from "@mui/icons-material/Edit";
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

import {
  TableBodyCell,
  TableHeaderCell,
} from "src/components/common/CustomTable.tsx";

export { ApplicationPolicyTable };

interface ApplicationPolicyTableProps {
  policies: any[];

  onUpdate: (policy: any) => void;
}

function ApplicationPolicyTable({
  policies,
  onUpdate,
}: ApplicationPolicyTableProps): React.ReactElement {
  const { t } = useTranslation();
  // console.log(policies);
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>{t("common:subsidiary")}</TableHeaderCell>
            <TableHeaderCell>
              {t("labels:depth_tolerance_policies.tire_application_id")}
            </TableHeaderCell>
            <TableHeaderCell>
              {t("labels:depth_tolerance_policies.good_condition")}
            </TableHeaderCell>
            <TableHeaderCell>
              {t("labels:depth_tolerance_policies.scheduled_withdrawal")}
            </TableHeaderCell>
            <TableHeaderCell>
              {t("labels:depth_tolerance_policies.critical_withdrawal")}
            </TableHeaderCell>
            <TableHeaderCell>
              {t("labels:depth_tolerance_policies.maximum_number_patches")}
            </TableHeaderCell>
            <TableHeaderCell>
              {t("labels:depth_tolerance_policies.critical_number_patches")}
            </TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {policies.map((policy) => (
            <TableRow key={policy.depth_tolerance_policy_id}>
              <TableBodyCell>{policy.subsidiary.name}</TableBodyCell>
              <TableBodyCell>
                {t(
                  `labels:tire_application.options.${policy.tire_application_id.toLowerCase()}`,
                )}
              </TableBodyCell>
              <TableBodyCell>{`${policy.good_condition} mm`}</TableBodyCell>
              <TableBodyCell>
                {`${policy.scheduled_withdrawal} mm`}
              </TableBodyCell>
              <TableBodyCell>
                {`${policy.critical_withdrawal} mm`}
              </TableBodyCell>
              <TableBodyCell>{policy.maximum_number_patches}</TableBodyCell>
              <TableBodyCell>{policy.critical_number_patches}</TableBodyCell>
              <TableBodyCell>
                <IconButton onClick={() => onUpdate(policy)}>
                  <EditIcon color={"primary"} />
                </IconButton>
              </TableBodyCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
