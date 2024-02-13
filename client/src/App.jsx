import { BrowserRouter, Routes, Route } from "react-router-dom";
import { io } from "socket.io-client";
import Home from "./Home/Home";
import { useState } from "react";
import Chat from "./Chat/Chat";

const socket = io.connect("http://localhost:4000");

function App() {
  const [username, setUsername] = useState("");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                username={username}
                setUsername={setUsername}
                socket={socket}
              />
            }
          />
          <Route
            path="/chat"
            element={
              <Chat
                socket={socket}
                username={username}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
