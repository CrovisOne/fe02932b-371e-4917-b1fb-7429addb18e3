import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { EventListProvider } from "./provider/EventListProvider.tsx";
import { CartProvider } from "./provider/CartProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <EventListProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </EventListProvider>
    </Router>
  </React.StrictMode>,
);
