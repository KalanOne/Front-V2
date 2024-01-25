import { useEffect } from "react";

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

import {
  createRevitalizedTireModel,
  deleteRevitalizedTireModel,
  getRevitalizedTireModel,
  revitalizedTireModelApproved,
  revitalizedTireModelStatus,
  updateRevitalizedTireModel,
} from "../api/revitalizedTireModelApi";
import { useDependencies } from "../hooks/dependencies";
import { RevitalizedTireModelResponse } from "../types/revitalizedTireModelTypes";
import {
  revitalizedTireModelCreateDefaultValues,
  revitalizedTireModelCreateSchema,
} from "../validation/createRevitalizedTireModel";
import {
  RevitalizedTireModelFilterSchemaType,
  revitalizedTireModelFilterDefaultValues,
  revitalizedTireModelFilterSchema,
} from "../validation/filterRevitalizedTireModel";
import {
  revitalizedTireModelUpdateDefaultValues,
  revitalizedTireModelUpdateSchema,
} from "../validation/updateRevitalizedTireModel";
import { RevitalizedTireModelCreateForm } from "./RevitalizedTireModelCreateForm";
import { RevitalizedTireModelFilterForm } from "./RevitalizedTireModelFilterForm";
import { RevitalizedTireModelTable } from "./RevitalizedTireModelTable";
import { RevitalizedTireModelUpdateForm } from "./RevitalizedTireModelUpdateForm";

export { RevitalizedTireModel };

