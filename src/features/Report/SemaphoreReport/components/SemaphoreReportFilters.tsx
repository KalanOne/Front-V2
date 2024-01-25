import { Box, Container } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

import { useTranslation } from "react-i18next";

import { FilteredItem } from "src/components/report/FilteredItem";

import { SemaphoreFilterSchemaType } from "../validation/filterForm";

export { SemaphoreReportFilters };

interface SemaphoreReportFiltersProps {
  selectedFilters: Partial<Record<keyof SemaphoreFilterSchemaType, string>>;
}

function SemaphoreReportFilters({
  selectedFilters,
}: SemaphoreReportFiltersProps) {
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
