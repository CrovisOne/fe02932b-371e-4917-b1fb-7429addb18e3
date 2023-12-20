export interface EventProps {
  _id: string;
  title: string;
  flyerFront?: string | null;
  attending: number;
  date: string;
  startTime?: string;
  endTime?: string;
  contentUrl: string;
  venue: VenueProps;
  pick?: PickProps;
  artists: ArtistProps[];
  city: string;
  country: string;
  private: boolean;
  __v: number;
}

interface VenueProps {
  id: string;
  name: string;
  contentUrl: string | null;
  live: boolean;
  direction: string;
}

interface PickProps {
  id: string;
  blurb: string;
}

interface ArtistProps {
  id: string;
  name: string;
  _id: {
    $oid: string;
  };
}
