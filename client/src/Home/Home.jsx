import { useNavigate } from "react-router-dom";

const Home = ({ username, setUsername, socket }) => {
  const navigate = useNavigate();
  const joinRoom = (e) => {
    if (username !== "") {
      socket.emit("joinRoom", { username });
    }
    navigate("/chat", { replace: true });
  };

  return (
    <div className="min-h-screen w-full p-4">
      <div className="h-screen px-2 py-4 flex flex-col items-center justify-center">
        <div className="relative w-full max-w-lg">
          <h1 className="mb-5 text-center text-3xl font-bold text-gray-900 md:text-4xl">
            "Chit-Chats"
          </h1>
          <form className="flex flex-col space-y-3">
            <input
              onChange={(e) => setUsername(e.target.value)}
              placeholder="@username"
              className="p-4 bg-gray-100 rounded-md text-lg"
            />
            <button
              onClick={joinRoom}
              type="submit"
              className="bg-orange-500 rounded-md p-2 text-white text-lg font-medium"
            >
              Join
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
