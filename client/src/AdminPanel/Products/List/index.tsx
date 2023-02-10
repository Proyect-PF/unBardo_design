import { useSelector } from "react-redux";
import { State } from "../../../state/reducers";

type Props = {
  className: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  setId: React.Dispatch<React.SetStateAction<number>>;
};
const ListProducts = ({
  className,
  setSelected,
  setId,
}: Props): JSX.Element => {
  const { productTotal } = useSelector((state: State) => state.products);

  return (
    <div className={`${className}`}>
      {productTotal &&
        productTotal.map((e) => (
          <div className="flex items-center justify-around w-full text-center border-t">
            <p className="w-8 border-r border-black">{e.id}</p>
            <p className="w-8">{e.name}</p>
            <p className="w-8">{e.description}</p>
            <p className="w-8">{e.color}</p>
            <p className="w-8">{e.price}</p>
            <p className="w-8">{e.show_in_shop ? "Si" : "No"}</p>
            <p className="w-8">{e.S}</p>
            <p className="w-8">{e.M}</p>
            <p className="w-8">{e.L}</p>
            <p className="w-8">{e.XL}</p>
            <img src={e.image} className="w-20" />
            <button
              onClick={() => {
                setId(e.id);
                setSelected("edit");
              }}
              className="w-10 py-2 border border-black"
            >
              Edit
            </button>
          </div>
        ))}
    </div>
  );
};

export default ListProducts;
