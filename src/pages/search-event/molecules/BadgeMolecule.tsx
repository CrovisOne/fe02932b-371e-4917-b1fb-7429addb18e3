import { Badge } from "@/components/ui/badge";
import { DateRangeReturnType } from "../scripts/eventDateRange";
import UkFlag from "@/assets/united-kingdom.png";

interface BadgeMoleculeProps {
  dateRange: DateRangeReturnType;
}

export function BadgeMolecule({ dateRange }: BadgeMoleculeProps): JSX.Element {
  return (
    <div className="badges">
      <Badge variant={"outline"} className="badge">
        <img src={UkFlag} />
        LONDON
      </Badge>
      <Badge
        variant={"outline"}
      >{`${dateRange.earliest} - ${dateRange.latest}`}</Badge>
    </div>
  );
}
