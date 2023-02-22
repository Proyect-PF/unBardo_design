import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import photo from "../../assets/images/home.jpg";
import Button from "../../components/Buttons/Button/Button";
import Product from "../../components/Cards/Product/Product";
import Dropdown from "../../components/DropDowns/dropdown";
import { actionCreators } from "../../state";
import { State } from "../../state/reducers";

const Home = () => {
  const dispatch = useDispatch();
  const {
    fetch_products,
    clear_product_detail,
    getFavorites,
    fetch_product_byname,
    fetch_filtered_products,
    pagination,
  } = bindActionCreators(actionCreators, dispatch);
  const [loading, setLoading] = useState(true);
  const { productList, productTotal, activePromo, searchName, page, perPage } =
    useSelector((state: State) => state.products);
  const { userId } = useSelector((state: State) => state.user);

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
    userId && getFavorites(userId);
  }, [productTotal, userId]);

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
        {activePromo === true && (
          <div className="w-full py-2 font-bold text-center bg-details">
            Promociones activas
          </div>
        )}
        <img
          className="object-cover w-full h-60 sm:h-80"
          alt="homepage"
          src={photo}
        />
        <p className="p-5 text-3xl font-bold text-center font-rift">
          WELCOME TO THE JUNGLE
        </p>
        <Dropdown />
        {searchName !== "" ? (
          <p className="my-4 text-xl font-bold text-center">{`Resultados de: "${searchName}"`}</p>
        ) : null}
        <div>
          {productList.length > 0 ? (
            <div className="grid grid-cols-1 mx-auto w-fit md:grid-cols-2 lg:grid-cols-3 md:gap-x-12 xl:grid-cols-4 2xl:grid-cols-6">
              {productList.map((e) => {
                if (e.show_in_shop) {
                  return (
                    <Product
                      image={e.image}
                      image2={e.image2}
                      key={e.id}
                      name={e.name}
                      price={e.price.toString()}
                      id={Number(e.id)}
                      promotion={e.promotion}
                      promotional_price={e.promotional_price}
                    />
                  );
                }
                return <></>;
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
          {searchName !== "" ? (
            <Button
              className={"justify-center my-8"}
              type="button"
              text="Ver todos los productos"
              onClick={() => {
                fetch_product_byname("");
              }}
              name="volver"
              disabled={false}
            />
          ) : null}
        </div>
        <div className="flex justify-center">
          <div className="flex gap-4">
            <div className="flex flex-row gap-2">
              <button
                className="h-fit"
                onClick={(e) => {
                  pagination(e.currentTarget.id);
                }}
                id="-"
                name="-"
              >{`<`}</button>
              <p>{page}</p>
              <button
                className="h-fit"
                onClick={(e) => {
                  pagination(e.currentTarget.id);
                }}
                id="+"
                name="+"
              >{`>`}</button>
            </div>
            <select
              className="h-fit"
              id="perPage"
              name="perPage"
              value={perPage}
              onChange={(e) => {
                const { name, value } = e.target;
                fetch_filtered_products({ name, value });
              }}
            >
              <option value="10" selected>
                10
              </option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>
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
