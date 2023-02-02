import React from 'react';
import logo from '../../assets/svg/principal-logo.svg';
import userIcon from '../../assets/svg/user-icon.svg';
import outIcon from '../../assets/svg/out-session.svg';
import helpIcon from '../../assets/svg/help.svg';

interface Props{
    openClose: boolean
    handleChange: any
}

const Sidebar = ({openClose, handleChange}: Props) => {
    let style:string;
    if(openClose) style = "left-full"
    else{
        style = ""
    }

    return (
        <div className={`flex fixed ${style} w-full bg-black/50`}>
            <div className="flex flex-col bg-white w-2/3 max-w-lg min-h-screen justify-between">
                <div>
                    <div className="flex h-16 justify-center items-center border-b-2 border-gray-300">
                        <img src={logo} alt="logo" className="h-7" />
                    </div>

                    <div className="flex h-16 items-center border-l-4 border-white duration-300 pl-5 hover:border-l-4 hover:border-gray-700 hover:bg-gray-300 hover:cursor-pointer">
                        <img src={userIcon} alt="user" className="h-6" />
                        <p className="font-semibold text-xl pl-4">Crear Producto</p>
                    </div>

                    <div className="flex h-16 items-center border-l-4 border-white duration-300 pl-5 hover:border-l-4 hover:border-gray-700 hover:bg-gray-300 hover:cursor-pointer">
                        <img src={outIcon} alt="out" className="h-6" />
                        <p className="font-semibold text-xl pl-4">Cerrar Sesión</p>
                    </div>
                </div>

                <div>
                    <div className="flex h-16 items-center border-l-4 border-white duration-300 pl-5 hover:border-l-4 hover:border-gray-700 hover:bg-gray-300 hover:cursor-pointer">
                        <img src={helpIcon} alt="help" className="h-6" />
                        <p className="font-semibold text-xl pl-4">Ayuda</p>
                    </div>
                </div>
            </div>

            <p onClick={handleChange} className="bg-black h-16 w-16 pt-2 duration-300 font-semibold text-3xl text-white text-center duration-300 hover:bg-white hover:text-black hover:cursor-pointer">x</p>

        </div>
    )
}

export default Sidebar