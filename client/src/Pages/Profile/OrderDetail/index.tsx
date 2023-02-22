import axios from "axios";
import { useEffect, useState } from "react";
import Button from "../../../components/Buttons/Button/Button";
import { baseURL, PORT } from "../../../utils/url&port";

export interface Props {
  setPanel: React.Dispatch<React.SetStateAction<string>>;
  detailId: number;
}

let initialState = {
  id: 0,
  payment_id: 0,
  updatedAt: "",
  status: "",
  dispatched: false,
  track_id: "",
  fullname: "",
  email: "",
  products: [
    {
      id: 1,
      id_product: 1,
      title: "Remera oversized king kong black",
      description:
        "Remera liviana y muy suave al tacto. Cuello redondo, con terminación de rib. Bordado en el centro del frente, suave y sin desgaste con el lavado.",
      unit_price: "5000",
      sizes: {
        L: 1,
      },
    },
  ],
};

const OrderDetail = ({ setPanel, detailId }: Props) => {
  const [details, setDetails] = useState<any>(initialState);

  useEffect(() => {
    axios.get(`${baseURL}/orders/${detailId}`).then((response) => {
      setDetails(response.data);
    });
  }, [detailId]);

  return (
    <div>
      <Button
        type="button"
        text="Atras"
        name="back"
        onClick={() => {
          setPanel("userorders");
        }}
        disabled={false}
        className="justify-end pr-12"
      />
      <div className="flex flex-col gap-10 mx-12 mt-4">
        <div className="flex gap-4 text-2xl font-medium">
          <p>{`Orden numero:`}</p>
          <p>{details.id}</p>
        </div>
        <div className="flex flex-col gap-4 text-xl">
          <p className="text-2xl font-medium">Datos del cliente:</p>
          <div className="flex flex-col gap-3 mx-8">
            <label>{`Nombre: ${details.fullname}`}</label>
            <label>{`Email: ${details.email}`}</label>
          </div>
        </div>
        <div className="flex flex-col gap-4 text-xl">
          <p className="text-2xl font-medium">Datos de la orden:</p>
          <div className="flex flex-col gap-3 mx-8">
            <p className="text-xl">{`Status: ${details.status}`}</p>
            {details.track_id !== "" && (
              <p className="text-xl">{`Track Id: ${details.track_id}`}</p>
            )}
            <p className="text-xl">{`Despachado: ${
              details.dispatched ? "Si" : "No"
            }`}</p>
            <p className="text-xl">{`Fecha: ${
              details.updatedAt.split("T")[0]
            }`}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 text-xl">
          <p className="text-2xl font-medium">Resumen:</p>
          {details.products.map((e: any) => (
            <div key={e.id_product} className="flex flex-col gap-3 mx-8">
              <p>{`Nombre del Producto: ${e.title}`}</p>

              <label>{`Cantidades:`}</label>
              <div className="flex flex-row gap-4 mx-4">
                {e.sizes.S && <p>{`Talle 1: ${e.sizes.S}`}</p>}
                {e.sizes.M && <p>{`Talle 2: ${e.sizes.M}`}</p>}
                {e.sizes.L && <p>{`Talle 3: ${e.sizes.L}`}</p>}
                {e.sizes.XL && <p>{`Talle 4: ${e.sizes.XL}`}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
