import React from "react";
import { Dialog, DialogTitle, DialogContent, Button, CircularProgress } from "@mui/material";

export default function BankTransferQRDialog({ open, setOpen, onClose,
    bankID = "970423",
    accountNo = "31930173533",
    template = "compact",
    amount = 2000,
    description = "Giảm giá một sản phẩm",
    accountName = "PHAN THUY LINH."
}: any) {

    const qrValue = `https://img.vietqr.io/image/${bankID}-${accountNo}-${template}.png?amount=${amount}&addInfo=${description}&accountName=${accountName}`;


    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Vui lòng đưa mã này cho nhân viên</DialogTitle>
                <DialogContent className="flex flex-col gap-4 justify-center items-center py-4 ">
                    <img src={qrValue} width={200} height={200} />
                    {/* <CircularProgress /> */}
                    {/* <div>
                        Đang xử lý...
                    </div> */}
                </DialogContent>
            </Dialog>
        </>
    );
}
