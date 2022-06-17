import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

import { CircularProgress } from "@mui/material";

const Loadable = (Component) => (props) => {
  return (
    <Suspense
      fallback={
        <CircularProgress
          sx={{
            ...{
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: "fixed",
            },
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "foundItems/:id",
      element: <FoundItemDescription />,
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "test",
          element: <Test />,
        },
        {
          path: "foundItems",
          element: <FoundItems />,
        },
        {
          path:"/postFoundItem",
          element:<PostFoundItem/>
        },
        {
          path:"/allClaims/:itemId",
          element:<AllClaims/>
        },
        {
          path:"/profile",
          element:<Profile/>
        }
      ],
    },
  ]);
}

//layouts
const MainLayout = Loadable(
  lazy(() => import("../layouts/mainLayout/mainLayout.component"))
);

const Landing = Loadable(
  lazy(() => import("../pages/landing/landing.component"))
);

const SignUp = Loadable(lazy(() => import("../pages/signup/signup.component")));

const Login = Loadable(lazy(() => import("../pages/login/login.component")));

//pages
const Test = Loadable(lazy(() => import("../pages/test/test.component")));

const FoundItems = Loadable(
  lazy(() => import("../pages/foundItems/foundItems.component"))
);

const FoundItemDescription = Loadable(
  lazy(() =>
    import("../pages/foundItemDescription/foundItemDescription.component")
  )
);

const PostFoundItem = Loadable(
  lazy(()=>import("../pages/postFoundItem/postFoundItem.component"))
);

const AllClaims = Loadable(
  lazy(()=>import("../pages/allClaims/allClaims.component"))
)

const Profile = Loadable(
  lazy(()=> import("../pages/profile/profile.component"))
)