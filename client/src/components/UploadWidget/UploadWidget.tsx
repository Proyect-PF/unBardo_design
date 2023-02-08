import React, { useEffect, useRef } from "react";
import Button from "../Buttons/Button/Button";
// import useNewProductForm from "../NewProduct/useNewProductForm";

declare global {
  interface Window {
    cloudinary: any;
  }
}
interface Props {
  dispatch: any;
}

const UploadWidget = ({ dispatch }: Props) => {
  const cloudinaryRef = useRef<any>();
  const widgetRef = useRef<any>();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "drt1pzx1x",
        uploadPreset: "pxwjyulo",
      },
      function (error: any, result: any) {
        if (result.event === "success") {
          dispatch({
            type: "change_value",
            payload: {
              inputName: "image",
              inputValue: result.info.url,
            },
          });
        }
      }
    );
  }, []);

  return (
    <Button
      type="button"
      text="Upload Image"
      name="uploadWidget"
      disabled={false}
      onClick={() => widgetRef.current.open()}
    />
    // <button type="button" onClick={() => widgetRef.current.open()}>
    //   Upload
    // </button>
  );
};

export default UploadWidget;
