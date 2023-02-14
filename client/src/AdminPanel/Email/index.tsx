import Button from "../../components/Buttons/Button/Button";
import Input from "../../components/Inputs/Input";
import { baseURL, PORT } from "../../utils/url&port";
import axios from "axios";
import { CSVLink } from "react-csv";
import React from "react";

const EmailList = () => {
  let data: string = "email1";
  let csvLinkEl: any = React.createRef();

  const handleExport = async () => {
    // data = await axios.get(`${baseURL}:${PORT}/....`);
    csvLinkEl.current.link.click();
  };

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
          <CSVLink
            filename="Newsletter_User_List.csv"
            data={data}
            ref={csvLinkEl}
          />
        </div>
      </div>
    </div>
  );
};

export default EmailList;
