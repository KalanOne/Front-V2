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

import { WearResponse } from "../types/wearTypes.ts";

export { WearTable };

interface WearTableProps {
  wear: WearResponse[];
  onUpdate: (wear: WearResponse) => void;
  onDelete: (wear: WearResponse) => void;
  onStatusChange: (wear: WearResponse) => void;
}

function WearTable({
  wear,
  onUpdate,
  onDelete,
  onStatusChange,
}: WearTableProps): React.ReactElement {
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
          {wear.map((wear) => (
            <TableRow key={wear.wear_id}>
              <TableBodyCell component="th" scope="row">
                {wear.status ? (
                  <IconButton onClick={() => onStatusChange(wear)}>
                    <CheckIcon color={"primary"} />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => onStatusChange(wear)}>
                    <CloseIcon color={"primary"} />
                  </IconButton>
                )}
              </TableBodyCell>
              <TableBodyCell>{t("wear:wear." + wear.name)}</TableBodyCell>
              <TableBodyCell>{t("wear:wear." + wear.appearance)}</TableBodyCell>
              <TableBodyCell>
                <Stack direction={"row"} spacing={2} justifyContent={"center"}>
                  <IconButton>
                    <a href={"http://localhost" + wear.image} target="_blank">
                      <ImageIcon color={"primary"} />
                    </a>
                  </IconButton>
                  <IconButton onClick={() => onUpdate(wear)}>
                    <EditIcon color={"primary"} />
                  </IconButton>
                  <IconButton onClick={() => onDelete(wear)}>
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
