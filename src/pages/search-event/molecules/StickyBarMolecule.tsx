import { StickyBar } from "@/components/layout";
import { trimTimeFromDate } from "@/utils/dateHandler";

interface StickyBarMoleculeProps {
  eventCount: number;
  currentDate: string;
}

export function StickyBarMolecule({
  eventCount,
  currentDate,
}: StickyBarMoleculeProps): JSX.Element {
  return (
    <StickyBar>
      {eventCount !== 0 ? trimTimeFromDate(currentDate) : null}
    </StickyBar>
  );
}
