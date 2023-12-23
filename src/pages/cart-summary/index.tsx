import { Content } from "@/components/layout";
import { CartContext } from "@/provider/CartProvider";
import { useContext } from "react";
import { SummaryCards } from "./molecules/SummaryCards";
import { SubTotal } from "./molecules/SubTotal";

import "./cart-summary.scss";
import { NotePlaceholder } from "@/components/placeholder/NotePlaceholder";

export function CartSummaryPage(): JSX.Element {
  const { cartContent, removeCartItem } = useContext(CartContext);

  return (
    <>
      <Content navSpace>
        <main className="cart-summary-main-content">
          <h3>Order Summary</h3>
          {cartContent.length === 0 ? (
            <NotePlaceholder>Your order is currently empty</NotePlaceholder>
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
