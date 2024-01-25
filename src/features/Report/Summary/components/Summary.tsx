import { useEffect, useState } from "react";

import FilterListIcon from "@mui/icons-material/FilterList";
import { Container, IconButton, Stack } from "@mui/material";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { BaseContainer } from "src/components/common/BaseContainer";
import { Portal } from "src/components/common/Portal";
import { BaseCustomModal } from "src/components/modal/BaseCustomModal";
import { BaseFilterModal } from "src/components/modal/BaseFilterModal";
import { useFilterDependencies } from "src/hooks/dependencies";
import { useProgressQuery } from "src/hooks/progress";
import { useIdentity } from "src/stores/general/identity";
import { formatter } from "src/utils/formatters";
import {
  getCompanyViaWorkArea,
  getCorporateViaWorkArea,
  getSubsidiaryViaWorkArea,
} from "src/utils/workArea";

import { getSummary, getSummaryTable } from "../api/summaryApi";
import {
  Alert,
  SummaryAlertTableResponse,
  SummaryDepthTableResponse,
  SummaryPressureTableResponse,
} from "../types/summaryTypes";
import {
  SummaryFilterInputType,
  SummaryFilterSchemaType,
  summaryFilterDefaultValues,
  summaryFilterSchema,
} from "../validation/filterSummary";
import { AlertDetailTable } from "./AlertDetailTable";
import { AlertTable } from "./AlertTable";
import { DepthTable } from "./DepthTable";
import { PressureTable } from "./PressureTable";
import { SummaryAccordionTable } from "./SummaryAccordionTable";
import { SummaryButtons } from "./SummaryButtons";
import { SummaryFilterForm } from "./SummaryFilterForm";
import { SummaryFilters } from "./SummaryFilters";
import { SummaryGraphics } from "./SummaryGraphics";

export { Summary };

