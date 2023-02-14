// import { Cloudinary } from "@cloudinary/url-gen";
// import { AdvancedImage } from "@cloudinary/react";
// import { fill } from "@cloudinary/url-gen/actions/resize";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import photo from "../../assets/images/homep.jpg";
import ig1 from "../../assets/images/ig1.jpg";
import ig2 from "../../assets/images/ig2.jpg";
import imageB from "../../assets/images/remeras/unbardo-07B.png";
// import imageF from "../../assets/images/remeras/unbardo-07F.png";
import Button from "../../components/Buttons/Button/Button";
import Product from "../../components/Cards/Product/Product";
import Dropdown from "../../components/DropDowns/dropdown";
import { actionCreators } from "../../state";
import { State } from "../../state/reducers";

const Home = () => {
  const dispatch = useDispatch();
  const { fetch_products, clear_product_detail } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const [loading, setLoading] = useState(true);
  const { productList, productTotal } = useSelector(
    (state: State) => state.products
  );

  //AL: Set loading state true & getAllProducts actions when first entering the page, in case
  // of filtered/ordered list needs to remain during web navigation must rewire

  // Quitamos este effect para evitar dos llamadas adicionales

  // useEffect(() => {
  //   if (render) {
  //     setLoading(true);
  //     fetch_products();
  //     updateRender(false);
  //   }
  // }, [fetch_products, render, updateRender]);

  //AL: Set loading state to false when data has been retrieved
  useEffect(() => {
    if (productTotal.length > 0) setLoading(false);
    clear_product_detail();
  }, [productTotal]);

  return (
    <div>
      <div
        className={`my-8 flex justify-center ${
          !loading ? "hidden" : "visible"
        }`}
      >
        <div className="border-8 border-black border-solid rounded-full w-44 h-44 border-t-transparent animate-spin"></div>
      </div>
      <div className={loading ? "hidden" : "visible"}>
        <img className="object-none w-full h-48" alt="homepage" src={photo} />
        <p className="p-5 font-bold text-center font-anisette">
          WELCOME TO THE JUNGLE
        </p>
        <Dropdown />
        <div>
          {productList.length > 0 ? (
            <div className="grid grid-cols-1 mx-auto w-fit md:grid-cols-2 lg:grid-cols-3 md:gap-x-12 xl:grid-cols-4 2xl:grid-cols-6">
              {productList.map((e) => {
                if (e.show_in_shop) {
                  return (
                    <Product
                      imageB={imageB}
                      imageF={e.image}
                      key={e.id}
                      name={e.name}
                      price={e.price.toString()}
                      id={Number(e.id)}
                    />
                  );
                }
              })}
            </div>
          ) : (
            <div className="justify-center">
              <h4 className="p-5 text-lg font-bold text-center">
                No se encontraron resultados
              </h4>
              <Button
                className={"justify-center"}
                type="button"
                text="Volver atras"
                onClick={fetch_products}
                name="volver"
                disabled={false}
              />
            </div>
          )}
        </div>

        {/* <div className="flex flex-col items-center justify-center w-full h-auto gap-4 mt-5 border-t-2 mb-7">
          <p className="mt-5 text-2xl font-semibold text-center">
            ETIQUETANOS EN INSTAGRAM @UNBARDO
          </p>

          <div className="flex items-center justify-center w-full mb-5">
            <img className="h-56 " alt="instagram post" src={ig1} />
            <img
              className="relative h-44 z-1 top-20 right-8"
              alt="instagram post"
              src={ig2}
            />
          </div>
        </div> */}
      </div>
    </div>
  );
};
export default Home;
