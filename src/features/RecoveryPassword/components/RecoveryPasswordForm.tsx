import { Box, Button, Stack } from "@mui/material";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { FormTextInput } from "src/components/form/FormTextInput";
import { useProgressMutation } from "src/hooks/progress";
import { useNotification } from "src/stores/general/notification.ts";
import { MessageResponse } from "src/types/response";

import { recoveryPassword } from "../api/recoveryPasswordApi";
import {
  RecoveryPasswordSchemaType,
  recoveryPasswordDefaultValues,
  recoveryPasswordSchema,
} from "../validation/recoveryPassword";

export { RecoveryPasswordForm };

function RecoveryPasswordForm() {
  const { t } = useTranslation();
  const addNotification = useNotification((state) => state.addNotification);

  const RecoveryPasswordForm = useForm({
    defaultValues: recoveryPasswordDefaultValues,
    resolver: zodResolver(recoveryPasswordSchema),
  });

  const recoveryPasswordMutation = useMutation({
    mutationFn: async (data: RecoveryPasswordSchemaType) => {
      return await recoveryPassword(data);
    },
    onSuccess: (response: MessageResponse) => {
      addNotification({
        message: response.message,
        code: response.code,
      });
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

  useProgressMutation(recoveryPasswordMutation, "recoveryPasswordMutation");

  return (
    <FormProvider {...RecoveryPasswordForm}>
      <Box
        component={"form"}
        onSubmit={RecoveryPasswordForm.handleSubmit(
          (data: RecoveryPasswordSchemaType) => {
            recoveryPasswordMutation.mutate(data);
          },
        )}
      >
        <FormTextInput
          sx={{ mt: 3, width: "100%" }}
          name={"email"}
          type={"email"}
          label={`${t("labels:email")} *`}
        />
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          sx={{ mt: 2 }}
        >
          <Link to={"/login"}>
            <Button variant={"contained"}>
              {t("features:recoveryPassword.form.back_button")}
            </Button>
          </Link>
          <Button variant={"contained"} type={"submit"}>
            {t("features:recoveryPassword.form.enter_button")}
          </Button>
        </Stack>
      </Box>
    </FormProvider>
  );
}
