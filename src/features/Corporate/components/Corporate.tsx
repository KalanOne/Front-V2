import React, { useEffect, useState } from "react";

import FilterListIcon from "@mui/icons-material/FilterList";
import { Container, IconButton, Stack } from "@mui/material";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { AddFab } from "src/components/common/AddFab";
import { BaseContainer } from "src/components/common/BaseContainer";
import { CustomPagination } from "src/components/common/CustomPagination";
import { Portal } from "src/components/common/Portal";
import { SearchInput } from "src/components/common/SearchInput";
import { BaseCreateModal } from "src/components/modal/BaseCreateModal";
import { BaseFilterModal } from "src/components/modal/BaseFilterModal";
import { BaseUpdateModal } from "src/components/modal/BaseUpdateModal";
import { useCrud, useCrudMutationF, useCrudQuery } from "src/hooks/crud";
import { useNotification } from "src/stores/general/notification";
import { fileToBlob } from "src/utils/file";

import {
  corporateStatus,
  createCorporate,
  deleteCorporate,
  getCorporates,
  updateCorporate,
} from "../api/corporateApi";
import { useCorporateQueryDependencies } from "../hooks/dependencies";
import { CorporateResponse } from "../types/corporateTypes";
import {
  corporateCreateDefaultValues,
  corporateCreateSchema,
} from "../validation/createCorporate";
import {
  CorporateFilterSchemaType,
  corporateFilterDefaultValues,
  corporateFilterSchema,
} from "../validation/filterCorporate";
import {
  corporateUpdateDefaultValues,
  corporateUpdateSchema,
} from "../validation/updateCorporate";
import { CorporateCreateForm } from "./CorporateCreateForm";
import { CorporateFilterForm } from "./CorporateFilterForm";
import { CorporateTable } from "./CorporateTable";
import { CorporateUpdateForm } from "./CorporateUpdateForm";

export { Corporate };

