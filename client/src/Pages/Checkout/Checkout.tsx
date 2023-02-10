import CheckoutCard from "../../components/Cards/Checkout/CheckoutCard";
import Button from "../../components/Buttons/Button/Button";
import { useSelector } from "react-redux";
import { State } from "../../state/reducers";

const Checkout = (): JSX.Element => {
  const { checkoutList } = useSelector((state: State) => state.checkout);

  const handleCheckout = () => {
    alert("pagadovich");
  };

  return (
    <div className="flex flex-col items-center">
      {checkoutList?.length > 0 &&
        checkoutList.map((e: any) => (
          <CheckoutCard
            key={e.id}
            id={e.id}
            name={e.name}
            size={e.size}
            price={e.price}
            ammount={e.ammount}
            imgF={e.imgF}
          />
        ))}
      <p className="mx-6 font-bold text-right">{`Total: $ ${checkoutList.reduce(
        (acc:number, e:any) => {
          return acc + e.price * e.ammount;
        },
        0
      )}`}</p>
      <Button
        className={"justify-center"}
        type="button"
        name="Checkout"
        text={`Pagar ahora (${checkoutList.reduce((acc:number, e:any) => {
          return acc + e.ammount;
        }, 0)})`}
        onClick={handleCheckout}
        disabled={checkoutList.length === 0}
      />
    </div>
  );
};

export default Checkout;
