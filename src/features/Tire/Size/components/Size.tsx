import React, { useEffect } from "react";



import FilterListIcon from "@mui/icons-material/FilterList";
import { Container, IconButton, Stack } from "@mui/material";



import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";



import { AddFab } from "src/components/common/AddFab.tsx";
import { BaseContainer } from "src/components/common/BaseContainer.tsx";
import { CustomPagination } from "src/components/common/CustomPagination.tsx";
import { Portal } from "src/components/common/Portal.tsx";
import { SearchInput } from "src/components/common/SearchInput.tsx";
import { BaseCreateModal } from "src/components/modal/BaseCreateModal.tsx";
import { BaseFilterModal } from "src/components/modal/BaseFilterModal.tsx";
import { BaseUpdateModal } from "src/components/modal/BaseUpdateModal.tsx";
import { useCrud, useCrudMutationF, useCrudQuery } from "src/hooks/crud.tsx";
import { useNotification } from "src/stores/general/notification.ts";



import { createSize, deleteSize, getSizes, sizeApproved, sizeStatus, updateSize } from "../api/sizeApi";
import { SizeResponse } from "../types/sizeTypes";
import { sizeCreateDefaultValues, sizeCreateSchema } from "../validation/createSize";
import { SizeFilterSchemaType, sizeFilterDefaultValues, sizeFilterSchema } from "../validation/filterSize.ts";
import { sizeUpdateDefaultValues, sizeUpdateSchema } from "../validation/updateSize.ts";
import { SizeCreateForm } from "./SizeCreateForm.tsx";
import { SizeFilterForm } from "./SizeFilterForm.tsx";
import { SizeTable } from "./SizeTable.tsx";
import { SizeUpdateForm } from "./SizeUpdateForm.tsx";


export { Size };

function Size(): React.ReactElement {
  const { t } = useTranslation();
  const addNotification = useNotification((state) => state.addNotification);
  const crud = useCrud<SizeResponse>();
  const sizeQuery = useCrudQuery({
    apiFunction: getSizes,
    name: "sizes",
    page: crud.page,
    search: crud.search,
    filters: crud.filters,
    keepPrevious: true,
    extras: undefined,
  });
  const sizes = sizeQuery.data?.data ?? [];
  const sizeCreateMutation = useCrudMutationF(createSize, "sizes", "create", {
    onSuccess: () => crud.setCreateModalOpen(false),
  });
  const sizeUpdateMutation = useCrudMutationF(updateSize, "sizes", "update", {
    onSuccess: () => crud.setUpdateModalOpen(false),
  });
  const sizeDeleteMutation = useCrudMutationF(deleteSize, "sizes", "delete");
  const sizeApproveMutation = useCrudMutationF(
    sizeApproved,
    "sizes",
    "custom",
    {
      customName: "approve",
    },
  );
  const sizeStatusMutation = useCrudMutationF(sizeStatus, "sizes", "custom", {
    customName: "status",
  });

  const sizeCreateForm = useForm({
    defaultValues: sizeCreateDefaultValues,
    resolver: zodResolver(sizeCreateSchema),
  });

  const sizeUpdateForm = useForm({
    defaultValues: sizeUpdateDefaultValues,
    resolver: zodResolver(sizeUpdateSchema),
  });

  const sizeFilterForm = useForm({
    defaultValues: sizeFilterDefaultValues,
    resolver: zodResolver(sizeFilterSchema),
  });

  useEffect(() => {
    if (crud.current !== undefined) {
      const size = crud.current;
      sizeUpdateForm.setValue("size", size.size);
    }
  }, [crud.current]);

  useEffect(() => {
    if (crud.createModalOpen) {
      sizeCreateForm.reset();
    }
  }, [crud.createModalOpen]);

  function onUpdatePress(size: SizeResponse) {
    crud.setCurrent(size);
    crud.setUpdateModalOpen(true);
  }

  function onDeletePress(size: SizeResponse) {
    addNotification({
      message: t("messages:delete.size"),
      action: {
        label: "Eliminar",
        onClick: async () => {
          sizeDeleteMutation.mutate({
            id: size.tire_size_id,
            extras: undefined,
          });
        },
      },
    });
  }

  function onApprovePress(size: SizeResponse) {
    addNotification({
      message: size.approved
        ? t("messages:change_status.size.disable")
        : t("messages:change_status.size.enable"),
      action: {
        label: "Confirmar",
        onClick: async () => {
          sizeApproveMutation.mutate({
            id: size.tire_size_id,
            data: {
              approved: size.approved === 1 ? 0 : 1,
            },
            extras: undefined,
          });
        },
      },
    });
  }

  function onStatusPress(size: SizeResponse) {
    addNotification({
      message: size.status
        ? t("messages:change_approved.size.disapprove")
        : t("messages:change_approved.size.approve"),
      action: {
        label: "Confirmar",
        onClick: async () => {
          sizeStatusMutation.mutate({
            id: size.tire_size_id,
            data: {
              status: size.status === 1 ? 0 : 1,
            },
            extras: undefined,
          });
        },
      },
    });
  }

  function onFilter(data: SizeFilterSchemaType) {
    const searchParams = new URLSearchParams();
    if (data.status) {
      searchParams.append("status", data.status === "enabled" ? "1" : "0");
    }
    if (data.approved) {
      searchParams.append("approved", data.approved === "approved" ? "1" : "0");
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
      <BaseCreateModal
        open={crud.createModalOpen}
        title={t("titles:new.size")}
        onClose={() => crud.setCreateModalOpen(false)}
        onConfirm={sizeCreateForm.handleSubmit(async (data) => {
          sizeCreateMutation.mutate({
            data: {
              size: data.size,
            },
            extras: undefined,
          });
        })}
      >
        <SizeCreateForm form={sizeCreateForm} />
      </BaseCreateModal>
      <BaseUpdateModal
        open={crud.updateModalOpen}
        title={t("titles:update.size")}
        onClose={() => crud.setUpdateModalOpen(false)}
        onConfirm={sizeUpdateForm.handleSubmit(async (data) => {
          sizeUpdateMutation.mutate({
            id: crud.current?.tire_size_id ?? 0,
            data: {
              size: data.size,
            },
            extras: undefined,
          });
        })}
      >
        <SizeUpdateForm form={sizeUpdateForm} />
      </BaseUpdateModal>
      <BaseFilterModal
        open={crud.filterModalOpen}
        title={t("general:filter")}
        onClose={() => crud.setFilterModalOpen(false)}
        onConfirm={sizeFilterForm.handleSubmit(async (data) => {
          onFilter(data);
        })}
        onClear={() => {
          sizeFilterForm.reset();
          crud.setFilters(new URLSearchParams());
        }}
      >
        <SizeFilterForm form={sizeFilterForm} />
      </BaseFilterModal>
      <BaseContainer title={t("common:size", { context: "plural" })}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          <SizeTable
            sizes={sizes}
            onUpdate={onUpdatePress}
            onDelete={onDeletePress}
            onApprove={onApprovePress}
            onStatusChange={onStatusPress}
          />
          <CustomPagination
            page={crud.page}
            onChange={(_event, page) => crud.setPage(page)}
            totalPages={sizeQuery.data?.last_page ?? 1}
          />
          <AddFab onClick={() => crud.setCreateModalOpen(true)} />
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