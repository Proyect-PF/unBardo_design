import photo from "../../assets/images/homep.jpg";
import ig1 from "../../assets/images/ig1.jpg";
import ig2 from "../../assets/images/ig2.jpg";
import ig3 from "../../assets/images/ig3.jpg";
import Product from "../../components/Cards/Product/Product";

const Home = () => {
  return (
    <>
      <img className="object-none w-full h-48" alt="homepage" src={photo} />
      <p className="p-5 font-mono font-bold text-center border-b-2">
        WELCOME TO THE JUNGLE
      </p>
      <div className="grid justify-center grid-cols-2 border-b-2">
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </div>

      <div className="flex flex-col items-center justify-center w-full h-48 gap-4 my-5 font-mono ">
        <p className="text-xs font-semibold leading-none text-center">
          ETIQUETANOS EN INSTAGRAM @UNBARDO
        </p>
        <div className="inline-flex items-center justify-center w-full pb-5 space-x-4 ">
          <img className="w-24 h-full" alt="instagram post" src={ig1} />
          <img className="w-24 h-full" alt="instagram post" src={ig3} />
          <img className="w-24 h-full" alt="instagram post" src={ig2} />
        </div>
      </div>
    </>
  );
};
export default Home;
