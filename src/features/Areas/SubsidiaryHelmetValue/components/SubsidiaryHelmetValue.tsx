import { useEffect } from "react";

import FilterListIcon from "@mui/icons-material/FilterList";
import { Container, IconButton, Stack } from "@mui/material";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { AddFab } from "src/components/common/AddFab";
import { BaseContainer } from "src/components/common/BaseContainer";
import { CustomPagination } from "src/components/common/CustomPagination";
import { Portal } from "src/components/common/Portal";
import { BaseCreateModal } from "src/components/modal/BaseCreateModal";
import { BaseFilterModal } from "src/components/modal/BaseFilterModal";
import { BaseUpdateModal } from "src/components/modal/BaseUpdateModal";
import TabMenuSubsidiary from "src/features/Subsidiary/components/TabMenuSubsidiary";
import { useCrud, useCrudMutationF, useCrudQuery } from "src/hooks/crud";
import { useNotification } from "src/stores/general/notification";

import {
  createSubsidiaryHelmetValue,
  deleteSubsidiaryHelmetValue,
  getSubsidiaryHelmetValues,
  updateSubsidiaryHelmetValue,
} from "../api/subsidiaryHelmetValueApi";
import { useSubsidiaryHelmetValueDependencies } from "../hooks/dependencies";
import { SubsidiaryHelmetValueResponse } from "../types/subsidiaryHelmetValueTypes";
import {
  SubsidiaryHelmetValueCreateSchemaType,
  subsidiaryHelmetValueCreateDefaultValues,
  subsidiaryHelmetValueCreateSchema,
} from "../validation/createSubsidiaryHelmetValue";
import {
  SubsidiaryHelmetValueFilterSchemaType,
  subsidiaryHelmetValueFilterDefaultValues,
  subsidiaryHelmetValueFilterSchema,
} from "../validation/filterSubsidiaryHelmetValue";
import {
  SubsidiaryHelmetValueUpdateSchemaType,
  subsidiaryHelmetValueUpdateDefaultValues,
  subsidiaryHelmetValueUpdateSchema,
} from "../validation/updateSubsidiaryHelmetValue";
import { SubsidiaryHelmetValueCreateForm } from "./SubsidiaryHelmetValueCreateForm";
import { SubsidiaryHelmetValueFilterForm } from "./SubsidiaryHelmetValueFilterForm";
import { SubsidiaryHelmetValueTable } from "./SubsidiaryHelmetValueTable";
import { SubsidiaryHelmetValueUpdateForm } from "./SubsidiaryHelmetValueUpdateForm";

export { SubsidiaryHelmetValue };

