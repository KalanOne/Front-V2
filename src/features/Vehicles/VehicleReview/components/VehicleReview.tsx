import { useState } from "react";

import FilterListIcon from "@mui/icons-material/FilterList";
import { Badge, Box, Container, IconButton, Stack } from "@mui/material";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { BaseContainer } from "src/components/common/BaseContainer";
import { CustomButton } from "src/components/common/CustomButton";
import { CustomPagination } from "src/components/common/CustomPagination";
import { Portal } from "src/components/common/Portal";
import { SearchInput } from "src/components/common/SearchInput";
import { BaseFilterModal } from "src/components/modal/BaseFilterModal";
import { useCrud, useCrudQuery } from "src/hooks/crud";

import {
  getVehicleReviews,
  getVehicleReviewsInProcess,
} from "../api/vehicleReviewApi";
import { useVehicleReviewDependencies } from "../hooks/dependencies";
import {
  VehicleReviewResponse,
  VehicleReviewResponseInProcess,
} from "../types/vehicleReviewTypes";
import {
  VehicleReviewFilterSchemaType,
  vehicleReviewFilterDefaultValues,
  vehicleReviewFilterSchema,
} from "../validation/filterVehicleReview";
import { VehicleReviewFilterForm } from "./VehicleReviewFilterForm";
import { VehicleReviewTable } from "./VehicleReviewTable";

export { VehicleReview };

function VehicleReview() {
  const { t } = useTranslation();
  const [showInProcess, setShowInProcess] = useState(false);

  const crud = useCrud<VehicleReviewResponse>();
  const vehicleReviewQuery = useCrudQuery({
    apiFunction: getVehicleReviews,
    name: "vehicleReview",
    page: crud.page,
    search: crud.search,
    filters: crud.filters,
    keepPrevious: true,
    extras: undefined,
  });
  const vehicleReviews = vehicleReviewQuery.data?.data ?? [];

  const crudInProcess = useCrud<VehicleReviewResponseInProcess>();
  const vehicleReviewInProcessQuery = useCrudQuery({
    apiFunction: getVehicleReviewsInProcess,
    name: "vehicleReviewInProcess",
    page: crudInProcess.page,
    search: crudInProcess.search,
    filters: crudInProcess.filters,
    keepPrevious: true,
    extras: undefined,
  });
  // const vehicleReviewsInProcess = vehicleReviewInProcessQuery.data?.data ?? [];

  const handleChangeView = () => {
    setShowInProcess((prev) => {
      if (!prev) {
        const searchParams = new URLSearchParams(crud.filters);
        searchParams.append("in_process", "1");
        crud.setFilters(searchParams);
        return true;
      } else {
        const searchParams = new URLSearchParams(crud.filters);
        searchParams.delete("in_process");
        crud.setFilters(searchParams);
        return false;
      }
    });
  };

  const dependencies = useVehicleReviewDependencies();

  const vehicleReviewFilterForm = useForm({
    defaultValues: vehicleReviewFilterDefaultValues,
    resolver: zodResolver(vehicleReviewFilterSchema),
  });

  function onFilter(data: VehicleReviewFilterSchemaType) {
    const searchParams = new URLSearchParams();
    if (data.date_from) {
      searchParams.append("date_from", data.date_from);
    }
    if (data.date_to) {
      searchParams.append("date_to", data.date_to);
    }
    if (data.subsidiaries.length > 0) {
      searchParams.append("subsidiaries", data.subsidiaries.join(","));
    }
    if (data.vehicle_type_id) {
      searchParams.append("vehicle_type_id", data.vehicle_type_id);
    }
    if (data.vehicle_brand_id) {
      searchParams.append("vehicle_brand_id", data.vehicle_brand_id);
    }
    if (data.drivers) {
      searchParams.append("drivers", data.drivers);
    }
    searchParams.append("order", "DESC");
    crudInProcess.setFilters(searchParams);
    if (showInProcess) {
      searchParams.append("in_process", "1");
    }
    crud.setFilters(searchParams);
  }

  return (
    <>
      <BaseFilterModal
        open={crud.filterModalOpen}
        title={"Filtro"}
        onClose={() => crud.setFilterModalOpen(false)}
        onConfirm={vehicleReviewFilterForm.handleSubmit(async (data) => {
          onFilter(data);
        })}
        onClear={() => {
          vehicleReviewFilterForm.reset();
          const searchParams = new URLSearchParams();
          searchParams.append("order", "DESC");
          crudInProcess.setFilters(searchParams);
          if (showInProcess) {
            searchParams.append("in_process", "1");
          }
          crud.setFilters(searchParams);
        }}
      >
        <VehicleReviewFilterForm
          form={vehicleReviewFilterForm}
          dependencies={dependencies}
        />
      </BaseFilterModal>
      <BaseContainer title={t("general:vehicle_review")}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              mb: 3,
            }}
          >
            <CustomButton
              onClick={handleChangeView}
              text={t("labels:vehicle.in_process")}
            >
              <Badge
                badgeContent={vehicleReviewInProcessQuery.data?.total ?? "?"}
                color="secondary"
                sx={{
                  ml: 2.5,
                  "& span": {
                    height: "16px",
                    width: "16px",
                    backgroundColor: "white",
                    color: "black",
                    borderRadius: "20%",
                    padding: 0,
                    minWidth: "16px",
                  },
                }}
              ></Badge>
            </CustomButton>
          </Box>
          <VehicleReviewTable vehicleReviews={vehicleReviews} />
          <CustomPagination
            page={crud.page}
            onChange={(_event, page) => crud.setPage(page)}
            totalPages={vehicleReviewQuery.data?.last_page ?? 1}
          />
          <Portal elementId={"navbarPortal"}>
            <Stack direction={"row"} alignItems={"center"}>
              <IconButton
                sx={{ mr: 2 }}
                onClick={() => crud.setFilterModalOpen(true)}
              >
                <FilterListIcon sx={{ color: "white" }} />
              </IconButton>
              <SearchInput
                search={(v) => {
                  crud.setSearch(v);
                  crudInProcess.setSearch(v);
                }}
              />
            </Stack>
          </Portal>
        </Container>
      </BaseContainer>
    </>
  );
}