function RevitalizedTireModel(): React.ReactElement {
  const { t } = useTranslation();
  const addNotification = useNotification((state) => state.addNotification);
  const crud = useCrud<RevitalizedTireModelResponse>();
  const revitalizedTireModelQuery = useCrudQuery({
    apiFunction: getRevitalizedTireModel,
    name: "revitalizedTireModels",
    page: crud.page,
    search: crud.search,
    filters: crud.filters,
    keepPrevious: true,
    extras: undefined,
  });
  const revitalizedTireModels = revitalizedTireModelQuery.data?.data ?? [];

  //dependencies
  const dependencies = useDependencies();

  const revitalizedTireModelCreateMutation = useCrudMutationF(
    createRevitalizedTireModel,
    "revitalizedTireModels",
    "create",
    {
      onSuccess: () => crud.setCreateModalOpen(false),
    },
  );
  const revitalizedTireModelUpdateMutation = useCrudMutationF(
    updateRevitalizedTireModel,
    "revitalizedTireModels",
    "update",
    {
      onSuccess: () => crud.setUpdateModalOpen(false),
    },
  );
  const revitalizedTireModelDeleteMutation = useCrudMutationF(
    deleteRevitalizedTireModel,
    "revitalizedTireModels",
    "delete",
  );
  const revitalizedTireModelApproveMutation = useCrudMutationF(
    revitalizedTireModelApproved,
    "revitalizedTireModels",
    "custom",
    {
      customName: "approve",
    },
  );
  const revitalizedTireModelStatusMutation = useCrudMutationF(
    revitalizedTireModelStatus,
    "revitalizedTireModels",
    "custom",
    {
      customName: "status",
    },
  );

  const revitalizedTireModelCreateForm = useForm({
    defaultValues: revitalizedTireModelCreateDefaultValues,
    resolver: zodResolver(revitalizedTireModelCreateSchema),
  });

  const revitalizedTireModelUpdateForm = useForm({
    defaultValues: revitalizedTireModelUpdateDefaultValues,
    resolver: zodResolver(revitalizedTireModelUpdateSchema),
  });

  const revitalizedTireModelFilterForm = useForm({
    defaultValues: revitalizedTireModelFilterDefaultValues,
    resolver: zodResolver(revitalizedTireModelFilterSchema),
  });

  useEffect(() => {
    if (crud.current !== undefined) {
      const revitalizedTireModel = crud.current;
      revitalizedTireModelUpdateForm.setValue(
        "brand_id",
        revitalizedTireModel.brand_id,
      );
      revitalizedTireModelUpdateForm.setValue(
        "depth",
        revitalizedTireModel.depth,
      );
      revitalizedTireModelUpdateForm.setValue(
        "name",
        revitalizedTireModel.name,
      );
      revitalizedTireModelUpdateForm.setValue(
        "tire_application_id",
        revitalizedTireModel.tire_application_id,
      );
    }
  }, [crud.current]);

  useEffect(() => {
    if (crud.createModalOpen) {
      revitalizedTireModelCreateForm.reset();
    }
  }, [crud.createModalOpen, revitalizedTireModelCreateForm]);

  function onUpdatePress(revitalizedTireModel: RevitalizedTireModelResponse) {
    crud.setCurrent(revitalizedTireModel);
    crud.setUpdateModalOpen(true);
  }

  function onDeletePress(revitalizedTireModel: RevitalizedTireModelResponse) {
    addNotification({
      message: t("messages:delete.revitalized_tire_model"),
      action: {
        label: "Eliminar",
        onClick: async () => {
          revitalizedTireModelDeleteMutation.mutate({
            id: revitalizedTireModel.revitalized_tire_model_id,
            extras: undefined,
          });
        },
      },
    });
  }

  function onApprovePress(revitalizedTireModel: RevitalizedTireModelResponse) {
    addNotification({
      message: revitalizedTireModel.approved
        ? t("messages:change_approved.model.disapprove")
        : t("messages:change_approved.model.approve"),
      action: {
        label: "Confirmar",
        onClick: async () => {
          revitalizedTireModelApproveMutation.mutate({
            id: revitalizedTireModel.revitalized_tire_model_id,
            data: {
              approved: revitalizedTireModel.approved === 1 ? 0 : 1,
            },
            extras: undefined,
          });
        },
      },
    });
  }

  function onStatusPress(revitalizedTireModel: RevitalizedTireModelResponse) {
    addNotification({
      message: revitalizedTireModel.status
        ? t("messages:change_status.revitalized_tire_model.disable")
        : t("messages:change_status.revitalized_tire_model.enable"),
      action: {
        label: "Confirmar",
        onClick: async () => {
          revitalizedTireModelStatusMutation.mutate({
            id: revitalizedTireModel.revitalized_tire_model_id,
            data: {
              status: revitalizedTireModel.status === 1 ? 0 : 1,
            },
            extras: undefined,
          });
        },
      },
    });
  }

  function onFilter(data: RevitalizedTireModelFilterSchemaType) {
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
    if (data.revitalized_tire_model_id) {
      searchParams.append(
        "revitalized_tire_model_id",
        data.revitalized_tire_model_id,
      );
    }
    crud.setFilters(searchParams);
  }

  return (
    <>
      <BaseCreateModal
        open={crud.createModalOpen}
        title={t("titles:new.revitalized_tire_model")}
        onClose={() => crud.setCreateModalOpen(false)}
        onConfirm={revitalizedTireModelCreateForm.handleSubmit(async (data) => {
          revitalizedTireModelCreateMutation.mutate({
            data: {
              brand_id: data.brand_id,
              depth: data.depth,
              name: data.name,
              tire_application_id: data.tire_application_id,
            },
            extras: undefined,
          });
        })}
      >
        <RevitalizedTireModelCreateForm
          form={revitalizedTireModelCreateForm}
          dependencies={dependencies}
        />
      </BaseCreateModal>
      <BaseUpdateModal
        open={crud.updateModalOpen}
        title={t("titles:update.revitalized_tire_model")}
        onClose={() => crud.setUpdateModalOpen(false)}
        onConfirm={revitalizedTireModelUpdateForm.handleSubmit(async (data) => {
          revitalizedTireModelUpdateMutation.mutate({
            id: crud.current?.revitalized_tire_model_id ?? 0,
            data: {
              brand_id: data.brand_id,
              depth: data.depth,
              name: data.name,
              tire_application_id: data.tire_application_id,
            },
            extras: undefined,
          });
        })}
      >
        <RevitalizedTireModelUpdateForm
          form={revitalizedTireModelUpdateForm}
          dependencies={dependencies}
        />
      </BaseUpdateModal>
      <BaseFilterModal
        open={crud.filterModalOpen}
        title={"Filtro"}
        onClose={() => crud.setFilterModalOpen(false)}
        onConfirm={revitalizedTireModelFilterForm.handleSubmit(
          async (data) => {
            onFilter(data);
          },
          // (d) => console.log(d),
        )}
        onClear={() => {
          revitalizedTireModelFilterForm.reset();
          crud.setFilters(new URLSearchParams());
        }}
      >
        <RevitalizedTireModelFilterForm form={revitalizedTireModelFilterForm} />
      </BaseFilterModal>
      <BaseContainer title={t("general:revitalized_tire_models")}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          <RevitalizedTireModelTable
            revitalizedTireModels={revitalizedTireModels}
            onUpdate={onUpdatePress}
            onDelete={onDeletePress}
            onApprove={onApprovePress}
            onStatusChange={onStatusPress}
          />
          <CustomPagination
            page={crud.page}
            onChange={(_event, page) => crud.setPage(page)}
            totalPages={revitalizedTireModelQuery.data?.last_page ?? 1}
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
