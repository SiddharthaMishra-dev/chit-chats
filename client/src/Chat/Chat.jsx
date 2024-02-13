import Message from "../Components/Message";
import SendMessage from "../Components/SendMessage";

const Chat = ({ socket, username }) => {
  return (
    <div className="h-full">
      <Message socket={socket} />
      <SendMessage
        socket={socket}
        username={username}
      />
    </div>
  );
};

export default Chat;
