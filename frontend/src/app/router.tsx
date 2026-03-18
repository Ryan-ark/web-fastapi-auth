import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "../components/layout/app-layout";
import { ProductsPage } from "../features/products/pages/products-page";
import { ShowcaseDataPage } from "../features/showcase/pages/showcase-data-page";
import { ShowcaseFormsPage } from "../features/showcase/pages/showcase-forms-page";
import { ShowcaseHomePage } from "../features/showcase/pages/showcase-home-page";
import { ShowcaseOverlaysPage } from "../features/showcase/pages/showcase-overlays-page";
import { NotFoundPage } from "../pages/not-found";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <ProductsPage />,
      },
      {
        path: "showcase",
        element: <ShowcaseHomePage />,
      },
      {
        path: "showcase/forms",
        element: <ShowcaseFormsPage />,
      },
      {
        path: "showcase/overlays",
        element: <ShowcaseOverlaysPage />,
      },
      {
        path: "showcase/data-display",
        element: <ShowcaseDataPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
