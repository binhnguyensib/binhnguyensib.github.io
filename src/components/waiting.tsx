import React from "react";
import { Button, CircularProgress, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Waiting({ open, setOpen }: any) {
    const navigate = useNavigate();

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Đang chờ xử lý</DialogTitle>
            <DialogContent className="flex justify-center items-center gap-3 py-4">
                <CircularProgress />
            </DialogContent>
        </Dialog>
    );
}
