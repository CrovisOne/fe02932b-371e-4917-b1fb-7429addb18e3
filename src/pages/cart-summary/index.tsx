import { SummaryCard } from "@/components/cards/SummaryCard";
import { Content } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { CartContext } from "@/provider/CartProvider";
import { EventProps } from "@/types/events";
import {
  CalendarIcon,
  MapPinIcon,
  MinusIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react";
import { useContext } from "react";

export function CartSummaryPage(): JSX.Element {
  const { toast } = useToast();

  const { cartContent, removeCartItem } = useContext(CartContext);

  const summary = cartContent.map((event) => (
    <SummaryCard>
      <SummaryCard.Image imageUrl={event.flyerFront ?? undefined} />
      <SummaryCard.Body
        title={event.title}
        description={
          <>
            <span className="flex items-center gap-2 text-slate-500">
              <CalendarIcon className="h-4" />
              <p>Date</p>
            </span>
            <span className="flex items-center gap-2 text-slate-500">
              <MapPinIcon className="h-4" />
              <p>Location</p>
            </span>
          </>
        }
        topUtils={
          <Button
            variant={"ghost"}
            size={"sm"}
            onClick={() => {
              remove(event);
            }}
          >
            <Trash2Icon className="text-destructive" />
          </Button>
        }
        bottomUtils={
          <div className="flex items-center gap-4">
            <div className="flex">
              <Button
                variant={"secondary"}
                size={"icon"}
                className="h-[2rem] rounded-r-none"
              >
                <MinusIcon className="h-5" />
              </Button>
              <Input
                className="z-10 h-[2rem] w-12 rounded-none text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                type="number"
                maxLength={3}
              ></Input>
              <Button
                variant={"secondary"}
                size={"icon"}
                className="h-[2rem] rounded-l-none"
              >
                <PlusIcon />
              </Button>
            </div>
            <p>00,00 £</p>
          </div>
        }
      />
    </SummaryCard>
  ));

  const remove = (event: EventProps) => {
    removeCartItem(event._id);
    toast({
      title: "You removed an event from the cart.",
      description: event.title,
    });
  };

  return (
    <>
      <Content>
        <main className="pt-4">
          <h3 className="mb-8 mt-4">Order Summary</h3>
          {cartContent.length === 0 ? (
            <div className="rounded-md border border-slate-400 bg-slate-100 px-4 py-2 font-medium">
              Your order is currently empty
            </div>
          ) : null}
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
