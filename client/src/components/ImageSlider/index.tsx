import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

type Props = {
  slides: string[];
};

const ImageSlider = ({ slides }: Props) => {
  const images = slides.filter((e) => e !== "");

  return (
    <Carousel width={380}>
      {images &&
        images.map((e) => (
          <div>
            <img src={e} />
          </div>
        ))}
    </Carousel>
  );
};

export default ImageSlider;
