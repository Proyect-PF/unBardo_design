import { useNavigate } from "react-router-dom";
import Button from "../../../components/Buttons/Button/Button";
import ButtonSmall from "../../../components/Buttons/ButtonSmall/ButtonSmall";

export interface Props {
    setPanel: React.Dispatch<React.SetStateAction<string>>
    fullName: string
    email: string
  }

const Info = ({setPanel, fullName, email}: Props): JSX.Element => {
    const navigate = useNavigate()
    return (
      <div className={`flex flex-col justify-center items-center h-80 pt-11 w-full`}>
        <div className="flex flex-col justify-center items-center w-full">
          <img src={`https://api.dicebear.com/5.x/shapes/svg?seed=${fullName}`} alt="profile" className="w-24 rounded-full" />
          <h4 className="text-4xl font-rift font-bold mt-4">{fullName}</h4>
          <h4 className="text-sm font-poppins text-gray-500">{email}</h4>
        </div>
        <div className=" w-72">
          <Button 
              type="button"
              text="Ver mis ordenes"
              name="orders"
              onClick={() => {
              setPanel("userorders");
              }}
              disabled={false}
              className="text-3xl"
              />
        </div>
        <div className="flex w-72 justify-between">
          <ButtonSmall
          type='button'
          name='editfullname'
          text="Cambiar nombre"
          onClick={() => {
            setPanel("editfullname")
          }}
          // onClick={() => {}}
          disabled={false}
          />

          <ButtonSmall
          type='button'
          name='editpassword'
          text="Cambiar Contraseña"
          onClick={() => {
            setPanel("editpassword")
          }}
          // onClick={() => {}}
          disabled={false}
          />
        </div>
        <p onClick={() => navigate("/newsletter")} className=" text-base font-poppins font-normal underline text-center pt-3 hover:cursor-pointer">Desuscribirme del newsletter</p>
      </div>
    );
  };
  
  export default Info;