import { cleanedDate } from "@/components/cards/ImageCard/scripts/handleDate";
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
import { useContext, useState } from "react";

export function CartSummaryPage(): JSX.Element {
  const { toast } = useToast();

  const { cartContent, removeCartItem } = useContext(CartContext);
  const [ticketCountArray, setticketCountArray] = useState<string[]>(
    new Array(cartContent.length).fill("1"),
  );

  const summary = cartContent.map((event, index) => (
    <SummaryCard>
      <SummaryCard.Image imageUrl={undefined} />
      <SummaryCard.Body
        title={event.title}
        description={
          <>
            <span className="flex items-center gap-2 text-slate-500">
              <CalendarIcon className="h-4" />
              <p>{cleanedDate(event.startTime, event.endTime)}</p>
            </span>
            <span className="flex items-center gap-2 text-slate-500">
              <MapPinIcon className="h-4" />
              <a
                className="text-purple-600 underline"
                href={event.venue.direction}
                target="_blank"
              >
                {event.venue.name}
              </a>
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
                onClick={() => {
                  changeValue(
                    (Number(ticketCountArray[index]) - 1).toString(),
                    index,
                  );
                }}
              >
                <MinusIcon className="h-5" />
              </Button>
              <Input
                className="z-10 h-[2rem] w-12 rounded-none text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                type="number"
                maxLength={3}
                min={1}
                value={ticketCountArray[index]}
                onChange={(e) => {
                  changeValue(e.target.value, index);
                }}
              ></Input>
              <Button
                variant={"secondary"}
                size={"icon"}
                className="h-[2rem] rounded-l-none"
                onClick={() => {
                  changeValue(
                    (Number(ticketCountArray[index]) + 1).toString(),
                    index,
                  );
                }}
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

  const changeValue = (value: string, index: number) => {
    let newValue = value;
    if (value === "") newValue = "1";
    if (value === "0") newValue = "1";

    const charsToRemove = "\\+\\-";
    newValue = newValue.replace(new RegExp(`[${charsToRemove}]`, "g"), "");

    setticketCountArray((prev) => {
      const newArray = [...prev];
      newArray[index] = newValue;
      return newArray;
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
          <div className="divide-y">{summary}</div>
          <hr className="my-6 h-1 rounded border-none bg-slate-200" />
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
