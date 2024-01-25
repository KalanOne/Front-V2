import React, { useEffect, useState } from "react";

import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Box,
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

import { getDynamicCost } from "../api/dynamicCostApi";
import {
  DynamicCostFilterInputType,
  DynamicCostFilterSchemaType,
  dynamicCostFilterDefaultValues,
  dynamicCostFilterSchema,
} from "../validation/filterForm";
import { DynamicCostAccordionTable } from "./DynamicCostAccordionTable";
import { DynamicCostFilterForm } from "./DynamicCostFilterForm";
import { DynamicCostFilters } from "./DynamicCostFilters";

export { DynamicCost };

function DynamicCost(): React.ReactElement {
  const { t } = useTranslation();
  const account = useIdentity((state) => state.account);
  const workArea = useIdentity((state) => state.workArea);
  const profileCorporate = getCorporateViaWorkArea(account, workArea);
  const profileCompanies = getCompanyViaWorkArea(account, workArea);
  const profileSubsidiaries = getSubsidiaryViaWorkArea(account, workArea);
  const [currentTab, setCurrentTab] = useState("G");
  const [modals, setModals] = useState({
    filter: false,
  });
  const [filters, setFilters] = useState<URLSearchParams>();
  const [selectedFilters, setSelectedFilters] =
    useState<Partial<Record<keyof DynamicCostFilterSchemaType, string>>>();

  const dynamicCost = useQuery({
    queryKey: ["dynamicCost", filters?.toString(), currentTab.toString()],
    queryFn: async () => {
      return await getDynamicCost(currentTab, filters);
    },
    enabled: !!filters,
  });
  const dynamicCostData = dynamicCost.data ?? [];
  useProgressQuery(dynamicCost, "dynamicCost");

  const dynamicCostFilterForm = useForm<
    DynamicCostFilterInputType,
    unknown,
    DynamicCostFilterSchemaType
  >({
    defaultValues: dynamicCostFilterDefaultValues,
    resolver: zodResolver(dynamicCostFilterSchema),
  });

  const [corporate_id, companies, brand_id, model_id] = useWatch({
    control: dynamicCostFilterForm.control,
    name: ["corporate_id", "companies", "brand_id", "model_id"],
  });

  const filterDependencies = useFilterDependencies(
    ["corporates", "companies", "subsidiaries", "brands", "models", "sizes"],
    {
      corporate_id: corporate_id,
      company_id: companies.toString(),
      brands: [Number(brand_id)],
      models: [Number(model_id)],
    },
    ["corporates", "companies", "subsidiaries"],
  );

  function handleTabChange(tab: string) {
    setCurrentTab(tab);
  }

  function onModelClick(_params: any) {
    // console.log(params);
  }

  function handleSelectedFilters() {
    const newSelectedFilters: Partial<
      Record<keyof DynamicCostFilterSchemaType, string>
    > = {};
    const values = dynamicCostFilterForm.getValues();
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
    if (values.size_id) {
      const localSizes = filterDependencies.sizes.find(
        (c: any) => `${c.tire_size_id}` === `${values.size_id}`,
      );
      if (localSizes) {
        newSelectedFilters["size_id"] = localSizes.size;
      }
    }
    if (values.condition !== "") {
      newSelectedFilters["condition"] = values.condition;
    }
    if (values.tire_application !== "") {
      newSelectedFilters["tire_application"] = values.tire_application;
    }
    if (values.price !== 0) {
      newSelectedFilters["price"] = values.condition;
    }
    if (values.helmet_value !== 0) {
      newSelectedFilters["helmet_value"] = values.tire_application;
    }

    setSelectedFilters(newSelectedFilters);
  }

  function onFilter(data: DynamicCostFilterSchemaType) {
    const searchParams = new URLSearchParams();
    if (data.dateFrom) {
      searchParams.append("date_from", data.dateFrom);
      dynamicCostFilterForm.setValue("dateFrom", data.dateFrom);
    }
    if (data.dateTo) {
      searchParams.append("date_to", data.dateTo);
      dynamicCostFilterForm.setValue("dateTo", data.dateTo);
    }
    if (data.corporate_id) {
      searchParams.append("corporate_id", data.corporate_id.toString());
      dynamicCostFilterForm.setValue("corporate_id", data.corporate_id);
    }
    if (data.companies.length > 0) {
      searchParams.append("companies", data.companies.toString());
      dynamicCostFilterForm.setValue("companies", data.companies);
    }
    if (data.subsidiaries.length > 0) {
      searchParams.append("subsidiaries", data.subsidiaries.toString());
      dynamicCostFilterForm.setValue("subsidiaries", data.subsidiaries);
    }
    if (data.movement) {
      searchParams.append("movement", data.movement);
      dynamicCostFilterForm.setValue("movement", data.movement);
    }
    if (data.brand_id) {
      searchParams.append("brands", data.brand_id.toString());
      dynamicCostFilterForm.setValue("brand_id", data.brand_id);
    }
    if (data.model_id) {
      searchParams.append("models", data.model_id.toString());
      dynamicCostFilterForm.setValue("model_id", data.model_id);
    }
    if (data.size_id) {
      searchParams.append("sizes", data.size_id.toString());
      dynamicCostFilterForm.setValue("size_id", data.size_id);
    }
    if (data.condition) {
      searchParams.append("tire_condition", data.condition);
      dynamicCostFilterForm.setValue("condition", data.condition);
    }
    if (data.tire_application) {
      searchParams.append("tire_application", data.tire_application);
      dynamicCostFilterForm.setValue("tire_application", data.tire_application);
    }
    if (data.price) {
      searchParams.append("price", data.price.toString());
      dynamicCostFilterForm.setValue("price", data.price);
    }
    if (data.helmet_value) {
      searchParams.append("helmet_value", data.helmet_value.toString());
      dynamicCostFilterForm.setValue("helmet_value", data.helmet_value);
    }
    setFilters(searchParams);
  }

  function handleDefaultFilters() {
    dynamicCostFilterForm.setValue(
      "corporate_id",
      profileCorporate?.corporate_id || "",
    );
    dynamicCostFilterForm.setValue(
      "companies",
      profileCompanies.map((company) => company.company_id),
    );
    dynamicCostFilterForm.setValue(
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
        movement: "BOTH",
      }),
    );
  }

  function onClear() {
    dynamicCostFilterForm.reset();
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
        onConfirm={dynamicCostFilterForm.handleSubmit(
          async (data) => {
            onFilter(data);
            handleSelectedFilters();
          },
          // (d) => console.log(d),
        )}
        onClear={onClear}
      >
        <DynamicCostFilterForm
          form={dynamicCostFilterForm}
          dependencies={filterDependencies}
        ></DynamicCostFilterForm>
      </BaseFilterModal>
      <BaseContainer title={t("titles:dynamic_cost_report")}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          {selectedFilters && Object.keys(selectedFilters).length > 0 && (
            <DynamicCostFilters selectedFilters={selectedFilters} />
          )}
          <Divider />
          <Typography
            variant="h4"
            sx={{ textAlign: "center", mt: 3, fontWeight: "500" }}
          >
            {t("features:reportDynamicCost.cost_report")}
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ textAlign: "center" }}>
            {t("features:reportDynamicCost.this_report_shows")}
          </Typography>
          <Typography
            component={"p"}
            textAlign={"center"}
            color={"lightcoral"}
            fontSize={14}
            mb={3}
          >
            {t("features:reportDynamicCost.only_tires")}
          </Typography>
          <Divider />
          <CustomButton
            onClick={() => {}}
            text={"GENERAR EXCEL"}
            sx={{ mt: 3 }}
          />
          <Box sx={{ bgcolor: "#343A40", mt: 2, borderRadius: 2 }}>
            <CustomButton
              onClick={() => handleTabChange("G")}
              text={"General"}
              sx={{ bgcolor: "#343A40", m: 1, fontSize: "1.3rem" }}
            />
            <CustomButton
              onClick={() => handleTabChange("R")}
              text={"Revitalizados"}
              sx={{ bgcolor: "#343A40", m: 1, fontSize: "1.3rem" }}
            />
            <CustomButton
              onClick={() => handleTabChange("O")}
              text={"Original"}
              sx={{ bgcolor: "#343A40", m: 1, fontSize: "1.3rem" }}
            />
          </Box>
          {dynamicCostData && (
            <DynamicCostAccordionTable
              report={dynamicCostData}
              onModelClick={onModelClick}
            ></DynamicCostAccordionTable>
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
