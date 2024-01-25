import { useEffect } from "react";

import FilterListIcon from "@mui/icons-material/FilterList";
import { Container, IconButton, Stack } from "@mui/material";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { BaseContainer } from "src/components/common/BaseContainer";
import { CustomPagination } from "src/components/common/CustomPagination";
import { Portal } from "src/components/common/Portal";
import { BaseFilterModal } from "src/components/modal/BaseFilterModal";
import { useCrud, useCrudQuery } from "src/hooks/crud";

import { getMountings } from "../api/mountingApi";
import { useAlertMountingDependencies } from "../hooks/dependencies";
import { MountingResponse } from "../types/mountingTypes";
import {
  MountingFilterSchemaType,
  mountingFilterDefaultValues,
  mountingFilterSchema,
} from "../validation/filterMounting";
import { MountTingTable } from "./MountTingTable";
import { MountingFilterForm } from "./MountingFilterForm";

export { Mounting };
function Mounting() {
  const { t } = useTranslation();
  const crud = useCrud<MountingResponse>();
  const mountingQuery = useCrudQuery({
    apiFunction: getMountings,
    name: "mountings",
    page: crud.page,
    search: crud.search,
    filters: crud.filters,
    keepPrevious: true,
    extras: undefined,
  });
  const mountings = mountingQuery.data?.data ?? [];

  const mountingFilterForm = useForm({
    defaultValues: mountingFilterDefaultValues,
    resolver: zodResolver(mountingFilterSchema),
  });

  function onFilter(data: MountingFilterSchemaType) {
    const searchParams = new URLSearchParams();
    if (data.vehicle_brand_id.length > 0) {
      searchParams.append("vehicle_brand_id", data.vehicle_brand_id.join(","));
    }
    if (data.vehicle_type_id) {
      searchParams.append("vehicle_type_id", data.vehicle_type_id);
    }
    if (data.vehicle_id) {
      searchParams.append("vehicle_id", data.vehicle_id);
    }
    if (data.driver_id) {
      searchParams.append("driver_id", data.driver_id);
    }
    searchParams.append("order", "DESC");
    crud.setFilters(searchParams);
  }

  const dependencies = useAlertMountingDependencies();

  useEffect(() => {
    crud.setFilters(new URLSearchParams({ order: "DESC" }));
  }, []);

  return (
    <>
      <BaseFilterModal
        open={crud.filterModalOpen}
        title={t("general:filter")}
        onClose={() => crud.setFilterModalOpen(false)}
        onConfirm={mountingFilterForm.handleSubmit(async (data) => {
          onFilter(data);
        })}
        onClear={() => {
          mountingFilterForm.reset();
          crud.setFilters(new URLSearchParams({ order: "DESC" }));
        }}
      >
        <MountingFilterForm
          form={mountingFilterForm}
          dependencies={dependencies}
        />
      </BaseFilterModal>

      <BaseContainer title={t("general:mounting")}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          <MountTingTable mountings={mountings} />
          <CustomPagination
            page={crud.page}
            onChange={(_event, page) => crud.setPage(page)}
            totalPages={mountingQuery.data?.last_page ?? 1}
          />
          <Portal elementId={"navbarPortal"}>
            <Stack direction={"row"} alignItems={"center"}>
              <IconButton
                sx={{ mr: 2 }}
                onClick={() => crud.setFilterModalOpen(true)}
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
