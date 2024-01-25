import { useEffect, useState } from "react";

import FilterListIcon from "@mui/icons-material/FilterList";
import { Container, Grid, IconButton, Stack } from "@mui/material";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { BaseContainer } from "src/components/common/BaseContainer";
import { Portal } from "src/components/common/Portal";
import { BaseFilterModal } from "src/components/modal/BaseFilterModal";
import { ReportTitle } from "src/components/report/ReportTitle";
import { useProgressQuery } from "src/hooks/progress";
import { useIdentity } from "src/stores/general/identity";
import {
  getCompanyViaWorkArea,
  getCorporateViaWorkArea,
  getSubsidiaryViaWorkArea,
} from "src/utils/workArea";

import {
  getDismountedTireWarehouse,
  getDismountedTireWarehouseGraphics,
  getDismountedTireWarehouseTable,
} from "../api/dismountedTireApi";
import { useDismountedTireDependencies } from "../hooks/dependencies";
import {
  DismountedTireFilterInputType,
  DismountedTireFilterSchemaType,
  dismountedTireFilterDefaultValues,
  dismountedTireFilterSchema,
} from "../validation/filterDismountedTire";
import { DismountedTireFilterForm } from "./DismountedTireFilterForm";
import { DismountedTireFilters } from "./DismountedTireFilters";
import { DismountedTireWarehouseCards } from "./DismountedTireWarehouseCards";
import { DismountedTireWarehouseGraphics } from "./DismountedTireWarehouseGraphics";
import { DismountedTireWarehouseTable } from "./DismountedTireWarehouseTable";

export { DismountedTire };