function Corporate(): React.ReactElement {
  const { t } = useTranslation();
  const [currentCorporateId, setCurrentCorporateId] = useState("");
  const addNotification = useNotification((state) => state.addNotification);
  const crud = useCrud<CorporateResponse>();
  const corporatesQuery = useCrudQuery({
    apiFunction: getCorporates,
    name: "corporates",
    page: crud.page,
    search: crud.search,
    filters: crud.filters,
    keepPrevious: true,
    extras: undefined,
  });
  const corporates = corporatesQuery.data?.data ?? [];
  const corporateCreateMutation = useCrudMutationF(
    createCorporate,
    "corporates",
    "create",
    {
      onSuccess: () => crud.setCreateModalOpen(false),
    },
  );
  const corporateUpdateMutation = useCrudMutationF(
    updateCorporate,
    "corporates",
    "update",
    {
      onSuccess: () => crud.setUpdateModalOpen(false),
    },
  );
  const corporatesDeleteMutation = useCrudMutationF(
    deleteCorporate,
    "corporates",
    "delete",
  );
  const corporatesStatusMutation = useCrudMutationF(
    corporateStatus,
    "corporates",
    "custom",
    {
      customName: "status",
    },
  );

  //dependencies
  const corporateD = useCorporateQueryDependencies({
    corporate_id: currentCorporateId,
  });

  const corporateCreateForm = useForm({
    defaultValues: corporateCreateDefaultValues,
    resolver: zodResolver(corporateCreateSchema),
  });
  const corporateUpdateForm = useForm({
    defaultValues: corporateUpdateDefaultValues,
    resolver: zodResolver(corporateUpdateSchema),
  });
  const corporateFilterForm = useForm({
    defaultValues: corporateFilterDefaultValues,
    resolver: zodResolver(corporateFilterSchema),
  });

  function onUpdatePress(corporate: CorporateResponse) {
    corporateUpdateForm.reset();
    setCurrentCorporateId(corporate.corporate_id.toString());
    crud.setUpdateModalOpen(true);
  }
  function onDeletePress(corporate: CorporateResponse) {
    addNotification({
      message: t("messages:delete.corporate"),
      action: {
        label: "Eliminar",
        onClick: async () => {
          corporatesDeleteMutation.mutate({
            id: corporate.corporate_id,
            extras: undefined,
          });
        },
      },
    });
  }
  function onStatusPress(corporate: CorporateResponse) {
    addNotification({
      message: corporate.status
        ? t("messages:change_status.corporate.disable")
        : t("messages:change_status.corporate.enable"),
      action: {
        label: "Confirmar",
        onClick: async () => {
          corporatesStatusMutation.mutate({
            id: corporate.corporate_id,
            data: {
              status: corporate.status === 1 ? 0 : 1,
            },
            extras: undefined,
          });
        },
      },
    });
  }
  function onFilter(data: CorporateFilterSchemaType) {
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
  function onCreateModalOpen() {
    corporateCreateForm.reset();
  }

  useEffect(() => {
    if (crud.createModalOpen) {
      onCreateModalOpen();
    }
  }, [crud.createModalOpen]);

  useEffect(() => {
    if (crud.current !== undefined) {
      const corporateCurrent = crud.current;
      corporateUpdateForm.setValue(
        "name",
        corporateCurrent.name ? corporateCurrent.name : "",
      );
      corporateUpdateForm.setValue(
        "social_reason",
        corporateCurrent.social_reason ? corporateCurrent.social_reason : "",
      );
      corporateUpdateForm.setValue(
        "rfc",
        corporateCurrent.rfc ? corporateCurrent.rfc : "",
      );
      corporateUpdateForm.setValue(
        "tire_fee",
        corporateCurrent.tire_fee ? corporateCurrent.tire_fee : 0,
      );
      corporateUpdateForm.setValue(
        "fee_currency_type",
        corporateCurrent.fee_currency_type
          ? corporateCurrent.fee_currency_type
          : "",
      );
    }
  }, [crud.current]);
  useEffect(() => {
    if (corporateD.corporate) {
      crud.setCurrent(corporateD.corporate);
    }
  }, [corporateD.corporate]);

  return (
    <>
      <BaseFilterModal
        open={crud.filterModalOpen}
        title={t("general:filter")}
        onClose={() => crud.setFilterModalOpen(false)}
        onConfirm={corporateFilterForm.handleSubmit(
          async (data) => {
            onFilter(data);
          },
          // (d) => console.log(d),
        )}
        onClear={() => {
          corporateFilterForm.reset();
          crud.setFilters(new URLSearchParams());
        }}
      >
        <CorporateFilterForm form={corporateFilterForm} />
      </BaseFilterModal>
      <BaseUpdateModal
        open={crud.updateModalOpen}
        title={t("titles:update.corporate")}
        onClose={() => crud.setUpdateModalOpen(false)}
        onConfirm={corporateUpdateForm.handleSubmit(async (data) => {
          if (!data.logo) {
            return corporateUpdateMutation.mutate({
              id: crud.current?.corporate_id ?? 0,
              data: {
                name: data.name,
                social_reason: data.social_reason,
                rfc: data.rfc,
                tire_fee: data.tire_fee,
                fee_currency_type: data.fee_currency_type,
              },
              extras: undefined,
            });
          } else {
            const blob = await fileToBlob(data.logo);
            return corporateUpdateMutation.mutate({
              id: crud.current?.corporate_id ?? 0,
              data: {
                logo: blob,
                name: data.name,
                social_reason: data.social_reason,
                rfc: data.rfc,
                tire_fee: data.tire_fee,
                fee_currency_type: data.fee_currency_type,
              },
              extras: undefined,
            });
          }
        })}
      >
        <CorporateUpdateForm form={corporateUpdateForm} />
      </BaseUpdateModal>
      <BaseCreateModal
        open={crud.createModalOpen}
        title={t("titles:new.corporate")}
        onClose={() => crud.setCreateModalOpen(false)}
        onConfirm={corporateCreateForm.handleSubmit(async (data) => {
          if (!data.logo) {
            return corporateCreateMutation.mutate({
              data: {
                name: data.name,
                social_reason: data.social_reason,
                rfc: data.rfc,
                tire_fee: data.tire_fee,
                fee_currency_type: data.fee_currency_type,
              },
              extras: undefined,
            });
          } else {
            const blob = await fileToBlob(data.logo);
            return corporateCreateMutation.mutate({
              data: {
                logo: blob,
                name: data.name,
                social_reason: data.social_reason,
                rfc: data.rfc,
                tire_fee: data.tire_fee,
                fee_currency_type: data.fee_currency_type,
              },
              extras: undefined,
            });
          }
        })}
      >
        <CorporateCreateForm form={corporateCreateForm} />
      </BaseCreateModal>
      <BaseContainer title={t("common:corporate", { context: "plural" })}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          <CorporateTable
            corporates={corporates}
            onDelete={onDeletePress}
            onStatusChange={onStatusPress}
            onUpdate={onUpdatePress}
          />
          <CustomPagination
            page={crud.page}
            onChange={(_event, page) => crud.setPage(page)}
            totalPages={corporatesQuery.data?.last_page ?? 1}
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
