import React, { useEffect, useState } from "react";

import FilterListIcon from "@mui/icons-material/FilterList";
import { Box, Container, IconButton, Stack } from "@mui/material";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { AddFab } from "src/components/common/AddFab";
import { BaseContainer } from "src/components/common/BaseContainer.tsx";
import { CustomButton } from "src/components/common/CustomButton";
import { CustomPagination } from "src/components/common/CustomPagination";
import { Portal } from "src/components/common/Portal";
import { SearchInput } from "src/components/common/SearchInput";
import { BaseCreateModal } from "src/components/modal/BaseCreateModal";
import { BaseCustomModal } from "src/components/modal/BaseCustomModal";
import { BaseFilterModal } from "src/components/modal/BaseFilterModal";
import { BaseUpdateModal } from "src/components/modal/BaseUpdateModal";
import { useCrud, useCrudMutationF, useCrudQuery } from "src/hooks/crud";
import { useNotification } from "src/stores/general/notification";
import { fileToBlob } from "src/utils/file";
import { removeNull } from "src/utils/object";

import {
  deleteMovement,
  sendToWareHouseRepair,
  sendToWareHouseRevitalization,
  tireButton,
  updateTireReview,
} from "../api/buttonsApi";
import { changeLocation, returnRevitalized } from "../api/inputApi";
import { createTire, deleteTire, getTires, updateTire } from "../api/tireApi";
import { useTireDependencies } from "../hooks/dependecies";
import { useTireRevitalizedDependencies } from "../hooks/dependenciesRevitalized";
import { useTireSendDependencies } from "../hooks/dependenciesSend";
import { useUpdateTireReviewDependencies } from "../hooks/dependenciesUpdateTireReview";
import { TireResponse } from "../types/tireTypes";
import {
  tireCreateDefaultValues,
  tireCreateSchema,
} from "../validation/createTire";
import {
  damageButtonDefaultValues,
  damageButtonSchema,
} from "../validation/damageButton";
import {
  discardButtonDefaultValues,
  discardButtonSchema,
} from "../validation/discardButton";
import {
  tireExcelDefaultValues,
  tireExcelSchema,
} from "../validation/excelTire";
import {
  TireFilterSchemaType,
  tireFilterDefaultValues,
  tireFilterSchema,
} from "../validation/filterTire";
import {
  repairButtonDefaultValues,
  repairButtonSchema,
} from "../validation/repairButton";
import {
  revitalizedButtonDefaultValues,
  revitalizedButtonSchema,
} from "../validation/revitalizedButton";
import {
  tireRevitalizedDefaultValues,
  tireRevitalizedSchema,
} from "../validation/revitalizedTire";
import {
  sendToWareHouseRepairDefaultValues,
  sendToWareHouseRepairSchema,
} from "../validation/senToWareHouseRepair";
import { tireSendDefaultValues, tireSendSchema } from "../validation/sendTire";
import {
  sendToWareHouseDefaultValues,
  sendToWareHouseSchema,
} from "../validation/sendToWareHouse";
import {
  tireUpdateDefaultValues,
  tireUpdateSchema,
} from "../validation/updateTire";
import {
  updateTireReviewButtonDefaultValues,
  updateTireReviewButtonSchema,
} from "../validation/updateTireReview";
import { DamageButtonForm } from "./ButtonsForms/ButtonDamage";
import { DiscardButtonForm } from "./ButtonsForms/ButtonDiscard";
import { RepairButtonForm } from "./ButtonsForms/ButtonRepair";
import { RevitalizedButtonForm } from "./ButtonsForms/ButtonRevitalized";
import { UpdateTireReviewButtonForm } from "./ButtonsForms/ButtonUpdateTireReview";
import { ButtonWareHouseRepairForm } from "./ButtonsForms/ButtonWareHouseRepair";
import { ButtonWareHouseRevitalizedForm } from "./ButtonsForms/ButtonWareHouseRevitalized";
import { TireCreateForm } from "./TireCreateForm";
import { TireCreateMultipleForm } from "./TireCreateMultipleForm";
import { TireExcelForm } from "./TireExcelForm";
import { TireFilterForm } from "./TireFilterForm";
import { TireInfoDialog } from "./TireInfoDialog";
import { TireRevitalizedForm } from "./TireRevitalizedForm";
import { TireRevitalizedMultipleForm } from "./TireRevitalizedMultipleForm";
import { TireSendForm } from "./TireSend";
import { TireTable } from "./TireTable";
import { TireUpdateForm } from "./TireUpdateForm";

export { Tire };

