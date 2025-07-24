import React, { useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { useListItemStore } from "../zustand/listItemStore";
export default function PublicWraper({ children }: any) {
    const path = window.location.pathname;
    useEffect(() => {
        try {
            const listItem = JSON.parse(localStorage.getItem("itemIds") || "[]");
            useListItemStore.getState().load(
                listItem
            )
            useListItemStore.getState().loadLanguage();
        } catch (e) {
            console.log(e);
        }
    }, [])
    return (
        <div className="flex flex-col h-screen relative">
            {path !== "/" && !path.includes("mlmlml") ? <Header /> : <></>}
            <div className={`overflow-y-auto ${path !== "/" ? "h-17/20" : "h-full"}`}>
                {children}
            </div>
            {path !== "/" && !path.includes("payment-") ? <Footer /> : <></>}
        </div>
    )
}