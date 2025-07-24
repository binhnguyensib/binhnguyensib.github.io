import React from "react";
import { ItemDto, useListItemStore } from "../zustand/listItemStore";
import ItemCard from "../components/itemCard";
import i18n from "../i18n";

export interface ListItemProps {
    listItemId?: string[];
    className?: string;
}

export default function ListItems({ className }: ListItemProps) {
    const listItem = useListItemStore((state) => state.listItem) || [];

    return (
        <div className={`mt-2 py-2 flex flex-col items-center gap-3 w-full ${className || ""}`}>
            {listItem.length > 0 ? (
                listItem.map((item: ItemDto, index: number) => (
                    <ItemCard key={item.id || index} item={item} />
                ))
            ) : (
                <div className="flex flex-col items-center text-gray-500">
                    {i18n.t("mycart.emptyCart")}
                </div>
            )}
        </div>
    );
}
