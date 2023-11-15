import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import StarRating from "./Components/StarRating";

function Test() {
  const [movierating, setmovierating] = useState(0);
  return (
    <div>
      <StarRating color="blue" setmovierating={setmovierating} />
      <p>This movie was rated {movierating} Time</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <App />
  /* <StarRating messages={['Terrible','Bad','Okay','Good','Amazing']} maxRating={20} />
    <StarRating size={24} color='red' className="test" defaultRating={3} />
    <Test/> */
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
