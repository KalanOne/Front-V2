import React, { useEffect } from "react";



import FilterListIcon from "@mui/icons-material/FilterList";
import { Container, IconButton, Stack } from "@mui/material";



import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";



import { BaseContainer } from "src/components/common/BaseContainer";
import { CustomPagination } from "src/components/common/CustomPagination";
import { Portal } from "src/components/common/Portal";
import { SearchInput } from "src/components/common/SearchInput";
import { BaseFilterModal } from "src/components/modal/BaseFilterModal";
import { BaseUpdateModal } from "src/components/modal/BaseUpdateModal";
import { useCrud, useCrudMutationF, useCrudQuery } from "src/hooks/crud";
import { useNotification } from "src/stores/general/notification";
import { fileToBlob } from "src/utils/file";



import { damageStatus, deleteDamage, getDamages, updateDamage } from "../api/damageApi";
import { DamageResponse } from "../types/damageTypes";
import { DamageFilterSchemaType, damageFilterDefaultValues, damageFilterSchema } from "../validation/filterDamage";
import { damageUpdateDefaultValues, damageUpdateSchema } from "../validation/updateDamage";
import { DamageFilterForm } from "./DamageFilterForm";
import { DamageTable } from "./DamageTable";
import { DamageUpdateForm } from "./DamageUpdateForm";


export { Damage };

function Damage(): React.ReactElement {
  const { t } = useTranslation();
  const addNotification = useNotification((state) => state.addNotification);
  const crud = useCrud<DamageResponse>();
  const damageQuery = useCrudQuery({
    apiFunction: getDamages,
    name: "damages",
    page: crud.page,
    search: crud.search,
    filters: crud.filters,
    keepPrevious: true,
    extras: undefined,
  });
  const damages = damageQuery.data?.data ?? [];
  const damageUpdateMutation = useCrudMutationF(
    updateDamage,
    "damages",
    "update",
    {
      onSuccess: () => crud.setUpdateModalOpen(false),
    },
  );
  const damageDeleteMutation = useCrudMutationF(
    deleteDamage,
    "damages",
    "delete",
  );
  const damageStatusMutation = useCrudMutationF(
    damageStatus,
    "damages",
    "custom",
    {
      customName: "status",
    },
  );

  const damageUpdateForm = useForm({
    defaultValues: damageUpdateDefaultValues,
    resolver: zodResolver(damageUpdateSchema),
  });

  const damageFilterForm = useForm({
    defaultValues: damageFilterDefaultValues,
    resolver: zodResolver(damageFilterSchema),
  });

  useEffect(() => {
    if (crud.current !== undefined) {
      const damage = crud.current;
      damageUpdateForm.setValue("name", damage.name ? damage.name : "");
      damageUpdateForm.setValue(
        "appearance",
        damage.appearance ? damage.appearance : "",
      );
      damageUpdateForm.setValue(
        "damage_category",
        damage.damage_category ? damage.damage_category : "",
      );
      damageUpdateForm.setValue("area", damage.area ? damage.area : "");
      damageUpdateForm.setValue(
        "probable_causes",
        damage.probable_causes ? damage.probable_causes : "",
      );
      damageUpdateForm.setValue(
        "action_tire",
        damage.action_tire ? damage.action_tire : "",
      );
      damageUpdateForm.setValue(
        "action_vehicle",
        damage.action_vehicle ? damage.action_vehicle : "",
      );
      damageUpdateForm.setValue(
        "operation",
        damage.operation ? damage.operation : "",
      );
      damageUpdateForm.setValue(
        "lock_cycles",
        damage.lock_cycles ? damage.lock_cycles : false,
      );
    }
  }, [crud.current]);

  function onUpdatePress(damage: DamageResponse) {
    crud.setCurrent(damage);
    crud.setUpdateModalOpen(true);
  }

  function onDeletePress(damage: DamageResponse) {
    addNotification({
      message: t("messages:delete.damage"),
      action: {
        label: "Eliminar",
        onClick: async () => {
          damageDeleteMutation.mutate({
            id: damage.damage_id,
            extras: undefined,
          });
        },
      },
    });
  }

  function onStatusPress(damage: DamageResponse) {
    addNotification({
      message: damage.status
        ? t("messages:change_status.damage.disable")
        : t("messages:change_status.damage.enable"),
      action: {
        label: "Confirmar",
        onClick: async () => {
          damageStatusMutation.mutate({
            id: damage.damage_id,
            data: {
              status: damage.status === 1 ? 0 : 1,
            },
            extras: undefined,
          });
        },
      },
    });
  }

  function onFilter(data: DamageFilterSchemaType) {
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
        onConfirm={damageFilterForm.handleSubmit(
          async (data) => {
            onFilter(data);
          },
          // (d) => console.log(d),
        )}
        onClear={() => {
          damageFilterForm.reset();
          crud.setFilters(new URLSearchParams());
        }}
      >
        <DamageFilterForm form={damageFilterForm} />
      </BaseFilterModal>
      <BaseUpdateModal
        open={crud.updateModalOpen}
        title={t("titles:update.damage")}
        onClose={() => crud.setUpdateModalOpen(false)}
        onConfirm={damageUpdateForm.handleSubmit(async (data) => {
          if (!data.image) {
            return damageUpdateMutation.mutate({
              id: crud.current?.damage_id ?? 0,
              data: {
                name: data.name,
                appearance: data.appearance,
                probable_causes: data.probable_causes,
                operation: data.operation,
                action_vehicle: data.action_vehicle,
                action_tire: data.action_tire,
                damage_category: data.damage_category,
                area: data.area,
                lock_cycles: data.lock_cycles,
              },
              extras: undefined,
            });
          } else {
            const imageData = await fileToBlob(data.image);
            return damageUpdateMutation.mutate({
              id: crud.current?.damage_id ?? 0,
              data: {
                name: data.name,
                appearance: data.appearance,
                probable_causes: data.probable_causes,
                operation: data.operation,
                action_vehicle: data.action_vehicle,
                action_tire: data.action_tire,
                damage_category: data.damage_category,
                area: data.area,
                image: imageData,
                lock_cycles: data.lock_cycles,
              },
              extras: undefined,
            });
          }
        })}
      >
        <DamageUpdateForm form={damageUpdateForm} />
      </BaseUpdateModal>
      <BaseContainer title={t("common:damage", { context: "plural" })}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          <DamageTable
            damages={damages}
            onUpdate={onUpdatePress}
            onDelete={onDeletePress}
            onStatusChange={onStatusPress}
          ></DamageTable>
          <CustomPagination
            page={crud.page}
            onChange={(_event, page) => crud.setPage(page)}
            totalPages={damageQuery.data?.last_page ?? 1}
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