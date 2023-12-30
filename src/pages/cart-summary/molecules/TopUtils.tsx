import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { CartContext } from "@/provider/CartProvider";
import { Trash2Icon } from "lucide-react";
import { useContext } from "react";

interface TopUtilsProps {
  id: string;
  title: string;
}

export function TopUtils({ id, title }: TopUtilsProps): JSX.Element {
  const { removeCartItem } = useContext(CartContext);
  const { toast } = useToast();

  const removeEvent = () => {
    removeCartItem(id);
    toast({
      title: "You removed an event from the cart.",
      description: title,
    });
  };

  return (
    <Button variant={"ghost"} size={"sm"} onClick={removeEvent}>
      <Trash2Icon className="text-destructive" />
    </Button>
  );
}
