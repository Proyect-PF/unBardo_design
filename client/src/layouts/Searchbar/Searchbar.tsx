import searchIcon from "../../assets/svg/search.svg";
import comeBack from "../../assets/svg/come-back.svg";
import React, { useState } from "react";

interface Props{
    openClose: boolean
    handleSearch: any
}

const Searchbar = ({openClose, handleSearch}: Props) => {
    const [input, setInput] = useState("")

    let style:string;
    if(openClose) style = "right-full"
    else{
        style = ""
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setInput("")
        window.alert(`buscaste ${input}`)
    }

    return (
        <div className={`flex fixed ${style} bg-white w-full min-h-screen z-40`}>
            <div className="flex w-full h-14 justify-between border-b border-gray-300">
                <button onClick={handleSearch} className="px-5"><img src={comeBack} alt="icono" className="h-5" /></button>
                <form onSubmit={handleSubmit} className="flex w-full">
                    <input onChange={handleChange} value={input} type="search" placeholder="Buscar" className="h-13 w-full bg-white focus:outline-0"/>
                    <button type="submit"><img src={searchIcon} alt="iconSea" className="h-10 px-5" /></button>
                </form>
            </div>
        </div>
    )
}

export default Searchbar