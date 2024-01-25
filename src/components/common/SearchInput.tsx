import React, { useState } from "react";

import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { Box, IconButton, InputAdornment, InputBase } from "@mui/material";

export { SearchInput };

interface SearchInputProps {
  search: (value: string) => void;
}

function SearchInput({ search }: SearchInputProps): React.ReactElement {
  const [value, setValue] = useState("");

  return (
    <Box>
      <InputBase
        sx={{
          color: value ? "black" : "white",
          backgroundColor: value ? "white" : "#4EACDF",
          p: 0.5,
          borderRadius: 1,
        }}
        placeholder={"Search"}
        value={value}
        onKeyDown={(ev) => {
          if (ev.key === "Enter") {
            search(value);
          }
        }}
        onChange={(e) => setValue(e.target.value)}
        startAdornment={
          <InputAdornment position={"start"}>
            <IconButton onClick={() => search(value)} disableRipple>
              <SearchIcon sx={{ color: value ? "black" : "white" }} />
            </IconButton>
          </InputAdornment>
        }
        endAdornment={
          value.trim() && (
            <InputAdornment position={"end"}>
              <IconButton
                onClick={() => {
                  setValue("");
                  search("");
                }}
                disableRipple
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          )
        }
      />
    </Box>
  );
}
