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
      "Promociones, Inicio de sesion, Ordenes, Metodos de pago, Envios, Contacto, Cuidados, Devoluciones y muchas mas!"
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
    const botMessage2 = createChatBotMessage("Email: unbardodesign @gmail.com");
    const botMessage3 = createChatBotMessage("Whatsapp:  +54 11 3612 6072");
    const botMessage4 = createChatBotMessage("Instagram: @unBardo.design");
    setState((prev: any) => ({
      ...prev,
      messages: [
        ...prev.messages,
        botMessage,
        botMessage2,
        botMessage3,
        botMessage4,
      ],
    }));
  };

  const handleSizes = () => {
    const botMessage = createChatBotMessage(
      "Nuestros talles son unisex con las siguientes medidas:"
    );
    const botMessage2 = createChatBotMessage(
      "Talle 1: Ancho 56cm, Largo 70cm, Manga 24cm (Ideal para mujeres)"
    );
    const botMessage3 = createChatBotMessage(
      "Talle 2: Ancho 60cm, Largo 74cm, Manga 26cm (Ideal para hombres)"
    );
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage, botMessage2, botMessage3],
    }));
  };

  const handleCares = () => {
    const botMessage = createChatBotMessage(
      "Para mayor precaución en el cuidado del producto lava la camiseta al revés, plancha por el reverso del estampado, evita el uso de secadores o temperaturas altas de forma constante en las prendas. "
    );
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleShipping = () => {
    const botMessage = createChatBotMessage(
      "Si no te llego el envio aún. Podes seguir el estado del pedido en andreani.com escribiendo el codigo de tu envío"
    );
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleReturns = () => {
    const botMessage = createChatBotMessage(
      "Si el producto tiene algun defecto y lo queres devolver, contactate con nosotros a traves de cualquier de nuestras plataformas:"
    );
    const botMessage2 = createChatBotMessage("Email: unbardodesign @gmail.com");
    const botMessage3 = createChatBotMessage("Whatsapp:  +54 11 3612 6072");
    const botMessage4 = createChatBotMessage("Instagram: @unBardo.design");
    setState((prev: any) => ({
      ...prev,
      messages: [
        ...prev.messages,
        botMessage,
        botMessage2,
        botMessage3,
        botMessage4,
      ],
    }));
  };

  const handleTakeAway = () => {
    const botMessage = createChatBotMessage(
      "Por el momento las remeras solo se entregan a domicilio, no se pueden retirar."
    );
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleEaster = () => {
    const botMessage = createChatBotMessage("Esta en la plaia.");
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
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
            handleCares,
            handleShipping,
            handleReturns,
            handleTakeAway,
            handleEaster,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
