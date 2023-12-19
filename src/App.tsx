import { Route, Routes } from "react-router-dom";
import "./App.css";
import { appRoutes } from "./routes/appRoutes";

function App(): JSX.Element {
  return (
    <>
      <Routes>
        <Route path={appRoutes.searchEvents} element={<>Search Event</>} />
        <Route path={appRoutes.searchLocation} element={<>Search Location</>} />
        <Route path={appRoutes.cart} element={<>cart</>} />
        <Route path={appRoutes.event} element={<>event</>} />
        <Route path={appRoutes.location} element={<>location</>} />
      </Routes>
    </>
  );
}

export default App;
