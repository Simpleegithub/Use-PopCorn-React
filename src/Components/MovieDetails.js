import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import useKey from "../Custom_Hooks/useKey";
import { Loader } from "./Loader";
import { key } from "../App";

export function MovieDetails({
  selectedid,
  handlecloseMovie,
  handleAddWatchedMovie,
  watched,
}) {
  const [isloading, setisloading] = useState(false);
  const [Movie, setMovie] = useState({});
  const [userRating, setUserrating] = useState("");
  const countRef = useRef(0);

  useEffect(
    function () {
      if (userRating) {
        countRef.current = countRef.current + 1;
      }
    },
    [userRating]
  );

  const isWatched = watched?.map((movie) => movie.imdbID).includes(selectedid);
  const watchedrating = watched?.find(
    (movie) => movie.imdbID === selectedid
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = Movie;

  const newobj = {
    imdbID: selectedid,
    title,
    year,
    poster,
    imdbRating: Number(imdbRating),
    runtime: runtime && runtime.split(" ")[0],
    userRating,
    countRatingDecisions: countRef.current,
  };

  console.log(newobj);

  useKey("Escape", handlecloseMovie);

  useEffect(
    function () {
      async function getMovieData() {
        setisloading(true);
        const resp = await fetch(
          `http://www.omdbapi.com/?apikey=${key}&i=${selectedid}`
        );
        const data = await resp.json();
        setisloading(false);
        setMovie(data);
      }
      getMovieData();
    
    },
    [selectedid]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  return (
    <>
      {isloading ? (
        <Loader />
      ) : (
        <div className="details">
          <header>
            <button onClick={() => handlecloseMovie()} className="btn-back">
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${Movie}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    setmovierating={setUserrating}
                  />
                  {userRating > 0 && (
                    <button
                      className="btn-add"
                      onClick={() => {
                        handleAddWatchedMovie(newobj);
                        handlecloseMovie();
                      }}
                    >
                      + Add to List
                    </button>
                  )}{" "}
                </>
              ) : (
                <p>
                  You already rated this Movie {watchedrating}
                  <span>⭐</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Staring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </div>
      )}
    </>
  );
}
