import { useState } from "react";

const SendMessage = ({ socket, username }) => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message !== "") {
      const __createdTime__ = Date.now();
      socket.emit("send_message", { username, message, __createdTime__ });
    }
    setMessage("");
  };

  return (
    <div className="w-full max-w-lg mx-auto px-3 py-4 mt-auto">
      <div className="flex gap-x-3">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full bg-orange-100 px-3 py-4 rounded-md text-md placeholder:text-gray-700 placeholder:font-medium outline-none"
          placeholder="Message"
        />
        <button
          className=" w-[100px] bg-orange-400 rounded-md"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default SendMessage;
