import React from "react";

const MessageParser = ({ children, actions }: any) => {
  const parse = (message: any) => {
    if (message.includes("hola")) {
      actions.handleHello();
    } else if (
      message.includes("pago") ||
      message.includes("tarjeta") ||
      message.includes("efectivo")
    ) {
      actions.handlePayment();
    } else if (message.includes("promo") || message.includes("descuento")) {
      actions.handlePromos();
    } else if (
      message.includes("sesion") ||
      message.includes("registr") ||
      message.includes("perfil")
    ) {
      actions.handleLogIn();
    } else if (
      message.includes("orden") ||
      message.includes("estado") ||
      message.includes("compra")
    ) {
      actions.handleOrders();
    } else if (message.includes("envio")) {
      actions.handleEnvios();
    } else if (
      message.includes("contacto") ||
      message.includes("whatsapp") ||
      message.includes("numero") ||
      message.includes("telefono") ||
      message.includes("mail") ||
      message.includes("mensaje") ||
      message.includes("insta")
    ) {
      actions.handleContact();
    } else if (
      message.includes("talle") ||
      message.includes("largo") ||
      message.includes("ancho") ||
      message.includes("medida")
    ) {
      actions.handleSizes();
    } else {
      actions.handleHelp();
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;
