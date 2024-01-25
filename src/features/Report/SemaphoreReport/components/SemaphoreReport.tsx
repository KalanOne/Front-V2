import React, { useEffect, useState } from "react";

import FilterListIcon from "@mui/icons-material/FilterList";
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { BaseContainer } from "src/components/common/BaseContainer";
import { CustomButton } from "src/components/common/CustomButton";
import { Portal } from "src/components/common/Portal";
import { BaseCustomModal } from "src/components/modal/BaseCustomModal";
import { BaseFilterModal } from "src/components/modal/BaseFilterModal";
import { useFilterDependencies } from "src/hooks/dependencies";
import { useProgressQuery } from "src/hooks/progress";
import { useIdentity } from "src/stores/general/identity";
import { filterNonObjects } from "src/utils/object";
import {
  getCompanyViaWorkArea,
  getCorporateViaWorkArea,
} from "src/utils/workArea";

import { getSemaphore } from "../api/semaphoreApi";
import {
  SemaphoreFilterInputType,
  SemaphoreFilterSchemaType,
  semaphoreFilterDefaultValues,
  semaphoreFilterSchema,
} from "../validation/filterForm";
import { SemaphoreReportFilterForm } from "./SemaphoreReportFilterForm";
import { SemaphoreReportFilters } from "./SemaphoreReportFilters";
import { SemaphoreReportSummary } from "./SemaphoreReportSummary";
import { SemaphoreReportTable } from "./SemaphoreReportTable";

export { SemaphoreReport };

