import React, { useEffect } from "react";

import { Divider, Grid, MenuItem } from "@mui/material";

import {
  FormProvider,
  UseFieldArrayReturn,
  UseFormReturn,
  useWatch,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

import { AddButton } from "src/components/common/AddButton";
import { LabelAndText } from "src/components/common/LabelAndText";
import { RemoveButton } from "src/components/common/RemoveButton";
import { FormCheckboxInput } from "src/components/form/FormCheckboxInput";
import { FormDateInput } from "src/components/form/FormDateInput";
import { FormSelectInput } from "src/components/form/FormSelectInput";
import { FormTextInput } from "src/components/form/FormTextInput";

import { useWareHouseDependencies } from "../../hooks/dependenciesWareHouse";
import { DriverInput, WareHouseInput } from "../../types/inputTypes";
import { TireResponse } from "../../types/tireTypes";
import { SendToWareHouseRepairSchemaType } from "../../validation/senToWareHouseRepair";

export { ButtonWareHouseRepairForm };

interface ButtonWareHouseRepairFormProps {
  form: UseFormReturn<SendToWareHouseRepairSchemaType>;
  tire?: TireResponse;
  sendToWareHouseRepairButtonArrayForm: UseFieldArrayReturn;
}

function ButtonWareHouseRepairForm({
  form,
  tire,
  sendToWareHouseRepairButtonArrayForm,
}: ButtonWareHouseRepairFormProps): React.ReactElement {
  const { t } = useTranslation();
  const dependencies = useWareHouseDependencies();

  const [repair_detail, surcharge] = useWatch({
    control: form.control,
    name: ["repair_detail", "surcharge"],
  });

  useEffect(() => {
    if (repair_detail) {
      sendToWareHouseRepairButtonArrayForm.append({
        repair_name: "",
        price: 0,
      });
    } else {
      sendToWareHouseRepairButtonArrayForm.replace([]);
    }
  }, [repair_detail]);
  useEffect(() => {
    if (surcharge <= 0) {
      form.setValue("driver_id", "");
      form.setValue("surcharge_item", "");
    }
  }, [surcharge]);
  return (
    <FormProvider {...form}>
      <Grid container spacing={1}>
        {tire && (
          <>
            <Grid item xs={6}>
              <LabelAndText
                label={t("labels:code")}
                text={tire.code || "-"}
              ></LabelAndText>
            </Grid>
            <Grid item xs={6}>
              <LabelAndText
                label={"Condicion"}
                text={tire.cycle.tire_condition_id || "-"}
              ></LabelAndText>
            </Grid>

            <Grid item xs={4}>
              <LabelAndText
                label={t("common:brand")}
                text={tire.cycle.variation.tire_model.brand.name}
              ></LabelAndText>
            </Grid>
            <Grid item xs={4}>
              <LabelAndText
                label={t("common:model")}
                text={tire.cycle.variation.tire_model.name}
              ></LabelAndText>
            </Grid>
            <Grid item xs={4}>
              <LabelAndText
                label={t("common:size")}
                text={`${tire.cycle.variation.tire_size.size}`}
              ></LabelAndText>
            </Grid>
          </>
        )}

        <Grid item xs={12}>
          <FormSelectInput name={"warehouse_id"} label={t("common:warehouse")}>
            {dependencies.warehouses?.map((warehouse: WareHouseInput) => (
              <MenuItem
                key={warehouse.warehouse_id}
                value={warehouse.warehouse_id}
                disabled={warehouse.status === 0}
              >
                {`${warehouse.name} | ${warehouse.subsidiary.name}`}
              </MenuItem>
            ))}
          </FormSelectInput>
        </Grid>

        <Grid item xs={12}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"price"}
            label={t("labels:price")}
            inputProps={{ type: "number" }}
          />
        </Grid>

        <Grid item xs={12}>
          <FormDateInput
            name={"date_return"}
            label={t("labels:invoice_date")}
          />
        </Grid>

        <Grid item xs={12}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"comment"}
            label={"Comentario"}
          />
        </Grid>

        <Grid item xs={6}>
          <FormDateInput
            name={"invoice_date"}
            label={t("labels:invoice_date")}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"invoice_folio"}
            label={t("labels:invoice_folio")}
          />
        </Grid>
        <Grid item xs={12}>
          <FormTextInput
            sx={{ width: "100%" }}
            name={"surcharge"}
            label={t("labels:surcharge")}
            inputProps={{ type: "number" }}
          />
        </Grid>
        {surcharge > 0 && (
          <>
            <Grid item xs={12}>
              <FormSelectInput name={"driver_id"} label={t("common:driver")}>
                {dependencies.drivers?.map((driver: DriverInput) => (
                  <MenuItem
                    key={driver.driver_id}
                    value={driver.driver_id}
                    disabled={driver.status === 0}
                  >
                    {driver.name}
                  </MenuItem>
                ))}
              </FormSelectInput>
            </Grid>
            <Grid item xs={12}>
              <FormSelectInput
                name={"surcharge_item"}
                label={t("labels:surcharge_item.label")}
              >
                <MenuItem value={"OPERATION"}>{"Operación"}</MenuItem>
              </FormSelectInput>
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <FormCheckboxInput
            name={"repair_detail"}
            label={t("labels:repair_detail")}
          />
        </Grid>
        {repair_detail &&
          sendToWareHouseRepairButtonArrayForm.fields.map((field, index) => {
            return (
              <React.Fragment key={field.id}>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <FormSelectInput
                      name={`repairs.${index}.repair_name`}
                      label={t("labels:surcharge_item.label")}
                    >
                      <MenuItem value={"PATCH"}>{"Parche"}</MenuItem>
                    </FormSelectInput>
                  </Grid>
                  <Grid item xs={6}>
                    <FormTextInput
                      sx={{ width: "100%" }}
                      name={`repairs.${index}.price`}
                      label={t("labels:price")}
                      inputProps={{ type: "number" }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {index > 0 && (
                      <RemoveButton
                        onClick={() =>
                          sendToWareHouseRepairButtonArrayForm.remove(index)
                        }
                      />
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <Divider light sx={{ fontWeight: "bold", my: 1 }} />
                  </Grid>
                </Grid>
              </React.Fragment>
            );
          })}
        {repair_detail && (
          <AddButton
            onClick={() =>
              sendToWareHouseRepairButtonArrayForm.append({
                repair_name: "",
                price: 0,
              })
            }
          />
        )}
      </Grid>
    </FormProvider>
  );
}
