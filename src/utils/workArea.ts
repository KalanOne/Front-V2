import { Account, Corporate, WorkArea } from "src/types/identity";

export {
  getSubsidiaryViaWorkArea,
  getCompanyViaWorkArea,
  getCorporateViaWorkArea,
};

function getSubsidiaryViaWorkArea(
  account: Account | null,
  workArea: WorkArea | null,
) {
  if (!account) {
    return [];
  }
  if (!workArea) {
    return [];
  }
  return account.subsidiaries.filter(
    (assignment) => assignment.user_assigned_subsidiary_id == workArea.id,
  );
}

function getCompanyViaWorkArea(
  account: Account | null,
  workArea: WorkArea | null,
) {
  if (!account) {
    return [];
  }
  if (!workArea) {
    return [];
  }
  const subsidiary = getSubsidiaryViaWorkArea(account, workArea)[0];

  if (!subsidiary) {
    return [];
  }

  return account.companies.filter(
    (company) => company.company_id == subsidiary.subsidiary.company_id,
  );
}

function getCorporateViaWorkArea(
  account: Account | null,
  workArea: WorkArea | null,
): Corporate | null {
  if (!account) {
    return null;
  }
  const company = getCompanyViaWorkArea(account, workArea)[0];
  const corporate = account.corporates.find(
    (corporate) => corporate.corporate_id == company.company.corporate_id,
  );
  return corporate || null;
}
