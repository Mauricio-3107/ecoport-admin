import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import GlobalStyles from "./styles/GlobalStyles";
import Trucks from "./pages/Trucks";
import Drivers from "./pages/Drivers";
import Trips from "./pages/Trips";
import AppLayout from "./ui/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Clients from "./pages/Clients";
import Company from "./pages/Company";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";
import Pickup from "./pages/Pickup";
import Activity from "./pages/Activity";
import Fuel from "./pages/Fuel";
import FuelTruckId from "./features/fuel/FuelTruckId";
import Maintenance from "./pages/Maintenance";
import MaintenanceTruckId from "./pages/MaintenanceTruckId";
import Oil from "./pages/Oil";
import Tires from "./pages/Tires";
import TiresTruckId from "./pages/TiresTruckId";
import TripCosts from "./pages/TripCosts";
import Finance from "./pages/Finance";
import FinanceMonth from "./pages/FinanceMonth";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="trips" element={<Trips />} />
              <Route path="trucks" element={<Trucks />} />
              <Route path="drivers" element={<Drivers />} />
              <Route path="clients" element={<Clients />} />
              {/* <Route path="users" element={<Users />} /> */}
              <Route path="company" element={<Company />} />
              <Route path="account" element={<Account />} />
              <Route path="pickup" element={<Pickup />} />
              <Route path="activity" element={<Activity />} />
              <Route path="fuel" element={<Fuel />} />
              <Route path="fuel/:truckId" element={<FuelTruckId />} />
              <Route path="maintenance" element={<Maintenance />} />
              <Route
                path="maintenance/:truckId"
                element={<MaintenanceTruckId />}
              />
              <Route path="oil" element={<Oil />} />
              <Route path="tires" element={<Tires />} />
              <Route path="tires/:truckId" element={<TiresTruckId />} />
              <Route path="tripCosts" element={<TripCosts />} />
              <Route path="finance" element={<Finance />} />
              <Route path="finance/:month" element={<FinanceMonth />} />
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
