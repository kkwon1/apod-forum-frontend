import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Main from "./main/Main";
import ApodPost from "./post/ApodPost";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";
import CallbackRoute from "./callback/CallbackRoute";
import SearchPage from "./search/SearchPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH_DOMAIN}
    clientId={process.env.REACT_APP_CLIENT_ID}
    audience={process.env.REACT_APP_AUTH_AUDIENCE}
  >
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/page/:page" element={<Main />} />
          <Route path="post" element={<ApodPost />} />
          <Route path="/callback" element={<CallbackRoute />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
