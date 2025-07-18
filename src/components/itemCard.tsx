import React, { useState } from "react";
import { ItemDto, useListItemStore } from "../zustand/listItemStore";
import { Button } from "@mui/material";
import { convertNumToCurrency } from "../utils/numberConvert";
import ConfirmDialogDelete from "./confirmDelete";
import CloseIcon from '@mui/icons-material/Close';
export interface ItemCardProps {
    item: ItemDto;
}

export default function ItemCard({ item }: ItemCardProps) {
    const [open, setOpen] = useState(false);
    const handleAddItem = () => {
        useListItemStore.getState().updateNumItem(item.id, 1);
    }
    const handleDeclineItem = () => {
        useListItemStore.getState().updateNumItem(item.id, -1);
    }
    const handleOpenRemoveItem = () => {
        setOpen(true);
    }
    const handleRemoveItem = () => {
        setOpen(false);
        useListItemStore.getState().removeItem(item);
    }
    return (
        <div className="w-95/100 h-25 flex flex-row my-1 ">
            <div className="w-full relative h-full flex flex-row justify-between items-center rounded-lg border border-gray-300 shadow-sm">
                <div className="flex w-full flex-row items-center h-25 justify-start">
                    <img
                        src={item.image}
                        alt={item.name}
                        className="object-cover shadow w-25 h-25 p-1"
                    />
                    <div className="my-3 mx-1 flex flex-col w-full items-center h-25 justify-start items-start">
                        <h4
                            className="text-lg font-semibold w-4/5 h-15"
                            style={{
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                            }}
                        >
                            {item.name}
                        </h4>
                        <div className="flex flex-row justify-between items-center h-10 w-full">
                            <p className="text-sm w-4/10 text-gray-500">Giá: {convertNumToCurrency(item.price)}</p>

                            <div className="flex flex-row  items-center justify-center mx-1">
                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={handleAddItem}
                                    sx={{
                                        minWidth: 0,                  // remove MUI's default min width
                                        width: 26,
                                        height: 26,
                                        padding: 0,
                                        backgroundColor: "#d9d9d9",
                                        border: "1px solid #1e40af",
                                        color: "black",
                                        borderRadius: "50%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        '&:hover': {
                                            backgroundColor: "#d0d0f0", // optional hover
                                        },
                                    }}
                                >
                                    +
                                </Button>
                                <div className="text-sm text-gray-500 mx-2 w-5 flex justify-center items-center">
                                    {item.category}
                                </div>
                                <Button
                                    variant="contained"
                                    size="small"
                                    sx={{
                                        minWidth: 0,                  // remove MUI's default min width
                                        width: 26,
                                        height: 26,
                                        padding: 0,
                                        backgroundColor: "#d9d9d9",
                                        border: "1px solid #1e40af",
                                        color: "black",
                                        borderRadius: "50%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        '&:hover': {
                                            backgroundColor: "#d0d0f0", // optional hover
                                        },
                                    }}
                                    className="text-black"
                                    onClick={handleDeclineItem}
                                >        -
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-auto absolute -right-2 -top-2 flex flex-row justify-end items-center">
                    <Button
                        variant="contained"
                        onClick={handleOpenRemoveItem}
                        className="flex justify-center items-center"
                        sx={{
                            minWidth: 26,       // Smaller width
                            height: 26,         // Smaller height
                            padding: 0.5,       // Tight padding
                            fontSize: '0.75rem', // Smaller text
                            borderRadius: "50%",
                            backgroundColor: "white",
                            color: "red",
                            border: "1px solid red",
                        }}
                    >
                        <CloseIcon sx={{ fontSize: 16, color: "red" }} />
                    </Button>
                </div>
            </div>
            <ConfirmDialogDelete open={open} setOpen={setOpen} onClose={() => setOpen(false)} onConfirm={handleRemoveItem} text1="Bạn có chắc muốn " text2="xóa sản phẩm này?" />
        </div>
    );
}