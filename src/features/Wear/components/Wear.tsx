import React, { useEffect } from "react";

import FilterListIcon from "@mui/icons-material/FilterList";
import { Container, IconButton, Stack } from "@mui/material";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { BaseContainer } from "src/components/common/BaseContainer.tsx";
import { CustomPagination } from "src/components/common/CustomPagination";
import { Portal } from "src/components/common/Portal.tsx";
import { SearchInput } from "src/components/common/SearchInput";
import { BaseFilterModal } from "src/components/modal/BaseFilterModal";
import { BaseUpdateModal } from "src/components/modal/BaseUpdateModal";
import { useCrud, useCrudMutationF, useCrudQuery } from "src/hooks/crud.tsx";
import { useNotification } from "src/stores/general/notification";
import { fileToBlob } from "src/utils/file";

import { deleteWear, getWear, updateWear, wearStatus } from "../api/wearApi";
import { WearResponse } from "../types/wearTypes";
import {
  WearFilterSchemaType,
  wearFilterDefaultValues,
  wearFilterSchema,
} from "../validation/filterWear";
import {
  wearUpdateDefaultValues,
  wearUpdateSchema,
} from "../validation/updateWear";
import { WearFilterForm } from "./WearFilterForm";
import { WearTable } from "./WearTable";
import { WearUpdateForm } from "./WearUpdateForm";

export { Wear };

function Wear(): React.ReactElement {
  const { t } = useTranslation();
  const addNotification = useNotification((state) => state.addNotification);
  const crud = useCrud<WearResponse>();
  const wearQuery = useCrudQuery({
    apiFunction: getWear,
    name: "wear",
    page: crud.page,
    search: crud.search,
    filters: crud.filters,
    keepPrevious: true,
    extras: undefined,
  });
  const wear = wearQuery.data?.data ?? [];
  const wearUpdateMutation = useCrudMutationF(updateWear, "wear", "update", {
    onSuccess: () => crud.setUpdateModalOpen(false),
  });
  const wearDeleteMutation = useCrudMutationF(deleteWear, "wear", "delete");
  const wearStatusMutation = useCrudMutationF(wearStatus, "wear", "custom", {
    customName: "status",
  });

  const wearUpdateForm = useForm({
    defaultValues: wearUpdateDefaultValues,
    resolver: zodResolver(wearUpdateSchema),
  });

  const wearFilterForm = useForm({
    defaultValues: wearFilterDefaultValues,
    resolver: zodResolver(wearFilterSchema),
  });

  useEffect(() => {
    if (crud.current !== undefined) {
      const wear = crud.current;
      wearUpdateForm.setValue("name", wear.name);
      wearUpdateForm.setValue("appearance", wear.appearance);
      wearUpdateForm.setValue("wear_category", wear.wear_category);
      wearUpdateForm.setValue("axle", wear.axle);
      wearUpdateForm.setValue("probable_causes", wear.probable_causes);
      wearUpdateForm.setValue("action_tire", wear.action_tire);
      wearUpdateForm.setValue("action_vehicle", wear.action_vehicle);
      wearUpdateForm.setValue("operation", wear.operation);
    }
  }, [crud.current]);

  function onDeletePress(wear: WearResponse) {
    addNotification({
      message: t("messages:delete.wear"),
      action: {
        label: "Eliminar",
        onClick: async () => {
          wearDeleteMutation.mutate({
            id: wear.wear_id,
            extras: undefined,
          });
        },
      },
    });
  }

  function onUpdatePress(wear: WearResponse) {
    crud.setCurrent(wear);
    crud.setUpdateModalOpen(true);
  }

  function onStatusPress(wear: WearResponse) {
    addNotification({
      message: wear.status
        ? t("messages:change_status.wear.disable")
        : t("messages:change_status.wear.enable"),
      action: {
        label: "Confirmar",
        onClick: async () => {
          wearStatusMutation.mutate({
            id: wear.wear_id,
            data: {
              status: wear.status === 1 ? 0 : 1,
            },
            extras: undefined,
          });
        },
      },
    });
  }

  function onFilter(data: WearFilterSchemaType) {
    const searchParams = new URLSearchParams();
    if (data.status) {
      searchParams.append("status", data.status === "enabled" ? "1" : "0");
    }
    if (data.dateFrom) {
      searchParams.append("date_from", data.dateFrom);
    }
    if (data.dateTo) {
      searchParams.append("date_to", data.dateTo);
    }
    crud.setFilters(searchParams);
  }

  return (
    <>
      <BaseFilterModal
        open={crud.filterModalOpen}
        title={t("general:filter")}
        onClose={() => crud.setFilterModalOpen(false)}
        onConfirm={wearFilterForm.handleSubmit(
          async (data) => {
            onFilter(data);
          },
          // (d) => console.log(d),
        )}
        onClear={() => {
          wearFilterForm.reset();
          crud.setFilters(new URLSearchParams());
        }}
      >
        <WearFilterForm form={wearFilterForm} />
      </BaseFilterModal>
      <BaseUpdateModal
        open={crud.updateModalOpen}
        title={t("titles:update.wear")}
        onClose={() => crud.setUpdateModalOpen(false)}
        onConfirm={wearUpdateForm.handleSubmit(async (data) => {
          if (!data.image) {
            return wearUpdateMutation.mutate({
              id: crud.current?.wear_id ?? 0,
              data: {
                name: data.name,
                appearance: data.appearance,
                wear_category: data.wear_category,
                axle: data.axle,
                probable_causes: data.probable_causes,
                action_tire: data.action_tire,
                action_vehicle: data.action_vehicle,
                operation: data.operation,
              },
              extras: undefined,
            });
          } else {
            const imageData = await fileToBlob(data.image);
            return wearUpdateMutation.mutate({
              id: crud.current?.wear_id ?? 0,
              data: {
                name: data.name,
                appearance: data.appearance,
                wear_category: data.wear_category,
                axle: data.axle,
                probable_causes: data.probable_causes,
                action_tire: data.action_tire,
                action_vehicle: data.action_vehicle,
                operation: data.operation,
                image: imageData,
              },
              extras: undefined,
            });
          }
        })}
      >
        <WearUpdateForm form={wearUpdateForm} />
      </BaseUpdateModal>
      <BaseContainer title={t("common:wear", { context: "plural" })}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          <WearTable
            wear={wear}
            onUpdate={onUpdatePress}
            onDelete={onDeletePress}
            onStatusChange={onStatusPress}
          ></WearTable>
          <CustomPagination
            page={crud.page}
            onChange={(_event, page) => crud.setPage(page)}
            totalPages={wearQuery.data?.last_page ?? 1}
          />
          <Portal elementId={"navbarPortal"}>
            <Stack direction={"row"} alignItems={"center"}>
              <IconButton
                sx={{ mr: 2 }}
                onClick={() => crud.setFilterModalOpen(true)}
              >
                <FilterListIcon sx={{ color: "white" }} />
              </IconButton>
              <SearchInput search={(v) => crud.setSearch(v)} />
            </Stack>
          </Portal>
        </Container>
      </BaseContainer>
    </>
  );
}
