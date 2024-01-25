import React, { useEffect } from "react";

import { Grid, MenuItem } from "@mui/material";

import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FormSelectInput } from "src/components/form/FormSelectInput.tsx";
import { useIdentity } from "src/stores/general/identity.ts";
import { arrayJoin } from "src/utils/array.ts";
import {
  WORK_AREA,
  WORK_AREA_ID,
  WORK_AREA_NAME,
} from "src/utils/constants.ts";

export { WorkArea };

function WorkArea(): React.ReactElement {
  const { t } = useTranslation();
  const methods = useForm({
    defaultValues: {
      subsidiary_id: -1,
    },
  });
  const account = useIdentity((state) => state.account);
  const setWorkArea = useIdentity((state) => state.setWorkArea);
  const subsidiary_id = methods.watch("subsidiary_id");

  useEffect(() => {
    if (subsidiary_id > 0) {
      const subsidiary = account?.subsidiaries.find(
        (subsidiary) => subsidiary.subsidiary_id === subsidiary_id,
      );
      if (!subsidiary) {
        return;
      }
      const workArea = {
        key: `${subsidiary.user_assigned_subsidiary_id}-Subsidiary`,
        id: subsidiary.user_assigned_subsidiary_id,
        name: `${subsidiary.subsidiary.company.name} - ${subsidiary.subsidiary.name}`,
        company: subsidiary.subsidiary.company.name,
        status: subsidiary.subsidiary.status,
        area: "Subsidiary",
        roles: arrayJoin(
          subsidiary.role.map((role) =>
            t(`_general.role.${role.role.toLowerCase()}`),
          ),
          ", ",
          ` ${t("_general.text.and")} `,
        ),
      };
      localStorage.setItem(WORK_AREA, JSON.stringify(workArea));
      localStorage.setItem(WORK_AREA_ID, `${workArea.id}`);
      localStorage.setItem(WORK_AREA_NAME, workArea.area);
      setWorkArea(workArea);
    }
  }, [subsidiary_id]);

  return (
    <FormProvider {...methods}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormSelectInput
            name={"subsidiary_id"}
            label={"Espacio de Trabajo"}
            sx={{
              minWidth: "400px",
            }}
          >
            {account?.subsidiaries.map((subsidiary) => (
              <MenuItem
                key={subsidiary.subsidiary_id}
                value={subsidiary.subsidiary_id}
                disabled={subsidiary.subsidiary.status === 0}
              >
                {`${subsidiary.subsidiary.company.name} - ${subsidiary.subsidiary.name}`}
              </MenuItem>
            ))}
          </FormSelectInput>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
