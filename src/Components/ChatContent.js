import React, { useState, useEffect } from "react";
import Picker from "emoji-picker-react";
import { FaRegSmile } from "react-icons/fa";
import { FcLike } from "react-icons/fc";


import "./ChatContent.css";

function ChatContent() {
   
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      author: "Alan",
      message: "Welcome to Team chat. Send a message now to start interacting with others",
      time: "12:00 PM",
      likes: 0,
      
    },
    {
      id: 2,
      author: "Bob",
      message: "Hi!",
      time: "12:01 PM",
      likes:0,
      
    },
  ]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];
  
  const userAvatars = {
    Alan: "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fs3.amazonaws.com%2Fappforest_uf%2Ff1512936020165x278911292087286720%2FA.png?w=&h=&auto=compress&dpr=1&fit=max",
    Bob: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Eo_circle_red_letter-b.svg/2048px-Eo_circle_red_letter-b.svg.png",
    Carol:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0ggo_hZpHmzcZhL91r8rVwqIXVvs4QuHt1UvYqcoxrL4QA5MdcCehGAYqbEm2xAZ7EW0&usqp=CAU",
    Dean: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqUOgWJzv7GyfSBUqcu8fxvu0LG26Z8laQYAXB0WqLM2cmxnmzzzOtZvHdu_0fM9FatNM&usqp=CAU",
    Elin: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrXrXhTOCAOEJek1h8siAIPoJS6NPfHvMGkfaKpUwwAuOl0WiTmIKaOK-nRkSkl_cDwN4&usqp=CAU",
  };
  const [inputValue, setInputValue] = useState("");

  const username = user_list[Math.floor(Math.random() * user_list.length)];

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  

  const handleLike = (id) => {
    const newMessages = [...messages];
    newMessages[id].likes += 1;
    setMessages(newMessages);
  };

  
  const onEmojiClick = (event, emojiObject) => {
    setInputValue((prevInput) => prevInput + emojiObject.emoji);
    setShowEmojiPicker(false);
  };
  const [width, setWidth] = useState(215);

  useEffect(() => {
    setWidth(Math.min(50, Math.max(215, messages.length * 10)) + "px");
  } ,[messages.length]);

   

  
  const handleSubmit = (event) => {
    event.preventDefault();

    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        author: username,
        message: inputValue,
        time: new Date().toLocaleTimeString(),
        likes:  0,
      },
    ]);
    setInputValue("");
  };

  return (
    <div className="app">
      <div className="chat-window">
        <div className="Header">
          <h4>Introductions</h4>
          <p>This Channel Is For Company Wider Chatter</p>
        </div>
        <div className="message-display">
          {messages.map((message, id) => (
            <div key={message.id } className="message">
              <img
                src={userAvatars[message.author]}
                alt={`${message.author} author`}
              />

              <div className="message-info">
                <span className="author">{message.author}</span>
                <span className="time">{message.time}</span>
              </div>
              <div className="chat-item">
                <p className="message-text" style={{ width }}>
                  {message.message}
                  <button
                    className="Like-Style"
                    onClick={() => handleLike(id)}
                  >
                    <FcLike /> {message.likes}
                  </button>
                </p>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter message..."
              className="input-field"
            />
            <button
              className="emoji"
              type="button"
              onClick={() => setShowEmojiPicker((val) => !val)}
            >
              <FaRegSmile />
            </button>
            <button className="buttonStyles" type="submit">
              Send
            </button>
          </div>

          {showEmojiPicker && (
            <Picker
              pickerStyle={{
                width: "50%",
                position: "absolute",
                bottom: "100px",
              }}
              onEmojiClick={onEmojiClick}
            />
          )}
        </form>
      </div>
    </div>
  );
}

export default ChatContent;


