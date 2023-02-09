import React, { useState } from "react";

type Props = {
  setFieldValue: any;
  fieldName: string;
};
const FileUpload = ({ setFieldValue, fieldName }: Props) => {
  const [image, setImage] = useState("");

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files ? e.currentTarget.files[0] : null;
    TransformFile(file);
  };

  const TransformFile = (file: any) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        if (typeof reader.result === "string") {
          setImage(reader.result);
          setFieldValue(fieldName, reader.result);
        }
      };
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <input type="file" accept="image/" onChange={handleUpload} />
      <img src={image} className="w-80" />
    </div>
  );
};

export default FileUpload;
