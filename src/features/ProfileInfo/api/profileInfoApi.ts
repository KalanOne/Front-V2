import { http } from "src/api/api.ts";

import {
  ProfileInfoResponse,
  ProfileInfoUpdateData,
} from "../types/profileInfoTypes";

export { updateProfileInfo };

async function updateProfileInfo(
  data: ProfileInfoUpdateData,
): Promise<ProfileInfoResponse> {
  return await http<ProfileInfoResponse>({
    method: "PUT",
    path: "auth/update/profile",
    data: data,
  });
}
