import { ShoppingBasketIcon } from "lucide-react";
import { Button } from "../ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import { appRoutes } from "@/routes/appRoutes";
import { useContext } from "react";
import { CartContext } from "@/provider/CartProvider";

import "./Navbar.scss";

export function Navbar(): JSX.Element {
  const navigate = useNavigate();
  const { cartContent } = useContext(CartContext);

  return (
    <nav id="navbar" className="shadow-md">
      <div className="content">
        <div className="left-side">
          <Button
            id="logo-button"
            variant="default"
            onClick={() => {
              navigate(appRoutes.searchEvents);
            }}
          >
            EVENTS
          </Button>
          <ol>
            <li>
              <NavLink to={appRoutes.searchEvents}>Events</NavLink>
            </li>
            <li>
              <NavLink to={appRoutes.searchLocation}>Locations</NavLink>
            </li>
          </ol>
        </div>
        <Button
          variant="ghostDark"
          size="icon"
          onClick={() => {
            navigate(appRoutes.cart);
          }}
          className="cart-button"
        >
          <ShoppingBasketIcon className="text-white" />
          {cartContent.length ? (
            <div className="cart-badge">{cartContent.length}</div>
          ) : null}
        </Button>
      </div>
    </nav>
  );
}
