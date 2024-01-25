import {
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

import { CardHeaderGradient } from "src/components/common/CustomCard";
import {
  TableBodyCell,
  TableHeaderCellBlack,
} from "src/components/common/CustomTable";
import { TableTitle } from "src/components/common/TableTitle";

import {
  DamageAlertsPanelResponseTable,
  MountAlertsPanelResponseTable,
  TireAlertsPanelResponseTable,
  VehicleAlertsPanelResponseTable,
  WearAlertsPanelResponseTable,
} from "../types/alertspanelTypes";

export { AlertsPanelTable };

interface AlertsPanelTableProps {
  title: string;
  priority: string;
  data:
    | TireAlertsPanelResponseTable[]
    | VehicleAlertsPanelResponseTable[]
    | MountAlertsPanelResponseTable[]
    | DamageAlertsPanelResponseTable[]
    | WearAlertsPanelResponseTable[];
}

function AlertsPanelTable({ title, priority, data }: AlertsPanelTableProps) {
  const { t } = useTranslation();

  let tableHeader = null;
  let tableBody = null;
  let header = null;

  if (Array.isArray(data) && data.length > 0) {
    const firstItem = data[0];
    if ("real_position" in firstItem && !("tire_review_id" in firstItem)) {
      tableHeader = (
        <>
          <TableHeaderCellBlack>{t("labels:date.label")}</TableHeaderCellBlack>
          <TableHeaderCellBlack>{t("labels:code")}</TableHeaderCellBlack>
          <TableHeaderCellBlack>
            {t("labels:location.label")}
          </TableHeaderCellBlack>
          <TableHeaderCellBlack>{t("general:position")}</TableHeaderCellBlack>
        </>
      );
      const dataTire = data as TireAlertsPanelResponseTable[];
      tableBody = dataTire.map((alert, index) => (
        <TableRow key={index}>
          <TableBodyCell>{`${dayjs(alert.created_at).format(
            "LLL",
          )}`}</TableBodyCell>
          <TableBodyCell>{alert.code}</TableBodyCell>
          <TableBodyCell>{alert.location}</TableBodyCell>
          <TableBodyCell>{alert.real_position}</TableBodyCell>
        </TableRow>
      ));
      //   return "Tire";
    } else if ("economic_number" in firstItem) {
      tableHeader = (
        <>
          <TableHeaderCellBlack>{t("labels:date.label")}</TableHeaderCellBlack>
          <TableHeaderCellBlack>
            {t("labels:economic_number")}
          </TableHeaderCellBlack>
          <TableHeaderCellBlack>{t("labels2:type")}</TableHeaderCellBlack>
        </>
      );
      const dataVehicle = data as VehicleAlertsPanelResponseTable[];
      tableBody = dataVehicle.map((alert, index) => (
        <TableRow key={index}>
          <TableBodyCell>{`${dayjs(alert.created_at).format(
            "LLL",
          )}`}</TableBodyCell>
          <TableBodyCell>{alert.economic_number}</TableBodyCell>
          <TableBodyCell>{alert.TYPE}</TableBodyCell>
        </TableRow>
      ));
      //   return "Vehicle";
    } else if ("tire_review_date" in firstItem) {
      tableHeader = (
        <>
          <TableHeaderCellBlack>{t("labels:date.label")}</TableHeaderCellBlack>
          <TableHeaderCellBlack>{t("labels:code")}</TableHeaderCellBlack>
          <TableHeaderCellBlack>
            {t("labels:location.label")}
          </TableHeaderCellBlack>
          <TableHeaderCellBlack>{t("general:position")}</TableHeaderCellBlack>
        </>
      );
      const dataMount = data as MountAlertsPanelResponseTable[];
      tableBody = dataMount.map((alert, index) => (
        <TableRow key={index}>
          <TableBodyCell>{`${dayjs(alert.created_at).format(
            "LLL",
          )}`}</TableBodyCell>
          <TableBodyCell>{alert.code}</TableBodyCell>
          <TableBodyCell>{alert.location}</TableBodyCell>
          <TableBodyCell>{alert.real_position}</TableBodyCell>
        </TableRow>
      ));
      //   return "Mount";
    } else if ("tire_damage_id" in firstItem) {
      tableHeader = (
        <>
          <TableHeaderCellBlack>
            {t("labels:registered_by")}
          </TableHeaderCellBlack>
          <TableHeaderCellBlack>{t("labels:code")}</TableHeaderCellBlack>
          <TableHeaderCellBlack>{t("common:comment")}</TableHeaderCellBlack>
        </>
      );
      const dataDamage = data as DamageAlertsPanelResponseTable[];
      tableBody = dataDamage.map((alert, index) => (
        <TableRow key={index}>
          <TableBodyCell>{`${alert.created_by.name} ${
            alert.created_by.last_name_1
          } ${alert.created_by.last_name_2 || ""} ${dayjs(
            alert.created_at,
          ).format("LLL")}`}</TableBodyCell>
          <TableBodyCell>{alert.code}</TableBodyCell>
          <TableBodyCell>{alert.comment}</TableBodyCell>
        </TableRow>
      ));
      header = t("common:damage_plural");
      //   return "Damage";
    } else if ("tire_wear_id" in firstItem) {
      tableHeader = (
        <>
          <TableHeaderCellBlack>
            {t("labels:registered_by")}
          </TableHeaderCellBlack>
          <TableHeaderCellBlack>{t("labels:code")}</TableHeaderCellBlack>
          <TableHeaderCellBlack>{t("common:comment")}</TableHeaderCellBlack>
        </>
      );
      const dataWear = data as WearAlertsPanelResponseTable[];
      tableBody = dataWear.map((alert, index) => (
        <TableRow key={index}>
          <TableBodyCell>{`${alert.created_by.name} ${
            alert.created_by.last_name_1
          } ${alert.created_by.last_name_2 || ""} ${dayjs(
            alert.created_at,
          ).format("LLL")}`}</TableBodyCell>
          <TableBodyCell>{alert.code}</TableBodyCell>
          <TableBodyCell>{alert.comment}</TableBodyCell>
        </TableRow>
      ));
      header = t("general:wears");
      //   return "Wear";
    }
  }

  return (
    <Card>
      <CardHeaderGradient title={header || t("common:alert_plural")} />
      <CardContent>
        <TableContainer component={Paper} sx={{ maxHeight: "400px" }}>
          <TableTitle
            title={title}
            typoSx={{
              fontSize: 15,
              fontWeight: "bold",
            }}
            sx={{
              marginTop: 0,
              paddingBottom: 2,
              paddingTop: 2,
              backgroundColor:
                priority === "HIGH"
                  ? "rgba(255, 0, 0, 0.85)"
                  : priority === "HALF"
                  ? "rgba(250, 175, 0, 0.85)"
                  : priority === "LOW"
                  ? "rgba(0, 128, 40, 0.85)"
                  : "#002849",
            }}
          />
          <Table stickyHeader>
            {/* <Table> */}
            <TableHead>
              <TableRow>{tableHeader}</TableRow>
            </TableHead>
            <TableBody>
              {/* {tires.map((tire) => (
                <TableRow key={tire.code}>
                  <TableBodyCell>{`${dayjs(tire.date_send).format(
                    "LL",
                  )}`}</TableBodyCell>
                  <TableBodyCell>{`${dayjs().diff(
                    dayjs(tire["date_send"]).format("YYYY-MM-DD"),
                    "days",
                  )}`}</TableBodyCell>
                  <TableBodyCell>{tire.code}</TableBodyCell>
                  <TableBodyCell>{tire.subsidiary_tire_name}</TableBodyCell>
                </TableRow>
              ))} */}
              {tableBody}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
