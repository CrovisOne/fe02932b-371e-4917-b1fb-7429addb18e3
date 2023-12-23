import { Content, StickyBar } from "@/components/layout";
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
    <StickyBar className="sticky">
      <Content>
        <div>{eventCount !== 0 ? trimTimeFromDate(currentDate) : null}</div>
      </Content>
    </StickyBar>
  );
}
