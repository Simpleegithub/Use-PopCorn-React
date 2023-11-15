import { useEffect,useState } from "react";

export function useMovies(query,handlecloseMovie){
    const [movies, setMovies] = useState([]);
    const [isloading, setisloading] = useState(false);
    const [error, seterror] = useState("");
    const key = "fdfdc245";

    useEffect(
        function () {
        const controller=new AbortController();
    
    
          async function fetchMovies() {
            try {
              setisloading(true);
              seterror("");
    
              const resp = await fetch(
                ` http://www.omdbapi.com/?i=tt3896198&apikey=${key}&s=${query}`,{signal:controller.signal}
              );
              console.log(query);
    
              if (!resp.ok) {
                throw new Error("Something went wrong with fetching movies");
              }
    
              const data = await resp.json();
    
              if (data.Response === "False") throw new Error("Movie not Found");
    
              setMovies(data.Search);
              seterror("");
              console.log(data.Search);
    
              setisloading(false);
            } catch (err) {
              console.log(err.message);
              if(err.name !=="AbortError"){
                seterror(err.message);
                
              }
              setisloading(false);
            }
          }
    
          if (query.length < 3) {
            setMovies([]);
            seterror("");
            return;
          }
          
          handlecloseMovie();
          fetchMovies();
    
          return function(){
            controller.abort();
          }
        },
        [query]
      );

return {movies,isloading,error};
}