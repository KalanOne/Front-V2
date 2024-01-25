import StoreIcon from "@mui/icons-material/Store";
import { Box, Typography } from "@mui/material";

export { CardReportItem };

interface CardReportItemProps {
  title: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  children?: React.ReactNode;
}

function CardReportItem({
  title,
  icon,
  onClick,
  children,
}: CardReportItemProps) {
  return (
    <Box
      sx={{
        padding: "12px 12px",
        borderRadius: "20px",
        color: "white",
        backgroundColor: "rgb(0, 40, 73, 0.92)",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "8px",
        "&:hover": {
          cursor: "pointer",
          backgroundColor: "rgba(0, 40, 73, 0.85)",
        },
      }}
      onClick={onClick}
    >
      <Box
        component={"span"}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          filter: "drop-shadow(0.12em 0.12em 0.15em rgb(21, 21, 24))",
          fontSize: "0.85rem",
        }}
      >
        {icon || <StoreIcon />}
        <Typography variant="body2">{title}</Typography>
      </Box>
      <Box
        className="w-100 d-flex justify-content-between align-items-center"
        style={{ gap: "6px" }}
        sx={{
          width: "100%",
          display: "flex",
          gap: "6px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
