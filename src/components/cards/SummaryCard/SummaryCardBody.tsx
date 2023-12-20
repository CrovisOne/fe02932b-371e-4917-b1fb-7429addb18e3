import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CalendarIcon,
  MapPinIcon,
  MinusIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react";

export function SummaryCardBody(): JSX.Element {
  return (
    <div className="mx-4 flex w-full flex-col gap-1">
      <div className="flex justify-between gap-2">
        <p className="line-clamp-1 overflow-hidden text-lg font-semibold">
          Fuego! with Om Unit, Ruby Savage, Iration Steppas, Jamie Rodigan, Pete
          OTC, Makin' Moves..
        </p>
        <Button variant={"ghost"} size={"sm"}>
          <Trash2Icon className="text-destructive" />
        </Button>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <span className="flex items-center gap-2 text-slate-500">
            <CalendarIcon className="h-4" />
            <p>Date</p>
          </span>
          <span className="flex items-center gap-2 text-slate-500">
            <MapPinIcon className="h-4" />
            <p>Location</p>
          </span>
        </div>
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
      </div>
    </div>
  );
}
