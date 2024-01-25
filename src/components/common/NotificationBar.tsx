import React, { useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";

import { useNotification } from "src/stores/general/notification.ts";
import type { Notification } from "src/stores/general/notification.ts";

export { NotificationBar };

function NotificationBar(): React.ReactElement {
  const notifications = useNotification((state) => state.notifications);
  const popNotification = useNotification((state) => state.popNotification);
  const [open, setOpen] = useState(false);
  const [currentNotification, setCurrentNotification] = useState<
    Notification | undefined
  >();

  useEffect(() => {
    if (notifications.length && !currentNotification) {
      setCurrentNotification({ ...notifications[0] });
      popNotification();
      setOpen(true);
    } else if (notifications.length && currentNotification && open) {
      setOpen(false);
    }
  }, [notifications, currentNotification, open]);

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setCurrentNotification(undefined);
  };

  return (
    <Snackbar
      key={currentNotification ? currentNotification.key : undefined}
      open={open}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      onClose={handleClose}
      TransitionProps={{ onExited: handleExited }}
      message={currentNotification ? currentNotification.message : undefined}
      action={
        <React.Fragment>
          {currentNotification?.action && (
            <Button
              color="primary"
              size="small"
              onClick={() => {
                currentNotification.action?.onClick();
                setOpen(false);
              }}
              style={{ marginRight: "16px" }}
            >
              {currentNotification?.action.label}
            </Button>
          )}
          <IconButton
            aria-label="close"
            color="inherit"
            sx={{ p: 0.5 }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </React.Fragment>
      }
    />
  );
}
