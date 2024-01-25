import React, { useEffect, useState } from "react";

import FilterListIcon from "@mui/icons-material/FilterList";
import { Container, IconButton, Stack } from "@mui/material";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { AddFab } from "src/components/common/AddFab";
import { BaseContainer } from "src/components/common/BaseContainer.tsx";
import { CustomPagination } from "src/components/common/CustomPagination";
import { Portal } from "src/components/common/Portal";
import { SearchInput } from "src/components/common/SearchInput";
import { BaseCreateModal } from "src/components/modal/BaseCreateModal";
import { BaseCustomModal } from "src/components/modal/BaseCustomModal";
import { BaseFilterModal } from "src/components/modal/BaseFilterModal";
import { BaseUpdateModal } from "src/components/modal/BaseUpdateModal";
import { useCrud, useCrudMutationF, useCrudQuery } from "src/hooks/crud";
import { useNotification } from "src/stores/general/notification";

import {
  createRfid,
  deleteRfid,
  getRfid,
  linkRfid,
  rfidStatus,
  unLinkRfid,
  updateRfid,
} from "../api/rfidApi";
import { useDependencies } from "../hooks/dependencies";
import { RfidResponse } from "../types/rfidTypes";
import {
  rfidCreateDefaultValues,
  rfidCreateSchema,
} from "../validation/createRfid";
import {
  RfidFilterSchemaType,
  rfidFilterDefaultValues,
  rfidFilterSchema,
} from "../validation/filterRfid";
import { rfidLinkDefaultValues, rfidLinkSchema } from "../validation/linkRfid";
import {
  rfidUpdateDefaultValues,
  rfidUpdateSchema,
} from "../validation/updateRfid";
import { RfidCreateForm } from "./RfidCreateForm";
import { RfidFilterForm } from "./RfidFilterForm";
import { RfidLinkForm } from "./RfidLinkForm";
import { RfidTable } from "./RfidTable";
import { RfidUpdateForm } from "./RfidUpdateForm";

export { Rfid };

