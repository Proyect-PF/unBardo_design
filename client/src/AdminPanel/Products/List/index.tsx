import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../state/reducers";
import { useEffect } from "react";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../state";

type Props = {
  className: string;
};
const ListProducts = ({ className }: Props): JSX.Element => {
  const dispatch = useDispatch();
  const { fetch_products } = bindActionCreators(actionCreators, dispatch);
  const { productTotal } = useSelector((state: State) => state.products);

  useEffect(() => {
    fetch_products();
  }, []);

  return (
    <div className={className}>
      {productTotal &&
        productTotal.map((e) => (
          <div className="flex items-center justify-around w-1/2 gap-10">
            <p>{e.name}</p>
            <p>{e.description}</p>
            <p>{e.color}</p>
            <p>{e.price}</p>
            <p>{e.show_in_shop}</p>
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
