import { Box, Container } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

import { useTranslation } from "react-i18next";

import { FilteredItem } from "src/components/report/FilteredItem";

import { DynamicCostFilterSchemaType } from "../validation/filterForm";

export { DynamicCostFilters };

interface DynamicCostFiltersProps {
  selectedFilters: Partial<Record<keyof DynamicCostFilterSchemaType, string>>;
}

function DynamicCostFilters({ selectedFilters }: DynamicCostFiltersProps) {
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
          <Grid2 xs={12} md={6}>
            {selectedFilters.dateTo && (
              <FilteredItem
                title={t("labels:date.to")}
                value={selectedFilters.dateTo}
              />
            )}
            {selectedFilters.dateFrom && (
              <FilteredItem
                title={t("labels:date.from")}
                value={selectedFilters.dateFrom}
              />
            )}
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  );
}
