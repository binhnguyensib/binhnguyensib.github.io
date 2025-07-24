import React, { useEffect, useState } from "react";
import { useListItemStore } from "../../zustand/listItemStore";
import ListItems from "../../components/listItems";
import { convertNumToCurrency } from "../../utils/numberConvert";
import { Button } from "@mui/material";
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { useNavigate } from "react-router-dom";
import Waiting from "../../components/waiting";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import BankTransferQR from "../../components/BankTransferQR";
import ConfirmDialog from "./components/digalogConfirm";
import PaymentCash from "../../asset/resource/cash.png";
import PaymentTransfer from "../../asset/resource/NAPAS_icon.png";
import DiscountIcon from "../../asset/resource/discount-voucher-icon.png"
import i18n from "../../i18n";
export default function MyCart() {
    const text = [, "đơn hàng này chứ?"];
    const text_ = ["Vui lòng xác nhận", "thanh toán đơn hàng"]
    const listItem = useListItemStore((state) => state.listItem) || [];
    const [open, setOpen] = useState(false);
    const [showQR, setShowQR] = useState(false);
    const [openConfirmRemove, setOpenConfirmRemove] = useState(false);
    const [openConfirmPay, setOpenConfirmPay] = useState(false);
    const [finalPrice, setFinalPrice] = useState(
        listItem.reduce((acc, item) => acc + item.price * item.category, 0)
    );
    const [text1, setText1] = useState("");
    const [text2, setText2] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setFinalPrice(
            listItem.reduce((acc, item) => acc + item.price * item.category, 0)
        );
    }, [listItem]);

    // const handlePayByCash = () => {
    //     setOpen(true);
    //     setTimeout(() => {
    //         setOpen(false);
    //         alert("Thanh toán thành công");
    //         useListItemStore.getState().removeAll();
    //         navigate("/create");
    //     }, 5000);
    // };

    const handlePayByCash = () => {
        setShowQR(true);
        setTimeout(() => {
            setShowQR(false);
            // setOpenPaySuccess(true);
            useListItemStore.getState().removeAll();
            navigate("/create");
        }, 5000);
    };

    const handleConfirmRemove = () => {
        setOpenConfirmRemove(false);
        useListItemStore.getState().removeAll();
        navigate("/create");
    };
    const handleConfirmPay = () => {
        setOpenConfirmPay(false);
        useListItemStore.getState().removeAll();
        navigate("/create");
    };

    const handleCancel = () => {
        setOpenConfirmRemove(false);
    };

    return (
        <div className="h-screen flex flex-col w-full">
            <div className="h-[50px] flex justify-center items-center font-bold">
                {i18n.t("mycart.header")}
            </div>

            <div className="flex flex-col px-2 flex-grow min-h-0 overflow-auto">
                <div className="py-1 my-1 flex flex-col">
                    <div className="font-bold ">
                        {i18n.t("mycart.itemsList.header")}
                    </div>
                    <div>
                        {i18n.t("mycart.itemsList.total")} {listItem.length} {i18n.t("mycart.itemsList.item")}
                    </div>
                </div>

                <div className="flex-grow min-h-0 overflow-y-auto">
                    <ListItems className="w-full" />
                </div>
            </div>

            {listItem.length > 0 && (
                <div className="px-0 py-3 bg-white shadow-inner flex flex-col gap-2">
                    <div className="bg-[#ffd3f1] text-[#c6439f] py-2 flex flex-row justify-between items-center px-4">
                        <div className="flex items-center gap-3">
                            <img src={DiscountIcon} alt="DiscountIcon" width={30} height={30} />
                            <b>{i18n.t("mycart.coupon")}</b>
                        </div>
                        <div>
                            <KeyboardArrowRightIcon />
                        </div>
                    </div>
                    
                    <div className="px-5"><b>{i18n.t("mycart.order.info")}</b></div>

                    <div className="px-5">
                        <div className="border-b border-black flex justify-between py-1 px-2">
                            <div>{i18n.t("mycart.order.total")}</div>
                            <div>{listItem.length} {i18n.t("mycart.order.item")}</div>
                        </div>

                        <div className="border-b border-black">
                            <div className="flex justify-between py-1 px-2">
                                <div>{i18n.t("mycart.order.totalPrice")}</div>
                                <div className="text-xl font-bold">
                                    {convertNumToCurrency(finalPrice)}
                                </div>
                            </div>
                            <div className="flex justify-between py-1 px-2">
                                <div>{i18n.t("mycart.order.discount")}</div>
                                <div className="text-green-500 text-xl">-0</div>
                            </div>
                        </div>

                        <div className="flex justify-between py-1 px-2 items-center">
                            <div className="text-2xl font-bold">{i18n.t("mycart.order.grandTotal")}</div>
                            <div className="text-4xl text-[#b63383] font-bold">
                                {convertNumToCurrency(finalPrice)}
                            </div>
                        </div>
                    </div>

                    <Button
                        variant="contained"
                        sx={{ color: "black",fontSize: "1rem", backgroundColor: "#ff4c4c", textTransform: 'none', fontWeight: 'bold' }}
                        className="w-full"
                        color="error"
                        onClick={() => setOpenConfirmRemove(true)}
                    >
                        {i18n.t("mycart.order.cancel")}
                    </Button>

                    <div className="flex gap-2">
                        <Button
                            variant="contained"
                            sx={{ color: "black", fontSize: "0.75rem", backgroundColor: "#ff9ee1", textTransform: 'none',fontWeight: 'bold' }}
                            className="w-1/2 h-[50px] flex flex-col justify-center items-center"
                            onClick={() => navigate("/payment-cash")}
                        >
                            <img src={PaymentCash} alt="PaymentCash" width={30} height={30} />
                            {i18n.t("mycart.payment.cash")}
                        </Button>

                        <Button
                            variant="contained"
                            sx={{ color: "black", fontSize: "0.75rem", backgroundColor: "#ff9ee1",textTransform: 'none',fontWeight: 'bold' }}
                            className="w-1/2 h-[50px] flex flex-col justify-center items-center"
                            onClick={() => navigate("/payment-transfer")}
                        >
                            <img src={PaymentTransfer} alt="PaymentTransfer" className="mt-2" width={35} height={35} />
                            {i18n.t("mycart.payment.bank")}
                        </Button>
                    </div>
                </div>
            )}

            <Waiting open={open} setOpen={setOpen} />
            <BankTransferQR open={showQR} setOpen={setShowQR} onClose={() => setShowQR(false)} amount={finalPrice} />
            <ConfirmDialog
                open={openConfirmRemove}
                setOpen={setOpenConfirmRemove}
                onClose={handleCancel}
                onConfirm={handleConfirmRemove}
                text1= {i18n.t("confirmDialog.cancel.text1")}
                //text2= {i18n.t("confirmDialog.cancel.text2")}
            />
            <ConfirmDialog
                open={openConfirmPay}
                setOpen={setOpenConfirmPay}
                onClose={handleCancel}
                onConfirm={handleConfirmPay}
                text1="Vui lòng xác nhận"
                //text2="thanh toán đơn hàng"
            />
        </div>
    );
}
