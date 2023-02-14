import Button from "../../components/Buttons/Button/Button";
import Input from "../../components/Inputs/Input";

const EmailList = () => {
  const headers = [
    { label: "Nombre", key: "fullname" },
    { label: "Email", key: "email" },
  ];

  const handleExport = async () => {};

  return (
    <div className="flex flex-col gap-8 m-10">
      <p className="text-2xl font-bold">Newsletter:</p>
      <div className="flex flex-row gap-20 mx-8">
        <div className="w-40">
          <p className="text-lg font-medium ">Usuarios suscriptos:</p>
          <p className="text-2xl font-semibold">85</p>
        </div>
        <div className="w-40">
          <Button
            text="Exportar usuarios"
            name="exportUsers"
            onClick={handleExport}
            disabled={false}
            type="button"
            className="justify center"
          />
        </div>
      </div>
    </div>
  );
};

export default EmailList;
