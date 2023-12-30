import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { CartContext } from "@/provider/CartProvider";
import { appRoutes } from "@/routes/appRoutes";
import { EventProps } from "@/types/events";
import { PlusIcon } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

interface CallToActionProps {
  event?: EventProps;
}

export function CallToAction({ event }: CallToActionProps): JSX.Element {
  const { toast } = useToast();
  const { addCartItem } = useContext(CartContext);
  const navigate = useNavigate();

  const addToCart = () => {
    if (!event) return;
    addCartItem(event);
    toast({
      variant: "success",
      title: "You Added an Event to your Cart",
      description: event.title,
    });
    navigate(appRoutes.searchEvents);
  };

  return (
    <div className="box call-to-action">
      <p className="text-lg">00,00 £</p>
      <Button
        className="action-button"
        onClick={addToCart}
        disabled={event === undefined}
      >
        <PlusIcon /> Add to Cart
      </Button>
    </div>
  );
}
