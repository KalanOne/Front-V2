import React from "react";

import {
  Box,
  TableCell,
  TableCellProps,
  TableRow,
  TableRowProps,
  styled,
} from "@mui/material";

export {
  AccordionTableRow,
  AccordionTableHeader,
  TableTitleLvl1,
  AccordionTableCell,
  AccordionTableCellBlack,
};

interface AccordionTableRowProps extends TableRowProps {
  level: string;
}

interface AccordionTableHeaderProps extends TableCellProps {
  level: string;
  isDark?: boolean;
}

function getAccordionTableRowStyles(level: string) {
  switch (level) {
    case "1":
      return {
        backgroundColor: "#002849",
        display: "flex",
        flexDirection: "row",
        "&:hover": {
          backgroundColor: "#254763",
          cursor: "pointer",
        },
      };
    case "2":
      return {
        backgroundColor: "#005397",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        "&:hover": {
          backgroundColor: "#256ca5",
          cursor: "pointer",
        },
      };
    case "3":
      return {
        backgroundColor: "#0077cc",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        "&:hover": {
          backgroundColor: "#3291d5",
          cursor: "pointer",
        },
      };
    case "4":
      return {
        backgroundColor: "#0095ff",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        "&:hover": {
          backgroundColor: "#32a9fe",
          cursor: "pointer",
        },
      };
    case "5":
      return {
        backgroundColor: "#6fa9d8",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        "&:hover": {
          backgroundColor: "#7BB7E8",
          cursor: "pointer",
        },
      };
    case "6":
      return {
        backgroundColor: "#bbe0fa",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        "&:hover": {
          backgroundColor: "#c8e5fa",
          cursor: "pointer",
        },
      };
    case "7":
      return {
        backgroundColor: "#bbcac9",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        "&:hover": {
          backgroundColor: "#b0bdbd",
          cursor: "pointer",
        },
      };
    case "8":
      return {
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        "&:hover": {
          backgroundColor: "#f2f7f8",
          cursor: "pointer",
        },
      };
    case "CRITICAL":
      return {
        backgroundColor: "#ffecec",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        "&:hover": {
          backgroundColor: "#ffd8d8",
          cursor: "pointer",
        },
      };
    case "SCHEDULED":
      return {
        backgroundColor: "#fff8df",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        "&:hover": {
          backgroundColor: "#fff3c8",
          cursor: "pointer",
        },
      };
    case "GOOD":
      return {
        backgroundColor: "#dfffe8",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        "&:hover": {
          backgroundColor: "#cbffd9",
          cursor: "pointer",
        },
      };
    case "OTHER":
      return {
        backgroundColor: "#828282",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        "&:hover": {
          backgroundColor: "#282828",
          cursor: "pointer",
        },
      };
    case "RESPONSIBLE":
      return {
        backgroundColor: "rgb(237, 245, 250)",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        "&:hover": {
          backgroundColor: "#E1E8EC",
          cursor: "pointer",
        },
      };

    default:
      return {
        backgroundColor: "#343a40",
        width: "100%",
        display: "flex",
        gap: "0.5rem",
        padding: "0.25rem",
        borderRadius: "0.25rem",
      };
  }
}

function getAccordionTableHeaderTitleStyles(level: string) {
  switch (level) {
    case "1":
      return {
        color: "white",
        fontSize: "1.2rem",
        fontWeight: "bold",
        flex: 1,
      };
    case "2":
      return {
        color: "white",
        fontSize: "1.1rem",
        fontWeight: "bold",
        flex: 1,
      };
    case "3":
      return {
        color: "white",
        fontSize: "1rem",
        fontWeight: "bold",
        flex: 1,
      };
    case "4":
      return {
        color: "white",
        fontSize: "0.95rem",
        fontWeight: "bold",
        flex: 1,
      };
    case "5":
      return {
        color: "black",
        fontSize: "0.93rem",
        fontWeight: "bold",
        flex: 1,
      };
    case "6":
      return {
        color: "black",
        fontSize: "0.91rem",
        fontWeight: "bold",
        flex: 1,
      };
    case "7":
      return {
        color: "black",
        fontSize: "0.89rem",
        fontWeight: "bold",
        flex: 1,
      };
    case "8":
      return {
        color: "black",
        fontSize: "0.89rem",
        fontWeight: "bold",
        flex: 1,
      };
    case "CRITICAL":
      return {
        color: "black",
        fontSize: "0.91rem",
        fontWeight: "bold",
        flex: 1,
      };
    case "SCHEDULED":
      return {
        color: "black",
        fontSize: "0.91rem",
        fontWeight: "bold",
        flex: 1,
      };
    case "GOOD":
      return {
        color: "black",
        fontSize: "0.91rem",
        fontWeight: "bold",
        flex: 1,
      };
    case "OTHER":
      return {
        color: "white",
        fontSize: "0.91rem",
        fontWeight: "bold",
        flex: 1,
      };
    case "RESPONSIBLE":
      return {
        color: "black",
        fontSize: "1.1rem",
        fontWeight: "bold",
        flex: 1,
        textAlign: "center",
      };
    default:
      return {
        color: "white",
        fontSize: "1.2rem",
        fontWeight: "bold",
        flex: 1,
      };
  }
}

function AccordionTableRow({
  level,
  sx,
  ...props
}: AccordionTableRowProps): React.ReactElement {
  const style = getAccordionTableRowStyles(level);
  return (
    <TableRow {...props} sx={[style, ...(Array.isArray(sx) ? sx : [sx])]} />
  );
}

interface AccordionTableCellProps extends TableCellProps {}

function AccordionTableCell({
  sx,
  ...props
}: AccordionTableCellProps): React.ReactElement {
  const style = {
    color: "white",
    fontSize: "0.91rem",
    width: "120px",
    textAlign: "right",
    fontWeight: "bold",
  };
  return (
    <TableCell {...props} sx={[style, ...(Array.isArray(sx) ? sx : [sx])]} />
  );
}

interface AccordionTableCellBlackProps extends TableCellProps {}

function AccordionTableCellBlack({
  sx,
  ...props
}: AccordionTableCellBlackProps): React.ReactElement {
  const style = {
    color: "black",
    fontSize: "0.91rem",
    width: "120px",
    textAlign: "right",
    fontWeight: "bold",
  };
  return (
    <TableCell {...props} sx={[style, ...(Array.isArray(sx) ? sx : [sx])]} />
  );
}

function AccordionTableHeader({
  level,
  sx,
  isDark = false,
  ...props
}: AccordionTableHeaderProps): React.ReactElement {
  const style = getAccordionTableHeaderTitleStyles(level);
  if (isDark) {
    style.color = "#444444";
  }
  return (
    <TableCell {...props} sx={[style, ...(Array.isArray(sx) ? sx : [sx])]} />
  );
}

const TableHeaderLvl1Title = styled(TableCell)({
  color: "white",
  fontSize: "0.91rem",
  width: "120px",
  textAlign: "right",
});

interface TableTitleLvl1Props {
  title: string;
  value: string;
  isDark?: boolean;
}

const TableTitleLvl1 = ({
  title,
  value,
  isDark = false,
}: TableTitleLvl1Props) => {
  return (
    <TableHeaderLvl1Title sx={[isDark ? { color: "#444444" } : null]}>
      <Box>
        <Box component={"p"} sx={{ margin: 0 }}>
          {title}
        </Box>
        <Box component={"p"} sx={{ margin: 0, fontWeight: "bold" }}>
          {value}
        </Box>
      </Box>
    </TableHeaderLvl1Title>
  );
};
