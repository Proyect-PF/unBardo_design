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
      message.includes("envio") ||
      message.includes("segui") ||
      message.includes("estado") ||
      message.includes("pedido") ||
      message.includes("andreani")
    ) {
      actions.handleShipping();
    } else if (message.includes("orden") || message.includes("compra")) {
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
    } else if (
      message.includes("cuidad") ||
      message.includes("precauc") ||
      message.includes("estampa")
    ) {
      actions.handleCares();
    } else if (
      message.includes("defect") ||
      message.includes("problema") ||
      message.includes("reembolso") ||
      message.includes("falla") ||
      message.includes("roto") ||
      message.includes("devol")
    ) {
      actions.handleReturns();
    } else if (
      message.includes("encuentr") ||
      message.includes("punto") ||
      message.includes("retir") ||
      message.includes("local") ||
      message.includes("sucursal")
    ) {
      actions.handleTakeAway();
    } else if (message.includes("elena")) {
      actions.handleEaster();
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
