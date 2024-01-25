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
import { useNavigate } from "react-router-dom";

import { BaseContainer } from "src/components/common/BaseContainer";
import { CustomButton } from "src/components/common/CustomButton";
import { Portal } from "src/components/common/Portal";
import { TableTitle } from "src/components/common/TableTitle";
import { BaseFilterModal } from "src/components/modal/BaseFilterModal";
import { useFilterDependencies } from "src/hooks/dependencies";
import { useProgressQuery } from "src/hooks/progress";
import { useIdentity } from "src/stores/general/identity";
import {
  getCompanyViaWorkArea,
  getCorporateViaWorkArea,
  getSubsidiaryViaWorkArea,
} from "src/utils/workArea";

import { getReviewPerformance } from "../api/reviewPerformanceApi";
import {
  ReviewPerformanceReportFilterInputType,
  ReviewPerformanceReportFilterSchemaType,
  reviewPerformanceReportFilterDefaultValues,
  reviewPerformanceReportFilterSchema,
} from "../validation/filterForm";
import { ReviewPerformanceReportFilterForm } from "./ReviewPerformanceReportFilterForm";
import { ReviewPerformanceReportFilters } from "./ReviewPerformanceReportFilters";
import { ReviewPerformanceReportTable } from "./ReviewPerformanceReportTable";

export { ReviewPerformanceReport };

function ReviewPerformanceReport(): React.ReactElement {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
    useState<
      Partial<Record<keyof ReviewPerformanceReportFilterSchemaType, string>>
    >();

  const reviewPerformanceReport = useQuery({
    queryKey: ["reviewPerformanceReport", filters?.toString()],
    queryFn: async () => {
      return await getReviewPerformance(filters);
    },
    enabled: !!filters,
  });

  const reviewPerformanceData = reviewPerformanceReport.data;
  useProgressQuery(reviewPerformanceReport, "reviewPerformanceReport");

  const reviewPerformanceReportFilterForm = useForm<
    ReviewPerformanceReportFilterInputType,
    unknown,
    ReviewPerformanceReportFilterSchemaType
  >({
    defaultValues: reviewPerformanceReportFilterDefaultValues,
    resolver: zodResolver(reviewPerformanceReportFilterSchema),
  });

  const [corporate_id, companies] = useWatch({
    control: reviewPerformanceReportFilterForm.control,
    name: ["corporate_id", "companies"],
  });

  const filterDependencies = useFilterDependencies(
    ["corporates", "companies", "subsidiaries"],
    {
      corporate_id: corporate_id,
      company_id: companies.toString(),
    },
    ["corporates", "companies", "subsidiaries"],
  );

  function onButtonClick(vehicle: any) {
    // console.log(vehicle);
    navigate(`/vehicleReview/${vehicle.vehicle_id}/history`);
  }

  // Set selected filters
  function handleSelectedFilters() {
    const newSelectedFilters: Partial<
      Record<keyof ReviewPerformanceReportFilterSchemaType, string>
    > = {};
    const values = reviewPerformanceReportFilterForm.getValues();
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
    setSelectedFilters(newSelectedFilters);
  }

  //filtros
  function onFilter(data: ReviewPerformanceReportFilterSchemaType) {
    const searchParams = new URLSearchParams();
    if (data.dateFrom) {
      searchParams.append("date_from", data.dateFrom);
      reviewPerformanceReportFilterForm.setValue("dateFrom", data.dateFrom);
    }
    if (data.dateTo) {
      searchParams.append("date_to", data.dateTo);
      reviewPerformanceReportFilterForm.setValue("dateTo", data.dateTo);
    }
    if (data.corporate_id) {
      searchParams.append("corporate_id", data.corporate_id.toString());
      reviewPerformanceReportFilterForm.setValue(
        "corporate_id",
        data.corporate_id,
      );
    }
    if (data.companies.length > 0) {
      searchParams.append("companies", data.companies.toString());
      reviewPerformanceReportFilterForm.setValue("companies", data.companies);
    }
    if (data.subsidiaries.length > 0) {
      searchParams.append("subsidiaries", data.subsidiaries.toString());
      reviewPerformanceReportFilterForm.setValue(
        "subsidiaries",
        data.subsidiaries,
      );
    }
    setFilters(searchParams);
  }

  //
  function handleDefaultFilters() {
    reviewPerformanceReportFilterForm.setValue(
      "corporate_id",
      profileCorporate?.corporate_id || "",
    );
    reviewPerformanceReportFilterForm.setValue(
      "companies",
      profileCompanies.map((company) => company.company_id),
    );
    reviewPerformanceReportFilterForm.setValue(
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
      }),
    );
  }

  function onClear() {
    reviewPerformanceReportFilterForm.reset();
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
        onConfirm={reviewPerformanceReportFilterForm.handleSubmit(
          async (data) => {
            onFilter(data);
            handleSelectedFilters();
          },
          // (d) => console.log(d),
        )}
        onClear={onClear}
      >
        <ReviewPerformanceReportFilterForm
          form={reviewPerformanceReportFilterForm}
          dependencies={filterDependencies}
        ></ReviewPerformanceReportFilterForm>
      </BaseFilterModal>
      <BaseContainer title={t("titles:review_performance_report")}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          {selectedFilters && Object.keys(selectedFilters).length > 0 && (
            <ReviewPerformanceReportFilters selectedFilters={selectedFilters} />
          )}
          <Divider />
          <Typography
            variant="h4"
            sx={{ textAlign: "center", mt: 3, fontWeight: "500" }}
          >
            {"Reporte de Desempeño de Neumáticos"}
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ textAlign: "center" }}>
            {
              "Este reporte muestra el desempeño de las revisiones realizadas a lo largo de un periodo mensual para indicar la cantidad de esfuerzo de trabajo realizado y todas las actividades que ocurrieron durante este tiempo"
            }
          </Typography>
          <Divider />
          <CustomButton
            onClick={() => {}}
            text={"GENERAR EXCEL"}
            sx={{ mt: 3 }}
          />
          {reviewPerformanceData &&
            Object.entries(reviewPerformanceData).map(
              ([subsidiary, subsidiaryObject]) => (
                <React.Fragment key={subsidiary}>
                  <TableTitle title={subsidiary} />
                  <ReviewPerformanceReportTable
                    reviewPerformance={subsidiaryObject}
                    onButtonClick={onButtonClick}
                  ></ReviewPerformanceReportTable>
                </React.Fragment>
              ),
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
