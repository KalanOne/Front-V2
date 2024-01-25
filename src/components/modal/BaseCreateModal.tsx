import React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { useTranslation } from "react-i18next";

export { BaseCreateModal };

interface BaseCreateModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onCancel?: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

function BaseCreateModal({
  open,
  title,
  onClose,
  onCancel,
  onConfirm,
  children,
  size,
}: BaseCreateModalProps): React.ReactElement {
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
        <Button onClick={handleConfirm}>{t("buttons:save")}</Button>
      </DialogActions>
    </Dialog>
  );
}
