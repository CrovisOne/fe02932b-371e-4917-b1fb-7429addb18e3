import { Navigate, Route, Routes } from "react-router-dom";
import { BASE_ROUTES, appRoutes } from "./routes/appRoutes";
import { SearchEventPage } from "./pages/search-event";
import { Navbar } from "./components/navigation/Navbar";
import { CartSummaryPage } from "./pages/cart-summary";
import { Toaster } from "./components/ui/toaster";
import { EventDetails } from "./pages/event-details";
import { SearchLocationsPage } from "./pages/search-location";

import "./App.css";

function App(): JSX.Element {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path={BASE_ROUTES.Home}
          element={<Navigate to={appRoutes.searchEvents} />}
        />
        <Route path={appRoutes.searchEvents} element={<SearchEventPage />} />
        <Route
          path={appRoutes.searchLocation}
          element={<SearchLocationsPage />}
        />
        <Route path={appRoutes.cart} element={<CartSummaryPage />} />
        <Route path={appRoutes.event} element={<EventDetails />} />
        <Route path={appRoutes.location} element={<SearchLocationsPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
