// import React from "react";
// import {createRoot} from "react-dom/client";
// import App from "./App";



// let root = createRoot(document.getElementById("root") as HTMLElement)

// root.render(
//     <App/>
// );
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";



ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
); 