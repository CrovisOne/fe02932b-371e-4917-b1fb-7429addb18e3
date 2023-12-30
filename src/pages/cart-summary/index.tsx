import { Content } from "@/components/layout";
import { CartContext } from "@/provider/CartProvider";
import { useContext } from "react";
import { SummaryCards } from "./molecules/SummaryCards";
import { SubTotal } from "./molecules/SubTotal";
import { NotePlaceholder } from "@/components/placeholder/NotePlaceholder";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "@/routes/appRoutes";

import "./cart-summary.scss";

export function CartSummaryPage(): JSX.Element {
  const { cartContent, removeCartItem } = useContext(CartContext);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(appRoutes.searchEvents);
  };
  return (
    <>
      <Content navSpace>
        <main className="cart-summary-main-content">
          <h3>Order Summary</h3>
          {cartContent.length === 0 ? (
            <NotePlaceholder>
              <div className="empty-cart-note">
                Your order is currently empty
                <Button className="return-btn" onClick={goBack}>
                  <SearchIcon />
                  Browse for Events
                </Button>
              </div>
            </NotePlaceholder>
          ) : null}
          <div className="divide-y">
            <SummaryCards
              events={cartContent}
              removeCartItem={removeCartItem}
            />
          </div>
          <hr />
          <SubTotal />
        </main>
      </Content>
    </>
  );
}
