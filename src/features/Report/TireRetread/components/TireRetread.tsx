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
  getTireRetreadProvider,
  getTireRetreadProviderGraphics,
  getTireRetreadProviderTable,
} from "../api/tireRetreadApi";
import { useTireRetreadDependencies } from "../hooks/dependencies";
import {
  TireRetreadFilterInputType,
  TireRetreadFilterSchemaType,
  tireRetreadFilterDefaultValues,
  tireRetreadFilterSchema,
} from "../validation/filterTireRetread";
import { TireRetreadFilterForm } from "./TireRetreadFilterForm";
import { TireRetreadFilters } from "./TireRetreadFilters";
import { TireRetreadProviderCards } from "./TireRetreadProviderCards";
import { TireRetreadProviderGraphics } from "./TireRetreadProviderGraphics";
import { TireRetreadProviderTable } from "./TireRetreadProviderTable";

export { TireRetread };

function TireRetread() {
  const { t } = useTranslation();
  const account = useIdentity((state) => state.account);
  const workArea = useIdentity((state) => state.workArea);
  const profileCorporate = getCorporateViaWorkArea(account, workArea);
  const profileCompanies = getCompanyViaWorkArea(account, workArea);
  const profileSubsidiaries = getSubsidiaryViaWorkArea(account, workArea);
  const [filters, setFilters] = useState<URLSearchParams>();
  const [provider, setProvider] = useState<number>();
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] =
    useState<Partial<Record<keyof TireRetreadFilterSchemaType, string>>>();

  const tireRetreadsQuery = useQuery({
    queryKey: ["tireRetread", filters?.toString()],
    queryFn: async () => {
      return await getTireRetreadProvider(filters);
    },
    enabled: !!filters,
  });
  useProgressQuery(tireRetreadsQuery, "tireRetread");

  const tireRetreads = tireRetreadsQuery.data;

  const tireRetreadsGraphicsQuery = useQuery({
    queryKey: ["tireRetreadGraphics", provider, filters?.toString()],
    queryFn: async () => {
      return await getTireRetreadProviderGraphics(provider || 0, filters);
    },
    enabled: !!provider,
  });
  useProgressQuery(tireRetreadsGraphicsQuery, "tireRetreadGraphics");

  const tireRetreadsGraphics = tireRetreadsGraphicsQuery.data;

  const tireRetreadsTableQuery = useQuery({
    queryKey: ["tireRetreadTable", provider, filters?.toString()],
    queryFn: async () => {
      return await getTireRetreadProviderTable(provider || 0, filters);
    },
    enabled: !!provider,
  });
  useProgressQuery(tireRetreadsTableQuery, "tireRetreadTable");

  const tireRetreadsTable = tireRetreadsTableQuery.data;

  const tireRetreadFilterForm = useForm<
    TireRetreadFilterInputType,
    unknown,
    TireRetreadFilterSchemaType
  >({
    defaultValues: tireRetreadFilterDefaultValues,
    resolver: zodResolver(tireRetreadFilterSchema),
  });

  const [corporate_id, companies, subsidiaries] = useWatch({
    control: tireRetreadFilterForm.control,
    name: ["corporate_id", "companies", "subsidiaries"],
  });

  const dependencies = useTireRetreadDependencies({
    corporate_id: corporate_id,
    company: companies,
    subsidiary: subsidiaries,
  });

  function handleProviderChange(provider: number) {
    setProvider(provider);
  }

  function getProviderName(providerId: number): string {
    if (tireRetreads) {
      for (const cityKey in tireRetreads) {
        const cityData = tireRetreads[cityKey];
        const foundProviderKey = Object.keys(cityData).find(
          (providerKey) => cityData[providerKey].provider_id === providerId,
        );
        return foundProviderKey || "";
      }
    }
    return "";
  }

  function handleSelectedFilters() {
    const newSelectedFilters: Partial<
      Record<keyof TireRetreadFilterSchemaType, string>
    > = {};
    const values = tireRetreadFilterForm.getValues();
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
    if (values.providers.length > 0) {
      const providerArray: string[] = [];
      for (let i = 0; i < values.providers.length; i++) {
        const localProvider = dependencies.providers.find(
          (s) => `${s.provider_id}` === `${values.providers[i]}`,
        );
        if (localProvider) {
          providerArray.push(localProvider.name);
        }
      }
      newSelectedFilters["providers"] = providerArray.join(", ");
    }
    setSelectedFilters(newSelectedFilters);
  }

  function onFilter(data: TireRetreadFilterSchemaType) {
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
    if (data.providers.length > 0) {
      searchParams.append("providers", data.providers.join(","));
    }
    setFilters(searchParams);
  }

  function handleDefaultFilters() {
    tireRetreadFilterForm.setValue(
      "corporate_id",
      profileCorporate?.corporate_id || "",
    );
    tireRetreadFilterForm.setValue(
      "companies",
      profileCompanies.map((company) => company.company_id),
    );
    tireRetreadFilterForm.setValue(
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
    tireRetreadFilterForm.reset();
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
        onConfirm={tireRetreadFilterForm.handleSubmit(async (data) => {
          onFilter(data);
          handleSelectedFilters();
        })}
        onClear={() => {
          onClear();
          setFilterModalOpen(false);
        }}
      >
        <TireRetreadFilterForm
          form={tireRetreadFilterForm}
          dependencies={dependencies}
        />
      </BaseFilterModal>
      <BaseContainer title={t("titles:tire_revitalized_report")}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          {selectedFilters && Object.keys(selectedFilters).length > 0 && (
            <TireRetreadFilters selectedFilters={selectedFilters} />
          )}
          <ReportTitle subtitleDark={t("labels:summary_mount_report.title")} />

          {tireRetreads && (
            <TireRetreadProviderCards
              tireRetreads={tireRetreads}
              handleProviderChange={handleProviderChange}
            />
          )}

          {tireRetreads && tireRetreadsGraphics && tireRetreadsTable && (
            <Grid container maxWidth="xl" spacing={1} mt={2}>
              <Grid item xs={12} md={6}>
                <TireRetreadProviderGraphics data={tireRetreadsGraphics} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TireRetreadProviderTable
                  title={getProviderName(provider || 0)}
                  tires={tireRetreadsTable}
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
