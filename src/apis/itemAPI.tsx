export const getItemList = (): Promise<any[]> => {
    return fetch("/database.json")
        .then((res) => res.json());
};

export const getItemById = (id: string): Promise<any | undefined> => {
    return fetch("/database.json")
        .then((res) => res.json())
        .then((data) => data.find((item: any) => item.id === id));
};
