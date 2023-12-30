import { Content } from "@/components/layout";
import PlaceholderImage from "@/assets/pexels-pixabay-36717.jpg";
import { useContext } from "react";
import { EventListContext } from "@/provider/EventListProvider";
import { useParams } from "react-router-dom";
import {
  TitleBar,
  PickDescription,
  ArtistsBar,
  DateAndLocation,
  CallToAction,
} from "./molecules";

import "./event-details.scss";

export function EventDetails(): JSX.Element {
  const { events, setEvents } = useContext(EventListContext);
  const { id } = useParams();

  const currentEvent = events.find((event) => event._id === id);

  return (
    <>
      <Content navSpace>
        <div className="img-box">
          <img
            src={currentEvent?.flyerFront ?? PlaceholderImage}
            onError={(e) => {
              (e.target as HTMLImageElement).src = PlaceholderImage;
            }}
          />
          <div className="badge-box">
            <div className="badge backdrop-blur-md">
              {currentEvent?.attending ?? 0} Attending
            </div>
            {currentEvent?.venue.live ? (
              <div className="badge backdrop-blur-md">Live</div>
            ) : null}
          </div>
        </div>
        <main className="event-details-main-content">
          <TitleBar title={currentEvent?.title ?? ""} />
          <PickDescription description={currentEvent?.pick?.blurb} />
          <ArtistsBar artists={currentEvent?.artists ?? []} />
          <DateAndLocation
            startTime={currentEvent?.startTime}
            endTime={currentEvent?.endTime}
            direction={currentEvent?.venue.direction}
            venueName={currentEvent?.venue.name ?? ""}
          />
          <CallToAction event={currentEvent} />
        </main>
      </Content>
    </>
  );
}
