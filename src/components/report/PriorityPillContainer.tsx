import { Box } from "@mui/material";

interface PriorityPillContainerProps {
  priority: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export { PriorityPillContainer };

function PriorityPillContainer({
  priority,
  children,
  onClick,
}: PriorityPillContainerProps) {
  return (
    <Box
      sx={[
        {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "fit-content",
          margin: "4px",
          padding: "6px 10px",
          borderRadius: "16px",
          color: "white",
          cursor: "pointer",
          gap: "8px",
        },
        priority === "HIGH" && {
          backgroundColor: "rgba(255, 0, 0, 0.65)",
          border: "1px solid rgba(255, 0, 0, 1)",
          "&:hover": {
            backgroundColor: "rgba(255, 0, 0, 0.85)",
          },
        },
        priority === "HALF" && {
          backgroundColor: "rgba(250, 175, 0, 0.65)",
          border: "1px solid rgba(250, 175, 0, 1)",
          "&:hover": {
            backgroundColor: "rgba(250, 175, 0, 0.85)",
          },
        },
        priority === "LOW" && {
          backgroundColor: "rgba(0, 128, 40, 0.65)",
          border: "1px solid rgba(0, 128, 40, 1)",
          "&:hover": {
            backgroundColor: "rgba(0, 128, 40, 0.85)",
          },
        },
      ]}
      onClick={onClick}
    >
      {children}
    </Box>
  );
}
