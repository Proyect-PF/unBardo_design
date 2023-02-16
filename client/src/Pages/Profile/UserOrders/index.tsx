import axios from "axios";
import { useEffect, useState } from "react";
import Button from "../../../components/Buttons/Button/Button";

interface Order {
    id: number
    id_user: number
    status: string
    payment_id: number
    dispatched: string
    createdAt: string
    updatedAt: string
    product: any[]
}

interface Props {
    setPanel: React.Dispatch<React.SetStateAction<string>>
    setDetailId: React.Dispatch<React.SetStateAction<number>>
    userId: string
    fullname: string
    email:string
  }

const UserOrders = ({setPanel, setDetailId, userId, fullname, email}: Props) => {
    const [userOrders, setUserOrders] = useState<Array<Order>>([])

    useEffect(() => {
        axios.get(`http://localhost:3700/orders/users/${userId}`)
        .then((response) => {
            setUserOrders(response.data)
        })
    })

    return (
        <div className="font-semibold text-lg">
            <Button 
            type="button"
            text="Volver al perfil"
            name="back"
            onClick={() => {
            setPanel("info");
            }}
            disabled={false}
            className="justify-end pr-12"
            />
            <div className="flex items-center justify-around w-full text-center border-t">
                <p className="w-8 border-r border-black">Id</p>
                <p className="w-60 ">Nombre</p>
                <p className="w-60 ">Email</p>
                <p className="w-40 ">Fecha</p>
                <p className="w-24 ">Status</p>
                <p className="w-24 ">Despachada</p>
                <p className="w-20"></p>
            </div>
            {
                userOrders.map((e) => (
                    <div className="flex items-center justify-around w-full text-center border-t">
                      <p className="w-8 border-r border-black">{e.id}</p>
                      <p className=" w-60">{fullname}</p>
                      <p className=" w-60">{email}</p>
                      <p className="w-40 ">{e.updatedAt.split("T")[0]}</p>
                      <p className="w-24 ">{e.status}</p>
                      <p className="w-24 ">{e.dispatched ? "Si" : "No"}</p>
                      <button
                        onClick={() => {
                          setDetailId(e.id)
                          setPanel("orderdetail");
                        }}
                        className="w-20 py-2 border border-black"
                      >
                        Detalles
                      </button>
                    </div>
                  ))
            }
        </div>
    )
}

export default UserOrders;