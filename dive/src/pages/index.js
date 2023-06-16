import Navigation from "@/components/Navigation";
import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";
import io from "socket.io-client";
let socket;

const Home = () => {
  const [currentTab, setCurrentTab] = useState("Dashboard");
  // useEffect(() => socketInitializer(), []);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
    });
  };

  return (
    <main className="h-screen w-screen flex flex-col items-start justify-start">
      <Navigation />
      <div className="w-full h-full flex">
        <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
        <div className="h-full w-full bg-zinc-50"></div>
      </div>
    </main>
  );
};

export default Home;
