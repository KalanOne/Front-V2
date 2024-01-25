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

import { getDamageWears } from "../api/damageWearApi";
import {
  DamageWearFilterInputType,
  DamageWearFilterSchemaType,
  damageWearFilterDefaultValues,
  damageWearFilterSchema,
} from "../validation/filterForm";
import { DamageWearFilterForm } from "./DamageWearFilterForm";
import { DamageWearFilters } from "./DamageWearFilters";
import { DamageWearTable } from "./DamageWearTable";

export { DamageWearReport };

function DamageWearReport(): React.ReactElement {
  const { t } = useTranslation();
  const [modals, setModals] = useState({
    filter: false,
  });
  const [filters, setFilters] = useState<URLSearchParams>();
  const [selectedFilters, setSelectedFilters] =
    useState<Partial<Record<keyof DamageWearFilterSchemaType, string>>>();

  const damageWear = useQuery({
    queryKey: ["damageWear", filters?.toString()],
    queryFn: async () => {
      return await getDamageWears(filters);
    },
    enabled: !!filters,
  });
  const damageWearData = damageWear.data ?? undefined;
  useProgressQuery(damageWear, "damageWear");

  const damageWearFilterForm = useForm<
    DamageWearFilterInputType,
    unknown,
    DamageWearFilterSchemaType
  >({
    defaultValues: damageWearFilterDefaultValues,
    resolver: zodResolver(damageWearFilterSchema),
  });

  const [corporate_id, companies] = useWatch({
    control: damageWearFilterForm.control,
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

  // Set selected filters
  function handleSelectedFilters() {
    const newSelectedFilters: Partial<
      Record<keyof DamageWearFilterSchemaType, string>
    > = {};
    const values = damageWearFilterForm.getValues();
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

  function onFilter(data: DamageWearFilterSchemaType) {
    const searchParams = new URLSearchParams();
    if (data.dateFrom) {
      searchParams.append("date_from", data.dateFrom);
      damageWearFilterForm.setValue("dateFrom", data.dateFrom);
    }
    if (data.dateTo) {
      searchParams.append("date_to", data.dateTo);
      damageWearFilterForm.setValue("dateTo", data.dateTo);
    }
    if (data.corporate_id) {
      searchParams.append("corporate_id", data.corporate_id.toString());
      damageWearFilterForm.setValue("corporate_id", data.corporate_id);
    }
    if (data.companies.length > 0) {
      searchParams.append("companies", data.companies.toString());
      damageWearFilterForm.setValue("companies", data.companies);
    }
    if (data.subsidiaries.length > 0) {
      searchParams.append("subsidiaries", data.subsidiaries.toString());
      damageWearFilterForm.setValue("subsidiaries", data.subsidiaries);
    }
    setFilters(searchParams);
  }

  function handleDefaultFilters() {
    damageWearFilterForm.setValue("dateFrom", "2023-01-01");
    damageWearFilterForm.setValue("dateTo", "2024-01-31");
    setFilters(
      new URLSearchParams({
        date_from: "2023-01-01",
        date_to: "2024-01-31",
      }),
    );
  }

  function onClear() {
    damageWearFilterForm.reset();
    handleDefaultFilters();
  }

  useEffect(() => {
    handleDefaultFilters();
    handleSelectedFilters();
  }, []);

  return (
    <>
      <BaseFilterModal
        open={modals.filter}
        title={t("general:filter")}
        onClose={() => setModals({ ...modals, filter: false })}
        onConfirm={damageWearFilterForm.handleSubmit(
          async (data) => {
            onFilter(data);
            handleSelectedFilters();
          },
          // (d) => console.log(d),
        )}
        onClear={onClear}
      >
        <DamageWearFilterForm
          form={damageWearFilterForm}
          dependencies={filterDependencies}
        ></DamageWearFilterForm>
      </BaseFilterModal>
      <BaseContainer title={"Daños y Desgastes"}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          {selectedFilters && (
            <DamageWearFilters
              selectedFilters={selectedFilters}
            ></DamageWearFilters>
          )}
          <Divider />
          <Typography
            variant="h4"
            sx={{ textAlign: "center", mt: 3, fontWeight: "500" }}
          >
            {"Reporte de Daños y Desgastes a Modelos de Neumáticos"}
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ textAlign: "center" }}>
            {
              "Este reporte muestra modelos de neumáticos con porcentajes de daños y desgastes."
            }
          </Typography>
          <Typography
            component={"p"}
            textAlign={"center"}
            color={"lightcoral"}
            fontSize={14}
            mb={3}
          >
            {"Ubicación: MONTADA, ALMACÉN y PILA"}
          </Typography>
          <Divider />
          <CustomButton
            onClick={() => {}}
            text={"GENERAR EXCEL"}
            sx={{ my: 3 }}
          />
          {damageWearData && <DamageWearTable data={damageWearData} />}
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
