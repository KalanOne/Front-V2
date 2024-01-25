import { Grid, TableRow } from "@mui/material";

import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { CustomButton } from "src/components/common/CustomButton";
import { TableBodyCell } from "src/components/common/CustomTable";
import { FormTextInput } from "src/components/form/FormTextInput";
import { formatter } from "src/utils/formatters";

import {
  VehicleReviewUpdateData,
  VehicleReviewUpdateResponse,
} from "../types/vehicleReviewUpdateTypes";
import {
  vehicleReviewUpdateDefaultValues,
  vehicleReviewUpdateSchema,
} from "../validation/updateVehicleReview";

export { VehicleReviewUpdateTableRow };

interface VehicleReviewUpdateTableRowProps {
  vehicleReviewUpdate: VehicleReviewUpdateResponse;
  review: number;
  index: number;
  onUpdatePress: (vehicleReviewUpdate: VehicleReviewUpdateData) => void;
}

function VehicleReviewUpdateTableRow({
  vehicleReviewUpdate,
  review,
  index,
  onUpdatePress,
}: VehicleReviewUpdateTableRowProps) {
  const { t } = useTranslation();
  const vehicleReviewUpdateForm = useForm({
    defaultValues: vehicleReviewUpdateDefaultValues,
    resolver: zodResolver(vehicleReviewUpdateSchema),
  });

  return (
    <TableRow sx={[index % 2 == 0 ? { backgroundColor: "#ededed" } : null]}>
      <TableBodyCell>{review}</TableBodyCell>
      <TableBodyCell>
        {dayjs(vehicleReviewUpdate.date).format("YYYY-MM-DD hh:mm:ss A")}
      </TableBodyCell>
      <TableBodyCell>
        {`${formatter.format(vehicleReviewUpdate.odometer)} km`}
      </TableBodyCell>
      <TableBodyCell>
        <FormProvider {...vehicleReviewUpdateForm}>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <FormTextInput
                sx={{ width: "100%", margin: 0.5, marginTop: 2 }}
                name={"odometer"}
                //   label={"Medida"}
                inputProps={{ type: "number" }}
              />
            </Grid>
            <Grid item xs={true}>
              <CustomButton
                onClick={vehicleReviewUpdateForm.handleSubmit(async (data) => {
                  const newData = {
                    odometerId: vehicleReviewUpdate.vehicle_review_id,
                    odometer: parseInt(data.odometer),
                  };
                  onUpdatePress(newData);
                  vehicleReviewUpdateForm.reset();
                })}
                text={t("buttons:edit")}
              />
            </Grid>
          </Grid>
        </FormProvider>
      </TableBodyCell>
    </TableRow>
  );
}
