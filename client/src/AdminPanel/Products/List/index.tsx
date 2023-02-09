import { useSelector } from "react-redux";
import { State } from "../../../state/reducers";

type Props = {
  className: string;
};
const ListProducts = ({ className }: Props): JSX.Element => {
  const { productTotal } = useSelector((state: State) => state.products);

  return (
    <div className={className}>
      {productTotal &&
        productTotal.map((e) => (
          <div className="flex items-center justify-around w-1/2 gap-10">
            <p>{e.name}</p>
            <p>{e.description}</p>
            <p>{e.color}</p>
            <p>{e.price}</p>
            <p>{e.show_in_shop ? "Si" : "No"}</p>
            <p>{e.S}</p>
            <p>{e.M}</p>
            <p>{e.L}</p>
            <p>{e.XL}</p>
            <img src={e.image} className="w-20" />
          </div>
        ))}
    </div>
  );
};

export default ListProducts;
