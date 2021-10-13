export const saveQuery = (key: string, val: string) => {
    localStorage.setItem(key, val);
};

export const getSavedQuery = (storedKey: string) => {
    const value = localStorage.getItem(storedKey);
    if (value !== undefined && value !== "" && value !== null) return value;
    else return "";
};