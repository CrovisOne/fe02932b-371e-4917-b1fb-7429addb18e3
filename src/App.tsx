import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { BASE_ROUTES, appRoutes } from "./routes/appRoutes";
import { SearchEventPage } from "./pages/search-event";
import { Navbar } from "./components/navigation/Navbar";
import { CartSummaryPage } from "./pages/cart-summary";

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
        <Route path={appRoutes.searchLocation} element={<>Search Location</>} />
        <Route path={appRoutes.cart} element={<CartSummaryPage />} />
        <Route path={appRoutes.event} element={<>event</>} />
        <Route path={appRoutes.location} element={<>location</>} />
      </Routes>
    </>
  );
}

export default App;
