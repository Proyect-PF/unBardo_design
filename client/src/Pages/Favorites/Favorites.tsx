import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import Product from "../../components/Cards/Product/Product";
import { actionCreators } from "../../state";
import { State } from "../../state/reducers";

const Favorites = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { getFavorites } = bindActionCreators(actionCreators, dispatch);

  const { productList } = useSelector((state: State) => state.products);

  const { success, userId } = useSelector((state: State) => state.user);

  const { products_id } = useSelector((state: State) => state.favorites);

    useEffect(() => {
        if(!success || !productList.length) navigate("/");
        getFavorites(userId);
    }, [productList.length, success,userId])
  const productsFavorites = productList.filter((product) =>
    products_id.includes(product.id)
  );


  return (
    <div>
      <h3 className="text-3xl font-semibold text-center font-rift">
        Productos Favoritos
      </h3>
      {productsFavorites.length ? (
        <div className="grid grid-cols-1 mx-auto w-fit md:grid-cols-2 lg:grid-cols-3 md:gap-x-12 xl:grid-cols-4 2xl:grid-cols-6">
          {productsFavorites.map((e) => {
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
            return false
          })}
        </div>
      ) : (
        <p className="mt-8 text-xl font-medium text-center font-poppins">
          No has agregado productos a tus favoritos
        </p>
      )}
    </div>
  );
};

export default Favorites;
