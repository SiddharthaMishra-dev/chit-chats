import { useEffect } from "react";
import Message from "../Components/Message";
import SendMessage from "../Components/SendMessage";
import { toast } from "sonner";

const Chat = ({ socket, username }) => {
  useEffect(() => {
    socket.on("acknowledge", (data) => {
      toast.success(data.message);
    });

    return () => socket.off("acknowledge");
  }, [socket]);

  return (
    <div className="h-[90vh] flex flex-col justify-between items-center">
      <Message
        socket={socket}
        username={username}
      />
      <SendMessage
        socket={socket}
        username={username}
      />
    </div>
  );
};

export default Chat;
