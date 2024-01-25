import { Alert } from "src/features/Alert";
import { AlertTire } from "src/features/Alerts/AlertTire";
import { AlertTireShow } from "src/features/Alerts/AlertTireShow";
import { Mounting } from "src/features/Alerts/Mounting";
import { MountingShow } from "src/features/Alerts/MountingShow";
import { Vehicle } from "src/features/Alerts/Vehicle";
import { VehicleShow } from "src/features/Alerts/VehicleShow";
import { AlertsPanel } from "src/features/AlertsPanel";
import { SubsidiaryHelmetValue } from "src/features/Areas/SubsidiaryHelmetValue";
import { SubsidiaryPolicy } from "src/features/Areas/SubsidiaryPolicy";
import { Association } from "src/features/Association";
import { Brand } from "src/features/Brand";
import { CommissionedDriver } from "src/features/Commissioned";
import { Company } from "src/features/Company";
import { Corporate } from "src/features/Corporate";
import { Damage } from "src/features/Damage/components/Damage";
// import { Damage } from "src/features/Damage";
import { Dashboard } from "src/features/Dashboard";
import { Division } from "src/features/Division";
import { Driver } from "src/features/Driver";
import { Gps } from "src/features/Gps";
import { Login } from "src/features/Login";
import { Provider } from "src/features/Provider";
import { BestPerformance } from "src/features/Report/BestPerformance";
import { DamageWearReport } from "src/features/Report/DamageWears/components/DamageWearReport";
import { DismountedTire } from "src/features/Report/DismountedTire";
import { DynamicCost } from "src/features/Report/DynamicCost/components/DynamicCost";
import { KmPile } from "src/features/Report/KmPile";
import { KmProjection } from "src/features/Report/KmProjection/components/KmProjection";
import { LastMovement } from "src/features/Report/LastMovement/components/LastMovement";
import { MountedTire } from "src/features/Report/MountedTire/components/MountedTire";
import { Pile } from "src/features/Report/Pile";
import { Renewability } from "src/features/Report/Renewability";
import { ReviewPerformanceReport } from "src/features/Report/ReviewPerformance/components/ReviewPerformanceReport";
import { SemaphoreReport } from "src/features/Report/SemaphoreReport/components/SemaphoreReport";
import { Summary } from "src/features/Report/Summary";
import { TireRepair } from "src/features/Report/TireRepair";
import { TireRetread } from "src/features/Report/TireRetread";
import { TireStats } from "src/features/Report/TireStats/components/TireStats";
import { UserReview } from "src/features/Report/UserReviewReport";
import { WareHouseReport } from "src/features/Report/WareHouse/components/WareHouseReport";
import { RetirementCause } from "src/features/RetirementCause";
import { RevitalizedTireModel } from "src/features/RevitalizedTireModel";
import { Rfid } from "src/features/Rfid";
import { Subsidiary } from "src/features/Subsidiary";
import { ApplicationPolicy } from "src/features/Subsidiary/components/ApplicationPolicy/components/ApplicationPolicy";
import { DepthPolicy } from "src/features/Subsidiary/components/DepthPolicy/components/DepthPolicy";
import { PressurePolicy } from "src/features/Subsidiary/components/PressurePolicy/components/PressurePolicy";
import { OriginalModel } from "src/features/Tire";
import { Size } from "src/features/Tire";
import { Damages } from "src/features/Tire/Tire/components/Damages/Damages";
import { History } from "src/features/Tire/Tire/components/History/History";
import { ReviewHistory } from "src/features/Tire/Tire/components/ReviewHistory/ReviewHistory";
import { Tire } from "src/features/Tire/Tire/components/Tire";
import { Wears } from "src/features/Tire/Tire/components/Wear/Wears";
import { Mounting as VehiclesMounting } from "src/features/Vehicles/Mounting/components/Mounting";
import { VehicleInspection } from "src/features/Vehicles/VehicleInspection";
import { VehicleReview } from "src/features/Vehicles/VehicleReview";
import { VehicleReviewMovement } from "src/features/Vehicles/VehicleReviewMovement";
import { VehicleReviewUpdate } from "src/features/Vehicles/VehicleReviewUpdate";
import VehicleTireIdentify from "src/features/Vehicles/VehicleTireIdentify/components/VehicleTireIdentify";
import VehicleTirePressure from "src/features/Vehicles/VehicleTirePressure/components/VehicleTirePressure";
import { Vehicles } from "src/features/Vehicles/Vehicles";
import { WareHouse } from "src/features/WareHouse";
import { Wear } from "src/features/Wear";

export { commonRoutes };

