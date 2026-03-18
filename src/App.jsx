import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { CitiesProvider } from "./context/CitiesProvider";
import { AuthProvider } from "./context/AuthContext";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoutes from "./Pages/ProtectedRoutes";

import CityList from "./Components/CityList";
import CountryList from "./Components/CountryList";
import City from "./Components/City";
import Form from "./Components/Form";
import SpinnerSkeleton from "./Components/SpinnerSkeleton";
import SignUpForm from "./authentication/SignUpForm";
import { Toaster } from "react-hot-toast";

const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Error = lazy(() => import("./pages/Error"));
const Login = lazy(() => import("./authentication/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

let router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/product",
    element: <Product />,
  },
  {
    path: "/pricing",
    element: <Pricing />,
  },
  {
    path: "/App",
    element: (
      <ProtectedRoutes>
        <AppLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        index: true,
        element: <Navigate replace to="/App/cities" />,
      },
      {
        path: "cities",
        element: <CityList />,
      },
      {
        path: "cities/:id",
        element: <City />,
      },
      {
        path: "countries",
        element: <CountryList />,
      },
      {
        path: "form",
        element: <Form />,
      },
    ],
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUpForm />,
  },
  {
    path: "*",
    element: <Error />,
  },
]);

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CitiesProvider>
            <Suspense fallback={<SpinnerSkeleton />}>
              <RouterProvider router={router} />
            </Suspense>
            <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
          </CitiesProvider>
        </AuthProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
