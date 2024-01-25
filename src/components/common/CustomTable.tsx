import { TableCell, styled } from "@mui/material";

export {
  TableHeaderCell,
  TableBodyCell,
  TableCellIcon,
  TableHeaderCellGray,
  TableHeaderCellBlack,
  TableHeaderCellBlue,
  TableHeaderCellLightGray,
};

const TableHeaderCell = styled(TableCell)({
  backgroundColor: "#4eacdf",
  color: "white",
  fontSize: "0.95rem",
  textAlign: "center",
});

const TableBodyCell = styled(TableCell)({
  textAlign: "center",
  paddingTop: "8px",
  paddingBottom: "8px",
});

const TableCellIcon = styled(TableCell)({
  textAlign: "center",
  paddingTop: "8px",
  paddingBottom: "8px",
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
});

const TableHeaderCellGray = styled(TableCell)({
  backgroundColor: "#696969",
  color: "white",
  fontSize: "1rem",
  textAlign: "center",
});

const TableHeaderCellLightGray = styled(TableCell)({
  backgroundColor: "#d3d3d3",
  color: "black",
  fontSize: "1rem",
  textAlign: "center",
});

const TableHeaderCellBlack = styled(TableCell)({
  backgroundColor: "#343a40",
  color: "white",
  fontSize: "1rem",
  textAlign: "center",
});

const TableHeaderCellBlue = styled(TableCell)({
  backgroundColor: "#002849",
  color: "white",
  fontSize: "1rem",
  textAlign: "center",
});
