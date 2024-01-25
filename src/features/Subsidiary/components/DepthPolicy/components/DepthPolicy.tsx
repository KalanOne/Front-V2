import React, { useEffect, useState } from "react";

import FilterListIcon from "@mui/icons-material/FilterList";
import { Box, Button, Container, Grid, IconButton, Stack } from "@mui/material";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { BaseContainer } from "src/components/common/BaseContainer";
import { CustomPagination } from "src/components/common/CustomPagination";
import { Portal } from "src/components/common/Portal";
import { SearchInput } from "src/components/common/SearchInput";
import { BaseCreateModal } from "src/components/modal/BaseCreateModal";
import { BaseCustomModal } from "src/components/modal/BaseCustomModal";
import { BaseFilterModal } from "src/components/modal/BaseFilterModal";
import { BaseUpdateModal } from "src/components/modal/BaseUpdateModal";
import { useCrud, useCrudMutationF, useCrudQuery } from "src/hooks/crud";
import { useProgressQuery } from "src/hooks/progress";
import { useNotification } from "src/stores/general/notification";

import { getSubsidiary } from "../../ApplicationPolicy/api/policyApi";
import TabMenuSubsidiary from "../../TabMenuSubsidiary";
import {
  createPressurePolicy,
  deletePolicyDepth,
  getDepthPolicy,
  updateDataPolicyDepth,
} from "../api/depthPolicy";
import { useDataDependencies } from "../hooks/dependencies";
import { useVehicleTypeDependencies } from "../hooks/dependenciesVehicleType";
import { AxlePolicyDepth, Vehicle } from "../types/depthTypes";
import {
  depthPolicyCreateDefaultValues,
  depthPolicyCreateSchema,
} from "../validation/createDepthPolicy";
import {
  DepthPolicyFilterSchemaType,
  depthPolicyFilterDefaultValues,
  depthPolicyFilterSchema,
} from "../validation/filterDepthPolicy";
import {
  selectedVehiclesDepthDefaultValues,
  selectedVehiclesDepthSchema,
} from "../validation/selectedVehiclesDepth";
import {
  depthPolicyUpdateDefaultValues,
  depthPolicyUpdateSchema,
} from "../validation/updateDepthPolicy";
import { DepthPolicyCreateForm } from "./DepthPolicyCreateForm";
import { DepthPolicyCreateMultipleForm } from "./DepthPolicyCreateMultiple";
import DepthPolicyFilterForm from "./DepthPolicyFilterForm";
import { DepthPolicyTable } from "./DepthPolicyTable";
import { DepthPolicyUpdateForm } from "./DepthPolicyUpdateForm";

export { DepthPolicy };

