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

import { getReportWareHouse } from "../api/wareHouseReportApi";
import {
  WareHouseReportFilterInputType,
  WareHouseReportFilterSchemaType,
  wareHouseReportFilterDefaultValues,
  wareHouseReportFilterSchema,
} from "../validation/filterForm";
import { WareHouseReportAccordionTable } from "./WareHouseReportAccordionTable";
import { WareHouseReportFilterForm } from "./WareHouseReportFilterForm";
import { WareHouseReportFilters } from "./WareHouseReportFilters";

export { WareHouseReport };

function WareHouseReport(): React.ReactElement {
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
    useState<Partial<Record<keyof WareHouseReportFilterSchemaType, string>>>();

  const wareHouseReport = useQuery({
    queryKey: ["wareHouseReport", filters?.toString()],
    queryFn: async () => {
      return await getReportWareHouse(filters);
    },
    enabled: !!filters,
  });

  const wareHouseReportData = wareHouseReport.data;
  useProgressQuery(wareHouseReport, "wareHouseReport");

  const wareHouseReportFilterForm = useForm<
    WareHouseReportFilterInputType,
    unknown,
    WareHouseReportFilterSchemaType
  >({
    defaultValues: wareHouseReportFilterDefaultValues,
    resolver: zodResolver(wareHouseReportFilterSchema),
  });

  const [
    corporate_id,
    company_id,
    subsidiary_id,
    brand_id,
    model_id,
    brandRetread_id,
  ] = useWatch({
    control: wareHouseReportFilterForm.control,
    name: [
      "corporate_id",
      "company_id",
      "subsidiary_id",
      "brand_id",
      "model_id",
      "brandRetread_id",
    ],
  });

  const filterDependencies = useFilterDependencies(
    [
      "corporates",
      "companies",
      "subsidiaries",
      "warehouses",
      "providers",
      "brands",
      "models",
      "variations",
      "brandsRetread",
      "modelsRevitalized",
    ],
    {
      corporate_id: corporate_id,
      company_id: company_id,
      subsidiary_id: subsidiary_id,
      brands: [Number(brand_id)],
      models: [Number(model_id)],
      brandRetread: brandRetread_id,
    },
    ["corporates", "companies", "subsidiaries"],
  );
  
  // Set selected filters
  function handleSelectedFilters() {
    const newSelectedFilters: Partial<
      Record<keyof WareHouseReportFilterSchemaType, string>
    > = {};
    const values = wareHouseReportFilterForm.getValues();
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
    if (values.company_id) {
      const localCompany = filterDependencies.companies.find(
        (c: any) => `${c.company_id}` === `${values.company_id}`,
      );
      if (localCompany) {
        newSelectedFilters["company_id"] = localCompany.name;
      }
    }
    if (values.subsidiary_id) {
      const localSubsidiary = filterDependencies.subsidiaries.find(
        (c: any) => `${c.subsidiary_id}` === `${values.subsidiary_id}`,
      );
      if (localSubsidiary) {
        newSelectedFilters["subsidiary_id"] = localSubsidiary.name;
      }
    }
    if (values.warehouse_id) {
      const localWareHouse = filterDependencies.warehouses.find(
        (c: any) => `${c.warehouse_id}` === `${values.warehouse_id}`,
      );
      if (localWareHouse) {
        newSelectedFilters["warehouse_id"] = localWareHouse.name;
      }
    }
    if (values.provider_id) {
      const localProvider = filterDependencies.providers.find(
        (c: any) => `${c.provider_id}` === `${values.provider_id}`,
      );
      if (localProvider) {
        newSelectedFilters["provider_id"] = localProvider.name;
      }
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
    if (values.tire_model_variation_id.length > 0) {
      const modelVariationArray = filterDependencies.variations
        .filter((c: any) =>
          values.tire_model_variation_id.includes(c.tire_model_variation_id),
        )
        .map((c: any) => c.tire_size.size);
      newSelectedFilters["tire_model_variation_id"] =
        modelVariationArray.join(", ");
    }
    if (values.brandRetread_id) {
      const localBrandRetread = filterDependencies.brandsRetread.find(
        (c: any) => `${c.brand_id}` === `${values.brand_id}`,
      );
      if (localBrandRetread) {
        newSelectedFilters["brandRetread_id"] = localBrandRetread.name;
      }
    }
    if (values.modelRevitalized_id) {
      const localModelRevitalized = filterDependencies.modelsRevitalized.find(
        (c: any) =>
          `${c.revitalized_tire_model_id}` === `${values.modelRevitalized_id}`,
      );
      if (localModelRevitalized) {
        newSelectedFilters["modelRevitalized_id"] = localModelRevitalized.name;
      }
    }
    if (values.condition !== "") {
      newSelectedFilters["condition"] = values.condition;
    }
    if (values.tire_application !== "") {
      newSelectedFilters["tire_application"] = values.tire_application;
    }
    setSelectedFilters(newSelectedFilters);
  }

  // Filter Form
  function onFilter(data: WareHouseReportFilterSchemaType) {
    const searchParams = new URLSearchParams();
    if (data.dateFrom) {
      searchParams.append("date_from", data.dateFrom);
      wareHouseReportFilterForm.setValue("dateFrom", data.dateFrom);
    }
    if (data.dateTo) {
      searchParams.append("date_to", data.dateTo);
      wareHouseReportFilterForm.setValue("dateTo", data.dateTo);
    }
    if (data.corporate_id) {
      searchParams.append("corporate_id", data.corporate_id.toString());
      wareHouseReportFilterForm.setValue("corporate_id", data.corporate_id);
    }
    if (data.company_id) {
      searchParams.append("companies", data.company_id.toString());
      wareHouseReportFilterForm.setValue("company_id", data.company_id);
    }
    if (data.subsidiary_id) {
      searchParams.append("subsidiaries", data.subsidiary_id.toString());
      wareHouseReportFilterForm.setValue("subsidiary_id", data.subsidiary_id);
    }
    if (data.warehouse_id) {
      searchParams.append("warehouses", data.warehouse_id.toString());
      wareHouseReportFilterForm.setValue("warehouse_id", data.warehouse_id);
    }
    if (data.provider_id) {
      // TODO: Add the append when they get ready
      wareHouseReportFilterForm.setValue("provider_id", data.provider_id);
    }
    if (data.brand_id) {
      // TODO: Add the append when they get ready
      wareHouseReportFilterForm.setValue("brand_id", data.brand_id);
    }
    if (data.model_id) {
      // TODO: Add the append when they get ready
      wareHouseReportFilterForm.setValue("model_id", data.model_id);
    }
    if (data.tire_model_variation_id.length > 0) {
      // TODO: Add the append when they get ready
      wareHouseReportFilterForm.setValue(
        "tire_model_variation_id",
        data.tire_model_variation_id,
      );
    }
    if (data.brandRetread_id) {
      // TODO: Add the append when they get ready
      wareHouseReportFilterForm.setValue(
        "brandRetread_id",
        data.brandRetread_id,
      );
    }
    if (data.modelRevitalized_id) {
      // TODO: Add the append when they get ready
      wareHouseReportFilterForm.setValue(
        "modelRevitalized_id",
        data.modelRevitalized_id,
      );
    }
    if (data.tire_application) {
      searchParams.append("tire_application", data.tire_application);
      wareHouseReportFilterForm.setValue(
        "tire_application",
        data.tire_application,
      );
    }
    if (data.condition) {
      searchParams.append("tire_condition", data.condition);
      wareHouseReportFilterForm.setValue("condition", data.condition);
    }
    setFilters(searchParams);
  }

  function handleDefaultFilters() {
    wareHouseReportFilterForm.setValue(
      "corporate_id",
      profileCorporate?.corporate_id || "",
    );
    wareHouseReportFilterForm.setValue(
      "company_id",
      profileCompanies.map((company) => company.company_id)[0],
    );
    wareHouseReportFilterForm.setValue(
      "subsidiary_id",
      profileSubsidiaries.map((subsidiary) => subsidiary.subsidiary_id)[0],
    );
    setFilters(
      new URLSearchParams({
        corporate_id: profileCorporate?.corporate_id.toString() || "",
        companies: `${
          profileCompanies.map((company) => company.company_id)[0]
        }`,
        subsidiaries: `${
          profileSubsidiaries.map((subsidiary) => subsidiary.subsidiary_id)[0]
        }`,
      }),
    );
    // setFilters(
    //   new URLSearchParams({
    //     corporate_id: profileCorporate?.corporate_id.toString() || "",
    //     companies: profileCompanies.map((company) => company.company_id).join(),
    //     subsidiaries: profileSubsidiaries
    //       .map((subsidiary) => subsidiary.subsidiary_id)
    //       .join(),
    //   }),
    // );
  }

  function onClear() {
    wareHouseReportFilterForm.reset();
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
        onConfirm={wareHouseReportFilterForm.handleSubmit(
          async (data) => {
            onFilter(data);
            handleSelectedFilters();
          },
          // (d) => console.log(d),
        )}
        onClear={onClear}
      >
        <WareHouseReportFilterForm
          form={wareHouseReportFilterForm}
          dependencies={filterDependencies}
        />
      </BaseFilterModal>
      <BaseContainer title={t("titles:report_warehouse")}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          {selectedFilters && Object.keys(selectedFilters).length > 0 && (
            <WareHouseReportFilters selectedFilters={selectedFilters} />
          )}
          <Divider />
          <Typography
            variant="h4"
            sx={{ textAlign: "center", mt: 3, fontWeight: "500" }}
          >
            {"Reporte de neumáticos en almacenes"}
          </Typography>
          <Typography
            component={"p"}
            textAlign={"center"}
            color={"lightcoral"}
            fontSize={14}
            mb={3}
          >
            {t("labels:location.label")}:{" "}
            {t("labels:location.options.warehouse")}
          </Typography>
          <Divider />
          <CustomButton
            onClick={() => {}}
            text={"GENERAR EXCEL"}
            sx={{ mt: 3 }}
          />
          {wareHouseReportData && (
            <WareHouseReportAccordionTable
              report={wareHouseReportData}
            ></WareHouseReportAccordionTable>
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
