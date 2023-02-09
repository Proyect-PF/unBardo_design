import { SelectInput } from "react-admin";
import React, { useEffect, useRef, useState } from "react";
import Button from "../../../../components/Buttons/Button/Button";

declare global {
  interface Window {
    cloudinary: any;
  }
}

type Props = {
  source: string;
  label: string;
};

type Images = { id: string; name: string }[];

const CloudinaryInput = ({ source, label }: Props) => {
  const cloudinaryRef = useRef<any>();
  const widgetRef = useRef<any>();
  const [images, setImages] = useState<Images>([]);
  let num = 0;
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "drt1pzx1x",
        uploadPreset: "pxwjyulo",
      },
      function async(error: any, result: any) {
        console.log(result);
        if (result.event === "success") {
          num++;
          setImages([
            ...images,
            {
              id: result.info.url,
              name: "Foto " + num,
            },
          ]);
        }
      }
    );
  }, []);

  return (
    <div>
      <p>Imagenes:</p>
      <div className="flex content-center gap-4">
        <p>Principal:</p>
        <SelectInput source={source} choices={images} />
      </div>
      <Button
        type="button"
        text={label}
        name="uploadWidget"
        disabled={false}
        onClick={() => widgetRef.current.open()}
      />
      <div className="flex gap-8">
        {images.length > 0 &&
          images.map((e) => (
            <div>
              <p>{e.name}</p>
              <img src={e.id} className="h-80" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default CloudinaryInput;
{
  /* <label htmlFor={id}>
{label}
<input id={id} {...field} />
{fieldState.error && <span>{fieldState.error.message}</span>}
</label> */
}
