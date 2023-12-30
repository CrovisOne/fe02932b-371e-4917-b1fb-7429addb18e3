import { SummaryCard } from "@/components/cards/SummaryCard";
import { EventProps } from "@/types/events";
import { useState } from "react";
import { Description } from "./Description";
import { TopUtils } from "./TopUtils";
import { BottomUtils } from "./BottomUtils";

interface SummaryCardsProps {
  events: EventProps[];
  removeCartItem: (id: string) => void;
}

export function SummaryCards({ events }: SummaryCardsProps): JSX.Element {
  const [ticketCountArray, setTicketCountArray] = useState<string[]>(
    new Array(events.length).fill("1"),
  );

  return (
    <>
      {events.map((event, index) => (
        <SummaryCard>
          <SummaryCard.Image
            imageUrl={event.flyerFront ?? undefined}
            className="hidden md:block "
          />
          <SummaryCard.Body
            title={event.title}
            description={<Description event={event} />}
            topUtils={<TopUtils id={event._id} title={event.title} />}
            bottomUtils={
              <BottomUtils
                index={index}
                setTicketCountArray={setTicketCountArray}
                ticketCount={ticketCountArray[index]}
              />
            }
          />
        </SummaryCard>
      ))}
    </>
  );
}
