import { Box } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

import { useTranslation } from "react-i18next";

import { FilteredItem } from "src/components/report/FilteredItem";

import { KmPileFilterSchemaType } from "../validation/filterKmPile";

export { KmPileFilters };

interface KmPileFiltersProps {
  selectedFilters: Partial<Record<keyof KmPileFilterSchemaType, string>>;
}

function KmPileFilters({ selectedFilters }: KmPileFiltersProps) {
  const { t } = useTranslation();

  return (
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
          {selectedFilters.brands && (
            <FilteredItem
              title={t("common:brand")}
              value={selectedFilters.brands}
            />
          )}
          {selectedFilters.models && (
            <FilteredItem
              title={t("common:model")}
              value={selectedFilters.models}
            />
          )}
          {selectedFilters.sizes && (
            <FilteredItem
              title={t("common:size")}
              value={selectedFilters.sizes}
            />
          )}
          {selectedFilters.tire_application && (
            <FilteredItem
              title={t("labels:application")}
              value={selectedFilters.tire_application}
            />
          )}
          {selectedFilters.tire_condition && (
            <FilteredItem
              title={t("labels:condition")}
              value={selectedFilters.tire_condition}
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
          {selectedFilters.price && (
            <FilteredItem
              title={t("labels:price")}
              value={selectedFilters.price}
            />
          )}
          {selectedFilters.helmet_value && (
            <FilteredItem
              title={t("labels:helmet_value")}
              value={selectedFilters.helmet_value}
            />
          )}
        </Grid2>
      </Grid2>
    </Box>
  );
}
