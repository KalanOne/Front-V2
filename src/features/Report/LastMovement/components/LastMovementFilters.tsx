import { Box, Container } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

import { useTranslation } from "react-i18next";

import { FilteredItem } from "src/components/report/FilteredItem";

import { LastMovementFilterSchemaType } from "../validation/filterForm";

export { LastMovementFilters };

interface LastMovementFiltersProps {
  selectedFilters: Partial<Record<keyof LastMovementFilterSchemaType, string>>;
}

function LastMovementFilters({ selectedFilters }: LastMovementFiltersProps) {
  const { t } = useTranslation();

  return (
    <Container maxWidth="xl" sx={{ mt: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid2 container spacing={2}>
          <Grid2 xs={12} md={6}>
            {selectedFilters.corporate_id && (
              <FilteredItem
                title={t("common:corporate")}
                value={selectedFilters.corporate_id}
              />
            )}
            {selectedFilters.companies && (
              <FilteredItem
                title={t("common:company")}
                value={selectedFilters.companies}
              />
            )}
            {selectedFilters.subsidiaries && (
              <FilteredItem
                title={t("common:subsidiary")}
                value={selectedFilters.subsidiaries}
              />
            )}
            {selectedFilters.brand_id && (
              <FilteredItem
                title={t("common:brand")}
                value={selectedFilters.brand_id}
              />
            )}
            {selectedFilters.model_id && (
              <FilteredItem
                title={t("common:model")}
                value={selectedFilters.model_id}
              />
            )}
            {selectedFilters.size_id && (
              <FilteredItem
                title={t("common:size")}
                value={selectedFilters.size_id}
              />
            )}
          </Grid2>
        </Grid2>
        <Grid2 xs={12} md={6}>
          {selectedFilters.dateTo && (
            <FilteredItem
              title={"labels:date.to"}
              value={selectedFilters.dateTo}
            />
          )}
          {selectedFilters.dateTo && (
            <FilteredItem
              title={"labels:date.from"}
              value={selectedFilters.dateTo}
            />
          )}
        </Grid2>
      </Box>
    </Container>
  );
}
