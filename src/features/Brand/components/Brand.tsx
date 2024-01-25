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

import {
  brandApproved,
  brandStatus,
  createBrand,
  deleteBrand,
  getBrands,
  updateBrand,
} from "../api/brandApi.ts";
import { BrandResponse } from "../types/brandTypes.ts";
import {
  brandCreateDefaultValues,
  brandCreateSchema,
} from "../validation/createBrand.ts";
import {
  BrandFilterSchemaType,
  brandFilterDefaultValues,
  brandFilterSchema,
} from "../validation/filterBrand.ts";
import {
  brandUpdateDefaultValues,
  brandUpdateSchema,
} from "../validation/updateBrand.ts";
import { BrandCreateForm } from "./BrandCreateForm.tsx";
import { BrandFilterForm } from "./BrandFilterForm.tsx";
import { BrandTable } from "./BrandTable.tsx";
import { BrandUpdateForm } from "./BrandUpdateForm.tsx";

export { Brand };

function Brand(): React.ReactElement {
  const { t } = useTranslation();
  const addNotification = useNotification((state) => state.addNotification);
  const crud = useCrud<BrandResponse>();
  const brandsQuery = useCrudQuery({
    apiFunction: getBrands,
    name: "brands",
    page: crud.page,
    search: crud.search,
    filters: crud.filters,
    keepPrevious: true,
    extras: undefined,
  });
  const brands = brandsQuery.data?.data ?? [];
  const brandCreateMutation = useCrudMutationF(
    createBrand,
    "brands",
    "create",
    {
      onSuccess: () => crud.setCreateModalOpen(false),
    },
  );
  const brandUpdateMutation = useCrudMutationF(
    updateBrand,
    "brands",
    "update",
    {
      onSuccess: () => crud.setUpdateModalOpen(false),
    },
  );
  const brandDeleteMutation = useCrudMutationF(deleteBrand, "brands", "delete");
  const brandApproveMutation = useCrudMutationF(
    brandApproved,
    "brands",
    "custom",
    {
      customName: "approve",
    },
  );
  const brandStatusMutation = useCrudMutationF(
    brandStatus,
    "brands",
    "custom",
    {
      customName: "status",
    },
  );

  const brandCreateForm = useForm({
    defaultValues: brandCreateDefaultValues,
    resolver: zodResolver(brandCreateSchema),
  });

  const brandUpdateForm = useForm({
    defaultValues: brandUpdateDefaultValues,
    resolver: zodResolver(brandUpdateSchema),
  });

  const brandFilterForm = useForm({
    defaultValues: brandFilterDefaultValues,
    resolver: zodResolver(brandFilterSchema),
  });

  function onItemChange(brand: BrandResponse) {
    brandUpdateForm.setValue("name", brand.name);
    brandUpdateForm.setValue("brandType", brand.brand_type);
  }

  function onCreateModalOpen() {
    brandCreateForm.reset();
  }

  function onUpdatePress(brand: BrandResponse) {
    crud.setCurrent(brand);
    crud.setUpdateModalOpen(true);
  }

  function onDeletePress(brand: BrandResponse) {
    addNotification({
      message: t("messages:delete.brand"),
      action: {
        label: "Eliminar",
        onClick: async () => {
          brandDeleteMutation.mutate({
            id: brand.brand_id,
            extras: undefined,
          });
        },
      },
    });
  }

  function onStatusPress(brand: BrandResponse) {
    addNotification({
      message: brand.status
        ? t("messages:change_status.brand.disable")
        : t("messages:change_status.brand.enable"),
      action: {
        label: "Confirmar",
        onClick: async () => {
          brandStatusMutation.mutate({
            id: brand.brand_id,
            data: {
              status: brand.status === 1 ? 0 : 1,
            },
            extras: undefined,
          });
        },
      },
    });
  }

  function onApprovePress(brand: BrandResponse) {
    addNotification({
      message: brand.approved
        ? t("messages:change_approved.brand.disapprove")
        : t("messages:change_approved.brand.approve"),
      action: {
        label: "Confirmar",
        onClick: async () => {
          brandApproveMutation.mutate({
            id: brand.brand_id,
            data: {
              approved: brand.approved === 1 ? 0 : 1,
            },
            extras: undefined,
          });
        },
      },
    });
  }

  function onFilter(data: BrandFilterSchemaType) {
    const searchParams = new URLSearchParams();
    if (data.brandType.length > 0) {
      searchParams.append("brand_type", data.brandType.join(","));
    }
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

  useEffect(() => {
    if (crud.current !== undefined) {
      const brand = crud.current;
      onItemChange(brand);
    }
  }, [crud.current]);

  useEffect(() => {
    if (crud.createModalOpen) {
      onCreateModalOpen();
    }
  }, [crud.createModalOpen]);

  return (
    <>
      <BaseCreateModal
        open={crud.createModalOpen}
        title={t("titles:new.brand")}
        onClose={() => crud.setCreateModalOpen(false)}
        onConfirm={brandCreateForm.handleSubmit(async (data) => {
          brandCreateMutation.mutate({
            data: {
              name: data.name,
              brand_type: data.brandType,
            },
            extras: undefined,
          });
        })}
      >
        <BrandCreateForm form={brandCreateForm} />
      </BaseCreateModal>
      <BaseUpdateModal
        open={crud.updateModalOpen}
        title={t("titles:update.brand")}
        onClose={() => crud.setUpdateModalOpen(false)}
        onConfirm={brandUpdateForm.handleSubmit(async (data) => {
          brandUpdateMutation.mutate({
            id: crud.current?.brand_id ?? 0,
            data: {
              name: data.name,
              brand_type: data.brandType,
            },
            extras: undefined,
          });
        })}
      >
        <BrandUpdateForm form={brandUpdateForm} />
      </BaseUpdateModal>
      <BaseFilterModal
        open={crud.filterModalOpen}
        title={t("general:filter")}
        onClose={() => crud.setFilterModalOpen(false)}
        onConfirm={brandFilterForm.handleSubmit(
          async (data) => {
            onFilter(data);
          },
          // (d) => console.log(d),
        )}
        onClear={() => {
          brandFilterForm.reset();
          crud.setFilters(new URLSearchParams());
        }}
      >
        <BrandFilterForm form={brandFilterForm} />
      </BaseFilterModal>
      <BaseContainer title={t("common:brand", { context: "plural" })}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          <BrandTable
            brands={brands}
            onUpdate={onUpdatePress}
            onDelete={onDeletePress}
            onApprove={onApprovePress}
            onStatusChange={onStatusPress}
          />
          <CustomPagination
            page={crud.page}
            onChange={(_event, page) => crud.setPage(page)}
            totalPages={brandsQuery.data?.last_page ?? 1}
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