function SubsidiaryHelmetValue(): React.ReactElement {
  const { t } = useTranslation();
  const { id } = useParams();
  const addNotification = useNotification((state) => state.addNotification);

  const crud = useCrud<SubsidiaryHelmetValueResponse>();
  const subsidiaryHelmetValueQuery = useCrudQuery({
    apiFunction: getSubsidiaryHelmetValues,
    name: "subsidiaryHelmetValues",
    page: crud.page,
    search: crud.search,
    filters: crud.filters,
    keepPrevious: true,
    extras: { id: `${id}` },
  });
  const subsidiaryHelmetValues = subsidiaryHelmetValueQuery.data?.data ?? [];

  const subsidiaryHelmetValueCreateMutation = useCrudMutationF(
    createSubsidiaryHelmetValue,
    "subsidiaryHelmetValues",
    "update",
    {
      onSuccess: () => crud.setCreateModalOpen(false),
    },
  );

  const subsidiaryHelmetValueCreateForm = useForm({
    defaultValues:
      subsidiaryHelmetValueCreateDefaultValues as unknown as SubsidiaryHelmetValueCreateSchemaType,
    resolver: zodResolver(subsidiaryHelmetValueCreateSchema),
  });

  const [tire_model_id] = useWatch({
    control: subsidiaryHelmetValueCreateForm.control,
    name: ["tire_model_id"],
  });

  const dependencies = useSubsidiaryHelmetValueDependencies({
    model: `${tire_model_id}`,
  });

  const subsidiaryHelmetValueDeleteMutation = useCrudMutationF(
    deleteSubsidiaryHelmetValue,
    "subsidiaryHelmetValues",
    "delete",
  );

  function onDeletePress(
    subsidiaryHelmetValueResponse: SubsidiaryHelmetValueResponse,
  ) {
    addNotification({
      message: t("messages:delete.helmet_value"),
      action: {
        label: t("buttons:confirm"),
        onClick: async () => {
          subsidiaryHelmetValueDeleteMutation.mutate({
            id: `${id}`,
            extras: {
              id: subsidiaryHelmetValueResponse.tire_model_variation_helmet_id,
            },
          });
        },
      },
    });
  }

  const subsidiaryHelmetValueUpdateMutation = useCrudMutationF(
    updateSubsidiaryHelmetValue,
    "subsidiaryHelmetValues",
    "update",
    {
      onSuccess: () => crud.setUpdateModalOpen(false),
    },
  );

  const subsidiaryHelmetValueUpdateForm = useForm({
    defaultValues:
      subsidiaryHelmetValueUpdateDefaultValues as unknown as SubsidiaryHelmetValueUpdateSchemaType,
    resolver: zodResolver(subsidiaryHelmetValueUpdateSchema),
  });

  useEffect(() => {
    if (crud.current !== undefined) {
      const subsidiaryHelmetValue = crud.current;
      subsidiaryHelmetValueUpdateForm.setValue(
        "tire_model_id",
        subsidiaryHelmetValue.tire_model_variation.tire_model.tire_model_id,
      );
      subsidiaryHelmetValueUpdateForm.setValue(
        "tire_model_variation_id",
        subsidiaryHelmetValue.tire_model_variation_id,
      );
      subsidiaryHelmetValueUpdateForm.setValue(
        "helmet_value_original",
        subsidiaryHelmetValue.helmet_value_original,
      );
      subsidiaryHelmetValueUpdateForm.setValue(
        "helmet_value_revitalized",
        subsidiaryHelmetValue.helmet_value_revitalized,
      );
    }
  }, [crud.current]);

  useEffect(() => {
    if (crud.createModalOpen) {
      subsidiaryHelmetValueCreateForm.reset();
    }
  }, [crud.createModalOpen]);

  function onUpdatePress(subsidiaryHelmetValue: SubsidiaryHelmetValueResponse) {
    crud.setCurrent(subsidiaryHelmetValue);
    crud.setUpdateModalOpen(true);
  }

  const subsidiaryHelmetValueFilterForm = useForm({
    defaultValues: subsidiaryHelmetValueFilterDefaultValues,
    resolver: zodResolver(subsidiaryHelmetValueFilterSchema),
  });

  function onFilter(data: SubsidiaryHelmetValueFilterSchemaType) {
    const searchParams = new URLSearchParams();
    if (data.tire_model_variation) {
      searchParams.append("tire_model_variation", data.tire_model_variation);
    }
    if (data.tire_model) {
      searchParams.append("tire_model", data.tire_model);
    }
    crud.setFilters(searchParams);
  }

  return (
    <>
      <BaseCreateModal
        open={crud.createModalOpen}
        title={t("titles:new.helmet_value")}
        onClose={() => crud.setCreateModalOpen(false)}
        onConfirm={subsidiaryHelmetValueCreateForm.handleSubmit(
          async (data) => {
            subsidiaryHelmetValueCreateMutation.mutate({
              id: `${id}` as unknown as number,
              data: {
                tire_model_id: data.tire_model_id,
                tire_model_variation_id: data.tire_model_variation_id,
                helmet_value_original: data.helmet_value_original,
                helmet_value_revitalized: data.helmet_value_revitalized,
              },
              extras: undefined,
            });
          },
        )}
      >
        <SubsidiaryHelmetValueCreateForm
          form={subsidiaryHelmetValueCreateForm}
          dependencies={dependencies}
        />
      </BaseCreateModal>
      <BaseUpdateModal
        open={crud.updateModalOpen}
        title={t("titles:update.helmet_value")}
        onClose={() => crud.setUpdateModalOpen(false)}
        onConfirm={subsidiaryHelmetValueUpdateForm.handleSubmit(
          async (data) => {
            subsidiaryHelmetValueUpdateMutation.mutate({
              id: `${id}` as unknown as number,
              data: {
                helmetId: crud.current?.tire_model_variation_helmet_id,
                tire_model_id: data.tire_model_id,
                tire_model_variation_id: `${data.tire_model_variation_id}`,
                helmet_value_original: data.helmet_value_original,
                helmet_value_revitalized: data.helmet_value_revitalized,
              },
              extras: undefined,
            });
          },
        )}
      >
        <SubsidiaryHelmetValueUpdateForm
          form={subsidiaryHelmetValueUpdateForm}
          dependencies={dependencies}
        />
      </BaseUpdateModal>
      <BaseFilterModal
        open={crud.filterModalOpen}
        title={t("buttons:filter")}
        onClose={() => crud.setFilterModalOpen(false)}
        onConfirm={subsidiaryHelmetValueFilterForm.handleSubmit(
          async (data) => {
            onFilter(data);
          },
        )}
        onClear={() => {
          subsidiaryHelmetValueFilterForm.reset();
          crud.setFilters(new URLSearchParams());
        }}
      >
        <SubsidiaryHelmetValueFilterForm
          form={subsidiaryHelmetValueFilterForm}
          dependencies={dependencies}
        />
      </BaseFilterModal>
      <BaseContainer title={subsidiaryHelmetValues[0]?.subsidiary?.name}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          <SubsidiaryHelmetValueTable
            subsidiaryHelmetValues={subsidiaryHelmetValues}
            onUpdate={onUpdatePress}
            onDelete={onDeletePress}
          />
          <CustomPagination
            page={crud.page}
            onChange={(_event, page) => crud.setPage(page)}
            totalPages={subsidiaryHelmetValueQuery.data?.last_page ?? 1}
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
            </Stack>
          </Portal>
          <Portal elementId={"navTabs"}>
            <TabMenuSubsidiary pageId={4} id={id} />
          </Portal>
        </Container>
      </BaseContainer>
    </>
  );
}
