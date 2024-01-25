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
import { useFilterDependencies } from "src/hooks/dependencies";
import { useProgressQuery } from "src/hooks/progress";
import { useIdentity } from "src/stores/general/identity";
import {
  getCompanyViaWorkArea,
  getCorporateViaWorkArea,
  getSubsidiaryViaWorkArea,
} from "src/utils/workArea";

import {
  getAlertsPanel,
  getAlertsPanelGraphics,
  getAlertsPanelTable,
} from "../api/alertsPanelApi";
import {
  AlertsPanelFilterInputType,
  AlertsPanelFilterSchemaType,
  alertsPanelFilterDefaultValues,
  alertsPanelFilterSchema,
} from "../validation/filterAlertsPanel";
import { AlertsPanelButtons } from "./AlertsPanelButtons";
import { AlertsPanelFilterForm } from "./AlertsPanelFilterForm";
import { AlertsPanelFilters } from "./AlertsPanelFilters";
import { AlertsPanelGraphics } from "./AlertsPanelGraphics";
import { AlertsPanelPills } from "./AlertsPanelPills";
import { AlertsPanelPillsDamageWear } from "./AlertsPanelPillsDamageWear";
import { AlertsPanelTable } from "./AlertsPanelTable";

export { AlertsPanel };

function AlertsPanel() {
  const { t } = useTranslation();
  const account = useIdentity((state) => state.account);
  const workArea = useIdentity((state) => state.workArea);
  const profileCorporate = getCorporateViaWorkArea(account, workArea);
  const profileCompanies = getCompanyViaWorkArea(account, workArea);
  const profileSubsidiaries = getSubsidiaryViaWorkArea(account, workArea);
  const [filters, setFilters] = useState<URLSearchParams>();
  const [active, setActive] = useState("Tires");
  const [selectedPill, setSelectedPill] = useState<{
    id: number;
    type: string;
  }>();
  const [titlePrio, setTitlePrio] = useState<{
    title: string;
    priority: string;
  }>();
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] =
    useState<Partial<Record<keyof AlertsPanelFilterSchemaType, string>>>();

  const alertsPanelQuery = useQuery({
    queryKey: ["alertsPanel", filters?.toString()],
    queryFn: async () => {
      return await getAlertsPanel(filters);
    },
    enabled: !!filters,
  });
  useProgressQuery(alertsPanelQuery, "alertsPanel");

  const alertsPanel = alertsPanelQuery.data;

  const alertsPanelGraphicsQuery = useQuery({
    queryKey: [
      "alertsPanelGraphics",
      selectedPill?.id,
      selectedPill?.type,
      filters?.toString(),
    ],
    queryFn: async () => {
      return await getAlertsPanelGraphics(
        selectedPill || { id: 0, type: "" },
        filters,
      );
    },
    enabled: !!selectedPill,
  });
  useProgressQuery(alertsPanelGraphicsQuery, "alertsPanelGraphics");

  const alertsPanelGraphics = alertsPanelGraphicsQuery.data;

  const alertsPanelTableQuery = useQuery({
    queryKey: [
      "alertsPanelTable",
      selectedPill?.id,
      selectedPill?.type,
      filters?.toString(),
    ],
    queryFn: async () => {
      return await getAlertsPanelTable(
        selectedPill || { id: 0, type: "" },
        filters,
      );
    },
    enabled: !!selectedPill,
  });
  useProgressQuery(alertsPanelTableQuery, "alertsPanelTable");

  const alertsPanelTable = alertsPanelTableQuery.data;

  const alertsPanelFilterForm = useForm<
    AlertsPanelFilterInputType,
    unknown,
    AlertsPanelFilterSchemaType
  >({
    defaultValues: alertsPanelFilterDefaultValues,
    resolver: zodResolver(alertsPanelFilterSchema),
  });

  const [corporate_id, companies] = useWatch({
    control: alertsPanelFilterForm.control,
    name: ["corporate_id", "companies"],
  });

  const dependencies = useFilterDependencies(
    ["corporates", "companies", "subsidiaries", "alerts"],
    {
      corporate_id: corporate_id,
      company_id: companies.toString(),
    },
    ["corporate_id", "companies", "subsidiaries"],
  );

  function handleSelectedPill(id: number, title: string, priority: string) {
    setSelectedPill({
      id: id,
      type:
        active == "Tires"
          ? "tire"
          : active == "Vehicle"
          ? "vehicle"
          : active == "Mounts"
          ? "mount"
          : active == "Damages"
          ? "damages"
          : "wear",
    });
    setTitlePrio({ title: title, priority: priority });
  }

  function handleDefaultFilters() {
    alertsPanelFilterForm.setValue(
      "corporate_id",
      profileCorporate?.corporate_id || "",
    );
    alertsPanelFilterForm.setValue(
      "companies",
      profileCompanies.map((company) => company.company_id),
    );
    alertsPanelFilterForm.setValue(
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
    handleSelectedFilters();
  }

  function handleSelectedFilters() {
    const newSelectedFilters: Partial<
      Record<keyof AlertsPanelFilterSchemaType, string>
    > = {};
    const values = alertsPanelFilterForm.getValues();
    if (values.date_from !== "") {
      newSelectedFilters["date_from"] = values.date_from;
    }
    if (values.date_to !== "") {
      newSelectedFilters["date_to"] = values.date_to;
    }
    if (values.corporate_id) {
      const localCorporate = dependencies.corporates.find(
        (c: any) => `${c.corporate_id}` === `${values.corporate_id}`,
      );
      if (localCorporate) {
        newSelectedFilters["corporate_id"] = localCorporate.name;
      }
    }
    if (values.companies.length > 0) {
      const companyArray = dependencies.companies
        .filter((c: any) => values.companies.includes(c.company_id))
        .map((c: any) => c.name);
      newSelectedFilters["companies"] = companyArray.join(", ");
    }
    if (values.subsidiaries.length > 0) {
      const subsidiaryArray = dependencies.subsidiaries
        .filter((c: any) => values.subsidiaries.includes(c.subsidiary_id))
        .map((c: any) => c.name);
      newSelectedFilters["subsidiaries"] = subsidiaryArray.join(", ");
    }
    if (values.alert_codes.length > 0) {
      const alertsArray = dependencies.alerts
        .filter((c: any) => values.alert_codes.includes(c.alert_id))
        .map((c: any) =>
          t(`alerts:colloquial_name.${c.colloquial_name.toLowerCase()}`),
        );
      newSelectedFilters["alert_codes"] = alertsArray.join(", ");
    }
    if (values.ranking_alert.length > 0) {
      const rankingArray = values.ranking_alert.map((c: any) =>
        t(`labels:ranking_alert.options.${c.toLowerCase()}`),
      );
      newSelectedFilters["ranking_alert"] = rankingArray.join(", ");
    }
    if (values.priority.length > 0) {
      const priorityArray = values.priority.map((c: any) =>
        t(`labels:priority.options.${c.toLowerCase()}`),
      );
      newSelectedFilters["priority"] = priorityArray.join(", ");
    }
    setSelectedFilters(newSelectedFilters);
  }

  function onFilter(data: AlertsPanelFilterSchemaType) {
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
    if (data.ranking_alert.length > 0) {
      searchParams.append("ranking_alert", data.ranking_alert.join(","));
    }
    if (data.priority.length > 0) {
      searchParams.append("priority", data.priority.join(","));
    }
    if (data.alert_codes.length > 0) {
      searchParams.append("alert_codes", data.alert_codes.join(","));
    }
    setFilters(searchParams);
  }

  function onClear() {
    alertsPanelFilterForm.reset();
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
        onConfirm={alertsPanelFilterForm.handleSubmit(async (data) => {
          onFilter(data);
          handleSelectedFilters();
        })}
        onClear={() => {
          onClear();
          setFilterModalOpen(false);
        }}
      >
        <AlertsPanelFilterForm
          form={alertsPanelFilterForm}
          dependencies={dependencies}
        />
      </BaseFilterModal>
      <BaseContainer title={t("common:alert_plural")}>
        {selectedFilters && Object.keys(selectedFilters).length > 0 && (
          <AlertsPanelFilters selectedFilters={selectedFilters} />
        )}
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          {alertsPanel && (
            <AlertsPanelButtons
              active={active}
              setActive={setActive}
              alertsPanel={alertsPanel}
            />
          )}
          {alertsPanel &&
            (active === "Tires" ||
              active === "Vehicle" ||
              active == "Mounts") && (
              <AlertsPanelPills
                data={alertsPanel[active]}
                setSelectedPill={handleSelectedPill}
              />
            )}
          {alertsPanel && (active === "Damages" || active === "Wear") && (
            <AlertsPanelPillsDamageWear
              data={alertsPanel[active]}
              setSelectedPill={handleSelectedPill}
            />
          )}

          {alertsPanel &&
            alertsPanelGraphics &&
            alertsPanelTable &&
            titlePrio && (
              <Grid container maxWidth="xl" spacing={1} mt={2}>
                <Grid item xs={12} md={6}>
                  <AlertsPanelGraphics
                    data={alertsPanelGraphics}
                    options={titlePrio}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <AlertsPanelTable
                    title={titlePrio.title}
                    data={alertsPanelTable}
                    priority={titlePrio.priority}
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
