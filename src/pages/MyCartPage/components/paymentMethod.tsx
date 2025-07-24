import { Button, CircularProgress } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ReplayIcon from '@mui/icons-material/Replay';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InforDialog from "./digalogSuccess";
import TheTinDung from "../../../asset/resource/Credit.png";
import TheNapas from "../../../asset/resource/NAPAS.png";
import TheVNPay from "../../../asset/resource/VNPAY.png";
import TheMomo from "../../../asset/resource/MoMo.png";
import TheApplePay from "../../../asset/resource/Apple Pay.png";
import TheZaloPay from "../../../asset/resource/ZaloPay.png";
import { useListItemStore } from "../../../zustand/listItemStore";
import i18n from "../../../i18n";

function PaymentCard({ icon, name, describe, onClick }: { icon: string, name: string, describe?: string, onClick: any }) {
    return (
        <Button
            onClick={onClick}
            sx={{
                width: '100%',
                mx: 2.5, // mx-5 = 5 * 0.5 = 2.5rem
                px: 1, // px-2 = 2 * 0.25 = 0.5rem
                height: '60px', // h-15 = 15 * 4px = 60px
                backgroundColor: 'white',
                border: '1px solid black',
                color: 'black',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                textTransform: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                '&:hover': {
                    backgroundColor: '#16a34a', // Tailwind's green-600
                },
            }}
        >
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: '100%',
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    width: '20%',
                }}>
                    <img src={icon} alt="PayPal" style={{ height: '40px' }} />
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    width: '100%',
                    gap: '0.25rem',
                    paddingTop: '0.5rem',
                    paddingBottom: '0.5rem',
                    marginTop: '0.5rem',
                    marginBottom: '0.5rem',
                }}>
                    {name}
                    <div style={{ color: '#D1D5DB', fontSize: '0.875rem' }}>
                        {describe}
                    </div>
                </div>
            </div>
        </Button>
    );
}

export default function PaymentMethod() {
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const listPaymentMethod = [
        {
            title: i18n.t("paymentBanking.credit.title"),
            describe: i18n.t("paymentBanking.credit.description"),
            icon: TheTinDung,
        },
        {
            title: i18n.t("paymentBanking.Napas"),
            describe: "",
            icon: TheNapas,
        }, {
            title: i18n.t("paymentBanking.Vnpay"),
            describe: "",
            icon: TheVNPay,
        }, {
            title: i18n.t("paymentBanking.Momo"),
            describe: "",
            icon: TheMomo,
        }, {
            title: i18n.t("paymentBanking.Applepay"),
            describe: "",
            icon: TheApplePay,
        }, {
            title: i18n.t("paymentBanking.Zalopay"),
            describe: "",
            icon: TheZaloPay,
        }
    ]
    const naviagte = useNavigate();
    const handlePaymentMethod = (item: any) => {
        setLoading(true);
        setTimeout(() => {
            useListItemStore.getState().removeAll();
            setLoading(false);
            setIsSuccess(true);
        }, 5000)
    }
    return (
        <div className=" flex flex-col items-center">
            <div className="w-full">
                <h2 className="text-xl font-semibold my-4 text-left pl-4">
                    <b>{i18n.t("paymentBanking.paymentMethod")}</b>
                </h2>
            </div>

            <div className="flex flex-col mx-2 px-2 flex-1 items-center justify-center w-full h-full gap-2">
                {
                    listPaymentMethod.map((item, index) => (
                        <PaymentCard onClick={() => handlePaymentMethod(item)} icon={item.icon} name={item.title} describe={item.describe} />
                    ))
                }
            </div>
            {loading && <div className="flex mt-9 items-center justify-center rounded-xl w-9/10 h-24 border-1 border-black">
                <CircularProgress color="secondary" size={32} />
                <span className="ml-3 text-sm text-gray-600">{i18n.t("paymentBanking.processing")}</span>
            </div>}
            <InforDialog
                open={isSuccess}
                setOpen={setIsSuccess}
                onClose={() => setIsSuccess(false)}
                onConfirm={() => {
                    setIsSuccess(false);
                    naviagte("/mycart"); 
                }}
                title=""
                text={i18n.t("infoDialog.text")}
            />
            {
                !loading && !isSuccess && <div className="h-24"></div>
            }
            <div className="w-full flex justify-start mt-10">
                <Button
                    variant="contained"
                    sx={{
                        px: 2,
                        py: 0,
                        color: "black",
                        fontSize: "1rem",
                        backgroundColor: "#e464bc",
                        justifyContent: "flex-start",
                        alignItems: "flex-center",
                        textTransform: 'none',
                        "&:hover": {
                            backgroundColor: "#c94aa3",
                        },
                    }}
                    className="w-1/3 h-[50px] flex justify-start items-start"
                    onClick={() => naviagte("/mycart")}
                >
                    <div className="flex flex-row items-center justify-start">
                        <ReplayIcon className="mr-3 pr-3 border-r-2 border-black text-black w-8 h-8" fontSize="large" />
                        <span>{i18n.t("paymentBanking.return")}</span>
                    </div>
                </Button>
            </div>
        </div>
    );
}