import { http } from "src/api/api";
import { MessageResponse } from "src/types/response";

import { RecoveryPasswordSchemaType } from "../validation/recoveryPassword";

export { recoveryPassword };

async function recoveryPassword(data: RecoveryPasswordSchemaType) {
  return await http<MessageResponse>({
    method: "POST",
    path: `auth/password/email`,
    data: data,
  });
}
