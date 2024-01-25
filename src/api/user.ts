import { http } from "src/api/api.ts";
import { Account } from "src/types/identity.ts";

export { getUserProfile };

async function getUserProfile(): Promise<Account> {
  return await http<Account>({
    method: "GET",
    path: `auth/profile`,
  });
}