function SemaphoreReport(): React.ReactElement {
  const { t } = useTranslation();
  const account = useIdentity((state) => state.account);
  const workArea = useIdentity((state) => state.workArea);
  const profileCorporate = getCorporateViaWorkArea(account, workArea);
  const profileCompanies = getCompanyViaWorkArea(account, workArea);
  const [dataTable, setDataTable] = useState<any>();
  const [currentTab, setCurrentTab] = useState("TRUCK_TRACTOR");
  const [depthTable, setDepthTable] = useState<any>([]);
  const [conditionTable, setConditionTable] = useState<any>([]);
  const [modals, setModals] = useState({
    filter: false,
    tableTire: false,
  });
  const [filters, setFilters] = useState<URLSearchParams>();
  const [selectedFilters, setSelectedFilters] =
    useState<Partial<Record<keyof SemaphoreFilterSchemaType, string>>>();

  const semaphoreReport = useQuery({
    queryKey: ["semaphoreReport", filters?.toString()],
    queryFn: async () => {
      return await getSemaphore(filters);
    },
    enabled: !!filters,
  });
  const semaphoreData = semaphoreReport.data;
  useProgressQuery(semaphoreReport, "semaphoreReport");

  const semaphoreFilterForm = useForm<
    SemaphoreFilterInputType,
    unknown,
    SemaphoreFilterSchemaType
  >({
    defaultValues: semaphoreFilterDefaultValues,
    resolver: zodResolver(semaphoreFilterSchema),
  });

  const filterDependencies = useFilterDependencies(
    ["corporates", "companies"],
    {},
    ["corporates", "companies"],
  );

  // Set selected filters
  function handleSelectedFilters() {
    const newSelectedFilters: Partial<
      Record<keyof SemaphoreFilterSchemaType, string>
    > = {};
    const values = semaphoreFilterForm.getValues();
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
    setSelectedFilters(newSelectedFilters);
  }

  function onFilter(data: SemaphoreFilterSchemaType) {
    const searchParams = new URLSearchParams();
    if (data.dateFrom) {
      searchParams.append("date_from", data.dateFrom);
      semaphoreFilterForm.setValue("dateFrom", data.dateFrom);
    }
    if (data.dateTo) {
      searchParams.append("date_to", data.dateTo);
      semaphoreFilterForm.setValue("dateTo", data.dateTo);
    }
    if (data.corporate_id) {
      searchParams.append("corporate_id", data.corporate_id.toString());
      semaphoreFilterForm.setValue("corporate_id", data.corporate_id);
    }
    if (data.companies.length > 0) {
      searchParams.append("companies", data.companies.toString());
      semaphoreFilterForm.setValue("companies", data.companies);
    }
    setFilters(searchParams);
  }

  function handleDefaultFilters() {
    semaphoreFilterForm.setValue(
      "corporate_id",
      profileCorporate?.corporate_id || "",
    );
    semaphoreFilterForm.setValue(
      "companies",
      profileCompanies.map((company) => company.company_id),
    );
    setFilters(
      new URLSearchParams({
        corporate_id: profileCorporate?.corporate_id.toString() || "",
        companies: profileCompanies.map((company) => company.company_id).join(),
      }),
    );
  }
  function onClear() {
    semaphoreFilterForm.reset();
    handleDefaultFilters();
  }

  function handleTabChange(tab: string) {
    setCurrentTab(tab);
  }

  function onRowClick(division: string, condition: string) {
    if (condition === "T") {
      return;
    }
    // console.log(division, condition);
  }

  function processSemaphoreData(semaphoreData: any, currentTab: string) {
    let dataTable = {};
    let depthTable: any = [];
    let conditionTable: any = [];

    const processVehicleType = (
      division: any,
      vehicleTypeObject: any,
      depthObject: any,
      conditionObject: any,
    ) => {
      Object.entries(filterNonObjects(vehicleTypeObject)).forEach(
        ([_, vehicleObject]) => {
          Object.entries(filterNonObjects(vehicleObject)).forEach(
            ([_, tire]: [any, any]) => {
              if (tire.tire_condition_id) {
                tire.tire_condition_id.includes("ORIGINAL")
                  ? (conditionObject.TO += 1)
                  : (conditionObject.TR += 1);
                conditionObject.T += 1;
              }
              if (tire.depth_condition) {
                tire.depth_condition.includes("GOOD")
                  ? (depthObject.TG += 1)
                  : tire.depth_condition.includes("SCHEDULE")
                  ? (depthObject.TS += 1)
                  : (depthObject.TB += 1);
                depthObject.T += 1;
              }
            },
          );
          depthObject.U += 1;
          conditionObject.U += 1;
        },
      );
    };

    const processDivision = (division: any, divisionObject: any) => {
      const depthObject = { TG: 0, TS: 0, TB: 0, T: 0, U: 0 };
      const conditionObject = { TO: 0, TR: 0, T: 0, U: 0 };

      Object.entries(filterNonObjects(divisionObject)).forEach(
        ([_, vehicleTypeObject]) => {
          processVehicleType(
            division,
            vehicleTypeObject,
            depthObject,
            conditionObject,
          );
        },
      );

      depthTable.push({ [division]: depthObject });
      conditionTable.push({ [division]: conditionObject });
    };

    Object.entries(semaphoreData).forEach(
      ([_, corporateObject]: [any, any]) => {
        setDepthTable([]);
        setConditionTable([]);
        Object.entries(filterNonObjects(corporateObject)).forEach(
          ([_, companyObject]) => {
            Object.entries(filterNonObjects(companyObject)).forEach(
              ([division, divisionObject]) => {
                processDivision(division, divisionObject);
                if (currentTab !== "RESUMEN") {
                  Object.entries(filterNonObjects(divisionObject)).forEach(
                    ([vehicleType, vehicleTypeObject]) => {
                      if (vehicleType === currentTab) {
                        dataTable = {
                          ...dataTable,
                          ...filterNonObjects(vehicleTypeObject),
                        };
                      }
                    },
                  );
                }
              },
            );
          },
        );
      },
    );

    setDataTable(dataTable);
    setDepthTable(depthTable);
    setConditionTable(conditionTable);
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
    if (semaphoreData) {
      if (currentTab !== "") {
        processSemaphoreData(semaphoreData, currentTab);
      }
    }
  }, [semaphoreData, currentTab]);

  return (
    <>
      <BaseFilterModal
        open={modals.filter}
        title={t("general:filter")}
        onClose={() => setModals({ ...modals, filter: false })}
        onConfirm={semaphoreFilterForm.handleSubmit(
          async (data) => {
            onFilter(data);
            handleSelectedFilters();
          },
          // (d) => console.log(d),
        )}
        onClear={onClear}
      >
        <SemaphoreReportFilterForm
          form={semaphoreFilterForm}
          dependencies={filterDependencies}
        ></SemaphoreReportFilterForm>
      </BaseFilterModal>
      <BaseContainer title={"Historial de neumáticos revisados"}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          {selectedFilters && (
            <SemaphoreReportFilters
              selectedFilters={selectedFilters}
            ></SemaphoreReportFilters>
          )}
          <Typography
            variant="h5"
            gutterBottom
            sx={{ textAlign: "center", mt: 3 }}
          >
            {
              "Este reporte muestra los neumáticos revisados de cada unidad en el periodo de tiempo seleccionado. Aunque la unidad tenga todos sus neumáticos instalados, sólo van a salir aquellos que se revisaron"
            }
          </Typography>
          <CustomButton
            onClick={() => {}}
            text={"GENERAR EXCEL"}
            sx={{ mt: 3 }}
          />
          <Box sx={{ bgcolor: "#343A40", my: 2, borderRadius: 2 }}>
            <CustomButton
              onClick={() => handleTabChange("TRUCK_TRACTOR")}
              text={"TRACTO CAMIÓN"}
              sx={{ bgcolor: "#343A40", m: 1, fontSize: "1.3rem" }}
            />
            <CustomButton
              onClick={() => handleTabChange("BOX")}
              text={"CAJA"}
              sx={{ bgcolor: "#343A40", m: 1, fontSize: "1.3rem" }}
            />
            <CustomButton
              onClick={() => handleTabChange("RESUMEN")}
              text={"RESUMEN"}
              sx={{ bgcolor: "#343A40", m: 1, fontSize: "1.3rem" }}
            />
          </Box>
          <Typography
            variant="h4"
            sx={{ textAlign: "center", my: 2, fontWeight: "500" }}
          >
            {currentTab === "TRUCK_TRACTOR"
              ? "TRACTO CAMIÓN"
              : currentTab === "BOX"
              ? "CAJA"
              : ""}
          </Typography>
          {currentTab !== "RESUMEN" ? (
            <SemaphoreReportTable data={dataTable} currentTab={currentTab} />
          ) : (
            <SemaphoreReportSummary
              depthTable={depthTable}
              conditionTable={conditionTable}
              onRowClick={onRowClick}
            />
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
