import React, { useEffect, useState } from "react";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import BarChartIcon from "@mui/icons-material/BarChart";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BrokenImageIcon from "@mui/icons-material/BrokenImage";
import BuildIcon from "@mui/icons-material/Build";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
// import DriveEtaIcon from "@mui/icons-material/DriveEta";
import EditIcon from "@mui/icons-material/Edit";
import ErrorIcon from "@mui/icons-material/Error";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import LoopIcon from "@mui/icons-material/Loop";
import MovingIcon from "@mui/icons-material/Moving";
import PaidIcon from "@mui/icons-material/Paid";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import SettingsIcon from "@mui/icons-material/Settings";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SpeedIcon from "@mui/icons-material/Speed";
import StraightenIcon from "@mui/icons-material/Straighten";
import StreetviewIcon from "@mui/icons-material/Streetview";
import TrafficIcon from "@mui/icons-material/Traffic";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ViewAgendaIcon from "@mui/icons-material/ViewAgenda";
import WidgetsIcon from "@mui/icons-material/Widgets";
import {
  Box,
  Collapse,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIcon,
  SxProps,
  Tooltip,
  Typography,
} from "@mui/material";

import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import {
  addFavoriteReport,
  deleteFavoriteReport,
  getFavoriteReports,
  logout,
} from "src/features/Login/api/login";
import { FavoriteReportUser } from "src/features/Login/types/favoriteReportsTypes";
import { ProfileInfo } from "src/features/ProfileInfo";
import { useProgressMutation, useProgressQuery } from "src/hooks/progress";
import useFavoriteReportStore from "src/stores/general/favoriteReportsStore";
import { useNotification } from "src/stores/general/notification";
import { MessageResponse } from "src/types/response";
import { USER_TOKEN, WORK_AREA_NAME } from "src/utils/constants";

import { TireIcon } from "../customIcons/TireIcon";

export { NavigationDrawer };

function getFavoriteIcon(name: string) {
  switch (name) {
    case "report_tire_pile_depth":
      return <ViewAgendaIcon />;
    case "report_tire_pile_travel":
      return <SpeedIcon />;
    case "report_tire_statistics":
      return <TireIcon />;
    case "report_km_performance":
      return <TrendingUpIcon />;
    case "report_km_projection":
      return <TrendingUpIcon />;
    case "report_tire_summary":
      return <ViewAgendaIcon />;
    case "report_km_dynamic_cost":
      // return <MonetizationOnOutlinedIcon />; // TODO: Change icon
      return <AttachMoneyIcon />;
    case "report_renewability_index":
      return <AutorenewIcon />;
    case "report_review_performance":
      return <AutorenewIcon />;
    case "report_tire_po_savings":
      return <AutorenewIcon />;
    case "report_tire_damage_wear":
      return <ViewAgendaIcon />;
    case "report_tire_warehouse":
      return <ViewAgendaIcon />;
    case "report_user_review":
      return <GroupAddIcon />;
    case "report_purchase":
      return <ShoppingCartIcon />;
    case "report_last_movement":
      return <TrendingDownIcon />;
    case "report_vehicle_semaphore":
      return <TrafficIcon />;
    case "report_tire_revitalized":
      // return <TireRevitalizedIcon />;
      return <TrendingUpIcon />; // TODO: Change icon
    case "report_tire_repair":
      return <BuildIcon />;
    case "report_tire_mount":
      // return <TireRevitalizedIcon />;
      return <TrendingUpIcon />; // TODO: Change icon
    case "report_summary_warehouse":
      return <ViewAgendaIcon />;
    default:
      return <TireIcon />;
  }
}

interface NavigationDrawerItemProps {
  name: string;
  children?: React.ReactNode;
  endIcon?: React.ReactNode;
  divider?: boolean;
  onClick?: () => void;
  to?: string;
  favoriteName?: string;
}

/**
 * Item to be displayed in the navigation drawer.
 *
 * @param name Name of the item
 * @param children Icon to be displayed at the beginning of the item
 * @param endIcon Icon to be displayed at the end of the item
 * @param divider Whether to display a divider at the bottom of the item
 * @param onClick Function to be executed when the item is clicked
 * @param to Path to navigate to when the item is clicked
 */
