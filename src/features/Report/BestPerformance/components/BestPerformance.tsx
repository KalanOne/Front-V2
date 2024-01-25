import React, { useState } from "react";

import FilterListIcon from "@mui/icons-material/FilterList";
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
// import moment from "moment-timezone";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { BaseContainer } from "src/components/common/BaseContainer.tsx";
import { Portal } from "src/components/common/Portal";
import { TableTitle } from "src/components/common/TableTitle.tsx";
import { BaseFilterModal } from "src/components/modal/BaseFilterModal.tsx";
import { FilteredItem } from "src/components/report/FilteredItem.tsx";
import { ReportTitle } from "src/components/report/ReportTitle.tsx";
import { useProgressQuery } from "src/hooks/progress.tsx";
import { removeUndefined } from "src/utils/object.ts";

import { getBestPerformance } from "../api/bestPerformanceApi.ts";
import { useBestPerformanceDependencies } from "../hooks/dependencies.tsx";
import {
  BestPerformanceFilterSchemaType,
  bestPerformanceFilterDefaultValues,
  bestPerformanceFilterSchema,
} from "../validation/filterBestPerformance.ts";
import { BestPerformanceAccordionTable } from "./BestPerformanceAccordionTable.tsx";
import { BestPerformanceFilterForm } from "./BestPerformanceFilterForm.tsx";
import { BestPerformanceTable } from "./BestPerformanceTable.tsx";

export { BestPerformance };

