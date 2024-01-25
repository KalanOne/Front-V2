import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Box } from "@mui/material";

export { OrderedTableCell };

interface OrderedTableCellProps {
  label: string;
  onClick: () => void;
  arrowState: string;
}

function OrderedTableCell({
  label,
  onClick,
  arrowState = "none",
}: OrderedTableCellProps): React.ReactElement {
  return (
    <>
      <Box
        onClick={onClick}
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          cursor: "pointer",
          "&:hover": {
            color: "#a2a6a7",
            textDecoration: "underline",
          },
        }}
      >
        {arrowState === "ASC" && <ArrowDropUpIcon />}
        {arrowState === "DESC" && <ArrowDropDownIcon />}
        {label}
      </Box>
    </>
  );
}
