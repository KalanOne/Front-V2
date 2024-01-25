import React from "react";

import { Pagination, Stack } from "@mui/material";

export { CustomPagination };

interface CustomPaginationProps {
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
  totalPages: number;
}

function CustomPagination({
  page,
  onChange,
  totalPages,
}: CustomPaginationProps): React.ReactElement {
  return (
    <Stack
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ mt: 8 }}
    >
      <Pagination
        page={page}
        onChange={onChange}
        count={totalPages}
        color="primary"
        showFirstButton
        showLastButton
        hidePrevButton
        hideNextButton
      />
    </Stack>
  );
}
