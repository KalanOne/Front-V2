import React from "react";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { useTranslation } from "react-i18next";

export { BaseCustomModal };

interface BaseCustomModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onCancel?: () => void;
  onConfirm?: () => void;
  children: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

function BaseCustomModal({
  open,
  title,
  onClose,
  onCancel,
  onConfirm,
  children,
  size,
}: BaseCustomModalProps): React.ReactElement {
  const { t } = useTranslation();

  function handleCancel() {
    if (onCancel) {
      onCancel();
    }
    onClose();
  }

  function handleConfirm() {
    if (onConfirm) {
      onConfirm();
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={size ?? "sm"}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Box id={"DialogActionsContainer"}></Box>
        {onClose && <Button onClick={onClose}>{t("buttons:close")}</Button>}
        {onCancel && (
          <Button onClick={handleCancel}>{t("buttons:cancel")}</Button>
        )}
        {onConfirm && (
          <Button onClick={handleConfirm}>{t("buttons:save")}</Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
