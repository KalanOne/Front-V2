import React, { useEffect, useState } from "react";

import FilterListIcon from "@mui/icons-material/FilterList";
import { Button, Container, Grid, IconButton, Stack } from "@mui/material";

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
  createPressurePolicyType,
  deletePolicy,
  getPressurePolicy,
  updateDataPolicy,
} from "../api/pressureApi";
import { useDataDependencies } from "../hooks/dependencies";
import { useVehicleTypeDependencies } from "../hooks/dependenciesVehicleType";
import { AxlePolicy, Vehicle } from "../types/pressureTypes";
import {
  pressurePolicyCreateDefaultValues,
  pressurePolicyCreateSchema,
} from "../validation/createPressurePolicy";
import {
  vehicleTypePolicyCreateDefaultValues,
  vehicleTypePolicyCreateSchema,
} from "../validation/createVehicleTypePolicy";
import {
  PressurePolicyFilterSchemaType,
  pressurePolicyFilterDefaultValues,
  pressurePolicyFilterSchema,
} from "../validation/filterPressurePolicy";
import {
  selectedVehiclesDefaultValues,
  selectedVehiclesSchema,
} from "../validation/selectedVehicles";
import {
  pressurePolicyUpdateDefaultValues,
  pressurePolicyUpdateSchema,
} from "../validation/updatePressurePolicy";
import { PressurePolicyCreateForm } from "./PressurePolicyCreatForm";
import { PressurePolicyCreateMultipleForm } from "./PressurePolicyCreateMultipleForm";
import PressurePolicyFilterForm from "./PressurePolicyFilterForm";
import { PressurePolicyTable } from "./PressurePolicyTable";
import { PressurePolicyUpdateForm } from "./PressurePolicyUpdateForm";
import { PressurePolicyVehicleTypeForm } from "./PressurePolicyVehicleTypeForm";

export { PressurePolicy };

