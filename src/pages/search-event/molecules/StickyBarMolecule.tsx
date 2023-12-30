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
  const date = trimTimeFromDate(currentDate);
  const isValidDate = date !== "Invalid Date";

  return (
    <StickyBar className="sticky">
      <Content>
        <div>{eventCount !== 0 && isValidDate ? date : null}</div>
      </Content>
    </StickyBar>
  );
}
