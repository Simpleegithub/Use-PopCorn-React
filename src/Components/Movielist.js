import { Movie } from "./Movie";

export function Movielist({ movies, handleselectedMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          handleselectedMovie={handleselectedMovie}
        />
      ))}
    </ul>
  );
}
