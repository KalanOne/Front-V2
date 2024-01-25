import { http } from "src/api/api.ts";

import {
  AlertsPanelResponse,
  AlertsPanelResponseGraphics,
  DamageAlertsPanelResponseTable,
  MountAlertsPanelResponseTable,
  TireAlertsPanelResponseTable,
  VehicleAlertsPanelResponseTable,
  WearAlertsPanelResponseTable,
} from "../types/alertspanelTypes";

export { getAlertsPanel, getAlertsPanelGraphics, getAlertsPanelTable };

async function getAlertsPanel(params?: any): Promise<AlertsPanelResponse> {
  return await http<AlertsPanelResponse>({
    method: "GET",
    path: "report/alert",
    params: params,
  });
}

async function getAlertsPanelGraphics(
  idObject: { id: number; type: string },
  params?: any,
): Promise<AlertsPanelResponseGraphics[]> {
  return await http<AlertsPanelResponseGraphics[]>({
    method: "GET",
    path: `report/alert/history/${idObject.id}/${idObject.type}`,
    params: params,
  });
}

async function getAlertsPanelTable(
  idObject: { id: number; type: string },
  params?: any,
): Promise<
  | TireAlertsPanelResponseTable[]
  | VehicleAlertsPanelResponseTable[]
  | MountAlertsPanelResponseTable[]
  | DamageAlertsPanelResponseTable[]
  | WearAlertsPanelResponseTable[]
> {
  return await http<
    | TireAlertsPanelResponseTable[]
    | VehicleAlertsPanelResponseTable[]
    | MountAlertsPanelResponseTable[]
    | DamageAlertsPanelResponseTable[]
    | WearAlertsPanelResponseTable[]
  >({
    method: "GET",
    path: `report/alert/details/${idObject.id}/${idObject.type}`,
    params: params,
  });
}

// report/alert/history/4/tire
// report/alert/history/21/vehicle
// report/alert/history/13/mount
// report/alert/history/80/damages
// report/alert/history/23/wear

// report/alert/details/4/tire
// report/alert/details/21/vehicle
// report/alert/details/13/mount
// report/alert/details/80/damages
// report/alert/details/23/wear
