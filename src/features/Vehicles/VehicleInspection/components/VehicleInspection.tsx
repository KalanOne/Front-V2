import { useEffect, useState } from "react";

import { Box, Container, Grid, Stack } from "@mui/material";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";

import { BaseContainer } from "src/components/common/BaseContainer";
import { CustomButton } from "src/components/common/CustomButton";
import { Portal } from "src/components/common/Portal";
import { SearchInput } from "src/components/common/SearchInput";
import { BaseCustomModal } from "src/components/modal/BaseCustomModal";
import { BaseUpdateModal } from "src/components/modal/BaseUpdateModal";
import {
  updateTireReviewButtonDefaultValues,
  updateTireReviewButtonSchema,
} from "src/features/Tire/Tire/validation/updateTireReview";
import {
  useCrudCustomMutation,
  useCrudDeleteMutation,
  useCrudUpdateMutation,
} from "src/hooks/crud";
import { useProgressQuery } from "src/hooks/progress";
import { useNotification } from "src/stores/general/notification";
import { removeNull } from "src/utils/object";

import {
  getAxle,
  getReviewVehicle,
} from "../../VehicleTirePressure/api/vehicleTirePressureApi";
import {
  createTireReview,
  damageTireReview,
  deleteVehicleReview,
  finalizeVehicleReview,
  getVehicles,
  pathDamageTireReview,
  physicalDifferenceUpdate,
  startVehicleReview,
  updateVehicleReview,
  wearTireReview,
} from "../api/vehicleInspectionApi";
import {
  PathdamageUpdateData,
  PhysicalDifferenceUpdateData,
  StartReviewData,
} from "../types/vehicleInspectionTypes";
import {
  damageButtonDefaultValues,
  damageButtonSchema,
} from "../validation/damageButton";
import {
  pathDamageButtonDefaultValues,
  pathDamageButtonSchema,
} from "../validation/pathDamageButton";
import {
  physicalDifferenceDefaultValues,
  physicalDifferenceSchema,
} from "../validation/physicalDifference";
import {
  UpdateVehicleReviewSchemaType,
  updateVehicleReviewDefaultValues,
  updateVehicleReviewSchema,
} from "../validation/updateVehicleReview";
import {
  wearButtonDefaultValues,
  wearButtonSchema,
} from "../validation/wearButton";
import { ChassisCard } from "./ChassisPreview/ChassisCard";
import { PathDamageButtonForm } from "./PathDamageButtonForm";
import { TireDialog } from "./TireDialog";
import { VehicleInspectionDamage } from "./VehicleInspectionDamage";
import { VehicleInspectionInfoBox } from "./VehicleInspectionInfoBox";
import { VehicleInspectionPhysicalForm } from "./VehicleInspectionPhysicalForm";
import { VehicleInspectionReviewDialog } from "./VehicleInspectionReviewDialog";
import { VehicleInspectionReviewUpdateForm } from "./VehicleInspectionReviewUpdateForm";
import { WearButtonForm } from "./WearButtonForm";

export { VehicleInspection };

