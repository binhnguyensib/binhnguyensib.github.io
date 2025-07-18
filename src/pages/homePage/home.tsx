import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../asset/resource/AEON_MALL_corporate_logo.png";
import CartIcon from "../../components/cartIcon";
import { getItemList } from "../../apis/itemAPI";
import { Button } from "@mui/material";
export default function Home() {
    const navigate = useNavigate();
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="mb-5 -top-5">
                <img src={Logo} alt="logo" width={300} height={300} />
            </div>
            <Button
                variant="contained"
                onClick={() => navigate("/create")}
                className="!mt-5 !px-4 !py-2 !rounded-lg !shadow-sm !flex !items-center !justify-center !bg-pink-400 !text-white hover:!bg-pink-500 transition border border-gray-400"
                startIcon={<CartIcon className="w-6 h-6" color="white" />}
            >
                Tạo đơn hàng mới
            </Button>
        </div>
    )
}