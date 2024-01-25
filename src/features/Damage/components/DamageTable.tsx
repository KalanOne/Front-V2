import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ImageIcon from "@mui/icons-material/Image";
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
} from "src/components/common/CustomTable.tsx";

import { DamageResponse } from "../types/damageTypes.ts";

export { DamageTable };

interface DamageTableProps {
  damages: DamageResponse[];
  onUpdate: (damage: DamageResponse) => void;
  onDelete: (damage: DamageResponse) => void;
  onStatusChange: (damage: DamageResponse) => void;
}

function DamageTable({
  damages,
  onUpdate,
  onDelete,
  onStatusChange,
}: DamageTableProps): React.ReactElement {
  const { t } = useTranslation();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>{t("labels:status")}</TableHeaderCell>
            <TableHeaderCell>{t("common:name")}</TableHeaderCell>
            <TableHeaderCell>{t("labels:appearance")}</TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {damages.map((damage) => (
            <TableRow key={damage.damage_id}>
              <TableBodyCell component="th" scope="row">
                {damage.status ? (
                  <IconButton onClick={() => onStatusChange(damage)}>
                    <CheckIcon color={"primary"} />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => onStatusChange(damage)}>
                    <CloseIcon color={"primary"} />
                  </IconButton>
                )}
              </TableBodyCell>
              <TableBodyCell>
                {t("damage:damage.name." + damage.name)}
              </TableBodyCell>
              <TableBodyCell>{"-"}</TableBodyCell>
              {/* <TableBodyCell>{t("damage:damage.name." + damage.appearance)}</TableBodyCell> */}
              <TableBodyCell>
                <Stack direction={"row"} spacing={2} justifyContent={"center"}>
                  <IconButton>
                    <a href={"http://localhost" + damage.image} target="_blank">
                      <ImageIcon color={"primary"} />
                    </a>
                  </IconButton>
                  <IconButton onClick={() => onUpdate(damage)}>
                    <EditIcon color={"primary"} />
                  </IconButton>
                  <IconButton onClick={() => onDelete(damage)}>
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
