import { create } from "zustand";

export interface ItemDto {
    id: string;
    name?: string;
    brand?: string;
    price: number;
    image?: string;
    category: number | 0;
}

export interface ListItemDto {
    listItem: Array<ItemDto>;
}

interface ListItemStore extends ListItemDto {
    load: (listItem: Array<ItemDto>) => void;
    addItem: (item: ItemDto) => void;
    removeItem: (item: ItemDto) => void;
    updateNumItem: (itemId: String, num: number) => void;
    removeAll: () => void;
}

export const useListItemStore = create<ListItemStore>()((set) => ({
    listItem: [],
    load: (newList: Array<ItemDto>) => {
        const newData = newList.map((item) => ({
            ...item,
            category: 1,
        }));
        localStorage.setItem("itemIds", JSON.stringify(newData));
        set(() => ({
            listItem: newData,
        }));
    },
    addItem: (item) => {
        set((state) => {
            const existingItem = state.listItem.find((i) => i.id === item.id);
            if (existingItem) {
                const updatedList = state.listItem.map((i) =>
                    i.id === item.id ? { ...i, category: Math.max(i.category + 1, 1) } : i
                );
                localStorage.setItem("itemIds", JSON.stringify(updatedList));
                return { listItem: updatedList };
            } else {
                const updatedList = [...state.listItem, { ...item }];
                localStorage.setItem("itemIds", JSON.stringify(updatedList));
                return { listItem: updatedList };
            }
        });
    },

    removeItem: (item) => {
        set((state) => {
            const newList = state.listItem?.filter((i) => i.id !== item.id);
            localStorage.setItem("itemIds", JSON.stringify(newList));
            return { listItem: newList };
        });
    },
    updateNumItem: (itemId, num) => {
        set((state) => ({
            listItem: state.listItem?.map((i) =>
                i.id === itemId
                    ? { ...i, category: Math.max(i.category + num, 1) }
                    : i
            ),
        }));
    },

    removeAll: () => {
        set(() => {
            localStorage.removeItem("itemIds");
            return {
                listItem: [],
            };
        });
    },

}));
