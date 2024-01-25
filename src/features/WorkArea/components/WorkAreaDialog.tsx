import React from "react";

import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { useTranslation } from "react-i18next";

import { DialogMediaQuery } from "src/components/common/Dialog.tsx";

import { WorkArea } from "./WorkArea.tsx";

export { WorkAreaDialog };

interface WorkAreaDialogProps {
  open: boolean;
}

function WorkAreaDialog({ open }: WorkAreaDialogProps): React.ReactElement {
  const { t } = useTranslation();

  return (
    <DialogMediaQuery open={open}>
      <DialogTitle>
        {t("WorkAreaTitle")}
        <DialogContentText>{t("WorkAreaDescription")}</DialogContentText>
      </DialogTitle>
      <DialogContent>
        <WorkArea />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            // handleLogout();
          }}
          color="secondary"
        >
          {t("logout")}
        </Button>
      </DialogActions>
    </DialogMediaQuery>
  );
}
