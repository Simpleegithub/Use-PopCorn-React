import { useEffect, useState } from "react";
import { useMovies } from "./Custom_Hooks/useMovies";
import { Loader } from "./Components/Loader";
import { ErrorMessage } from "./Components/ErrorMessage";
import { Navbar } from "./Components/Navbar";
import { Search } from "./Components/Search";
import { Numresults } from "./Components/Numresults";
import { Main } from "./Components/Main";
import { Box } from "./Components/Box";
import { Movielist } from "./Components/Movielist";
import { MovieDetails } from "./Components/MovieDetails";
import { WatchedSummary } from "./Components/WatchedSummary";
import { WatchedList } from "./Components/WatchedList";
export const key = "fdfdc245";

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);








export default function App() {


  const [query, setQuery] = useState("");

  const [selectedid, setselectedid] = useState("");
  const { movies, isloading, error } = useMovies(query, handlecloseMovie);


  const [watched, setWatched] = useState(function () {
    const storedvalue = localStorage.getItem("watched");
    return JSON.parse(storedvalue);
  });



  function handleselectedMovie(id) {
    setselectedid((selectedid) => (selectedid === id ? null : id));
    console.log(selectedid);
  }

  function handlecloseMovie() {
    setselectedid(null);
  }

  function handleAddWatchedMovie(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handledeletewatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
  );

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <Numresults movies={movies} />
      </Navbar>

      <Main>
        <Box movies={movies}>
          {/* {isloading ? <Loader /> : <Movielist movies={movies} />} */}
          {isloading && <Loader />}
          {!isloading && !error && (
            <Movielist
              movies={movies}
              handleselectedMovie={handleselectedMovie}
            />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedid ? (
            <MovieDetails
              selectedid={selectedid}
              handlecloseMovie={handlecloseMovie}
              handleAddWatchedMovie={handleAddWatchedMovie}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList
                watched={watched}
                handledeletewatched={handledeletewatched}
              />
            </>
          )}
        </Box>
        {/* <WatchedBox /> */}
      </Main>
    </>
  );
}
