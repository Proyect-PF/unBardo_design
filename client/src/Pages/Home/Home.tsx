import photo from "../../assets/images/homep.jpg";
import ig1 from "../../assets/images/ig1.jpg";
import ig2 from "../../assets/images/ig2.jpg";
import ig3 from "../../assets/images/ig3.jpg";

const Home = () => {
  return (
    <>
      <img className="object-none w-full h-48" src={photo} />
      <p className="p-5 font-mono font-bold text-center border-b-2">
        WELCOME TO THE JUNGLE
      </p>
      <div className="grid items-center w-full grid-cols-2 text-center border-b-2">
        <div>Product Card</div>
        <div>Product Card</div>
        <div>Product Card</div>
        <div>Product Card</div>
        <div>Product Card</div>
        <div>Product Card</div>
      </div>

      <div className="flex flex-col items-center justify-center w-full h-48 gap-4 my-5 font-mono border-b-2">
        <p className="text-xs font-semibold leading-none text-center">
          ETIQUETANOS EN INSTAGRAM @UNBARDO
        </p>
        <div className="inline-flex items-center justify-center w-full pb-5 space-x-4 ">
          <img className="w-24 h-full" src={ig1} />
          <img className="w-24 h-full" src={ig3} />
          <img className="w-24 h-full" src={ig2} />
        </div>
      </div>
    </>
  );
};
export default Home;
