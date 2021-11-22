import React from "react";
import "../App.css";

const Notification = ({ notification }) => {
  if (notification.error) {
    return (
      <div style={{ color: "green", fontSize: "32px" }}>
        {notification.message}
      </div>
    );
  } else if (!notification.error) {
    return (
      <div style={{ color: "red", fontSize: "32px" }}>
        {notification.message}
      </div>
    );
  }
};

export default Notification;
