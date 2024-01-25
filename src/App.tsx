import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";

import { NotificationBar } from "src/components/common/NotificationBar.tsx";
import { Progress } from "src/components/common/Progress.tsx";
import { WorkAreaDialog } from "src/features/WorkArea";
import { useAuthentication } from "src/hooks/authentication.tsx";
import "src/lang/index.ts";
import { router } from "src/routes";
import { useIdentity } from "src/stores/general/identity.ts";
import { useProgress } from "src/stores/general/progress.ts";

import { useLanguage } from "./hooks/language";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

function App() {
  const progresses = useProgress((state) => state.progresses);
  const account = useIdentity((state) => state.account);
  const workArea = useIdentity((state) => state.workArea);

  useAuthentication();
  useLanguage();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <QueryClientProvider client={queryClient}>
        {progresses.length > 0 && <Progress />}
        <RouterProvider router={router} />
        <WorkAreaDialog open={account != null && workArea === null} />
        <NotificationBar />
      </QueryClientProvider>
    </LocalizationProvider>
  );
}

export default App;
