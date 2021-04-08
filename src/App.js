import React, { useEffect } from "react";
import "./App.css";
import Login from "./Components/Login";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./Components/Player/Player";
import { useStateValue } from "./Components/StateProvider";

const spotify = new SpotifyWebApi();

//baa3f65e0396453390bfbd1dcf0dcec7

function App() {
  //eslint-disable-next-line
  const [{ user, token }, dispatch] = useStateValue();
  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;
    if (_token) {
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });
      dispatch({
        type: "SET_SPOTIFY",
        spotify: spotify,
      });
      spotify.setAccessToken(_token);
      spotify.getMyTopArtists().then((response) =>
        dispatch({
          type: "SET_TOP_ARTISTS",
          top_artists: response,
        })
      );

      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user: user,
        });
      });

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlists,
        });
      });

      spotify.getPlaylist("37i9dQZEVXcKxQSVkKqqyi").then((response) =>
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
        })
      );
    }
  }, [dispatch]);

  return (
    <div className="app">
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;
