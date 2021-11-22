import React from "react";
import "../App.css";

const InfoMessage = ({ infoMessage }) => {
  if (!infoMessage) {
    return null;
  }

  return <div style={{ color: "green", fontSize: "32px" }}>{infoMessage.message}</div>;
};

export default InfoMessage;