function Rfid(): React.ReactElement {
  const { t } = useTranslation();
  const [custom, setCustom] = useState(false);
  const addNotification = useNotification((state) => state.addNotification);
  const crud = useCrud<RfidResponse>();
  const rfidQuery = useCrudQuery({
    apiFunction: getRfid,
    name: "rfid",
    page: crud.page,
    search: crud.search,
    filters: crud.filters,
    keepPrevious: true,
    extras: undefined,
  });
  const rfid = rfidQuery.data?.data ?? [];

  //dependencies
  const dependencies = useDependencies();

  const rfidCreateMutation = useCrudMutationF(createRfid, "rfid", "create", {
    onSuccess: () => crud.setCreateModalOpen(false),
  });
  const rfidUpdateMutation = useCrudMutationF(updateRfid, "rfid", "update", {
    onSuccess: () => crud.setUpdateModalOpen(false),
  });
  const rfidDeleteMutation = useCrudMutationF(deleteRfid, "rfid", "delete");
  const rfidStatusMutation = useCrudMutationF(rfidStatus, "rfid", "custom", {
    customName: "status",
  });
  const rfidLinkMutation = useCrudMutationF(linkRfid, "rfid", "custom", {
    onSuccess: () => setCustom(false),
    customName: "link",
  });
  const rfidUnLinkMutation = useCrudMutationF(unLinkRfid, "rfid", "custom", {
    customName: "unlink",
  });

  const rfidCreateForm = useForm({
    defaultValues: rfidCreateDefaultValues,
    resolver: zodResolver(rfidCreateSchema),
  });
  const rfidUpdateForm = useForm({
    defaultValues: rfidUpdateDefaultValues,
    resolver: zodResolver(rfidUpdateSchema),
  });
  const rfidFilterForm = useForm({
    defaultValues: rfidFilterDefaultValues,
    resolver: zodResolver(rfidFilterSchema),
  });
  const rfidLinkForm = useForm({
    defaultValues: rfidLinkDefaultValues,
    resolver: zodResolver(rfidLinkSchema),
  });

  function onUpdatePress(rfid: RfidResponse) {
    crud.setCurrent(rfid);
    crud.setUpdateModalOpen(true);
  }
  function onItemChange(rfid: RfidResponse) {
    rfidUpdateForm.setValue("device_code", rfid.device_code);
    rfidUpdateForm.setValue("subsidiary_id", rfid.subsidiary_id);
  }
  function onDeletePress(rfid: RfidResponse) {
    addNotification({
      message: t("messages:delete.rfid"),
      action: {
        label: "Eliminar",
        onClick: async () => {
          rfidDeleteMutation.mutate({
            id: rfid.rfid_id,
            extras: undefined,
          });
        },
      },
    });
  }
  function onStatusPress(rfid: RfidResponse) {
    addNotification({
      message: rfid.status
        ? t("messages:change_status.rfid.disable")
        : t("messages:change_status.rfid.enable"),
      action: {
        label: "Confirmar",
        onClick: async () => {
          rfidStatusMutation.mutate({
            id: rfid.rfid_id,
            data: {
              status: rfid.status === 1 ? 0 : 1,
            },
            extras: undefined,
          });
        },
      },
    });
  }
  function onFilter(data: RfidFilterSchemaType) {
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
    if (data.subsidiary_id.length > 0) {
      searchParams.append("subsidiaries", data.subsidiary_id);
    }
    crud.setFilters(searchParams);
  }
  function onCustomLink(rfid: RfidResponse) {
    rfidLinkForm.reset();
    if (rfid.tire.length > 0) {
      rfidLinkForm.setValue("tire_id", rfid.tire[0].tire.tire_id.toString());
    }
    setCustom(true);
    crud.setCurrent(rfid);
  }
  function onCustomUnLink(rfid: RfidResponse) {
    addNotification({
      message: "¿Eliminar vinculo?",
      action: {
        label: "Eliminar",
        onClick: async () => {
          rfidUnLinkMutation.mutate({
            data: {
              rfid_id: rfid.rfid_id,
              tire_id: rfid.tire[0].tire.tire_id,
            },
            extras: undefined,
          });
        },
      },
    });
  }
  useEffect(() => {
    if (crud.current !== undefined) {
      const rfid = crud.current;
      rfidUpdateForm.reset();
      onItemChange(rfid);
    }
  }, [crud.current]);
  useEffect(() => {
    if (crud.createModalOpen) {
      rfidCreateForm.reset();
    }
  }, [crud.createModalOpen]);

  return (
    <>
      <BaseCreateModal
        open={crud.createModalOpen}
        title={t("titles:new.rfid")}
        onClose={() => crud.setCreateModalOpen(false)}
        onConfirm={rfidCreateForm.handleSubmit(async (data) => {
          rfidCreateMutation.mutate({
            data: {
              device_code: data.device_code,
              subsidiary_id: data.subsidiary_id,
            },
            extras: undefined,
          });
        })}
      >
        <RfidCreateForm
          form={rfidCreateForm}
          subsidiaries={dependencies.subsidiaries}
        />
      </BaseCreateModal>
      <BaseUpdateModal
        open={crud.updateModalOpen}
        title={t("titles:update.brand")}
        onClose={() => crud.setUpdateModalOpen(false)}
        onConfirm={rfidUpdateForm.handleSubmit(async (data) => {
          rfidUpdateMutation.mutate({
            id: crud.current?.rfid_id ?? 0,
            data: {
              device_code: data.device_code,
              subsidiary_id: data.subsidiary_id,
            },
            extras: undefined,
          });
        })}
      >
        <RfidUpdateForm
          form={rfidUpdateForm}
          subsidiaries={dependencies.subsidiaries}
        />
      </BaseUpdateModal>
      <BaseFilterModal
        open={crud.filterModalOpen}
        title={t("general:filter")}
        onClose={() => crud.setFilterModalOpen(false)}
        onConfirm={rfidFilterForm.handleSubmit(
          async (data) => {
            onFilter(data);
          },
          // (d) => console.log(d),
        )}
        onClear={() => {
          rfidFilterForm.reset();
          crud.setFilters(new URLSearchParams());
        }}
      >
        <RfidFilterForm
          form={rfidFilterForm}
          subsidiaries={dependencies.subsidiaries}
        />
      </BaseFilterModal>
      <BaseCustomModal
        open={custom}
        title={t("titles:new.rfid")}
        onClose={() => setCustom(false)}
        onConfirm={rfidLinkForm.handleSubmit(async (data) => {
          rfidLinkMutation.mutate({
            data: {
              rfid_id: crud.current?.rfid_id ?? 0,
              tire_id: parseInt(data.tire_id),
            },
            extras: undefined,
          });
        })}
      >
        <RfidLinkForm form={rfidLinkForm} tires={dependencies.tires} />
      </BaseCustomModal>
      <BaseContainer title={t("general:rfid")}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          <RfidTable
            Rfid={rfid}
            onUpdate={onUpdatePress}
            onDelete={onDeletePress}
            onStatusChange={onStatusPress}
            onLink={onCustomLink}
            onUnLink={onCustomUnLink}
          />
          <CustomPagination
            page={crud.page}
            onChange={(_event, page) => crud.setPage(page)}
            totalPages={rfidQuery.data?.last_page ?? 1}
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
