import { useEffect, useState } from "react";

export default function useStorageState(key, initialValue) {
    const [value, setValue] = useState(localStorage.getItem(key) || initialValue);
   
    useEffect(() => {
        localStorage.setItem(key, value)
    }, [key, value])

    return [value, setValue]
}