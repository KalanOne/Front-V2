import { useEffect } from "react";

import FilterListIcon from "@mui/icons-material/FilterList";
import { Container, IconButton, Stack, Typography } from "@mui/material";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { BaseContainer } from "src/components/common/BaseContainer";
import { CustomPagination } from "src/components/common/CustomPagination";
import { Portal } from "src/components/common/Portal";
import { BaseFilterModal } from "src/components/modal/BaseFilterModal";
import { BaseUpdateModal } from "src/components/modal/BaseUpdateModal";
import { useCrud, useCrudMutationF, useCrudQuery } from "src/hooks/crud";

import { getMountingsShow, updateMountingsShow } from "../api/mountingShowApi";
import { MountingShowResponse } from "../types/mountingShowTypes";
import {
  MountingShowFilterSchemaType,
  mountingShowFilterDefaultValues,
  mountingShowFilterSchema,
} from "../validation/filterMountingShow";
import {
  mountingShowUpdateDefaultValues,
  mountingShowUpdateSchema,
} from "../validation/updateMountingShow";
import { MountingShowFilterForm } from "./MountingShowFilterForm";
import { MountingShowTable } from "./MountingShowTable";
import { MountingShowUpdateForm } from "./MountingShowUpdateForm";

export { MountingShow };
function MountingShow() {
  const { id } = useParams();
  const { t } = useTranslation();

  const crud = useCrud<MountingShowResponse>();
  const mountingsShowQuery = useCrudQuery({
    apiFunction: getMountingsShow,
    name: "mountingsShow",
    page: crud.page,
    search: crud.search,
    filters: crud.filters,
    keepPrevious: true,
    extras: { id: `${id}` },
  });
  const mountingsShow = mountingsShowQuery.data?.data ?? [];

  const mountingShowUpdateMutation = useCrudMutationF(
    updateMountingsShow,
    "mountingsShow",
    "update",
    {
      onSuccess: () => crud.setUpdateModalOpen(false),
    },
  );

  const mountingShowUpdateForm = useForm({
    defaultValues: mountingShowUpdateDefaultValues,
    resolver: zodResolver(mountingShowUpdateSchema),
  });

  const mountingShowFilterForm = useForm({
    defaultValues: mountingShowFilterDefaultValues,
    resolver: zodResolver(mountingShowFilterSchema),
  });

  function onFilter(data: MountingShowFilterSchemaType) {
    const searchParams = new URLSearchParams();
    // console.log("data", data);
    if (data.date_from) {
      searchParams.append("date_from", data.date_from);
    }
    if (data.date_to) {
      searchParams.append("date_to", data.date_to);
    }
    if (data.ranking_alert) {
      searchParams.append("ranking_alert", data.ranking_alert);
    }
    searchParams.append("order", "DESC");
    crud.setFilters(searchParams);
  }

  function onUpdatePress(mountingShowResponse: MountingShowResponse) {
    crud.setCurrent(mountingShowResponse);
    crud.setUpdateModalOpen(true);
  }

  useEffect(() => {
    if (crud.current !== undefined) {
      const mountingShowResponse = crud.current;
      mountingShowUpdateForm.setValue(
        "alert_id",
        mountingShowResponse.alert_id,
      );
      mountingShowUpdateForm.setValue(
        "vehicle_tire_id",
        mountingShowResponse.vehicle_tire_id,
      );
      mountingShowUpdateForm.setValue("comment", mountingShowResponse.comment);
    }
  }, [crud, mountingShowUpdateForm]);

  useEffect(() => {
    crud.setFilters(new URLSearchParams({ order: "DESC" }));
  }, []);

  return (
    <>
      <BaseFilterModal
        open={crud.filterModalOpen}
        title={t("general:filter")}
        onClose={() => crud.setFilterModalOpen(false)}
        onConfirm={mountingShowFilterForm.handleSubmit(async (data) => {
          onFilter(data);
        })}
        onClear={() => {
          mountingShowFilterForm.reset();
          crud.setFilters(new URLSearchParams({ order: "DESC" }));
        }}
      >
        <MountingShowFilterForm form={mountingShowFilterForm} />
      </BaseFilterModal>
      <BaseUpdateModal
        open={crud.updateModalOpen}
        title={t("titles:update.alert")}
        onClose={() => crud.setUpdateModalOpen(false)}
        onConfirm={mountingShowUpdateForm.handleSubmit(async (data) => {
          mountingShowUpdateMutation.mutate({
            id: data.alert_id,
            data: {
              vehicle_tire_id: data.vehicle_tire_id,
              comment: data.comment,
            },
            extras: undefined,
          });
        })}
      >
        <MountingShowUpdateForm
          form={mountingShowUpdateForm}
          mountingShow={crud.current}
        />
      </BaseUpdateModal>

      <BaseContainer title={t("titles:mount_alerts")}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          <Typography variant="h5">
            {t("common:vehicle")} :{" "}
            {mountingsShow.length > 0 &&
              mountingsShow[0].vehicle_tire.vehicle.economic_number}
          </Typography>
          <MountingShowTable
            mountingShows={mountingsShow}
            onUpdate={onUpdatePress}
          />
          <CustomPagination
            page={crud.page}
            onChange={(_event, page) => crud.setPage(page)}
            totalPages={mountingsShowQuery.data?.last_page ?? 1}
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