function DismountedTire() {
  const { t } = useTranslation();
  const account = useIdentity((state) => state.account);
  const workArea = useIdentity((state) => state.workArea);
  const profileCorporate = getCorporateViaWorkArea(account, workArea);
  const profileCompanies = getCompanyViaWorkArea(account, workArea);
  const profileSubsidiaries = getSubsidiaryViaWorkArea(account, workArea);
  const [filters, setFilters] = useState<URLSearchParams>();
  const [warehouse, setWarehouse] = useState<number>();
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] =
    useState<Partial<Record<keyof DismountedTireFilterSchemaType, string>>>();

  const dismountedTiresQuery = useQuery({
    queryKey: ["dismountedTire", filters?.toString()],
    queryFn: async () => {
      return await getDismountedTireWarehouse(filters);
    },
    enabled: !!filters,
  });
  useProgressQuery(dismountedTiresQuery, "dismountedTire");

  const dismountedTires = dismountedTiresQuery.data;

  const dismountedTiresGraphicsQuery = useQuery({
    queryKey: ["dismountedTireGraphics", warehouse, filters?.toString()],
    queryFn: async () => {
      return await getDismountedTireWarehouseGraphics(warehouse || 0, filters);
    },
    enabled: !!warehouse,
  });
  useProgressQuery(dismountedTiresGraphicsQuery, "dismountedTireGraphics");

  const dismountedTiresGraphics = dismountedTiresGraphicsQuery.data;

  const dismountedTiresTableQuery = useQuery({
    queryKey: ["dismountedTireTable", warehouse, filters?.toString()],
    queryFn: async () => {
      return await getDismountedTireWarehouseTable(warehouse || 0, filters);
    },
    enabled: !!warehouse,
  });
  useProgressQuery(dismountedTiresTableQuery, "dismountedTireTable");

  const dismountedTiresTable = dismountedTiresTableQuery.data;

  const dismountedTireFilterForm = useForm<
    DismountedTireFilterInputType,
    unknown,
    DismountedTireFilterSchemaType
  >({
    defaultValues: dismountedTireFilterDefaultValues,
    resolver: zodResolver(dismountedTireFilterSchema),
  });

  const [corporate_id, companies, subsidiaries] = useWatch({
    control: dismountedTireFilterForm.control,
    name: ["corporate_id", "companies", "subsidiaries"],
  });

  const dependencies = useDismountedTireDependencies({
    corporate_id: corporate_id,
    company: companies,
    subsidiary: subsidiaries,
  });

  function handleWarehouseChange(warehouse: number) {
    setWarehouse(warehouse);
  }

  function getWarehouseName(warehouseId: number): string {
    if (dismountedTires) {
      for (const cityKey in dismountedTires) {
        const cityData = dismountedTires[cityKey];
        const foundWarehouseKey = Object.keys(cityData).find(
          (warehouseKey) => cityData[warehouseKey].warehouse_id === warehouseId,
        );
        return foundWarehouseKey || "";
      }
    }
    return "";
  }

  function handleSelectedFilters() {
    const newSelectedFilters: Partial<
      Record<keyof DismountedTireFilterSchemaType, string>
    > = {};
    const values = dismountedTireFilterForm.getValues();
    if (values.date_from !== "") {
      newSelectedFilters["date_from"] = values.date_from;
    }
    if (values.date_to !== "") {
      newSelectedFilters["date_to"] = values.date_to;
    }
    if (values.corporate_id) {
      const localCorporate = dependencies.corporates.find(
        (c) => `${c.corporate_id}` === `${values.corporate_id}`,
      );
      if (localCorporate) {
        newSelectedFilters["corporate_id"] = localCorporate.name;
      }
    }
    if (values.companies.length > 0) {
      const companyArray = dependencies.companies
        .filter((c) => values.companies.includes(c.company_id))
        .map((c) => c.name);
      newSelectedFilters["companies"] = companyArray.join(", ");
    }
    if (values.subsidiaries.length > 0) {
      const subsidiaryArray: string[] = [];
      for (let i = 0; i < values.subsidiaries.length; i++) {
        const subsidiary = dependencies.subsidiaries.find(
          (s) => `${s.subsidiary_id}` === `${values.subsidiaries[i]}`,
        );
        if (subsidiary) {
          subsidiaryArray.push(subsidiary.name);
        }
      }
      newSelectedFilters["subsidiaries"] = subsidiaryArray.join(", ");
    }
    if (values.warehouses.length > 0) {
      const warehousesArray: string[] = [];
      for (let i = 0; i < values.warehouses.length; i++) {
        const localWarehouse = dependencies.wareHouses.find(
          (s) => `${s.warehouse_id}` === `${values.warehouses[i]}`,
        );
        if (localWarehouse) {
          warehousesArray.push(localWarehouse.name);
        }
      }
      newSelectedFilters["warehouses"] = warehousesArray.join(", ");
    }
    setSelectedFilters(newSelectedFilters);
  }

  function onFilter(data: DismountedTireFilterSchemaType) {
    const searchParams = new URLSearchParams();
    if (data.date_from !== "") {
      searchParams.append("date_from", data.date_from);
    }
    if (data.date_to !== "") {
      searchParams.append("date_to", data.date_to);
    }
    if (data.corporate_id) {
      searchParams.append("corporate_id", `${data.corporate_id}`);
    }
    if (data.companies.length > 0) {
      searchParams.append("companies", data.companies.join(","));
    }
    if (data.subsidiaries.length > 0) {
      searchParams.append("subsidiaries", data.subsidiaries.join(","));
    }
    if (data.warehouses.length > 0) {
      searchParams.append("warehouses", data.warehouses.join(","));
    }
    setFilters(searchParams);
  }

  function handleDefaultFilters() {
    dismountedTireFilterForm.setValue(
      "corporate_id",
      profileCorporate?.corporate_id || "",
    );
    dismountedTireFilterForm.setValue(
      "companies",
      profileCompanies.map((company) => company.company_id),
    );
    dismountedTireFilterForm.setValue(
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
    dismountedTireFilterForm.reset();
    handleDefaultFilters();
  }

  useEffect(() => {
    if (account && workArea) {
      handleDefaultFilters();
    }
  }, [account, workArea]);

  useEffect(() => {
    if (dependencies.done) {
      handleSelectedFilters();
    }
  }, [dependencies.done]);

  return (
    <>
      <BaseFilterModal
        open={filterModalOpen}
        title={t("general:filter")}
        onClose={() => setFilterModalOpen(false)}
        onConfirm={dismountedTireFilterForm.handleSubmit(async (data) => {
          onFilter(data);
          handleSelectedFilters();
        })}
        onClear={() => {
          onClear();
          setFilterModalOpen(false);
        }}
      >
        <DismountedTireFilterForm
          form={dismountedTireFilterForm}
          dependencies={dependencies}
        />
      </BaseFilterModal>
      <BaseContainer title={t("titles:summary_warehouse_report")}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          {selectedFilters && Object.keys(selectedFilters).length > 0 && (
            <DismountedTireFilters selectedFilters={selectedFilters} />
          )}

          <ReportTitle
            subtitleDark={t("labels:summary_warehouse_report.title")}
          />

          {dismountedTires && (
            <DismountedTireWarehouseCards
              dismountedTires={dismountedTires}
              handleWarehouseChange={handleWarehouseChange}
            />
          )}

          {dismountedTires &&
            dismountedTiresGraphics &&
            dismountedTiresTable && (
              <Grid container maxWidth="xl" spacing={1} mt={2}>
                <Grid item xs={12} md={6}>
                  <DismountedTireWarehouseGraphics
                    data={dismountedTiresGraphics}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DismountedTireWarehouseTable
                    title={getWarehouseName(warehouse || 0)}
                    tires={dismountedTiresTable}
                  />
                </Grid>
              </Grid>
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
