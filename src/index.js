import React from "react";
import { createRoot } from 'react-dom';
import { BrowserRouter } from "react-router-dom";
// import { ReactDOM } from "react";
import App from "./App.js";
// import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <Toaster/>
    </Provider>
  </React.StrictMode>
);
