import { createBrowserRouter } from "react-router-dom";

import { commonRoutes } from "src/routes/common.tsx";

export { router };

const router = createBrowserRouter([...commonRoutes]);
