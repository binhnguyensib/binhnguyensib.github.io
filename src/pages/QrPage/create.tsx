import React, { useEffect, useState } from "react";
import BarcodeScanner from "./components/qr";
import ListItems from "../../components/listItems";
import { useListItemStore } from "../../zustand/listItemStore";
import { convertNumToCurrency } from "../../utils/numberConvert";
import i18n from "../../i18n";



export default function Create() {
    const listItem = useListItemStore((state) => state.listItem) || [];
    const price = listItem.reduce((acc, item) => acc + item.price * item.category, 0);
    return (
        <div className="h-full flex flex-col px-2">
            <BarcodeScanner className="h-3/10" />
            {listItem.length > 0 && <p className="py-1 ">
                <b>{i18n.t("qr.body.item.title")}</b>
            </p>}
            <div className="flex flex-col h-7/10 justify-between">
                {listItem.length > 0 && <ListItems className="h-4/5 mt-2 py-2 overflow-y-auto" />}
                {listItem.length == 0 &&
                    <div className="w-full flex flex-col justify-center items-center">
                        <div className="py-2 my-2"><b>{i18n.t("qr.body.noItem.title")}</b></div>
                        <div>{i18n.t("qr.body.noItem.description")}</div>
                        {/* <div> vào khung để quét</div> */}
                    </div>}
                {listItem.length > 0 && <div>
                    <hr className="border border-black my-1" />
                    <div className="w-full flex flex-row justify-between items-center py-2 px-2">
                        <div className="text-xl">{i18n.t("qr.body.item.total")}</div>
                        <div className="text-5xl text-[#b63383]">{convertNumToCurrency(price)}</div>
                    </div>
                </div>}

            </div>
        </div >
    )
}