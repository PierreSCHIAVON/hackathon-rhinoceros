import React, { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { io } from "socket.io-client";
import MapComponent from "./MapComponent";

const Alerts: React.FC = () => {
  useEffect(() => {
    const socket = io('http://localhost:3000/alertSocket');
    console.log(socket);

    socket.on('new_alert', (alert: { type: string; zone: number }) => {
      toast.error(`Nouvelle alerte : ${alert.type} dans la zone ${alert.zone}`);
    });

    return () => {
      socket.disconnect();
    };
  }, []);


  return (
    <div className="h-full w-full">
      <Toaster />

      <MapComponent />
    </div>
  );
};

const Mainpage: React.FC = () => {
  return <Alerts />;
};

export default Mainpage;
