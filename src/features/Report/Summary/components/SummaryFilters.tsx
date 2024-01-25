import { Box } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

import { useTranslation } from "react-i18next";

import { FilteredItem } from "src/components/report/FilteredItem";

import { SummaryFilterSchemaType } from "../validation/filterSummary";

export { SummaryFilters };

interface SummaryFiltersProps {
  selectedFilters: Partial<Record<keyof SummaryFilterSchemaType, string>>;
}

function SummaryFilters({ selectedFilters }: SummaryFiltersProps) {
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
          {selectedFilters.movement && (
            <FilteredItem
              title={t("labels:location.label")}
              value={selectedFilters.movement}
            />
          )}
          {selectedFilters.pressure_condition && (
            <FilteredItem
              title={t("labels2:pressure_rating")}
              value={selectedFilters.pressure_condition}
            />
          )}
          {selectedFilters.depth_condition && (
            <FilteredItem
              title={t("labels2:depth_rating")}
              value={selectedFilters.depth_condition}
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
          {selectedFilters.activity && (
            <FilteredItem
              title={t("labels:activity.label")}
              value={selectedFilters.activity}
            />
          )}
          {selectedFilters.review_type && (
            <FilteredItem
              title={t("labels:review_type.label")}
              value={selectedFilters.review_type}
            />
          )}
          {selectedFilters.with_refection && (
            <FilteredItem
              title={t("labels2:show_refection")}
              value={selectedFilters.with_refection}
            />
          )}
          {selectedFilters.number_cycle && (
            <FilteredItem
              title={t("labels:number_cycle")}
              value={selectedFilters.number_cycle}
            />
          )}
        </Grid2>
      </Grid2>
    </Box>
  );
}
