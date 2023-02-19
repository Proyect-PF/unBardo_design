import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import ActionProvider from "./utils/ActionProvider";
import config from "./utils/config";
import MessageParser from "./utils/MessageParser";
import "./utils/ChatBotStyles.css";

const ChatBotComponent = () => {
  return (
    <div className="">
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
        headerText="Chatea con UnBardo!"
        placeholderText="Escribe un mensaje..."
      />
    </div>
  );
};

export default ChatBotComponent;