function Summary() {
  const { t } = useTranslation();
  const account = useIdentity((state) => state.account);
  const workArea = useIdentity((state) => state.workArea);
  const profileCorporate = getCorporateViaWorkArea(account, workArea);
  const profileCompanies = getCompanyViaWorkArea(account, workArea);
  const profileSubsidiaries = getSubsidiaryViaWorkArea(account, workArea);
  const [active, setActive] = useState<"pressure" | "depth" | "alert">(
    "pressure",
  );
  const [filters, setFilters] = useState<URLSearchParams>();
  const [tableFilters, setTableFilters] = useState<URLSearchParams>();
  const [openModals, setOpenModals] = useState<{
    filter: boolean;
    pressure: boolean;
    depth: boolean;
    alert: boolean;
    alertDetail: boolean;
  }>({
    filter: false,
    pressure: false,
    depth: false,
    alert: false,
    alertDetail: false,
  });
  const [selectedFilters, setSelectedFilters] =
    useState<Partial<Record<keyof SummaryFilterSchemaType, string>>>();
  const [alertDetail, setAlertDetail] = useState<Alert[]>([] as Alert[]);

  const summaryQuery = useQuery({
    queryKey: ["summary", filters?.toString(), active],
    queryFn: async () => {
      return await getSummary(active, filters);
    },
    enabled: !!filters,
  });
  useProgressQuery(summaryQuery, "summary");

  const summary = summaryQuery.data;

  const summaryTableQuery = useQuery({
    queryKey: ["summaryTable", tableFilters?.toString()],
    queryFn: async () => {
      return await getSummaryTable(active, tableFilters);
    },
    enabled: !!tableFilters,
  });
  useProgressQuery(summaryTableQuery, "summaryTable");

  const summaryTable = summaryTableQuery.data;

  const summaryFilterForm = useForm<
    SummaryFilterInputType,
    unknown,
    SummaryFilterSchemaType
  >({
    defaultValues: summaryFilterDefaultValues,
    resolver: zodResolver(summaryFilterSchema),
  });

  const [corporate_id, companies] = useWatch({
    control: summaryFilterForm.control,
    name: ["corporate_id", "companies"],
  });

  const dependencies = useFilterDependencies(
    ["corporates", "companies", "subsidiaries"],
    {
      corporate_id: corporate_id,
      company_id: companies.toString(),
    },
    ["corporate_id", "companies", "subsidiaries"],
  );

  function handleAlertClick(id: string) {
    setOpenModals((prevState) => {
      return { ...prevState, alertDetail: true };
    });
    setAlertDetail((summaryTable as SummaryAlertTableResponse)[id] as Alert[]);
  }

  function handleTableClick(data: any) {
    const values = summaryFilterForm.getValues();
    const searchParams = new URLSearchParams(data);
    if (values.date_from) {
      searchParams.append("date_from", values.date_from);
    }
    if (values.date_to) {
      searchParams.append("date_to", values.date_to);
    }
    if (values.corporate_id) {
      searchParams.append("corporate_id", `${values.corporate_id}`);
    }
    if (values.companies) {
      searchParams.append("companies", `${values.companies}`);
    }
    if (values.subsidiaries.length > 0) {
      searchParams.append("subsidiaries", values.subsidiaries.join(","));
    }
    if (values.movement) {
      searchParams.append("movement", values.movement);
    }
    if (values.with_refection) {
      searchParams.append("with_refection", "1");
    } else {
      searchParams.append("with_refection", "0");
    }
    if (values.depth_condition) {
      searchParams.append("depth_condition", `${values.depth_condition}`);
    }
    if (values.pressure_condition) {
      searchParams.append("pressure_condition", `${values.pressure_condition}`);
    }
    if (values.activity && values.activity !== "default") {
      searchParams.append("activity", `${values.activity}`);
    }
    if (values.review_type) {
      searchParams.append("review_type", `${values.review_type}`);
    }
    if (values.number_cycle) {
      searchParams.append("number_cycle", `${values.number_cycle}`);
    }
    searchParams.append("detail_type", active.toUpperCase());
    setTableFilters(searchParams);
    setOpenModals((prevState) => {
      return { ...prevState, [active]: true };
    });
  }

  function onFilter(data: SummaryFilterSchemaType) {
    const searchParams = new URLSearchParams();
    if (data.date_from) {
      searchParams.append("date_from", data.date_from);
    }
    if (data.date_to) {
      searchParams.append("date_to", data.date_to);
    }
    if (data.corporate_id) {
      searchParams.append("corporate_id", `${data.corporate_id}`);
    }
    if (data.companies) {
      searchParams.append("companies", `${data.companies}`);
    }
    if (data.subsidiaries.length > 0) {
      searchParams.append("subsidiaries", data.subsidiaries.join(","));
    }
    if (data.movement) {
      searchParams.append("movement", data.movement);
    }
    if (data.with_refection) {
      searchParams.append("with_refection", "1");
    } else {
      searchParams.append("with_refection", "0");
    }
    if (data.depth_condition) {
      searchParams.append("depth_condition", `${data.depth_condition}`);
    }
    if (data.pressure_condition) {
      searchParams.append("pressure_condition", `${data.pressure_condition}`);
    }
    if (data.activity && data.activity !== "default") {
      searchParams.append("activity", `${data.activity}`);
    }
    if (data.review_type) {
      searchParams.append("review_type", `${data.review_type}`);
    }
    if (data.number_cycle) {
      searchParams.append("number_cycle", `${data.number_cycle}`);
    }
    setFilters(searchParams);
  }

  function handleSelectedFilters() {
    const newSelectedFilters: Partial<
      Record<keyof SummaryFilterSchemaType, string>
    > = {};
    const values = summaryFilterForm.getValues();
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
    if (values.companies) {
      const localCompany = dependencies.companies.find(
        (c: any) => `${c.company_id}` === `${values.companies}`,
      );
      if (localCompany) {
        newSelectedFilters["companies"] = localCompany.name;
      }
    }
    if (values.subsidiaries.length > 0) {
      const subsidiaryArray = dependencies.subsidiaries
        .filter((c: any) => values.subsidiaries.includes(c.subsidiary_id))
        .map((c: any) => c.name);
      newSelectedFilters["subsidiaries"] = subsidiaryArray.join(", ");
    }
    if (values.movement) {
      newSelectedFilters["movement"] = t(
        `labels:location.options.${values.movement.toLowerCase()}`,
      );
    }
    if (values.with_refection) {
      newSelectedFilters["with_refection"] = t("labels:yes");
    } else {
      newSelectedFilters["with_refection"] = t("labels:no");
    }
    if (values.depth_condition) {
      newSelectedFilters["depth_condition"] = t(
        `labels2:summary_report.depth_condition.${values.depth_condition
          .toLowerCase()
          .replace(" ", "_")}`,
      );
    }
    if (values.pressure_condition) {
      newSelectedFilters["pressure_condition"] = t(
        `labels2:summary_report.pressure_condition.${values.pressure_condition
          .toLowerCase()
          .replace(" ", "_")}`,
      );
    }
    if (values.activity) {
      switch (values.activity) {
        case "default":
          newSelectedFilters["activity"] = t(
            "labels:activity.options.not_rule_out",
          );
          break;
        case "GENERAL":
          newSelectedFilters["activity"] = t("labels:activity.options.general");
          break;
        case "GENERAL,MOUNT":
          newSelectedFilters["activity"] = t(
            "labels:activity.options.general_and_mount",
          );
          break;
      }
    }
    if (values.review_type) {
      newSelectedFilters["review_type"] = t(
        `labels:review_type.options.${values.review_type
          .toLowerCase()
          .replace(" ", "_")
          .replace("/", "_")}`,
      );
    }
    if (values.number_cycle) {
      newSelectedFilters["number_cycle"] = `${formatter.format(
        Number(values.number_cycle),
      )}`;
    }

    setSelectedFilters(newSelectedFilters);
  }

  function handleDefaultFilters() {
    summaryFilterForm.setValue(
      "corporate_id",
      profileCorporate?.corporate_id || "",
    );
    summaryFilterForm.setValue(
      "companies",
      profileCompanies[0].company_id || "",
    );
    summaryFilterForm.setValue(
      "subsidiaries",
      profileSubsidiaries.map((subsidiary) => subsidiary.subsidiary_id),
    );
    summaryFilterForm.setValue("movement", "MOUNT");
    summaryFilterForm.setValue("activity", "default");
    summaryFilterForm.setValue("with_refection", false);

    setFilters(
      new URLSearchParams({
        corporate_id: profileCorporate?.corporate_id.toString() || "",
        companies: `${profileCompanies[0].company_id}` || "",
        subsidiaries: profileSubsidiaries
          .map((subsidiary) => subsidiary.subsidiary_id)
          .join(),
        movement: "MOUNT",
        with_refection: "0",
      }),
    );
    handleSelectedFilters();
  }

  function onClear() {
    summaryFilterForm.reset();
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
        open={openModals.filter}
        title={t("general:filter")}
        onClose={() =>
          setOpenModals((prevState) => {
            return { ...prevState, filter: false };
          })
        }
        onConfirm={summaryFilterForm.handleSubmit(async (data) => {
          onFilter(data);
          handleSelectedFilters();
        })}
        onClear={() => {
          onClear();
          setOpenModals((prevState) => {
            return { ...prevState, filter: false };
          });
        }}
      >
        <SummaryFilterForm
          form={summaryFilterForm}
          dependencies={dependencies}
        />
      </BaseFilterModal>
      <BaseCustomModal
        open={openModals.pressure}
        title={`${t("common:tire_plural")}: ${summaryTable?.length || 0}`}
        onClose={() =>
          setOpenModals((prevState) => {
            return { ...prevState, pressure: false };
          })
        }
        size="xl"
      >
        <PressureTable
          data={(summaryTable as SummaryPressureTableResponse[]) || []}
        />
      </BaseCustomModal>
      <BaseCustomModal
        open={openModals.depth}
        title={`${t("common:tire_plural")}: ${summaryTable?.length || 0}`}
        onClose={() =>
          setOpenModals((prevState) => {
            return { ...prevState, depth: false };
          })
        }
        size="xl"
      >
        <DepthTable
          data={(summaryTable as SummaryDepthTableResponse[]) || []}
        />
      </BaseCustomModal>
      <BaseCustomModal
        open={openModals.alert}
        title={`${t("common:tire_plural")}: ${
          summaryTable
            ? Object.keys(summaryTable as SummaryAlertTableResponse).length || 0
            : 0
        }`}
        onClose={() =>
          setOpenModals((prevState) => {
            return { ...prevState, alert: false };
          })
        }
        size="xl"
      >
        <AlertTable
          data={(summaryTable as SummaryAlertTableResponse) || {}}
          handleAlertClick={handleAlertClick}
        />
      </BaseCustomModal>
      <BaseCustomModal
        open={openModals.alertDetail}
        title={`${t("titles:tire_alerts")}: ${
          alertDetail.length > 0 ? alertDetail[0].code : ""
        }`}
        onClose={() =>
          setOpenModals((prevState) => {
            return { ...prevState, alertDetail: false };
          })
        }
        size="xl"
      >
        <AlertDetailTable data={alertDetail} />
      </BaseCustomModal>
      <BaseContainer title={t("favorites:favorites.report_tire_summary")}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          {selectedFilters && Object.keys(selectedFilters).length > 0 && (
            <SummaryFilters selectedFilters={selectedFilters} />
          )}
          <SummaryButtons active={active} setActive={setActive} />
          {summary && (
            <>
              <SummaryAccordionTable
                summaryData={summary[active]}
                handleTableClick={handleTableClick}
                active={active}
              />
              <SummaryGraphics summaryData={summary[active]} type={active} />
            </>
          )}

          <Portal elementId={"navbarPortal"}>
            <Stack direction={"row"} alignItems={"center"}>
              <IconButton
                sx={{ mr: 2 }}
                onClick={() =>
                  setOpenModals((prevState) => {
                    return { ...prevState, filter: true };
                  })
                }
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
