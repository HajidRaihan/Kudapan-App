import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketTest = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:8000");
    setSocket(newSocket);
  }, []);

  useEffect(() => {
    socket?.emit("message", "hello bapakmu");
    socket?.on("message", (data) => {
      console.log(data);
    });
    socket?.on("newOrder", (data) => {
      console.log(data);
    });
  }, [socket]);

  return <div></div>;
};

export default SocketTest;
