import { createContext, useContext } from "react";
import { TinyCardProps } from ".";

const TinyCardContext = createContext<TinyCardProps | null>(null);

export function useTinyCardContext(): TinyCardProps {
  const context = useContext(TinyCardContext);

  if (context === null) {
    throw new Error("TinyCard.* must be rendered as a child of TinyCard");
  }

  return context;
}

export default TinyCardContext;
