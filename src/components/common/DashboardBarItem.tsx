import React from "react";

import { Box, Typography } from "@mui/material";

export { DashboardBarItem };

interface DashboardBarItemProps {
  title: string;
  isActive: boolean;
  icon?: React.ReactElement;
  pill?: number;
  onClick?: () => void;
}

function DashboardBarItem({
  title,
  isActive,
  icon,
  pill,
  onClick,
}: DashboardBarItemProps): React.ReactElement {
  return (
    <Box
      onClick={onClick}
      sx={{
        color: "white",
        fontSize: "1.5rem",
        padding: "0.25rem 0.5rem",
        borderRadius: "0.25rem",
        backgroundColor: isActive ? "#3f7c9d" : "#343a40",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        flexWrap: "wrap",
        "&:hover": {
          backgroundColor: "#44627a",
          cursor: "pointer",
        },
      }}
    >
      {icon && icon}
      <Typography variant="h6">{title}</Typography>
      {pill && (
        <Box
          component={"span"}
          sx={{
            color: "#212529",
            backgroundColor: "#f8f9fa",
            paddingRight: "0.6em",
            paddingLeft: "0.6em",
            borderRadius: "10rem",
            display: "inline-block",
            padding: "0.1em 0.4em",
            paddingBottom: "0.07em",
            fontSize: "75%",
            fontWeight: "700",
            lineHeight: 1,
            textAlign: "center",
            whiteSpace: "nowrap",
            verticalAlign: "baseline",
            transition:
              "color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight={"bold"}
            sx={{ padding: 0, margin: 0 }}
          >
            {pill}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
