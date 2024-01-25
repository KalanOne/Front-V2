import { Box, Typography } from "@mui/material";

import { TireIcon } from "../customIcons/TireIcon";

export { IconPill };

interface IconPillProps {
  icon?: React.ReactNode;
  text1: string;
  text2: string;
  title?: string;
}

function IconPill({ icon, text1, text2, title }: IconPillProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {icon || <TireIcon color="white" />}
      <Typography
        variant="subtitle2"
        marginLeft={1}
        marginRight={1}
        color={"white"}
        sx={{
          filter: "drop-shadow(0.12em 0.12em 0.15em rgb(21, 21, 24))",
        }}
      >
        {title}
      </Typography>
      <Box
        component={"span"}
        sx={{
          marginLeft: "6px",
          color: "white",
          backgroundColor: "#44627a",
          borderRadius: "12px 0px 0px 12px",
          border: "2px solid rgb(243, 243, 243)",
          padding: "2px 8px",
          fontSize: "0.85rem",
        }}
      >
        <Typography variant="body2" fontSize={12}>
          {text1}
        </Typography>
      </Box>
      <Box
        component={"span"}
        sx={{
          color: "white",
          backgroundColor: "#4181af",
          borderRadius: "0px 12px 12px 0px",
          border: "2px solid rgb(243, 243, 243)",
          borderLeftWidth: "0px",
          padding: "2px 8px",
          fontSize: "0.85rem",
        }}
      >
        <Typography variant="body2" fontSize={12}>
          {text2}
        </Typography>
      </Box>
    </Box>
  );
}
