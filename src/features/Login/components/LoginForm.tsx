import React from "react";

import { Box, Button, Stack } from "@mui/material";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import { FormTextInput } from "src/components/form/FormTextInput.tsx";
import { useProgressMutation } from "src/hooks/progress.tsx";
import { useNotification } from "src/stores/general/notification.ts";
import { USER_TOKEN, WORK_AREA_NAME } from "src/utils/constants.ts";

import { login } from "../api/login.ts";
import {
  LoginSchemaType,
  loginDefaultValues,
  loginSchema,
} from "../validation/loginValidation.ts";

export { LoginForm };

function LoginForm(): React.ReactElement {
  const { t } = useTranslation();

  const methods = useForm({
    defaultValues: loginDefaultValues,
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();
  const addNotification = useNotification((state) => state.addNotification);

  const loginMutation = useMutation({
    mutationFn: async (data: LoginSchemaType) => {
      return await login(data);
    },
    onSuccess: (token: string) => {
      localStorage.setItem(USER_TOKEN, token);
      localStorage.setItem(WORK_AREA_NAME, "Subsidiary");
      addNotification({
        message: t("features:login.messages.login"),
        code: "",
      });
      navigate("/");
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
        message: t("features:login.messages.error"),
        code: "",
      });
    },
  });

  useProgressMutation(loginMutation, "loginMutation");

  return (
    <FormProvider {...methods}>
      <Box
        component={"form"}
        onSubmit={methods.handleSubmit((data: LoginSchemaType) => {
          loginMutation.mutate(data);
        })}
      >
        <FormTextInput
          sx={{ mt: 3, width: "100%" }}
          name={"email"}
          type={"email"}
          label={`${t("labels:email")} *`}
        />
        <FormTextInput
          sx={{ mt: 3, width: "100%" }}
          name={"password"}
          type={"password"}
          label={`${t("labels:password")} *`}
        />
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          sx={{ mt: 2 }}
        >
          <Link to={"/recovery/password"}>
            <Button variant={"contained"}>
              {t("features:login.form.change_password_button")}
            </Button>
          </Link>
          <Button variant={"contained"} type={"submit"}>
            {t("features:login.form.enter_button")}
          </Button>
        </Stack>
      </Box>
    </FormProvider>
  );
}
