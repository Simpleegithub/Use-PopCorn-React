import { useEffect, useRef } from "react";

export function Search({ query, setQuery }) {
  const inputElement = useRef(null);

  useEffect(
    function () {
      function Callback(e) {
        if (document.activeElement === inputElement.current) return;

        if (e.code === "Enter") {
          inputElement.current.focus();
          setQuery("");
        }
      }

      document.addEventListener("keydown", Callback);

      return function () {
        document.removeEventListener("keydown", Callback);
      };
    },
    [setQuery]
  );

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputElement}
    />
  );
}
