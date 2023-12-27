import { Badge } from "@/components/ui/badge";
import UkFlag from "@/assets/united-kingdom.png";
import { DateRangeReturnType } from "@/pages/search-event/scripts/eventDateRange";

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
