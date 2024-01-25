import { dashboardEs } from "src/features/Dashboard";
import { homeEs } from "src/features/Home";
import { loginEs } from "src/features/Login";
import { profileInfoEs } from "src/features/ProfileInfo";
import { recoveryPasswordEs } from "src/features/RecoveryPassword";
import { dynamicCostEs } from "src/features/Report/DynamicCost";
import { reportKmEs } from "src/features/Report/KmProjection";
import { reportLastMovementEs } from "src/features/Report/LastMovement";
import { userReviewEs } from "src/features/Report/UserReviewReport";
import { reportWarehouseEs } from "src/features/Report/WareHouse";
import { causeEs } from "src/features/RetirementCause";
import { originalModelEs } from "src/features/Tire/OriginalModel";

export { features };

const features = {
  login: loginEs,
  home: homeEs,
  originalModel: originalModelEs,
  cause: causeEs,
  dashboard: dashboardEs,
  profileInfo: profileInfoEs,
  recoveryPassword: recoveryPasswordEs,
  reportWarehouse: reportWarehouseEs,
  reportKm: reportKmEs,
  reportLastMovement: reportLastMovementEs,
  reportDynamicCost: dynamicCostEs,
  reportUserReview: userReviewEs,
};