function NavigationDrawerItem({
  name,
  children,
  endIcon,
  divider,
  onClick,
  to,
  favoriteName,
}: NavigationDrawerItemProps): React.ReactElement {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const favoriteReportsList = useFavoriteReportStore(
    (state) => state.favoriteReportsList,
  );
  const addFavorite = useFavoriteReportStore(
    (state) => state.addFavoriteReport,
  );
  const removeFavoriteReport = useFavoriteReportStore(
    (state) => state.removeFavoriteReport,
  );
  const addNotification = useNotification((state) => state.addNotification);

  function handleClick() {
    if (onClick) {
      onClick();
    }
    if (to) {
      navigate(to);
    }
  }

  const addMutation = useMutation({
    mutationFn: async (name: string) => {
      return await addFavoriteReport(name);
    },
    onSuccess: (response: FavoriteReportUser) => {
      addFavorite(response);
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
  useProgressMutation(addMutation, "addMutation");

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return await deleteFavoriteReport(id);
    },
    onSuccess: (response: MessageResponse, id: number) => {
      addNotification({
        message: response.message,
        code: response.code,
      });
      removeFavoriteReport(id);
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

  useProgressMutation(deleteMutation, "deleteMutation");

  function checkIsFavorite() {
    return favoriteReportsList.some(
      (favorite) =>
        favorite.favorite_report.favorite_report_name === favoriteName,
    );
  }

  const isFavorite = checkIsFavorite();

  function handleRegisterFavorite(name: string) {
    addMutation.mutate(name);
  }

  function handleDeleteFavorite(id: number) {
    deleteMutation.mutate(id, {
      onSuccess: () => {},
    });
  }

  return (
    <ListItemButton onClick={handleClick} divider={!divider}>
      {children && <ListItemIcon>{children}</ListItemIcon>}
      <ListItemText primary={name} />
      {endIcon && (
        <ListItemIcon style={{ justifyContent: "flex-end" }}>
          {endIcon}
        </ListItemIcon>
      )}
      {favoriteName && (
        <Tooltip
          title={
            isFavorite ? t("labels:remove_favorite") : t("labels:save_favorite")
          }
        >
          <ListItemIcon
            style={{
              justifyContent: "flex-end",
              minWidth: "0px",
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (!isFavorite) {
                handleRegisterFavorite(favoriteName);
              } else {
                const favorite = favoriteReportsList.find(
                  (favorite: FavoriteReportUser) =>
                    favorite.favorite_report.favorite_report_name ===
                    favoriteName,
                );
                if (!favorite) {
                  return;
                }
                const favoriteId = favorite.favorite_report_user_id;
                handleDeleteFavorite(favoriteId);
              }
            }}
          >
            {isFavorite ? (
              <BookmarkIcon
                style={{
                  color: "#FFC107",
                }}
              />
            ) : (
              <BookmarkBorderIcon />
            )}
          </ListItemIcon>
        </Tooltip>
      )}
    </ListItemButton>
  );
}

interface NavigationDrawerProps {
  open: boolean;
  onClose: () => void;
  sx?: SxProps;
}

/**
 * Navigation drawer to be displayed in the application as a sidebar.
 *
 * @param open Whether the drawer is open
 * @param onClose Function to be executed when the drawer is closed
 * @param sx Style props
 */
function NavigationDrawer({
  open,
  onClose,
  sx,
}: NavigationDrawerProps): React.ReactElement {
  const [openControlSubmenu, setOpenControlSubmenu] = useState(false);
  const [openAreasSubmenu, setOpenAreasSubmenu] = useState(false);
  const [openAdministracionSubmenu, setOpenAdministracionSubmenu] =
    useState(false);
  const [openFavoriteReportsSubmenu, setOpenFavoriteReportsSubmenu] =
    useState(false);
  const [openReportsSubmenu, setOpenReportsSubmenu] = useState(false);
  const [openAlertsSubmenu, setOpenAlertsSubmenu] = useState(false);
  const [openVehiclesSubmenu, setOpenVehiclesSubmenu] = useState(false);
  const [openUpdateProfileModal, setOpenUpdateProfileModal] = useState(false);
  const [openPileReport, setOpenPileReport] = useState(false);
  const { t } = useTranslation();
  const addNotification = useNotification((state) => state.addNotification);
  const navigate = useNavigate();
  const favoriteReportsList = useFavoriteReportStore(
    (state) => state.favoriteReportsList,
  );
  const setFavoriteReports = useFavoriteReportStore(
    (state) => state.setFavoriteReports,
  );

  function handleToggleControlSubmenu() {
    setOpenControlSubmenu(!openControlSubmenu);
  }

  function handleToggleAreasSubmenu() {
    setOpenAreasSubmenu(!openAreasSubmenu);
  }

  function handleToggleAdministracionSubmenu() {
    setOpenAdministracionSubmenu(!openAdministracionSubmenu);
  }
  function handleToggleFavoriteReportsSubmenu() {
    setOpenFavoriteReportsSubmenu(!openFavoriteReportsSubmenu);
  }
  function handleToggleReportSubmenu() {
    setOpenReportsSubmenu(!openReportsSubmenu);
  }
  function handleToggleAlertsSubmenu() {
    setOpenAlertsSubmenu(!openAlertsSubmenu);
  }
  function handleToggleVehiclesSubmenu() {
    setOpenVehiclesSubmenu(!openVehiclesSubmenu);
  }

  function handleToggleUpdateProfileModal(value: boolean) {
    setOpenUpdateProfileModal(value);
  }

  function handleTogglePileReport() {
    setOpenPileReport(!openPileReport);
  }

  const logoutMutation = useMutation({
    mutationFn: async () => {
      return await logout();
    },
    onSuccess: (response: any) => {
      localStorage.removeItem(USER_TOKEN);
      localStorage.removeItem(WORK_AREA_NAME);
      // console.log(response); // TODO: Remove this line for the change language
      addNotification({
        message: "Sesion cerrada",
        code: "",
      });
      navigate("/login");
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

  useProgressMutation(logoutMutation, "logoutMutation");

  const favoriteReportsQuery = useQuery({
    queryKey: ["favoriteReports"],
    queryFn: async () => {
      return await getFavoriteReports();
    },
  });
  const favoriteReports = favoriteReportsQuery.data ?? undefined;
  useProgressQuery(favoriteReportsQuery, "favoriteReports");

  useEffect(() => {
    if (favoriteReports && favoriteReportsList.length === 0) {
      setFavoriteReports(favoriteReports);
    }
  }, [favoriteReports]);

  return (
    <>
      {openUpdateProfileModal && (
        <ProfileInfo
          handleToggleUpdateProfileModal={handleToggleUpdateProfileModal}
        />
      )}
      <Drawer open={open} onClose={onClose} sx={sx}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "8px 16px",
          }}
        >
          <Box
            sx={{
              width: "calc(100% - 56px)",
            }}
          >
            <Typography noWrap variant="h6">
              Usuario
            </Typography>
            <Typography noWrap variant="body1" color="textSecondary">
              Email
            </Typography>
          </Box>
          <IconButton
            sx={{ ml: 6 }}
            onClick={() => handleToggleUpdateProfileModal(true)}
          >
            <EditIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            height: "100%",
            maxWidth: "275px",
          }}
        >
          <Box
            sx={{
              overflow: "auto",
              maxHeight: "calc(100vh - 165px)",
            }}
          >
            <List disablePadding>
              <NavigationDrawerItem
                name={t("general:alerts_panel")}
                to={"/alert/home"}
              >
                <ErrorIcon />
              </NavigationDrawerItem>
            </List>
            <List disablePadding>
              <NavigationDrawerItem
                name={"Alertas"}
                onClick={handleToggleAlertsSubmenu}
                endIcon={openAlertsSubmenu ? <ExpandLess /> : <ExpandMore />}
              >
                <ReportProblemIcon />
              </NavigationDrawerItem>
              <Collapse in={openAlertsSubmenu} timeout="auto" unmountOnExit>
                <List disablePadding sx={{ pl: 2 }}>
                  <NavigationDrawerItem name={"Neumáticos"} to="/alert/tires">
                    <SvgIcon>
                      <path
                        d="M23611,21582a10.006,10.006,0,1,1,10.008,10A10.015,10.015,0,0,1,23611,21582Zm2.73,0a7.275,7.275,0,1,0,7.277-7.275A7.283,7.283,0,0,0,23613.727,21582Zm5.9,5.912a.275.275,0,0,1-.242-.395l1.375-2.758a.275.275,0,0,1,.488,0l1.379,2.758a.273.273,0,0,1-.242.395Zm5.469-1.764-1.7-2.574a.277.277,0,0,1,.25-.422l3.074.184a.272.272,0,0,1,.215.41l-1.371,2.385a.273.273,0,0,1-.465.018Zm-8.672-.018-1.379-2.385a.272.272,0,0,1,.215-.41l3.074-.184a.272.272,0,0,1,.246.422l-1.7,2.568a.271.271,0,0,1-.461-.012Zm3.219-4.131a1.363,1.363,0,1,1,1.363,1.365A1.362,1.362,0,0,1,23619.641,21582Zm3.758-1.568,1.7-2.576a.271.271,0,0,1,.461.018l1.375,2.383a.272.272,0,0,1-.219.41l-3.074.184a.025.025,0,0,1-.012,0A.269.269,0,0,1,23623.4,21580.436Zm-5.066.418-3.074-.184a.272.272,0,0,1-.215-.41l1.379-2.383a.271.271,0,0,1,.461-.018l1.7,2.568a.277.277,0,0,1-.234.428Zm2.426-1.611-1.375-2.758a.271.271,0,0,1,.242-.393h2.758a.27.27,0,0,1,.242.393l-1.379,2.758a.267.267,0,0,1-.242.15A.277.277,0,0,1,23620.758,21579.242Z"
                        transform="translate(-23608.996 -21570.004)"
                      />
                    </SvgIcon>
                  </NavigationDrawerItem>
                  <NavigationDrawerItem name={"Vehículos"} to="/alert/vehicles">
                    <DirectionsCarIcon />
                  </NavigationDrawerItem>
                  <NavigationDrawerItem
                    name={t("general:mounting")}
                    to="/alert/mounts"
                  >
                    <SvgIcon>
                      <path d="M20.96 16.45C20.97 16.3 21 16.15 21 16V16.5L20.96 16.45M11 16C11 16.71 11.15 17.39 11.42 18H6V19C6 19.55 5.55 20 5 20H4C3.45 20 3 19.55 3 19V11L5.08 5C5.28 4.42 5.84 4 6.5 4H17.5C18.16 4 18.72 4.42 18.92 5L21 11V16C21 13.24 18.76 11 16 11S11 13.24 11 16M8 13.5C8 12.67 7.33 12 6.5 12S5 12.67 5 13.5 5.67 15 6.5 15 8 14.33 8 13.5M19 10L17.5 5.5H6.5L5 10H19M22.87 21.19L18.76 17.08C19.17 16.04 18.94 14.82 18.08 13.97C17.18 13.06 15.83 12.88 14.74 13.38L16.68 15.32L15.33 16.68L13.34 14.73C12.8 15.82 13.05 17.17 13.93 18.08C14.79 18.94 16 19.16 17.05 18.76L21.16 22.86C21.34 23.05 21.61 23.05 21.79 22.86L22.83 21.83C23.05 21.65 23.05 21.33 22.87 21.19Z" />
                    </SvgIcon>
                  </NavigationDrawerItem>
                </List>
              </Collapse>
            </List>
            {favoriteReportsList && favoriteReportsList.length > 0 && (
              <List disablePadding>
                <NavigationDrawerItem
                  name={t("general:favorite_reports")}
                  onClick={handleToggleFavoriteReportsSubmenu}
                  endIcon={
                    openFavoriteReportsSubmenu ? <ExpandLess /> : <ExpandMore />
                  }
                >
                  <BarChartIcon />
                </NavigationDrawerItem>
                <Collapse
                  in={openFavoriteReportsSubmenu}
                  timeout="auto"
                  unmountOnExit
                >
                  <List disablePadding sx={{ pl: 2 }}>
                    {favoriteReportsList.length > 0 &&
                      favoriteReportsList.map(
                        (favorite: FavoriteReportUser) => {
                          return (
                            <NavigationDrawerItem
                              key={
                                favorite.favorite_report.favorite_report_name
                              }
                              name={t(
                                `favorites:favorites.${favorite.favorite_report.favorite_report_name}`,
                              )}
                              to={favorite.favorite_report.favorite_report_url}
                              favoriteName={
                                favorite.favorite_report.favorite_report_name
                              }
                            >
                              {getFavoriteIcon(
                                favorite.favorite_report.favorite_report_name,
                              )}
                            </NavigationDrawerItem>
                          );
                        },
                      )}
                  </List>
                </Collapse>
              </List>
            )}
            <List disablePadding>
              <NavigationDrawerItem
                name={"Reportes"}
                onClick={handleToggleReportSubmenu}
                endIcon={openReportsSubmenu ? <ExpandLess /> : <ExpandMore />}
              >
                <BarChartIcon />
              </NavigationDrawerItem>
              <Collapse in={openReportsSubmenu} timeout="auto" unmountOnExit>
                <List disablePadding sx={{ pl: 2 }}>
                  {/* PILA */}
                  <List disablePadding>
                    <NavigationDrawerItem
                      name={t(
                        "labels:location.options.pile",
                      ).toLocaleLowerCase()}
                      onClick={handleTogglePileReport}
                      endIcon={openPileReport ? <ExpandLess /> : <ExpandMore />}
                    >
                      <BarChartIcon />
                    </NavigationDrawerItem>
                    <Collapse in={openPileReport} timeout="auto" unmountOnExit>
                      <List disablePadding sx={{ pl: 2 }}>
                        <NavigationDrawerItem
                          name={t("favorites:favorites.report_tire_pile_depth")}
                          to="/reports/pile"
                          favoriteName={"report_tire_pile_depth"}
                        >
                          <ViewAgendaIcon />
                        </NavigationDrawerItem>
                        <NavigationDrawerItem
                          name={t(
                            "favorites:favorites.report_tire_pile_travel",
                          )}
                          to="/reports/km/pile"
                          favoriteName={"report_tire_pile_travel"}
                        >
                          <SpeedIcon />
                        </NavigationDrawerItem>
                      </List>
                    </Collapse>
                  </List>
                  <NavigationDrawerItem
                    name={t("favorites:favorites.report_km_performance")}
                    to="/reports/tire/best/performance"
                    favoriteName={"report_km_performance"}
                  >
                    <TrendingUpIcon />
                  </NavigationDrawerItem>
                  <NavigationDrawerItem
                    name={t("favorites:favorites.report_tire_summary")}
                    to="/reports/summary"
                    favoriteName={"report_tire_summary"}
                  >
                    <ViewAgendaIcon />
                  </NavigationDrawerItem>
                  <NavigationDrawerItem
                    name={t("favorites:favorites.report_renewability_index")}
                    to="/reports/renewability/index"
                    favoriteName={"report_renewability_index"}
                  >
                    <LoopIcon />
                  </NavigationDrawerItem>
                  <NavigationDrawerItem
                    name={t("favorites:favorites.report_user_review")}
                    to="/report/user/review"
                    favoriteName={"report_user_review"}
                  >
                    <GroupAddIcon />
                  </NavigationDrawerItem>
                  <NavigationDrawerItem
                    name={t("titles:summary_warehouse_report")}
                    to={"/report/warehouse/summary"}
                    favoriteName={"report_summary_warehouse"}
                  >
                    <ViewAgendaIcon />
                  </NavigationDrawerItem>
                  <NavigationDrawerItem
                    name={t("favorites:favorites.report_tire_warehouse")}
                    to="/report/warehouse"
                    favoriteName={"report_tire_warehouse"}
                  >
                    <ViewAgendaIcon />
                  </NavigationDrawerItem>
                  <NavigationDrawerItem
                    name={t(`favorites:favorites.report_tire_mount`)}
                    to={"/report/mount/summary"}
                    favoriteName={"report_tire_mount"}
                  >
                    <ViewAgendaIcon />
                    {/* Todo: Change icon */}
                  </NavigationDrawerItem>
                  <NavigationDrawerItem
                    name={t(`favorites:favorites.report_tire_revitalized`)}
                    to={"/report/tire/revitalized"}
                    favoriteName={"report_tire_revitalized"}
                  >
                    <BuildIcon />
                  </NavigationDrawerItem>
                  <NavigationDrawerItem
                    name={t(`favorites:favorites.report_tire_repair`)}
                    to={"/report/tire/repair"}
                    favoriteName={"report_tire_repair"}
                  >
                    <BuildIcon />
                  </NavigationDrawerItem>
                  <NavigationDrawerItem
                    name={t("favorites:favorites.report_km_projection")}
                    to="/reports/km/projection"
                    favoriteName={"report_km_projection"}
                  >
                    <MovingIcon />
                  </NavigationDrawerItem>
                  <NavigationDrawerItem
                    name={t("favorites:favorites.report_review_performance")}
                    to="/reports/review/performance"
                    favoriteName={"report_review_performance"}
                  >
                    <LoopIcon />
                  </NavigationDrawerItem>
                  <NavigationDrawerItem
                    name={t("favorites:favorites.report_last_movement")}
                    to="/report/last/movement"
                    favoriteName={"report_last_movement"}
                  >
                    <TrendingDownIcon />
                  </NavigationDrawerItem>
                  <NavigationDrawerItem
                    name={t("favorites:favorites.report_km_dynamic_cost")}
                    to="/reports/dynamic/cost"
                    favoriteName={"report_km_dynamic_cost"}
                  >
                    <PaidIcon />
                  </NavigationDrawerItem>
                  <NavigationDrawerItem
                    name={t("favorites:favorites.report_vehicle_semaphore")}
                    to="/report/vehicle/semaphore"
                    favoriteName={"report_vehicle_semaphore"}
                  >
                    <TrafficIcon />
                  </NavigationDrawerItem>
                  <NavigationDrawerItem
                    name={t("favorites:favorites.report_tire_damage_wear")}
                    to="/report/damage/wear"
                    favoriteName={"report_tire_damage_wear"}
                  >
                    <ViewAgendaIcon />
                  </NavigationDrawerItem>
                  <NavigationDrawerItem
                    name={t("favorites:favorites.report_tire_statistics")}
                    to="/reports/tire/stats"
                    favoriteName={"report_tire_statistics"}
                  >
                    <SvgIcon>
                      <path
                        d="M23611,21582a10.006,10.006,0,1,1,10.008,10A10.015,10.015,0,0,1,23611,21582Zm2.73,0a7.275,7.275,0,1,0,7.277-7.275A7.283,7.283,0,0,0,23613.727,21582Zm5.9,5.912a.275.275,0,0,1-.242-.395l1.375-2.758a.275.275,0,0,1,.488,0l1.379,2.758a.273.273,0,0,1-.242.395Zm5.469-1.764-1.7-2.574a.277.277,0,0,1,.25-.422l3.074.184a.272.272,0,0,1,.215.41l-1.371,2.385a.273.273,0,0,1-.465.018Zm-8.672-.018-1.379-2.385a.272.272,0,0,1,.215-.41l3.074-.184a.272.272,0,0,1,.246.422l-1.7,2.568a.271.271,0,0,1-.461-.012Zm3.219-4.131a1.363,1.363,0,1,1,1.363,1.365A1.362,1.362,0,0,1,23619.641,21582Zm3.758-1.568,1.7-2.576a.271.271,0,0,1,.461.018l1.375,2.383a.272.272,0,0,1-.219.41l-3.074.184a.025.025,0,0,1-.012,0A.269.269,0,0,1,23623.4,21580.436Zm-5.066.418-3.074-.184a.272.272,0,0,1-.215-.41l1.379-2.383a.271.271,0,0,1,.461-.018l1.7,2.568a.277.277,0,0,1-.234.428Zm2.426-1.611-1.375-2.758a.271.271,0,0,1,.242-.393h2.758a.27.27,0,0,1,.242.393l-1.379,2.758a.267.267,0,0,1-.242.15A.277.277,0,0,1,23620.758,21579.242Z"
                        transform="translate(-23608.996 -21570.004)"
                      />
                    </SvgIcon>
                  </NavigationDrawerItem>
                </List>
              </Collapse>
            </List>
            <List disablePadding>
              <NavigationDrawerItem
                name={"Vehículos"}
                onClick={handleToggleVehiclesSubmenu}
                endIcon={openVehiclesSubmenu ? <ExpandLess /> : <ExpandMore />}
              >
                <DirectionsCarIcon />
              </NavigationDrawerItem>
              <Collapse in={openVehiclesSubmenu} timeout="auto" unmountOnExit>
                <List disablePadding sx={{ pl: 2 }}>
                  <NavigationDrawerItem name={"Neumáticos"} to="/tire">
                    <SvgIcon>
                      <path
                        d="M23611,21582a10.006,10.006,0,1,1,10.008,10A10.015,10.015,0,0,1,23611,21582Zm2.73,0a7.275,7.275,0,1,0,7.277-7.275A7.283,7.283,0,0,0,23613.727,21582Zm5.9,5.912a.275.275,0,0,1-.242-.395l1.375-2.758a.275.275,0,0,1,.488,0l1.379,2.758a.273.273,0,0,1-.242.395Zm5.469-1.764-1.7-2.574a.277.277,0,0,1,.25-.422l3.074.184a.272.272,0,0,1,.215.41l-1.371,2.385a.273.273,0,0,1-.465.018Zm-8.672-.018-1.379-2.385a.272.272,0,0,1,.215-.41l3.074-.184a.272.272,0,0,1,.246.422l-1.7,2.568a.271.271,0,0,1-.461-.012Zm3.219-4.131a1.363,1.363,0,1,1,1.363,1.365A1.362,1.362,0,0,1,23619.641,21582Zm3.758-1.568,1.7-2.576a.271.271,0,0,1,.461.018l1.375,2.383a.272.272,0,0,1-.219.41l-3.074.184a.025.025,0,0,1-.012,0A.269.269,0,0,1,23623.4,21580.436Zm-5.066.418-3.074-.184a.272.272,0,0,1-.215-.41l1.379-2.383a.271.271,0,0,1,.461-.018l1.7,2.568a.277.277,0,0,1-.234.428Zm2.426-1.611-1.375-2.758a.271.271,0,0,1,.242-.393h2.758a.27.27,0,0,1,.242.393l-1.379,2.758a.267.267,0,0,1-.242.15A.277.277,0,0,1,23620.758,21579.242Z"
                        transform="translate(-23608.996 -21570.004)"
                      />
                    </SvgIcon>
                  </NavigationDrawerItem>
                  <NavigationDrawerItem name={"Vehículos"} to="/vehicle">
                    <DirectionsCarIcon />
                  </NavigationDrawerItem>
                  <NavigationDrawerItem
                    name={t("general:vehicle_review")}
                    to="/vehicle/review"
                  >
                    <AssignmentIcon />
                  </NavigationDrawerItem>
                  <NavigationDrawerItem
                    name={t("general:mounting")}
                    to="/mount"
                  >
                    <SvgIcon>
                      <path d="M20.96 16.45C20.97 16.3 21 16.15 21 16V16.5L20.96 16.45M11 16C11 16.71 11.15 17.39 11.42 18H6V19C6 19.55 5.55 20 5 20H4C3.45 20 3 19.55 3 19V11L5.08 5C5.28 4.42 5.84 4 6.5 4H17.5C18.16 4 18.72 4.42 18.92 5L21 11V16C21 13.24 18.76 11 16 11S11 13.24 11 16M8 13.5C8 12.67 7.33 12 6.5 12S5 12.67 5 13.5 5.67 15 6.5 15 8 14.33 8 13.5M19 10L17.5 5.5H6.5L5 10H19M22.87 21.19L18.76 17.08C19.17 16.04 18.94 14.82 18.08 13.97C17.18 13.06 15.83 12.88 14.74 13.38L16.68 15.32L15.33 16.68L13.34 14.73C12.8 15.82 13.05 17.17 13.93 18.08C14.79 18.94 16 19.16 17.05 18.76L21.16 22.86C21.34 23.05 21.61 23.05 21.79 22.86L22.83 21.83C23.05 21.65 23.05 21.33 22.87 21.19Z" />
                    </SvgIcon>
                  </NavigationDrawerItem>
                </List>
              </Collapse>
            </List>
            <List disablePadding>
              <NavigationDrawerItem
                name={"Administración"}
                onClick={handleToggleAdministracionSubmenu}
                endIcon={
                  openAdministracionSubmenu ? <ExpandLess /> : <ExpandMore />
                }
              >
                <DashboardIcon />
              </NavigationDrawerItem>
              <Collapse
                in={openAdministracionSubmenu}
                timeout="auto"
                unmountOnExit
              >
                <List disablePadding sx={{ pl: 2 }}>
                  <NavigationDrawerItem name={"Almacenes"} to="/warehouse">
                    <WidgetsIcon />
                  </NavigationDrawerItem>
                  <NavigationDrawerItem name={"Conductores"} to="/driver">
                    <StreetviewIcon />
                  </NavigationDrawerItem>
                  <NavigationDrawerItem
                    name={"Conductores del transportista"}
                    to="/association/driver"
                  >
                    <StreetviewIcon />
                  </NavigationDrawerItem>
                  <NavigationDrawerItem
                    name={"Transportistas"}
                    to="/association"
                  >
                    <AccountBalanceIcon />
                  </NavigationDrawerItem>
                  <NavigationDrawerItem name={"Proveedores"} to="/provider">
                    <PeopleOutlineIcon />
                  </NavigationDrawerItem>
                  <NavigationDrawerItem name={"Gps"} to="/gps">
                    <GpsFixedIcon />
                  </NavigationDrawerItem>
                  <NavigationDrawerItem name={"Rfid"} to="/rfid">
                    <GpsFixedIcon />
                  </NavigationDrawerItem>
                </List>
              </Collapse>
            </List>
            <List disablePadding>
              <NavigationDrawerItem
                name={"Áreas"}
                onClick={handleToggleAreasSubmenu}
                endIcon={openAreasSubmenu ? <ExpandLess /> : <ExpandMore />}
              >
                <HomeWorkIcon />
              </NavigationDrawerItem>
              <Collapse in={openAreasSubmenu} timeout="auto" unmountOnExit>
                <List disablePadding sx={{ pl: 2 }}>
                  <NavigationDrawerItem name={"Corporativos"} to="/corporate">
                    <AccountBalanceIcon />
                  </NavigationDrawerItem>
                  <NavigationDrawerItem name={"Empresas"} to="/company">
                    <AccountBalanceIcon />
                  </NavigationDrawerItem>
                  <NavigationDrawerItem name={"Sucursales"} to="/subsidiary">
                    <AccountBalanceIcon />
                  </NavigationDrawerItem>
                  <NavigationDrawerItem name={"Divisiones"} to="/division">
                    <AccountBalanceIcon />
                  </NavigationDrawerItem>
                </List>
              </Collapse>
            </List>
            <List disablePadding>
              <NavigationDrawerItem
                name={"Catálogos"}
                onClick={handleToggleControlSubmenu}
                endIcon={openControlSubmenu ? <ExpandLess /> : <ExpandMore />}
              >
                <SettingsIcon />
              </NavigationDrawerItem>
              <Collapse in={openControlSubmenu} timeout="auto" unmountOnExit>
                <List disablePadding sx={{ pl: 2 }}>
                  <NavigationDrawerItem
                    name={"Tipos de vehículos"}
                    to="/vehicle/type"
                  >
                    <DirectionsCarIcon />
                  </NavigationDrawerItem>
                  <NavigationDrawerItem name={"Marcas"} to="/brand">
                    <ApartmentIcon />
                  </NavigationDrawerItem>
                  <NavigationDrawerItem name={"Medidas"} to="/tire/size">
                    <StraightenIcon />
                  </NavigationDrawerItem>
                  <NavigationDrawerItem
                    name={"Modelos Originales"}
                    to="/tire/model"
                  >
                    <SvgIcon>
                      <path
                        d="M23611,21582a10.006,10.006,0,1,1,10.008,10A10.015,10.015,0,0,1,23611,21582Zm2.73,0a7.275,7.275,0,1,0,7.277-7.275A7.283,7.283,0,0,0,23613.727,21582Zm5.9,5.912a.275.275,0,0,1-.242-.395l1.375-2.758a.275.275,0,0,1,.488,0l1.379,2.758a.273.273,0,0,1-.242.395Zm5.469-1.764-1.7-2.574a.277.277,0,0,1,.25-.422l3.074.184a.272.272,0,0,1,.215.41l-1.371,2.385a.273.273,0,0,1-.465.018Zm-8.672-.018-1.379-2.385a.272.272,0,0,1,.215-.41l3.074-.184a.272.272,0,0,1,.246.422l-1.7,2.568a.271.271,0,0,1-.461-.012Zm3.219-4.131a1.363,1.363,0,1,1,1.363,1.365A1.362,1.362,0,0,1,23619.641,21582Zm3.758-1.568,1.7-2.576a.271.271,0,0,1,.461.018l1.375,2.383a.272.272,0,0,1-.219.41l-3.074.184a.025.025,0,0,1-.012,0A.269.269,0,0,1,23623.4,21580.436Zm-5.066.418-3.074-.184a.272.272,0,0,1-.215-.41l1.379-2.383a.271.271,0,0,1,.461-.018l1.7,2.568a.277.277,0,0,1-.234.428Zm2.426-1.611-1.375-2.758a.271.271,0,0,1,.242-.393h2.758a.27.27,0,0,1,.242.393l-1.379,2.758a.267.267,0,0,1-.242.15A.277.277,0,0,1,23620.758,21579.242Z"
                        transform="translate(-23608.996 -21570.004)"
                      />
                    </SvgIcon>
                  </NavigationDrawerItem>
                  <NavigationDrawerItem
                    name={"Modelos Revitalizados"}
                    to="/revitalized/tire/model"
                  >
                    <SvgIcon>
                      <path
                        d="M23611,21582a10.006,10.006,0,1,1,10.008,10A10.015,10.015,0,0,1,23611,21582Zm2.73,0a7.275,7.275,0,1,0,7.277-7.275A7.283,7.283,0,0,0,23613.727,21582Zm5.9,5.912a.275.275,0,0,1-.242-.395l1.375-2.758a.275.275,0,0,1,.488,0l1.379,2.758a.273.273,0,0,1-.242.395Zm5.469-1.764-1.7-2.574a.277.277,0,0,1,.25-.422l3.074.184a.272.272,0,0,1,.215.41l-1.371,2.385a.273.273,0,0,1-.465.018Zm-8.672-.018-1.379-2.385a.272.272,0,0,1,.215-.41l3.074-.184a.272.272,0,0,1,.246.422l-1.7,2.568a.271.271,0,0,1-.461-.012Zm3.219-4.131a1.363,1.363,0,1,1,1.363,1.365A1.362,1.362,0,0,1,23619.641,21582Zm3.758-1.568,1.7-2.576a.271.271,0,0,1,.461.018l1.375,2.383a.272.272,0,0,1-.219.41l-3.074.184a.025.025,0,0,1-.012,0A.269.269,0,0,1,23623.4,21580.436Zm-5.066.418-3.074-.184a.272.272,0,0,1-.215-.41l1.379-2.383a.271.271,0,0,1,.461-.018l1.7,2.568a.277.277,0,0,1-.234.428Zm2.426-1.611-1.375-2.758a.271.271,0,0,1,.242-.393h2.758a.27.27,0,0,1,.242.393l-1.379,2.758a.267.267,0,0,1-.242.15A.277.277,0,0,1,23620.758,21579.242Z"
                        transform="translate(-23608.996 -21570.004)"
                      />
                    </SvgIcon>
                  </NavigationDrawerItem>
                  <NavigationDrawerItem name={"Códigos de alertas"} to="/alert">
                    <ReportProblemIcon />
                  </NavigationDrawerItem>
                  <NavigationDrawerItem name={"Tipos de desgastes"} to="/wear">
                    <BrokenImageIcon />
                  </NavigationDrawerItem>
                  <NavigationDrawerItem name={"Tipos de daños"} to="/damage">
                    <BrokenImageIcon />
                  </NavigationDrawerItem>
                  <NavigationDrawerItem
                    name={"Causas de retiro"}
                    to="/retirement/cause"
                  >
                    <SvgIcon>
                      <path d="M12,2L4,5v6.09c0,5.05,3.41,9.76,8,10.91c4.59-1.15,8-5.86,8-10.91V5L12,2z M15.5,14.09l-1.41,1.41L12,13.42L9.91,15.5 L8.5,14.09L10.59,12L8.5,9.91L9.91,8.5L12,10.59l2.09-2.09l1.41,1.41L13.42,12L15.5,14.09z" />
                    </SvgIcon>
                  </NavigationDrawerItem>
                </List>
              </Collapse>
              <List disablePadding>
                <NavigationDrawerItem
                  name={"Cerrar sesión"}
                  onClick={logoutMutation.mutate}
                >
                  <SettingsIcon />
                </NavigationDrawerItem>
              </List>
            </List>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
