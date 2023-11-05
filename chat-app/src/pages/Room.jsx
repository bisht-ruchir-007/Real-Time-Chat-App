import { useState, useEffect } from "react";
import {
  databases,
  DATABASE_ID,
  COLLECTION_ID_MESSAGES,
} from "../appWriteConfig";

const Room = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = async () => {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES
    );
    setMessages(response.documents);
  };
  return (
    <main className="container">
      <div className="room--container">
        {messages.map((message) => (
          <div key={message.$id} className="message--wrapper">
            <div className="message--header">
              <small className="message-timestamp">{message.$createdAt}</small> 
            </div>
            <div className="message--body">
              <span>{message.body}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Room;
