import database from "../db/database";

export const getItemList = (): Promise<any[]> => {
    return Promise.resolve(database);
    // return fetch("/database.json")
    //     .then((res) => res.json());
};

export const getItemById = (id: string): Promise<any | undefined> => {
    return Promise.resolve(database.find((item: any) => item.id === id));
    // return fetch("/database.json")
    //     .then((res) => res.json())
    //     .then((data) => data.find((item: any) => item.id === id));
};
