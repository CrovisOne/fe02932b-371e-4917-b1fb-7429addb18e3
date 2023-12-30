import { EventProps } from "@/types/events";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface EventsListContextProps {
  events: EventProps[];
  setEvents: Dispatch<SetStateAction<EventProps[]>>;
}

const EventListContext = createContext<EventsListContextProps>({
  events: [],
  setEvents: () => {},
});

function EventListProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<EventProps[]>([]);

  return (
    <EventListContext.Provider value={{ events, setEvents }}>
      {children}
    </EventListContext.Provider>
  );
}

export { EventListContext, EventListProvider };
