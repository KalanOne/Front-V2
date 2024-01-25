import React, { useEffect } from "react";

import { Container } from "@mui/material";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { BaseContainer } from "src/components/common/BaseContainer";
import { CustomPagination } from "src/components/common/CustomPagination";
import { Portal } from "src/components/common/Portal";
import { BaseUpdateModal } from "src/components/modal/BaseUpdateModal";
import {
  useCrud,
  useCrudCustomMutation,
  useCrudMutationF,
  useCrudQuery,
} from "src/hooks/crud";
import { useProgressQuery } from "src/hooks/progress";

import TabMenuSubsidiary from "../../TabMenuSubsidiary";
import {
  getSubsidiary,
  getTireApplication,
  getTolerancePolicy,
  postTolerancePolicy,
} from "../api/policyApi";
import {
  applicationPolicyUpdateDefaultValues,
  applicationPolicyUpdateSchema,
} from "../validation/updateApplicationPolicy";
import { ApplicationPolicyTable } from "./ApplicationPolicyTable";
import { ApplicationPolicyUpdateForm } from "./ApplicationPolicyUpdateForm";

export { ApplicationPolicy };

function ApplicationPolicy(): React.ReactElement {
  const { t } = useTranslation();
  const { id } = useParams();

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
  const policiesQuery = useCrudQuery({
    apiFunction: getTolerancePolicy,
    name: "policies",
    page: crud.page,
    search: crud.search,
    filters: crud.filters,
    keepPrevious: true,
    extras: { id: `${id}` },
  });
  const policies = policiesQuery.data?.data ?? [];

  const tireApplicationQuery = useQuery({
    queryKey: ["tireApplication"],
    queryFn: async () => {
      return await getTireApplication({
        params: {
          scope: "tire_application_id,status",
        },
        extras: undefined,
      });
    },
  });
  const tireApplication = tireApplicationQuery.data ?? [];
  useProgressQuery(tireApplicationQuery, "tireApplication");

  const policyMutation = useCrudMutationF(
    postTolerancePolicy,
    "policies",
    "update",
  );

  const policyUpdateForm = useForm({
    defaultValues: applicationPolicyUpdateDefaultValues,
    resolver: zodResolver(applicationPolicyUpdateSchema),
  });

  function onUpdatePress(policy: any) {
    crud.setCurrent(policy);
    crud.setUpdateModalOpen(true);
  }
  function onUpdate(policy: any) {
    policyUpdateForm.setValue(
      "critical_number_patches",
      policy.critical_number_patches ?? 0,
    );
    policyUpdateForm.setValue(
      "critical_withdrawal",
      policy.critical_withdrawal,
    );
    policyUpdateForm.setValue("good_condition", policy.good_condition);
    policyUpdateForm.setValue(
      "maximum_number_patches",
      policy.maximum_number_patches ?? 0,
    );
    policyUpdateForm.setValue(
      "scheduled_withdrawal",
      policy.scheduled_withdrawal,
    );
    policyUpdateForm.setValue(
      "tire_application_id",
      policy.tire_application_id,
    );
  }

  useEffect(() => {
    if (crud.updateModalOpen) {
      policyUpdateForm.reset();
      onUpdate(crud.current);
    }
  }, [crud.updateModalOpen]);

  return (
    <>
      <BaseUpdateModal
        open={crud.updateModalOpen}
        title={t("titles:update.company_policy")}
        onClose={() => crud.setUpdateModalOpen(false)}
        onConfirm={() => {
          policyUpdateForm.handleSubmit((data) => {
            // console.log(data);
            policyMutation.mutate({
              id: crud.current.subsidiary_id,
              data: {
                critical_number_patches: data.critical_number_patches,
                critical_withdrawal: data.critical_withdrawal,
                good_condition: data.good_condition,
                maximum_number_patches: data.maximum_number_patches,
                scheduled_withdrawal: data.scheduled_withdrawal,
                tire_application_id: data.tire_application_id,
              },
              extras: {
                id: crud.current.depth_tolerance_policy_id,
              },
            });
            crud.setUpdateModalOpen(false);
          })();
        }}
      >
        <ApplicationPolicyUpdateForm
          form={policyUpdateForm}
          tireApplications={tireApplication}
        />
      </BaseUpdateModal>
      <BaseContainer title={subsidiary ? subsidiary.name : ""}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          <ApplicationPolicyTable
            policies={policies}
            onUpdate={onUpdatePress}
          />
          <CustomPagination
            page={crud.page}
            onChange={(_event, page) => crud.setPage(page)}
            totalPages={policiesQuery.data?.last_page ?? 1}
          />
          <Portal elementId={"navTabs"}>
            <TabMenuSubsidiary pageId={1} id={id} />
          </Portal>
        </Container>
      </BaseContainer>
    </>
  );
}
