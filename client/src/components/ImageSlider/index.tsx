import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./slider.css";
import { Carousel } from "react-responsive-carousel";
import { useId } from "react";

type Props = {
  slides: string[];
};

const ImageSlider = ({ slides }: Props) => {
  const images = slides.filter((e) => e !== "");
  return (
    <Carousel width={380}>
      {images &&
        images.map((e) => (
          <div key={e}>
            <img src={e} alt={e}/>
          </div>
        ))}
    </Carousel>
  );
};

export default ImageSlider;
