import { useNavigate } from "react-router-dom";
import { LocationProps } from "../scripts/reduceToUniqueLocations";
import { TinyCard } from "@/components/cards/TinyCard";
import { NotePlaceholder } from "@/components/placeholder/NotePlaceholder";
import { InfoIcon } from "lucide-react";
import { useRef } from "react";
import { scrollToCenter } from "../scripts/scrollToCenter";

interface LocationMoleculeProps {
  locations: LocationProps[];
  currentLocationId: string;
  loading: boolean;
  error: string | null;
}

export function LocationsMolecule({
  locations,
  currentLocationId,
  loading,
  error,
}: LocationMoleculeProps): JSX.Element {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const tinyCards = locations.map((item) => (
    <div
      data-id={item.venue.id}
      onClick={() => {
        scrollToCenter(scrollContainerRef.current, item.venue.id);
        navigate(item.venue.contentUrl ?? `/clubs/${item.venue.id}`);
      }}
    >
      <TinyCard focused={currentLocationId === item.venue.id}>
        <TinyCard.Image
          locationName={item.venue.name}
          imageUrl={item.events[0].flyerFront ?? undefined}
        />
        <TinyCard.Body
          eventCount={item.events.length}
          locationName={item.venue.name}
          locationUrl={item.venue.direction}
        />
      </TinyCard>
    </div>
  ));

  return (
    <>
      {/* While loading */}
      {loading && !error ? (
        <NotePlaceholder>
          <div className="h-3 w-3 animate-ping rounded-full bg-slate-500" />
          Loading, Please wait
        </NotePlaceholder>
      ) : null}

      {/* If an error occurs */}
      {!loading && error ? (
        <NotePlaceholder>
          {"Sorry, I couldn't find any events :("}
        </NotePlaceholder>
      ) : null}

      {/* If search result is empty */}
      {!loading && !error && locations.length === 0 ? (
        <NotePlaceholder>
          <InfoIcon />
          No search results found
        </NotePlaceholder>
      ) : null}

      {/* If everything is fine */}
      {!loading && !error && locations.length !== 0 ? (
        <div className="locations" ref={scrollContainerRef}>
          {tinyCards}
        </div>
      ) : null}
    </>
  );
}
