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
  getMountedTireVehicle,
  getMountedTireVehicleGraphics,
  getMountedTireVehicleTable,
} from "../api/mountedTireApi";
import { useMountedTireDependencies } from "../hooks/dependencies";
import {
  MountedTireFilterInputType,
  MountedTireFilterSchemaType,
  mountedTireFilterDefaultValues,
  mountedTireFilterSchema,
} from "../validation/filterMountedTire";
import { MountedTireFilterForm } from "./MountedTireFilterForm";
import { MountedTireFilters } from "./MountedTireFilters";
import { MountedTireVehicleCards } from "./MountedTireVehicleCards";
import { MountedTireVehicleGraphics } from "./MountedTireVehicleGraphics";
import { MountedTireVehicleTable } from "./MountedTireVehicleTable";

export { MountedTire };

function MountedTire() {
  const { t } = useTranslation();
  const account = useIdentity((state) => state.account);
  const workArea = useIdentity((state) => state.workArea);
  const profileCorporate = getCorporateViaWorkArea(account, workArea);
  const profileCompanies = getCompanyViaWorkArea(account, workArea);
  const profileSubsidiaries = getSubsidiaryViaWorkArea(account, workArea);
  const [filters, setFilters] = useState<URLSearchParams>();
  const [vehicle, setVehicle] = useState<number>();
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] =
    useState<Partial<Record<keyof MountedTireFilterSchemaType, string>>>();

  const mountedTiresQuery = useQuery({
    queryKey: ["mountedTire", filters?.toString()],
    queryFn: async () => {
      return await getMountedTireVehicle(filters);
    },
    enabled: !!filters,
  });
  useProgressQuery(mountedTiresQuery, "mountedTire");

  const mountedTires = mountedTiresQuery.data;

  const mountedTiresGraphicsQuery = useQuery({
    queryKey: ["mountedTireGraphics", vehicle, filters?.toString()],
    queryFn: async () => {
      return await getMountedTireVehicleGraphics(vehicle || 0, filters);
    },
    enabled: !!vehicle,
  });
  useProgressQuery(mountedTiresGraphicsQuery, "mountedTireGraphics");

  const mountedTiresGraphics = mountedTiresGraphicsQuery.data;

  const mountedTiresTableQuery = useQuery({
    queryKey: ["mountedTireTable", vehicle, filters?.toString()],
    queryFn: async () => {
      return await getMountedTireVehicleTable(vehicle || 0, filters);
    },
    enabled: !!vehicle,
  });
  useProgressQuery(mountedTiresTableQuery, "mountedTireTable");

  const mountedTiresTable = mountedTiresTableQuery.data;

  const mountedTireFilterForm = useForm<
    MountedTireFilterInputType,
    unknown,
    MountedTireFilterSchemaType
  >({
    defaultValues: mountedTireFilterDefaultValues,
    resolver: zodResolver(mountedTireFilterSchema),
  });

  const [corporate_id, companies] = useWatch({
    control: mountedTireFilterForm.control,
    name: ["corporate_id", "companies"],
  });

  const dependencies = useMountedTireDependencies({
    corporate_id: corporate_id,
    company: companies,
  });

  function handleVehicleChange(vehicle: number) {
    setVehicle(vehicle);
  }

  function getVehicleName(vehicleId: number): string {
    if (mountedTires) {
      for (const vehicleTypeKey in mountedTires) {
        const vehicleData = mountedTires[vehicleTypeKey];
        const foundVehicleKey = Object.keys(vehicleData).find(
          (vehicleKey) => vehicleData[vehicleKey].vehicle_type_id === vehicleId,
        );
        return foundVehicleKey || "";
      }
    }
    return "";
  }

  function handleSelectedFilters() {
    const newSelectedFilters: Partial<
      Record<keyof MountedTireFilterSchemaType, string>
    > = {};
    const values = mountedTireFilterForm.getValues();
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
    if (values.vehicle_types.length > 0) {
      const vehicleTypeArray: string[] = [];
      for (let i = 0; i < values.vehicle_types.length; i++) {
        const localVehicleType = dependencies.vehiclesTypes.find(
          (s) => `${s.vehicle_type_id}` === `${values.vehicle_types[i]}`,
        );
        if (localVehicleType) {
          vehicleTypeArray.push(localVehicleType.name);
        }
      }
      newSelectedFilters["vehicle_types"] = vehicleTypeArray.join(", ");
    }
    setSelectedFilters(newSelectedFilters);
  }

  function onFilter(data: MountedTireFilterSchemaType) {
    const searchParams = new URLSearchParams();
    if (data.date_from != "") {
      searchParams.append("date_from", data.date_from);
    }
    if (data.date_to != "") {
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
    if (data.vehicle_types.length > 0) {
      searchParams.append("vehicle_types", data.vehicle_types.join(","));
    }
    setFilters(searchParams);
  }

  function handleDefaultFilters() {
    mountedTireFilterForm.setValue(
      "corporate_id",
      profileCorporate?.corporate_id || "",
    );
    mountedTireFilterForm.setValue(
      "companies",
      profileCompanies.map((company) => company.company_id),
    );
    mountedTireFilterForm.setValue(
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
    mountedTireFilterForm.reset();
    handleDefaultFilters();
  }

  useEffect(() => {
    if (!account || !workArea) return;
    handleDefaultFilters();
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
        onConfirm={mountedTireFilterForm.handleSubmit(async (data) => {
          onFilter(data);
        })}
        onClear={() => {
          onClear();
          setFilterModalOpen(false);
        }}
      >
        <MountedTireFilterForm
          form={mountedTireFilterForm}
          dependencies={dependencies}
        />
      </BaseFilterModal>
      <BaseContainer title={t("titles:summary_mount_report")}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          {selectedFilters && Object.keys(selectedFilters).length > 0 && (
            <MountedTireFilters selectedFilters={selectedFilters} />
          )}
          <ReportTitle subtitleDark={t("labels:summary_mount_report.title")} />

          {mountedTires && (
            <MountedTireVehicleCards
              mountedTires={mountedTires}
              handleVehicleChange={handleVehicleChange}
            />
          )}

          {mountedTires && mountedTiresGraphics && mountedTiresTable && (
            <Grid container maxWidth="xl" spacing={1} mt={2}>
              <Grid item xs={12} md={6}>
                <MountedTireVehicleGraphics data={mountedTiresGraphics} />
              </Grid>
              <Grid item xs={12} md={6}>
                <MountedTireVehicleTable
                  title={getVehicleName(vehicle || 0)}
                  tires={mountedTiresTable}
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
