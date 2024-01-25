import { Box, Container } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

import { useTranslation } from "react-i18next";

import { FilteredItem } from "src/components/report/FilteredItem";

import { WareHouseReportFilterSchemaType } from "../validation/filterForm";

export { WareHouseReportFilters };

interface WareHouseReportFiltersProps {
  selectedFilters: Partial<
    Record<keyof WareHouseReportFilterSchemaType, string>
  >;
}

function WareHouseReportFilters({
  selectedFilters,
}: WareHouseReportFiltersProps) {
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
            {selectedFilters.company_id && (
              <FilteredItem
                title={t("common:company")}
                value={selectedFilters.company_id}
              />
            )}
            {selectedFilters.subsidiary_id && (
              <FilteredItem
                title={t("common:subsidiary")}
                value={selectedFilters.subsidiary_id}
              />
            )}
            {selectedFilters.warehouse_id && (
              <FilteredItem
                title={t("common:warehouse")}
                value={selectedFilters.warehouse_id}
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
            {selectedFilters.tire_model_variation_id && (
              <FilteredItem
                title={t("labels:tire_model_variation.label")}
                value={selectedFilters.tire_model_variation_id}
              />
            )}
            {selectedFilters.brandRetread_id && (
              <FilteredItem
                title={t("labels:revitalized_brand_field.label")}
                value={selectedFilters.brandRetread_id}
              />
            )}
            {selectedFilters.modelRevitalized_id && (
              <FilteredItem
                title={t("labels:revitalized_tire_model_field.label")}
                value={selectedFilters.modelRevitalized_id}
              />
            )}
            {selectedFilters.tire_application && (
              <FilteredItem
                title={t("labels:application")}
                value={selectedFilters.tire_application}
              />
            )}
            {selectedFilters.condition && (
              <FilteredItem
                title={t("labels:condition")}
                value={selectedFilters.condition}
              />
            )}
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
        </Grid2>
      </Box>
    </Container>
  );
}
