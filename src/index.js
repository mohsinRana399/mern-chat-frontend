import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Routing from "./routing";
import { persistedStore, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

import "./index.css";

//tostify css
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <ToastContainer />
        <Routing />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