const commonRoutes = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/alert/home",
    element: <AlertsPanel />,
  },
  // Rutas de Alertas
  {
    path: "/alert/tires",
    element: <AlertTire />,
  },
  {
    path: "/tire/:id/alerts",
    element: <AlertTireShow />,
  },
  {
    path: "/alert/vehicles",
    element: <Vehicle />,
  },
  {
    path: "/vehicle/:id/alerts",
    element: <VehicleShow />,
  },
  {
    path: "/alert/mounts",
    element: <Mounting />,
  },
  {
    path: "/mount/:id/alerts",
    element: <MountingShow />,
  },
  // Rutas de Reportes
  {
    path: "/reports/renewability/index",
    element: <Renewability />,
  },
  {
    path: "/report/user/review",
    element: <UserReview />,
  },
  {
    path: "reports/tire/best/performance",
    element: <BestPerformance />,
  },
  {
    path: "report/warehouse/summary",
    element: <DismountedTire />,
  },
  {
    path: "report/mount/summary",
    element: <MountedTire />,
  },
  {
    path: "report/tire/revitalized",
    element: <TireRetread />,
  },
  {
    path: "report/tire/repair",
    element: <TireRepair />,
  },
  {
    path: "report/warehouse",
    element: <WareHouseReport />,
  },
  {
    path: "reports/km/projection",
    element: <KmProjection />,
  },
  {
    path: "reports/review/performance",
    element: <ReviewPerformanceReport />,
  },
  {
    path: "report/last/movement",
    element: <LastMovement />,
  },
  {
    path: "reports/dynamic/cost",
    element: <DynamicCost />,
  },
  {
    path: "/reports/pile",
    element: <Pile />,
  },
  {
    path: "/reports/km/pile",
    element: <KmPile />,
  },
  {
    path: "/reports/summary",
    element: <Summary />,
  },
  {
    path: "report/vehicle/semaphore",
    element: <SemaphoreReport />,
  },
  {
    path: "report/damage/wear",
    element: <DamageWearReport />,
  },
  {
    path: "reports/tire/stats",
    element: <TireStats />,
  },
  // Rutas de Administración
  {
    path: "/warehouse",
    element: <WareHouse />,
  },
  {
    path: "/driver",
    element: <Driver />,
  },
  {
    path: "/association/driver",
    element: <CommissionedDriver />,
  },
  {
    path: "/association",
    element: <Association />,
  },
  {
    path: "/provider",
    element: <Provider />,
  },
  {
    path: "/gps",
    element: <Gps />,
  },
  {
    path: "/rfid",
    element: <Rfid />,
  },
  // Rutas de Vehiculos
  {
    path: "/tire",
    element: <Tire />,
  },
  {
    path: "/tire/:id/history",
    element: <History />,
  },
  {
    path: "/vehicle",
    element: <Vehicles />,
  },
  {
    path: "/vehicle/review",
    element: <VehicleReview />,
  },
  {
    path: "/vehicle/review/:id/update",
    element: <VehicleReviewUpdate />,
  },
  {
    path: "/tire/:id/review_history",
    element: <ReviewHistory />,
  },
  {
    path: "/vehicleReview/:id/history",
    element: <VehicleReviewMovement />,
  },
  {
    path: "/mount",
    element: <VehiclesMounting />,
  },
  {
    path: "/tire/:id/damage",
    element: <Damages />,
  },
  {
    path: "/tire/:id/wear",
    element: <Wears />,
  },
  {
    path: "/vehicle/:id/tire/pressure",
    element: <VehicleTirePressure />,
  },
  {
    path: "/vehicle/:id/tire/identify",
    element: <VehicleTireIdentify />,
  },
  {
    path: "/vehicle/review/:id",
    element: <VehicleInspection />,
  },
  // Rutas de Áreas
  {
    path: "/corporate",
    element: <Corporate />,
  },
  {
    path: "/company",
    element: <Company />,
  },
  {
    path: "/subsidiary",
    element: <Subsidiary />,
  },
  {
    path: "/subsidiary/:id/policy",
    element: <SubsidiaryPolicy />,
  },
  {
    path: "/subsidiary/:id/application/policy/tire",
    element: <ApplicationPolicy />,
  },
  {
    path: "/subsidiary/:id/pressure/policy/vehicle",
    element: <PressurePolicy />,
  },
  {
    path: "/subsidiary/:id/depth/policy/vehicle",
    element: <DepthPolicy />,
  },
  {
    path: "/subsidiary/:id/helmet/value",
    element: <SubsidiaryHelmetValue />,
  },
  {
    path: "/division",
    element: <Division />,
  },
  // Rutas de Catálogos
  {
    path: "/brand",
    element: <Brand />,
  },
  {
    path: "/tire/size",
    element: <Size />,
  },
  {
    path: "/tire/model",
    element: <OriginalModel />,
  },
  {
    path: "/revitalized/tire/model",
    element: <RevitalizedTireModel />,
  },
  {
    path: "/alert",
    element: <Alert />,
  },
  {
    path: "/wear",
    element: <Wear />,
  },
  {
    path: "/damage",
    element: <Damage />,
  },
  {
    path: "/retirement/cause",
    element: <RetirementCause />,
  },
];
