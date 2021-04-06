import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./Components/Login";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi();

//baa3f65e0396453390bfbd1dcf0dcec7

function App() {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;
    if (_token) {
      setToken(_token);
      spotify.setAccessToken(_token);

      spotify.getMe().then((user) => {
        console.log(":)", user);
      });
    }
    console.log("I Have a token >>>", _token);
  }, []);

  return (
    <div className="app">{token ? <h1>I am logged in.</h1> : <Login />}</div>
  );
}

export default App;