function Tire(): React.ReactElement {
  const { t } = useTranslation();
  const addNotification = useNotification((state) => state.addNotification);
  const [changeLocationItem, setChangeLocationItem] = useState<TireResponse>();
  const [infoTireDialogItem, setInfoTireDialogItem] = useState<TireResponse>();
  const [revitalizedOpen, setRevitalizedOpen] = useState(false);
  const [similarRevitalizedOpen, setSimilarRevitalizedOpen] = useState(false);
  const [similarTireOpen, setSimilarTireOpen] = useState(false);
  const [excelOpen, setExcelOpen] = useState(false);
  const [sendTireOpen, setSendTireOpen] = useState(false);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const [reviewId, setReviewId] = useState("");
  const [tireReviewId, setTireReviewId] = useState("");
  const [buttonsModalOpen, setButtonsModalOpen] = useState({
    revitalized: false,
    repair: false,
    discard: false,
    damage: false,
    sendToWareHouse: false,
    sendToWareHouseRepair: false,
    updateTireReview: false,
  });

  const crud = useCrud<TireResponse>();
  const tireQuery = useCrudQuery({
    apiFunction: getTires,
    name: "tires",
    page: crud.page,
    search: crud.search,
    filters: crud.filters,
    keepPrevious: true,
    extras: undefined,
  });
  const tires = tireQuery.data?.data ?? [];

  //Mutations
  const tireCreateMutation = useCrudMutationF(createTire, "tires", "create", {
    onSuccess: () => crud.setCreateModalOpen(false),
  });
  const tireUpdateMutation = useCrudMutationF(updateTire, "tires", "update", {
    onSuccess: () => crud.setUpdateModalOpen(false),
  });
  const tireDeleteMutation = useCrudMutationF(deleteTire, "tires", "delete", {
    onSuccess: () => setInfoDialogOpen(false),
  });
  const tireChangeLocationMutation = useCrudMutationF(
    changeLocation,
    "tires",
    "custom",
    {
      onSuccess: () => setSendTireOpen(false),
      customName: "changeLocation",
    },
  );
  const tireReturnRevitalizedMutation = useCrudMutationF(
    returnRevitalized,
    "tires",
    "custom",
    {
      onSuccess: () => setRevitalizedOpen(false),
      customName: "returnRevitalized",
    },
  );
  const tireDeleteMovementMutation = useCrudMutationF(
    deleteMovement,
    "tires",
    "custom",
    { onSuccess: () => setInfoDialogOpen(false), customName: "deleteMovement" },
  );
  const tireButtonMutation = useCrudMutationF(tireButton, "tires", "custom", {
    customName: "tireButton",
  });
  const sendToWareHouseRevita = useCrudMutationF(
    sendToWareHouseRevitalization,
    "tires",
    "custom",
    {
      onSuccess: () =>
        setButtonsModalOpen((prevState) => ({
          ...prevState,
          sendToWareHouse: false,
        })),
      customName: "sendToWareHouseRevitalization",
    },
  );
  const sendToWareHouseRepa = useCrudMutationF(
    sendToWareHouseRepair,
    "tires",
    "custom",
    {
      onSuccess: () =>
        setButtonsModalOpen((prevState) => ({
          ...prevState,
          sendToWareHouseRepair: false,
        })),
      customName: "sendToWareHouseRepair",
    },
  );
  const updateTireReviewMutation = useCrudMutationF(
    updateTireReview,
    "tires",
    "custom",
    {
      onSuccess: () => {
        setButtonsModalOpen((prevState) => ({
          ...prevState,
          updateTireReview: false,
        }));
        setReviewId("");
      },

      customName: "updateTireReview",
    },
  );

  //Forms
  const tireCreateForm = useForm({
    defaultValues: tireCreateDefaultValues,
    resolver: zodResolver(tireCreateSchema),
  });
  const tireCreateArrayForm = useFieldArray({
    control: tireCreateForm.control,
    name: "tires",
  });
  const tireUpdateForm = useForm({
    defaultValues: tireUpdateDefaultValues,
    resolver: zodResolver(tireUpdateSchema),
  });
  const tireExcelForm = useForm({
    defaultValues: tireExcelDefaultValues,
    resolver: zodResolver(tireExcelSchema),
  });
  const tireRevitalizedForm = useForm({
    defaultValues: tireRevitalizedDefaultValues,
    resolver: zodResolver(tireRevitalizedSchema),
  });
  const tireRevitalizedArrayForm = useFieldArray({
    control: tireRevitalizedForm.control,
    name: "tires",
  });
  const tireSendForm = useForm({
    defaultValues: tireSendDefaultValues,
    resolver: zodResolver(tireSendSchema),
  });
  const tireFilterForm = useForm({
    defaultValues: tireFilterDefaultValues,
    resolver: zodResolver(tireFilterSchema),
  });
  //FormButtons
  const revitalizedButtonForm = useForm({
    defaultValues: revitalizedButtonDefaultValues,
    resolver: zodResolver(revitalizedButtonSchema),
  });
  const revitalizedButtonArrayForm = useFieldArray({
    control: revitalizedButtonForm.control,
    name: "wears",
  });
  const revitalizedButtonArray2Form = useFieldArray({
    control: revitalizedButtonForm.control,
    name: "damages",
  });
  const repairButtonForm = useForm({
    defaultValues: repairButtonDefaultValues,
    resolver: zodResolver(repairButtonSchema),
  });
  const repairButtonArrayForm = useFieldArray({
    control: repairButtonForm.control,
    name: "damages",
  });
  const discardButtonForm = useForm({
    defaultValues: discardButtonDefaultValues,
    resolver: zodResolver(discardButtonSchema),
  });
  const discardButtonArrayForm = useFieldArray({
    control: discardButtonForm.control,
    name: "damages",
  });
  const damageButtonForm = useForm({
    defaultValues: damageButtonDefaultValues,
    resolver: zodResolver(damageButtonSchema),
  });
  const damageButtonArrayForm = useFieldArray({
    control: damageButtonForm.control,
    name: "damages",
  });
  const sendToWareHouseReviButtonForm = useForm({
    defaultValues: sendToWareHouseDefaultValues,
    resolver: zodResolver(sendToWareHouseSchema),
  });
  const updateTireReviewForm = useForm({
    defaultValues: updateTireReviewButtonDefaultValues,
    resolver: zodResolver(updateTireReviewButtonSchema),
  });
  const updateTireReviewArrayForm = useFieldArray({
    control: updateTireReviewForm.control,
    name: "depth",
  });
  const sendToWareHouseRepairButtonForm = useForm({
    defaultValues: sendToWareHouseRepairDefaultValues,
    resolver: zodResolver(sendToWareHouseRepairSchema),
  });
  const sendToWareHouseRepairButtonArrayForm = useFieldArray({
    control: sendToWareHouseRepairButtonForm.control,
    name: "repairs",
  });

  //Functions
  function onUpdatePress(tire: TireResponse) {
    crud.setCurrent(tire);
    crud.setUpdateModalOpen(true);
  }
  function onItemChange(tire: TireResponse) {
    tireUpdateForm.setValue(
      "cap_and_casing",
      tire.cap_and_casing ? true : false,
    );
    tireUpdateForm.setValue("code", tire.code ?? "");
    tireUpdateForm.setValue("dot", tire.dot ?? "");
    tireUpdateForm.setValue("rfid_id", tire.device_code ?? "");
    tireUpdateForm.setValue(
      "brand_id",
      tire.cycle.variation.tire_model.brand_id.toString() ?? "",
    );
    tireUpdateForm.setValue(
      "model_id",
      tire.cycle.variation.tire_model_id.toString() ?? "",
    );
    tireUpdateForm.setValue(
      "expected_durability",
      tire.cycle.expected_durability ?? "",
    );
    tireUpdateForm.setValue("invoice_date", tire.cycle.invoice_date ?? "");
    tireUpdateForm.setValue("invoice_folio", tire.cycle.invoice_folio ?? "");
    tireUpdateForm.setValue(
      "is_refection",
      tire.cycle.is_refection ? true : false,
    );
    tireUpdateForm.setValue("price", tire.cycle.price ?? "");
    tireUpdateForm.setValue(
      "provider_id",
      tire.cycle.provider_id.toString() ?? "",
    );
    tireUpdateForm.setValue(
      "tire_model_variation_id",
      tire.cycle.tire_model_variation_id.toString() ?? "",
    );
  }
  function onDeletePress(tire: TireResponse) {
    addNotification({
      message: t("messages:delete.tire"),
      action: {
        label: "Eliminar",
        onClick: async () => {
          tireDeleteMutation.mutate({
            id: tire.tire_id,
            extras: undefined,
          });
        },
      },
    });
  }
  function onSendPress(tire: TireResponse) {
    tireSendForm.reset();
    setChangeLocationItem(tire);
    setSendTireOpen(true);
  }
  function subValues() {
    if (crud.createModalOpen && !crud.updateModalOpen) {
      return subsidiary_id;
    } else if (crud.updateModalOpen && !crud.createModalOpen) {
      return crud.current?.subsidiary_id.toString();
    }
  }
  function subValuesRevitalized() {
    if (revitalizedOpen && !buttonsModalOpen.sendToWareHouse) {
      return brand_id;
    } else if (!revitalizedOpen && buttonsModalOpen.sendToWareHouse) {
      return brand_id4;
    }
  }
  function tireModelValues() {
    if (crud.createModalOpen && !crud.updateModalOpen) {
      return model_id;
    } else if (crud.updateModalOpen && !crud.createModalOpen) {
      return model_id2;
    }
  }
  function onFilter(data: TireFilterSchemaType) {
    const searchParams = new URLSearchParams();
    if (data.status) {
      searchParams.append("status", data.status === "enabled" ? "1" : "0");
    }
    if (data.brands.length > 0) {
      searchParams.append("brands", data.brands.join(","));
    }
    if (data.subsidiaries) {
      searchParams.append("subsidiaries", data.subsidiaries);
    }
    if (data.warehouses) {
      searchParams.append("warehouses", data.warehouses);
    }
    if (data.providers) {
      searchParams.append("providers", data.providers);
    }
    if (data.tire_size) {
      searchParams.append("tire_size", data.tire_size);
    }
    if (data.condition) {
      searchParams.append("condition", data.condition);
    }
    if (data.DOT_initial) {
      searchParams.append("DOT_initial", data.DOT_initial);
    }
    if (data.DOT_final) {
      searchParams.append("DOT_final", data.DOT_final);
    }
    if (data.date_from) {
      searchParams.append("date_from", data.date_from);
    }
    if (data.date_to) {
      searchParams.append("date_to", data.date_to);
    }
    if (data.invoice_folio) {
      searchParams.append("invoice_folio", data.invoice_folio);
    }
    if (data.models) {
      searchParams.append("models", data.models);
    }
    if (data.location) {
      searchParams.append("location", data.location);
    }
    searchParams.append("order", "DESC");
    crud.setFilters(searchParams);
  }
  function onDialogPress(tire: TireResponse) {
    setInfoTireDialogItem(tire);
    setInfoDialogOpen(true);
  }

  //ButtonFunctions
  function onRevitalizedPress() {
    setInfoDialogOpen(false);
    setButtonsModalOpen((prevState) => ({
      ...prevState,
      revitalized: true,
    }));
  }
  function onRepairPress() {
    setInfoDialogOpen(false);
    setButtonsModalOpen((prevState) => ({
      ...prevState,
      repair: true,
    }));
  }
  function onDiscardPress() {
    setInfoDialogOpen(false);
    setButtonsModalOpen((prevState) => ({
      ...prevState,
      discard: true,
    }));
  }
  function onDamagePress() {
    setInfoDialogOpen(false);
    setButtonsModalOpen((prevState) => ({
      ...prevState,
      damage: true,
    }));
  }
  function onSendToWareHousePress() {
    setInfoDialogOpen(false);
    setButtonsModalOpen((prevState) => ({
      ...prevState,
      sendToWareHouse: true,
    }));
  }
  function onSendToWareHouseRepairPress() {
    setInfoDialogOpen(false);
    setButtonsModalOpen((prevState) => ({
      ...prevState,
      sendToWareHouseRepair: true,
    }));
  }
  function onUpdateTireReviewPress() {
    setInfoDialogOpen(false);
    setButtonsModalOpen((prevState) => ({
      ...prevState,
      updateTireReview: true,
    }));
    setReviewId(
      infoTireDialogItem
        ? infoTireDialogItem.cycle.movement_tire.movement_tire_id.toString()
        : "",
    );
  }
  function getTireReviewId(id: string) {
    setTireReviewId(id);
  }
  function onCancelMovementPress() {
    addNotification({
      message: "¿Cancelar Movimiento?",
      action: {
        label: "Confirmar",
        onClick: async () => {
          if (infoTireDialogItem) {
            tireDeleteMovementMutation.mutate({
              data: {
                movement_tire_id:
                  infoTireDialogItem?.cycle.movement_tire.movement_tire_id,
                type: infoTireDialogItem.cycle.movement_tire.movement,
                type_location_id:
                  infoTireDialogItem.cycle.movement_tire.movement === "PILE"
                    ? infoTireDialogItem?.cycle.movement_tire.tire_pile[0]
                        .tire_pile_id
                    : infoTireDialogItem.cycle.movement_tire.movement ===
                      "REVITALIZATION"
                    ? infoTireDialogItem?.cycle.movement_tire
                        .tire_revitalization[0].tire_revitalization_id
                    : infoTireDialogItem.cycle.movement_tire.movement ===
                      "REPAIR"
                    ? infoTireDialogItem?.cycle.movement_tire.tire_repair[0]
                        .tire_repair_id
                    : "",
              },
              extras: undefined,
            });
          }
        },
      },
    });
  }

  //Dependencies
  const [subsidiary_id, model_id, code, rfid_id, dot, similar_tires] = useWatch(
    {
      control: tireCreateForm.control,
      name: [
        "subsidiary_id",
        "model_id",
        "code",
        "rfid_id",
        "dot",
        "similar_tires",
      ],
    },
  );

  const [model_id2] = useWatch({
    control: tireUpdateForm.control,
    name: ["model_id"],
  });

  const [brand_id, code3, rfid_id3, similar_tires3] = useWatch({
    control: tireRevitalizedForm.control,
    name: ["brand_id", "code", "rfid_id", "similar_tires"],
  });

  const [brand_id4] = useWatch({
    control: sendToWareHouseReviButtonForm.control,
    name: ["brand_id"],
  });

  const [company_id5, subsidiary_id5] = useWatch({
    control: tireSendForm.control,
    name: ["company_id", "subsidiary_id"],
  });

  const dependencies = useTireDependencies({
    subsidiary_id: subValues(),
    tire_model_id: tireModelValues(),
  });
  const revitalizedDependencies = useTireRevitalizedDependencies({
    brand_id: subValuesRevitalized(),
  });
  const sendDependencies = useTireSendDependencies({
    company_id: company_id5,
    subsidiary_id: subsidiary_id5,
  });
  const updateTireReviewDependencies = useUpdateTireReviewDependencies({
    movement_tire_id: reviewId,
  });

  //Effects
  useEffect(() => {
    if (crud.current !== undefined) {
      const tire = crud.current;
      onItemChange(tire);
    }
  }, [crud.current]);
  useEffect(() => {
    if (crud.createModalOpen) {
      tireCreateForm.reset();
    }
  }, [crud.createModalOpen]);
  useEffect(() => {
    if (excelOpen) {
      tireExcelForm.reset();
    }
  }, [excelOpen]);
  useEffect(() => {
    if (revitalizedOpen) {
      tireRevitalizedForm.reset();
    }
  }, [revitalizedOpen]);
  useEffect(() => {
    const newArray = [
      {
        code: code,
        rfid_id: rfid_id,
        dot: dot,
      },
    ];
    for (let i = 0; i < similar_tires - 1; i++) {
      newArray.push({
        code: "",
        rfid_id: "",
        dot: "",
      });
    }
    tireCreateArrayForm.replace(newArray);
  }, [similarTireOpen]);
  useEffect(() => {
    const newArray = [
      {
        code: code3,
        rfid_id: rfid_id3,
      },
    ];
    for (let i = 0; i < similar_tires3 - 1; i++) {
      newArray.push({
        code: "",
        rfid_id: "",
      });
    }
    tireRevitalizedArrayForm.replace(newArray);
  }, [similarRevitalizedOpen]);
  useEffect(() => {
    if (buttonsModalOpen.revitalized) {
      revitalizedButtonForm.reset();
      revitalizedButtonArrayForm.replace([]);
      revitalizedButtonArrayForm.append({
        wear_id: "",
        comment: "",
        image: null,
      });
    }
  }, [buttonsModalOpen.revitalized]);
  useEffect(() => {
    if (buttonsModalOpen.repair) {
      repairButtonForm.reset();
      repairButtonArrayForm.replace([]);
      repairButtonArrayForm.append({
        damage_id: "",
        comment: "",
        image: null,
      });
    }
  }, [buttonsModalOpen.repair]);
  useEffect(() => {
    if (buttonsModalOpen.damage) {
      damageButtonForm.reset();
      damageButtonArrayForm.replace([]);
      damageButtonArrayForm.append({
        damage_id: "",
        comment: "",
        image: null,
      });
    }
  }, [buttonsModalOpen.damage]);
  useEffect(() => {
    if (buttonsModalOpen.discard) {
      discardButtonForm.reset();
    }
  }, [buttonsModalOpen.discard]);
  useEffect(() => {
    if (buttonsModalOpen.sendToWareHouse) {
      sendToWareHouseReviButtonForm.reset();
    }
  }, [buttonsModalOpen.sendToWareHouse]);
  useEffect(() => {
    if (buttonsModalOpen.sendToWareHouseRepair) {
      sendToWareHouseRepairButtonForm.reset();
    }
  }, [buttonsModalOpen.sendToWareHouseRepair]);
  useEffect(() => {
    if (buttonsModalOpen.updateTireReview) {
      updateTireReviewForm.reset();
    }
  }, [buttonsModalOpen.updateTireReview]);

  return (
    <>
      {/*Button Modals */}
      <BaseCustomModal
        open={buttonsModalOpen.revitalized}
        size="sm"
        title={t("titles:send.revitalization")}
        onClose={() => {
          setButtonsModalOpen((prevState) => ({
            ...prevState,
            revitalized: false,
          }));
        }}
        onConfirm={() => {
          revitalizedButtonForm.handleSubmit(async (data) => {
            tireButtonMutation.mutate({
              id: infoTireDialogItem?.cycle.movement_tire.movement_tire_id,
              data: {
                provider_id: data.provider_id,
                wears: data.wears.map((wear) => removeNull(wear)),
                damages: data.damages.map((damage) => removeNull(damage)),
                date_send: data.date,
                type: "REVITALIZATION",
              },
              extras: undefined,
            });
            setButtonsModalOpen((prevState) => ({
              ...prevState,
              revitalized: false,
            }));
          })();
        }}
      >
        <RevitalizedButtonForm
          form={revitalizedButtonForm}
          tire={infoTireDialogItem}
          revitalizedButtonArrayForm={revitalizedButtonArrayForm}
          revitalizedButtonArray2Form={revitalizedButtonArray2Form}
        />
      </BaseCustomModal>
      <BaseCustomModal
        open={buttonsModalOpen.repair}
        size="sm"
        title={t("titles:send.repair")}
        onClose={() => {
          setButtonsModalOpen((prevState) => ({
            ...prevState,
            repair: false,
          }));
        }}
        onConfirm={() => {
          repairButtonForm.handleSubmit(async (data) => {
            tireButtonMutation.mutate({
              id: infoTireDialogItem?.cycle.movement_tire.movement_tire_id,
              data: {
                provider_id: data.provider_id,
                damages: data.damages.map((damage) => removeNull(damage)),
                date_send: data.date,
                type: "REPAIR",
              },
              extras: undefined,
            });
            setButtonsModalOpen((prevState) => ({
              ...prevState,
              repair: false,
            }));
          })();
        }}
      >
        <RepairButtonForm
          form={repairButtonForm}
          tire={infoTireDialogItem}
          repairButtonArrayForm={repairButtonArrayForm}
        />
      </BaseCustomModal>
      <BaseCustomModal
        open={buttonsModalOpen.discard}
        size="sm"
        title={t("titles:send.pile")}
        onClose={() => {
          setButtonsModalOpen((prevState) => ({
            ...prevState,
            discard: false,
          }));
        }}
        onConfirm={() => {
          discardButtonForm.handleSubmit(
            async (data) => {
              // console.log(data);
              if (data.surcharge > 0) {
                tireButtonMutation.mutate({
                  id: infoTireDialogItem?.cycle.movement_tire.movement_tire_id,
                  data: {
                    damages: data.damages.map((damage) => removeNull(damage)),
                    retirement_cause_id: data.retirement_cause_id,
                    driver_id: data.driver_id,
                    comment: data.comment,
                    surcharge: data.surcharge,
                    surcharge_item: data.surcharge_item,
                    cost_dispose_helmet: data.cost_dispose_helmet,
                    type: "PILE",
                  },
                  extras: undefined,
                });
              } else {
                tireButtonMutation.mutate({
                  id: infoTireDialogItem?.cycle.movement_tire.movement_tire_id,
                  data: {
                    damages: data.damages.map((damage) => removeNull(damage)),
                    retirement_cause_id: data.retirement_cause_id,
                    comment: data.comment,
                    surcharge: data.surcharge,
                    cost_dispose_helmet: data.cost_dispose_helmet,
                    type: "PILE",
                  },
                  extras: undefined,
                });
              }
              setButtonsModalOpen((prevState) => ({
                ...prevState,
                discard: false,
              }));
            },
            (_e) => {
              // console.log(e);
            },
          )();
        }}
      >
        <DiscardButtonForm
          form={discardButtonForm}
          tire={infoTireDialogItem}
          discardButtonArrayForm={discardButtonArrayForm}
        />
      </BaseCustomModal>
      <BaseCustomModal
        open={buttonsModalOpen.damage}
        size="sm"
        title={t("common:tire")}
        onClose={() => {
          setButtonsModalOpen((prevState) => ({
            ...prevState,
            damage: false,
          }));
        }}
        onConfirm={() => {
          damageButtonForm.handleSubmit(async (data) => {
            // console.log(data);
            tireButtonMutation.mutate({
              id: infoTireDialogItem?.cycle.movement_tire.movement_tire_id,
              data: {
                damages: data.damages.map((damage) => removeNull(damage)),
                type: "DAMAGE",
              },
              extras: undefined,
            });
            setButtonsModalOpen((prevState) => ({
              ...prevState,
              damage: false,
            }));
          })();
        }}
      >
        <DamageButtonForm
          form={damageButtonForm}
          tire={infoTireDialogItem}
          damageButtonArrayForm={damageButtonArrayForm}
        />
      </BaseCustomModal>
      <BaseCustomModal
        open={buttonsModalOpen.sendToWareHouse}
        size="sm"
        title={t("titles:send.warehouse")}
        onClose={() => {
          setButtonsModalOpen((prevState) => ({
            ...prevState,
            sendToWareHouse: false,
          }));
        }}
        onConfirm={() => {
          // console.log("WareHouse");
          sendToWareHouseReviButtonForm.handleSubmit(async (data) => {
            sendToWareHouseRevita.mutate({
              data: {
                warehouse_id: data.warehouse_id,
                price: data.price,
                revitalized_tire_model_id: data.revitalized_tire_model_id,
                expected_durability: data.expected_durability,
                depth: data.depth,
                date_return: data.date_return,
                comment: data.comment,
                invoice_date: data.invoice_date,
                invoice_folio: data.invoice_folio,
              },
              extras: {
                id: infoTireDialogItem
                  ? infoTireDialogItem.cycle.movement_tire.movement_tire_id
                  : "",
                tire_revitalization_id: infoTireDialogItem
                  ? infoTireDialogItem.cycle.movement_tire.tire_revitalization[0].tire_revitalization_id.toString()
                  : "",
              },
            });
          })();
        }}
      >
        <ButtonWareHouseRevitalizedForm
          form={sendToWareHouseReviButtonForm}
          tire={infoTireDialogItem}
          dependencies={revitalizedDependencies}
        />
      </BaseCustomModal>
      <BaseCustomModal
        open={buttonsModalOpen.sendToWareHouseRepair}
        size="sm"
        title={t("titles:send.warehouse")}
        onClose={() => {
          setButtonsModalOpen((prevState) => ({
            ...prevState,
            sendToWareHouseRepair: false,
          }));
        }}
        onConfirm={() => {
          sendToWareHouseRepairButtonForm.handleSubmit(async (data) => {
            if (data.repair_detail && data.surcharge > 0) {
              sendToWareHouseRepa.mutate({
                data: {
                  driver_id: data.driver_id,
                  comment: data.comment,
                  surcharge: data.surcharge,
                  surcharge_item: data.surcharge_item,
                  date_return: data.date_return,
                  warehouse_id: data.warehouse_id,
                  price: data.price,
                  invoice_date: data.invoice_date,
                  invoice_folio: data.invoice_folio,
                  repairs: data.repairs,
                },
                extras: {
                  id: infoTireDialogItem
                    ? infoTireDialogItem.cycle.movement_tire.movement_tire_id
                    : "",
                  tire_repair_id: infoTireDialogItem
                    ? infoTireDialogItem.cycle.movement_tire.tire_repair[0]
                        .tire_repair_id
                    : 0,
                },
              });
            } else if (!data.repair_detail && data.surcharge > 0) {
              sendToWareHouseRepa.mutate({
                data: {
                  driver_id: data.driver_id,
                  comment: data.comment,
                  surcharge: data.surcharge,
                  surcharge_item: data.surcharge_item,
                  date_return: data.date_return,
                  warehouse_id: data.warehouse_id,
                  price: data.price,
                  invoice_date: data.invoice_date,
                  invoice_folio: data.invoice_folio,
                },
                extras: {
                  id: infoTireDialogItem
                    ? infoTireDialogItem.cycle.movement_tire.movement_tire_id
                    : 0,
                  tire_repair_id: infoTireDialogItem
                    ? infoTireDialogItem.cycle.movement_tire.tire_repair[0]
                        .tire_repair_id
                    : 0,
                },
              });
            } else if (data.repair_detail && data.surcharge <= 0) {
              sendToWareHouseRepa.mutate({
                data: {
                  comment: data.comment,
                  surcharge: data.surcharge,
                  date_return: data.date_return,
                  warehouse_id: data.warehouse_id,
                  price: data.price,
                  invoice_date: data.invoice_date,
                  invoice_folio: data.invoice_folio,
                  repairs: data.repairs,
                },
                extras: {
                  id: infoTireDialogItem
                    ? infoTireDialogItem.cycle.movement_tire.movement_tire_id
                    : 0,
                  tire_repair_id: infoTireDialogItem
                    ? infoTireDialogItem.cycle.movement_tire.tire_repair[0]
                        .tire_repair_id
                    : 0,
                },
              });
            } else {
              sendToWareHouseRepa.mutate({
                data: {
                  comment: data.comment,
                  surcharge: data.surcharge,
                  date_return: data.date_return,
                  warehouse_id: data.warehouse_id,
                  price: data.price,
                  invoice_date: data.invoice_date,
                  invoice_folio: data.invoice_folio,
                },
                extras: {
                  id: infoTireDialogItem
                    ? infoTireDialogItem.cycle.movement_tire.movement_tire_id
                    : 0,
                  tire_repair_id: infoTireDialogItem
                    ? infoTireDialogItem.cycle.movement_tire.tire_repair[0]
                        .tire_repair_id
                    : 0,
                },
              });
            }
          })();
        }}
      >
        <ButtonWareHouseRepairForm
          form={sendToWareHouseRepairButtonForm}
          tire={infoTireDialogItem}
          sendToWareHouseRepairButtonArrayForm={
            sendToWareHouseRepairButtonArrayForm
          }
        />
      </BaseCustomModal>
      <BaseCustomModal
        open={buttonsModalOpen.updateTireReview}
        size="sm"
        title={t("titles:update.tire_review")}
        onClose={() => {
          setButtonsModalOpen((prevState) => ({
            ...prevState,
            updateTireReview: false,
          }));
        }}
        onConfirm={() => {
          updateTireReviewForm.handleSubmit(async (data) => {
            // console.log(data);
            updateTireReviewMutation.mutate({
              data: {
                pressure: data.pressure,
                comment: data.comment,
                depth: data.depth,
              },
              extras: {
                id: infoTireDialogItem
                  ? infoTireDialogItem.cycle.movement_tire.movement_tire_id
                  : "",
                tire_review_id: tireReviewId,
              },
            });
          })();
        }}
      >
        <UpdateTireReviewButtonForm
          form={updateTireReviewForm}
          tire={infoTireDialogItem}
          dependencies={updateTireReviewDependencies}
          onGetTireReviewId={getTireReviewId}
          updateTireReviewArrayForm={updateTireReviewArrayForm}
        />
      </BaseCustomModal>

      {/*Modals*/}
      <BaseCustomModal
        open={infoDialogOpen}
        size="sm"
        title={t("titles:show.tire")}
        onClose={() => {
          setInfoDialogOpen(false);
        }}
        onConfirm={() => {
          setInfoDialogOpen(false);
        }}
      >
        <TireInfoDialog
          tire={infoTireDialogItem}
          onRevitalized={onRevitalizedPress}
          onCancelMovement={onCancelMovementPress}
          onRepair={onRepairPress}
          onDiscard={onDiscardPress}
          onSendToWareHouse={onSendToWareHousePress}
          onSendToWareHouseRepair={onSendToWareHouseRepairPress}
          onUpdateTireReview={onUpdateTireReviewPress}
          onDamage={onDamagePress}
        />
      </BaseCustomModal>
      <BaseCustomModal
        open={sendTireOpen}
        size="sm"
        title={t("titles:move.tire")}
        onClose={() => {
          setSendTireOpen(false);
        }}
        onConfirm={() => {
          tireSendForm.handleSubmit(async (data) => {
            tireChangeLocationMutation.mutate({
              id: changeLocationItem?.cycle.movement_tire.movement_tire_id,
              data: {
                company_id: data.company_id,
                subsidiary_id: data.subsidiary_id,
                warehouse_id: data.warehouse_id,
              },
              extras: undefined,
            });
          })();
        }}
      >
        <TireSendForm form={tireSendForm} dependencies={sendDependencies} />
      </BaseCustomModal>
      <BaseCustomModal
        open={revitalizedOpen}
        size="sm"
        title={t("titles:send.warehouse")}
        onClose={() => {
          setRevitalizedOpen(false);
        }}
        onConfirm={() => {
          tireRevitalizedForm.handleSubmit(
            async (data) => {
              if (data.similar_tires === 1) {
                tireReturnRevitalizedMutation.mutate({
                  data: {
                    code: data.code ?? "",
                    comment: data.comment ?? "",
                    date_return: data.date_return ?? "",
                    depth: data.depth ?? "",
                    expected_durability: data.expected_durability ?? "",
                    invoice_date: data.invoice_date ?? "",
                    invoice_folio: data.invoice_folio ?? "",
                    price: data.price ?? "",
                    revitalized_tire_model_id:
                      data.revitalized_tire_model_id ?? "",
                    warehouse_id: data.warehouse_id ?? "",
                  },
                  extras: undefined,
                });
              } else {
                setSimilarRevitalizedOpen(true);
                setRevitalizedOpen(false);
              }
            },
            (_e) => {
              // console.log(e);
            },
          )();
        }}
      >
        <TireRevitalizedForm
          form={tireRevitalizedForm}
          dependencies={revitalizedDependencies}
        />
      </BaseCustomModal>
      <BaseCustomModal
        open={similarRevitalizedOpen}
        size="sm"
        title={t("titles:send.warehouse")}
        onClose={() => {
          setSimilarRevitalizedOpen(false);
        }}
        onConfirm={() => {
          tireRevitalizedForm.handleSubmit(async (data) => {
            if (data.similar_tires > 1) {
              const codes = data.tires.map((tire) => tire.code).join(",");
              tireReturnRevitalizedMutation.mutate({
                data: {
                  code: codes ?? "",
                  comment: data.comment ?? "",
                  date_return: data.date_return ?? "",
                  depth: data.depth ?? "",
                  expected_durability: data.expected_durability ?? "",
                  invoice_date: data.invoice_date ?? "",
                  invoice_folio: data.invoice_folio ?? "",
                  price: data.price ?? "",
                  revitalized_tire_model_id:
                    data.revitalized_tire_model_id ?? "",
                  warehouse_id: data.warehouse_id ?? "",
                },
                extras: undefined,
              });
              setSimilarRevitalizedOpen(false);
            }
          })();
        }}
      >
        <TireRevitalizedMultipleForm
          form={tireRevitalizedForm}
          dependencies={dependencies}
          formArray={tireRevitalizedArrayForm}
        />
      </BaseCustomModal>
      <BaseCustomModal
        open={excelOpen}
        size="md"
        title={t("titles:register.tires")}
        onClose={() => {
          setExcelOpen(false);
        }}
        onConfirm={() => {
          tireExcelForm.handleSubmit(async (data) => {
            if (!data.excel) {
              return;
            } else {
              const _blob = await fileToBlob(data.excel);
              // console.log(blob);
            }
          })();
          setExcelOpen(false);
        }}
      >
        <TireExcelForm form={tireExcelForm} />
      </BaseCustomModal>
      <BaseCustomModal
        open={similarTireOpen}
        size="md"
        title={t("titles:new.tire")}
        onClose={() => {
          setSimilarTireOpen(false);
        }}
        onConfirm={() => {
          tireCreateForm.handleSubmit(async (data) => {
            if (data.similar_tires > 1) {
              data.tires.map((tire) => {
                tireCreateMutation.mutate({
                  data: {
                    code: tire.code,
                    subsidiary_id: data.subsidiary_id,
                    warehouse_id: data.warehouse_id,
                    provider_id: data.provider_id,
                    tire_model_variation_id: data.tire_model_variation_id,
                    price: data.price,
                    expected_durability: data.expected_durability,
                    dot: tire.dot,
                    invoice_date: data.invoice_date,
                    invoice_folio: data.invoice_folio,
                  },
                  extras: undefined,
                });
              });
              setSimilarTireOpen(false);
            }
          })();
        }}
      >
        <TireCreateMultipleForm
          form={tireCreateForm}
          dependencies={dependencies}
          formArray={tireCreateArrayForm}
        />
      </BaseCustomModal>
      <BaseCreateModal
        size="md"
        open={crud.createModalOpen}
        title={t("titles:new.tire")}
        onClose={() => crud.setCreateModalOpen(false)}
        onConfirm={tireCreateForm.handleSubmit(async (data) => {
          if (data.similar_tires === 1) {
            tireCreateMutation.mutate({
              data: {
                code: data.code,
                subsidiary_id: data.subsidiary_id,
                warehouse_id: data.warehouse_id,
                provider_id: data.provider_id,
                tire_model_variation_id: data.tire_model_variation_id,
                price: data.price,
                expected_durability: data.expected_durability,
                dot: data.dot,
                invoice_date: data.invoice_date,
                invoice_folio: data.invoice_folio,
              },
              extras: undefined,
            });
          } else {
            setSimilarTireOpen(true);
            crud.setCreateModalOpen(false);
          }
        })}
      >
        <TireCreateForm form={tireCreateForm} dependencies={dependencies} />
      </BaseCreateModal>
      <BaseUpdateModal
        open={crud.updateModalOpen}
        title={t("titles:update.tire")}
        onClose={() => crud.setUpdateModalOpen(false)}
        onConfirm={tireUpdateForm.handleSubmit(async (data) => {
          tireUpdateMutation.mutate({
            id: crud.current?.tire_id ?? 0,
            data: {
              cap_and_casing: data.cap_and_casing,
              code: data.code,
              dot: data.dot,
              expected_durability: data.expected_durability,
              invoice_date: data.invoice_date,
              invoice_folio: data.invoice_folio,
              is_refection: data.is_refection,
              price: data.price,
              provider_id: data.provider_id,
              subsidiary_id: crud.current?.subsidiary_id.toString() ?? "",
              tire_model_variation_id: data.tire_model_variation_id,
              warehouse_id:
                crud.current?.cycle.movement_tire.warehouse_tire[0]
                  .warehouse_id ?? "",
            },
            extras: undefined,
          });
        })}
      >
        <TireUpdateForm form={tireUpdateForm} dependencies={dependencies} />
      </BaseUpdateModal>
      <BaseFilterModal
        open={crud.filterModalOpen}
        title={"Filtro"}
        onClose={() => crud.setFilterModalOpen(false)}
        onConfirm={tireFilterForm.handleSubmit(async (data) => {
          onFilter(data);
        })}
        onClear={() => {
          tireFilterForm.reset();
          crud.setFilters(new URLSearchParams({ order: "DESC" }));
        }}
      >
        <TireFilterForm form={tireFilterForm} />
      </BaseFilterModal>
      <BaseContainer title={t("common:tire", { context: "plural" })}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              mb: 3,
            }}
          >
            <CustomButton
              onClick={() => setExcelOpen(true)}
              text={"REGISTRO POR EXCEL"}
            />
            <CustomButton
              onClick={() => setRevitalizedOpen(true)}
              text={"REVITALIZADOS"}
            />
          </Box>
          <TireTable
            tires={tires}
            onUpdate={onUpdatePress}
            onDelete={onDeletePress}
            onSend={onSendPress}
            onInfoDialog={onDialogPress}
          />
          <CustomPagination
            page={crud.page}
            onChange={(_event, page) => crud.setPage(page)}
            totalPages={tireQuery.data?.last_page ?? 1}
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
