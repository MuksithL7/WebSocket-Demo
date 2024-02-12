import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import "../css/NotificationTable.css";
import NotificationTable from "./notificationTable";

const WebSocketComponent = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8081/ws");
    const stompClient = Stomp.over(socket);
    console.log("stompClient", stompClient);

    stompClient.connect(
      {},
      (frame) => {
        // console.log("Connected to WebSocket", frame);
        stompClient.subscribe("/topic/greetings", (message) => {
          const msg = JSON.parse(message.body);
          //   console.log("message", msg);
          setNotifications((oldArray) => [...oldArray, msg]);
        });
      },
      function (error) {
        alert(error);
      }
    );

    return () => {
      stompClient.disconnect(() => {
        console.log("Disconnected from WebSocket");
      });
    };
  }, []);

  const sendNotification = () => {
    const socket = new SockJS("http://localhost:8081/ws");
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
      const notification = {
        message: "Notification message from React"
      };

      stompClient.send("/app/notification", {}, JSON.stringify(notification));
      console.log("Notification sent to server");
    });
  };

  return (
    <div>
      <h1>NOTIFICATIONS</h1>

      <div>
        {notifications.length !== 0 ? (
          <NotificationTable notifications={notifications} />
        ) : (
          <div>Nothing to Show!</div>
        )}
      </div>
      <br></br>
      <div>
        <button onClick={sendNotification}>Send Notification</button>
      </div>
    </div>
  );
};

export default WebSocketComponent;
