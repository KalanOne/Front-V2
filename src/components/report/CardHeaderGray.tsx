import { Box, Typography } from "@mui/material";

export { CardHeaderGray };

interface CardHeaderGrayProps {
  title: string;
  children?: React.ReactNode;
}

function CardHeaderGray({ title, children }: CardHeaderGrayProps) {
  return (
    <Box
      sx={{
        backgroundColor: "#343a40",
        padding: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        gap: 1,
      }}
    >
      <Typography variant="h5" sx={{ color: "white" }}>
        {title}
      </Typography>
      {children}
    </Box>
  );
}
