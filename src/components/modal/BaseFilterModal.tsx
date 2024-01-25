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

export { BaseFilterModal };

interface BaseFilterModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onCancel?: () => void;
  onConfirm: () => void;
  onClear: () => void;
  children: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

function BaseFilterModal({
  open,
  title,
  onClose,
  onCancel,
  onConfirm,
  onClear,
  children,
  size,
}: BaseFilterModalProps): React.ReactElement {
  const { t } = useTranslation();

  function handleCancel() {
    if (onCancel) {
      onCancel();
    }
    onClose();
  }

  function handleConfirm() {
    onConfirm();
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={size ?? "sm"}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Button onClick={onClear}>{t("buttons:clean_filters")}</Button>
        </Box>
        <Box>
          <Button onClick={handleCancel}>{t("buttons:cancel")}</Button>
          <Button onClick={handleConfirm}>{t("buttons:filter")}</Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
