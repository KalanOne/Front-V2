import { useEffect, useState } from "react";

import FilterListIcon from "@mui/icons-material/FilterList";
import { Box, Container, IconButton, Stack } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { BaseContainer } from "src/components/common/BaseContainer";
import { CustomPagination } from "src/components/common/CustomPagination";
import { Portal } from "src/components/common/Portal";
import { BaseFilterModal } from "src/components/modal/BaseFilterModal";
import { useCrud, useCrudQuery } from "src/hooks/crud";
import { removeUndefined } from "src/utils/object.ts";

import { getRenewabilities } from "../api/renewabilityApi";
import { useRenewabilityDependencies } from "../hooks/dependencies.tsx";
import { RenewabilityResponse } from "../types/renewabilityTypes";
import {
  RenewabilityFilterSchemaType,
  renewabilityFilterDefaultValues,
  renewabilityFilterSchema,
} from "../validation/filterRenewability";
import { RenewabilityFilterForm } from "./RenewabilityFilterForm";
import { RenewabilityFilteredItem } from "./RenewabilityFilteredItem.tsx";
import { RenewabilityTable } from "./RenewabilityTable";
import { RenewabilityTitle } from "./RenewabilityTitle";

export { Renewability };

function Renewability() {
  const { t } = useTranslation();

  const [localFilters, setLocalFilters] = useState({
    sort: "index",
    order: "DESC",
  });

  const [selectedFilters, setSelectedFilters] = useState<
    Partial<RenewabilityFilterSchemaType>
  >({
    subsidiaries: "",
    companies: "",
    corporate_id: "",
    models: "",
    brands: "",
    sizes: "",
  });

  const crud = useCrud<RenewabilityResponse>();

  useEffect(() => {
    const newSearchParams = new URLSearchParams(crud.filters);
    newSearchParams.append("sort_by", localFilters.sort);
    newSearchParams.append("order", localFilters.order);
    crud.setFilters(newSearchParams);
  }, [localFilters]);

  const renewabilityQuery = useCrudQuery({
    apiFunction: getRenewabilities,
    name: "renewabilities",
    page: crud.page,
    search: crud.search,
    filters: crud.filters,
    keepPrevious: true,
  });

  const renewability = renewabilityQuery.data?.data ?? [];

  const handleOrderChange = (sort_by: string, order: string) => {
    setLocalFilters({
      sort: sort_by,
      order: order,
    });
  };

  const renewabilityFilterForm = useForm({
    defaultValues: renewabilityFilterDefaultValues,
    resolver: zodResolver(renewabilityFilterSchema),
  });

  const [corporate_id, companies, brands, models, sizes, subsidiaries] =
    useWatch({
      control: renewabilityFilterForm.control,
      name: [
        "corporate_id",
        "companies",
        "brands",
        "models",
        "sizes",
        "subsidiaries",
      ],
    });

  const dependencies = useRenewabilityDependencies({
    corporate_id: corporate_id,
    company: companies,
    brand: brands,
  });

  function onFilter(data: RenewabilityFilterSchemaType) {
    const searchParams = new URLSearchParams();
    const newSelectedFilters: Partial<RenewabilityFilterSchemaType> = {};
    if (data.subsidiaries) {
      searchParams.append("subsidiaries", data.subsidiaries);
      const subsidiary = dependencies.subsidiaries.find(
        (s) => `${s.subsidiary_id}` === `${subsidiaries}`,
      );
      newSelectedFilters["subsidiaries"] = subsidiary?.name;
    }
    if (data.companies) {
      searchParams.append("companies", data.companies);
      const company = dependencies.companies.find(
        (c) => `${c.company_id}` === `${companies}`,
      );
      newSelectedFilters["companies"] = company?.name;
    }
    if (data.corporate_id) {
      searchParams.append("corporate_id", data.corporate_id);
      const corporate = dependencies.corporates.find(
        (c) => `${c.corporate_id}` === `${corporate_id}`,
      );
      newSelectedFilters["corporate_id"] = corporate?.name;
    }
    if (data.models) {
      searchParams.append("models", data.models);
      const model = dependencies.models.find(
        (m) => `${m.tire_model_id}` === `${models}`,
      );
      newSelectedFilters["models"] = model?.tire_model.name;
    }
    if (data.brands) {
      searchParams.append("brands", data.brands);
      const brand = dependencies.brands.find(
        (b) => `${b.brand_id}` === `${brands}`,
      );
      newSelectedFilters["brands"] = brand?.name;
    }
    if (data.sizes) {
      searchParams.append("sizes", data.sizes);
      const size = dependencies.sizes.find(
        (s) => `${s.tire_size_id}` === `${sizes}`,
      );
      newSelectedFilters["sizes"] = size?.size;
    }
    removeUndefined(newSelectedFilters);
    setSelectedFilters(newSelectedFilters);
    searchParams.set("sort_by", localFilters.sort);
    searchParams.set("order", localFilters.order);
    crud.setFilters(searchParams);
  }

  return (
    <>
      <BaseFilterModal
        open={crud.filterModalOpen}
        title={"Filtro"}
        onClose={() => crud.setFilterModalOpen(false)}
        onConfirm={renewabilityFilterForm.handleSubmit(async (data) => {
          onFilter(data);
        })}
        onClear={() => {
          renewabilityFilterForm.reset();
          const initialSearchParams = new URLSearchParams();
          initialSearchParams.append("sort_by", localFilters.sort);
          initialSearchParams.append("order", localFilters.order);
          setSelectedFilters({});
          crud.setFilters(initialSearchParams);
        }}
      >
        <RenewabilityFilterForm
          form={renewabilityFilterForm}
          dependencies={dependencies}
        />
      </BaseFilterModal>
      <BaseContainer title={t("Índice de renovabilidad")}>
        {Object.keys(selectedFilters).length > 0 && (
          <Container maxWidth="xl" sx={{ mt: 3 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid2 container spacing={2}>
                <Grid2 xs={12} md={6}>
                  {selectedFilters.corporate_id &&
                    selectedFilters.corporate_id !== "" && (
                      <RenewabilityFilteredItem
                        title={t("common:corporate")}
                        value={selectedFilters.corporate_id}
                      />
                    )}
                  {selectedFilters.companies &&
                    selectedFilters.companies !== "" && (
                      <RenewabilityFilteredItem
                        title={t("common:company")}
                        value={selectedFilters.companies}
                      />
                    )}
                  {selectedFilters.subsidiaries &&
                    selectedFilters.subsidiaries !== "" && (
                      <RenewabilityFilteredItem
                        title={t("common:subsidiary")}
                        value={selectedFilters.subsidiaries}
                      />
                    )}
                </Grid2>
                <Grid2 xs={12} md={6}>
                  {selectedFilters.brands && selectedFilters.brands !== "" && (
                    <RenewabilityFilteredItem
                      title={t("common:brand")}
                      value={selectedFilters.brands}
                    />
                  )}
                  {selectedFilters.models && selectedFilters.models !== "" && (
                    <RenewabilityFilteredItem
                      title={t("common:model")}
                      value={selectedFilters.models}
                    />
                  )}
                  {selectedFilters.sizes && selectedFilters.sizes !== "" && (
                    <RenewabilityFilteredItem
                      title={t("common:size")}
                      value={selectedFilters.sizes}
                    />
                  )}
                </Grid2>
              </Grid2>
            </Box>
          </Container>
        )}
        <RenewabilityTitle />
        <Container maxWidth="xl">
          <RenewabilityTable
            renewability={renewability}
            handleOrderChange={handleOrderChange}
          />
          <CustomPagination
            page={crud.page}
            onChange={(_event, page) => crud.setPage(page)}
            totalPages={renewabilityQuery.data?.last_page ?? 1}
          />
          <Portal elementId={"navbarPortal"}>
            <Stack direction={"row"} alignItems={"center"}>
              <IconButton
                sx={{ mr: 2 }}
                onClick={() => crud.setFilterModalOpen(true)}
              >
                <FilterListIcon sx={{ color: "white" }} />
              </IconButton>
            </Stack>
          </Portal>
        </Container>
      </BaseContainer>
    </>
  );
}
