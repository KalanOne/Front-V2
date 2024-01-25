import { dashboardEn } from "src/features/Dashboard";
import { homeEn } from "src/features/Home";
import { loginEn } from "src/features/Login";
import { profileInfoEn } from "src/features/ProfileInfo";
import { recoveryPasswordEn } from "src/features/RecoveryPassword";
import { dynamicCostEn } from "src/features/Report/DynamicCost";
import { reportKmEn } from "src/features/Report/KmProjection";
import { reportLastMovementEn } from "src/features/Report/LastMovement";
import { userReviewEn } from "src/features/Report/UserReviewReport";
import { reportWarehouseEn } from "src/features/Report/WareHouse";
import { causeEn } from "src/features/RetirementCause";
import { originalModelEn } from "src/features/Tire/OriginalModel";

export { features };

const features = {
  login: loginEn,
  home: homeEn,
  originalModel: originalModelEn,
  cause: causeEn,
  dashboard: dashboardEn,
  profileInfo: profileInfoEn,
  recoveryPassword: recoveryPasswordEn,
  reportWarehouse: reportWarehouseEn,
  reportKm: reportKmEn,
  reportLastMovement: reportLastMovementEn,
  reportDynamicCost: dynamicCostEn,
  reportUserReview: userReviewEn,
};
