import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface BottomUtilsProps {
  index: number;
  ticketCount: string;
  setTicketCountArray: Dispatch<SetStateAction<string[]>>;
}

export function BottomUtils({
  index,
  ticketCount,
  setTicketCountArray,
}: BottomUtilsProps): JSX.Element {
  const changeValue = (value: string, index: number) => {
    let newValue = value;
    if (value === "") newValue = "1";
    if (value === "0") newValue = "1";

    const charsToRemove = "\\+\\-";
    newValue = newValue.replace(new RegExp(`[${charsToRemove}]`, "g"), "");

    setTicketCountArray((prev) => {
      const newArray = [...prev];
      newArray[index] = newValue;
      return newArray;
    });
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex">
        <Button
          variant={"secondary"}
          size={"icon"}
          className="h-[2rem] rounded-r-none"
          onClick={() => {
            changeValue((Number(ticketCount) - 1).toString(), index);
          }}
        >
          <MinusIcon className="h-5" />
        </Button>
        <Input
          className="z-10 h-[2rem] w-12 rounded-none text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          type="number"
          maxLength={3}
          min={1}
          value={ticketCount}
          onChange={(e) => {
            changeValue(e.target.value, index);
          }}
        ></Input>
        <Button
          variant={"secondary"}
          size={"icon"}
          className="h-[2rem] rounded-l-none"
          onClick={() => {
            changeValue((Number(ticketCount) + 1).toString(), index);
          }}
        >
          <PlusIcon />
        </Button>
      </div>
      <p>00,00 £</p>
    </div>
  );
}
