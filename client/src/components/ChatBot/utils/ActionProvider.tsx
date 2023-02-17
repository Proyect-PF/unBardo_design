import React from "react";

const ActionProvider = ({ createChatBotMessage, setState, children }: any) => {
  const handleHello = () => {
    const botMessage = createChatBotMessage("Hola! Con que puedo ayudarte?");
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleHelp = () => {
    const botMessage = createChatBotMessage(
      "Hola, puedo ayudarte en los siguientes temas:"
    );
    const botMessage2 = createChatBotMessage(
      "Promociones, Inicio de sesion, Ordenes, Metodos de pago, Envios, Contacto"
    );
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage, botMessage2],
    }));
  };

  const handlePromos = () => {
    const botMessage = createChatBotMessage(
      "Los articulos en promocion figuran con una etiqueta de descuento, de igual manera puedes acceder a ellos por medio de nuestros filtros!"
    );
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleLogIn = () => {
    const botMessage = createChatBotMessage(
      "Puedes iniciar sesion clickeando el boton de la esquina superior izquierda!"
    );
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleOrders = () => {
    const botMessage = createChatBotMessage(
      "Puedes revisar tus ordenes activas en tu panel de usuario una vez iniciada tu sesion!"
    );
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handlePayment = () => {
    const botMessage = createChatBotMessage(
      "Los pagos se efectuan a traves de la plataforma MercadoPago (incluyendo todas sus opciones de pago vigentes)"
    );
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleEnvios = () => {
    const botMessage = createChatBotMessage(
      "Realizamos envios a toda Argentina!"
    );
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleContact = () => {
    const botMessage = createChatBotMessage(
      "Puedes contactarnos a traves de las siguientes plataformas:"
    );
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleSizes = () => {
    const botMessage = createChatBotMessage(
      "Nuestros talles son unisex con las siguientes medidas:"
    );
    const botMessage2 = createChatBotMessage(
      "Talle 1: Ancho 56cm, Largo 70cm, Manga 24cm"
    );
    const botMessage3 = createChatBotMessage(
      "Talle 2: Ancho 60cm, Largo 74cm, Manga 26cm"
    );
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage, botMessage2, botMessage3],
    }));
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handleHelp,
            handlePromos,
            handleLogIn,
            handleOrders,
            handlePayment,
            handleEnvios,
            handleContact,
            handleSizes,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
