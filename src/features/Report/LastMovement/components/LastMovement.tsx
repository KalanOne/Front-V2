import React, { useEffect, useState } from "react";

import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Container,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { BaseContainer } from "src/components/common/BaseContainer";
import { CustomButton } from "src/components/common/CustomButton";
import { Portal } from "src/components/common/Portal";
import { BaseFilterModal } from "src/components/modal/BaseFilterModal";
import { useFilterDependencies } from "src/hooks/dependencies";
import { useProgressQuery } from "src/hooks/progress";
import { useIdentity } from "src/stores/general/identity";
import {
  getCompanyViaWorkArea,
  getCorporateViaWorkArea,
  getSubsidiaryViaWorkArea,
} from "src/utils/workArea";

import { getMovements } from "../api/lastMovementApi";
import {
  LastMovementFilterInputType,
  LastMovementFilterSchemaType,
  lastMovementFilterDefaultValues,
  lastMovementFilterSchema,
} from "../validation/filterForm";
import { LastMovementFilterForm } from "./LastMovementFilterForm";
import { LastMovementFilters } from "./LastMovementFilters";
import { LastMovementTable } from "./LastMovementTable";

export { LastMovement };

function LastMovement(): React.ReactElement {
  const { t } = useTranslation();
  const account = useIdentity((state) => state.account);
  const workArea = useIdentity((state) => state.workArea);
  const profileCorporate = getCorporateViaWorkArea(account, workArea);
  const profileCompanies = getCompanyViaWorkArea(account, workArea);
  const profileSubsidiaries = getSubsidiaryViaWorkArea(account, workArea);
  const [modals, setModals] = useState({
    filter: false,
  });
  const [filters, setFilters] = useState<URLSearchParams>();
  const [selectedFilters, setSelectedFilters] =
    useState<Partial<Record<keyof LastMovementFilterSchemaType, string>>>();

  const lastMovement = useQuery({
    queryKey: ["lastMovement", filters?.toString()],
    queryFn: async () => {
      return await getMovements(filters);
    },
    enabled: !!filters,
  });

  const lastMovementData = lastMovement.data ?? [];
  useProgressQuery(lastMovement, "lastMovement");

  const lastMovementFilterForm = useForm<
    LastMovementFilterInputType,
    unknown,
    LastMovementFilterSchemaType
  >({
    defaultValues: lastMovementFilterDefaultValues,
    resolver: zodResolver(lastMovementFilterSchema),
  });

  const [corporate_id, companies, brand_id] = useWatch({
    control: lastMovementFilterForm.control,
    name: ["corporate_id", "companies", "brand_id"],
  });

  const filterDependencies = useFilterDependencies(
    ["corporates", "companies", "subsidiaries", "brands", "models", "sizes"],
    {
      corporate_id: corporate_id,
      company_id: companies.toString(),
      brands: [Number(brand_id)],
    },
    ["corporates", "companies", "subsidiaries"],
  );

  // Set selected filters
  function handleSelectedFilters() {
    const newSelectedFilters: Partial<
      Record<keyof LastMovementFilterSchemaType, string>
    > = {};
    const values = lastMovementFilterForm.getValues();
    if (values.dateFrom !== "") {
      newSelectedFilters["dateFrom"] = values.dateFrom;
    }
    if (values.dateTo !== "") {
      newSelectedFilters["dateTo"] = values.dateTo;
    }
    if (values.corporate_id) {
      const localCorporate = filterDependencies.corporates.find(
        (c: any) => `${c.corporate_id}` === `${values.corporate_id}`,
      );
      if (localCorporate) {
        newSelectedFilters["corporate_id"] = localCorporate.name;
      }
    }
    if (values.companies.length > 0) {
      const companiesArray = filterDependencies.companies
        .filter((c: any) => values.companies.includes(c.company_id))
        .map((c: any) => c.name);
      newSelectedFilters["companies"] = companiesArray.join(", ");
    }
    if (values.subsidiaries.length > 0) {
      const subsidiariesArray = filterDependencies.subsidiaries
        .filter((c: any) => values.subsidiaries.includes(c.subsidiary_id))
        .map((c: any) => c.name);
      newSelectedFilters["subsidiaries"] = subsidiariesArray.join(", ");
    }
    if (values.brand_id) {
      const localBrand = filterDependencies.brands.find(
        (c: any) => `${c.brand_id}` === `${values.brand_id}`,
      );
      if (localBrand) {
        newSelectedFilters["brand_id"] = localBrand.name;
      }
    }
    if (values.model_id) {
      const localModels = filterDependencies.brands.find(
        (c: any) => `${c.model_id}` === `${values.model_id}`,
      );
      if (localModels) {
        newSelectedFilters["model_id"] = localModels.tire_model.name;
      }
    }
    if (values.size_id) {
      const localSizes = filterDependencies.sizes.find(
        (c: any) => `${c.tire_size_id}` === `${values.size_id}`,
      );
      if (localSizes) {
        newSelectedFilters["size_id"] = localSizes.size;
      }
    }
    setSelectedFilters(newSelectedFilters);
  }

  function onFilter(data: LastMovementFilterSchemaType) {
    const searchParams = new URLSearchParams();
    if (data.dateFrom) {
      searchParams.append("date_from", data.dateFrom);
      lastMovementFilterForm.setValue("dateFrom", data.dateFrom);
    }
    if (data.dateTo) {
      searchParams.append("date_to", data.dateTo);
      lastMovementFilterForm.setValue("dateTo", data.dateTo);
    }
    if (data.corporate_id) {
      searchParams.append("corporate_id", data.corporate_id.toString());
      lastMovementFilterForm.setValue("corporate_id", data.corporate_id);
    }
    if (data.companies.length > 0) {
      searchParams.append("companies", data.companies.toString());
      lastMovementFilterForm.setValue("companies", data.companies);
    }
    if (data.subsidiaries.length > 0) {
      searchParams.append("subsidiaries", data.subsidiaries.toString());
      lastMovementFilterForm.setValue("subsidiaries", data.subsidiaries);
    }
    if (data.brand_id) {
      searchParams.append("brands", data.brand_id.toString());
      lastMovementFilterForm.setValue("brand_id", data.brand_id);
    }
    if (data.model_id) {
      searchParams.append("models", data.model_id.toString());
      lastMovementFilterForm.setValue("model_id", data.model_id);
    }
    if (data.size_id) {
      searchParams.append("sizes", data.size_id.toString());
      lastMovementFilterForm.setValue("size_id", data.size_id);
    }
    setFilters(searchParams);
  }

  function handleDefaultFilters() {
    lastMovementFilterForm.setValue(
      "corporate_id",
      profileCorporate?.corporate_id || "",
    );
    lastMovementFilterForm.setValue(
      "companies",
      profileCompanies.map((company) => company.company_id),
    );
    lastMovementFilterForm.setValue(
      "subsidiaries",
      profileSubsidiaries.map((subsidiary) => subsidiary.subsidiary_id),
    );
    setFilters(
      new URLSearchParams({
        corporate_id: profileCorporate?.corporate_id.toString() || "",
        companies: profileCompanies.map((company) => company.company_id).join(),
        subsidiaries: profileSubsidiaries
          .map((subsidiary) => subsidiary.subsidiary_id)
          .join(),
        date_from: "2023-08-04",
        date_to: "2024-01-12",
      }),
    );
  }

  function onClear() {
    lastMovementFilterForm.reset();
    handleDefaultFilters();
  }

  useEffect(() => {
    if (account && workArea) {
      handleDefaultFilters();
    }
  }, [account, workArea]);

  useEffect(() => {
    if (filterDependencies.done) {
      handleSelectedFilters();
    }
  }, [filterDependencies.done]);

  return (
    <>
      <BaseFilterModal
        open={modals.filter}
        title={t("general:filter")}
        onClose={() => setModals({ ...modals, filter: false })}
        onConfirm={lastMovementFilterForm.handleSubmit(
          async (data) => {
            onFilter(data);
            handleSelectedFilters();
          },
          // (d) => console.log(d),
        )}
        onClear={onClear}
      >
        <LastMovementFilterForm
          form={lastMovementFilterForm}
          dependencies={filterDependencies}
        ></LastMovementFilterForm>
      </BaseFilterModal>
      <BaseContainer title={t("features:reportLastMovement.label")}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          {selectedFilters && Object.keys(selectedFilters).length > 0 && (
            <LastMovementFilters selectedFilters={selectedFilters} />
          )}
          <Divider />
          <Typography
            component={"p"}
            textAlign={"center"}
            color={"lightcoral"}
            fontSize={14}
            mb={3}
            mt={3}
          >
            {t("labels:location.label")}:{" "}
            {`${t("labels:location.options.pile")}`}
          </Typography>
          <Divider />

          <CustomButton
            onClick={() => {}}
            text={"GENERAR EXCEL"}
            sx={{ mt: 3 }}
          />

          <Typography
            variant="h4"
            sx={{ textAlign: "center", fontWeight: "500", my: 2 }}
          >
            {t("features:reportLastMovement.label")}
          </Typography>
          {lastMovementData.length > 0 && (
            <LastMovementTable movements={lastMovementData}></LastMovementTable>
          )}

          <Portal elementId={"navbarPortal"}>
            <Stack direction={"row"} alignItems={"center"}>
              <IconButton
                sx={{ mr: 2 }}
                onClick={() => setModals({ ...modals, filter: true })}
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
