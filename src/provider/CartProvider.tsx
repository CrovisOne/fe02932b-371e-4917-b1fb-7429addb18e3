import { EventProps } from "@/types/events";
import { ReactNode, createContext, useState } from "react";

interface CartProps {
  cartContent: EventProps[];
  addCartItem: (event: EventProps) => void;
  removeCartItem: (id: string) => void;
}

const CartContext = createContext<CartProps>({
  cartContent: [],
  addCartItem: () => {},
  removeCartItem: () => {},
});

function CartProvider({ children }: { children: ReactNode }) {
  const [cartContent, setCartContent] = useState<EventProps[]>([]);

  const addCartItem = (event: EventProps) => {
    setCartContent((prev) => [...prev, event]);
  };

  const removeCartItem = (id: string) => {
    setCartContent((prev) => prev.filter((event) => event._id !== id));
  };

  return (
    <CartContext.Provider value={{ cartContent, addCartItem, removeCartItem }}>
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };
