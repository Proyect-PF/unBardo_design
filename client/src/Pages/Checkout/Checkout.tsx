import { useState } from "react";
import CheckoutCard from "../../components/Cards/Checkout/CheckoutCard";
import imgF7 from "../../assets/images/remeras/unbardo-07F.png";
import imgB7 from "../../assets/images/remeras/unbardo-07F.png";
import Button from "../../components/Buttons/Button/Button";

const Checkout = (): JSX.Element => {
  const [products, setProducts] = useState([
    {
      name: "Remera Oversize unBardo Black",
      size: "XL",
      price: 8000,
      ammount: 1,
      imgF: imgF7,
      imgB: imgB7,
    },
    {
      name: "Remera Oversize unBardo White",
      size: "L",
      price: 6000,
      ammount: 2,
      imgF: imgF7,
      imgB: imgB7,
    },
    {
      name: "Remera Oversize KingKong Black",
      size: "M",
      price: 8000,
      ammount: 3,
      imgF: imgF7,
      imgB: imgB7,
    },
  ]);

  const handleCheckout = () => {
    alert("pagadovich");
  };

  return (
    <div>
      {products?.length > 0 &&
        products.map((e) => (
          <CheckoutCard
            products={products}
            setter={setProducts}
            index={products.indexOf(e)}
          />
        ))}
      <p className="mx-6 font-bold text-right">{`Total: $ ${products.reduce(
        (acc, e) => {
          return acc + e.price * e.ammount;
        },
        0
      )}`}</p>
      <Button
        type="button"
        name="Checkout"
        text={`Pagar ahora (${products.reduce((acc, e) => {
          return acc + e.ammount;
        }, 0)})`}
        onClick={handleCheckout}
        disabled={false}
      />
    </div>
  );
};

export default Checkout;
