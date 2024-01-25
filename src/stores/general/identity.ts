import { create } from "zustand";

import { Account, WorkArea } from "src/types/identity.ts";

export { useIdentity };

interface IdentityState {
  workArea: WorkArea | null;
  account: Account | null;
  setWorkArea: (workArea: WorkArea) => void;
  setAccount: (account: Account) => void;
  reset: () => void;
}

const useIdentity = create<IdentityState>()((set) => ({
  workArea: null,
  setWorkArea: (workArea) =>
    set((_state) => ({
      workArea: workArea,
    })),
  account: null,
  setAccount: (account) =>
    set((_state) => ({
      account: account,
    })),
  reset: () =>
    set((_state) => ({
      workArea: null,
      account: null,
    })),
}));
