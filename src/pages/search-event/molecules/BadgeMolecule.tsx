import { Badge } from "@/components/ui/badge";
import { DateRangeReturnType } from "../scripts/eventDateRange";
import UkFlag from "@/assets/united-kingdom.png";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

interface BadgeMoleculeProps {
  dateRange: DateRangeReturnType;
}

export function BadgeMolecule({ dateRange }: BadgeMoleculeProps): JSX.Element {
  return (
    <div className="flex gap-4">
      <Badge variant={"outline"} className="flex gap-2 px-2">
        <img
          src={UkFlag}
          className="aspect-square h-6 w-6 overflow-hidden rounded-full"
        />
        LONDON
      </Badge>
      <Badge
        variant={"outline"}
      >{`${dateRange.earliest} - ${dateRange.latest}`}</Badge>
    </div>
  );
}
