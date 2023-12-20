import { ShoppingBasketIcon } from "lucide-react";
import { Button } from "../ui/button";

import "./Navbar.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { appRoutes } from "@/routes/appRoutes";
import { useContext } from "react";
import { CartContext } from "@/provider/CartProvider";

export function Navbar(): JSX.Element {
  const navigate = useNavigate();
  const { cartContent } = useContext(CartContext);

  return (
    <nav
      id="navbar"
      className="bg-background-dark fixed top-0 z-50 h-16 w-full shadow-md"
    >
      <div className="content mx-auto flex h-full max-w-screen-xl items-center justify-between px-4 py-2">
        <div className="flex h-full items-center gap-[8vw]">
          <Button variant="default">BRAND</Button>
          <ol className="nav-items flex items-center gap-8 text-white">
            <li className="flex items-center justify-center">
              <NavLink to={appRoutes.searchEvents}>Events</NavLink>
            </li>
            <li className="flex items-center justify-center">
              <NavLink to={appRoutes.searchLocation}>Locations</NavLink>
            </li>
          </ol>
        </div>
        <div className="text-white">{cartContent.length}</div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            navigate(appRoutes.cart);
          }}
        >
          <ShoppingBasketIcon className="text-white" />
        </Button>
      </div>
    </nav>
  );
}
