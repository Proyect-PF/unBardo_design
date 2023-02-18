import { createChatBotMessage } from 'react-chatbot-kit';

const config = {
  initialMessages: [createChatBotMessage(`Bienvenido a unBardo, en que puedo ayudarte?`,{loading:true})],
  customStyles: {
    botMessageBox: {
      backgroundColor: '#376B7E',
    },
    chatButton: {
      backgroundColor: '#376B7E',
    },
  },
  botName: 'UnBardoBot'
};

export default config;