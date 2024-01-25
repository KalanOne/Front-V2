import { useState } from "react";

import { Container } from "@mui/material";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { BaseContainer } from "src/components/common/BaseContainer";
import { Portal } from "src/components/common/Portal";
import { BaseUpdateModal } from "src/components/modal/BaseUpdateModal";
import TabMenuSubsidiary from "src/features/Subsidiary/components/TabMenuSubsidiary";
import { useCrudMutationF } from "src/hooks/crud";
import { useProgressQuery } from "src/hooks/progress";

import {
  getSubsidiaryPolicies,
  updateSubsidiaryPolicy,
} from "../api/subsidiaryPolicyApi";
import { SubsidiaryPolicyResponse } from "../types/subsidiaryPolicyTypes";
import {
  subsidiaryPolicyUpdateDefaultValues,
  subsidiaryPolicyUpdateSchema,
} from "../validation/updateSubsidiaryPolicy";
import { SubsidiaryPolicyTable } from "./SubsidiaryPolicyTable";
import { SubsidiaryPolicyUpdateForm } from "./SubsidiaryPolicyUpdateForm";

export { SubsidiaryPolicy };

function SubsidiaryPolicy() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [modalOpen, setModalOpen] = useState(false);

  const subsidiaryPolicyQuery = useQuery({
    queryKey: ["subsidiaryPolicy"],
    queryFn: async () => {
      return await getSubsidiaryPolicies({
        id: `${id}`,
        params: {},
        extras: undefined,
      });
    },
    keepPreviousData: true,
  });
  const subsidiaryPolicy =
    subsidiaryPolicyQuery.data ?? ({} as SubsidiaryPolicyResponse);

  useProgressQuery(subsidiaryPolicyQuery, "subsidiaryPolicy");

  const subsidiaryPolicyUpdateForm = useForm({
    defaultValues: subsidiaryPolicyUpdateDefaultValues,
    resolver: zodResolver(subsidiaryPolicyUpdateSchema),
  });

  const subsidiaryPolicyUpdateMutation = useCrudMutationF(
    updateSubsidiaryPolicy,
    "subsidiaryPolicy",
    "update",
    {
      onSuccess: () => setModalOpen(false),
    },
  );

  function onUpdatePress() {
    setModalOpen(true);
    subsidiaryPolicyUpdateForm.setValue(
      "number_cycle",
      `${subsidiaryPolicy.number_cycle}`,
    );
    subsidiaryPolicyUpdateForm.setValue(
      "inspection",
      `${subsidiaryPolicy.inspection}`,
    );
    subsidiaryPolicyUpdateForm.setValue(
      "tolerance_inflation_pressure",
      `${subsidiaryPolicy.tolerance_inflation_pressure}`,
    );
    subsidiaryPolicyUpdateForm.setValue(
      "tolerance_mating_pressure",
      `${subsidiaryPolicy.tolerance_mating_pressure}`,
    );
    subsidiaryPolicyUpdateForm.setValue(
      "tolerance_directional_mating_depth",
      `${subsidiaryPolicy.tolerance_directional_mating_depth}`,
    );
    subsidiaryPolicyUpdateForm.setValue(
      "tolerance_mating_depth",
      `${subsidiaryPolicy.tolerance_mating_depth}`,
    );
    subsidiaryPolicyUpdateForm.setValue(
      "tire_rotation",
      `${subsidiaryPolicy.tire_rotation}`,
    );
    subsidiaryPolicyUpdateForm.setValue(
      "directional_tire_rotation",
      `${subsidiaryPolicy.directional_tire_rotation}`,
    );
    subsidiaryPolicyUpdateForm.setValue(
      "pressure_type_axle",
      subsidiaryPolicy.pressure_type_axle == 1 ? true : false,
    );
    subsidiaryPolicyUpdateForm.setValue(
      "helmet_policy",
      subsidiaryPolicy.helmet_policy == 1 ? true : false,
    );
    subsidiaryPolicyUpdateForm.setValue(
      "tire_condition_axle_type",
      subsidiaryPolicy.tire_condition_axle_type == 1 ? true : false,
    );
    subsidiaryPolicyUpdateForm.setValue(
      "show_alerts_different_assignment",
      subsidiaryPolicy.show_alerts_different_assignment == 1 ? true : false,
    );
    subsidiaryPolicyUpdateForm.setValue(
      "send_pressure_setting",
      subsidiaryPolicy.send_pressure_setting == 1 ? true : false,
    );
    subsidiaryPolicyUpdateForm.setValue(
      "operator_edit",
      subsidiaryPolicy.operator_edit == 1 ? true : false,
    );
    subsidiaryPolicyUpdateForm.setValue(
      "refection_review",
      subsidiaryPolicy.refection_review == 1 ? true : false,
    );
  }

  return (
    <>
      <BaseUpdateModal
        open={modalOpen}
        title={t("titles:update.company_policy")}
        onClose={() => setModalOpen(false)}
        onConfirm={subsidiaryPolicyUpdateForm.handleSubmit(async (data) => {
          subsidiaryPolicyUpdateMutation.mutate({
            id: Number(id),
            data: {
              number_cycle: Number(data.number_cycle),
              inspection: Number(data.inspection),
              tolerance_inflation_pressure: Number(
                data.tolerance_inflation_pressure,
              ),
              tolerance_mating_pressure: Number(data.tolerance_mating_pressure),
              tolerance_directional_mating_depth: Number(
                data.tolerance_directional_mating_depth,
              ),
              tolerance_mating_depth: Number(data.tolerance_mating_depth),
              tire_rotation: Number(data.tire_rotation),
              directional_tire_rotation: Number(data.directional_tire_rotation),

              pressure_type_axle: data.pressure_type_axle ? 1 : 0,
              helmet_policy: data.helmet_policy ? 1 : 0,
              tire_condition_axle_type: data.tire_condition_axle_type ? 1 : 0,
              show_alerts_different_assignment:
                data.show_alerts_different_assignment ? 1 : 0,
              send_pressure_setting: data.send_pressure_setting ? 1 : 0,
              operator_edit: data.operator_edit,
              refection_review: data.refection_review ? 1 : 0,
            },
            extras: undefined,
          });
        })}
      >
        <SubsidiaryPolicyUpdateForm form={subsidiaryPolicyUpdateForm} />
      </BaseUpdateModal>
      <BaseContainer title={subsidiaryPolicy.subsidiary?.name}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          <SubsidiaryPolicyTable
            subsidiaryPolicy={subsidiaryPolicy}
            onUpdate={onUpdatePress}
          />
          <Portal elementId={"navTabs"}>
            <TabMenuSubsidiary pageId={0} id={id} />
          </Portal>
        </Container>
      </BaseContainer>
    </>
  );
}
