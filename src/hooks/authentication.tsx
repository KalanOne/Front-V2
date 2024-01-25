import { useEffect } from "react";

import { getUserProfile } from "src/api/user.ts";
import { useIdentity } from "src/stores/general/identity.ts";
import { USER_TOKEN, WORK_AREA } from "src/utils/constants.ts";

export { useAuthentication };

function useAuthentication() {
  const identityStore = useIdentity((state) => state);
  const isLoggedIn = !!localStorage.getItem(USER_TOKEN);

  async function onFirstLoad() {
    const workAreaJson = localStorage.getItem(WORK_AREA);
    if (workAreaJson) {
      identityStore.setWorkArea(JSON.parse(workAreaJson));
    }
    // TODO Set a try catch here to display backend errors
    const profile = await getUserProfile();
    identityStore.setAccount(profile);
  }

  // On the first load, set the work area from the local storage
  // and set the account from the user profile
  useEffect(() => {
    void onFirstLoad();
  }, []);

  // If the account needs to change the password, redirect to the change password page
  useEffect(() => {
    if (identityStore.account && identityStore.account.need_change_password) {
      window.location.href = "/change/password";
    }
  }, [identityStore.account]);

  // If the JWT token is expired, try to refresh the token, then redirect to the login page
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       await refreshToken();
  //     } catch (error) {
  //       logout();
  //       setRedirect("/");
  //       setNotification(error, true);
  //     }
  //   }
  //   if (isAuthenticate && !intervalRefresh) {
  //     setIntervalRefresh(setInterval(fetchData, 2400000));
  //   }
  // }, [isLoggedIn]);

  // If the user is logged in, get the user profile
  // useEffect(() => {
  //   async function fetchData() {
  //     const id = showProgress();
  //
  //     try {
  //       await getProfile();
  //     } catch (error) {
  //       logout();
  //       setRedirect("/");
  //       setNotification(error, true);
  //     }
  //
  //     showProgress(id);
  //   }
  //   if (isAuthenticate) {
  //     fetchData();
  //   }
  // }, [isLoggedIn]);

  // If the user is logged in and has a work area, get the user permits
  // useEffect(() => {
  //   async function fetchData() {
  //     const id = showProgress();
  //     try {
  //       await getUserPermits();
  //     } catch (error) {
  //       setWorkArea({});
  //       setNotification(error, true);
  //     }
  //     showProgress(id);
  //     setLoading(false);
  //   }
  //
  //   if (account) {
  //     if (isAuthenticate && workArea.key) {
  //       fetchData();
  //       return;
  //     }
  //
  //     setLoading(false);
  //   }
  //
  //   if (!isAuthenticate) {
  //     setLoading(false);
  //   }
  // }, [isLoggedIn, identityStore.workArea, identityStore.account]);
}
