import { Box, Container } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

import { useTranslation } from "react-i18next";

import { FilteredItem } from "src/components/report/FilteredItem";

import { DismountedTireFilterSchemaType } from "../validation/filterDismountedTire";

export { DismountedTireFilters };

interface DismountedTireFiltersProps {
  selectedFilters: Partial<
    Record<keyof DismountedTireFilterSchemaType, string>
  >;
}

function DismountedTireFilters({
  selectedFilters,
}: DismountedTireFiltersProps) {
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
          </Grid2>
          <Grid2 xs={12} md={6}>
            {selectedFilters.date_from && (
              <FilteredItem title={"Desde"} value={selectedFilters.date_from} />
            )}
            {selectedFilters.date_to && (
              <FilteredItem title={"Hasta"} value={selectedFilters.date_to} />
            )}
            {selectedFilters.warehouses && (
              <FilteredItem
                title={t("general:warehouses")}
                value={selectedFilters.warehouses}
              />
            )}
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  );
}
