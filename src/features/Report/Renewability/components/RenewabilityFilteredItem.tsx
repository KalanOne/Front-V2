import { Box, Typography } from "@mui/material";

export { RenewabilityFilteredItem };

interface RenewabilityFilteredItemProps {
  title: string;
  value: string;
}
function RenewabilityFilteredItem({
  title,
  value,
}: RenewabilityFilteredItemProps) {
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Box
        sx={{
          fontWeight: "bold",
          fontSize: 16,
          width: "30%",
          height: "100%",
          margin: 0,
          paddingY: 1.5,
          backgroundColor: "#4d7aff",
          textAlign: "end",
          paddingX: 2,
          borderTop: "1px solid #fff",
        }}
      >
        <Typography variant="subtitle1" color={"#fff"}>
          {title}:
        </Typography>
      </Box>
      <Box
        sx={{
          fontWeight: "bold",
          fontSize: 16,
          width: "80%",
          height: "100%",
          margin: 0,
          paddingY: 1.5,
          borderTop: "1px solid #dee2e6",
          paddingX: 2,
        }}
      >
        <Typography variant="subtitle1" color={"#000"}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
}