function PressurePolicy(): React.ReactElement {
  const { t } = useTranslation();
  const { id } = useParams();
  const [createItem, setCreateItem] = useState<any>(undefined);
  const [currentPolicy, setCurrentPolicy] = useState<any>(undefined);
  const [vehicle, setVehicle] = useState([]);
  const [customModalOpen, setCustomModalOpen] = useState({
    vehicleType: false,
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
  const pressureQuery = useCrudQuery({
    apiFunction: getPressurePolicy,
    name: "pressure",
    page: crud.page,
    search: crud.search,
    filters: crud.filters,
    keepPrevious: true,
    extras: { id: `${id}` },
  });
  const pressure = pressureQuery.data?.data ?? [];

  const pressurePolicyMutation = useCrudMutationF(
    createPressurePolicy,
    "pressure",
    "create",
  );
  const updatePressurePolicyMutation = useCrudMutationF(
    updateDataPolicy,
    "pressure",
    "update",
  );
  const deletePolicyMutation = useCrudMutationF(
    deletePolicy,
    "pressure",
    "delete",
  );

  const pressurePolicyVehicleMutation = useCrudMutationF(
    createPressurePolicyType,
    "pressure",
    "create",
  );

  const pressureCreateForm = useForm({
    defaultValues: pressurePolicyCreateDefaultValues,
    resolver: zodResolver(pressurePolicyCreateSchema),
  });

  const pressureUpdateForm = useForm({
    defaultValues: pressurePolicyUpdateDefaultValues,
    resolver: zodResolver(pressurePolicyUpdateSchema),
  });

  const vehicleTypeForm = useForm({
    defaultValues: vehicleTypePolicyCreateDefaultValues,
    resolver: zodResolver(vehicleTypePolicyCreateSchema),
  });

  const selectedVehiclesForm = useForm({
    defaultValues: selectedVehiclesDefaultValues,
    resolver: zodResolver(selectedVehiclesSchema),
  });

  const selectedVehiclesArrayForm = useFieldArray({
    control: selectedVehiclesForm.control,
    name: "policies",
  });

  const filterPressurePolicyForm = useForm({
    defaultValues: pressurePolicyFilterDefaultValues,
    resolver: zodResolver(pressurePolicyFilterSchema),
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
      message: t("messages:delete.pressure_policy"),
      action: {
        label: "Eliminar",
        onClick: async () => {
          deletePolicyMutation.mutate({
            id: id ? parseInt(id) : 0,
            extras: {
              id2: vehicle.vehicle_id,
              id3: policy.vehicle_pressure_policy_id,
            },
          });
        },
      },
    });
  }

  function onFilter(data: PressurePolicyFilterSchemaType) {
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
    vehicle_pressure_policy_id: currentPolicy?.vehicle_pressure_policy_id ?? "",
  });

  const dependenciesVehicle = useVehicleTypeDependencies();

  useEffect(() => {
    if (crud.createModalOpen) {
      pressureCreateForm.reset();
      pressureCreateForm.setValue(
        "economic_number",
        createItem.economic_number,
      );
    }
  }, [crud.createModalOpen]);

  useEffect(() => {
    if (crud.updateModalOpen) {
      pressureUpdateForm.reset();
    }
  }, [crud.updateModalOpen]);

  useEffect(() => {
    if (dependencies.updateData) {
      if (crud.updateModalOpen) {
        pressureUpdateForm.setValue(
          "economic_number",
          dependencies.updateData.vehicle.economic_number,
        );
        pressureUpdateForm.setValue(
          "axle_type",
          dependencies.updateData.axle_type,
        );
        pressureUpdateForm.setValue(
          "recommended_pressure",
          dependencies.updateData.recommended_pressure,
        );
        pressureUpdateForm.setValue(
          "tolerance",
          dependencies.updateData.tolerance,
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
        recommended_pressure: 0,
        tolerance: 0,
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
        onConfirm={filterPressurePolicyForm.handleSubmit(
          async (data) => {
            onFilter(data);
          },
          // (d) => console.log(d),
        )}
        onClear={() => {
          filterPressurePolicyForm.reset();
          crud.setFilters(new URLSearchParams());
        }}
      >
        <PressurePolicyFilterForm
          form={filterPressurePolicyForm}
          dependencies={dependenciesVehicle}
        />
      </BaseFilterModal>
      <BaseCustomModal
        open={customModalOpen.vehicleType}
        size="sm"
        title={t("titles:new.policy")}
        onClose={() => {
          setCustomModalOpen((prevState) => ({
            ...prevState,
            vehicleType: false,
          }));
        }}
        onConfirm={() => {
          vehicleTypeForm.handleSubmit(async (data) => {
            const axle: AxlePolicy[] = [];
            const axleData = {
              axle_type: data.axle_type,
              recommended_pressure: data.recommended_pressure,
              tolerance: data.tolerance,
            };
            axle.push(axleData);
            pressurePolicyVehicleMutation.mutate({
              data: {
                axle_policy: axle,
                vehicle_type_id: data.vehicle_type_id,
              },
              extras: {
                id: id ? parseInt(id) : 0,
              },
            });
            setCustomModalOpen((prevState) => ({
              ...prevState,
              vehicleType: false,
            }));
          })();
        }}
      >
        <PressurePolicyVehicleTypeForm
          form={vehicleTypeForm}
          dependencies={dependenciesVehicle}
        />
      </BaseCustomModal>
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
            pressurePolicyMutation.mutate({
              data: {
                axle_policy: data.policies,
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
        <PressurePolicyCreateMultipleForm
          form={selectedVehiclesForm}
          arrayForm={selectedVehiclesArrayForm}
        />
      </BaseCustomModal>
      <BaseCreateModal
        open={crud.createModalOpen}
        title={t("titles:new.policy")}
        onClose={() => crud.setCreateModalOpen(false)}
        onConfirm={pressureCreateForm.handleSubmit(async (data) => {
          // console.log(data);
          const axle: AxlePolicy[] = [];
          const axleData = {
            axle_type: data.axle_type,
            recommended_pressure: data.recommended_pressure,
            tolerance: data.tolerance,
          };
          axle.push(axleData);

          const vehicles: Vehicle[] = [];
          const vehicleData = {
            vehicle_id: createItem.vehicle_id,
          };
          vehicles.push(vehicleData);

          pressurePolicyMutation.mutate({
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
        <PressurePolicyCreateForm form={pressureCreateForm} />
      </BaseCreateModal>
      <BaseUpdateModal
        open={crud.updateModalOpen}
        title={t("titles:update.policy")}
        onClose={() => crud.setUpdateModalOpen(false)}
        onConfirm={() => {
          pressureUpdateForm.handleSubmit((data) => {
            updatePressurePolicyMutation.mutate({
              id: id ? parseInt(id) : 0,
              data: {
                axle_type: data.axle_type,
                recommended_pressure: data.recommended_pressure,
                tolerance: data.tolerance,
                vehicle_id: crud.current?.vehicle_id ?? 0,
              },
              extras: {
                id: currentPolicy?.vehicle_pressure_policy_id ?? "",
              },
            });
            crud.setUpdateModalOpen(false);
          })();
        }}
      >
        <PressurePolicyUpdateForm form={pressureUpdateForm} />
      </BaseUpdateModal>
      <BaseContainer title={subsidiary ? subsidiary.name : ""}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          <Grid container>
            <Grid item xs={12}>
              <Button
                sx={{
                  alignSelf: "center",
                  backgroundColor: "#536DFE",
                  border: "none",
                  color: "white",
                  fontSize: "0.875rem",
                  fontWeight: "bold",
                  px: 2,
                  my: vehicle.length > 0 ? 0 : 2,
                  "&:hover": {
                    backgroundColor: "#3A4CB1",
                  },
                }}
                onClick={() => {
                  setCustomModalOpen((prevState) => ({
                    ...prevState,
                    vehicleType: true,
                  }));
                }}
              >
                REGISTRO POR TIPO DE VEHÍCULO
              </Button>
            </Grid>
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

          <PressurePolicyTable
            pressure={pressure}
            onCreatePress={onCreatePress}
            onUpdatePress={onUpdatePress}
            onVehiclePress={onVehiclePress}
            onDeletePress={onDeletePress}
          />
          <CustomPagination
            page={crud.page}
            onChange={(_event, page) => crud.setPage(page)}
            totalPages={pressureQuery.data?.last_page ?? 1}
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
          <Portal elementId={"navTabs"}>
            <TabMenuSubsidiary pageId={2} id={id} />
          </Portal>
        </Container>
      </BaseContainer>
    </>
  );
}
