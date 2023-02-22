import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import ActionProvider from "./utils/ActionProvider";
import config from "./utils/config";
import MessageParser from "./utils/MessageParser";
import "./utils/ChatBotStyles.css";
import { useLocation } from "react-router-dom";

const ChatBotComponent = () => {
  const location = useLocation();
  return (
    <div className="">
      {location.pathname !== "/panel" && (
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
          headerText="Chatea con UnBardo!"
          placeholderText="Escribe un mensaje..."
        />
      )}
    </div>
  );
};

export default ChatBotComponent;
