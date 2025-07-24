import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InforDialog from "./digalogSuccess";
import { useListItemStore } from "../../../zustand/listItemStore";
import { Button } from "@mui/material";
import Robot from "../../../asset/resource/AI_tt.png";
import ReplayIcon from '@mui/icons-material/Replay';
import i18n from "../../../i18n";
export default function PaymentCash() {
    const [openPaySuccess, setOpenPaySuccess] = useState(false);
    const navigate = useNavigate();
    const handleConfirmPay = () => {
        setOpenPaySuccess(false);
        useListItemStore.getState().removeAll();
        navigate("/create");
    };
    useEffect(() => {
        setTimeout(() => {
            setOpenPaySuccess(true);
        }, 5000)
    }, [])
    return (
        <>
            <div className="w-full h-full flex flex-col items-center justify-around">
                <div className="flex flex-col items-center justify-center">
                    <div className="mb-3">
                        <b>
                            {i18n.t("paymentCash.orderId")}
                        </b>
                    </div>
                    <div className="bg-[#C3399A] w-4/5 mx-3 py-2 rounded-lg flex justify-center items-center">
                        <img src="https://www.phanmemvang.com.vn/images/Ma_vach%20700.jpg" className="px-2 mx-3 bg-white w-8/9" />
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center">

                    <h3>
                        <b>
                            {i18n.t("paymentCash.noti1")}
                        </b>
                    </h3>
                    <h3>
                        <b>
                            {i18n.t("paymentCash.noti2")}
                        </b>
                    </h3>
                    <img src={Robot} alt="Robot" width={200} height={200} className="mt-5" />
                </div>
                <div className="w-full flex justify-start mt-10">
                    <Button
                        variant="contained"
                        sx={{
                            px: 2,
                            py: 0,
                            color: "black",
                            fontSize: "1rem",
                            backgroundColor: "#e464bc",
                            justifyContent: "flex-start", // Quan trọng để nút chính căn theo start
                            alignItems: "flex-center", // Quan trọng để nút chính căn theo start
                            textTransform: 'none',
                            "&:hover": {
                                backgroundColor: "#c94aa3",
                            },
                        }}
                        className="w-1/3 h-[50px] flex justify-start items-start"
                        onClick={() => navigate("/mycart")}
                    >
                        <div className="flex flex-row items-center justify-start whitespace-nowrap">
                            <ReplayIcon className="mr-3 pr-3 border-r-2 border-black text-black w-8 h-8 flex-shrink-0" fontSize="large" />
                            <span className="whitespace-nowrap">{i18n.t("paymentCash.return")}</span>
                        </div>
                    </Button>
                </div>
            </div >
            <InforDialog
                open={openPaySuccess}
                setOpen={setOpenPaySuccess}
                onClose={() => { navigate("/create") }}
                onConfirm={handleConfirmPay}
                title=""
                text={i18n.t("infoDialog.text")}
            />
        </>
    )
}