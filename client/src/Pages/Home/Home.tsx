import photo from "../../assets/images/homep.jpg";
import ig1 from "../../assets/images/ig1.jpg";
import ig2 from "../../assets/images/ig2.jpg";
import Product from "../../components/Cards/Product/Product";
import imageB from "../../assets/images/remeras/unbardo-07B.png";
import imageF from "../../assets/images/remeras/unbardo-07F.png";
import { useSelector } from "react-redux";
import { State } from "../../state/reducers";
import { useEffect, useState } from "react";

const Home = () => {
  const { productList } = useSelector((state: State) => state.products);

  return (
    <div>
      <img className="object-none w-full h-48" alt="homepage" src={photo} />
      <p className="p-5 font-mono font-bold text-center border-b-2">
        WELCOME TO THE JUNGLE
      </p>
      <div className="grid grid-cols-1 mx-auto w-fit md:grid-cols-2 lg:grid-cols-3 md:gap-x-12 xl:grid-cols-4 2xl:grid-cols-6">
        {productList.length > 0 &&
          productList.map(
            (e): JSX.Element => (
              <Product
                imageB={imageB}
                imageF={imageF}
                name={e.name}
                id={e.id}
              />
            )
          )}
      </div>
      <div className="flex flex-col items-center justify-center w-full h-auto gap-4 mt-5 font-mono border-t-2 mb-7">
        <p className="mt-5 text-xs font-semibold text-center">
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
      </div>
    </div>
  );
};
export default Home;
