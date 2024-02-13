import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatUsers = ({ socket, username }) => {
  const [roomUsers, setRoomUsers] = useState([]);
  const navigate = useNavigate();

  const leaveRoom = () => {
    const __createdTime__ = Date.now();
    socket.emit("leaveRoom", { username, __createdTime__ });
    navigate("/", { replace: true });
  };

  useEffect(() => {
    socket.on("room_users", (data) => {
      setRoomUsers(data);
    });
    return () => socket.off("room_users");
  }, [socket]);

  return (
    <div className="h-full w-[300px] py-2 px-7">
      <h2 className="m-4 text-lg font-medium text-center">Current Users</h2>
      <div className="flex flex-col gap-y-3">
        {roomUsers.map((user) => (
          <div className="p-3 bg-orange-100 rounded-md">{user.username}</div>
        ))}
      </div>

      <button
        className="p-3 font-medium w-full bg-orange-400 rounded-md mt-5 hover:bg-orange-300 transition"
        onClick={leaveRoom}
      >
        Leave
      </button>
    </div>
  );
};

export default ChatUsers;
