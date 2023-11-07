import { useState, useEffect } from "react";
import { ID, Query } from "appwrite";

import {
  databases,
  DATABASE_ID,
  COLLECTION_ID_MESSAGES,
} from "../appWriteConfig";

import imgSrc from "../assets/loading.gif";
import { Trash2 , Loader } from "react-feather";

const Room = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [messageBody, setMessageBody] = useState("");

  useEffect(() => {
    getMessages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      body: messageBody,
    };

    let response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      ID.unique(),
      payload
    );

    setMessages((prevState) => [response, ...messages]);
    setMessageBody("");
  };

  const getMessages = async () => {
    setIsloading(true);
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      [Query.orderDesc("$createdAt")]
    );
    setMessages(response.documents);
    setIsloading(false);
  };

  const deleteMessage = async (message_Id) => {
    setIsloading(true);
    await databases.deleteDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      message_Id
    );
    setMessages((prevState) =>
      messages.filter((message) => message.$id !== message_Id)
    );
    setIsloading(false);
  };

  return (
    <main className="container">
      <div className="room--container">
        <form id="message--form" onSubmit={handleSubmit}>
          <div>
            <textarea
              required
              maxLength="250"
              placeholder="Say something..."
              onChange={(e) => {
                setMessageBody(e.target.value);
              }}
              value={messageBody}
            ></textarea>
          </div>

          <div className="send-btn--wrapper">
            <input className="btn btn--secondary" type="submit" value="send" />
          </div>
        </form>
        {!isLoading ? (
          <div>
            {messages.map((message) => (
              <div key={message.$id} className="message--wrapper">
                <div className="message--header">
                  <small className="message-timestamp">
                    {new Date(message.$createdAt).toLocaleString()}
                  </small>
                  <Trash2
                  className="delete--btn"
                    onClick={() => {
                      deleteMessage(message.$id);
                    }}
                  />
                </div>
                <div className="message--body">
                  <span>{message.body}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <center><Loader /></center>
        )}
      </div>
    </main>
  );
};

export default Room;
