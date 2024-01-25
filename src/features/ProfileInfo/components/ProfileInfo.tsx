import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import i18next from "i18next";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { BaseCustomModal } from "src/components/modal/BaseCustomModal";
import { useProgressMutation } from "src/hooks/progress";
import { useNotification } from "src/stores/general/notification";
import { LANGUAGE } from "src/utils/constants";

import { updateProfileInfo } from "../api/profileInfoApi";
import {
  ProfileInfoResponse,
  ProfileInfoUpdateData,
} from "../types/profileInfoTypes";
import {
  ProfileInfoUpdateSchemaType,
  profileInfoUpdateDefaultValues,
  profileInfoUpdateSchema,
} from "../validation/updateProfileInfo";
import { ProfileInfoUpdateForm } from "./ProfileInfoUpdateForm";

export { ProfileInfo };

interface ProfileInfoProps {
  handleToggleUpdateProfileModal: (value: boolean) => void;
}

function ProfileInfo({
  handleToggleUpdateProfileModal,
}: ProfileInfoProps): React.ReactElement {
  const { t } = useTranslation();
  const addNotification = useNotification((state) => state.addNotification);

  const profileInfoUpdateForm = useForm({
    defaultValues: profileInfoUpdateDefaultValues,
    resolver: zodResolver(profileInfoUpdateSchema),
  });

  const profileInfoUpdateMutation = useMutation({
    mutationFn: async (data: ProfileInfoUpdateSchemaType) => {
      let updateData: ProfileInfoUpdateData = {
        preferred_language: data.preferred_language,
      };
      if (data.password !== "") {
        updateData = {
          ...updateData,
          password: data.password,
        };
      }
      return await updateProfileInfo(updateData);
    },
    onSuccess: (
      _response: ProfileInfoResponse,
      data: ProfileInfoUpdateSchemaType,
    ) => {
      localStorage.setItem(LANGUAGE, data.preferred_language);
      i18next.changeLanguage(data.preferred_language);
      addNotification({
        message: t("features:profileInfo.messages.profile_updated"),
        code: "",
      });
      // handleToggleUpdateProfileModal(false);
    },
    onError: (error: AxiosError) => {
      const errorData: any = error.response?.data;
      if (errorData.error.message) {
        addNotification({
          message: errorData.error.message,
          code: errorData.error.code,
        });
        return;
      }
      addNotification({
        message: "Error",
        code: "",
      });
    },
  });
  useProgressMutation(profileInfoUpdateMutation, "profileInfoMutation");

  async function onFirstLoad() {
    profileInfoUpdateForm.setValue(
      "preferred_language",
      localStorage.getItem(LANGUAGE) || "es",
    );
  }

  useEffect(() => {
    if (profileInfoUpdateMutation.isSuccess) {
      handleToggleUpdateProfileModal(false);
    }
  }, [profileInfoUpdateMutation.isSuccess]);

  useEffect(() => {
    void onFirstLoad();
  }, []);

  return (
    <BaseCustomModal
      open={true}
      title={t("features:profileInfo.title")}
      onClose={() => handleToggleUpdateProfileModal(false)}
      onConfirm={() => {
        profileInfoUpdateForm.handleSubmit(async (data) => {
          profileInfoUpdateMutation.mutate(data);
        })();
      }}
    >
      <ProfileInfoUpdateForm form={profileInfoUpdateForm} />
    </BaseCustomModal>
  );
}
