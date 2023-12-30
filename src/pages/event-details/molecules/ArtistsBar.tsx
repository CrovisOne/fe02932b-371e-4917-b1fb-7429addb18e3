import { ArtistProps } from "@/types/events";

interface ArtistsBarProps {
  artists: ArtistProps[];
}

export function ArtistsBar({ artists }: ArtistsBarProps): JSX.Element {
  return (
    <div className="artists-box">
      <p className="title">The Lineup</p>
      <div className="list">
        {artists.length > 0
          ? artists.map((artist, index) => {
              return index === artists.length - 1
                ? artist.name
                : `${artist.name} • `;
            })
          : "Coming soon"}
      </div>
    </div>
  );
}
