import { Box, Container } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

import { useTranslation } from "react-i18next";

import { FilteredItem } from "src/components/report/FilteredItem";

import { AlertsPanelFilterSchemaType } from "../validation/filterAlertsPanel";

export { AlertsPanelFilters };

interface AlertsPanelFiltersProps {
  selectedFilters: Partial<Record<keyof AlertsPanelFilterSchemaType, string>>;
}

function AlertsPanelFilters({ selectedFilters }: AlertsPanelFiltersProps) {
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
            {selectedFilters.ranking_alert && (
              <FilteredItem
                title={t("labels:ranking_alert.label")}
                value={selectedFilters.ranking_alert}
              />
            )}
            {selectedFilters.priority && (
              <FilteredItem
                title={t("labels:priority.label")}
                value={selectedFilters.priority}
              />
            )}
            {selectedFilters.alert_codes && (
              <FilteredItem
                title={t("common:alert_plural")}
                value={selectedFilters.alert_codes}
              />
            )}
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  );
}