function VehicleInspection() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const addNotification = useNotification((state) => state.addNotification);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const [physicalDifferenceDialogOpen, setPhysicalDifferenceDialogOpen] =
    useState(false);
  const [infoTireDialogItem, setInfoTireDialogItem] = useState<any>();
  const [buttonsModalOpen, setButtonsModalOpen] = useState({
    revitalized: false,
    repair: false,
    discard: false,
    damage: false,
    sendToWareHouse: false,
    sendToWareHouseRepair: false,
    updateTireReview: false,
    wear: false,
    pathDamage: false,
  });
  // const [tireReviewId, setTireReviewId] = useState("");
  // const [reviewId, setReviewId] = useState("");

  const vehicleQuery = useQuery({
    queryKey: ["vehicle"],
    queryFn: async () => {
      return await getVehicles({
        status: 1,
        scope: "vehicle_id,economic_number,status",
        order: "DESC",
      });
    },
  });
  const vehicles = vehicleQuery.data ?? [];
  useProgressQuery(vehicleQuery, "vehicle");

  const reviewQuery = useQuery({
    queryKey: ["review"],
    queryFn: async () => {
      return await getReviewVehicle({ params: {}, extras: { id: `${id}` } });
    },
  });
  const review = reviewQuery.data ?? undefined;
  useProgressQuery(reviewQuery, "review");
  // console.log("review", review);

  const axlesQuery = useQuery({
    queryKey: ["axles"],
    queryFn: async () => {
      return await getAxle({ params: {}, extras: { id: `${id}` } });
    },
  });
  const axles = axlesQuery.data ?? undefined;
  useProgressQuery(axlesQuery, "axles");

  const startVehicleReviewMutation = useCrudCustomMutation(
    startVehicleReview,
    "review",
    "startVehicleReview",
  );

  function onStartVehicleReviewPress(data: StartReviewData) {
    startVehicleReviewMutation.mutate({
      id: `${id}` as unknown as number,
      ...data,
    });
  }

  const vehicleReviewDeleteMutation = useCrudDeleteMutation(
    deleteVehicleReview,
    "review",
  );

  function onVehicleReviewDeletePress() {
    vehicleReviewDeleteMutation.mutate(`${id}`);
  }

  const updateVehicleReviewMutation = useCrudCustomMutation(
    updateVehicleReview,
    "review",
    "updateVehicleReview",
  );

  const updateVehicleReviewForm = useForm({
    defaultValues:
      updateVehicleReviewDefaultValues as unknown as UpdateVehicleReviewSchemaType,
    resolver: zodResolver(updateVehicleReviewSchema),
  });

  function onVehicleReviewUpdatePress() {
    setUpdateModalOpen(true);
    updateVehicleReviewForm.setValue("date", review?.date);
    updateVehicleReviewForm.setValue("observation", review?.observation ?? "");
    updateVehicleReviewForm.setValue("odometer", review?.odometer);
  }

  const vehicleReviewFinalizeMutation = useCrudDeleteMutation(
    finalizeVehicleReview,
    "review",
  );

  const updateTireReviewMutation = useCrudUpdateMutation(
    createTireReview,
    "tires",
    {
      onSuccess: () =>
        setButtonsModalOpen((prevState) => ({
          ...prevState,
          updateTireReview: false,
        })),
    },
  );

  function onVehicleReviewFinalizePress() {
    vehicleReviewFinalizeMutation.mutate(`${id}`);
  }

  const updateTireReviewForm = useForm({
    defaultValues: updateTireReviewButtonDefaultValues,
    resolver: zodResolver(updateTireReviewButtonSchema),
  });
  const updateTireReviewArrayForm = useFieldArray({
    control: updateTireReviewForm.control,
    name: "depth",
  });
  // function getTireReviewId(id: string) {
  //   setTireReviewId(id);
  // }
  // const updateTireReviewDependencies = useUpdateTireReviewDependencies({
  //   movement_tire_id: reviewId,
  // });
  function onUpdateTireReviewPress(tire: any) {
    setInfoDialogOpen(false);
    setButtonsModalOpen((prevState) => ({
      ...prevState,
      updateTireReview: true,
    }));
    setInfoTireDialogItem(tire);
    // setReviewId(
    //   infoTireDialogItem
    //     ? infoTireDialogItem.cycle.movement_tire.movement_tire_id.toString()
    //     : "",
    // );
  }
  useEffect(() => {
    if (buttonsModalOpen.updateTireReview) {
      updateTireReviewForm.reset();
    }
  }, [buttonsModalOpen.updateTireReview]);
  // console.log("axles", axles);

  // Damage Button
  const damageButtonForm = useForm({
    defaultValues: damageButtonDefaultValues,
    resolver: zodResolver(damageButtonSchema),
  });
  const damageButtonArray2Form = useFieldArray({
    control: damageButtonForm.control,
    name: "damages",
  });
  const tireButtonMutation = useCrudUpdateMutation(
    damageTireReview,
    "axles",
    {},
  );

  // Wear Button
  const wearButtonForm = useForm({
    defaultValues: wearButtonDefaultValues,
    resolver: zodResolver(wearButtonSchema),
  });
  const wearButtonArrayForm = useFieldArray({
    control: wearButtonForm.control,
    name: "wears",
  });
  const tireWearButtonMutation = useCrudUpdateMutation(
    wearTireReview,
    "axles",
    {},
  );

  // Path Damage Button
  const pathDamageButtonForm = useForm({
    defaultValues: pathDamageButtonDefaultValues,
    resolver: zodResolver(pathDamageButtonSchema),
  });
  const pathDamageButtonArrayForm = useFieldArray({
    control: pathDamageButtonForm.control,
    name: "damages",
  });
  const tirePathDamageButtonMutation = useCrudUpdateMutation(
    pathDamageTireReview,
    "axles",
    {},
  );

  // Physically Button
  const physicallyButtonForm = useForm({
    defaultValues: physicalDifferenceDefaultValues,
    resolver: zodResolver(physicalDifferenceSchema),
  });

  const physicallyButtonMutation = useCrudUpdateMutation(
    physicalDifferenceUpdate,
    "axles",
    {},
  );

  useEffect(() => {
    if (buttonsModalOpen.revitalized) {
      damageButtonForm.reset();
    }
  }, [buttonsModalOpen.revitalized]);

  useEffect(() => {
    if (buttonsModalOpen.wear) {
      wearButtonForm.reset();
    }
  }, [buttonsModalOpen.wear]);

  function onRevitalizedPress(tire: any) {
    setInfoDialogOpen(false);
    setButtonsModalOpen((prevState) => ({
      ...prevState,
      revitalized: true,
    }));
    setInfoTireDialogItem(tire);
  }
  function onWearPress(tire: any) {
    setInfoDialogOpen(false);
    setButtonsModalOpen((prevState) => ({
      ...prevState,
      wear: true,
    }));
    setInfoTireDialogItem(tire);
  }
  function onPathDamagePress(tire: any) {
    setInfoDialogOpen(false);
    setButtonsModalOpen((prevState) => ({
      ...prevState,
      pathDamage: true,
    }));
    setInfoTireDialogItem(tire);
  }

  useEffect(() => {
    if (tireButtonMutation.isSuccess) {
      setButtonsModalOpen((prevState) => ({
        ...prevState,
        revitalized: false,
      }));
    }
  }, [tireButtonMutation.isSuccess]);

  useEffect(() => {
    if (tireWearButtonMutation.isSuccess) {
      setButtonsModalOpen((prevState) => ({
        ...prevState,
        wear: false,
      }));
    }
  }, [tireWearButtonMutation.isSuccess]);

  useEffect(() => {
    if (tirePathDamageButtonMutation.isSuccess) {
      setButtonsModalOpen((prevState) => ({
        ...prevState,
        pathDamage: false,
      }));
    }
  }, [tirePathDamageButtonMutation.isSuccess]);

  return (
    <>
      <BaseUpdateModal
        open={updateModalOpen}
        title={t("titles:update.vehicle_review")}
        onClose={() => setUpdateModalOpen(false)}
        onConfirm={updateVehicleReviewForm.handleSubmit(async (data) => {
          updateVehicleReviewMutation.mutate({
            id: `${id}` as unknown as number,
            ...data,
          });
        })}
      >
        <VehicleInspectionReviewUpdateForm form={updateVehicleReviewForm} />
      </BaseUpdateModal>
      <BaseCustomModal
        open={infoDialogOpen}
        title={t("general:tire")}
        onClose={() => setInfoDialogOpen(false)}
      >
        <TireDialog
          tire={infoTireDialogItem}
          review={review}
          onPhysicalDifference={(vehicleItem) => {
            setPhysicalDifferenceDialogOpen(true);
            setInfoDialogOpen(false);
            setInfoTireDialogItem(vehicleItem);
          }}
          onUpdateTireReviewPress={onUpdateTireReviewPress}
          onRevitalizedPress={onRevitalizedPress}
          onWearPress={onWearPress}
          onPathDamagePress={onPathDamagePress}
        />
      </BaseCustomModal>
      <BaseCustomModal
        open={physicalDifferenceDialogOpen}
        title={"Indique el neumático montado físicamente"}
        onClose={() => setPhysicalDifferenceDialogOpen(false)}
        onConfirm={() => {
          physicallyButtonForm.handleSubmit(async (data) => {
            let newData: PhysicalDifferenceUpdateData;

            if (data.type === "code") {
              newData = {
                id: infoTireDialogItem?.cycle.movement_tire.movement_tire_id,
                code: data.code,
                required: 1,
                vehicle_type_axle_tire_id:
                  infoTireDialogItem?.cycle.movement_tire.vehicle_tire[0]
                    .vehicle_type_axle_tire_id,
              };
            } else {
              newData = {
                id: infoTireDialogItem?.cycle.movement_tire.movement_tire_id,
                device_code: data.device_code,
                required: 1,
                vehicle_type_axle_tire_id:
                  infoTireDialogItem?.cycle.movement_tire.vehicle_tire[0]
                    .vehicle_type_axle_tire_id,
              };
            }

            physicallyButtonMutation.mutate(newData);
          })();
        }}
      >
        <VehicleInspectionPhysicalForm form={physicallyButtonForm} />
      </BaseCustomModal>
      <BaseCustomModal
        open={buttonsModalOpen.updateTireReview}
        size="sm"
        title={t("titles:new.tire_review")}
        onClose={() => {
          setButtonsModalOpen((prevState) => ({
            ...prevState,
            updateTireReview: false,
          }));
        }}
        onConfirm={() => {
          updateTireReviewForm.handleSubmit(async (data) => {
            updateTireReviewMutation.mutate({
              id: infoTireDialogItem
                ? infoTireDialogItem.cycle.movement_tire.movement_tire_id
                : "",
              // tire_review_id: tireReviewId,
              pressure: data.pressure,
              comment: data.comment,
              depth: data.depth,
            });
          })();
        }}
      >
        <VehicleInspectionReviewDialog
          form={updateTireReviewForm}
          tire={infoTireDialogItem}
          updateTireReviewArrayForm={updateTireReviewArrayForm}
        />
      </BaseCustomModal>
      <BaseCustomModal
        open={buttonsModalOpen.revitalized}
        size="sm"
        title={`${t("labels:tire.singular")} ${
          infoTireDialogItem?.code || infoTireDialogItem?.device_code
        }`}
        onClose={() => {
          setButtonsModalOpen((prevState) => ({
            ...prevState,
            revitalized: false,
          }));
        }}
        onConfirm={() => {
          damageButtonForm.handleSubmit(async (data) => {
            tireButtonMutation.mutate({
              id: infoTireDialogItem?.cycle.movement_tire.movement_tire_id,
              damages: data.damages.map((damage) => removeNull(damage)),
            });
            // setButtonsModalOpen((prevState) => ({
            //   ...prevState,
            //   revitalized: false,
            // }));
          })();
        }}
      >
        <VehicleInspectionDamage
          form={damageButtonForm}
          tire={infoTireDialogItem}
          revitalizedButtonArray2Form={damageButtonArray2Form}
        />
      </BaseCustomModal>
      <BaseCustomModal
        open={buttonsModalOpen.wear}
        size="sm"
        title={t("general:tire")}
        onClose={() => {
          setButtonsModalOpen((prevState) => ({
            ...prevState,
            wear: false,
          }));
        }}
        onConfirm={() => {
          wearButtonForm.handleSubmit(async (data) => {
            tireWearButtonMutation.mutate({
              id: infoTireDialogItem?.cycle.movement_tire.movement_tire_id,
              wears: data.wears.map((wear) => removeNull(wear)),
            });
            // setButtonsModalOpen((prevState) => ({
            //   ...prevState,
            //   wear: false,
            // }));
          })();
        }}
      >
        <WearButtonForm
          form={wearButtonForm}
          tire={infoTireDialogItem}
          revitalizedButtonArrayForm={wearButtonArrayForm}
        />
      </BaseCustomModal>

      <BaseCustomModal
        open={buttonsModalOpen.pathDamage}
        size="sm"
        title={t("general:tire")}
        onClose={() => {
          setButtonsModalOpen((prevState) => ({
            ...prevState,
            pathDamage: false,
          }));
        }}
        onConfirm={() => {
          pathDamageButtonForm.handleSubmit(async (data) => {
            const newData: PathdamageUpdateData = {
              id: infoTireDialogItem?.cycle.movement_tire.movement_tire_id,
              damages: data.damages.map((damage) => removeNull(damage)),
              provider_id: Number(data.provider_id),
              price: Number(data.price),
            };

            if (data.invoice_date) {
              newData.invoice_date = data.invoice_date;
            }
            if (data.invoice_folio) {
              newData.invoice_folio = data.invoice_folio;
            }
            if (data.surcharge) {
              newData.surcharge = data.surcharge;
              newData.driver_id = Number(data.driver_id);
              newData.surcharge_item = data.surcharge_item;
            }

            tirePathDamageButtonMutation.mutate(newData);
            // setButtonsModalOpen((prevState) => ({
            //   ...prevState,
            //   pathDamage: false,
            // }));
          })();
        }}
      >
        <PathDamageButtonForm
          form={pathDamageButtonForm}
          tire={infoTireDialogItem}
          revitalizedButtonArrayForm={pathDamageButtonArrayForm}
        />
      </BaseCustomModal>
      <BaseContainer title={t("titles:vehicle_inspection")}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              mb: 3,
            }}
          >
            <Link to="/vehicle/review/2472/update" target="_blank">
              <CustomButton
                onClick={() => {}}
                text={t("buttons:edit_inspections")}
              ></CustomButton>
            </Link>
          </Box>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              {/* <Box sx={{ width: "50%" }}> */}
              {axles && axles.vehicle_type.structure_type && (
                <ChassisCard
                  title={axles.vehicle_type.name ?? ""}
                  structureType={axles.vehicle_type.structure_type}
                  axles={axles.vehicle_type_axle.map((axle: any) => ({
                    ...axle,
                    tire_quantity: axle.vehicle_type_axle_tire.length,
                  }))}
                  onClickTire={(tire) => {
                    // console.log("tire", tire);
                    setInfoTireDialogItem(tire);
                    setInfoDialogOpen(true);
                    // setTireReviewId(tire.vehicle_tire[0]?.vehicle_tire_id);
                  }}
                />
              )}
              {/* </Box> */}
            </Grid>
            {review && axles && (
              <VehicleInspectionInfoBox
                review={review}
                onStartVehicleReviewPress={onStartVehicleReviewPress}
                onVehicleReviewDeletePress={onVehicleReviewDeletePress}
                onVehicleReviewUpdatePress={onVehicleReviewUpdatePress}
                onVehicleReviewFinalizePress={onVehicleReviewFinalizePress}
              />
            )}
          </Grid>
          <Portal elementId={"navbarPortal"}>
            <Stack direction={"row"} alignItems={"center"}>
              <SearchInput
                search={(v) => {
                  if (vehicles.length == 0 || v === "") {
                    return;
                  }
                  const results = vehicles.find((vehicle) => {
                    return vehicle.economic_number
                      .toLowerCase()
                      .includes(v.toLowerCase());
                  });
                  if (results === undefined) {
                    addNotification({
                      message: t("messages:vehicle_not_found").replace(
                        "{vehicle}",
                        v,
                      ),
                      code: "",
                    });
                    return;
                  }
                  navigate(`/vehicle/review/${results.vehicle_id}`);
                }}
              />
            </Stack>
          </Portal>
        </Container>
      </BaseContainer>
    </>
  );
}
