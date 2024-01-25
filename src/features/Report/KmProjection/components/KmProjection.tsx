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
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
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

import { getKmProjection, getKmProjectionDetail } from "../api/kmProjectionApi";
import { KmProjectionResponse } from "../types/kmProjectionTypes";
import {
  KmProjectionFilterInputType,
  KmProjectionFilterSchemaType,
  kmProjectionFilterDefaultValues,
  kmProjectionFilterSchema,
} from "../validation/filterForm";
import { KmProjectionAccordionTable } from "./KmProjectionAccordionTable";
import { KmProjectionFilterForm } from "./KmProjectionFilterForm";
import { KmProjectionFilters } from "./KmProjectionFilters";

export { KmProjection };

function KmProjection(): React.ReactElement {
  const { t } = useTranslation();
  // const navigate = useNavigate();
  const account = useIdentity((state) => state.account);
  const workArea = useIdentity((state) => state.workArea);
  const profileCorporate = getCorporateViaWorkArea(account, workArea);
  const profileCompanies = getCompanyViaWorkArea(account, workArea);
  const profileSubsidiaries = getSubsidiaryViaWorkArea(account, workArea);
  const [kmReportData, setkmReportData] = useState<KmProjectionResponse>();
  const [modals, setModals] = useState({
    filter: false,
  });
  const [filters, setFilters] = useState<URLSearchParams>();
  const [selectedFilters, setSelectedFilters] =
    useState<Partial<Record<keyof KmProjectionFilterSchemaType, string>>>();

  const kmReport = useQuery({
    queryKey: ["kmReport", filters?.toString()],
    queryFn: async () => {
      return await getKmProjection(filters);
    },
    enabled: !!filters,
  });
  useProgressQuery(kmReport, "kmReport");

  const modelsDataMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await getKmProjectionDetail({
        movement: "BOTH",
        corporate_name: data.corporate,
        company_name: data.company,
        subsidiary_name: data.subsidiary,
        division_name: data.division,
        tire_application: data.tireAplication,
      });
      return {
        data: response,
        params: data,
      };
    },
    onSuccess: async (response: any) => {
      const { data, params } = response;
      setkmReportData((prev: any) => {
        const newData = { ...prev };
        newData["general"][params.corporate][params.company][params.subsidiary][
          params.division
        ][params.tireAplication] = data;
        return newData;
      });
    },
    onError: (_error: AxiosError) => {
      // console.log(error);
    },
  });

  const kmProjectionFilterForm = useForm<
    KmProjectionFilterInputType,
    unknown,
    KmProjectionFilterSchemaType
  >({
    defaultValues: kmProjectionFilterDefaultValues,
    resolver: zodResolver(kmProjectionFilterSchema),
  });

  const [corporate_id, companies, brand_id, model_id] = useWatch({
    control: kmProjectionFilterForm.control,
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

  function onButtonClick(_review: any) {
    // console.log(review);
    // navigate(`tire/${review.tire_id}/history`);
  }

  // Set selected filters
  function handleSelectedFilters() {
    const newSelectedFilters: Partial<
      Record<keyof KmProjectionFilterSchemaType, string>
    > = {};
    const values = kmProjectionFilterForm.getValues();
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

    setSelectedFilters(newSelectedFilters);
  }

  function onFilter(data: KmProjectionFilterSchemaType) {
    const searchParams = new URLSearchParams();
    if (data.dateFrom) {
      searchParams.append("date_from", data.dateFrom);
      kmProjectionFilterForm.setValue("dateFrom", data.dateFrom);
    }
    if (data.dateTo) {
      searchParams.append("date_to", data.dateTo);
      kmProjectionFilterForm.setValue("dateTo", data.dateTo);
    }
    if (data.corporate_id) {
      searchParams.append("corporate_id", data.corporate_id.toString());
      kmProjectionFilterForm.setValue("corporate_id", data.corporate_id);
    }
    if (data.companies.length > 0) {
      searchParams.append("companies", data.companies.toString());
      kmProjectionFilterForm.setValue("companies", data.companies);
    }
    if (data.subsidiaries.length > 0) {
      searchParams.append("subsidiaries", data.subsidiaries.toString());
      kmProjectionFilterForm.setValue("subsidiaries", data.subsidiaries);
    }
    if (data.movement) {
      searchParams.append("movement", data.movement);
      kmProjectionFilterForm.setValue("movement", data.movement);
    }
    if (data.brand_id) {
      searchParams.append("brands", data.brand_id.toString());
      kmProjectionFilterForm.setValue("brand_id", data.brand_id);
    }
    if (data.model_id) {
      searchParams.append("models", data.model_id.toString());
      kmProjectionFilterForm.setValue("model_id", data.model_id);
    }
    if (data.size_id) {
      searchParams.append("sizes", data.size_id.toString());
      kmProjectionFilterForm.setValue("size_id", data.size_id);
    }
    if (data.condition) {
      searchParams.append("tire_condition", data.condition);
      kmProjectionFilterForm.setValue("condition", data.condition);
    }
    if (data.tire_application) {
      searchParams.append("tire_application", data.tire_application);
      kmProjectionFilterForm.setValue(
        "tire_application",
        data.tire_application,
      );
    }
    if (data.price) {
      searchParams.append("price", data.price.toString());
      kmProjectionFilterForm.setValue("price", data.price);
    }
    if (data.helmet_value) {
      searchParams.append("helmet_value", data.helmet_value.toString());
      kmProjectionFilterForm.setValue("helmet_value", data.helmet_value);
    }
    setFilters(searchParams);
  }

  function handleDefaultFilters() {
    kmProjectionFilterForm.setValue(
      "corporate_id",
      profileCorporate?.corporate_id || "",
    );
    kmProjectionFilterForm.setValue(
      "companies",
      profileCompanies.map((company) => company.company_id),
    );
    kmProjectionFilterForm.setValue(
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
    kmProjectionFilterForm.reset();
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

  useEffect(() => {
    if (kmReport.data) {
      setkmReportData(kmReport.data);
    }
  }, [kmReport]);

  return (
    <>
      <BaseFilterModal
        open={modals.filter}
        title={t("general:filter")}
        onClose={() => setModals({ ...modals, filter: false })}
        onConfirm={kmProjectionFilterForm.handleSubmit(
          async (data) => {
            onFilter(data);
            handleSelectedFilters();
          },
          // (d) => console.log(d),
        )}
        onClear={onClear}
      >
        <KmProjectionFilterForm
          form={kmProjectionFilterForm}
          dependencies={filterDependencies}
        ></KmProjectionFilterForm>
      </BaseFilterModal>
      <BaseContainer title={t("titles:km_projection_report")}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          {selectedFilters && Object.keys(selectedFilters).length > 0 && (
            <KmProjectionFilters selectedFilters={selectedFilters} />
          )}
          <Divider />
          <Typography
            variant="h4"
            sx={{ textAlign: "center", mt: 3, fontWeight: "500" }}
          >
            {t("features:reportKm.title")}
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ textAlign: "center" }}>
            {t("features:reportKm.label")}
          </Typography>
          <Typography
            component={"p"}
            textAlign={"center"}
            color={"lightcoral"}
            fontSize={14}
            mb={3}
          >
            {t("labels:location.label")}:{" "}
            {`${t("labels:location.options.mount")} y ${t(
              "labels:location.options.warehouse",
            )}`}
          </Typography>
          <Divider />
          <CustomButton
            onClick={() => {}}
            text={"GENERAR EXCEL"}
            sx={{ mt: 3 }}
          />
          {kmReportData && (
            <KmProjectionAccordionTable
              report={kmReportData}
              onTireAplicationClick={(params) => {
                modelsDataMutation.mutate(params);
              }}
              onButtonClick={onButtonClick}
            ></KmProjectionAccordionTable>
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