function DepthPolicy(): React.ReactElement {
  const { t } = useTranslation();
  const { id } = useParams();
  const [createItem, setCreateItem] = useState<any>(undefined);
  const [currentPolicy, setCurrentPolicy] = useState<any>(undefined);
  const [vehicle, setVehicle] = useState([]);
  const [customModalOpen, setCustomModalOpen] = useState({
    selectedVehicles: false,
  });
  const addNotification = useNotification((state) => state.addNotification);

  const subsidiaryQuery = useQuery({
    queryKey: ["subsidiary"],
    queryFn: async () => {
      return await getSubsidiary({
        id: `${id}`,
        params: {},
        extras: undefined,
      });
    },
  });
  const subsidiary = subsidiaryQuery.data ?? undefined;
  useProgressQuery(subsidiaryQuery, "subsidiary");

  const crud = useCrud<any>();
  const depthQuery = useCrudQuery({
    apiFunction: getDepthPolicy,
    name: "depth",
    page: crud.page,
    search: crud.search,
    filters: crud.filters,
    keepPrevious: true,
    extras: { id: `${id}` },
  });
  const depth = depthQuery.data?.data ?? [];

  const depthPolicyMutation = useCrudMutationF(
    createPressurePolicy,
    "depth",
    "create",
  );
  const updateDepthPolicyMutation = useCrudMutationF(
    updateDataPolicyDepth,
    "depth",
    "update",
  );
  const deletePolicyMutation = useCrudMutationF(
    deletePolicyDepth,
    "depth",
    "delete",
  );

  const depthCreateForm = useForm({
    defaultValues: depthPolicyCreateDefaultValues,
    resolver: zodResolver(depthPolicyCreateSchema),
  });

  const depthUpdateForm = useForm({
    defaultValues: depthPolicyUpdateDefaultValues,
    resolver: zodResolver(depthPolicyUpdateSchema),
  });

  const selectedVehiclesForm = useForm({
    defaultValues: selectedVehiclesDepthDefaultValues,
    resolver: zodResolver(selectedVehiclesDepthSchema),
  });

  const selectedVehiclesArrayForm = useFieldArray({
    control: selectedVehiclesForm.control,
    name: "depth",
  });

  const filterForm = useForm({
    defaultValues: depthPolicyFilterDefaultValues,
    resolver: zodResolver(depthPolicyFilterSchema),
  });

  function onCreatePress(vehicle: any) {
    setCreateItem(vehicle);
    crud.setCreateModalOpen(true);
  }

  function onUpdatePress(vehicle: any, policy: any) {
    setCurrentPolicy(policy);
    crud.setCurrent(vehicle);
    crud.setUpdateModalOpen(true);
  }

  function onVehiclePress(vehicle: any) {
    setVehicle(vehicle);
  }

  function onDeletePress(policy: any, vehicle: any) {
    addNotification({
      message: t("messages:delete.depth_policy"),
      action: {
        label: "Eliminar",
        onClick: async () => {
          deletePolicyMutation.mutate({
            id: id ? parseInt(id) : 0,
            extras: {
              id2: vehicle.vehicle_id,
              id3: policy.vehicle_depth_policy_id,
            },
          });
        },
      },
    });
  }

  function onFilter(data: DepthPolicyFilterSchemaType) {
    const searchParams = new URLSearchParams();
    if (data.vehicle_type.length > 0) {
      searchParams.append("vehicle_type", data.vehicle_type.join(","));
    }
    if (data.axle_type) {
      searchParams.append("axle_type", data.axle_type);
    }

    crud.setFilters(searchParams);
  }

  const dependencies = useDataDependencies({
    subsidiary_id: crud.current?.subsidiary_id ?? "",
    vehicle_id: crud.current?.vehicle_id ?? "",
    vehicle_depth_policy_id: currentPolicy?.vehicle_depth_policy_id ?? "",
  });

  const dependenciesVehicle = useVehicleTypeDependencies();

  useEffect(() => {
    if (crud.createModalOpen) {
      depthCreateForm.reset();
      depthCreateForm.setValue("economic_number", createItem.economic_number);
    }
  }, [crud.createModalOpen]);

  useEffect(() => {
    if (crud.updateModalOpen) {
      depthUpdateForm.reset();
    }
  }, [crud.updateModalOpen]);

  useEffect(() => {
    if (dependencies.updateData) {
      if (crud.updateModalOpen) {
        depthUpdateForm.setValue(
          "economic_number",
          dependencies.updateData.vehicle.economic_number,
        );
        depthUpdateForm.setValue(
          "axle_type",
          dependencies.updateData.axle_type,
        );
        depthUpdateForm.setValue(
          "critical_withdrawal",
          dependencies.updateData.critical_withdrawal,
        );
        depthUpdateForm.setValue(
          "good_depth",
          dependencies.updateData.good_depth,
        );
        depthUpdateForm.setValue(
          "scheduled_withdrawal",
          dependencies.updateData.scheduled_withdrawal,
        );
      }
    }
  }, [dependencies.updateData]);

  useEffect(() => {
    if (customModalOpen.selectedVehicles) {
      selectedVehiclesForm.reset();
      selectedVehiclesArrayForm.replace([]);
      selectedVehiclesArrayForm.append({
        axle_type: "",
        critical_withdrawal: 0,
        good_depth: 0,
        scheduled_withdrawal: 0,
      });
    } else {
      selectedVehiclesArrayForm.replace([]);
    }
  }, [customModalOpen.selectedVehicles]);

  return (
    <>
      <BaseFilterModal
        open={crud.filterModalOpen}
        title={t("general:filter")}
        onClose={() => crud.setFilterModalOpen(false)}
        onConfirm={filterForm.handleSubmit(
          async (data) => {
            onFilter(data);
          },
          // (d) => console.log(d),
        )}
        onClear={() => {
          filterForm.reset();
          crud.setFilters(new URLSearchParams());
        }}
      >
        <DepthPolicyFilterForm
          form={filterForm}
          dependencies={dependenciesVehicle}
        />
      </BaseFilterModal>
      <BaseCustomModal
        open={customModalOpen.selectedVehicles}
        size="sm"
        title={t("titles:new.policy")}
        onClose={() => {
          setCustomModalOpen((prevState) => ({
            ...prevState,
            selectedVehicles: false,
          }));
        }}
        onConfirm={() => {
          selectedVehiclesForm.handleSubmit(async (data) => {
            const vehicles: Vehicle[] = [];
            vehicle.map((item: any) => {
              const vehicleData = {
                vehicle_id: item,
              };
              vehicles.push(vehicleData);
            });
            depthPolicyMutation.mutate({
              data: {
                axle_policy: data.depth,
                vehicles: vehicles,
              },
              extras: {
                id: id ? parseInt(id) : 0,
              },
            });

            setCustomModalOpen((prevState) => ({
              ...prevState,
              selectedVehicles: false,
            }));
          })();
        }}
      >
        <DepthPolicyCreateMultipleForm
          form={selectedVehiclesForm}
          arrayForm={selectedVehiclesArrayForm}
        />
      </BaseCustomModal>
      <BaseCreateModal
        open={crud.createModalOpen}
        title={t("titles:new.policy")}
        onClose={() => crud.setCreateModalOpen(false)}
        onConfirm={depthCreateForm.handleSubmit(async (data) => {
          const axle: AxlePolicyDepth[] = [];
          const axleData = {
            axle_type: data.axle_type,
            critical_withdrawal: data.critical_withdrawal,
            good_depth: data.good_depth,
            scheduled_withdrawal: data.scheduled_withdrawal,
          };
          axle.push(axleData);

          const vehicles: Vehicle[] = [];
          const vehicleData = {
            vehicle_id: createItem.vehicle_id,
          };
          vehicles.push(vehicleData);

          // console.log(vehicles);
          // console.log(axle);

          depthPolicyMutation.mutate({
            data: {
              axle_policy: axle,
              vehicles: vehicles,
            },
            extras: {
              id: id ? parseInt(id) : 0,
            },
          });

          crud.setCreateModalOpen(false);
        })}
      >
        <DepthPolicyCreateForm form={depthCreateForm} />
      </BaseCreateModal>
      <BaseUpdateModal
        open={crud.updateModalOpen}
        title={t("titles:update.policy")}
        onClose={() => crud.setUpdateModalOpen(false)}
        onConfirm={() => {
          depthUpdateForm.handleSubmit((data) => {
            // console.log(data);
            updateDepthPolicyMutation.mutate({
              id: id ? parseInt(id) : 0,
              data: {
                axle_type: data.axle_type,
                critical_withdrawal: data.critical_withdrawal,
                good_depth: data.good_depth,
                scheduled_withdrawal: data.scheduled_withdrawal,
                vehicle_id: crud.current?.vehicle_id ?? 0,
              },
              extras: {
                id: currentPolicy?.vehicle_depth_policy_id ?? "",
              },
            });
            crud.setUpdateModalOpen(false);
          })();
        }}
      >
        <DepthPolicyUpdateForm form={depthUpdateForm} />
      </BaseUpdateModal>
      <BaseContainer title={subsidiary ? subsidiary.name : ""}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          <Grid container>
            <Grid item xs={12}>
              {vehicle.length > 0 && (
                <Button
                  sx={{
                    alignSelf: "center",
                    backgroundColor: "#536DFE",
                    border: "none",
                    color: "white",
                    fontSize: "0.875rem",
                    fontWeight: "bold",
                    px: 2,
                    my: 2,
                    "&:hover": {
                      backgroundColor: "#3A4CB1",
                    },
                  }}
                  onClick={() => {
                    setCustomModalOpen((prevState) => ({
                      ...prevState,
                      selectedVehicles: true,
                    }));
                  }}
                >
                  Establecer
                </Button>
              )}
            </Grid>
          </Grid>

          <DepthPolicyTable
            depth={depth}
            onCreatePress={onCreatePress}
            onUpdatePress={onUpdatePress}
            onVehiclePress={onVehiclePress}
            onDeletePress={onDeletePress}
          />
          <CustomPagination
            page={crud.page}
            onChange={(_event, page) => crud.setPage(page)}
            totalPages={depthQuery.data?.last_page ?? 1}
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
          <Portal elementId={"navbarPortal"}>
            <Box>
              <Portal elementId={"navTabs"}>
                <TabMenuSubsidiary pageId={3} id={id} />
              </Portal>
            </Box>
          </Portal>
        </Container>
      </BaseContainer>
    </>
  );
}