function BestPerformance(): React.ReactElement {
  const { t } = useTranslation();
  const [filters, setFilters] = useState(
    new URLSearchParams({
      movement: "MOUNT",
    }),
  );
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<
    Partial<BestPerformanceFilterSchemaType>
  >({
    movement: "Montadas",
  });

  const bestPerformanceQuery = useQuery({
    queryKey: ["bestPerformance", filters.toString()],
    queryFn: async () => {
      return await getBestPerformance(filters);
    },
  });
  useProgressQuery(bestPerformanceQuery, "bestPerformance");

  const bestPerformances = bestPerformanceQuery.data;
  const originalData = bestPerformances?.origin;
  const revitalizedData = bestPerformances?.revitalized;

  const bestPerformanceFilterForm = useForm({
    defaultValues: bestPerformanceFilterDefaultValues,
    resolver: zodResolver(bestPerformanceFilterSchema),
  });

  const [corporate_id, companies] = useWatch({
    control: bestPerformanceFilterForm.control,
    name: ["corporate_id", "companies"],
  });

  const dependencies = useBestPerformanceDependencies({
    corporate_id: corporate_id,
    company: companies,
  });

  function onFilter(data: BestPerformanceFilterSchemaType) {
    const searchParams = new URLSearchParams();
    const newSelectedFilters: Partial<BestPerformanceFilterSchemaType> = {};
    if (data.movement) {
      searchParams.append("movement", data.movement);
      switch (data.movement) {
        case "BOTH":
          newSelectedFilters["movement"] = "Ambas (Almacenadas y Montadas)";
          break;
        case "WAREHOUSE":
          newSelectedFilters["movement"] = "Almacén";
          break;
        case "MOUNT":
          newSelectedFilters["movement"] = "Montadas";
          break;
        case "PILE":
          newSelectedFilters["movement"] = "Pila";
          break;
      }
    }
    if (data.subsidiaries.length > 0) {
      searchParams.append("subsidiaries", data.subsidiaries.join(","));
      const subsidiaryArray: string[] = [];
      for (let i = 0; i < data.subsidiaries.length; i++) {
        const subsidiary = dependencies.subsidiaries.find(
          (s) => `${s.subsidiary_id}` === `${data.subsidiaries[i]}`,
        );
        if (subsidiary) {
          subsidiaryArray.push(subsidiary.name);
        }
      }
      newSelectedFilters["subsidiaries"] = subsidiaryArray;
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
    if (data.date_from) {
      searchParams.append("date_from", data.date_from);
      newSelectedFilters["date_from"] = data.date_from;
    }
    if (data.date_to) {
      searchParams.append("date_to", data.date_to);
      newSelectedFilters["date_to"] = data.date_to;
    }
    if (data.tire_application.length > 0) {
      searchParams.append("tire_application", data.tire_application.join(","));
      const tireApplicationArray: string[] = [];
      for (let i = 0; i < data.tire_application.length; i++) {
        switch (data.tire_application[i]) {
          case "ALL_POSITION":
            tireApplicationArray.push(
              t("labels:tire_application.options.all_position"),
            );
            break;
          case "DIRECTIONAL":
            tireApplicationArray.push(
              t("labels:tire_application.options.directional"),
            );
            break;
          case "TRACTION":
            tireApplicationArray.push(
              t("labels:tire_application.options.traction"),
            );
            break;
          case "TRAILER":
            tireApplicationArray.push(
              t("labels:tire_application.options.trailer"),
            );
            break;
        }
      }
      newSelectedFilters["tire_application"] = tireApplicationArray;
    }
    if (data.tire_condition.length > 0) {
      searchParams.append("tire_condition", data.tire_condition.join(","));
      const tireConditionArray: string[] = [];
      for (let i = 0; i < data.tire_application.length; i++) {
        switch (data.tire_application[i]) {
          case "ORIGINAL_NEW":
            tireConditionArray.push("Original Nueva");
            break;
          case "ORIGINAL_USED":
            tireConditionArray.push("Original Usada");
            break;
          case "RETREAD_NEW":
            tireConditionArray.push("Renovada Nueva");
            break;
          case "RETREAD_USED":
            tireConditionArray.push("Renovada Usada");
            break;
        }
      }
      newSelectedFilters["tire_condition"] = tireConditionArray;
    }
    if (data.price) {
      searchParams.append("price", data.price);
      newSelectedFilters["price"] = data.price;
    }
    if (data.helmet_value) {
      searchParams.append("helmet_value", data.helmet_value);
      newSelectedFilters["helmet_value"] = data.helmet_value;
    }
    if (data.min_travel) {
      searchParams.append("min_travel", data.min_travel);
      newSelectedFilters["min_travel"] = data.min_travel;
    }
    if (data.max_travel) {
      searchParams.append("max_travel", data.max_travel);
      newSelectedFilters["max_travel"] = data.max_travel;
    }
    removeUndefined(newSelectedFilters);
    setSelectedFilters(newSelectedFilters);
    setFilters(searchParams);
  }

  return (
    <>
      <BaseFilterModal
        open={filterModalOpen}
        title={t("general:filter")}
        onClose={() => setFilterModalOpen(false)}
        onConfirm={bestPerformanceFilterForm.handleSubmit(async (data) => {
          onFilter(data);
        })}
        onClear={() => {
          bestPerformanceFilterForm.reset();
          setFilters(
            new URLSearchParams({
              movement: "BOTH",
            }),
          );
          setFilterModalOpen(false);
        }}
      >
        <BestPerformanceFilterForm
          form={bestPerformanceFilterForm}
          dependencies={dependencies}
        />
      </BaseFilterModal>
      <BaseContainer title={"Mejor rendimiento"}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          {Object.keys(selectedFilters).length > 0 && (
            <Container maxWidth="xl" sx={{ mt: 3 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Grid2 container spacing={2}>
                  <Grid2 xs={12} md={6}>
                    {selectedFilters.corporate_id &&
                      selectedFilters.corporate_id !== "" && (
                        <FilteredItem
                          title={t("common:corporate")}
                          value={selectedFilters.corporate_id}
                        />
                      )}
                    {selectedFilters.companies &&
                      selectedFilters.companies !== "" && (
                        <FilteredItem
                          title={t("common:company")}
                          value={selectedFilters.companies}
                        />
                      )}
                    {selectedFilters.subsidiaries &&
                      selectedFilters.subsidiaries.length > 0 && (
                        <FilteredItem
                          title={t("common:subsidiary")}
                          value={selectedFilters.subsidiaries.join(", ")}
                        />
                      )}
                    {selectedFilters.tire_application &&
                      selectedFilters.tire_application.length > 0 && (
                        <FilteredItem
                          title={t("labels:tire_application.label.singular")}
                          value={selectedFilters.tire_application.join(", ")}
                        />
                      )}
                    {selectedFilters.tire_condition &&
                      selectedFilters.tire_condition.length > 0 && (
                        <FilteredItem
                          title={"Condición"}
                          value={selectedFilters.tire_condition.join(", ")}
                        />
                      )}
                  </Grid2>
                  <Grid2 xs={12} md={6}>
                    {selectedFilters.movement &&
                      selectedFilters.movement !== "" && (
                        <FilteredItem
                          title={"Ubicación"}
                          value={selectedFilters.movement}
                        />
                      )}
                    {selectedFilters.date_from &&
                      selectedFilters.date_from !== "" && (
                        <FilteredItem
                          title={"Desde"}
                          value={selectedFilters.date_from}
                          // value={moment(selectedFilters.date_from).format("LL")}
                        />
                      )}
                    {selectedFilters.date_to &&
                      selectedFilters.date_to !== "" && (
                        <FilteredItem
                          title={"Desde"}
                          value={selectedFilters.date_to}
                          // value={moment(selectedFilters.date_to).format("LL")}
                        />
                      )}
                    {selectedFilters.price && selectedFilters.price !== "" && (
                      <FilteredItem
                        title={"Precio"}
                        value={selectedFilters.price}
                      />
                    )}
                    {selectedFilters.helmet_value &&
                      selectedFilters.helmet_value !== "" && (
                        <FilteredItem
                          title={"Valor del casco"}
                          value={selectedFilters.helmet_value}
                        />
                      )}
                    {selectedFilters.min_travel &&
                      selectedFilters.min_travel !== "" && (
                        <FilteredItem
                          title={"Km mínimo"}
                          value={selectedFilters.min_travel}
                        />
                      )}
                    {selectedFilters.max_travel &&
                      selectedFilters.max_travel !== "" && (
                        <FilteredItem
                          title={"Km máximo"}
                          value={selectedFilters.max_travel}
                        />
                      )}
                  </Grid2>
                </Grid2>
              </Box>
            </Container>
          )}
          <ReportTitle
            title="El mejor neumático"
            subtitleDark="Este reporte muestra cual es el neumático con el mejor rendimiento en función a su km recorrido y costo."
          />
          <Typography variant={"h5"} sx={{ textAlign: "center" }}>
            Costo de neumáticos según su modelo Originales
          </Typography>
          {originalData && (
            <BestPerformanceAccordionTable bestPerformances={originalData} />
          )}
          <br />
          <Typography variant={"h5"} sx={{ textAlign: "center" }}>
            Costo Revitalizados
          </Typography>
          {revitalizedData && (
            <BestPerformanceAccordionTable bestPerformances={revitalizedData} />
          )}

          <TableTitle title={"Mejores Neumáticos Originales"} />
          {originalData && (
            <BestPerformanceTable bestPerformances={originalData} />
          )}

          <TableTitle title={"Mejores Neumáticos Revitalizados"} />
          {revitalizedData && (
            <BestPerformanceTable bestPerformances={revitalizedData} />
          )}

          <Portal elementId={"navbarPortal"}>
            <Stack direction={"row"} alignItems={"center"}>
              <IconButton
                sx={{ mr: 2 }}
                onClick={() => setFilterModalOpen(true)}
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
