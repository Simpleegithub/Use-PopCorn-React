import { WatchedMovie } from "./WatchedMovie";

export function WatchedList({ watched, handledeletewatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          handledeletewatched={handledeletewatched}
        />
      ))}
    </ul>
  );
}
