import React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { useTranslation } from "react-i18next";

export { BaseUpdateModal };

interface BaseUpdateModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onCancel?: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

function BaseUpdateModal({
  open,
  title,
  onClose,
  onCancel,
  onConfirm,
  children,
  size,
}: BaseUpdateModalProps): React.ReactElement {
  const { t } = useTranslation();

  function handleCancel() {
    if (onCancel) {
      onCancel();
    }
    onClose();
  }

  function handleConfirm() {
    onConfirm();
    // onClose();
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={size ?? "sm"}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>{t("buttons:cancel")}</Button>
        <Button onClick={handleConfirm}>{t("buttons:update")}</Button>
      </DialogActions>
    </Dialog>
  );
}
