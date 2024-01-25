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
import { fileToBlob } from "src/utils/file";

import {
  createOriginalModel,
  deleteOriginalModel,
  getOriginalModels,
  originalModelApproved,
  originalModelStatus,
  updateOriginalModel,
} from "../api/originalModelApi";
import { useDependencies } from "../hooks/dependencies";
import { OriginaModelResponse } from "../types/originalModelTypes";
import {
  originalModelCreateDefaultValues,
  originalModelCreateSchema,
} from "../validation/createOriginalModel";
import {
  OriginalModelFilterSchemaType,
  originalModelFilterDefaultValues,
  originalModelFilterSchema,
} from "../validation/filterOriginalModel";
import {
  originalModelUpdateDefaultValues,
  originalModelUpdateSchema,
} from "../validation/updateOriginalModel";
import { OriginalModelCreateForm } from "./OriginalModelCreateForm";
import { OriginalModelFilterForm } from "./OriginalModelFilterForm";
import { OriginalModelTable } from "./OriginalModelTable";
import { OriginalModelUpdateForm } from "./OriginalModelUpdateForm";

export { OriginalModel };

function OriginalModel(): React.ReactElement {
  const { t } = useTranslation();
  const addNotification = useNotification((state) => state.addNotification);
  const crud = useCrud<OriginaModelResponse>();
  const originalModelQuery = useCrudQuery({
    apiFunction: getOriginalModels,
    name: "originalModels",
    page: crud.page,
    search: crud.search,
    filters: crud.filters,
    keepPrevious: true,
    extras: undefined,
  });
  const originalModels = originalModelQuery.data?.data ?? [];

  // const crudSize = useCrud<SizeResponseInput>();
  // const sizeQuery = useCrudQuery({
  //   apiFunction: getSizesInput,
  //   name: "sizes",
  //   page: crudSize.page,
  //   search: crudSize.search,
  //   filters: crudSize.filters,
  //   keepPrevious: true,
  //   extras: undefined,
  // });
  // const sizesInput = sizeQuery.data?.data ?? [];
  //dependecies
  const dependencies = useDependencies();

  const originalModelCreateMutation = useCrudMutationF(
    createOriginalModel,
    "originalModels",
    "create",
    {
      onSuccess: () => crud.setCreateModalOpen(false),
    },
  );
  const originalModelUpdateMutation = useCrudMutationF(
    updateOriginalModel,
    "originalModels",
    "update",
    {
      onSuccess: () => crud.setUpdateModalOpen(false),
    },
  );
  const originalModelDeleteMutation = useCrudMutationF(
    deleteOriginalModel,
    "originalModels",
    "delete",
  );
  const originalModelApproveMutation = useCrudMutationF(
    originalModelApproved,
    "originalModels",
    "custom",
    {
      customName: "approve",
    },
  );
  const originalModelStatusMutation = useCrudMutationF(
    originalModelStatus,
    "originalModels",
    "custom",
    {
      customName: "status",
    },
  );

  const originalModelCreateForm = useForm({
    defaultValues: originalModelCreateDefaultValues,
    resolver: zodResolver(originalModelCreateSchema),
  });

  const originalModelUpdateForm = useForm({
    defaultValues: originalModelUpdateDefaultValues,
    resolver: zodResolver(originalModelUpdateSchema),
  });

  useEffect(() => {
    if (crud.createModalOpen) {
      originalModelCreateForm.reset();
    }
  }, [crud.createModalOpen, originalModelCreateForm]);

  useEffect(() => {
    if (crud.updateModalOpen) {
      originalModelUpdateForm.reset();
    }
  }, [crud.updateModalOpen, originalModelUpdateForm]);

  useEffect(() => {
    if (crud.current !== undefined) {
      const originalModel = crud.current;
      // console.log(originalModel.tire_model_variation_use);
      originalModelUpdateForm.setValue("data_sheet", originalModel.data_sheet);
      originalModelUpdateForm.setValue(
        "tire_model_id",
        originalModel.tire_model_id,
      );
      originalModelUpdateForm.setValue("name", originalModel.tire_model.name);
      originalModelUpdateForm.setValue(
        "tire_size_id",
        originalModel.tire_size_id,
      );
      originalModelUpdateForm.setValue(
        "brand_id",
        originalModel.tire_model.brand_id,
      );
      originalModelUpdateForm.setValue(
        "tire_application_id",
        originalModel.tire_application_id,
      );
      originalModelUpdateForm.setValue(
        "number_layers",
        originalModel.number_layers,
      );
      originalModelUpdateForm.setValue("depth", originalModel.depth);
      originalModelUpdateForm.setValue(
        "maximum_pressure",
        originalModel.maximum_pressure,
      );
      originalModelUpdateForm.setValue(
        "recommended_pressure",
        originalModel.recommended_pressure,
      );
      originalModelUpdateForm.setValue("tolerance", originalModel.tolerance);
      originalModelUpdateForm.setValue(
        "helmet_value_original",
        originalModel.helmet_value_original,
      );
      originalModelUpdateForm.setValue(
        "helmet_value_revitalized",
        originalModel.helmet_value_revitalized,
      );
      if (originalModel.tire_model_variation_use.length > 0) {
        const values = originalModel.tire_model_variation_use.map(
          (item) => item.tire_use_id,
        );
        originalModelUpdateForm.setValue("tire_model_variation_use", values);
      } else {
        originalModelUpdateForm.setValue("tire_model_variation_use", []);
      }
      originalModelUpdateForm.setValue(
        "tire_model_variation_id",
        originalModel.tire_model_variation_id,
      );
    }
  }, [crud, originalModelUpdateForm]);

  function onUpdatePress(originalModel: OriginaModelResponse) {
    crud.setCurrent(originalModel);
    crud.setUpdateModalOpen(true);
  }

  function onDeletePress(originalModel: OriginaModelResponse) {
    addNotification({
      message: t("messages:delete.tire_model"),
      action: {
        label: "Eliminar",
        onClick: async () => {
          originalModelDeleteMutation.mutate({
            id: originalModel.tire_model_variation_id,
            extras: undefined,
          });
        },
      },
    });
  }

  function onApprovePress(originalModel: OriginaModelResponse) {
    addNotification({
      message: originalModel.approved
        ? t("messages:change_approved.model.disapprove")
        : t("messages:change_approved.model.approve"),
      action: {
        label: "Confirmar",
        onClick: async () => {
          originalModelApproveMutation.mutate({
            id: originalModel.tire_model_variation_id,
            data: {
              approved: originalModel.approved === 1 ? 0 : 1,
            },
            extras: undefined,
          });
        },
      },
    });
  }

  function onStatusPress(originalModel: OriginaModelResponse) {
    addNotification({
      message: originalModel.status
        ? t("messages:change_status.tire_model.disable")
        : t("messages:change_status.tire_model.enable"),
      action: {
        label: "Confirmar",
        onClick: async () => {
          originalModelStatusMutation.mutate({
            id: originalModel.tire_model_variation_id,
            data: {
              status: originalModel.status === 1 ? 0 : 1,
            },
            extras: undefined,
          });
        },
      },
    });
  }

  const originalModelFilterForm = useForm({
    defaultValues: originalModelFilterDefaultValues,
    resolver: zodResolver(originalModelFilterSchema),
  });

  function onFilter(data: OriginalModelFilterSchemaType) {
    const searchParams = new URLSearchParams();
    if (data.status) {
      searchParams.append("status", data.status === "enabled" ? "1" : "0");
    }
    if (data.approved) {
      searchParams.append("approved", data.approved === "approved" ? "1" : "0");
    }
    if (data.tire_model_variation_id) {
      searchParams.append(
        "tire_model_variation_id",
        data.tire_model_variation_id,
      );
    }
    if (data.brands) {
      searchParams.append("brands", data.brands);
    }
    if (data.sizes.length > 0) {
      searchParams.append("sizes", data.sizes);
    }
    if (data.tire_application_id.length > 0) {
      searchParams.append("tire_application", data.tire_application_id);
    }
    if (data.depth) {
      searchParams.append("depth", data.depth);
    }
    if (data.maximum_pressure) {
      searchParams.append("maximum_pressure", data.maximum_pressure);
    }
    if (data.number_layers) {
      searchParams.append("number_layers", data.number_layers);
    }
    crud.setFilters(searchParams);
  }

  return (
    <>
      <BaseCreateModal
        open={crud.createModalOpen}
        title={t("titles:new.tire_model")}
        onClose={() => crud.setCreateModalOpen(false)}
        onConfirm={originalModelCreateForm.handleSubmit(async (data) => {
          if (!data.data_sheet) {
            return;
          }
          const blob = await fileToBlob(data.data_sheet);
          const tire_model_variation_useJoined =
            data.tire_model_variation_use.join();
          return originalModelCreateMutation.mutate({
            data: {
              data_sheet: blob,
              name: data.name,
              tire_size_id: data.tire_size_id,
              brand_id: data.brand_id,
              tire_application_id: data.tire_application_id,
              number_layers: data.number_layers,
              depth: data.depth,
              maximum_pressure: data.maximum_pressure,
              recommended_pressure: data.recommended_pressure,
              tolerance: data.tolerance,
              helmet_value_original: data.helmet_value_original,
              helmet_value_revitalized: data.helmet_value_revitalized,
              tire_model_variation_use: tire_model_variation_useJoined,
            },
            extras: undefined,
          });
        })}
      >
        <OriginalModelCreateForm
          form={originalModelCreateForm}
          sizesInput={dependencies.sizes}
          brandsInput={dependencies.brands}
        />
      </BaseCreateModal>
      <BaseUpdateModal
        open={crud.updateModalOpen}
        title={t("titles:update.tire_model")}
        onClose={() => crud.setUpdateModalOpen(false)}
        onConfirm={originalModelUpdateForm.handleSubmit(async (data) => {
          const tire_model_variation_useJoined =
            data.tire_model_variation_use.join();
          if (!data.data_sheet) {
            return originalModelUpdateMutation.mutate({
              id: crud.current?.tire_model_variation_id ?? 0,
              data: {
                tire_model_id: data.tire_model_id,
                name: data.name,
                tire_size_id: data.tire_size_id,
                brand_id: data.brand_id,
                tire_application_id: data.tire_application_id,
                number_layers: data.number_layers,
                depth: data.depth,
                maximum_pressure: data.maximum_pressure,
                recommended_pressure: data.recommended_pressure,
                tolerance: data.tolerance,
                helmet_value_original: data.helmet_value_original,
                helmet_value_revitalized: data.helmet_value_revitalized,
                tire_model_variation_use: tire_model_variation_useJoined,
                logo: data.logo,
                image: data.image,
                tire_model_variation_id: data.tire_model_variation_id,
              },
              extras: undefined,
            });
          } else {
            const blob = await fileToBlob(data.data_sheet);
            return originalModelUpdateMutation.mutate({
              id: crud.current?.tire_model_variation_id ?? 0,
              data: {
                data_sheet: blob,
                tire_model_id: data.tire_model_id,
                name: data.name,
                tire_size_id: data.tire_size_id,
                brand_id: data.brand_id,
                tire_application_id: data.tire_application_id,
                number_layers: data.number_layers,
                depth: data.depth,
                maximum_pressure: data.maximum_pressure,
                recommended_pressure: data.recommended_pressure,
                tolerance: data.tolerance,
                helmet_value_original: data.helmet_value_original,
                helmet_value_revitalized: data.helmet_value_revitalized,
                tire_model_variation_use: tire_model_variation_useJoined,
                logo: data.logo,
                image: data.image,
                tire_model_variation_id: data.tire_model_variation_id,
              },
              extras: undefined,
            });
          }
        })}
      >
        <OriginalModelUpdateForm
          form={originalModelUpdateForm}
          sizesInput={dependencies.sizes}
          brandsInput={dependencies.brands}
        />
      </BaseUpdateModal>
      <BaseFilterModal
        open={crud.filterModalOpen}
        title={t("general:filter")}
        onClose={() => crud.setFilterModalOpen(false)}
        onConfirm={originalModelFilterForm.handleSubmit(async (data) => {
          onFilter(data);
        })}
        onClear={() => {
          originalModelFilterForm.reset();
          crud.setFilters(new URLSearchParams());
        }}
      >
        <OriginalModelFilterForm
          form={originalModelFilterForm}
          sizesInput={dependencies.sizes}
          brandsInput={dependencies.brands}
        />
      </BaseFilterModal>
      <BaseContainer title={t("general:tire_models")}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          <OriginalModelTable
            originalModels={originalModels}
            onUpdate={onUpdatePress}
            onDelete={onDeletePress}
            onApprove={onApprovePress}
            onStatusChange={onStatusPress}
          />
          <CustomPagination
            page={crud.page}
            onChange={(_event, page) => crud.setPage(page)}
            totalPages={originalModelQuery.data?.last_page ?? 1}
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
