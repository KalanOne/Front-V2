import React, { useEffect, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Checkbox,
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
} from "src/components/common/CustomTable.tsx";

export { PressurePolicyTable };

interface PressurePolicyTableProps {
  pressure: any[];
  onCreatePress: (vehicle: any) => void;
  onUpdatePress: (vehicle: any, policy: any) => void;
  onVehiclePress: (vehicle: any) => void;
  onDeletePress: (vehicle: any, policy: any) => void;
}

function PressurePolicyTable({
  pressure,
  onCreatePress,
  onUpdatePress,
  onVehiclePress,
  onDeletePress,
}: PressurePolicyTableProps): React.ReactElement {
  const { t } = useTranslation();
  const [list, setList] = useState<any>([]);

  function addOrRemoveIdToList(
    newId: any,
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    if (event.target.checked) {
      const updatedList = [...list, newId];
      setList(updatedList);
    } else {
      const updatedList = list.filter((id: any) => id !== newId);
      setList(updatedList);
    }
  }

  function addOrRemoveAllIdsToList(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.checked) {
      const currentList = list;
      const newIds = pressure
        .map((vehicle) => vehicle.vehicle_id)
        .filter((id) => !currentList.includes(id));
      const updatedList = [...currentList, ...newIds];
      setList(updatedList);
    } else {
      setList([]);
    }
  }

  function getChecboxValue(vehicle_id: number) {
    const isChecked = list.includes(vehicle_id);
    return isChecked;
  }

  useEffect(() => {
    onVehiclePress(list);
  }, [list]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell align="center" colSpan={7}>
              {t("common:vehicle", { context: "plural" })}
            </TableHeaderCell>
            <TableHeaderCell align="center" colSpan={4}>
              {t("common:axle", { context: "plural" })}
            </TableHeaderCell>
          </TableRow>
          <TableRow>
            <TableHeaderCell>
              <Checkbox onChange={(event) => addOrRemoveAllIdsToList(event)} />
            </TableHeaderCell>
            <TableHeaderCell>{t("common:subsidiary")}</TableHeaderCell>
            <TableHeaderCell>{t("common:division")}</TableHeaderCell>
            <TableHeaderCell>{t("common:brand")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:economic_number")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:vehicle_type.label")}</TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
            <TableHeaderCell>
              {t("common:axle", { context: "plural" })}
            </TableHeaderCell>
            <TableHeaderCell>
              {t("labels:tire_model_variation.recommended_pressure")}
            </TableHeaderCell>
            <TableHeaderCell>
              {t("labels:tire_model_variation.tolerance")}
            </TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pressure.map((vehicle) => (
            <TableRow
              sx={{ "& td": { border: "1px solid black" } }}
              key={vehicle.vehicle_id}
            >
              <TableBodyCell>
                <Checkbox
                  checked={getChecboxValue(vehicle.vehicle_id)}
                  onChange={(event) =>
                    addOrRemoveIdToList(vehicle.vehicle_id, event)
                  }
                />
              </TableBodyCell>
              <TableBodyCell>{vehicle.subsidiary.name}</TableBodyCell>
              <TableBodyCell>
                {vehicle.division.length > 0 ? vehicle.division[0].name : " - "}
              </TableBodyCell>
              <TableBodyCell>{vehicle.vehicle_brand.name}</TableBodyCell>
              <TableBodyCell>{vehicle.economic_number}</TableBodyCell>
              <TableBodyCell>{vehicle.vehicle_type.name}</TableBodyCell>
              <TableBodyCell>
                <IconButton onClick={() => onCreatePress(vehicle)}>
                  <AddIcon color={"primary"} />
                </IconButton>
              </TableBodyCell>
              <TableBodyCell>
                <Table>
                  {vehicle.vehicle_pressure_policy.length > 0 ? (
                    vehicle.vehicle_pressure_policy.map((policy: any) => (
                      <TableRow>
                        <TableBodyCell>
                          {t(
                            `labels:axle_field.options.${policy.axle_type.toLowerCase()}`,
                          )}
                        </TableBodyCell>
                      </TableRow>
                    ))
                  ) : (
                    <></>
                  )}
                </Table>
              </TableBodyCell>
              <TableBodyCell align="center">
                {vehicle.vehicle_pressure_policy.length > 0 ? (
                  vehicle.vehicle_pressure_policy.map((policy: any) => (
                    <TableRow>
                      <TableBodyCell>
                        {`${policy.recommended_pressure} psi`}
                      </TableBodyCell>
                    </TableRow>
                  ))
                ) : (
                  <></>
                )}
              </TableBodyCell>
              <TableBodyCell>
                {vehicle.vehicle_pressure_policy.length > 0 ? (
                  vehicle.vehicle_pressure_policy.map((policy: any) => (
                    <TableRow>
                      <TableBodyCell>{`${policy.tolerance}%`}</TableBodyCell>
                    </TableRow>
                  ))
                ) : (
                  <></>
                )}
              </TableBodyCell>
              <TableBodyCell>
                {vehicle.vehicle_pressure_policy.length > 0 ? (
                  vehicle.vehicle_pressure_policy.map((policy: any) => (
                    <TableRow>
                      <Stack
                        direction={"row"}
                        spacing={2}
                        justifyContent={"center"}
                      >
                        <IconButton
                          onClick={() => onUpdatePress(vehicle, policy)}
                        >
                          <EditIcon color={"warning"} />
                        </IconButton>
                        <IconButton
                          onClick={() => onDeletePress(policy, vehicle)}
                        >
                          <DeleteIcon color={"error"} />
                        </IconButton>
                      </Stack>
                    </TableRow>
                  ))
                ) : (
                  <></>
                )}
              </TableBodyCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
