import React from "react";
import { SelectInput, useInput } from "react-admin";

type Props = {
  source: string;
  label: string;
};

type Images = { id: string; name: string }[];

const UploadImage = ({ source, label }: Props) => {
  const { id, field, fieldState } = useInput({ source });
  const [images, setImages] = React.useState<Images>([]);

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
          setImages([
            ...images,
            { id: reader.result, name: "Foto " + images.length.toString() },
          ]);
        }
      };
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <input type="file" accept="image/" onChange={handleUpload} />
      <SelectInput label="Imagen Principal" source={source} choices={images} />
    </div>
  );
};

export default UploadImage;
