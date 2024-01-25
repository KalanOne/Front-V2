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
  companyStatus,
  createCompany,
  deleteCompany,
  getCompanies,
  updateCompany,
} from "../api/companyApi";
import { useCompanyQueryDependencies } from "../hooks/dependencies";
import { CompanyResponse } from "../types/companyTypes";
import {
  companyCreateDefaultValues,
  companyCreateSchema,
} from "../validation/createCompany";
import {
  CompanyFilterSchemaType,
  companyFilterDefaultValues,
  companyFilterSchema,
} from "../validation/filterCompany";
import {
  companyUpdateDefaultValues,
  companyUpdateSchema,
} from "../validation/updateCompany";
import { CompanyCreateForm } from "./CompanyCreateForm";
import { CompanyFilterForm } from "./CompanyFilterForm";
import { CompanyTable } from "./CompanyTable";
import { CompanyUpdateForm } from "./CompanyUpdateForm";

export { Company };

function Company(): React.ReactElement {
  const { t } = useTranslation();
  const [currentCompanyId, setCurrentCompanyId] = useState("");
  const addNotification = useNotification((state) => state.addNotification);
  const crud = useCrud<CompanyResponse>();
  const companiesQuery = useCrudQuery({
    apiFunction: getCompanies,
    name: "companies",
    page: crud.page,
    search: crud.search,
    filters: crud.filters,
    keepPrevious: true,
    extras: undefined,
  });
  const companies = companiesQuery.data?.data ?? [];

  //dependencies
  const dependencies = useCompanyQueryDependencies({
    company_id: currentCompanyId,
  });

  const companyCreateMutation = useCrudMutationF(
    createCompany,
    "companies",
    "create",
    {
      onSuccess: () => crud.setCreateModalOpen(false),
    },
  );
  const companyUpdateMutation = useCrudMutationF(
    updateCompany,
    "companies",
    "update",
    {
      onSuccess: () => crud.setUpdateModalOpen(false),
    },
  );
  const companiesDeleteMutation = useCrudMutationF(
    deleteCompany,
    "companies",
    "delete",
  );
  const companiesStatusMutation = useCrudMutationF(
    companyStatus,
    "companies",
    "custom",
    {
      customName: "status",
    },
  );

  const companyCreateForm = useForm({
    defaultValues: companyCreateDefaultValues,
    resolver: zodResolver(companyCreateSchema),
  });
  const companyUpdateForm = useForm({
    defaultValues: companyUpdateDefaultValues,
    resolver: zodResolver(companyUpdateSchema),
  });
  const companyFilterForm = useForm({
    defaultValues: companyFilterDefaultValues,
    resolver: zodResolver(companyFilterSchema),
  });

  function onCreateModalOpen() {
    companyCreateForm.reset();
  }
  function onUpdatePress(company: CompanyResponse) {
    companyUpdateForm.reset();
    setCurrentCompanyId(company.company_id.toString());
    crud.setUpdateModalOpen(true);
  }
  function onDeletePress(company: CompanyResponse) {
    addNotification({
      message: t("messages:delete.company"),
      action: {
        label: "Eliminar",
        onClick: async () => {
          companiesDeleteMutation.mutate({
            id: company.company_id,
            extras: undefined,
          });
        },
      },
    });
  }
  function onStatusPress(company: CompanyResponse) {
    addNotification({
      message: company.status
        ? t("messages:change_status.company.disable")
        : t("messages:change_status.company.enable"),
      action: {
        label: "Confirmar",
        onClick: async () => {
          companiesStatusMutation.mutate({
            id: company.company_id,
            data: {
              status: company.status === 1 ? 0 : 1,
            },
            extras: undefined,
          });
        },
      },
    });
  }
  function onFilter(data: CompanyFilterSchemaType) {
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
    if (data.corporate_id.length > 0) {
      searchParams.append("corporates", data.corporate_id);
    }
    crud.setFilters(searchParams);
  }

  useEffect(() => {
    if (crud.createModalOpen) {
      onCreateModalOpen();
    }
  }, [crud.createModalOpen]);
  useEffect(() => {
    if (crud.current !== undefined) {
      const companyCurrent = crud.current;
      companyUpdateForm.setValue(
        "name",
        companyCurrent.name ? companyCurrent.name : "",
      );
      companyUpdateForm.setValue(
        "corporate_id",
        companyCurrent.corporate_id ? companyCurrent.corporate_id : 0,
      );
      companyUpdateForm.setValue(
        "social_reason",
        companyCurrent.social_reason ? companyCurrent.social_reason : "",
      );
      companyUpdateForm.setValue(
        "rfc",
        companyCurrent.rfc ? companyCurrent.rfc : "",
      );
      companyUpdateForm.setValue(
        "tire_fee",
        companyCurrent.tire_fee ? companyCurrent.tire_fee : 0,
      );
      companyUpdateForm.setValue(
        "fee_currency_type",
        companyCurrent.fee_currency_type
          ? companyCurrent.fee_currency_type
          : "",
      );
    }
  }, [crud.current]);
  useEffect(() => {
    if (dependencies.company) {
      crud.setCurrent(dependencies.company);
    }
  }, [dependencies.company]);

  return (
    <>
      <BaseFilterModal
        open={crud.filterModalOpen}
        title={t("general:filter")}
        onClose={() => crud.setFilterModalOpen(false)}
        onConfirm={companyFilterForm.handleSubmit(
          async (data) => {
            onFilter(data);
          },
          // (d) => console.log(d),
        )}
        onClear={() => {
          companyFilterForm.reset();
          crud.setFilters(new URLSearchParams());
        }}
      >
        <CompanyFilterForm
          form={companyFilterForm}
          corporates={dependencies.corporates}
        />
      </BaseFilterModal>
      <BaseCreateModal
        open={crud.createModalOpen}
        title={t("titles:new.corporate")}
        onClose={() => crud.setCreateModalOpen(false)}
        onConfirm={companyCreateForm.handleSubmit(async (data) => {
          if (!data.logo) {
            return companyCreateMutation.mutate({
              data: {
                name: data.name,
                corporate_id: data.corporate_id,
                social_reason: data.social_reason,
                rfc: data.rfc,
                tire_fee: data.tire_fee,
                fee_currency_type: data.fee_currency_type,
              },
              extras: undefined,
            });
          } else {
            const blob = await fileToBlob(data.logo);
            return companyCreateMutation.mutate({
              data: {
                logo: blob,
                name: data.name,
                corporate_id: data.corporate_id,
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
        <CompanyCreateForm
          form={companyCreateForm}
          corporates={dependencies.corporates}
        />
      </BaseCreateModal>
      <BaseUpdateModal
        open={crud.updateModalOpen}
        title={t("titles:update.corporate")}
        onClose={() => crud.setUpdateModalOpen(false)}
        onConfirm={companyUpdateForm.handleSubmit(async (data) => {
          if (!data.logo) {
            return companyUpdateMutation.mutate({
              id: crud.current?.company_id ?? 0,
              data: {
                name: data.name,
                social_reason: data.social_reason,
                corporate_id: data.corporate_id,
                rfc: data.rfc,
                tire_fee: data.tire_fee,
                fee_currency_type: data.fee_currency_type,
              },
              extras: undefined,
            });
          } else {
            const blob = await fileToBlob(data.logo);
            return companyUpdateMutation.mutate({
              id: crud.current?.company_id ?? 0,
              data: {
                logo: blob,
                name: data.name,
                social_reason: data.social_reason,
                corporate_id: data.corporate_id,
                rfc: data.rfc,
                tire_fee: data.tire_fee,
                fee_currency_type: data.fee_currency_type,
              },
              extras: undefined,
            });
          }
        })}
      >
        <CompanyUpdateForm
          form={companyUpdateForm}
          corporates={dependencies.corporates}
        />
      </BaseUpdateModal>
      <BaseContainer title={t("common:company", { context: "plural" })}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          <CompanyTable
            companies={companies}
            onDelete={onDeletePress}
            onStatusChange={onStatusPress}
            onUpdate={onUpdatePress}
          />
          <CustomPagination
            page={crud.page}
            onChange={(_event, page) => crud.setPage(page)}
            totalPages={companiesQuery.data?.last_page ?? 1}
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
