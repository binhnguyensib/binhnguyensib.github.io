import React from "react";
import Logo from "../asset/resource/aeon.png";
import { useNavigate } from "react-router-dom";
import { useListItemStore } from "../zustand/listItemStore";

export default function Header() {
    const navigate = useNavigate();


    return (

        <div className="h-1/20 flex justify-between items-center px-4 pt-3 pb-1">
            <img src={Logo} alt="logo" width={100} height={100} />
        </div>
    );
}