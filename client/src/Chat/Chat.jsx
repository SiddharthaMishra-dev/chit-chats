import { useEffect } from "react";
import Message from "../Components/Message";
import SendMessage from "../Components/SendMessage";
import { toast } from "sonner";
import ChatUsers from "../Components/ChatUsers";

const Chat = ({ socket, username }) => {
  useEffect(() => {
    socket.on("acknowledge", (data) => {
      toast.success(data.message);
    });

    return () => socket.off("acknowledge");
  }, [socket]);

  return (
    <div className="h-full w-full flex gap-x-2">
      <ChatUsers
        socket={socket}
        username={username}
      />
      <div className="h-[90vh] flex-1 flex flex-col justify-between items-center">
        <Message
          socket={socket}
          username={username}
        />
        <SendMessage
          socket={socket}
          username={username}
        />
      </div>
    </div>
  );
};

export default Chat;
