import React from "react";

import {
  Link,
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
  TableHeaderCellBlue,
} from "src/components/common/CustomTable";
import { cpdFormatter, formatter } from "src/utils/formatters";

import { LastMovementData } from "../types/lastMovementTypes";

export { LastMovementTable };

interface LastMovementTableProps {
  movements: LastMovementData[];
}

function LastMovementTable({
  movements,
}: LastMovementTableProps): React.ReactElement {
  const { t } = useTranslation();
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCellBlue>{t("common:company")}</TableHeaderCellBlue>
            <TableHeaderCellBlue>{t("common:corporate")}</TableHeaderCellBlue>
            <TableHeaderCellBlue>{t("common:subsidiary")}</TableHeaderCellBlue>
            <TableHeaderCellBlue>{t("common:division")}</TableHeaderCellBlue>
            <TableHeaderCellBlue>{t("labels:economic_number")}</TableHeaderCellBlue>
            <TableHeaderCellBlue>
              {t("features:reportLastMovement.last_position")}
            </TableHeaderCellBlue>
            <TableHeaderCellBlue>{t("labels:burn_code")}</TableHeaderCellBlue>
            <TableHeaderCellBlue>{t("common:size")}</TableHeaderCellBlue>
            <TableHeaderCellBlue>{t("common:brand")}</TableHeaderCellBlue>
            <TableHeaderCellBlue>{t("common:model")}</TableHeaderCellBlue>
            <TableHeaderCellBlue>{t("labels:condition")}</TableHeaderCellBlue>
            <TableHeaderCellBlue>
              {t("features:reportLastMovement.renovated_number")}
            </TableHeaderCellBlue>
            <TableHeaderCellBlue>
              {t("labels:revitalized_brand_field.label")}
            </TableHeaderCellBlue>
            <TableHeaderCellBlue>
              {t("labels:revitalized_tire_model_field.label")}
            </TableHeaderCellBlue>
            <TableHeaderCellBlue>{t("labels:mileage")}</TableHeaderCellBlue>
            <TableHeaderCellBlue>
              {t("labels:retirement_cause_field.label")}
            </TableHeaderCellBlue>
            <TableHeaderCellBlue>
              {t("features:reportLastMovement.shipping_date")}{" "}
              {t("labels:location.options.pile").toLowerCase()}
            </TableHeaderCellBlue>
            <TableHeaderCellBlue>
              {t("features:reportLastMovement.depth_model")}
            </TableHeaderCellBlue>
            <TableHeaderCellBlue>
              {t("features:reportLastMovement.depth_last_revision")}
            </TableHeaderCellBlue>
            <TableHeaderCellBlue>
              {t("features:reportLastMovement.wasted_rubber")}
            </TableHeaderCellBlue>
            <TableHeaderCellBlue>{t("labels:price")}</TableHeaderCellBlue>
            <TableHeaderCellBlue>
              {t("features:reportLastMovement.cost")}
            </TableHeaderCellBlue>
            <TableHeaderCellBlue>
              {t("features:reportLastMovement.disposal_loss")}
            </TableHeaderCellBlue>
          </TableRow>
        </TableHead>
        <TableBody>
          {movements.map((movement, index) => (
            <TableRow key={index}>
              <TableBodyCell>{movement.company_name}</TableBodyCell>
              <TableBodyCell>{movement.corporate_name}</TableBodyCell>
              <TableBodyCell>{movement.subsidiary_name}</TableBodyCell>
              <TableBodyCell>{movement.division_name}</TableBodyCell>
              <TableBodyCell>{movement.economic_number}</TableBodyCell>
              <TableBodyCell>{movement.real_position}</TableBodyCell>
              <TableBodyCell>
                <Link href={`/tire/${movement.tire_id}/history`}>
                  {movement.code}
                </Link>
              </TableBodyCell>
              <TableBodyCell>{movement.size}</TableBodyCell>
              <TableBodyCell>{movement.brand_name}</TableBodyCell>
              <TableBodyCell>{movement.original_model}</TableBodyCell>
              <TableBodyCell>
                {t(
                  `labels:tire_condition.options.${movement.tire_condition_id.toLowerCase()}`,
                )}
              </TableBodyCell>
              <TableBodyCell>{movement.number_cycle}</TableBodyCell>
              <TableBodyCell>{movement.brand_retread_name}</TableBodyCell>
              <TableBodyCell>{movement.type}</TableBodyCell>
              <TableBodyCell>{movement.tire_travel}</TableBodyCell>
              <TableBodyCell>
                {t(`features:cause.name.${movement.retirement_cause}`)}
              </TableBodyCell>
              <TableBodyCell>{movement.movement_date}</TableBodyCell>
              <TableBodyCell>{movement.depth_variation}</TableBodyCell>
              <TableBodyCell>{movement.depth}</TableBodyCell>
              <TableBodyCell>{movement.remainder_depth}</TableBodyCell>
              <TableBodyCell>{movement.cost}</TableBodyCell>
              <TableBodyCell>{cpdFormatter.format(movement.cpd)}</TableBodyCell>
              <TableBodyCell>
                {formatter.format(movement.disposal_loss)}
              </TableBodyCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
