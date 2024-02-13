import { useEffect, useState } from "react";

const Message = ({ socket, username }) => {
  const [messagesRec, setMessagesRec] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessagesRec((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          __createdTime__: data.__createdTime__,
        },
      ]);
    });

    return () => socket.off("receive_message");
  }, [socket]);

  function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  return (
    <div className="h-full w-full p-4">
      <div className="h-full max-h-[80vh] max-w-5xl mx-auto overflow-auto p-3 flex flex-col gap-y-4 bg-gray-50">
        {messagesRec.map((msg, i) => (
          <div
            key={i}
            className={
              msg.username == username
                ? "w-[300px] ml-auto bg-orange-400 px-4 py-4 rounded-md"
                : "w-[300px] mr-auto bg-orange-100 px-4 py-4 rounded-md"
            }
          >
            <div className="w-full flex justify-between">
              <span className="text-md font-medium text-gray-800">@{msg.username}</span>
              <span className="text-md">{formatDateFromTimestamp(msg.__createdTime__)}</span>
            </div>
            <div className="text-md text-muted-foreground ">{msg.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Message;
