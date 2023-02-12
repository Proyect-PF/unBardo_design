import React, { useEffect, useState } from "react";

type Props = {
  setFieldValue: any;
  fieldName: string;
  force: boolean;
};
const FileUpload = ({ setFieldValue, fieldName, force }: Props) => {
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

  useEffect(() => {
    setImage("");
  }, [force]);

  return (
    <div className="flex flex-col gap-8">
      <input type="file" accept="image/" onChange={handleUpload} />
      <img src={image} className="w-80" alt="" />
    </div>
  );
};

export default FileUpload;
