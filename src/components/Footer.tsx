import React from "react";
import { Button } from "@mui/material";
import CartIcon from "./cartIcon";
import CropFreeIcon from '@mui/icons-material/CropFree';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { useNavigate } from "react-router-dom";
import { FaBarcode } from "react-icons/fa";
import Robot from "../asset/resource/robot1.png";
import i18n from "../i18n";
export default function Footer() {
    const navigate = useNavigate();
    return (
        <div className="w-full flex flex-row justify-between items-center h-1/10 fixed bottom-0">
            <Button
                variant="contained"
                className="w-1/3 h-full"
                sx={{
                    backgroundColor: "#e464bc", // pink-400
                    '&:hover': {
                        backgroundColor: "#c3399a", // pink-600
                    },
                    '&:focus': {
                        backgroundColor: "#b63383", // pink-700
                    },
                    textTransform: 'none',
                    fontSize: "0.8rem"
                }}
                onClick={() => navigate("/assistant")}
            >
                <div className="flex flex-col items-center">
                    <img src={Robot} alt="Robot" width={40} height={40} />
                    <div>
                        {i18n.t("footer.chatbot")}
                    </div>
                </div>
            </Button>
            <Button
                variant="contained"
                className="w-1/3 h-full"
                sx={{
                    backgroundColor: "#e464bc", // pink-400
                    '&:hover': {
                        backgroundColor: "#c3399a",
                    },
                    '&:focus': {
                        backgroundColor: "#b63383",
                    },
                    textTransform: 'none',
                    fontSize: "0.8rem"
                }}
                onClick={() => navigate("/create")}
            >
                <div className="relative w-20 h-13">
                    {/* Corner brackets */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-white rounded-tl-sm" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-white rounded-tr-sm" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-white rounded-bl-sm" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-white rounded-br-sm" />

                    {/* Barcode Icon */}
                    <FaBarcode className="w-10 h-10 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
            </Button>
            <Button
                variant="contained"
                className="w-1/3 h-full flex flex-col justify-center items-center"
                sx={{
                    backgroundColor: "#e464bc", // pink-400
                    '&:hover': {
                        backgroundColor: "#c3399a",
                    },
                    '&:focus': {
                        backgroundColor: "#b63383",
                    },
                    textTransform: 'none',
                    fontSize: "0.8rem"
                }}
                onClick={() => navigate("/mycart")}
            >
                <CartIcon className="w-10 h-10" color="white" /> {i18n.t("footer.cart")}
            </Button>
        </div>
    );
}
