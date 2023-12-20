import { SummaryCard } from "@/components/cards/SummaryCard";
import { Content } from "@/components/layout";
import { CartContext } from "@/provider/CartProvider";
import { useContext } from "react";

export function CartSummaryPage(): JSX.Element {
  const { cartContent, removeCartItem } = useContext(CartContext);

  const summary = cartContent.map((event) => (
    <SummaryCard>
      <SummaryCard.Image />
      <SummaryCard.Body />
    </SummaryCard>
  ));

  return (
    <>
      <Content>
        <main className="pt-4">
          <h3 className="mb-8 mt-4">Order Summary</h3>
          <div className="">{summary}</div>
          <hr className="my-8 h-1 rounded border-none bg-slate-200" />
          <div className="flex w-full justify-end">
            <div className="flex flex-col items-end gap-1">
              <p className="font-medium text-slate-600">Subtotal</p>
              <p className="text-xl font-semibold">00,00 £</p>
            </div>
          </div>
        </main>
      </Content>
    </>
  );
}
